from __future__ import annotations
import re
import httpx
from utils.cache import TTLCache
from services.state_layer_mapper import layer_for_state

REVERSE_CACHE, LULC_CACHE = TTLCache(200, 3600), TTLCache(500, 3600)
USER_AGENT = "Bhu-Manthan-DigitalTwin/1.0 (educational prototype)"


def _value(text: str, field: str) -> str | None:
    match = re.search(rf"^\s*{re.escape(field)}\s*=\s*(.+?)\s*$", text, re.MULTILINE)
    return match.group(1).strip() if match else None


def parse_feature_info(text: str) -> dict[str, object]:
    code = _value(text, "LULC_CODE")
    geometry = re.search(r"GEOMETRY \((\w+)", _value(text, "the_geom") or "", re.I)
    def number(field: str):
        raw = _value(text, field)
        try: return float(raw) if raw is not None else None
        except ValueError: return None
    return {"district": _value(text, "DIS_OF"), "lulc_code": int(code) if code and code.isdigit() else None,
            "class_name": _value(text, "DESCR_1"), "sub_class": _value(text, "DESCR_2"),
            "geometry_type": geometry.group(1).title() if geometry else None,
            "area_norm": number("area_norm"), "shape_length": number("Shape_Leng"), "shape_area": number("Shape_Area")}


async def reverse_state(client: httpx.AsyncClient, url: str, lat: float, lng: float) -> tuple[str | None, str | None]:
    key = f"{lat:.4f},{lng:.4f}"
    cached = REVERSE_CACHE.get(key)
    if cached is not None: return cached  # type: ignore[return-value]
    response = await client.get(url, params={"format": "json", "lat": lat, "lon": lng, "countrycodes": "in", "zoom": 10}, headers={"User-Agent": USER_AGENT})
    response.raise_for_status()
    address = response.json().get("address", {})
    if address.get("country_code", "").lower() != "in": return REVERSE_CACHE.set(key, (None, None))  # type: ignore[return-value]
    return REVERSE_CACHE.set(key, (address.get("state"), address.get("state_district") or address.get("district")))  # type: ignore[return-value]


async def query_lulc(client: httpx.AsyncClient, wms_url: str, nominatim_url: str, lat: float, lng: float) -> dict[str, object]:
    key = f"{lat:.4f},{lng:.4f}"
    cached = LULC_CACHE.get(key)
    if cached is not None: return cached  # type: ignore[return-value]
    state, geocoded_district = await reverse_state(client, nominatim_url, lat, lng)
    if not state: return LULC_CACHE.set(key, {"success": False, "available": False, "message": "LULC data unavailable from connected Bhuvan 50K source for this location.", "state": None})  # type: ignore[return-value]
    layer = await layer_for_state(client, wms_url, state)
    if not layer: return LULC_CACHE.set(key, {"success": False, "available": False, "message": "LULC data unavailable from connected Bhuvan 50K source for this location.", "state": state})  # type: ignore[return-value]
    delta = 0.01
    params = {"service": "WMS", "version": "1.1.1", "request": "GetFeatureInfo", "layers": layer, "query_layers": layer, "styles": "", "srs": "EPSG:4326", "bbox": f"{lng-delta},{lat-delta},{lng+delta},{lat+delta}", "width": 1000, "height": 1000, "x": 500, "y": 500, "info_format": "text/plain"}
    response = await client.get(wms_url, params=params, headers={"User-Agent": USER_AGENT, "Accept": "text/plain,*/*"})
    response.raise_for_status()
    attrs = parse_feature_info(response.text)
    if not any(attrs.get(field) is not None for field in ("lulc_code", "class_name", "sub_class")):
        return {"success": False, "available": False, "message": "LULC data unavailable from connected Bhuvan 50K source for this location.", "state": state}
    result = {"success": True, "available": True, "state": state, "district": attrs.pop("district") or geocoded_district, **attrs}
    return LULC_CACHE.set(key, result)  # type: ignore[return-value]

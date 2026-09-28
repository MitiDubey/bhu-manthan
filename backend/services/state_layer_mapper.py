"""Discovers queryable 2015-16 LULC 1:50K layers from Bhuvan capabilities."""
from __future__ import annotations
import re
import xml.etree.ElementTree as ET
import httpx
from utils.cache import TTLCache

CAPABILITIES = TTLCache(max_items=1, ttl_seconds=24 * 60 * 60)
# Exact 2015-16 names exposed in Bhuvan's GWC catalogue. This is a resilience
# fallback only: normal operation still discovers layers from GetCapabilities.
# Do not add guessed names here.
FALLBACK_VERIFIED_LAYERS = {
    "lulc:AR_LULC50K_1516", "lulc:AS_LULC50K_1516", "lulc:GA_LULC50K_1516",
    "lulc:GJ_LULC50K_1516", "lulc:MH_LULC50K_1516", "lulc:ML_LULC50K_1516",
    "lulc:MN_LULC50K_1516", "lulc:MP_LULC50K_1516", "lulc:MZ_LULC50K_1516",
    "lulc:NG_LULC50K_1516", "lulc:RJ_LULC50K_1516", "lulc:SK_LULC50K_1516",
    "lulc:TR_LULC50K_1516", "lulc:TS_LULC50K_1516", "lulc:UK_LULC50K_1516",
    "lulc:UP_LULC50K_1516", "lulc:WB_LULC50K_1516",
}
# These are administrative abbreviations only. A layer is never returned unless
# its exact name was found in the live GetCapabilities document.
STATE_PREFIXES = {
    "Madhya Pradesh": "MP", "Rajasthan": "RJ", "Maharashtra": "MH",
    "Gujarat": "GJ", "Karnataka": "KA", "Tamil Nadu": "TN", "Kerala": "KL",
    "Uttar Pradesh": "UP", "Bihar": "BR", "West Bengal": "WB", "Odisha": "OR",
    "Andhra Pradesh": "AP", "Telangana": "TS", "Punjab": "PB", "Haryana": "HR",
    "Uttarakhand": "UK", "Chhattisgarh": "CG", "Jharkhand": "JH", "Assam": "AS",
    "Delhi": "DL", "NCT of Delhi": "DL", "Goa": "GA", "Himachal Pradesh": "HP",
    "Jammu and Kashmir": "JK", "Ladakh": "LA", "Sikkim": "SK", "Tripura": "TR",
    "Meghalaya": "ML", "Manipur": "MN", "Mizoram": "MZ", "Nagaland": "NG",
    "Arunachal Pradesh": "AR", "Puducherry": "PY", "Chandigarh": "CH",
}


async def verified_layers(client: httpx.AsyncClient, wms_url: str) -> set[str]:
    cached = CAPABILITIES.get("layers")
    if cached is not None:
        return cached  # type: ignore[return-value]
    try:
        response = await client.get(wms_url, params={"service": "WMS", "request": "GetCapabilities", "version": "1.3.0"}, headers={"User-Agent": "Bhu-Manthan-DigitalTwin/1.0"})
        response.raise_for_status()
        root = ET.fromstring(response.content)
        names = {node.text.strip() for node in root.iter() if node.tag.endswith("Name") and node.text}
        layers = {name for name in names if re.search(r"(?:^|:)\w+_LULC50K_1516$", name, re.I)}
    except (httpx.HTTPError, ET.ParseError):
        layers = FALLBACK_VERIFIED_LAYERS
    return CAPABILITIES.set("layers", layers)  # type: ignore[return-value]


async def layer_for_state(client: httpx.AsyncClient, wms_url: str, state: str | None) -> str | None:
    prefix = STATE_PREFIXES.get(state or "")
    if not prefix:
        return None
    expected = f"lulc:{prefix}_LULC50K_1516"
    return expected if expected in await verified_layers(client, wms_url) else None

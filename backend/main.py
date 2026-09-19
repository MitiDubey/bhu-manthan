from __future__ import annotations
import os
import httpx
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from models.lulc import LulcResponse
from services.bhuvan_lulc import query_lulc

WMS_URL = os.getenv("BHUVAN_WMS_URL", "https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms")
NOMINATIM_URL = os.getenv("NOMINATIM_URL", "https://nominatim.openstreetmap.org/reverse")
app = FastAPI(title="Bhu-Manthan Bhuvan LULC API")
app.add_middleware(CORSMiddleware, allow_origins=[os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")], allow_methods=["GET"], allow_headers=["*"])


@app.get("/api/lulc", response_model=LulcResponse)
async def get_lulc(lat: float = Query(ge=-90, le=90), lng: float = Query(ge=-180, le=180), year: str = "2015-16"):
    if year != "2015-16":
        return LulcResponse(success=False, available=False, message="Only connected Bhuvan LULC 1:50K 2015-16 data is currently supported.", latitude=lat, longitude=lng, year=year)
    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(12.0), follow_redirects=True) as client:
            result = await query_lulc(client, WMS_URL, NOMINATIM_URL, lat, lng)
    except (httpx.HTTPError, ValueError) as error:
        result = {"success": False, "available": False, "message": f"Connected Bhuvan source could not be queried: {type(error).__name__}."}
    return LulcResponse(latitude=lat, longitude=lng, year=year, source="Bhuvan / ISRO-NRSC" if result["success"] else None, dataset="LULC 1:50K" if result["success"] else None, data_type="REAL_SOURCE_DATA" if result["success"] else None, **result)


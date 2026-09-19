# Bhu-Manthan Bhuvan LULC API

This small FastAPI service queries real Bhuvan/ISRO-NRSC **LULC 1:50K, 2015-16** data. It discovers layer names from Bhuvan WMS GetCapabilities and never guesses a layer name. If that public endpoint is temporarily unreachable, it can use a small registry of exact 2015-16 names verified in Bhuvan's current GWC catalogue; the actual classification always still comes from Bhuvan `GetFeatureInfo`. Nominatim is used only to identify the Indian state/UT; it is not a LULC, cadastral, or land-record source.

## Run

```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Query: `http://localhost:8000/api/lulc?lat=23.2599&lng=77.4126`

The API uses WMS `GetFeatureInfo` with a dynamic EPSG:4326 bounding box around the click. It returns real source attributes only (`DIS_OF`, `LULC_CODE`, `DESCR_1`, `DESCR_2`) and returns an explicit unavailable response when a verified Bhuvan layer does not exist or returns no feature.

## Tests

```powershell
python -m unittest discover -s tests
$env:RUN_LIVE_BHUVAN_TESTS=1
python -m unittest discover -s tests
```

The live Bhopal test is opt-in because it calls public Bhuvan and Nominatim services. LULC is thematic land cover only: it is not a legal land use, ownership record, ULPIN, or Khasra record.

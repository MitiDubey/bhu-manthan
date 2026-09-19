"""Run live tests only with RUN_LIVE_BHUVAN_TESTS=1 to respect public services."""
import asyncio
import os
import unittest
from services.bhuvan_lulc import parse_feature_info, query_lulc


class ParsingTests(unittest.TestCase):
    def test_parses_feature_info_attributes(self):
        result = parse_feature_info("""the_geom = [GEOMETRY (Polygon) with 8829 points]
DIS_OF = Bhopal
LULC_CODE = 1
DESCR_1 = Builtup
DESCR_2 = Urban""")
        self.assertEqual(result["district"], "Bhopal")
        self.assertEqual(result["lulc_code"], 1)
        self.assertEqual(result["class_name"], "Builtup")
        self.assertEqual(result["sub_class"], "Urban")

    def test_empty_feature_info_has_no_lulc(self):
        self.assertIsNone(parse_feature_info("Results for FeatureType")["class_name"])


@unittest.skipUnless(os.getenv("RUN_LIVE_BHUVAN_TESTS") == "1", "set RUN_LIVE_BHUVAN_TESTS=1 for public-service integration tests")
class LiveBhuvanTests(unittest.TestCase):
    def test_bhopal_real_feature_info(self):
        import httpx
        async def run():
            async with httpx.AsyncClient(timeout=20) as client:
                return await query_lulc(client, "https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms", "https://nominatim.openstreetmap.org/reverse", 23.2599, 77.4126)
        result = asyncio.run(run())
        self.assertTrue(result["success"])
        self.assertEqual(result["lulc_code"], 1)
        self.assertEqual(result["class_name"], "Builtup")
        self.assertEqual(result["sub_class"], "Urban")


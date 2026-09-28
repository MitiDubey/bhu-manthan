from pydantic import BaseModel


class LulcResponse(BaseModel):
    success: bool
    available: bool = True
    message: str | None = None
    latitude: float
    longitude: float
    source: str | None = None
    dataset: str | None = None
    year: str = "2015-16"
    state: str | None = None
    district: str | None = None
    lulc_code: int | None = None
    class_name: str | None = None
    sub_class: str | None = None
    geometry_type: str | None = None
    area_norm: float | None = None
    shape_length: float | None = None
    shape_area: float | None = None
    data_type: str | None = None


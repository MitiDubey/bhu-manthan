"""Small bounded TTL cache; replaceable with Redis later."""
from __future__ import annotations
from time import monotonic


class TTLCache:
    def __init__(self, max_items: int = 200, ttl_seconds: int = 3600) -> None:
        self.max_items, self.ttl_seconds = max_items, ttl_seconds
        self._items: dict[str, tuple[float, object]] = {}

    def get(self, key: str):
        item = self._items.get(key)
        if item and item[0] > monotonic():
            return item[1]
        self._items.pop(key, None)
        return None

    def set(self, key: str, value: object) -> object:
        if len(self._items) >= self.max_items:
            self._items.pop(next(iter(self._items)))
        self._items[key] = (monotonic() + self.ttl_seconds, value)
        return value


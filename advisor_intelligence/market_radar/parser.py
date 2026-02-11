from __future__ import annotations

from datetime import datetime, timezone
from html.parser import HTMLParser
from typing import Any


class _AnchorParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._current_href: str | None = None
        self._text_chunks: list[str] = []
        self.links: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        attr_map = dict(attrs)
        href = attr_map.get("href")
        if href:
            self._current_href = href.strip()
            self._text_chunks = []

    def handle_data(self, data: str) -> None:
        if self._current_href is not None:
            self._text_chunks.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self._current_href is not None:
            text = " ".join(" ".join(self._text_chunks).split())
            self.links.append((self._current_href, text))
            self._current_href = None
            self._text_chunks = []


def parse_infomoney_headlines(html: str, limit: int = 10) -> list[dict[str, Any]]:
    parser = _AnchorParser()
    parser.feed(html)

    seen: set[str] = set()
    items: list[dict[str, Any]] = []

    for href, title in parser.links:
        if "infomoney.com.br" not in href:
            continue
        if not href or not title or href in seen:
            continue
        if "/ultimas-noticias/" in href:
            continue
        if len(title) < 20:
            continue

        seen.add(href)
        items.append(
            {
                "headline": title,
                "url": href,
                "published_at": datetime.now(timezone.utc).isoformat(),
                "source": "InfoMoney",
            }
        )
        if len(items) >= limit:
            break

    return items

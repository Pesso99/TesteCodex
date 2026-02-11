from __future__ import annotations

from urllib.parse import urlparse
from urllib.request import Request, urlopen

ALLOWED_DOMAINS = {"infomoney.com.br"}
INFOMONEY_LATEST_URL = "https://www.infomoney.com.br/ultimas-noticias/"


def is_allowed_url(url: str) -> bool:
    netloc = urlparse(url).netloc.lower()
    return any(netloc == domain or netloc.endswith(f".{domain}") for domain in ALLOWED_DOMAINS)


def fetch_latest_html(url: str = INFOMONEY_LATEST_URL, timeout: int = 10) -> str:
    if not is_allowed_url(url):
        raise ValueError("URL fora da allowlist")

    request = Request(url, headers={"User-Agent": "advisor-intelligence-mvp/0.1"})
    with urlopen(request, timeout=timeout) as response:  # nosec B310 - domain is allowlisted above
        return response.read().decode("utf-8", errors="ignore")

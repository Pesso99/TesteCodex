from advisor_intelligence.market_radar.classifier import classify_theme
from advisor_intelligence.market_radar.digest import build_market_digest, resolve_source_mode
from advisor_intelligence.market_radar.parser import parse_infomoney_headlines


SAMPLE_HTML = """
<html><body>
  <a href="https://www.infomoney.com.br/economia/copom-mantem-selic/">Copom mantém Selic e mercado reage</a>
  <a href="https://www.infomoney.com.br/mercados/dolar-fecha-em-alta/">Dólar fecha em alta com ruído fiscal</a>
  <a href="https://www.infomoney.com.br/ultimas-noticias/">Últimas Notícias</a>
</body></html>
"""


def test_parse_infomoney_headlines_extracts_items() -> None:
    items = parse_infomoney_headlines(SAMPLE_HTML, limit=5)
    assert len(items) == 2
    assert items[0]["source"] == "InfoMoney"
    assert items[0]["url"].startswith("https://www.infomoney.com.br/")


def test_theme_classification() -> None:
    assert classify_theme("Copom sinaliza pausa na Selic") == "selic_juros"
    assert classify_theme("IPCA surpreende e inflação desacelera") == "inflacao"


def test_source_mode_resolver_defaults_to_mixed() -> None:
    assert resolve_source_mode(None) == "mixed"


def test_market_digest_offline_mode_loads_fixtures() -> None:
    digest = build_market_digest(advisor_goal="captar", limit=4, source_mode="offline")
    assert len(digest["items"]) == 4
    assert "offline" in digest["source_digest"]["notes"].lower()

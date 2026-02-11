from advisor_intelligence.market_radar.classifier import classify_theme
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

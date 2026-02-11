# Advisor Intelligence Layer (Brasil)

MVP em **Next.js + TypeScript + Tailwind** para assessores brasileiros melhorarem relacionamento com clientes sem usar dados de CRM ou carteira.

## Funcionalidades MVP

- **Market Radar (Brasil-first)**
  - API `/api/radar` com modo demo e ingestão RSS configurável (InfoMoney + BCB).
  - Gera gatilhos com “por que importa” e “como abordar”.
- **Conversation Engine**
  - API `/api/compose` retorna estratégia, scripts (WhatsApp/email/telefone), objeções e follow-ups.
- **Profile Simulator**
  - Arquétipos: conservative, income, growth, hnw, trader.
- **Settings**
  - Ajuste local de fontes, tom e disclaimer.
- **Compliance**
  - Disclaimer presente no layout e nas respostas: informativo, não recomendação de investimento.

## Rotas

- `/` Dashboard
- `/radar` Radar de mercado
- `/compose` Composer de conversa
- `/profiles` Arquétipos
- `/history` Histórico local
- `/settings` Configurações

## API

- `GET /api/radar?demo=true|false`
- `POST /api/compose`

## Estrutura

```txt
src/
  app/
    api/compose/route.ts
    api/radar/route.ts
    compose/page.tsx
    history/page.tsx
    profiles/page.tsx
    radar/page.tsx
    settings/page.tsx
    layout.tsx
    page.tsx
  components/
  lib/
    api/
    data/
    schemas/
```

## Rodar localmente

```bash
npm install
npm run dev
```

> Conteúdo educacional e informativo. Não constitui recomendação de investimento.

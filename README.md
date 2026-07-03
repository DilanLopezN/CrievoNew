# CrievoNew

Landing page da Crievo — HTML estático + React (via CDN) com transpilação Babel no navegador. Sem build step.

## Funcionalidades

- **Botão flutuante de WhatsApp** (canto inferior esquerdo) que abre o chat com `+55 11 94450-2819` já com uma mensagem pedindo orçamento.
- **Formulário de contato** integrado ao **Resend**, que envia os emails para a sua caixa de entrada.

## Rodar localmente

O jeito recomendado (só precisa do **Node 18+**, sem npm/instalação): sobe a página **e** a função `/api/contact` juntas, igual à Vercel.

```bash
node dev-server.mjs
# abre em http://localhost:3000  (ou: PORT=5391 node dev-server.mjs)
```

- O **botão de WhatsApp** funciona sempre.
- Para o **formulário enviar email de verdade**, crie um arquivo `.env` (copie de `.env.example`) com a sua `RESEND_API_KEY`. Sem a chave, a página abre normal e o form retorna erro.

```bash
cp .env.example .env   # depois edite e cole a sua RESEND_API_KEY
```

> Só quer ver a página, sem testar o form? Qualquer servidor estático serve:
> `python3 -m http.server 5173`

## Configurar o envio de emails (Resend)

1. Crie a conta no [Resend](https://resend.com) e **verifique o domínio `crievo.tech`** (adicione os registros DNS que o Resend mostrar).
2. Gere uma API key em **Resend → API Keys**.
3. No projeto da Vercel, em **Settings → Environment Variables**, adicione:

   | Variável | Valor | Obrigatório |
   |---|---|---|
   | `RESEND_API_KEY` | sua chave `re_...` | sim |
   | `CONTACT_FROM_EMAIL` | `Crievo <contato@crievo.tech>` | não (default) |
   | `CONTACT_TO_EMAIL` | `dilanlopez009@gmail.com` | não (default) |

   > O remetente (`CONTACT_FROM_EMAIL`) precisa ser de um domínio verificado no Resend.

4. Faça o deploy: `vercel --prod` (ou conecte o repositório no painel da Vercel).

A função fica em [`api/contact.js`](api/contact.js). A API key **nunca** vai para o frontend.

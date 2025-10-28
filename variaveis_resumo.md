# 📊 Resumo das Variáveis de Ambiente - TimmingLoveU

## ✅ CONFIGURAÇÃO COMPLETA COM MERCADO PAGO

### 🔴 Variáveis Obrigatórias (11 variáveis)

| # | Variável | Valor | Status |
|---|----------|-------|--------|
| 1 | `DATABASE_URL` | `postgresql://neondb_owner:npg_0CBHJVFEPz9L@...` | ✅ Configurado |
| 2 | `NEXTAUTH_SECRET` | `s+Se149zp2sGF15kaqsVM8i/3oqkobDLvcpxfERvGLo=` | ✅ Gerado |
| 3 | `NEXTAUTH_URL` | `https://timming-loveu.vercel.app` | ⚠️ Atualizar após deploy |
| 4 | `NODE_ENV` | `production` | ✅ Configurado |
| 5 | `PAYMENT_PROVIDER` | `mercadopago` | ✅ Configurado |
| 6 | `MERCADOPAGO_PUBLIC_KEY` | `APP_USR-9cf7e4b9-b410-4d9e-b8f3-6f9e29ce2a0c` | ✅ Fornecido pelo usuário |
| 7 | `MERCADOPAGO_ACCESS_TOKEN` | `APP_USR-1678121204668263-102301-...` | ✅ Fornecido pelo usuário |
| 8 | `MERCADOPAGO_WEBHOOK_SECRET` | `af4030881cd1689041d91b417b0cdfdd2676...` | ✅ Gerado |
| 9 | `SUBSCRIPTION_PRICE` | `990` (R$ 9,90) | ✅ Configurado |
| 10 | `SUBSCRIPTION_CURRENCY` | `BRL` | ✅ Configurado |
| 11 | `TRIAL_PERIOD_DAYS` | `7` dias | ✅ Configurado |

---

## 🎯 Como Adicionar na Vercel

### Método 1: Interface Web (Mais Fácil)

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto **TimmingLoveU**
3. Vá em **Settings** → **Environment Variables**
4. Para cada variável abaixo, clique em **"Add New"**:

```
Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_0CBHJVFEPz9L@ep-weathered-base-acxmst6l-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
Environment: Production, Preview, Development
```

```
Key: NEXTAUTH_SECRET
Value: s+Se149zp2sGF15kaqsVM8i/3oqkobDLvcpxfERvGLo=
Environment: Production, Preview, Development
```

```
Key: NEXTAUTH_URL
Value: https://timming-loveu.vercel.app
Environment: Production
```

```
Key: NODE_ENV
Value: production
Environment: Production
```

```
Key: PAYMENT_PROVIDER
Value: mercadopago
Environment: Production, Preview, Development
```

```
Key: MERCADOPAGO_PUBLIC_KEY
Value: APP_USR-9cf7e4b9-b410-4d9e-b8f3-6f9e29ce2a0c
Environment: Production, Preview, Development
```

```
Key: MERCADOPAGO_ACCESS_TOKEN
Value: APP_USR-1678121204668263-102301-c2a9d6bed0f5c2648c3811549d6e1309-712155332
Environment: Production
```

```
Key: MERCADOPAGO_WEBHOOK_SECRET
Value: af4030881cd1689041d91b417b0cdfdd2676534137d5f731297afc1e5756f17f
Environment: Production
```

```
Key: SUBSCRIPTION_PRICE
Value: 990
Environment: Production
```

```
Key: SUBSCRIPTION_CURRENCY
Value: BRL
Environment: Production
```

```
Key: TRIAL_PERIOD_DAYS
Value: 7
Environment: Production
```

---

### Método 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Adicionar variáveis (uma por vez)
vercel env add DATABASE_URL production
# Cole: postgresql://neondb_owner:npg_0CBHJVFEPz9L@ep-weathered-base-acxmst6l-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

vercel env add NEXTAUTH_SECRET production
# Cole: s+Se149zp2sGF15kaqsVM8i/3oqkobDLvcpxfERvGLo=

vercel env add NEXTAUTH_URL production
# Cole: https://timming-loveu.vercel.app

vercel env add NODE_ENV production
# Cole: production

vercel env add PAYMENT_PROVIDER production
# Cole: mercadopago

vercel env add MERCADOPAGO_PUBLIC_KEY production
# Cole: APP_USR-9cf7e4b9-b410-4d9e-b8f3-6f9e29ce2a0c

vercel env add MERCADOPAGO_ACCESS_TOKEN production
# Cole: APP_USR-1678121204668263-102301-c2a9d6bed0f5c2648c3811549d6e1309-712155332

vercel env add MERCADOPAGO_WEBHOOK_SECRET production
# Cole: af4030881cd1689041d91b417b0cdfdd2676534137d5f731297afc1e5756f17f

vercel env add SUBSCRIPTION_PRICE production
# Cole: 990

vercel env add SUBSCRIPTION_CURRENCY production
# Cole: BRL

vercel env add TRIAL_PERIOD_DAYS production
# Cole: 7

# Fazer deploy
vercel --prod
```

---

## 📋 Checklist de Deploy

- [ ] Todas as 11 variáveis adicionadas na Vercel
- [ ] Valores copiados EXATAMENTE (sem espaços extras)
- [ ] Environment selecionado corretamente (Production)
- [ ] Deploy realizado
- [ ] URL da Vercel copiada
- [ ] NEXTAUTH_URL atualizada com URL real
- [ ] Redeploy feito após atualizar NEXTAUTH_URL
- [ ] Webhook configurado no Mercado Pago
- [ ] Aplicação testada e funcionando

---

## 🔧 Configurar Webhook do Mercado Pago

Após o deploy:

1. Acesse: https://www.mercadopago.com.br/developers/panel/webhooks
2. Clique em **"Criar Webhook"**
3. Configure:
   - **URL:** `https://SEU-DOMINIO.vercel.app/api/webhooks/mercadopago`
   - **Eventos:** `payment`, `subscription`
   - **Modo:** Produção
4. Salve e teste

---

## ⚠️ Importante

1. **NEXTAUTH_URL:** Atualize com a URL REAL após o primeiro deploy
2. **Credenciais:** Já estão configuradas com valores de PRODUÇÃO
3. **Webhook:** Configure APÓS ter a URL final da aplicação
4. **Redeploy:** Sempre faça após alterar variáveis
5. **Segurança:** NUNCA commite o arquivo .env no Git

---

## 📂 Arquivos Disponíveis

1. **TIMMING_LOVEU.env** - Arquivo .env pronto para usar
2. **vercel_environment_variables.txt** - Versão comentada
3. **variaveis_resumo.md** - Este resumo visual

---

**Status:** ✅ PRONTO PARA DEPLOY!

Todas as variáveis estão configuradas, incluindo as credenciais do Mercado Pago fornecidas por você.

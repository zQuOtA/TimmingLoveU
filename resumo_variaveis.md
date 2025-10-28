# 📊 Resumo Rápido - Variáveis de Ambiente TimmingLoveU

## 🔴 Variáveis OBRIGATÓRIAS

| Variável | Valor Atual/Gerado | Status | Onde Obter |
|----------|-------------------|--------|------------|
| `DATABASE_URL` | postgresql://neondb_owner:npg_... | ✅ Pronto | [Neon.tech](https://neon.tech) |
| `NEXTAUTH_SECRET` | s+Se149zp2sGF15kaqsVM8i/... | ✅ Gerado | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | https://timming-loveu.vercel.app | ⚠️ Atualizar | URL da Vercel após deploy |
| `NODE_ENV` | production | ✅ Pronto | - |

## 💳 Variáveis de PAGAMENTO (Obrigatórias)

| Variável | Valor Atual | Status | Onde Obter |
|----------|-------------|--------|------------|
| `PAYMENT_PROVIDER` | mercadopago | ✅ Pronto | - |
| `MERCADOPAGO_ACCESS_TOKEN` | APP_USR-1678121204668263... | ⚠️ Produção | [Mercado Pago Credentials](https://www.mercadopago.com.br/developers/panel/credentials) |
| `MERCADOPAGO_PUBLIC_KEY` | APP_USR-9cf7e4b9-b410... | ⚠️ Produção | [Mercado Pago Credentials](https://www.mercadopago.com.br/developers/panel/credentials) |
| `MERCADOPAGO_WEBHOOK_SECRET` | af4030881cd1689041d91b417... | ✅ Gerado | - |
| `SUBSCRIPTION_PRICE` | 990 | ✅ Pronto | - |
| `SUBSCRIPTION_CURRENCY` | BRL | ✅ Pronto | - |
| `TRIAL_PERIOD_DAYS` | 7 | ✅ Pronto | - |

## 📧 Variáveis OPCIONAIS (Recomendadas)

| Categoria | Variável | Status | Onde Obter |
|-----------|----------|--------|------------|
| **Email** | `EMAIL_SERVER` | ❌ Configurar | [SendGrid](https://sendgrid.com), [Mailgun](https://mailgun.com) |
| **Email** | `EMAIL_FROM` | ❌ Configurar | Seu domínio |
| **Storage** | `CLOUDINARY_CLOUD_NAME` | ❌ Configurar | [Cloudinary](https://cloudinary.com) |
| **Storage** | `CLOUDINARY_API_KEY` | ❌ Configurar | [Cloudinary](https://cloudinary.com) |
| **Storage** | `CLOUDINARY_API_SECRET` | ❌ Configurar | [Cloudinary](https://cloudinary.com) |
| **Analytics** | `GOOGLE_ANALYTICS_ID` | ❌ Configurar | [Google Analytics](https://analytics.google.com) |
| **Monitoring** | `SENTRY_DSN` | ❌ Configurar | [Sentry](https://sentry.io) |
| **Rate Limit** | `UPSTASH_REDIS_REST_URL` | ❌ Configurar | [Upstash](https://upstash.com) |
| **Rate Limit** | `UPSTASH_REDIS_REST_TOKEN` | ❌ Configurar | [Upstash](https://upstash.com) |

## 🎯 Próximos Passos

### 1. Preparação Imediata
- [x] Valores seguros gerados (NEXTAUTH_SECRET, MERCADOPAGO_WEBHOOK_SECRET)
- [ ] Obter credenciais de PRODUÇÃO do Mercado Pago
- [ ] Definir URL final da aplicação

### 2. Deploy na Vercel
1. Acesse: https://vercel.com/dashboard
2. Importe o repositório TimmingLoveU
3. Em **Settings** → **Environment Variables**, adicione:
   - Todas as variáveis OBRIGATÓRIAS
   - Variáveis de PAGAMENTO
4. Deploy!
5. Copie a URL gerada (ex: `https://timming-loveu-abc123.vercel.app`)
6. Atualize `NEXTAUTH_URL` com esta URL
7. Faça **Redeploy**

### 3. Configurar Webhooks
1. Mercado Pago: https://www.mercadopago.com.br/developers/panel/webhooks
2. Adicione endpoint: `https://SEU-DOMINIO/api/webhooks/mercadopago`
3. Eventos: `payment`, `subscription`
4. Use o `MERCADOPAGO_WEBHOOK_SECRET` gerado

### 4. Configurações Opcionais (Pós-Deploy)
- [ ] Configurar email SMTP para notificações
- [ ] Configurar Cloudinary para uploads de imagens
- [ ] Adicionar Google Analytics
- [ ] Configurar Sentry para monitoramento de erros
- [ ] Configurar Upstash Redis para rate limiting

## ⚠️ ATENÇÕES CRÍTICAS

1. **NEXTAUTH_URL**: Deve ter `https://` e NÃO pode ter `/` no final
2. **Credenciais de Produção**: Use credenciais REAIS do Mercado Pago (não teste)
3. **Redeploy**: Sempre faça redeploy após alterar variáveis
4. **Webhooks**: Configure APÓS o primeiro deploy (precisa da URL)
5. **Secrets**: NUNCA commite valores reais no Git

## 📂 Arquivos Criados

1. **TimmingLoveU_Vercel_ENV_Guide.md** - Guia completo e detalhado
2. **.env.vercel.template** - Template com todas as variáveis
3. **vercel_env_copy_paste.txt** - Valores prontos para copiar/colar
4. **resumo_variaveis.md** - Este resumo rápido

---

**Status Geral**: ⚠️ Pronto para deploy com algumas pendências

**Pendências**:
- Obter credenciais de PRODUÇÃO do Mercado Pago
- Atualizar NEXTAUTH_URL após primeiro deploy
- Configurar webhook do Mercado Pago

**Tempo estimado**: 10-15 minutos

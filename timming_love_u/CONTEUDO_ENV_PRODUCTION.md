# 📄 Conteúdo do Arquivo .env.production

Este é o conteúdo completo do arquivo `.env.production` criado para o projeto TimmingLoveU.

---

## 📍 Localização do Arquivo

```
/home/ubuntu/timming_love_u/TimmingLoveU/.env.production
```

---

## 📝 Conteúdo Completo

```env
# ============================================
# TIMMING LOVEU - PRODUCTION ENVIRONMENT
# ============================================
# Arquivo de configuração para deploy permanente na Vercel
# Data de criação: 28 de Outubro de 2025
# IMPORTANTE: Adicione todas estas variáveis no painel da Vercel
# ============================================

# ============================================
# DATABASE CONFIGURATION (OBRIGATÓRIO)
# ============================================
# PostgreSQL connection URL - Banco de dados hospedado
# Conexão com timeout de 15 segundos para ambientes serverless
DATABASE_URL="postgresql://role_dac86c158:m_dnWSpS3tJGwu1CihK2xpxceTzPse_W@db-dac86c158.db002.hosteddb.reai.io:5432/dac86c158?connect_timeout=15"

# ============================================
# NEXTAUTH CONFIGURATION (OBRIGATÓRIO)
# ============================================
# Secret para criptografia de sessões e tokens JWT
# Gerado com: openssl rand -base64 32
NEXTAUTH_SECRET="4HgkGs7U2tt2TLe35KJTGt0lEGs5l1L2"

# URL de produção do aplicativo (domínio customizado)
# IMPORTANTE: Deve corresponder ao domínio configurado na Vercel
NEXTAUTH_URL="https://timmingloveu.shop"

# ============================================
# MERCADO PAGO CONFIGURATION (OBRIGATÓRIO)
# ============================================
# Provider de pagamento utilizado
PAYMENT_PROVIDER="mercadopago"

# Chave pública do Mercado Pago (usada no frontend)
# Pode ser exposta publicamente
MERCADOPAGO_PUBLIC_KEY="APP_USR-9cf7e4b9-b410-4d9e-b8f3-6f9e29ce2a0c"

# Access Token do Mercado Pago (SENSÍVEL - apenas backend)
# Usado para criar cobranças e gerenciar assinaturas
MERCADOPAGO_ACCESS_TOKEN="APP_USR-1678121204668263-102301-c2a9d6bed0f5c2648c3811549d6e1309-712155332"

# Webhook Secret para validar notificações do Mercado Pago
# Usado para verificar a autenticidade das notificações IPN
MERCADOPAGO_WEBHOOK_SECRET="9YxWOXIRukE1UaTzJyDsigtDFNUOXSjA0cO+5aUTh3c="

# ============================================
# SUBSCRIPTION CONFIGURATION (OBRIGATÓRIO)
# ============================================
# Preço da assinatura em centavos (990 = R$ 9,90)
SUBSCRIPTION_PRICE="990"

# Moeda utilizada (BRL = Real Brasileiro)
SUBSCRIPTION_CURRENCY="BRL"

# Período de trial gratuito em dias
TRIAL_PERIOD_DAYS="7"

# ============================================
# APPLICATION CONFIGURATION (OBRIGATÓRIO)
# ============================================
# Ambiente de execução
NODE_ENV="production"

# Porta do servidor (Vercel gerencia automaticamente)
PORT="3000"

# ============================================
# VERCEL SPECIFIC (AUTO-CONFIGURADO)
# ============================================
# Estas variáveis são configuradas automaticamente pela Vercel
# Não é necessário adicionar manualmente
# VERCEL_URL - URL automática gerada pela Vercel
# VERCEL_ENV - Ambiente (production, preview, development)
# VERCEL_GIT_COMMIT_SHA - SHA do commit do Git

# ============================================
# OPTIONAL CONFIGURATIONS
# ============================================
# As configurações abaixo são opcionais e podem ser adicionadas
# conforme necessário para expandir funcionalidades

# EMAIL CONFIGURATION (Opcional - para notificações)
# EMAIL_SERVER="smtp://username:password@smtp.sendgrid.net:587"
# EMAIL_FROM="noreply@timmingloveu.shop"
# SMTP_HOST="smtp.sendgrid.net"
# SMTP_PORT="587"
# SMTP_USER="apikey"
# SMTP_PASSWORD="your-sendgrid-api-key"

# CLOUD STORAGE (Opcional - para uploads de mídia)
# AWS_ACCESS_KEY_ID="your-access-key"
# AWS_SECRET_ACCESS_KEY="your-secret-key"
# AWS_REGION="sa-east-1"
# AWS_S3_BUCKET="timming-loveu-uploads"

# ANALYTICS (Opcional - para monitoramento)
# NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
# SENTRY_DSN="https://xxx@xxx.ingest.sentry.io/xxx"

# RATE LIMITING (Opcional - para proteção contra abuso)
# UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
# UPSTASH_REDIS_REST_TOKEN="your-token"

# SOCIAL AUTH (Opcional - para login social)
# GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
# GOOGLE_CLIENT_SECRET="your-client-secret"

# FEATURE FLAGS (Opcional - para controle de funcionalidades)
# ENABLE_REGISTRATION="true"
# ENABLE_EMAIL_VERIFICATION="false"
# MAINTENANCE_MODE="false"

# LOGGING (Opcional - para debugging)
# LOG_LEVEL="info"
# ENABLE_QUERY_LOGGING="false"

# SECURITY (Opcional - configurações de segurança)
# CORS_ORIGIN="https://timmingloveu.shop"
# RATE_LIMIT_MAX="100"
# RATE_LIMIT_WINDOW="900000"

# ============================================
# NOTAS IMPORTANTES PARA DEPLOY NA VERCEL
# ============================================
# 1. Adicione TODAS as variáveis obrigatórias no painel da Vercel:
#    Project Settings > Environment Variables
#
# 2. Configure as variáveis para o ambiente "Production"
#
# 3. Após adicionar as variáveis, faça um novo deploy ou
#    use "Redeploy" para aplicar as mudanças
#
# 4. Configure o webhook do Mercado Pago para:
#    https://timmingloveu.shop/api/webhooks/mercadopago
#
# 5. Certifique-se de que o domínio customizado está configurado:
#    - Adicione timmingloveu.shop nas configurações de domínio
#    - Configure os registros DNS conforme instruções da Vercel
#    - Aguarde a propagação do SSL (pode levar até 24h)
#
# 6. Teste o webhook após o deploy usando o painel do Mercado Pago
#
# 7. Monitore os logs da Vercel para verificar se há erros
#
# 8. NUNCA commite este arquivo com valores reais no Git!
#    Use .gitignore para excluir .env.production
#
# ============================================
```

---

## 📊 Resumo das Variáveis

### Variáveis Obrigatórias (14 no total)

#### Database (1)
- `DATABASE_URL` - Conexão PostgreSQL com timeout de 15s

#### NextAuth (2)
- `NEXTAUTH_SECRET` - Secret para criptografia de sessões
- `NEXTAUTH_URL` - URL de produção (https://timmingloveu.shop)

#### Mercado Pago (4)
- `PAYMENT_PROVIDER` - Provider de pagamento (mercadopago)
- `MERCADOPAGO_PUBLIC_KEY` - Chave pública
- `MERCADOPAGO_ACCESS_TOKEN` - Token de acesso (sensível)
- `MERCADOPAGO_WEBHOOK_SECRET` - Secret para validação de webhooks

#### Subscription (3)
- `SUBSCRIPTION_PRICE` - Preço em centavos (990 = R$ 9,90)
- `SUBSCRIPTION_CURRENCY` - Moeda (BRL)
- `TRIAL_PERIOD_DAYS` - Período de trial (7 dias)

#### Application (2)
- `NODE_ENV` - Ambiente (production)
- `PORT` - Porta do servidor (3000)

### Variáveis Opcionais

Comentadas no arquivo, podem ser adicionadas conforme necessário:
- Email (SendGrid, Mailgun, etc.)
- Cloud Storage (AWS S3, Cloudinary)
- Analytics (Google Analytics, Sentry)
- Rate Limiting (Upstash Redis)
- Social Auth (Google, Facebook, GitHub)
- Feature Flags
- Logging
- Security

---

## ⚠️ Avisos de Segurança

1. **NUNCA commite este arquivo no Git!**
   - Adicione `.env.production` ao `.gitignore`
   - Use apenas no painel da Vercel

2. **Valores Sensíveis:**
   - `DATABASE_URL` - Contém senha do banco
   - `NEXTAUTH_SECRET` - Secret de autenticação
   - `MERCADOPAGO_ACCESS_TOKEN` - Token de acesso do Mercado Pago
   - `MERCADOPAGO_WEBHOOK_SECRET` - Secret do webhook

3. **Rotação de Secrets:**
   - Rotacione secrets a cada 3-6 meses
   - Use `openssl rand -base64 32` para gerar novos secrets

---

## 🚀 Como Usar na Vercel

### Método 1: Adicionar Manualmente

1. Acesse o projeto na Vercel
2. Vá em **Settings → Environment Variables**
3. Para cada variável:
   - Copie o nome (ex: `DATABASE_URL`)
   - Copie o valor (ex: `postgresql://...`)
   - Selecione ambiente **"Production"**
   - Clique em **"Add"**
4. Após adicionar todas, faça um **Redeploy**

### Método 2: Usar Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Adicionar variáveis do arquivo
vercel env pull .env.production

# Ou adicionar uma por vez
vercel env add DATABASE_URL production
```

---

## ✅ Checklist de Configuração

- [ ] Arquivo `.env.production` criado
- [ ] Todas as 14 variáveis obrigatórias presentes
- [ ] Valores corretos e sem erros de digitação
- [ ] Arquivo NÃO commitado no Git
- [ ] Variáveis adicionadas no painel da Vercel
- [ ] Ambiente "Production" selecionado para todas
- [ ] Redeploy realizado após adicionar variáveis
- [ ] Aplicação funcionando corretamente

---

## 📞 Próximos Passos

1. **Adicionar variáveis na Vercel** (ver `RESUMO_DEPLOY_VERCEL.md`)
2. **Configurar domínio customizado** (ver `VERCEL_DEPLOY_INSTRUCTIONS.md`)
3. **Configurar webhook do Mercado Pago** (ver `VERCEL_DEPLOY_INSTRUCTIONS.md`)
4. **Testar aplicação em produção**
5. **Monitorar logs e erros**

---

**Arquivo criado em:** 28 de Outubro de 2025  
**Localização:** `/home/ubuntu/timming_love_u/TimmingLoveU/.env.production`  
**Projeto:** TimmingLoveU  
**Domínio:** https://timmingloveu.shop

# 🚀 Guia Completo de Variáveis de Ambiente - TimmingLoveU na Vercel

**Data de criação:** 28 de Outubro de 2025  
**Projeto:** TimmingLoveU - Aplicação de Relacionamento com Sistema de Assinatura

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Variáveis OBRIGATÓRIAS](#variáveis-obrigatórias)
3. [Variáveis de Pagamento (IMPORTANTE)](#variáveis-de-pagamento)
4. [Variáveis OPCIONAIS](#variáveis-opcionais)
5. [Como Adicionar na Vercel](#como-adicionar-na-vercel)
6. [Checklist Pré-Deploy](#checklist-pré-deploy)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Este guia contém **TODAS** as variáveis de ambiente necessárias para fazer o deploy do TimmingLoveU na Vercel. O projeto utiliza:

- ✅ **Next.js** com NextAuth para autenticação
- ✅ **PostgreSQL** (Neon) para banco de dados
- ✅ **Mercado Pago** e/ou **Stripe** para processamento de pagamentos
- ✅ **Cloudinary** (opcional) para upload de imagens
- ✅ **Email SMTP** (opcional) para notificações

---

## 🔴 Variáveis OBRIGATÓRIAS

### 1. DATABASE_URL
**Descrição:** URL de conexão do banco de dados PostgreSQL

**Formato:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

**Onde obter:**
- **Neon Database:** https://neon.tech/ (Gratuito)
- **Supabase:** https://supabase.com/ (Gratuito)
- **Railway:** https://railway.app/
- **Vercel Postgres:** https://vercel.com/storage/postgres

**Valor atual do projeto:**
```
postgresql://neondb_owner:npg_0CBHJVFEPz9L@ep-weathered-base-acxmst6l-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

⚠️ **ATENÇÃO:** Se você vai usar o banco existente, use o valor acima. Se criar um novo banco, substitua pela nova URL.

---

### 2. NEXTAUTH_SECRET
**Descrição:** Chave secreta para criptografia JWT do NextAuth (autenticação)

**VALOR GERADO PARA VOCÊ (COPIE E USE):**
```
s+Se149zp2sGF15kaqsVM8i/3oqkobDLvcpxfERvGLo=
```

⚠️ **CRÍTICO:** Use uma chave DIFERENTE para produção! Nunca compartilhe este valor publicamente.

**Como gerar um novo (se quiser):**
```bash
openssl rand -base64 32
```

---

### 3. NEXTAUTH_URL
**Descrição:** URL completa da aplicação em produção

**Formato:**
```
https://seu-dominio.vercel.app
```

**Exemplos:**
- Se usar domínio Vercel: `https://timming-loveu.vercel.app`
- Se usar domínio personalizado: `https://timmingloveu.shop`

⚠️ **IMPORTANTE:** 
- **DEVE** começar com `https://`
- **NÃO** coloque barra `/` no final
- Use o domínio exato que a Vercel vai gerar (ou seu domínio personalizado)

**Sugestão:** 
1. Faça o primeiro deploy SEM esta variável
2. Veja qual URL a Vercel gerou (ex: `https://timming-loveu-abc123.vercel.app`)
3. Adicione esta variável com a URL correta
4. Faça redeploy

---

### 4. NODE_ENV
**Descrição:** Ambiente de execução da aplicação

**Valor para Vercel:**
```
production
```

⚠️ **NOTA:** A Vercel configura automaticamente, mas é bom adicionar explicitamente.

---

## 💳 Variáveis de Pagamento (IMPORTANTE)

O projeto suporta **Mercado Pago** (LATAM) e **Stripe** (Internacional). Configure **PELO MENOS UM** sistema de pagamento.

### Escolha do Provider

**PAYMENT_PROVIDER**
```
mercadopago
```
ou
```
stripe
```

---

### 🇧🇷 Mercado Pago (Recomendado para Brasil/LATAM)

#### MERCADOPAGO_ACCESS_TOKEN
**Descrição:** Token de acesso da API do Mercado Pago

**Onde obter:**
1. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
2. Faça login na sua conta Mercado Pago
3. Vá em **"Suas credenciais"** → **"Credenciais de produção"**
4. Copie o **Access Token**

**Valor atual (TESTE - SUBSTITUA EM PRODUÇÃO):**
```
APP_USR-1678121204668263-102301-c2a9d6bed0f5c2648c3811549d6e1309-712155332
```

---

#### MERCADOPAGO_PUBLIC_KEY
**Descrição:** Chave pública do Mercado Pago (frontend)

**Onde obter:** Mesmo local acima, copie a **Public Key**

**Valor atual (TESTE - SUBSTITUA EM PRODUÇÃO):**
```
APP_USR-9cf7e4b9-b410-4d9e-b8f3-6f9e29ce2a0c
```

---

#### MERCADOPAGO_WEBHOOK_SECRET
**Descrição:** Segredo para validar webhooks do Mercado Pago

**VALOR GERADO PARA VOCÊ:**
```
af4030881cd1689041d91b417b0cdfdd2676534137d5f731297afc1e5756f17f
```

**Como configurar webhook:**
1. Vá em: https://www.mercadopago.com.br/developers/panel/webhooks
2. Adicione URL: `https://SEU-DOMINIO.vercel.app/api/webhooks/mercadopago`
3. Eventos: `payment`, `subscription`
4. Use o secret acima para validação no código

---

### 💳 Stripe (Alternativa Internacional)

Se preferir usar Stripe, configure estas variáveis:

#### STRIPE_SECRET_KEY
**Onde obter:** https://dashboard.stripe.com/apikeys

**Formato:**
```
sk_live_...
```
(Para produção) ou
```
sk_test_...
```
(Para testes)

---

#### STRIPE_PUBLISHABLE_KEY
**Onde obter:** Mesmo local acima

**Formato:**
```
pk_live_...
```
ou
```
pk_test_...
```

---

#### STRIPE_WEBHOOK_SECRET
**Onde obter:** https://dashboard.stripe.com/webhooks

**Como configurar:**
1. Crie um webhook endpoint: `https://SEU-DOMINIO.vercel.app/api/webhooks/stripe`
2. Eventos necessários: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
3. Copie o **Signing secret** (formato: `whsec_...`)

---

### 💰 Configurações de Preço

#### SUBSCRIPTION_PRICE
**Descrição:** Preço da assinatura em centavos

**Formato:** Valor em centavos (sem pontos ou vírgulas)

**Exemplos:**
- R$ 9,90 = `990`
- R$ 99,00 = `9900`
- R$ 19,90 = `1990`

**Valor recomendado:**
```
990
```
(R$ 9,90 ou $ 9.90)

---

#### SUBSCRIPTION_CURRENCY
**Descrição:** Moeda da assinatura

**Valores aceitos:**
- `BRL` (Real Brasileiro)
- `USD` (Dólar Americano)
- `EUR` (Euro)
- `ARS` (Peso Argentino)

**Valor recomendado:**
```
BRL
```

---

#### TRIAL_PERIOD_DAYS
**Descrição:** Período de teste gratuito em dias

**Valor recomendado:**
```
7
```

**Outros exemplos:**
- `0` = Sem período de teste
- `14` = 14 dias grátis
- `30` = 30 dias grátis

---

## 🎨 Variáveis OPCIONAIS

### 📧 Configuração de Email (SMTP)

Use para enviar emails de verificação, redefinição de senha, notificações, etc.

#### EMAIL_SERVER
**Formato:**
```
smtp://username:password@smtp.servidor.com:587
```

**Provedores recomendados:**
- **SendGrid:** https://sendgrid.com/ (Gratuito: 100 emails/dia)
- **Mailgun:** https://mailgun.com/
- **Amazon SES:** https://aws.amazon.com/ses/
- **Gmail:** `smtp://seu-email@gmail.com:senha-app@smtp.gmail.com:587`

**Exemplo SendGrid:**
```
smtp://apikey:SG.sua-api-key-aqui@smtp.sendgrid.net:587
```

---

#### EMAIL_FROM
**Descrição:** Email remetente das notificações

**Formato:**
```
noreply@seudominio.com
```

ou

```
TimmingLoveU <contato@seudominio.com>
```

---

### ☁️ Cloud Storage (Upload de Imagens)

O projeto suporta **Cloudinary** (recomendado) ou **AWS S3**.

#### 🎨 Cloudinary (Mais Fácil)

**Onde obter:** https://cloudinary.com/ (Gratuito: 25 GB/mês)

##### CLOUDINARY_CLOUD_NAME
**Exemplo:**
```
dnesk5ghie
```

##### CLOUDINARY_API_KEY
**Exemplo:**
```
149232846577137
```

##### CLOUDINARY_API_SECRET
**Exemplo:**
```
WObUKZM4V0wyrcC_548Yu1YbyvY
```

**Onde encontrar:** Dashboard → Settings → Access Keys

---

#### 📦 AWS S3 (Alternativa)

##### AWS_ACCESS_KEY_ID
##### AWS_SECRET_ACCESS_KEY
##### AWS_REGION
```
us-east-1
```
##### AWS_S3_BUCKET
```
timming-loveu-uploads
```

**Onde obter:** AWS Console → IAM → Create Access Key

---

### 📊 Analytics & Monitoring

#### GOOGLE_ANALYTICS_ID
**Formato:**
```
G-XXXXXXXXXX
```

**Onde obter:** https://analytics.google.com/

---

#### SENTRY_DSN
**Descrição:** Rastreamento de erros em tempo real

**Formato:**
```
https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**Onde obter:** https://sentry.io/ (Gratuito: 5k eventos/mês)

---

### 🚀 Rate Limiting (Upstash Redis)

#### UPSTASH_REDIS_REST_URL
#### UPSTASH_REDIS_REST_TOKEN

**Onde obter:** https://upstash.com/ (Gratuito: 10k comandos/dia)

**Para que serve:** Limitar requisições por IP, prevenir abuso

---

### 🔐 OAuth Social Login (Opcional)

#### Google OAuth
```
GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret
```

**Onde obter:** https://console.cloud.google.com/apis/credentials

---

#### Facebook OAuth
```
FACEBOOK_CLIENT_ID=seu-app-id
FACEBOOK_CLIENT_SECRET=seu-app-secret
```

**Onde obter:** https://developers.facebook.com/apps/

---

#### GitHub OAuth
```
GITHUB_CLIENT_ID=seu-github-client-id
GITHUB_CLIENT_SECRET=seu-github-client-secret
```

**Onde obter:** https://github.com/settings/developers

---

### 🎛️ Feature Flags

```
ENABLE_REGISTRATION=true
ENABLE_EMAIL_VERIFICATION=false
ENABLE_SOCIAL_LOGIN=false
MAINTENANCE_MODE=false
```

---

### 🐞 Debug & Logging

```
DEBUG=false
LOG_LEVEL=info
ENABLE_QUERY_LOGGING=false
```

⚠️ **ATENÇÃO:** Mantenha `DEBUG=false` em produção!

---

## 🚀 Como Adicionar na Vercel

### Método 1: Interface Web (Recomendado)

1. **Acesse seu projeto na Vercel:**
   - https://vercel.com/dashboard

2. **Vá em Settings:**
   - `Seu Projeto` → **Settings** → **Environment Variables**

3. **Adicione cada variável:**
   - **Key:** Nome da variável (ex: `DATABASE_URL`)
   - **Value:** Valor da variável
   - **Environment:** Selecione `Production`, `Preview`, `Development` (ou todas)

4. **Clique em "Save"**

5. **IMPORTANTE:** Após adicionar todas as variáveis, faça **Redeploy**:
   - Vá em **Deployments**
   - Clique nos 3 pontos do último deploy
   - Clique em **Redeploy**

---

### Método 2: CLI (Avançado)

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Adicione variáveis (uma por vez)
vercel env add DATABASE_URL production
# Cole o valor e pressione Enter

# Ou importe de um arquivo
vercel env pull .env.production
```

---

## ✅ Checklist Pré-Deploy

Marque cada item antes de fazer deploy:

### Variáveis Essenciais
- [ ] `DATABASE_URL` - URL do banco PostgreSQL configurada
- [ ] `NEXTAUTH_SECRET` - Secret gerado (32+ caracteres)
- [ ] `NEXTAUTH_URL` - URL da aplicação (https://...)
- [ ] `NODE_ENV` - Definido como `production`

### Sistema de Pagamento (escolha um)
- [ ] **Mercado Pago:** `MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_PUBLIC_KEY`, `MERCADOPAGO_WEBHOOK_SECRET`
- [ ] **Stripe:** `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- [ ] `PAYMENT_PROVIDER` - Definido (`mercadopago` ou `stripe`)
- [ ] `SUBSCRIPTION_PRICE` - Preço configurado (ex: `990`)
- [ ] `SUBSCRIPTION_CURRENCY` - Moeda definida (ex: `BRL`)
- [ ] `TRIAL_PERIOD_DAYS` - Período de teste (ex: `7`)

### Configurações Opcionais (mas recomendadas)
- [ ] Email SMTP configurado para notificações
- [ ] Cloudinary ou S3 configurado para uploads
- [ ] Webhooks configurados no Mercado Pago/Stripe
- [ ] Analytics/Sentry configurado (opcional)

### Verificações Finais
- [ ] Todas as URLs usam HTTPS (não HTTP)
- [ ] Secrets de produção (não valores de teste)
- [ ] Banco de dados tem `sslmode=require`
- [ ] Webhooks apontam para URL correta
- [ ] Nenhuma variável com informações de desenvolvimento

---

## 🔧 Troubleshooting

### ❌ Erro: "Invalid Database URL"

**Solução:**
- Verifique se `DATABASE_URL` tem o formato correto
- Confirme que inclui `sslmode=require`
- Teste a conexão no Prisma Studio

---

### ❌ Erro: "NextAuth configuration error"

**Solução:**
- Verifique se `NEXTAUTH_URL` tem `https://`
- Confirme que `NEXTAUTH_SECRET` tem 32+ caracteres
- Faça redeploy após alterar

---

### ❌ Erro: "Payment provider not configured"

**Solução:**
- Verifique se `PAYMENT_PROVIDER` está definido (`mercadopago` ou `stripe`)
- Confirme que as variáveis do provider escolhido estão configuradas
- Teste as credenciais no dashboard do provider

---

### ❌ Webhooks não funcionam

**Solução:**
1. **Mercado Pago:** 
   - URL: `https://SEU-DOMINIO/api/webhooks/mercadopago`
   - Eventos: `payment`, `subscription`
   - Verifique o secret

2. **Stripe:**
   - URL: `https://SEU-DOMINIO/api/webhooks/stripe`
   - Eventos: `checkout.session.completed`, `customer.subscription.*`
   - Use `whsec_...` do webhook criado

---

### ❌ Uploads de imagem falham

**Solução:**
- Configure Cloudinary ou AWS S3
- Verifique as credenciais
- Teste upload no dashboard do provider

---

### ❌ Emails não são enviados

**Solução:**
- Verifique `EMAIL_SERVER` e `EMAIL_FROM`
- Teste credenciais SMTP
- Para Gmail, use "Senhas de App"
- Verifique logs da Vercel (Function Logs)

---

## 📞 Suporte Adicional

### Documentação Oficial

- **Vercel:** https://vercel.com/docs/environment-variables
- **Next.js:** https://nextjs.org/docs/basic-features/environment-variables
- **NextAuth:** https://next-auth.js.org/configuration/options
- **Prisma:** https://www.prisma.io/docs/reference/database-reference/connection-urls
- **Mercado Pago:** https://www.mercadopago.com.br/developers/
- **Stripe:** https://stripe.com/docs

### Comandos Úteis

```bash
# Gerar NEXTAUTH_SECRET
openssl rand -base64 32

# Gerar WEBHOOK_SECRET
openssl rand -hex 32

# Testar conexão com banco
npx prisma db push

# Ver logs da Vercel
vercel logs
```

---

## 🎉 Pronto para Deploy!

Depois de configurar todas as variáveis obrigatórias:

1. **Commit e push** seu código para GitHub/GitLab/Bitbucket
2. **Conecte** o repositório na Vercel
3. **Adicione** todas as variáveis de ambiente
4. **Deploy** automaticamente
5. **Configure** webhooks nos dashboards de pagamento
6. **Teste** a aplicação em produção

**Boa sorte com seu deploy! 🚀**

---

*Gerado em 28 de Outubro de 2025*  
*TimmingLoveU - Sistema de Relacionamento com Assinatura*

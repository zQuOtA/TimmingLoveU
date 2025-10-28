# 🚀 Passo a Passo - Deploy TimmingLoveU na Vercel

**Tempo estimado:** 15-20 minutos  
**Última atualização:** 28 de Outubro de 2025

---

## 📋 Checklist de Preparação

Antes de começar, certifique-se que você tem:

- [ ] Conta na Vercel (https://vercel.com)
- [ ] Conta no Mercado Pago (para pagamentos)
- [ ] Repositório Git do projeto (GitHub, GitLab ou Bitbucket)
- [ ] Acesso ao banco de dados PostgreSQL (Neon, Supabase, etc.)

---

## 🎯 PASSO 1: Preparar Credenciais do Mercado Pago

### 1.1 Acessar Dashboard
1. Vá para: https://www.mercadopago.com.br/developers/panel/credentials
2. Faça login na sua conta Mercado Pago

### 1.2 Obter Credenciais de PRODUÇÃO
⚠️ **IMPORTANTE:** Use credenciais de **PRODUÇÃO** (não teste)

1. No painel, selecione **"Credenciais de produção"**
2. Copie e salve:
   - **Access Token** (começa com `APP_USR-`)
   - **Public Key** (começa com `APP_USR-`)

### 1.3 Anotar Credenciais
Salve temporariamente em um arquivo seguro:

```
MERCADOPAGO_ACCESS_TOKEN=APP_USR-[seu-token-aqui]
MERCADOPAGO_PUBLIC_KEY=APP_USR-[sua-chave-aqui]
```

---

## 🎯 PASSO 2: Fazer Push do Código para Git

### 2.1 Se ainda não estiver em um repositório Git:

```bash
cd /home/ubuntu/Uploads/TimmingLoveU

# Inicializar Git (se necessário)
git init

# Adicionar remote (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/timming-loveu.git

# Commit e push
git add .
git commit -m "Preparação para deploy na Vercel"
git push -u origin main
```

### 2.2 Se já estiver em um repositório:

```bash
cd /home/ubuntu/Uploads/TimmingLoveU

git add .
git commit -m "Atualização para deploy"
git push
```

---

## 🎯 PASSO 3: Importar Projeto na Vercel

### 3.1 Acessar Vercel
1. Vá para: https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**

### 3.2 Importar Repositório
1. Selecione seu provedor Git (GitHub, GitLab, Bitbucket)
2. Autorize o acesso (se necessário)
3. Encontre e selecione o repositório **TimmingLoveU**
4. Clique em **"Import"**

### 3.3 Configurações Iniciais
1. **Project Name:** `timming-loveu` (ou o que preferir)
2. **Framework Preset:** Next.js (deve ser detectado automaticamente)
3. **Root Directory:** `./` (deixe como está)
4. **Build Command:** `npm run build` (padrão)
5. **Output Directory:** `.next` (padrão)

⚠️ **NÃO clique em "Deploy" ainda!**

---

## 🎯 PASSO 4: Adicionar Variáveis de Ambiente

### 4.1 Acessar Environment Variables
1. Na tela de configuração do projeto, clique em **"Environment Variables"**
2. Ou vá em: Settings → Environment Variables (após criar o projeto)

### 4.2 Adicionar Variáveis OBRIGATÓRIAS

Adicione cada variável abaixo:

#### 1. DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** 
```
postgresql://neondb_owner:npg_0CBHJVFEPz9L@ep-weathered-base-acxmst6l-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
- **Environment:** Production, Preview, Development (todas)
- Clique em **"Add"**

#### 2. NEXTAUTH_SECRET
- **Key:** `NEXTAUTH_SECRET`
- **Value:** 
```
s+Se149zp2sGF15kaqsVM8i/3oqkobDLvcpxfERvGLo=
```
- **Environment:** Production, Preview, Development (todas)
- Clique em **"Add"**

#### 3. NEXTAUTH_URL
⚠️ **ATENÇÃO:** Deixe esta variável para DEPOIS do primeiro deploy!

Por enquanto, adicione um valor temporário:
- **Key:** `NEXTAUTH_URL`
- **Value:** `https://timming-loveu.vercel.app` (temporário)
- **Environment:** Production
- Clique em **"Add"**

#### 4. NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Environment:** Production
- Clique em **"Add"**

---

### 4.3 Adicionar Variáveis de PAGAMENTO

#### 5. PAYMENT_PROVIDER
- **Key:** `PAYMENT_PROVIDER`
- **Value:** `mercadopago`
- **Environment:** Production, Preview, Development (todas)
- Clique em **"Add"**

#### 6. MERCADOPAGO_ACCESS_TOKEN
- **Key:** `MERCADOPAGO_ACCESS_TOKEN`
- **Value:** `[Cole o Access Token de PRODUÇÃO que você copiou no PASSO 1]`
- **Environment:** Production
- Clique em **"Add"**

#### 7. MERCADOPAGO_PUBLIC_KEY
- **Key:** `MERCADOPAGO_PUBLIC_KEY`
- **Value:** `[Cole a Public Key de PRODUÇÃO que você copiou no PASSO 1]`
- **Environment:** Production, Preview, Development (todas)
- Clique em **"Add"**

#### 8. MERCADOPAGO_WEBHOOK_SECRET
- **Key:** `MERCADOPAGO_WEBHOOK_SECRET`
- **Value:** 
```
af4030881cd1689041d91b417b0cdfdd2676534137d5f731297afc1e5756f17f
```
- **Environment:** Production
- Clique em **"Add"**

---

### 4.4 Adicionar Configurações de PREÇO

#### 9. SUBSCRIPTION_PRICE
- **Key:** `SUBSCRIPTION_PRICE`
- **Value:** `990` (R$ 9,90)
- **Environment:** Production
- Clique em **"Add"**

#### 10. SUBSCRIPTION_CURRENCY
- **Key:** `SUBSCRIPTION_CURRENCY`
- **Value:** `BRL`
- **Environment:** Production
- Clique em **"Add"**

#### 11. TRIAL_PERIOD_DAYS
- **Key:** `TRIAL_PERIOD_DAYS`
- **Value:** `7`
- **Environment:** Production
- Clique em **"Add"**

---

## 🎯 PASSO 5: Fazer o Deploy

### 5.1 Iniciar Deploy
1. Clique em **"Deploy"**
2. Aguarde o build completar (3-5 minutos)
3. A Vercel vai:
   - Instalar dependências
   - Executar `npm run build`
   - Fazer deploy da aplicação

### 5.2 Verificar Status
1. Acompanhe o log de build em tempo real
2. Se houver erros, verifique as variáveis de ambiente
3. Aguarde a mensagem de sucesso ✅

### 5.3 Copiar URL Gerada
1. Após o deploy, copie a URL gerada pela Vercel
2. Exemplo: `https://timming-loveu-abc123.vercel.app`

---

## 🎯 PASSO 6: Atualizar NEXTAUTH_URL

### 6.1 Atualizar Variável
1. Vá em **Settings** → **Environment Variables**
2. Encontre a variável `NEXTAUTH_URL`
3. Clique em **"Edit"**
4. Atualize para a URL EXATA gerada pela Vercel:
   ```
   https://timming-loveu-abc123.vercel.app
   ```
   (substitua pela sua URL)
5. Clique em **"Save"**

### 6.2 Fazer Redeploy
1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **"Redeploy"**
4. Aguarde o novo deploy completar

---

## 🎯 PASSO 7: Configurar Webhook do Mercado Pago

### 7.1 Acessar Painel de Webhooks
1. Vá para: https://www.mercadopago.com.br/developers/panel/webhooks
2. Clique em **"Criar Webhook"**

### 7.2 Configurar Endpoint
1. **URL do Webhook:**
   ```
   https://[SUA-URL-VERCEL]/api/webhooks/mercadopago
   ```
   Exemplo:
   ```
   https://timming-loveu-abc123.vercel.app/api/webhooks/mercadopago
   ```

2. **Eventos a monitorar:**
   - ✅ `payment`
   - ✅ `subscription` (se disponível)
   - ✅ `chargebacks` (recomendado)

3. **Modo:** Produção

4. Clique em **"Salvar"**

### 7.3 Testar Webhook
1. No painel do Mercado Pago, clique em **"Testar"**
2. Envie um evento de teste
3. Verifique se o endpoint responde com sucesso (status 200)

---

## 🎯 PASSO 8: Testar a Aplicação

### 8.1 Acessar URL em Produção
1. Abra a URL da Vercel no navegador
2. Exemplo: `https://timming-loveu-abc123.vercel.app`

### 8.2 Testar Funcionalidades Principais

**1. Registro de Usuário:**
- [ ] Criar uma nova conta
- [ ] Verificar se o usuário é criado no banco

**2. Login:**
- [ ] Fazer login com a conta criada
- [ ] Verificar se a sessão funciona

**3. Sistema de Pagamento:**
- [ ] Tentar iniciar uma assinatura
- [ ] Verificar se redireciona para Mercado Pago
- [ ] Completar um pagamento de teste
- [ ] Verificar se o webhook recebe a notificação

**4. Funcionalidades do App:**
- [ ] Navegar pelas páginas principais
- [ ] Testar upload de imagens (se aplicável)
- [ ] Verificar se o período de teste está ativo

### 8.3 Verificar Logs
1. Na Vercel: **Deployments** → Selecione o deploy → **Functions**
2. Verifique se há erros nos logs
3. Confirme que os webhooks estão sendo recebidos

---

## 🎯 PASSO 9 (OPCIONAL): Adicionar Domínio Personalizado

### 9.1 Se você tem um domínio (ex: timmingloveu.shop)
1. Vá em **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite seu domínio: `timmingloveu.shop`
4. Clique em **"Add"**

### 9.2 Configurar DNS
1. A Vercel vai mostrar os registros DNS necessários
2. Vá no painel do seu provedor de domínio (Registro.br, GoDaddy, etc.)
3. Adicione os registros A ou CNAME indicados pela Vercel
4. Aguarde propagação DNS (5-60 minutos)

### 9.3 Atualizar NEXTAUTH_URL novamente
1. Após o domínio estar ativo
2. Atualize `NEXTAUTH_URL` para: `https://timmingloveu.shop`
3. Faça redeploy
4. Atualize o webhook do Mercado Pago para usar o novo domínio

---

## 🎯 PASSO 10 (OPCIONAL): Configurações Adicionais

### 10.1 Email SMTP (Recomendado)
Configure para enviar emails de notificação:

**SendGrid (Gratuito - 100 emails/dia):**
1. Crie conta em: https://sendgrid.com/
2. Obtenha API Key
3. Adicione variáveis na Vercel:
   ```
   EMAIL_SERVER=smtp://apikey:SUA-API-KEY@smtp.sendgrid.net:587
   EMAIL_FROM=noreply@seudominio.com
   ```

### 10.2 Cloud Storage (Recomendado)
Configure para upload de imagens:

**Cloudinary (Gratuito - 25 GB/mês):**
1. Crie conta em: https://cloudinary.com/
2. Obtenha credenciais em: Dashboard → Settings → Access Keys
3. Adicione variáveis na Vercel:
   ```
   CLOUDINARY_CLOUD_NAME=seu-cloud-name
   CLOUDINARY_API_KEY=sua-api-key
   CLOUDINARY_API_SECRET=seu-api-secret
   ```

### 10.3 Analytics (Recomendado)
Configure Google Analytics:

1. Crie propriedade em: https://analytics.google.com/
2. Obtenha ID de medição (formato: `G-XXXXXXXXXX`)
3. Adicione variável na Vercel:
   ```
   GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

### 10.4 Monitoramento de Erros (Recomendado)
Configure Sentry:

1. Crie projeto em: https://sentry.io/
2. Obtenha DSN
3. Adicione variável na Vercel:
   ```
   SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

---

## ✅ Checklist Final

### Deploy Básico (Mínimo para funcionar)
- [ ] Código pushado para Git
- [ ] Projeto importado na Vercel
- [ ] Todas variáveis OBRIGATÓRIAS configuradas
- [ ] Variáveis de PAGAMENTO configuradas
- [ ] Deploy realizado com sucesso
- [ ] NEXTAUTH_URL atualizada
- [ ] Redeploy após atualizar NEXTAUTH_URL
- [ ] Webhook do Mercado Pago configurado
- [ ] Aplicação testada e funcionando

### Deploy Completo (Recomendado)
- [ ] Domínio personalizado configurado
- [ ] Email SMTP configurado
- [ ] Cloud storage configurado
- [ ] Google Analytics adicionado
- [ ] Sentry para monitoramento
- [ ] SSL/HTTPS funcionando
- [ ] Webhooks testados
- [ ] Todos os fluxos de pagamento testados
- [ ] Período de teste funcionando

---

## 🚨 Troubleshooting

### Erro: "Build Failed"
**Solução:**
1. Verifique os logs de build
2. Confirme que todas as variáveis obrigatórias estão configuradas
3. Teste o build localmente: `npm run build`
4. Verifique se há erros no código

### Erro: "Database Connection Failed"
**Solução:**
1. Verifique se `DATABASE_URL` está correta
2. Confirme que inclui `sslmode=require`
3. Teste a conexão: `npx prisma db push`

### Erro: "NextAuth Configuration Error"
**Solução:**
1. Verifique se `NEXTAUTH_URL` tem `https://`
2. Confirme que não tem `/` no final
3. Use a URL EXATA da Vercel
4. Faça redeploy após alterar

### Webhook não funciona
**Solução:**
1. Verifique a URL do webhook (deve ser `/api/webhooks/mercadopago`)
2. Confirme que está usando a URL correta da aplicação
3. Teste manualmente no painel do Mercado Pago
4. Verifique logs da Vercel em **Function Logs**

### Pagamento não processa
**Solução:**
1. Use credenciais de PRODUÇÃO (não teste)
2. Verifique se `PAYMENT_PROVIDER` está configurado
3. Confirme que as chaves do Mercado Pago estão corretas
4. Teste no ambiente de sandbox do Mercado Pago primeiro

---

## 📞 Recursos e Suporte

### Documentação Útil
- **Vercel:** https://vercel.com/docs
- **Next.js:** https://nextjs.org/docs
- **Mercado Pago:** https://www.mercadopago.com.br/developers/
- **NextAuth:** https://next-auth.js.org/

### Arquivos de Referência
1. **TimmingLoveU_Vercel_ENV_Guide.md** - Guia detalhado de variáveis
2. **vercel_env_copy_paste.txt** - Valores prontos para copiar
3. **resumo_variaveis.md** - Resumo rápido em tabela
4. **.env.vercel.template** - Template completo

---

## 🎉 Parabéns!

Se você seguiu todos os passos, sua aplicação TimmingLoveU deve estar:

✅ Deployada na Vercel  
✅ Com HTTPS funcionando  
✅ Banco de dados conectado  
✅ Sistema de pagamento integrado  
✅ Webhooks configurados  
✅ Pronta para receber usuários!

**Próximos passos:**
1. Teste todos os fluxos da aplicação
2. Configure as funcionalidades opcionais
3. Monitore os logs e erros
4. Divulgue sua aplicação!

**Boa sorte com seu projeto! 🚀**

---

*Guia criado em 28 de Outubro de 2025*  
*TimmingLoveU - Deploy na Vercel*

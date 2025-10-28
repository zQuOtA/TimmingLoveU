# 📋 Resumo Rápido - Deploy TimmingLoveU na Vercel

## ✅ Arquivos Criados

1. **`.env.production`** - Variáveis de ambiente para produção (com valores reais)
2. **`.env.example`** - Template de variáveis (sem valores sensíveis)
3. **`VERCEL_DEPLOY_INSTRUCTIONS.md`** - Guia completo de deploy (este documento)

---

## 🔐 Variáveis de Ambiente para Adicionar na Vercel

Copie e cole estas variáveis no painel da Vercel (**Settings → Environment Variables**):

### Database
```
DATABASE_URL=postgresql://role_dac86c158:m_dnWSpS3tJGwu1CihK2xpxceTzPse_W@db-dac86c158.db002.hosteddb.reai.io:5432/dac86c158?connect_timeout=15
```

### NextAuth
```
NEXTAUTH_SECRET=4HgkGs7U2tt2TLe35KJTGt0lEGs5l1L2
NEXTAUTH_URL=https://timmingloveu.shop
```

### Mercado Pago
```
PAYMENT_PROVIDER=mercadopago
MERCADOPAGO_PUBLIC_KEY=APP_USR-9cf7e4b9-b410-4d9e-b8f3-6f9e29ce2a0c
MERCADOPAGO_ACCESS_TOKEN=APP_USR-1678121204668263-102301-c2a9d6bed0f5c2648c3811549d6e1309-712155332
MERCADOPAGO_WEBHOOK_SECRET=9YxWOXIRukE1UaTzJyDsigtDFNUOXSjA0cO+5aUTh3c=
```

### Subscription
```
SUBSCRIPTION_PRICE=990
SUBSCRIPTION_CURRENCY=BRL
TRIAL_PERIOD_DAYS=7
```

### Application
```
NODE_ENV=production
PORT=3000
```

---

## 🚀 Passos Rápidos para Deploy

### 1. Preparar Repositório Git
```bash
# Certifique-se de que .env.production está no .gitignore
git add .
git commit -m "Preparar para deploy na Vercel"
git push origin main
```

### 2. Importar na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New..." → "Project"**
3. Selecione o repositório TimmingLoveU
4. Clique em **"Import"**

### 3. Adicionar Variáveis de Ambiente
1. Na tela de configuração, clique em **"Environment Variables"**
2. Adicione TODAS as 14 variáveis listadas acima
3. Selecione ambiente **"Production"** para cada uma
4. Clique em **"Deploy"**

### 4. Configurar Domínio
1. Após o deploy, vá em **Settings → Domains**
2. Adicione: `timmingloveu.shop`
3. Configure DNS conforme instruções da Vercel
4. Aguarde propagação (1-24h)

### 5. Configurar Webhook do Mercado Pago
1. Acesse [Painel do Mercado Pago](https://www.mercadopago.com.br/developers/panel/webhooks)
2. Crie webhook com URL: `https://timmingloveu.shop/api/webhooks/mercadopago`
3. Selecione todos os eventos de pagamento e assinatura
4. Salve e teste

---

## 📊 Tabela de Variáveis

| Variável | Valor | Ambiente |
|----------|-------|----------|
| DATABASE_URL | `postgresql://role_dac86c158:...` | Production |
| NEXTAUTH_SECRET | `4HgkGs7U2tt2TLe35KJTGt0lEGs5l1L2` | Production |
| NEXTAUTH_URL | `https://timmingloveu.shop` | Production |
| PAYMENT_PROVIDER | `mercadopago` | Production |
| MERCADOPAGO_PUBLIC_KEY | `APP_USR-9cf7e4b9-b410-4d9e-b8f3-6f9e29ce2a0c` | Production |
| MERCADOPAGO_ACCESS_TOKEN | `APP_USR-1678121204668263-102301-...` | Production |
| MERCADOPAGO_WEBHOOK_SECRET | `9YxWOXIRukE1UaTzJyDsigtDFNUOXSjA0cO+5aUTh3c=` | Production |
| SUBSCRIPTION_PRICE | `990` | Production |
| SUBSCRIPTION_CURRENCY | `BRL` | Production |
| TRIAL_PERIOD_DAYS | `7` | Production |
| NODE_ENV | `production` | Production |
| PORT | `3000` | Production |

---

## ⚠️ Checklist Pré-Deploy

- [ ] Código commitado no Git (sem .env.production)
- [ ] .gitignore configurado corretamente
- [ ] Build local funciona (`npm run build`)
- [ ] Banco de dados acessível
- [ ] Credenciais do Mercado Pago válidas

---

## ✅ Checklist Pós-Deploy

- [ ] Build completou com sucesso
- [ ] Site acessível em https://timmingloveu.shop
- [ ] SSL ativo (cadeado verde)
- [ ] Login/Registro funcionando
- [ ] Conexão com banco OK
- [ ] Webhook configurado e testado
- [ ] Pagamento de teste realizado

---

## 🔗 Links Importantes

- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Mercado Pago Webhooks:** [mercadopago.com.br/developers/panel/webhooks](https://www.mercadopago.com.br/developers/panel/webhooks)
- **Mercado Pago Credentials:** [mercadopago.com.br/developers/panel/credentials](https://www.mercadopago.com.br/developers/panel/credentials)
- **DNS Checker:** [dnschecker.org](https://dnschecker.org)

---

## 🆘 Problemas Comuns

### Build Falha
- Verifique logs de build na Vercel
- Teste `npm run build` localmente
- Corrija erros de TypeScript/ESLint

### Erro de Banco de Dados
- Verifique DATABASE_URL
- Confirme que banco está acessível
- Adicione `?connect_timeout=15` na URL

### NextAuth Não Funciona
- Verifique NEXTAUTH_SECRET e NEXTAUTH_URL
- Confirme que domínio tem SSL
- Limpe cookies do navegador

### Webhook Não Recebe
- Verifique URL do webhook no Mercado Pago
- Confirme MERCADOPAGO_WEBHOOK_SECRET
- Teste manualmente no painel

---

## 📞 Suporte

- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Mercado Pago:** [mercadopago.com.br/developers/support](https://www.mercadopago.com.br/developers/support)
- **Documentação Completa:** Ver `VERCEL_DEPLOY_INSTRUCTIONS.md`

---

**Criado em:** 28 de Outubro de 2025  
**Projeto:** TimmingLoveU  
**Domínio:** https://timmingloveu.shop

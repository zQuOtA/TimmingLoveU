# 💳 Sistema de Pagamento - Timming LoveU

Documentação completa para configuração e uso do sistema de pagamento integrado com Stripe e Mercado Pago.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Recursos Implementados](#recursos-implementados)
3. [Configuração das API Keys](#configuração-das-api-keys)
4. [Configuração do Stripe](#configuração-do-stripe)
5. [Configuração do Mercado Pago](#configuração-do-mercado-pago)
6. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
7. [Testando Webhooks Localmente](#testando-webhooks-localmente)
8. [Deploy para Produção](#deploy-para-produção)
9. [Fluxo de Assinatura](#fluxo-de-assinatura)
10. [API Endpoints](#api-endpoints)
11. [Componentes Frontend](#componentes-frontend)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

O sistema de pagamento do Timming LoveU oferece:

- **Dual Provider**: Escolha entre Stripe ou Mercado Pago
- **Trial de 7 Dias**: Período de teste gratuito para novos usuários
- **Assinaturas Mensais**: Renovação automática
- **Webhooks**: Verificação automática de pagamentos
- **Gerenciamento**: Cancelamento e renovação de assinaturas
- **Proteção de Rotas**: Middleware para verificar assinatura ativa

---

## ✨ Recursos Implementados

### Backend
- ✅ Schema Prisma atualizado com modelos de assinatura
- ✅ API routes para pagamento e subscriptions
- ✅ Webhooks para Stripe e Mercado Pago
- ✅ Sistema de transações
- ✅ Helpers de pagamento
- ✅ Middleware de proteção

### Frontend
- ✅ Página de pricing com informações de trial
- ✅ Checkout integrado (Stripe & Mercado Pago)
- ✅ Indicador de status no dashboard
- ✅ Hook personalizado `useSubscription`
- ✅ Componente de status de assinatura

---

## 🔑 Configuração das API Keys

### 1. Copie o arquivo `.env.example` para `.env`

```bash
cp .env.example .env
```

### 2. Escolha seu provedor de pagamento

No arquivo `.env`, defina qual provedor usar:

```env
PAYMENT_PROVIDER="stripe"  # ou "mercadopago"
```

### 3. Configure os valores da assinatura

```env
# Preço em centavos (9900 = R$ 99,00 ou $ 99.00)
SUBSCRIPTION_PRICE="9900"

# Moeda (BRL para Real, USD para Dólar)
SUBSCRIPTION_CURRENCY="BRL"

# Período de teste em dias
TRIAL_PERIOD_DAYS="7"
```

---

## 🟦 Configuração do Stripe

### Passo 1: Criar Conta no Stripe

1. Acesse [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Crie sua conta
3. Complete o processo de verificação

### Passo 2: Obter API Keys

1. No Dashboard do Stripe, vá para **Developers > API keys**
2. Copie as seguintes chaves:
   - **Publishable key** (começa com `pk_test_` em modo teste)
   - **Secret key** (começa com `sk_test_` em modo teste)

### Passo 3: Configurar no `.env`

```env
STRIPE_SECRET_KEY="sk_test_sua_chave_secreta"
STRIPE_PUBLISHABLE_KEY="pk_test_sua_chave_publica"
```

### Passo 4: Configurar Webhook

1. No Dashboard do Stripe, vá para **Developers > Webhooks**
2. Clique em **Add endpoint**
3. Configure:
   - **Endpoint URL**: `https://seu-dominio.com/api/payment/webhook/stripe`
   - **Events to send**: Selecione os seguintes eventos:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
4. Clique em **Add endpoint**
5. Copie o **Signing secret** (começa com `whsec_`)

### Passo 5: Adicionar Webhook Secret no `.env`

```env
STRIPE_WEBHOOK_SECRET="whsec_seu_webhook_secret"
```

---

## 🟢 Configuração do Mercado Pago

### Passo 1: Criar Conta no Mercado Pago

1. Acesse [https://www.mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
2. Crie sua conta
3. Complete o processo de verificação

### Passo 2: Obter Credenciais

1. No painel de desenvolvedores, vá para **Suas integrações**
2. Crie uma nova aplicação
3. Acesse as **Credenciais de teste** ou **Credenciais de produção**
4. Copie:
   - **Public Key** (começa com `APP_USR-` ou `TEST-`)
   - **Access Token** (começa com `APP_USR-` ou `TEST-`)

### Passo 3: Configurar no `.env`

```env
MERCADOPAGO_ACCESS_TOKEN="APP_USR-seu_access_token"
MERCADOPAGO_PUBLIC_KEY="APP_USR-sua_public_key"
MERCADOPAGO_WEBHOOK_SECRET="seu_webhook_secret_personalizado"
```

> **Nota**: O `MERCADOPAGO_WEBHOOK_SECRET` é um segredo que você mesmo define para validar webhooks.

### Passo 4: Configurar Webhook

1. No painel do Mercado Pago, vá para **Suas integrações**
2. Selecione sua aplicação
3. Configure a **URL de notificações**:
   - `https://seu-dominio.com/api/payment/webhook/mercadopago`

---

## 🗄️ Configuração do Banco de Dados

### Passo 1: Gerar Cliente Prisma

```bash
npm run prisma:generate
```

### Passo 2: Executar Migrações

Para desenvolvimento:
```bash
npm run db:migrate:dev
```

Para produção:
```bash
npm run db:migrate:prod
```

### Passo 3: Verificar Tabelas

Use o Prisma Studio para verificar as tabelas criadas:

```bash
npm run prisma:studio
```

As seguintes tabelas devem existir:
- `user_subscriptions`
- `transactions`
- `planos_assinatura`

---

## 🧪 Testando Webhooks Localmente

### Usando Stripe CLI

#### 1. Instalar Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Linux
wget -qO- https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_amd64.tar.gz | tar -xz

# Windows
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

#### 2. Login no Stripe CLI

```bash
stripe login
```

#### 3. Encaminhar Webhooks para localhost

```bash
stripe listen --forward-to localhost:3000/api/payment/webhook/stripe
```

Copie o **webhook signing secret** exibido e adicione ao `.env`:

```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### 4. Testar Webhook

Em outro terminal, execute:

```bash
stripe trigger checkout.session.completed
```

### Usando ngrok para Mercado Pago

#### 1. Instalar ngrok

```bash
# macOS
brew install ngrok

# Linux/Windows
# Baixe em https://ngrok.com/download
```

#### 2. Iniciar ngrok

```bash
ngrok http 3000
```

#### 3. Configurar URL no Mercado Pago

Use a URL HTTPS fornecida pelo ngrok (ex: `https://abc123.ngrok.io`) e configure no painel do Mercado Pago:

```
https://abc123.ngrok.io/api/payment/webhook/mercadopago
```

---

## 🚀 Deploy para Produção

### Passo 1: Atualizar para Chaves de Produção

No ambiente de produção (Vercel, Heroku, AWS, etc.), configure as variáveis de ambiente com as chaves de produção:

#### Stripe
```env
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

#### Mercado Pago
```env
MERCADOPAGO_ACCESS_TOKEN="APP_USR-..."  # Production token
MERCADOPAGO_PUBLIC_KEY="APP_USR-..."    # Production key
```

### Passo 2: Configurar URLs de Webhook em Produção

#### Stripe
1. Vá para **Webhooks** no Dashboard
2. Adicione novo endpoint com URL de produção:
   ```
   https://seu-dominio.com/api/payment/webhook/stripe
   ```

#### Mercado Pago
1. Configure a URL de notificações:
   ```
   https://seu-dominio.com/api/payment/webhook/mercadopago
   ```

### Passo 3: Executar Migrações

```bash
npm run db:migrate:prod
```

### Passo 4: Verificar Configurações

```bash
# Build do projeto
npm run build

# Testar localmente o build de produção
npm run start
```

---

## 🔄 Fluxo de Assinatura

### 1. Novo Usuário

```
Usuário se cadastra
    ↓
Acessa página /pricing
    ↓
Clica em "Começar Teste Gratuito"
    ↓
Redireciona para checkout (Stripe/Mercado Pago)
    ↓
Insere dados de pagamento
    ↓
Webhook confirma criação
    ↓
Subscription criada com status "trial"
    ↓
7 dias de acesso gratuito
    ↓
Após 7 dias, primeira cobrança
    ↓
Status muda para "active"
```

### 2. Cancelamento

```
Usuário clica em "Cancelar" no dashboard
    ↓
API cancela no provedor
    ↓
Subscription marcada como cancelAtPeriodEnd
    ↓
Acesso continua até fim do período pago
    ↓
Ao final do período, status muda para "canceled"
```

---

## 🔌 API Endpoints

### Pagamento

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/payment/config` | GET | Retorna configuração do provedor ativo |
| `/api/payment/create-checkout` | POST | Cria sessão de checkout |
| `/api/payment/webhook/stripe` | POST | Webhook do Stripe |
| `/api/payment/webhook/mercadopago` | POST/GET | Webhook do Mercado Pago |

### Assinatura

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/subscription/status` | GET | Verifica status da assinatura |
| `/api/subscription/cancel` | POST | Cancela assinatura |

### Planos

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/planos` | GET | Lista planos ativos |

---

## 🎨 Componentes Frontend

### Hook `useSubscription`

```tsx
import { useSubscription } from '@/hooks/useSubscription';

function MyComponent() {
  const { subscription, hasActiveSubscription, isLoading } = useSubscription();
  
  if (hasActiveSubscription) {
    return <div>Você tem acesso!</div>;
  }
  
  return <div>Assine para continuar</div>;
}
```

### Componente `SubscriptionStatus`

```tsx
import { SubscriptionStatus } from '@/components/dashboard/subscription-status';

function Dashboard() {
  return (
    <div>
      <SubscriptionStatus />
      {/* Outros componentes */}
    </div>
  );
}
```

### Guard de Rota (Server-Side)

```tsx
import { requireActiveSubscription } from '@/lib/auth/subscription-guard';

export default async function ProtectedPage() {
  const userId = await requireActiveSubscription();
  
  // Página só é exibida se usuário tiver assinatura ativa
  return <div>Conteúdo protegido</div>;
}
```

---

## 🔧 Troubleshooting

### Problema: Webhooks não estão sendo recebidos

**Soluções:**
1. Verifique se a URL do webhook está correta
2. Confirme que o webhook secret está configurado no `.env`
3. Para testes locais, use Stripe CLI ou ngrok
4. Verifique os logs do provedor (Dashboard do Stripe/Mercado Pago)

### Problema: Erro "Payment provider not configured"

**Soluções:**
1. Verifique se todas as chaves estão no `.env`
2. Confirme que `PAYMENT_PROVIDER` está definido
3. Reinicie o servidor após alterar `.env`

### Problema: Assinatura não é criada após pagamento

**Soluções:**
1. Verifique os logs da API em `/api/payment/webhook/*`
2. Confirme que os webhooks estão configurados corretamente
3. Verifique se o plano existe no banco de dados
4. Execute as migrações do Prisma

### Problema: Erro ao criar checkout

**Soluções:**
1. Verifique se o usuário está autenticado
2. Confirme que existe um plano ativo no banco
3. Verifique os logs do console do navegador
4. Teste as chaves de API com requisições diretas

### Problema: Card de teste do Stripe não funciona

**Cards de teste do Stripe:**
- Sucesso: `4242 4242 4242 4242`
- Requer autenticação 3D: `4000 0025 0000 3155`
- Recusado: `4000 0000 0000 9995`
- Data: Qualquer data futura
- CVV: Qualquer 3 dígitos

---

## 📊 Monitoramento

### Logs Importantes

```bash
# Ver logs do servidor
npm run dev

# Ver logs do Stripe CLI
stripe listen --forward-to localhost:3000/api/payment/webhook/stripe

# Ver logs do Prisma
# Ative no .env:
# DATABASE_URL com ?connection_limit=10&pool_timeout=10
```

### Métricas para Acompanhar

1. **Taxa de Conversão**: Usuários que iniciam trial vs. que convertem para pago
2. **Churn Rate**: Taxa de cancelamento de assinaturas
3. **Trial Completion**: % de usuários que completam o trial
4. **Payment Failures**: Pagamentos que falharam
5. **Revenue**: Receita mensal recorrente (MRR)

---

## 🆘 Suporte

### Recursos Úteis

- [Documentação do Stripe](https://stripe.com/docs)
- [Documentação do Mercado Pago](https://www.mercadopago.com.br/developers)
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)

### Contato

Para dúvidas sobre a implementação, consulte:
- Logs da aplicação
- Dashboard do provedor de pagamento
- Issues do repositório

---

## 📝 Checklist de Deploy

- [ ] Chaves de produção configuradas
- [ ] Webhooks configurados com URLs de produção
- [ ] Migrações do banco executadas
- [ ] Variáveis de ambiente verificadas
- [ ] Testes de pagamento em produção realizados
- [ ] Monitoramento configurado
- [ ] Logs sendo capturados
- [ ] Backups do banco configurados
- [ ] Documentação atualizada
- [ ] Equipe treinada

---

**Última atualização**: Outubro 2025
**Versão**: 1.0.0

# 🎯 Timming LoveU - Production Setup

## Início Rápido

### Deploy na Vercel (Recomendado)
```bash
# 1. Configure variáveis de ambiente na Vercel
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://...

# 2. Deploy
vercel --prod
```

### Deploy com Docker
```bash
# 1. Configure .env.production
cp .env.example .env.production
# Edite .env.production com valores reais

# 2. Inicie serviços
docker-compose up -d

# 3. Execute migrations
docker-compose exec app npm run prisma:migrate
```

## Comandos Úteis

### Desenvolvimento
```bash
npm run dev              # Iniciar em modo desenvolvimento
npm run build            # Build de produção
npm run start            # Iniciar em modo produção
npm test                 # Executar testes
npm run type-check       # Verificar tipos TypeScript
```

### Banco de Dados
```bash
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Executar migrations
npm run prisma:studio    # Abrir Prisma Studio
npm run db:migrate:prod  # Migrations em produção
```

### Docker
```bash
npm run docker:build     # Build da imagem
npm run docker:up        # Iniciar containers
npm run docker:down      # Parar containers
npm run docker:logs      # Ver logs
```

### Monitoramento
```bash
npm run health           # Verificar saúde da aplicação
```

## Configuração Mínima Obrigatória

### Variáveis de Ambiente
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```

### Gerar NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## Arquitetura de Produção

```
┌─────────────┐
│   Cliente   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────┐
│   Nginx     │ (Opcional)
│ Load Balancer
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Next.js    │ ◄──► Redis (Cache)
│     App     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PostgreSQL  │
│  Database   │
└─────────────┘
```

## Segurança

✅ Headers de segurança configurados no `next.config.js`
✅ HTTPS obrigatório em produção
✅ Rate limiting via Nginx (se usando)
✅ Prisma Client com prepared statements (proteção contra SQL injection)
✅ NextAuth para autenticação segura
✅ Variáveis de ambiente isoladas

## Performance

- ⚡ SWC Minification ativado
- 🖼️ Otimização automática de imagens
- 📦 Compression habilitado
- 🔄 Connection pooling no database
- 💾 Cache de assets estáticos

## Monitoring

### Endpoints
- **Health Check**: `GET /api/health`
- **Status**: Retorna 200 se saudável, 503 se não

### Exemplo de Resposta
```json
{
  "status": "healthy",
  "timestamp": "2024-10-23T10:00:00.000Z",
  "uptime": 12345,
  "responseTime": "45ms",
  "checks": {
    "database": "healthy"
  }
}
```

## Backup

### Backup Manual
```bash
# PostgreSQL
pg_dump -h host -U user database > backup.sql

# Com Docker
docker-compose exec db pg_dump -U timming timming_loveu > backup.sql
```

### Restauração
```bash
# PostgreSQL
psql -h host -U user database < backup.sql

# Com Docker
cat backup.sql | docker-compose exec -T db psql -U timming timming_loveu
```

## Troubleshooting

### Aplicação não inicia
```bash
# Verificar logs
pm2 logs                    # Se usando PM2
docker-compose logs -f app  # Se usando Docker

# Verificar porta
lsof -i :3000
```

### Erro de conexão com banco
```bash
# Testar conexão
psql $DATABASE_URL

# Verificar se Prisma Client está gerado
npx prisma generate
```

### Build falha
```bash
# Limpar e rebuildar
rm -rf .next node_modules
npm install
npm run build
```

## Documentação Completa

📖 Consulte o [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) para instruções detalhadas.

## Support

Para problemas ou dúvidas:
1. Verificar logs da aplicação
2. Consultar `/api/health`
3. Revisar DEPLOYMENT_GUIDE.md
4. Verificar variáveis de ambiente

---

**Versão:** 1.0.0  
**Última Atualização:** Outubro 2024

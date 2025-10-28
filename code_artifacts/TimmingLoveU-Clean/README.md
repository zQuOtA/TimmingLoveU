# 💕 Timming LoveU - Site Estático

Site estático romântico para celebrar relacionamentos. Esta é uma versão limpa e otimizada contendo apenas as páginas estáticas funcionais.

## 📋 Descrição

Timming LoveU é um site que permite criar páginas personalizadas para casais celebrarem seu amor com:
- Cronômetro em tempo real do relacionamento
- Galeria de fotos
- Música especial
- Vídeos e muito mais

## 🚀 Tecnologias

- **Next.js 14** - Framework React com geração de sites estáticos
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização moderna e responsiva
- **Radix UI** - Componentes UI acessíveis
- **Lucide React** - Ícones modernos
- **Framer Motion** - Animações suaves

## 📁 Estrutura do Projeto

```
TimmingLoveU-Clean/
├── app/                    # Páginas e rotas
│   ├── page.tsx           # Página inicial
│   ├── exemplo/           # Página de exemplo
│   │   └── page.tsx
│   ├── contato/           # Página de contato
│   │   └── page.tsx
│   ├── layout.tsx         # Layout principal
│   └── globals.css        # Estilos globais
├── components/
│   └── ui/                # Componentes UI reutilizáveis
├── lib/
│   └── utils.ts           # Funções utilitárias
├── public/                # Arquivos estáticos
│   ├── favicon.svg
│   └── og-image.png
└── package.json
```

## 🛠️ Instalação

1. **Instale as dependências:**

```bash
npm install
```

2. **Execute em modo desenvolvimento:**

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 📦 Build e Deploy

### Build para Produção

```bash
npm run build
```

Isso gerará um site estático na pasta `out/`.

### Export Estático

```bash
npm run export
```

### Deploy

O site estático pode ser hospedado em qualquer serviço de hospedagem:

- **Vercel** (Recomendado para Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3**
- **Firebase Hosting**
- Qualquer servidor web estático

## 🎨 Páginas

### 1. Página Inicial (`/`)
- Hero section com apresentação
- Seção de features/funcionalidades
- Call-to-action para contato
- Footer com links úteis

### 2. Página de Exemplo (`/exemplo`)
- Demonstração completa de uma página de casal
- Cronômetro em tempo real
- Showcase das funcionalidades disponíveis
- Exemplo de layout e design

### 3. Página de Contato (`/contato`)
- Informações de contato
- Email direto
- Instruções sobre o que incluir na mensagem

## 🎨 Personalização

### Cores

As cores do tema romântico podem ser ajustadas em `app/globals.css`:

```css
:root {
  --romantic-pink: 345 83% 47%;
  --romantic-rose: 350 30% 92%; 
  --romantic-gold: 45 86% 83%;
  --romantic-beige: 45 46% 90%;
  --romantic-cream: 350 100% 99%;
}
```

### Fontes

O projeto usa duas fontes do Google Fonts:
- **Playfair Display** - Para títulos românticos
- **Inter** - Para texto corpo

Edite em `app/layout.tsx` para mudar as fontes.

### Componentes UI

Todos os componentes UI estão em `components/ui/` e seguem o padrão Radix UI + Tailwind.

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run export` - Gera arquivos estáticos
- `npm run lint` - Executa o linter

## 📝 Notas Importantes

### O que foi removido nesta versão limpa:

- ❌ API Routes (autenticação, pagamentos, uploads)
- ❌ Banco de dados (Prisma, PostgreSQL)
- ❌ Sistema de autenticação (NextAuth)
- ❌ Integrações de pagamento (Stripe, MercadoPago)
- ❌ Sistema de upload de arquivos
- ❌ Docker e configurações de deploy complexas
- ❌ Testes automatizados
- ❌ Scripts de migração de banco

### O que foi mantido:

- ✅ Todas as páginas estáticas funcionais
- ✅ Design responsivo completo
- ✅ Animações e interatividade do frontend
- ✅ Componentes UI reutilizáveis
- ✅ Estilos Tailwind customizados
- ✅ Cronômetro em tempo real
- ✅ Sistema de navegação

## 🐛 Solução de Problemas

### Erro ao instalar dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de build

Certifique-se de que está usando Node.js 18+:

```bash
node --version
```

### Imagens não carregam

Verifique se as imagens estão na pasta `public/`.

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@timminglove.com

## 📄 Licença

Este projeto é privado e proprietário.

---

Desenvolvido com 💕 por Timming LoveU

# FURIA Chatbot

Este é o repositório do **FURIA Chatbot**, uma plataforma de chat inteligente focada em informações sobre a equipe FURIA
Esports, desenvolvida com [Next.js](https://nextjs.org), Tailwind CSS e integração com IA.

## Funcionalidades

- Chatbot temático da FURIA Esports
- Sugestões inteligentes de perguntas
- Visual moderno, responsivo e dark/gold
- Deploy fácil na Vercel

## Como rodar localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/furia-chatbot.git
   cd furia-chatbot
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

3. **Configure as variáveis de ambiente:**

   - Crie um arquivo `.env.local` na raiz do projeto.
   - Adicione sua chave da API Gemini:
     ```
     GEMINI_API_KEY=sua-chave-aqui
     ```

4. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

5. **Acesse no navegador:**
   - Abra [http://localhost:3000](http://localhost:3000)

## Deploy na Vercel

1. Faça login em [vercel.com](https://vercel.com)
2. Clique em **New Project** e importe este repositório do GitHub
3. Defina as variáveis de ambiente (ex: `GEMINI_API_KEY`)
4. Clique em **Deploy**

Acesse a URL gerada pela Vercel para ver seu chatbot online!

---

Desenvolvido por Gabriel Oliveira para a comunidade FURIA Esports.

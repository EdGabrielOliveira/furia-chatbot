# FURIA Chatbot

FURIA Chatbot é uma plataforma interativa de chat inteligente dedicada a fãs da FURIA Esports, fornecendo informações atualizadas sobre o time, jogadores, competições e muito mais.
Desenvolvido com tecnologias modernas e design responsivo, o chatbot oferece uma experiência engajadora e personalizada.

- Teste agora: https://furia-chatbot.vercel.app/landing

## ✨ Funcionalidades

- 🤖 Chat Inteligente
Respostas contextuais sobre a FURIA Esports e seu cenário competitivo
Histórico de conversas persistente durante a sessão
Sugestões inteligentes de perguntas baseadas no contexto da conversa
- 🎮 Quiz Interativo
Quiz com perguntas geradas dinamicamente por IA sobre a FURIA
Perguntas variadas sobre história, jogadores, conquistas e curiosidades
Sistema de pontuação com feedback imediato
Resumo detalhado ao final com explicações das respostas
- 🎫 Carteirinha de Fã
Crie sua carteirinha personalizada de torcedor da FURIA
Formulário interativo para inserir seus dados
Personalização com nome, nickname, tempo como fã e jogador favorito
Download da carteirinha em formato de imagem PNG.
- 🎨 Design e UX
Interface moderna com tema dark/gold nas cores da FURIA
Design totalmente responsivo para desktop e dispositivos móveis
Animações suaves para melhor experiência do usuário
Suporte a modo escuro nativo

## 🛠️ Tecnologias Utilizadas

- Next.js 13+ com App Router
- React 18+ para interfaces de usuário
- Tailwind CSS para estilização
- TypeScript para tipagem estática
- Framer Motion para animações

Utilitários:

- dom-to-image para geração de carteirinhas
- file-saver para baixar a carterinha
- react-qr-code para QR codes nas carteirinhas


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

## 👨‍💻 Autor
Desenvolvido por Gabriel Oliveira



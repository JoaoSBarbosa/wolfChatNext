
# 🐺 Wolf Chat UI

![Next.js](https://img.shields.io/badge/Next.js-14.2.25-blue?logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-38B2AC?logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-1.8.2-yellow?logo=axios)
![React Hook Form](https://img.shields.io/badge/ReactHookForm-7.54.2-purple?logo=reacthookform)
![Framer Motion](https://img.shields.io/badge/FramerMotion-12.5.0-black?logo=framer)
![React Toastify](https://img.shields.io/badge/ReactToastify-11.0.5-orange?logo=react)
![Zod](https://img.shields.io/badge/Zod-3.24.2-lightgrey)

---

## ✨ Visão Geral

**Wolf Chat UI** é o frontend de um sistema de chat moderno e responsivo, desenvolvido com **React**, **Next.js** e **TypeScript**, estilizado com **TailwindCSS**. Este projeto tem como foco a comunicação entre usuários de forma simples e intuitiva, com funcionalidades de chat individual, grupos e notificações em tempo real.

O backend está sendo desenvolvido em **Java Spring**, utilizando **JWT** para autenticação e segurança das requisições.

---

## 🚀 Funcionalidades

✅ Criar chat direto com usuários  
✅ Criar grupos para conversas em equipe  
✅ Enviar e receber mensagens em tempo real  
✅ Exibir lista de usuários disponíveis para iniciar conversas  
✅ Ao clicar em um usuário, criar um novo chat automaticamente  
✅ Exibir lista de chats com:
  - Última mensagem enviada
  - Quantidade de mensagens não visualizadas  
✅ Editar informações do perfil  
✅ Login com autenticação **JWT**:
  - Recebe um token do backend Java
  - O token é armazenado **criptografado no localStorage**
  - Todas as requisições autenticadas enviam o token no header  

🛠️ **Projeto em andamento**  
Mais funcionalidades estão a caminho!

---

## 📂 Estrutura de Pastas

```
src/
│
├── api/               # Funções auxiliares para conexão com o backend (axios)
├── app/               # Páginas principais: Login e Chat
├── components/        # Componentes reutilizáveis organizados por área
│   ├── ChatList/      # Lista de chats e previews de mensagens
│   ├── ChatWindow/    # Janela de conversação
│   ├── CreateChat/    # Criação de chats e grupos
│   ├── Modals/        # Modais diversos
│   ├── Sidebar/       # Navegação lateral
│   └── ToastMessage/  # Componente de feedback visual
│
├── context/           # Contextos globais (Auth, Chat, etc.)
├── hooks/             # Hooks personalizados
├── services/          # Serviços para regras de negócio e integrações
├── types/             # Tipagens TypeScript
└── styles/            # Estilos globais (Tailwind configs, etc.)
```

---

## 🔐 Autenticação & Segurança

- O frontend faz login no backend Java e recebe um **JWT**.
- O token é armazenado **criptografado no localStorage** (em breve opção para cookies `HttpOnly`).
- Todas as requisições enviam o **Authorization Header** com o token:
```
Authorization: Bearer <seu_token_aqui>
  ```

---

## 🛠️ Tecnologias Utilizadas

- **Next.js** (14.2.25)  
- **React** (18.2.0)  
- **TypeScript** (5.x)  
- **TailwindCSS** (3.4.1)  
- **Axios**  
- **React Hook Form + Zod** (validação de formulários)  
- **Framer Motion** (animações fluidas)  
- **React Toastify** (notificações)  
- **jwt-decode** (decodificação de tokens JWT)

---

## 📦 Scripts Disponíveis

No diretório do projeto, você pode rodar:

```bash
# Inicia o ambiente de desenvolvimento
npm run dev

# Faz o build para produção
npm run build

# Inicia a versão de produção
npm start

# Lint no projeto para manter padrão de código
npm run lint
  ```

---

## 📚 Próximos Passos (Em Desenvolvimento)

- Upload e atualização de foto de perfil
- Notificações em tempo real (WebSocket ou SSE)
- Logout seguro com expiração de sessão
- Melhorias na UX para mobile
- Suporte a temas (dark/light)

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch com a sua feature: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Adiciona nova feature'`
4. Push na sua branch: `git push origin feature/nova-feature`
5. Abra um Pull Request!

---

## 📄 Licença

MIT License © 2025 **barbosaCode**

---

## 👨‍💻 Desenvolvido por

**barbosaCode**  
🔗 [LinkedIn](https://www.linkedin.com/in/devjbarbosa/) 🔗 [[ **Portfólio**](https://joaobarbosadev.vercel.app/)]

```

---

Se quiser que eu ajuste o **texto das contribuições**, **licença**, **autor**, ou adicione **prints do projeto** depois, é só mandar! 🚀

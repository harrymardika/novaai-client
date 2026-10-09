# NOVA AI: Client

React frontend for **NOVA AI** (*Next-gen Orbit of Visionary Artificial Intelligence Technology*), a multimodal chatbot powered by Google Gemini 1.5 Flash. Users sign in, start conversations, attach images, and get streamed answers rendered as Markdown. Chat history is saved so they can return to it later.

- **Backend:** [novaai-backend](https://github.com/harrymardika/novaai-backend)
- **Live demo:** https://novaai-backend-rho.vercel.app

## Features

- **Streaming answers** from Gemini (`sendMessageStream`) as they are generated.
- **Multimodal prompts:** attach an image (uploaded to ImageKit) and ask about it.
- **Conversation memory:** earlier turns are sent to Gemini as history, so follow-ups keep context.
- **Saved chats:** a sidebar lists, opens, and deletes chats stored by the backend in MongoDB.
- **Authentication** with Clerk; dashboard and chat pages need a signed-in user.
- **Markdown rendering** of answers with `react-markdown`.
- **Safety settings:** harassment and hate speech blocked at `BLOCK_LOW_AND_ABOVE`.
- **Animated landing page** with a typing demo.

## Pages

| Route | Page |
|---|---|
| `/` | Landing page |
| `/sign-in`, `/sign-up` | Clerk authentication |
| `/dashboard` | Start a new chat |
| `/dashboard/chats/:id` | Conversation with history, image upload, streaming |

## How a Chat Works

1. The first message goes to the backend (`POST /api/chats`), which creates the chat and returns its ID.
2. The chat page loads history (`GET /api/chats/:id`) and sends the message, with any image, to Gemini along with earlier turns.
3. The streamed answer appears as it arrives; when complete, question, answer, and image URL are saved (`PUT /api/chats/:id`).
4. TanStack Query refreshes the chat and the chat list.

## Tech Stack

React 19 (RC), Vite 5, React Router 6, TanStack Query 5, `@google/generative-ai` (Gemini 1.5 Flash), Clerk, ImageKit, `react-markdown`, `react-type-animation`.

## Project Structure

```
novaai-client/
├── src/
│   ├── main.jsx                 # Router setup
│   ├── lib/gemini.js            # Gemini model and safety settings
│   ├── layouts/                 # rootLayout (Clerk, query client), dashboardLayout (auth guard, sidebar)
│   ├── routes/                  # homepage, dashboardPage, chatPage, signInPage, signUpPage
│   └── components/              # chatList, newPrompt, upload, footers
├── public/
└── vite.config.js
```

## Getting Started

Requirements: Bun or Node.js, a running [novaai-backend](https://github.com/harrymardika/novaai-backend), a Gemini API key, a Clerk app, and an ImageKit account.

```bash
git clone https://github.com/harrymardika/novaai-client.git
cd novaai-client
bun install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_GEMINI_PUBLIC_KEY=<Gemini API key>
VITE_CLERK_PUBLISHABLE_KEY=<Clerk publishable key>
VITE_IMAGE_KIT_ENDPOINT=<ImageKit URL endpoint>
VITE_IMAGE_KIT_PUBLIC_KEY=<ImageKit public key>
```

```bash
bun run dev      # development
bun run build    # production build (the backend serves it from dist/)
```

> **Note:** `VITE_` variables are bundled into the browser code, so the Gemini key is visible to anyone using the app. Restrict the key in Google AI Studio, or move the Gemini call to the backend for production use.

## Author

**Harry Mardika** · [GitHub](https://github.com/harrymardika)

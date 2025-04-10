# AI Landing Page with ElevenLabs Chat Integration

A modern Next.js landing page featuring an interactive AI chat experience powered by ElevenLabs Convai.

## Features

- 🎯 Modern and responsive landing page built with Next.js 14
- 🤖 Interactive AI chat widget using ElevenLabs Convai
- 💬 Real-time conversation with AI agent
- 🎨 Clean and modern UI design
- 📱 Fully responsive layout

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [ElevenLabs Convai](https://elevenlabs.io) - AI chat integration

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

1. Clone the repository

```bash
git clone <repository-url>
cd landing
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app` - Next.js app router pages
- `/components` - React components including ChatBot
- `/types` - TypeScript type definitions
- `/actions` - Server actions and API integrations

## AI Chat Integration

The project uses ElevenLabs Convai widget for AI chat functionality with agent ID: `kunAGk3pN2sA7f6HvRb0`. The chat component is implemented in `components/ChatBot.tsx`.

## Deployment

The app can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world)

## License

MIT

# LearnHub

**Study with your personal real-time AI companion.**

LearnHub is a Next.js application that lets you create AI-powered voice companions to tutor you across subjects like maths, science, coding, language, history, economics, and cybersecurity. After each study session, you can generate quizzes from the conversation to reinforce learning.

## Features

- **AI Companions** — Create custom voice-based tutors for any topic. Choose voice (male/female) and teaching style (formal/casual).
- **Voice Conversations** — Real-time voice interaction powered by [Vapi.ai](https://vapi.ai).
- **Quiz Generation** — Automatically generate multiple-choice quizzes from your tutoring conversations using Groq (GPT).
- **Session History** — Review past learning sessions and messages.
- **Progress Reports** — Monthly reports with charts, stats, and PDF export.
- **Subject Management** — Add custom subjects with icons and colors.
- **Subscription Tiers** — Feature gating via Clerk plans (companion limits, quiz access, progress reports, session history).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, shadcn/ui, Base UI, MUI |
| Auth & Subscriptions | [Clerk](https://clerk.com) |
| Database | [Supabase](https://supabase.com) (PostgreSQL + SSR) |
| Voice AI | [Vapi.ai](https://vapi.ai) |
| Quiz Generation | [Groq SDK](https://groq.com) |
| Charts | [MUI X-Charts](https://mui.com/x/react-charts/) |
| PDF Reports | [React-pdf](https://react-pdf.org) |
| 3D Visuals | React Three Fiber |
| Forms | react-hook-form + Zod |
| Error Tracking | Sentry |
| Email | Resend |

## Getting Started

### Prerequisites

- Node.js >= 18
- A Supabase project
- A Clerk application
- A Vapi.ai API key (web token)
- A Groq API key (for quiz generation)
- (Optional) Sentry DSN, Resend API key

### Environment Variables

Copy `.env.example` (if exists) or create a `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_VAPI_WEB_TOKEN=

GROQ_API_KEY=

SENTRY_DSN=
RESEND_API_KEY=
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Routes

| Route | Description |
|---|---|
| `/` | Home — popular companions |
| `/companions` | Companions library with search & subject filter |
| `/companions/new` | Create a new companion |
| `/companions/[id]` | Companion chat session |
| `/subjects/new` | Add a custom subject |
| `/quiz` | Quiz dashboard |
| `/quiz/[id]` | Take a quiz |
| `/my-journey` | User profile, sessions, history, quizzes, reports |
| `/my-journey/session/[id]` | Session transcript |
| `/my-journey/report/[id]` | Detailed progress report |
| `/my-journey/report/monthly/[year]/[month]` | Monthly report |
| `/subscription` | Pricing & plans |
| `/sign-in` | Sign in |

## Project Structure

```
├── app/              # Next.js App Router pages & layouts
├── components/       # React components (ui/, feature components)
├── constants/        # Subjects, voices, colors, soundwaves
├── lib/
│   ├── actions/      # Server actions (companion, quiz, report, subject)
│   ├── supabase/     # Supabase client (server, middleware, browser)
│   ├── vapi.sdk.ts   # Vapi.ai SDK instance
│   └── utils.ts      # Utilities
├── types/            # TypeScript type definitions
├── public/           # Static assets
└── proxy.ts          # Proxy server
```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm start` — Start production server
- `npm run lint` — Run ESLint

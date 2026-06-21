# JobConnect Locals — Web App

Production-quality MVP for local job discovery and hiring in Nigeria.

## Tech Stack

- **Next.js 16** (App Router)
- **Better Auth** (email/password + Google OAuth)
- **Prisma + SQLite** (development)
- **Shadcn UI** + Tailwind CSS
- **Resend** (email notifications)
- **Vercel Blob** (CV uploads, optional)

## Quick Start

```bash
cd web
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@jobconnect.locals | Admin123! |
| Employer | employer@jobconnect.locals | User1234! |
| Job Seeker | seeker@jobconnect.locals | User1234! |

## Environment Variables

See [`.env.example`](.env.example). Required:

- `DATABASE_URL` — SQLite path (e.g. `file:./dev.db`)
- `BETTER_AUTH_SECRET` — min 32 characters
- `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` — app URL

Optional:

- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth
- `RESEND_API_KEY` / `EMAIL_FROM` — email delivery (logs to console if unset)
- `BLOB_READ_WRITE_TOKEN` — CV storage (uses local `public/uploads/` if unset)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run db:push` | Sync Prisma schema |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Prisma Studio |

## Features

- Landing page with job search, stats, featured jobs, FAQ
- Public job browse with URL-based filters
- Single account: job seeker + employer capabilities
- Job posting (draft → publish → close)
- Applications with timeline tracking
- Saved jobs, profile + CV upload
- In-app + email notifications
- Interview scheduling
- Admin dashboard (users, jobs, moderation, audit log)

## Architecture

```
web/
├── app/           # Routes (public, auth, dashboard, admin)
├── features/      # Feature modules (auth, jobs, applications, …)
├── components/    # UI + shared components
├── lib/           # Auth, prisma, email, validations
├── server/        # Actions, services, repositories
├── prisma/        # Schema + seed
└── modules/       # Future billing placeholders
```

See [`docs/DATABASE.md`](docs/DATABASE.md) for schema details.

## Deployment

Deploy to Vercel from the `web/` directory. Use PostgreSQL in production (update `DATABASE_URL` and Prisma provider).

## Roadmap

- React Native mobile app (`mobile/` — not started)
- Paid features (billing module placeholders exist)
- Automated test suite
- Full documentation suite (ARCHITECTURE.md, API.md, etc.)

# JobConnect Locals

Monorepo for the JobConnect Locals platform — connecting local businesses with job seekers across Nigeria.

## Structure

```
job-connect-locals/
├── web/          # Next.js web application (MVP — implemented)
├── mobile/       # React Native app (future)
└── PROMPT.md     # Master build specification
```

## Getting Started

See the [web README](web/README.md) for setup, environment variables, and demo accounts.

```bash
cd web
npm install
cp .env.example .env
npm run db:push && npm run db:seed
npm run dev
```

## Current Status

The **web MVP** (Phases 1–9) is implemented:

- Project setup, auth, database
- Landing page, job posting & discovery
- Applications, notifications, interviews
- Admin dashboard

Deferred: React Native mobile app, automated tests, full documentation suite.

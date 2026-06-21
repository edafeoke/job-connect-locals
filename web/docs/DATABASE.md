# Database Schema

JobConnect Locals uses **Prisma** with **SQLite** in development.

## Models

### Auth (Better Auth)

- **User** — auth user with `isAdmin`, `disabled` flags
- **Session**, **Account**, **Verification** — Better Auth tables

### Application

| Model | Description |
|-------|-------------|
| Profile | Job seeker profile (bio, skills, CV metadata) |
| Company | Employer organization profile |
| Job | Job listing with status: DRAFT, PUBLISHED, CLOSED |
| Application | Job application with status workflow |
| ApplicationEvent | Timeline entries for status changes |
| SavedJob | Bookmarked jobs |
| Notification | In-app notifications |
| Interview | Scheduled interviews |
| Message | Application-scoped messages (MVP) |
| AuditLog | Admin action history |

## Key Relationships

- User 1—1 Profile
- User 1—many Company (owner)
- Company 1—many Job
- Job 1—many Application
- Application 1—many ApplicationEvent
- Application 0—1 Interview

## Application Status Flow

```
APPLIED → UNDER_REVIEW → INTERVIEW_SCHEDULED → ACCEPTED / REJECTED
```

## Commands

```bash
npm run db:push    # Apply schema changes
npm run db:seed    # Seed demo data
npm run db:studio  # Visual browser
```

## Production

Switch `provider` in `schema.prisma` to `postgresql` and update `DATABASE_URL` for production deployments.

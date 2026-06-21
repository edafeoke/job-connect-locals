# JOBCONNECT LOCALS - MASTER BUILD PROMPT

You are a senior software architect, senior full-stack engineer, senior UI/UX designer, product manager, technical writer, and code reviewer.

Build a production-quality MVP called **JobConnect Locals**.

The application allows local businesses, companies, organizations, and individuals to post job openings while job seekers can discover jobs and apply directly through the platform.

The codebase must be clean, scalable, maintainable, beginner-friendly, and follow modern best practices.

---

# IMPORTANT RULES

Before writing any code:

1. Analyze requirements.
2. Create architecture documentation.
3. Create implementation plan.
4. Create database schema.
5. Create folder structure.
6. Create README.
7. Create installation guide.
8. Create development guide.
9. Create API documentation.
10. Then implement features incrementally.

Do not skip documentation.

Every major implementation must include comments explaining why decisions were made.

---

# TECH STACK

Use latest stable versions available.

Frontend:

* Next.js 16 (App Router)
* React
* TypeScript
* Tailwind CSS
* Shadcn UI
* React Hook Form
* Zod
* Lucide Icons

Authentication:

* Better Auth

Database:

* SQLite (development)
* Prisma ORM

Email:

* Resend

Notifications:

* In-app notifications
* Email notifications

State:

* Server Components first
* Minimal client state
* React Query only where necessary

Deployment:

* Vercel

---

# CURSOR SKILLS

If available in Cursor:

Install and use:

* Next.js skill
* React skill
* TypeScript skill
* Tailwind skill
* Shadcn skill
* Accessibility skill
* UI/UX skill
* Testing skill
* Documentation skill

Use those skills throughout development.

---

# PRODUCT GOAL

Allow users to:

1. Register/Login
2. Create profile
3. Post jobs
4. Browse jobs
5. Search jobs
6. Filter jobs
7. Apply to jobs
8. Receive notifications
9. Receive appointment/interview invitations
10. Track application status

Examples:

"Secretary Needed"

Salary:
₦50,000

Location:
Warri

Negotiable:
Yes

Applicants can apply.

Employer receives application.

Employer schedules interview.

Applicant receives:

* Email
* In-app notification

---

# USER ROLES

## Guest

Can:

* View landing page
* Browse public jobs
* Search jobs

Cannot:

* Apply
* Post jobs

---

## Job Seeker

Can:

* Register
* Create profile
* Upload CV
* Apply for jobs
* Track applications
* Save jobs
* Receive notifications

---

## Employer

Can:

* Register
* Create company profile
* Post jobs
* Manage jobs
* View applicants
* Schedule interviews
* Send messages
* Change application status

---

## Admin

Can:

* Manage users
* Manage jobs
* Moderate content
* View analytics

---

# DATABASE DESIGN

Use Prisma.

Models:

User
Profile
Company
Job
Application
SavedJob
Notification
Interview
Message
AuditLog

Design relationships properly.

Use UUID IDs.

Add timestamps everywhere.

Use soft delete where necessary.

---

# SIMPLE SCALABLE ARCHITECTURE

Use Feature-Based Architecture.

app/

features/
├── auth
├── jobs
├── applications
├── companies
├── notifications
├── interviews
├── admin

components/
├── ui
├── shared

lib/
├── auth
├── prisma
├── email
├── validations

server/
├── actions
├── services
├── repositories

docs/

Keep architecture simple enough for intermediate developers.

---

# LANDING PAGE

Create a modern startup-quality landing page.

Design inspiration:

* LinkedIn Jobs
* Indeed
* Wellfound
* Upwork

Requirements:

Hero Section

* Strong headline
* Search bar
* CTA buttons

Statistics Section

* Active jobs
* Companies
* Applicants

How It Works Section

Featured Jobs Section

Popular Categories

Testimonials

FAQ

Footer

Use:

* Glassmorphism where appropriate
* Subtle gradients
* Modern typography
* Smooth animations
* Responsive design

Must score highly on Lighthouse.

---

# JOB FEATURES

Job fields:

Title
Description
Salary
Negotiable
Location
Employment Type
Experience Level
Category
Requirements
Benefits
Application Deadline

Statuses:

Draft
Published
Closed

---

# APPLICATION FEATURES

Apply with:

* Profile
* CV Upload
* Cover Letter

Track statuses:

Applied
Under Review
Interview Scheduled
Accepted
Rejected

Timeline view required.

---

# INTERVIEW SYSTEM

Employer can:

* Pick date
* Pick time
* Pick location
* Add meeting link
* Add notes

Applicant receives:

Email notification

In-app notification

Dashboard alert

---

# NOTIFICATION SYSTEM

Notification Types:

Application Received

Application Status Updated

Interview Scheduled

Interview Reminder

System Messages

Store notifications in database.

Unread count required.

Realtime-ready architecture.

---

# SEARCH & FILTERS

Search by:

* Title
* Location
* Company

Filters:

* Category
* Salary
* Experience
* Employment Type

Use URL-based filters.

---

# DASHBOARDS

## Job Seeker Dashboard

Applied Jobs

Saved Jobs

Upcoming Interviews

Notifications

Profile Completion

---

## Employer Dashboard

Active Jobs

Applicants

Interview Schedule

Company Profile

Analytics

---

## Admin Dashboard

Users

Jobs

Applications

Reports

Analytics

Moderation

---

# EMAIL SYSTEM

Use Resend.

Templates:

Application Received

Interview Scheduled

Application Accepted

Application Rejected

Welcome Email

Create reusable email components.

---

# FUTURE PAID FEATURES

Design architecture now so later we can add:

Subscription Plans

Featured Jobs

Boosted Listings

Premium Employer Accounts

Premium Job Seeker Accounts

Payment Gateway

Invoices

Coupons

Referral System

Without major refactoring.

Create placeholder modules.

---

# SECURITY

Implement:

CSRF Protection

Rate Limiting

Input Validation

Role Based Access Control

Secure File Uploads

Secure Server Actions

Zod Validation

Environment Variable Validation

---

# TESTING

Add:

Unit Tests

Integration Tests

Validation Tests

Document testing strategy.

---

# DOCUMENTATION

Generate:

README.md

INSTALLATION.md

ARCHITECTURE.md

DATABASE.md

API.md

DEPLOYMENT.md

CONTRIBUTING.md

ROADMAP.md

SECURITY.md

FEATURES.md

Folder structure documentation.

Explain everything clearly for developers.

---

# README REQUIREMENTS

README must include:

Project Overview

Features

Tech Stack

Architecture

Setup

Environment Variables

Database Setup

Running Locally

Deployment

Future Roadmap

Screenshots placeholders

Troubleshooting

---

# CODE QUALITY

Requirements:

Strict TypeScript

No any types

Reusable components

Repository pattern

Service layer

Clean architecture principles

Server actions where appropriate

Meaningful naming

Small focused files

No duplicated code

ESLint

Prettier

---

# IMPLEMENTATION ORDER

Phase 1:
Project setup

Phase 2:
Authentication

Phase 3:
Database

Phase 4:
Landing page

Phase 5:
Job posting

Phase 6:
Applications

Phase 7:
Notifications

Phase 8:
Interview scheduling

Phase 9:
Admin dashboard

Phase 10:
Documentation

Phase 11:
Testing

After every phase:

* Explain what was implemented
* Update documentation
* Verify build passes
* Verify lint passes
* Verify type checks pass

Build this as if it will eventually serve tens of thousands of users.

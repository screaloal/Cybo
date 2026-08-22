# Cyboeta — Master Project Document

> Living document. Last updated: August 2026.
> Built by Ayomipo using Termux on Android.

---

## What is Cyboeta?

A premium cybersecurity community platform. Not just a website — a system.
Where cybersecurity learners, professionals and experts connect, share, grow and eventually scale to a worldwide audience.

Visual identity: Black is the environment. Blue is the system.
Standard: Apple-level premium aesthetics. WhatsApp-level contrast and accessibility.

---

## Live URLs

- Production: https://cybo-eta.vercel.app
- GitHub: https://github.com/screaloal/Cyboeta

---

## Tech Stack

- Framework: Next.js 16 (TypeScript)
- ORM: Prisma v5
- Database: PostgreSQL on Supabase
- Cache / Rate limiting: Redis (Vercel Redis integration)
- Email: Resend
- Deployment: Vercel (auto-deploys on git push to main)
- Analytics: Vercel Analytics
- Dev environment: Termux on Android

---

## Critical Constraint

Prisma schema engine binaries are incompatible with Android.
All database migrations must go through Supabase SQL Editor directly.
Never run prisma migrate on Termux — use prisma db push via Vercel build pipeline or raw SQL in Supabase.

---

## Architecture
Future (when scaling):
Golden rule: Frontend controls the experience. Backend controls the security.

---

## Database Schema

### Enums

Role: USER | VIP | SUPERUSER
Status: ACTIVE | SUSPENDED | PENDING_VERIFICATION | BANNED

### User Model

- id (uuid)
- email (unique)
- username (unique)
- passwordHash
- role (default: USER)
- status (default: PENDING_VERIFICATION)
- createdAt
- updatedAt
- lastLoginAt
- failedLoginAttempts (default: 0)
- displayName
- bio
- avatarUrl
- verificationToken
- verificationExpiry

Indexes: email, username

---

## Security Principles

1. RLS enforces data access at database level (V2)
2. Never trust frontend — validate everything server-side
3. Never render raw user HTML — sanitize all input (XSS)
4. Never expose secrets on frontend
5. Rate limit all sensitive actions
6. Paginate all queries — never SELECT all
7. Strict file upload whitelist (images only, max 5MB)
8. Full moderation audit trail
9. Banned accounts can never login
10. Suspended accounts auto-restore after duration
11. Strong password policy: min 8 chars, uppercase, lowercase, number, special character
12. Username: min 3 chars, letters/numbers/underscores only
13. bcrypt 12 rounds for password hashing
14. JWT in HttpOnly cookies — never localStorage
15. Server-side authorization checks on every protected route

---

## Account Lifecycle

---

## Password Standard

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character (!@#$%^&* etc)

---

## Theme System (V2)

- Default: follows user phone system preference (light or dark)
- Can be manually switched inside the app
- Both themes equally premium — Apple website standard
- Contrast: WhatsApp level — visible even at extra dim brightness
- Logo: transparent background — works on both themes automatically
- Light mode: white background, dark text, blue accents
- Dark mode: black background, white text, blue accents

---

## Content Rules

- Ephemeral posts disappear after 12 hours
- Permanent posts (research, writeups, services) stay forever
- User-generated content always sanitized before render
- File uploads: images only (JPEG/PNG/WebP), max 5MB
- No executable file uploads ever (.exe .zip .apk .sh .ps1)

---

## Scalability — Tiered Approach

### Level 1 — Now (critical)
- Authentication and authorization
- Rate limiting
- XSS protection
- Server-side role verification on all API routes
- Database indexes
- Efficient Prisma queries (no N+1)
- Migrations via Supabase SQL Editor
- Backups
- Error handling and logging
- Caching where useful
- CSRF protection

### Level 2 — Growing Cyboeta
- Queues and background jobs
- Webhooks (payments, notifications)
- Advanced monitoring
- Search optimization
- Connection pooling improvements
- Read replicas
- WebSockets for real-time features

### Level 3 — At scale only
- Kubernetes
- Sharding
- Multi-region deployment
- Message brokers (Kafka etc)
- Distributed locks
- Service discovery
- Chaos engineering

Rule: Never add technology before the problem exists.

---

## iOS / App Store Preparation

- Keep API platform-independent (web, iOS, Android all hit same endpoints)
- Moderation system required by Apple for UGC apps (report, block, queue)
- No empty dashboard at submission — must feel alive
- Provide Apple with test account credentials
- iOS app needs native features: push notifications, Face ID, deep links, share sheet, offline caching
- Apple evaluates the product, not the implementation method

---

## V1 — Foundation (COMPLETE)

### Auth
- JWT with HttpOnly cookies (jose)
- bcrypt password hashing (12 rounds)
- Register API with strong password validation
- Login API with brute force protection
- Logout API
- Email verification via Resend
- Route protection via middleware
- Rate limiting: 5 login attempts per 15 min, 3 register per hour per IP
- BANNED and SUSPENDED account checks on login

### Database
- PostgreSQL on Supabase
- Full User model with roles and status enums
- Prisma v5 ORM

### UI
- Single page auth — logo shrinks, forms animate in place
- Cinematic dashboard intro animation
- Sticky nav with logo, tagline, avatar initials, settings menu
- Tabbed feed (Community, CTFs, Research)
- Floating plus button
- Empty state with tagline
- Cyboeta CE monogram logo (transparent background WebP, ~18KB)

### Infrastructure
- Vercel Analytics
- Open Graph and Twitter card meta tags
- Redis rate limiting

---

## V2 — Security and Community Core (IN PROGRESS)

### 2.1 Fix First (Priority)
- [ ] Fix email verification (Resend domain setup)
- [ ] Fix confirm password show/hide toggle
- [ ] Fix password hint spacing
- [ ] Fix contrast — WhatsApp level on all elements
- [ ] Theme system (light/dark, system default, in-app switch)

### 2.2 Security Hardening
- [ ] Server-side authorization checks on all API routes
- [ ] CSRF protection
- [ ] XSS protection (before posts go live)
- [ ] Supabase RLS policies
- [ ] N+1 query prevention
- [ ] Connection pooling

### 2.3 Database Expansion
- [ ] Profile table
- [ ] Post table (ephemeral 12hr + permanent types)
- [ ] Comment table
- [ ] Reaction table
- [ ] Community/category table
- [ ] Membership table
- [ ] Notification table
- [ ] Message table
- [ ] Report table
- [ ] ModerationAction audit log table
- [ ] Indexes on all frequently queried fields

### 2.4 User Profiles
- [ ] Profile page /profile/username
- [ ] Avatar upload (max 5MB, images only)
- [ ] Bio and display name
- [ ] Role badge
- [ ] Reputation score
- [ ] Member since date

### 2.5 Dashboard (Alive)
- [ ] Real posts from database
- [ ] Pagination (20 per load)
- [ ] Infinite scroll
- [ ] Notifications panel
- [ ] Online members count (SUPERUSER view)

### 2.6 Community Features
- [ ] Create ephemeral post (12 hour timer)
- [ ] Create permanent post
- [ ] Comments
- [ ] Reactions
- [ ] Search
- [ ] Report post

### 2.7 Moderation System
- [ ] Report button on all content
- [ ] Moderation queue (SUPERUSER only)
- [ ] Actions: Remove, Warn, Suspend, Ban
- [ ] Audit log
- [ ] Ban appeal system
- [ ] Clear messages to banned/suspended users

### 2.8 State Management
- [ ] Zustand for global user state
- [ ] Persist session across pages
- [ ] User context (id, username, role, status)

---

## V3 — Cyber Features

- [ ] CTF challenge listings
- [ ] Flag submission and scoreboard
- [ ] Team support
- [ ] Achievement badges
- [ ] Learning hub (beginner to advanced)
- [ ] Research hub (articles, vulnerability discussions)
- [ ] Reputation system (Contributor, Researcher, CTF Player, Mentor, Verified Professional)
- [ ] OAuth (Google, GitHub)
- [ ] 2FA

---

## V4 — Network and Services

- [ ] Professional profiles with verification
- [ ] Services marketplace (pentest, consultations, bug bounty, malware analysis)
- [ ] Direct messaging with encryption
- [ ] Organizations and team profiles

---

## V5 — Monetization

- [ ] Stripe payment integration
- [ ] VIP membership with exclusive benefits
- [ ] Free tier remains fully valuable
- [ ] VIP = additional value, not a paywall
- [ ] Custom accent color themes as VIP perk
- [ ] Full SEO implementation

---

## Known Bugs (Fix Before V2 Features)

- Email verification broken (Resend free tier domain issue)
- Confirm password field missing show/hide toggle
- Password hint has no breathing room inside input
- Contrast too low — secondary text invisible at low brightness
- Next.js middleware deprecation warning (rename to proxy)

---

## Notes

- Name: Cyboeta (formerly CyberNet — changed because CyberNet was widely used)
- CE monogram logo with crosshair/compass design
- Visual language: Black is the environment. Blue is the system.
- Tagline: Where Secure Minds Meet
- Post types: Ephemeral (12hr) and Permanent
- No gamification — clean credibility signals only
- Dark only for V1/V2, theme system in V2

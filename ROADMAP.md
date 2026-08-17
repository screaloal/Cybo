# CyberNet Roadmap

> A living document tracking what is built, what is coming, and in what order.
> Last updated: August 2026

---

## V1 — Foundation (COMPLETE)

### Authentication
- [x] JWT with HttpOnly cookies (jose)
- [x] bcrypt password hashing (12 rounds)
- [x] Register API
- [x] Login API
- [x] Logout API
- [x] Route protection via middleware
- [x] Brute force protection (failedLoginAttempts field)
- [x] Suspended account check on login

### Database
- [x] PostgreSQL on Supabase
- [x] User model with roles (USER, VIP, SUPERUSER)
- [x] Account status (ACTIVE, SUSPENDED, PENDING_VERIFICATION)
- [x] Prisma ORM v5

### UI
- [x] Homepage — minimal premium dark design
- [x] Auth page — login/register toggle
- [x] Dashboard — V2 placeholder
- [x] SVG logo — lightweight, transparent
- [x] About CyberNet modal
- [x] Deployed on Vercel
- [x] Connected to GitHub for auto-deployment

---

## V2 — Security and Community Core

### 2.1 Security Hardening (FIRST PRIORITY)
- [ ] Add BANNED status to User model
- [ ] Full account lifecycle (PENDING → ACTIVE → SUSPENDED → BANNED)
- [ ] Rate limiting on all sensitive API routes
- [ ] CSRF protection
- [ ] Input sanitization and XSS prevention
- [ ] Open Graph meta tags
- [ ] Real-time form validation
- [ ] Supabase RLS policies

### 2.2 Email System
- [ ] Email verification on register
- [ ] Welcome email
- [ ] Password reset via email
- [ ] Suspension and ban notification email

### 2.3 Database Schema Expansion
- [ ] Profile table
- [ ] Post table with two content types:
  - Ephemeral posts — disappear after 12 hours
  - Permanent posts — research, writeups, services
- [ ] Comment table
- [ ] Reaction table
- [ ] Community and category table
- [ ] Membership table
- [ ] Notification table
- [ ] Message table
- [ ] Report table
- [ ] ModerationAction audit log table
- [ ] Indexes on all frequently queried fields

### 2.4 User Profiles
- [ ] Profile page at /profile/username
- [ ] Avatar upload (JPEG/PNG/WebP, max 5MB)
- [ ] Bio and display name
- [ ] Role badge (USER, VIP, SUPERUSER)
- [ ] Reputation score
- [ ] Member since date
- [ ] Post history

### 2.5 Dashboard (Alive)
- [ ] Welcome banner with username
- [ ] Live activity feed
- [ ] Recent discussions
- [ ] Trending topics
- [ ] Quick navigation to Community, Learn, CTFs, Research, Services, Profile, Settings
- [ ] Notifications panel
- [ ] Online members count

### 2.6 Community Discussion System
- [ ] Create ephemeral post (disappears after 12 hours)
- [ ] Create permanent post
- [ ] Comments on posts
- [ ] Reactions
- [ ] Pagination (20 posts per load)
- [ ] Infinite scroll
- [ ] Post categories and tags
- [ ] Search posts
- [ ] Report post

### 2.7 Moderation System
- [ ] Report button on all content
- [ ] Moderation queue (admin only)
- [ ] Actions: Remove, Warn, Suspend (with duration), Ban (permanent)
- [ ] Audit log of all moderator actions
- [ ] Ban appeal system
- [ ] Banned and suspended users see clear explanation message

### 2.8 State Management
- [ ] Zustand for global user state
- [ ] Persist user session across pages
- [ ] User context (id, username, role, status)

### 2.9 Performance
- [ ] Self-hosted fonts
- [ ] Lazy loaded images
- [ ] Code splitting
- [ ] WebP/AVIF image format enforcement
- [ ] Always paginate — never fetch entire tables

---

## V3 — Cyber Features

### 3.1 CTF System
- [ ] CTF challenge listings
- [ ] Flag submission system
- [ ] Scoreboard and leaderboard
- [ ] Team support
- [ ] Achievement badges
- [ ] CTF categories (web, crypto, forensics, etc.)
- [ ] Writeup submissions

### 3.2 Learning Hub
- [ ] Beginner to advanced resources
- [ ] Security concepts library
- [ ] External resource links
- [ ] Progress tracking

### 3.3 Research Hub
- [ ] Research article submissions
- [ ] Vulnerability discussions
- [ ] Member publications
- [ ] Peer review system

### 3.4 Reputation System
- [ ] Points for contributions
- [ ] Badges: Contributor, Researcher, CTF Player, Mentor, Verified Professional
- [ ] Clean credibility signals — no gamification gimmicks

### 3.5 OAuth and 2FA
- [ ] Google login
- [ ] GitHub login
- [ ] Two-Factor Authentication

### 3.6 File Uploads (Strict)
- [ ] Profile pictures (JPEG/PNG/WebP, max 5MB)
- [ ] Post images (JPEG/PNG/WebP, max 5MB)
- [ ] No executable files ever
- [ ] Virus scan pipeline (future)

---

## V4 — Network and Services

### 4.1 Professional Profiles
- [ ] Verified Professional badge
- [ ] Skills and specializations
- [ ] Portfolio and work history
- [ ] Public profile for networking

### 4.2 Services Marketplace
- [ ] List cybersecurity services
- [ ] Browse and contact professionals
- [ ] Categories: Penetration testing, Consultations, Bug bounty, Malware analysis, Code review

### 4.3 Messaging
- [ ] Direct messages between members
- [ ] Real-time via Supabase Realtime
- [ ] Message encryption
- [ ] Report and block users

### 4.4 Organizations
- [ ] Company and team profiles
- [ ] Member organization affiliation
- [ ] Organization verified badge

---

## V5 — Monetization

### 5.1 VIP Membership
- [ ] Stripe payment integration
- [ ] VIP benefits: Exclusive content, Private communities, Premium CTFs, Expert sessions, Early access to research
- [ ] Free tier remains fully valuable
- [ ] VIP = additional value, not a paywall

### 5.2 SEO and Growth
- [ ] Full Open Graph implementation
- [ ] Schema markup (Organization, WebSite)
- [ ] Sitemap
- [ ] Meta descriptions per page

---

## Architecture

CYBERNET
Lightweight UI — Next.js and TypeScript
Authentication — JWT and bcrypt
Supabase API
PostgreSQL with RLS — Storage for media
Users, Posts, CTFs, Research, Messages, Services
Realtime — Notifications and Live activity

Golden rule: Frontend controls the experience. Backend controls the security.

---

## Security Principles

1. RLS enforces data access at database level
2. Never trust frontend — validate everything server-side
3. Never render raw user HTML — sanitize all input
4. Never expose secrets on frontend
5. Rate limit all sensitive actions
6. Paginate all queries — never SELECT all
7. Strict file upload whitelist
8. Full moderation audit trail
9. Banned accounts can never login
10. Suspended accounts auto-restore after duration

---

## Content Rules

- Ephemeral posts disappear after 12 hours
- Permanent posts — research, writeups, services — stay forever
- User-generated content is always sanitized
- File uploads are images only with strict size limits
- No executable file uploads ever

---

## Account Lifecycle

Register → PENDING_VERIFICATION → ACTIVE → reported → SUSPENDED (temporary) or BANNED (permanent)
Suspended accounts auto-restore after duration or manually by admin
Banned accounts are permanent and can never login
All moderation actions are logged in audit trail

---

## Notes

- Built by Ayomipo using Termux on Android
- Prisma cannot run on Android — migrations via Supabase SQL Editor
- Database: Supabase PostgreSQL free tier
- Deployment: Vercel — auto-deploys on git push
- All secrets stored in Vercel environment variables only

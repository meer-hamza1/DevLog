# DevLog 📝

A personal developer blog built with Next.js 14, MongoDB, and NextAuth. Write, edit, and delete blog posts from a protected admin dashboard — with a clean, Medium-inspired public interface.

---

## Project Overview

DevLog is a full-stack blogging platform where:
- **Visitors** can read and search blog posts
- **Admin** (authenticated via GitHub) can create, edit, and delete posts

Built as a hands-on project to practice all major Next.js concepts including SSG, SSR, ISR, API Routes, Server Actions, and Middleware.

---

## Tech Stack

| Technology | Usage |
|---|---|
| Next.js 15 (App Router) | Frontend + Backend |
| MongoDB (Atlas) | Database |
| NextAuth v4 | Authentication |
| Tailwind CSS v3 | Styling |
| TypeScript | Type safety |
| Vercel | Deployment |

---

## Features Implemented

- ✅ Public blog with post listing and search
- ✅ Individual post pages
- ✅ GitHub OAuth login (NextAuth)
- ✅ Protected admin dashboard (Middleware)
- ✅ Create, Edit, Delete posts
- ✅ Duplicate slug prevention
- ✅ Medium-inspired clean UI
- ✅ Responsive design
- ✅ 404 and Error pages

---

## Rendering Strategies Used

| Page | Strategy | Reason |
|---|---|---|
| `/` Homepage | SSR (force-dynamic) | Session check for logged in user |
| `/blog/[slug]` | SSG + dynamicParams | Fast static pages for posts |
| `/admin` | SSR (force-dynamic) | Always fresh data for dashboard |

---

## API Routes Included

| Method | Route | Description |
|---|---|---|
| GET | `/api/posts` | Fetch all posts |
| POST | `/api/posts` | Create new post |
| DELETE | `/api/posts` | Delete a post |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handlers |

---

## Server Actions Used

| Action | File | Description |
|---|---|---|
| `createPost` | `app/actions/posts.ts` | Create new post + revalidate |
| `editPost` | `app/actions/posts.ts` | Update existing post |
| `deletePost` | `app/actions/posts.ts` | Delete post + revalidate |

---

## Next.js Concepts Covered

- App Router + Nested Layouts
- SSG (`generateStaticParams`)
- SSR (`force-dynamic`)
- ISR (`revalidate`)
- Dynamic Routes (`/blog/[slug]`)
- API Routes (GET, POST, DELETE)
- Server Actions (`"use server"`)
- Middleware (route protection)
- Server Components + Client Components
- `revalidatePath` for cache invalidation
- Special files: `not-found.tsx`, `loading.tsx`, `error.tsx`
- NextAuth session management

---

## Routes / Pages Included

```
/                    → Homepage (post listing + search)
/blog/[slug]         → Individual post page
/admin               → Protected dashboard (login required)
/api/posts           → Posts API
/api/auth/[...]      → Auth API
```

---

## How to Run Locally

**1. Clone the repo**
```bash
git clone https://github.com/yourusername/devlog.git
cd devlog
```

**2. Install dependencies**
```bash
npm install
```

**3. Setup environment variables**
```bash
cp .env.example .env.local
```
Fill in your values in `.env.local`

**4. Run the dev server**
```bash
npm run dev
```

Open `http://localhost:3000`

---

## Environment Variables Required

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
AUTH_SECRET=your_random_secret
AUTH_GITHUB_ID=your_github_oauth_app_id
AUTH_GITHUB_SECRET=your_github_oauth_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## Database Setup

1. Create a free cluster on [MongoDB Atlas](https://mongodb.com/cloud/atlas)
2. Create a database named `devlog`
3. Create a collection named `posts`
4. Whitelist your IP in Network Access
5. Copy connection string to `MONGODB_URI`

---

## GitHub OAuth Setup

1. Go to GitHub → Settings → Developer Settings → OAuth Apps
2. Create new OAuth App
3. Homepage URL: `http://localhost:3000`
4. Callback URL: `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Secret to `.env.local`

---

## Assumptions & Limitations

- Only one admin user (GitHub login)
- No image upload support (text-only posts)
- No pagination (all posts load at once)
- Slug must be unique per post
- No markdown rendering (plain text content)

---

## Author

**Meer Hamza** — [@meer-hamza1](https://github.com/meer-hamza1)
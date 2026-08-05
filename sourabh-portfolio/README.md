# Sourabh S Nagarkar — Portfolio (MERN)

A full-stack portfolio built with **React (Vite) + Tailwind + Framer Motion** and
**Express + MongoDB**, with a password-protected admin panel for editing everything —
including a **Featured photos** strip and a **Certificates & Achievements** section —
without touching code. Black-and-red, blueprint-styled throughout.

## Structure

```
sourabh-portfolio/
├── backend/
│   ├── models/          Project, Certificate, Profile, Admin, Gallery
│   ├── routes/           auth, projects, certificates, profile, gallery, upload, contact
│   ├── services/          githubSync.js — pulls new GitHub repos in as projects
│   ├── utils/mailer.js    sends contact-form messages to your email (Nodemailer)
│   ├── middleware/auth.js JWT check for admin-only routes
│   ├── uploads/            logo / project / certificate / gallery images
│   ├── data/seed.js       seeds starter content + creates your admin login
│   └── server.js
└── frontend/
    └── src/
        ├── components/     public site sections (Preloader, Hero, Gallery, TechMarquee...)
        ├── pages/           PublicSite.jsx + pages/admin (login, dashboard, tabs)
        ├── context/         AuthContext, ProfileContext
        ├── lib/api.js       shared fetch/upload helper
        └── data/            fallback content shown before/without the API
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:
- `MONGODB_URI` — your local or Atlas connection string
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your admin login (used once by the seed script)
- `JWT_SECRET` — any long random string
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `CONTACT_RECEIVER_EMAIL` —
  for contact-form emails (see **Email setup** below)
- `GITHUB_USERNAME` — your GitHub username, for auto-syncing new repos as projects
- `GITHUB_SYNC_CRON` — schedule for automatic syncing (default: daily at 3am; leave
  blank to disable and only sync manually from the admin panel)

Seed once:

```bash
npm run seed
```

Start the API:

```bash
npm run dev      # or: npm start
```

Runs on `http://localhost:5000`.

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env       # VITE_API_BASE_URL=http://localhost:5000
npm run dev
```

Open `http://localhost:5173`.

## 3. Admin panel

Go to **`http://localhost:5173/admin/login`** (not linked anywhere on the public site).
Sign in with the credentials you set before seeding. Tabs:

- **Profile & Hero** — name, tagline, logo, typed roles, hero/about copy, strengths,
  contact info, and any extra social links (Twitter/X, Instagram, YouTube, Discord,
  Dribbble, Behance, Stack Overflow, Medium, Telegram, LeetCode — each gets its real
  logo automatically; anything else shows a generic link icon)
- **Skills & Education** — add/edit/remove skill groups (each item gets a matching
  language/tool logo automatically wherever it's shown) and education entries
- **Projects** — add, edit, delete projects, plus a **"Sync from GitHub"** button that
  pulls in any new public repos as projects (never overwrites ones you've hand-edited)
- **Certificates** — add, edit, delete certificates and achievements
- **Featured Photos** — a LinkedIn-style strip of photos with short captions, shown
  right under the hero
- **Messages** — an inbox of everything sent through your contact form, with an unread
  count badge, mark-as-read on open, and delete

## 3.1 Skills proficiency chart

In the **Skills & Education** tab, add entries under "Proficiency chart" (skill name +
a 0–100 slider). This renders as an animated bar chart under your skill groups on the
homepage. Leave it empty to hide the chart entirely.

## 3.2 SEO & social share preview

`frontend/public/og-image.png` is a branded 1200×630 share image matching the site's
theme — swap it for your own anytime. `frontend/index.html` has the actual meta tags
(title, description, Open Graph, Twitter Card) between `<!-- OG_META_START -->` and
`<!-- OG_META_END -->` markers.

Because this is a client-rendered React app (no server-side rendering), those tags can't
update per-request — but `npm run build` automatically runs
`frontend/scripts/injectMeta.js` first, which fetches your latest Profile data from the
API and rewrites the tags before building. So every time you rebuild and redeploy after
editing your profile in the admin panel, the share preview stays current. If the API
isn't reachable at build time, the existing tags are left as-is — it never breaks the
build.

Before deploying, set `SITE_URL` (used for `og:url` and the image URL) as an environment
variable when running `npm run build`, e.g. `SITE_URL=https://yourdomain.com npm run build`,
and update the `<link rel="canonical">` tag in `index.html` to match.

## 4. Email setup for the contact form

The contact form saves every message to MongoDB *and* emails it to you. With Gmail:

1. Turn on 2-Step Verification on your Google account.
2. Create an **App Password**: https://myaccount.google.com/apppasswords
3. In `backend/.env`: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`,
   `SMTP_USER=youraddress@gmail.com`, `SMTP_PASS=<the 16-character app password>`,
   `CONTACT_RECEIVER_EMAIL=youraddress@gmail.com`

Any other SMTP provider (Outlook, Zoho, a transactional service like Resend/SendGrid's
SMTP relay, etc.) works the same way — just change `SMTP_HOST`/`SMTP_PORT`. If SMTP
isn't configured, messages still save to the database; email sending is skipped with a
warning in the server log rather than breaking the form.

## 5. GitHub auto-sync

- **Automatic:** with `GITHUB_USERNAME` and `GITHUB_SYNC_CRON` set, the backend checks
  your public repos on that schedule and adds any new, non-fork ones as projects
  (matched by repo URL, so it never duplicates or overwrites existing entries).
- **Manual:** click "Sync from GitHub" in the Projects admin tab any time.
- New entries come in with placeholder-ish copy (repo name, description, primary
  language) — edit them from the Projects tab afterward to add highlights, a cover
  image, tagline, etc.

## 6. Customizing without the admin panel

- **Seed defaults:** `backend/data/seed.js`
- **Frontend fallback copy:** `frontend/src/data/profile.js`, `projects.js`
- **Colors/fonts:** `frontend/tailwind.config.js` (`noir.ink`, `noir.panel`, `crimson`,
  `garnet`, `scarlet`, `paper`), Google Fonts link in `frontend/index.html`
- **Tech logos:** `frontend/src/components/TechIcon.jsx` — add more mappings here if a
  skill you use isn't recognized (falls back to a generic icon automatically)

## 7. Deploying

- **Frontend:** `npm run build` → deploy `dist/` to Vercel/Netlify/GitHub Pages.
- **Backend:** deploy to Render/Railway/Fly.io; use MongoDB Atlas; set `CLIENT_ORIGIN`
  and `VITE_API_BASE_URL` to your real URLs. Put `/uploads` on persistent storage (or
  Cloudinary/S3) since most hosts wipe local disk on redeploy.
- `frontend/public/robots.txt` already disallows `/admin/` from being indexed.

## Animation & UX notes

- **Loading screen:** a short boot-sequence splash (blueprint grid + progress bar +
  status lines) plays on first load, then fades into the site.
- **Tech logo marquee:** auto-scrolling strip of your skills' real logos, pauses on
  hover, in the Skills section.
- **Bigger type:** base font size increased site-wide (17px mobile, 18px on laptop+),
  plus larger headings and body copy throughout.
- Scroll-triggered reveals, hover-lift cards with glowing corner brackets and a scan-line
  sweep, a magnetic-feeling CTA button glow, and a horizontally-scrolling Featured photo
  strip. Respects `prefers-reduced-motion`.

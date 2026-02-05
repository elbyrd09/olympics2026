# Team 26 Sim

A volunteer task simulator for the 2026 Winter Olympics: users register, set availability by day (Feb 5–22, 2026), and complete daily sentiment-review tasks on a “Live Feed” of social comments. When the user clicks “Load Live Feed” on the Tasks tab, the app fetches real posts from the Mastodon API (mastodon.social) using Olympics-related hashtags; if the API is unavailable or returns too few posts, it falls back to in-app curated comments. Data is stored in the browser (localStorage); no backend.

---

## Project structure

| File / folder | Purpose |
|---------------|--------|
| **index.html** | Single HTML entry; mounts the React app into `#root`. |
| **src/main.jsx** | App entry: renders `<App />` with React StrictMode and imports global CSS. |
| **src/App.jsx** | Main app: registration, dashboard, calendar, tasks (sentiment), account, fun facts. All UI and logic live here. |
| **src/App.css** | Extra styles for the app (e.g. logo, layout). |
| **src/index.css** | Global Tailwind imports and custom utilities (e.g. `animate-gentle-jump`). |
| **src/assets/** | Static assets (e.g. react.svg) referenced by the app. |
| **public/** | Static files served as-is: `logo-2026.png`, `vite.svg`. |
| **vite.config.js** | Vite config; uses the React plugin for build and dev server. |
| **tailwind.config.js** | Tailwind content paths and theme (used for styling). |
| **postcss.config.js** | PostCSS config for Tailwind. |
| **postcss.config.cjs** | Alternate PostCSS config (CJS). |
| **tailwind.config.cjs** | Alternate Tailwind config (CJS). |
| **eslint.config.js** | ESLint rules for the project. |
| **package.json** | Scripts and dependencies (React, Vite, Tailwind, lucide-react). |
| **.gitignore** | Git ignore patterns (e.g. node_modules, dist). |

---

## Development

```bash
npm install
npm run dev
```

Opens a local dev server (e.g. http://localhost:5173). Use this to develop and test in the browser.

---

## Deploying (web app in the browser)

The app is a static front-end: build once and host the output anywhere that serves static files.

### 1. Build

```bash
npm install
npm run build
```

This produces a **dist** folder with `index.html` and hashed JS/CSS/assets. No server or database is required.

### 2. Host the `dist` folder

Upload the **contents** of `dist` to any static host. Your friend can then open the site in a normal browser (desktop or mobile browser).

**Options:**

- **Vercel** – Connect the repo, set build command `npm run build` and output directory `dist`. Free tier is enough.
- **Netlify** – Same idea: build command `npm run build`, publish directory `dist`.
- **GitHub Pages** – Push the repo, enable Pages, and set the source to build from the repo with `npm run build` and publish from `dist` (or use a GitHub Action to build and deploy).
- **Any web host** – If you have FTP or a file server, upload the contents of `dist` to the site’s public directory (e.g. `public_html` or `www`). The site must be served over HTTP/HTTPS; opening `index.html` from the file system can break routing/imports.

### 3. Optional: test the production build locally

```bash
npm run preview
```

Serves the built `dist` folder so you can confirm everything works before deploying.

---

## Deploying to GitHub Pages (step-by-step)

Your app will be at **`https://<your-username>.github.io/olympics2026/`** (or whatever you name the repo). Use the repo name in the steps below; if the repo is different, change `olympics2026` in the build command and in the URL.

### 1. Put the project on GitHub

- Create a new repository on GitHub (e.g. `olympics2026`). Do **not** add a README, .gitignore, or license if you already have them locally.
- In the project folder, initialize Git (if needed), add the remote, and push:

```bash
cd /path/to/olympics2026
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/olympics2026.git
git push -u origin main
```

(If the repo already exists and is connected, just push your latest changes.)

### 2. Build for GitHub Pages

The site is served from a subpath (`/olympics2026/`), so the build must use that base path:

```bash
npm install
npm run build:pages
```

This runs `vite build --base /olympics2026/` and outputs to the **`dist`** folder with correct asset paths.

### 3. Deploy the `dist` folder to the `gh-pages` branch

Install the `gh-pages` package once (it pushes the `dist` folder to the `gh-pages` branch so GitHub can serve it):

```bash
npm install --save-dev gh-pages
```

Then run (the script is already in **package.json**):

```bash
npm run deploy:pages
```

This builds with the correct base path and pushes the contents of `dist` to the `gh-pages` branch.

### 4. Turn on GitHub Pages

- Open the repo on GitHub → **Settings** → **Pages**.
- Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
- **Branch:** select `gh-pages` and **/ (root)**.
- Click **Save**.

After a minute or two, the site will be live at:

**`https://<your-username>.github.io/olympics2026/`**

(If you used a different repo name, replace `olympics2026` in that URL.)

### 5. Updating the site later

After you change the app:

```bash
git add .
git commit -m "Your update message"
git push
npm run deploy:pages
```

Only `npm run deploy:pages` updates the live site; it rebuilds and pushes the new `dist` to `gh-pages`.

---

## Notes

- All state (profile, availability, task progress, stats) is stored in the browser’s localStorage. Clearing site data or using another device/browser starts fresh.
- **Live Feed:** Comments are loaded from the Mastodon API (public tag timelines on mastodon.social) when the user clicks “Load Live Feed.” If the request fails or returns limited results, the app falls back to curated in-app comments.

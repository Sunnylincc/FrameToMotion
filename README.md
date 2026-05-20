# FrameToMotion

FrameToMotion is a modern static React app that turns a single uploaded image into cinematic AI video prompts for Veo, Kling, Seedance, Runway, and Sora.

## Tech Stack
- Vite + React
- TailwindCSS
- 100% static logic (no backend, no auth, no database)
- GitHub Pages auto-deployment via GitHub Actions

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run locally:
   ```bash
   npm run dev
   ```
3. Build production bundle:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

## GitHub Pages Configuration

### Base path (important)
This project is configured for the existing repository:

- Repo: `Sunnylincc/FrameToMotion`
- Vite base path: `'/FrameToMotion/'`
- Live URL: `https://sunnylincc.github.io/FrameToMotion/`

You can modify this path in `vite.config.js`:

```js
base: '/FrameToMotion/'
```

If you ever rename the repository, update this base path to match the new repo name.

## Automatic Deployment Workflow
This repo includes `.github/workflows/deploy.yml`.

On every push to `main`, GitHub Actions will:
1. Install dependencies (`npm install`)
2. Build the static site (`npm run build`)
3. Upload the `dist` folder as a Pages artifact
4. Deploy to GitHub Pages via `actions/deploy-pages`

## How to Enable GitHub Pages (one-time)
1. Push this project to the `main` branch of your GitHub repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push any commit to `main`.
5. Watch **Actions** tab for the `Deploy static site to GitHub Pages` workflow.

## Final Live URL
After successful deployment, your site will be:

`https://sunnylincc.github.io/FrameToMotion/`

## Notes
- Fully static architecture; no server required.
- Suitable for free GitHub Pages hosting.
- Mobile-first responsive UI with dark cinematic styling.


## Useful GitHub Docs
- GitHub Pages Quickstart: https://docs.github.com/pages/quickstart
- GitHub Pages overview: https://docs.github.com/en/pages

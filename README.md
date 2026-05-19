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

### Where to modify the repo base path
The base path is configured in `vite.config.js` using:

```js
const repoBasePath = process.env.VITE_BASE_PATH || '/';
```

- For local development, it defaults to `/`.
- In GitHub Actions, it automatically sets:
  - `VITE_BASE_PATH=/${{ github.event.repository.name }}/`

If you want to hardcode a custom path, update `repoBasePath` in `vite.config.js`.

## Automatic Deployment Workflow
This repo includes `.github/workflows/deploy.yml`.

On every push to `main`, GitHub Actions will:
1. Install dependencies
2. Build the static site
3. Upload the `dist` folder
4. Deploy to GitHub Pages

## How to Enable GitHub Pages
1. Push this project to your GitHub repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` and wait for the workflow to finish.

## Update the GitHub Repo Name
If the repository name changes:
- No code change is required for Actions-based deployment, because the workflow dynamically sets `VITE_BASE_PATH` from the current repo name.
- Optional manual override can still be done in `vite.config.js`.

## Final Live URL Structure
After deployment, your site is available at:

`https://USERNAME.github.io/REPO-NAME/`

Example:
`https://octocat.github.io/FrameToMotion/`

## Notes
- Fully static architecture; no server required.
- Suitable for free GitHub Pages hosting.
- Mobile-first responsive UI with dark cinematic styling.

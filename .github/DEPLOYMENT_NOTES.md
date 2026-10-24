# GitHub Pages deployment notes

- The workflow runs on pushes to `main`; change `.github/workflows/deploy.yml` if your default branch has another name.
- Repository Pages settings must use **GitHub Actions** as the publishing source.
- The Vite base path is set to `/tanishkmehta.github.io/` to match the project-site URL currently shared. For a different repository path, change `base` in `vite.config.ts` and the canonical URLs in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.
- No backend, analytics, form service, or secret is required for this release.

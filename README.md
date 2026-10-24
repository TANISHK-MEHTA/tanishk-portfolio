# Tanishk Mehta — Systems in Motion

A React + TypeScript + Vite portfolio prepared for GitHub Pages. This first release is frontend-only: it includes an interactive architecture explorer, engineering case studies, responsive navigation, résumé-request email action, and a contact form that opens the visitor's configured email application. It does not collect or store submissions.

## Requirements

- Node.js 22.12 or later
- npm
- A GitHub repository with GitHub Pages available

## Run locally

```bash
npm install
npm run dev
```

## Build and preview the production version

```bash
npm run build
npm run preview
```

The production build is written to `dist/`.

## Deploy to GitHub Pages

The included `.github/workflows/deploy.yml` builds and deploys on pushes to `main` and via manual workflow dispatch.

1. Commit these files to the repository used for the existing portfolio.
2. In the repository, open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Push to `main` or run **Actions → Deploy portfolio to GitHub Pages → Run workflow**.
5. Open the Actions run and wait for the deployment job to complete; then verify the Pages URL.

### Important: verify the repository path

`vite.config.ts` currently uses `/tanishkmehta.github.io/`, matching the project path in the URL shared in the conversation:

`https://tanishk-mehta.github.io/tanishkmehta.github.io/`

If the repository name is different, update the `base` value in `vite.config.ts` to `/<repository-name>/` before deploying. If the repository is renamed to the special user-site repository `tanishk-mehta.github.io`, the base should normally be `/` instead.

## Before publishing

- Confirm the career chronology, degree/CGPA, certification names, school details, and all other résumé facts in `src/App.tsx`.
- Replace the email address and LinkedIn URL near the top of `src/App.tsx` if either changes.
- The résumé button currently opens an email request; it does not download a résumé PDF. To offer a download, add your approved PDF under `public/assets/` and change the “Request résumé” anchor in `src/App.tsx` to link to that file.
- The contact form uses `mailto:`. Delivery depends on the visitor having a configured email app and is not guaranteed. A backend or form service can be added later if reliable form delivery is needed.
- The case studies are intentionally high-level. Review them for accuracy and make sure they contain no confidential employer information.
- Update the canonical URL, Open Graph URL, sitemap, and `vite.config.ts` together if the deployed URL changes.

## Structure

```text
src/
  App.tsx       Page sections, navigation, interactive diagram, contact flow
  main.tsx      React entry point
  styles.css    Visual identity and responsive styles
public/
  assets/favicon.svg
  robots.txt
  sitemap.xml
.github/workflows/deploy.yml
```

## Later enhancements

Analytics and a custom API can be integrated later. There are no analytics trackers, external service calls, secrets, or database credentials in this release.

---
source: https://vite.dev/guide/static-deploy#github-pages
---

# GitHub Pages / GitLab Pages

Deploy the `dist` output to GitHub Pages via GitHub Actions, or to GitLab Pages via GitLab CI.

## Signature / Usage

GitHub Pages workflow at `.github/workflows/deploy.yml` (installs with npm, builds, deploys on push to `main`):

```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ['main']

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets the GITHUB_TOKEN permissions to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7
      - name: Set up Node
        uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7
        with:
          node-version: lts/*
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@45bfe0192ca1faeb007ade9deae92b16b8254a0d # v6
      - name: Upload artifact
        uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9 # v5
        with:
          # Upload dist folder
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@368f82528645a54fb793d4d04e342629a3f51346 # v5
```

GitLab Pages `.gitlab-ci.yml`:

```yaml
image: node:lts
pages:
  stage: deploy
  cache:
    key:
      files:
        - package-lock.json
      prefix: npm
    paths:
      - node_modules/
  script:
    - npm install
    - npm run build
    - cp -a dist/. public/
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

## Notes

- GitHub Pages step 1: set the correct `base` in `vite.config.js`. For `https://<USERNAME>.github.io/` or a custom domain (e.g. `www.example.com`), set `base` to `'/'` (or remove it, default is `'/'`). For `https://<USERNAME>.github.io/<REPO>/`, set `base` to `'/<REPO>/'`.
- GitHub Pages step 2: in the repository go to Settings → Pages; under Build and deployment, set Source to GitHub Actions. A workflow is necessary because Vite requires a build step.
- GitHub Pages step 3: create `.github/workflows/deploy.yml` (or click "create your own" in the previous step to generate a starter workflow). The workflow above is extracted from `docs/guide/static-deploy-github-pages.yaml` (region `content`) at tag v8.3.4; action pins are as published there.
- GitLab Pages: if deploying to `https://<USERNAME or GROUP>.gitlab.io/`, omit `base`. For `https://<USERNAME or GROUP>.gitlab.io/<REPO>/` set `base` to `'/<REPO>/'`. The `.gitlab-ci.yml` at the project root builds and deploys whenever content changes.
- Platform-side GitHub Actions / GitLab CI behavior is outside this skill's scope (see github-docs for GitHub).

## Related

- [Public Base Path](./public-base-path.md)
- [Deploying a Static Site](./static-deploy-overview.md)

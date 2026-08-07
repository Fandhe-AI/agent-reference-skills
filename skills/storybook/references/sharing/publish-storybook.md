# Publish Storybook

Build Storybook as a static web app and deploy it to Chromatic, GitHub Pages, or any static hosting provider.

## Usage

### Build

```bash
npm run build-storybook
```

```bash
npx http-server ./path/to/build
```

For larger projects, build in test mode for faster builds:

```bash
npm run build-storybook -- --test
```

For older browser support, build preview-only mode (accessed via `http://localhost:6006/iframe.html?navigator=true`):

```bash
npm run build-storybook -- --preview-only
```

### Deploy to Chromatic (recommended)

```bash
npm install chromatic --save-dev
npx chromatic --project-token=<your-project-token>
```

GitHub Actions:

```yaml
name: 'Chromatic Publish'
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: 'yarn'
      - run: yarn
      - uses: chromaui/action@latest
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Deploy to GitHub Pages

`.github/workflows/deploy-github-pages.yml`:

```yaml
name: Build and Publish Storybook to GitHub Pages
on:
  push:
    branches:
      - 'your-branch-name'
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: 'pages'
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v6
        with:
          node-version: '24'
          cache: 'npm'
      - run: npm ci
      - run: npm run build-storybook
      - uses: actions/upload-pages-artifact@v3
        with:
          path: 'storybook-static'
      - id: deploy
        uses: actions/deploy-pages@v4
        with:
          token: ${{ github.token }}
```

### SEO configuration

`.storybook/manager-head.html`:

```html
<meta name="description" content="Components for my awesome project" key="desc" />
<meta name="robots" content="noindex" />
```

## Notes

- Netlify, AWS S3, and similar static hosts work but operate at Component Publishing Protocol (CPP) level 0 — basic static hosting only, no versioned endpoints or `/index.json` support.
- Chromatic operates at CPP level 1: versioned endpoints, `/index.json`, history tracking, UI Review for PRs, component indexing.

## Related

- [CLI options](../api/cli-options.md)
- [Storybook Composition](./storybook-composition.md)
- [Embed stories](./embed.md)

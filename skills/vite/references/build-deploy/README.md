# build-deploy

| Name | Description | Path |
|------|-------------|------|
| Advanced Base Options (experimental.renderBuiltUrl) | Experimental separate base paths for entry HTML, hashed assets, and public files. | [advanced-base-options.md](./advanced-base-options.md) |
| Backend Integration (manifest.json) | Serve HTML from a traditional backend (e.g. Rails, Laravel) while using Vite for assets. | [backend-integration.md](./backend-integration.md) |
| Browser Compatibility | Production bundle targets Baseline Widely Available browser versions by default. | [browser-compatibility.md](./browser-compatibility.md) |
| Customizing the Build / Chunking Strategy | The build is customized via build config options and `build.rolldownOptions`. | [customizing-build.md](./customizing-build.md) |
| Cloudflare / Google Firebase | Deploy to Cloudflare Workers or Cloudflare Pages, or to Google Firebase Hosting. | [deploy-cloudflare-firebase.md](./deploy-cloudflare-firebase.md) |
| GitHub Pages / GitLab Pages | Deploy the `dist` output to GitHub Pages via GitHub Actions or GitLab Pages. | [deploy-github-gitlab.md](./deploy-github-gitlab.md) |
| Netlify / Vercel | Deploy the Vite static build to Netlify or Vercel via CLI or Git integration. | [deploy-netlify-vercel.md](./deploy-netlify-vercel.md) |
| Other Static Hosts | Surge, Azure Static Web Apps, Render, Flightcontrol, xmit, Zephyr Cloud, and EdgeOne Pages. | [deploy-other-hosts.md](./deploy-other-hosts.md) |
| Library Mode | Bundle a browser-oriented library for distribution with the `build.lib` config option. | [library-mode.md](./library-mode.md) |
| Load Error Handling (vite:preloadError) | Vite emits a `vite:preloadError` event when it fails to load a dynamic import. | [load-error-handling.md](./load-error-handling.md) |
| Multi-Page App | Specify multiple `.html` files as entry points during build. | [multi-page-app.md](./multi-page-app.md) |
| Public Base Path | Set the `base` config option (or `--base` flag) for a nested public path. | [public-base-path.md](./public-base-path.md) |
| Rebuild on Files Changes | Enable the Rolldown watcher with `vite build --watch`. | [rebuild-on-file-changes.md](./rebuild-on-file-changes.md) |
| Deploying a Static Site | Shared assumptions for the static deployment guides. | [static-deploy-overview.md](./static-deploy-overview.md) |

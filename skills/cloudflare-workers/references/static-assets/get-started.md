---
source: https://developers.cloudflare.com/workers/static-assets/get-started/
---

# Get Started

Deploy a static site or a full-stack (SSR) application on Workers without a framework, using C3, `wrangler dev` and `wrangler deploy`.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-static-site
cd my-static-site
npx wrangler dev
npx wrangler deploy
```

## Options / Props

C3 prompt answers:

| Prompt | Static site | Full-stack app |
|--------|-------------|----------------|
| What would you like to start with? | `Hello World example` | `Hello World example` |
| Which template would you like to use? | `Static site` | `SSR / full-stack app` |
| Which language do you want to use? | `TypeScript` | `TypeScript` |
| Use git for version control? | `Yes` | `Yes` |
| Add an AGENTS.md file? | `Yes` | `Yes` |
| Do you want to deploy your application? | `No` | `No` |

## Notes

- For most front-end applications a framework is recommended; building from scratch suits learning, simple projects, minimal dependencies, or full control.
- Deploys go to a `*.workers.dev` subdomain or a Custom Domain, from your machine or any CI/CD system. In CI, update the "deploy command" appropriately.
- In the full-stack template, `src/index.ts` holds the server-side Worker code and `public/index.html` (and anything else in `public/`) holds the static assets.
- When building a full-stack application you can use any Workers binding, including the assets binding.

## Related

- [Static Assets Overview](./overview.md)
- [Configuration and Bindings](./binding.md)
- [Routing: Worker script](./routing-worker-script.md)

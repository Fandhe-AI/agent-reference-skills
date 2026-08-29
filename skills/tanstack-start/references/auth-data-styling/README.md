# Auth, Data & Styling

| Name | Description | Path |
|------|-------------|------|
| Authentication Overview | Auth vs authorization, session/route-protection architecture, partner (Clerk/WorkOS) vs OSS (Better Auth/Auth.js) vs DIY comparison | [authentication-overview.md](./authentication-overview.md) |
| Authentication Server Primitives | DIY server-side auth: session cookies, middleware session lookup, OAuth state/PKCE, password-reset hardening, CSRF, rate limiting, session rotation | [authentication-server-primitives.md](./authentication-server-primitives.md) |
| Authentication | Server function login/logout/current-user, `useSession` cookie config, auth context, `beforeLoad` route protection | [authentication.md](./authentication.md) |
| Databases | Provider-agnostic database access via server functions; recommended providers (Neon, Convex, Prisma Postgres) | [databases.md](./databases.md) |
| CSS Styling | CSS import patterns (`?url`, side-effect, CSS modules), SSR asset discovery, Early Hints, experimental CSS inlining | [css-styling.md](./css-styling.md) |
| Tailwind CSS Integration | Tailwind v4/v3 setup with Vite or Rsbuild, `__root.tsx` stylesheet wiring | [tailwind-integration.md](./tailwind-integration.md) |
| Rendering Markdown | Static markdown via content-collections vs dynamic markdown fetched at runtime, shared `unified` rendering pipeline | [rendering-markdown.md](./rendering-markdown.md) |
| SEO | Document head meta/Open Graph/canonical, JSON-LD structured data, sitemaps, robots.txt | [seo.md](./seo.md) |
| Generative Engine Optimization (GEO) | AI-citation-oriented structured data (schema.org), `llms.txt`, content-structure best practices | [geo.md](./geo.md) |

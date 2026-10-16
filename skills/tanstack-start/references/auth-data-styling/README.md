# Auth, Data & Styling

| Name | Description | Path |
|------|-------------|------|
| Choose Authentication for React Apps | Architecture and decision guide for authentication in TanStack Start: authentication vs authorization, session management, route protection, and a comparison of partner, OSS, and DIY approaches. | [authentication-overview.md](./authentication-overview.md) |
| Authentication Server Primitives | Server-side primitives for DIY authentication: session cookies, session lookup middleware, OAuth state/PKCE, password-reset hardening, CSRF, and rate limiting. | [authentication-server-primitives.md](./authentication-server-primitives.md) |
| Implement Authentication in React | Implementation patterns for DIY authentication in TanStack Start: login/logout/current-user server functions, HTTP-only cookie sessions via iron-session, an auth context, and `beforeLoad` route protection. | [authentication.md](./authentication.md) |
| CSS Styling | TanStack Start supports whatever CSS patterns the bundler supports, plus SSR-aware route asset discovery and production controls (Early Hints, CSS inlining). | [css-styling.md](./css-styling.md) |
| Databases | TanStack Start works with any database provider: call the database's adapter, client, or driver from a server function or server route. | [databases.md](./databases.md) |
| Generative Engine Optimization (GEO) | Structuring content and data so AI systems (ChatGPT, Claude, Perplexity, etc.) can accurately understand, cite, and recommend it. | [geo.md](./geo.md) |
| Rendering Markdown | Two methods for importing and rendering markdown: static via `content-collections` (build-time) and dynamic markdown fetched at runtime, sharing a `unified`-based pipeline. | [rendering-markdown.md](./rendering-markdown.md) |
| SEO | Technical SEO building blocks in TanStack Start: SSR, static prerendering, document head management (meta/Open Graph/canonical/JSON-LD), sitemaps, and robots.txt. | [seo.md](./seo.md) |
| Tailwind CSS Integration | Setting up Tailwind CSS v4 (recommended) or v3 (legacy) in a TanStack Start project with Vite or Rsbuild. | [tailwind-integration.md](./tailwind-integration.md) |
| TanStack Query | Use TanStack Query with TanStack Start for request-isolated SSR, hydration, route preloading, streaming, and mutation invalidation. | [tanstack-query.md](./tanstack-query.md) |

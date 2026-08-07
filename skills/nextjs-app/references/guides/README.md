# Guides

| Name | Description | Path |
|------|-------------|------|
| Adopting Partial Prefetching | Guide to enabling Partial Prefetching, which changes `<Link>` to prefetch a route's… | [adopting-partial-prefetching.md](./adopting-partial-prefetching.md) |
| AI Coding Agents | Configure a Next.js project so AI coding agents read version-matched bundled docs… | [ai-agents.md](./ai-agents.md) |
| Analytics | Measure and report Web Vitals performance metrics using the built-in `useReport… | [analytics.md](./analytics.md) |
| App Router Migration | Step-by-step guide to incrementally migrate an existing Next.js application from… | [app-router-migration.md](./app-router-migration.md) |
| Authentication | Implementing authentication in Next.js breaks down into three concepts: Authentic… | [authentication.md](./authentication.md) |
| Backend for Frontend | Next.js supports the "Backend for Frontend" pattern: public HTTP endpoints via Ro… | [backend-for-frontend.md](./backend-for-frontend.md) |
| Building Your Application | Guide to what `next build` does, how to read the route table it prints, and how… | [building.md](./building.md) |
| Caching and Revalidating (Previous Model) | How to cache and revalidate data using `fetch` options, `unstable_cache`, and r… | [caching-without-cache-components.md](./caching-without-cache-components.md) |
| CDN Caching | Next.js sets standard `Cache-Control` headers per route (static, ISR, dynamic)… | [cdn-caching.md](./cdn-caching.md) |
| CI Build Caching | Configure CI to persist the `.next/cache` directory between builds to speed up … | [ci-build-caching.md](./ci-build-caching.md) |
| Codemods | Programmatic transformations to help upgrade a Next.js codebase when an API is… | [codemods.md](./codemods.md) |
| Content Security Policy | Set a Content Security Policy (CSP) to guard a Next.js app against XSS, clickj… | [content-security-policy.md](./content-security-policy.md) |
| CSS-in-JS | Using CSS-in-JS libraries in Client Components under the App Router requires a … | [css-in-js.md](./css-in-js.md) |
| Custom Server | Programmatically start a Next.js server for custom patterns, ejecting from the … | [custom-server.md](./custom-server.md) |
| Data Security | Guide to data security in Next.js given how Server Components shift where and h… | [data-security.md](./data-security.md) |
| Debugging | Debug a Next.js frontend and backend with full source-map support using VS Code… | [debugging.md](./debugging.md) |
| Deploying Next.js to Different Platforms | Guide for choosing a deployment target: what platform capabilities each Next.js… | [deploying-to-platforms.md](./deploying-to-platforms.md) |
| Draft Mode | Draft Mode lets editors preview unpublished CMS content by bypassing Next.js ca… | [draft-mode.md](./draft-mode.md) |
| Environment Variables | Next.js loads environment variables from `.env*` files into `process.env`, and… | [environment-variables.md](./environment-variables.md) |
| Forms with Server Actions | React extends `<form>` to invoke Server Actions via the `action` attribute, re… | [forms.md](./forms.md) |
| Handling Connectivity Drops | Experimental `useOffline` support: keeps failed navigations, RSC fetches, prefet… | [offline-support.md](./offline-support.md) |
| How Revalidation Works | Internal deep-dive into how Next.js revalidates cached content: the tag system… | [how-revalidation-works.md](./how-revalidation-works.md) |
| Incremental Static Regeneration (ISR) | ISR updates static content without a full rebuild, serving prerendered pages wh… | [incremental-static-regeneration.md](./incremental-static-regeneration.md) |
| Incremental Static Regeneration with Cache Components | The Cache Components equivalent of ISR/`fallback: true`: prerender a subset of… | [incremental-static-regeneration-cache-components.md](./incremental-static-regeneration-cache-components.md) |
| Ensuring Instant Navigations | Guide to structuring an app so navigations are instant: static/cached/prefetche… | [instant-navigation.md](./instant-navigation.md) |
| Instrumentation | Instrumentation integrates monitoring/logging tools by running code once at ser… | [instrumentation.md](./instrumentation.md) |
| Interactive Apps | Build responsive interactions in Next.js with `<Suspense>` streaming, `useOptim… | [interactive-apps.md](./interactive-apps.md) |
| Internationalization | Configure routing and rendering to support multiple languages/locales: interna… | [internationalization.md](./internationalization.md) |
| JSON-LD | Structured data (JSON-LD) helps search engines and AI understand page content b… | [json-ld.md](./json-ld.md) |
| Lazy Loading | Defers loading of Client Components and imported libraries until they're needed… | [lazy-loading.md](./lazy-loading.md) |
| Memory Usage | Strategies to reduce and diagnose memory consumption during Next.js development… | [memory-usage.md](./memory-usage.md) |
| Migrating from Create React App | Migrate an existing Create React App (CRA) site to Next.js, starting as a client… | [from-create-react-app.md](./from-create-react-app.md) |
| Migrating from Vite | Migrate an existing Vite (React) application to Next.js, starting as a client-on… | [from-vite.md](./from-vite.md) |
| Migrating to Cache Components | Guide to migrating from route segment configs (`dynamic`, `revalidate`, `fetchC… | [migrating-to-cache-components.md](./migrating-to-cache-components.md) |
| Multi-tenant | Guidance for building a single Next.js application that serves multiple tenants… | [multi-tenant.md](./multi-tenant.md) |
| Multi-zones | Build micro-frontends using Next.js Multi-Zones to deploy multiple Next.js apps… | [multi-zones.md](./multi-zones.md) |
| Next.js MCP Server | Next.js 16+ ships a built-in MCP endpoint at `/_next/mcp` on the dev server, ex… | [mcp.md](./mcp.md) |
| OpenTelemetry | Next.js has built-in OpenTelemetry instrumentation support for observability (t… | [open-telemetry.md](./open-telemetry.md) |
| Package Bundling | Analyze and optimize an application's server and client bundles with the Next.j… | [package-bundling.md](./package-bundling.md) |
| Partial Prerendering (PPR) Platform Guide | Guide for platform engineers implementing PPR support: PPR combines a static HTM… | [ppr-platform-guide.md](./ppr-platform-guide.md) |
| Prefetching | Next.js prefetches route assets ahead of navigation so client-side transitions… | [prefetching.md](./prefetching.md) |
| Preventing Flash Before Hydration | Use a synchronous inline `<script>` (via `dangerouslySetInnerHTML`) that runs… | [preventing-flash-before-hydration.md](./preventing-flash-before-hydration.md) |
| Production Checklist | Recommendations to ensure the best performance and user experience before takin… | [production-checklist.md](./production-checklist.md) |
| Progressive Web Apps (PWAs) | Build installable, native-app-like experiences with Next.js: a web app manifest… | [progressive-web-apps.md](./progressive-web-apps.md) |
| Public Static Pages | Build public pages (landing pages, product lists, marketing sites) that share da… | [public-static-pages.md](./public-static-pages.md) |
| Redirecting | Next.js offers several ways to redirect: the `redirect`/`permanentRedirect` fu… | [redirecting.md](./redirecting.md) |
| Rendering Philosophy | Next.js treats the boundary between static and dynamic rendering as a spectrum… | [rendering-philosophy.md](./rendering-philosophy.md) |
| Runtime Prefetching | With Cache Components and Partial Prefetching enabled, `<Link prefetch={true}>… | [runtime-prefetching.md](./runtime-prefetching.md) |
| Sass | Built-in support for styling with Sass (`.scss`/`.sass`) after installing the … | [sass.md](./sass.md) |
| Scripts | The `next/script` component optimizes loading of third-party scripts at the lay… | [scripts.md](./scripts.md) |
| Self-Hosting | Learn how to self-host a Next.js application on a Node.js server, Docker image… | [self-hosting.md](./self-hosting.md) |
| Server Actions and Mutations | A Server Action is a React Server Function invoked via `<form action>`, `<butto… | [server-actions.md](./server-actions.md) |
| Single-Page Applications (SPAs) | Next.js fully supports SPA patterns — fast prefetched transitions, client-side… | [single-page-applications.md](./single-page-applications.md) |
| Static Exports | Next.js can start as a static site or SPA (`output: 'export'`) and later optional… | [static-exports.md](./static-exports.md) |
| Streaming | Streaming sends parts of the HTML response as they become ready (chunked transf… | [streaming.md](./streaming.md) |
| Tailwind CSS v3 | How to install and configure Tailwind CSS v3 (for broader browser support) in a… | [tailwind-v3-css.md](./tailwind-v3-css.md) |
| Testing | Overview of test types and commonly used tools for testing a Next.js application… | [testing.md](./testing.md) |
| Testing: Cypress | Set up Cypress with Next.js for End-to-End (E2E) and Component Testing. | [cypress.md](./cypress.md) |
| Testing: Jest | Set up Jest with Next.js for Unit Testing and Snapshot Testing, using the buil… | [jest.md](./jest.md) |
| Testing: Playwright | Set up Playwright with Next.js for End-to-End (E2E) Testing across Chromium, Fir… | [playwright.md](./playwright.md) |
| Testing: Vitest | Set up Vitest with Next.js for Unit Testing. | [vitest.md](./vitest.md) |
| Third Party Libraries | `@next/third-parties` provides optimized components/utilities for loading popula… | [third-party-libraries.md](./third-party-libraries.md) |
| Upgrading to Version 14 | Upgrade a Next.js application from version 13 to 14. | [version-14.md](./version-14.md) |
| Upgrading to Version 15 | Upgrade a Next.js application from version 14 to 15. | [version-15.md](./version-15.md) |
| Upgrading to Version 16 | Upgrade a Next.js application from version 15 to 16. | [version-16.md](./version-16.md) |
| Videos | Recommendations and best practices for embedding and self-hosting videos in a N… | [videos.md](./videos.md) |
| View Transitions | React's `<ViewTransition>` component integrates with the browser View Transition… | [view-transitions.md](./view-transitions.md) |
| Development Environment | Optimize local development performance (`next dev`) as an application grows. | [local-development.md](./local-development.md) |
| MDX | MDX is a superset of markdown that allows writing JSX directly in markdown file… | [mdx.md](./mdx.md) |
| Preserving UI State | With Cache Components enabled, Next.js hides pages on navigation using React's… | [preserving-ui-state.md](./preserving-ui-state.md) |

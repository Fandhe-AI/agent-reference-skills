---
source: https://tanstack.com/start/latest/docs/framework/react/getting-started
---

# Getting Started

Multiple pathways to start a new TanStack Start project: AI-assisted setup, CLI scaffolding, cloning an example, or manual setup.

## Project Initialization Methods

### TanStack Builder

The AI-first setup flow; the easiest way to get a working project fast.

### CLI

```bash
npx @tanstack/cli@latest create
```

Prompts for package manager and optional additions (Tailwind CSS, ESLint).

### From Examples

```bash
npx gitpick TanStack/router/tree/main/examples/react/start-basic start-basic
cd start-basic
npm install
npm run dev
```

Available examples: Basic, Basic + Rsbuild, Basic + Auth, Counter variants, React Query / Clerk Auth / Convex / Supabase / WorkOS integrations, Material UI, Trellaux (full-featured). Each has a StackBlitz preview and Netlify deploy button.

### Manual Setup

Follow [Build a Project from Scratch](./build-from-scratch.md) to wire everything up by hand.

## Notes

- Migration guides exist for Next.js; Remix 2 and React Router 7 support are planned.
- After project creation, continue to the Routing guide (TanStack Router skill).

## Related

- [Build a Project from Scratch](./build-from-scratch.md)
- [Migrate from Next.js](./migrate-from-next-js.md)

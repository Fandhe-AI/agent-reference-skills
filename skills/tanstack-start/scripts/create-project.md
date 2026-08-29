---
source: https://tanstack.com/start/latest/docs/framework/react/getting-started
---

# Create Project

Scaffold a new TanStack Start project via the official CLI, or start from an official example.

## TanStack CLI scaffold

```bash
npx @tanstack/cli@latest create
```

Prompts for package manager and optional additions (Tailwind CSS, ESLint).

## Clone an official example

```bash
npx gitpick TanStack/router/tree/main/examples/react/start-basic start-basic
cd start-basic
npm install
npm run dev
```

Available examples include Basic, Basic + Rsbuild, Basic + Auth, Counter variants, React Query / Clerk Auth / Convex / Supabase / WorkOS integrations, Material UI, and Trellaux (full-featured). Replace `start-basic` in the path with the desired example's directory name.

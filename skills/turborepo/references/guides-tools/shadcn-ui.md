# shadcn/ui

## Usage

Setup:

```bash
pnpm dlx shadcn@latest init
```

Choose the monorepo option in the setup wizard.

Adding components:

```bash
pnpm dlx shadcn@latest add [COMPONENT]
```

## Notes

- Official docs (v2.11.11) use `shadcn@latest`; v2.11.8 docs used `shadcn@canary`.
- Source: https://turborepo.dev/docs/guides/tools/shadcn-ui (vercel/turborepo tag v2.11.11, fetched 2026-11-14).
- Files are copied directly rather than installed as an npm package.
- Tailwind CSS is a prerequisite.

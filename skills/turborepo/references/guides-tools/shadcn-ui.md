# shadcn/ui

## Usage

Setup: use the canary version for monorepos.

```bash
pnpm dlx shadcn@canary init
```

Choose the monorepo option in the setup wizard.

Adding components:

```bash
pnpm dlx shadcn@canary add [COMPONENT]
```

## Notes

- Monorepo support requires the `@canary` version.
- Files are copied directly rather than installed as an npm package.
- Tailwind CSS is a prerequisite.

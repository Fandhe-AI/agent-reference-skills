# Installation

Create a new Next.js app with `create-next-app`, or install manually and set up TypeScript, ESLint, and module path aliases.

## Signature / Usage

```bash
# Quick start
npx create-next-app@latest my-app --yes
cd my-app
npm run dev
```

```tsx
// app/layout.tsx — root layout is required, must contain <html> and <body>
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

```tsx
// app/page.tsx
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--yes` | flag | Skips prompts using saved preferences or defaults (TypeScript, Tailwind CSS, ESLint, App Router, Turbopack, `@/*` alias, `AGENTS.md`) |
| TypeScript | prompt | Minimum TypeScript version `v5.1.0`; rename a file to `.ts`/`.tsx` and run `next dev` to auto-configure |
| Linter | prompt | ESLint or Biome |
| `src/` directory | prompt | Optional folder to separate app code from config files |
| import alias | prompt | Default `@/*`, configurable via `tsconfig.json`/`jsconfig.json` `baseUrl`/`paths` |

## Notes

- Minimum Node.js version: 20.9. Supported browsers: Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+
- `next dev` uses Turbopack by default; run with `--webpack` to use Webpack instead
- Starting with Next.js 16, `next build` no longer runs the linter automatically; run lint via `package.json` scripts
- If the root layout is missing, `next dev` automatically creates one
- Manual install requires `next`, `react`, `react-dom`; the App Router uses React canary releases bundled with `next`

## Related

- [project-structure](./project-structure.md)
- [layouts-and-pages](./layouts-and-pages.md)

---
source: https://ui.shadcn.com/docs/react-19
---

# Next.js 15 + React 19

Using shadcn/ui with Next.js 15 and React 19. The page itself carries an update notice: full support for React 19 and Tailwind v4 was added in the `latest` release, and the guide might be outdated.

## Signature / Usage

npm only: peer dependency conflicts with React 19 can be resolved with a flag.

```bash
npm i <package> --force

npm i <package> --legacy-peer-deps
```

When running `npx shadcn@latest init -d` with npm, the CLI prompts:

```bash
It looks like you are using React 19.
Some packages may fail to install due to peer dependency issues (see https://ui.shadcn.com/react-19).

? How would you like to proceed? › - Use arrow-keys. Return to submit.
❯   Use --force
    Use --legacy-peer-deps
```

## Notes

- No flags are required for pnpm, bun, or yarn. pnpm and bun only show a silent warning.
- Alternative to flags: downgrade with `npm i react@18 react-dom@18`.
- `--force` ignores and overrides dependency conflicts; `--legacy-peer-deps` skips strict peer dependency checks.
- Check a package's peer dependencies with `npm info <package> peerDependencies`.
- Recharts with React 19 requires overriding `react-is` in `package.json` (version must match your React 19 version), then `npm install --legacy-peer-deps`:

```json
"overrides": {
  "react-is": "^19.0.0-rc-69d4b800-20241021"
}
```

- The page's Upgrade Status table (React 19 compatibility of radix-ui, lucide-react, class-variance-authority, tailwindcss-animate, embla-carousel-react, recharts, react-hook-form, react-resizable-panels, sonner, react-day-picker, input-otp, vaul, @radix-ui/react-icons, cmdk) lists all as working; some need a flag on npm. It reflects the React 19 RC era and is historical.

## Related

- [Tailwind v4](./tailwind-v4.md)
- [Next.js](./next.md)

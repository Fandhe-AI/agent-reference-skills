---
source: https://ui.shadcn.com/docs/tailwind-v4
---

# Tailwind v4

How to use shadcn/ui with Tailwind v4 and React 19, and how to upgrade an existing project.

## Signature / Usage

CSS variables: move `:root` / `.dark` out of `@layer base`, wrap colors in `hsl()`, and use `@theme inline`:

```css
:root {
  --background: hsl(0 0% 100%); // <-- Wrap in hsl
  --foreground: hsl(0 0% 3.9%);
}

.dark {
  --background: hsl(0 0% 3.9%); // <-- Wrap in hsl
  --foreground: hsl(0 0% 98%);
}

@theme inline {
  --color-background: var(--background); // <-- Remove hsl
  --color-foreground: var(--foreground);
}
```

## Notes

- What's new: the CLI initializes projects with Tailwind v4; full support for `@theme` and `@theme inline`; all components updated for Tailwind v4 and React 19; `forwardRef` removed; every primitive has a `data-slot` attribute; the `toast` component is deprecated in favor of `sonner`; buttons use the default cursor; the `default` style is deprecated (new projects use `new-york`); HSL colors converted to OKLCH.
- Non-breaking: existing Tailwind v3 + React 18 apps keep working, and added components stay v3 / React 18 until you upgrade. Only new projects start with Tailwind v4 and React 19.
- Upgrade steps: (1) follow the Tailwind v4 upgrade guide and use the `@tailwindcss/upgrade@next` codemod; (2) update CSS variables as above; (3) chart colors: replace `"hsl(var(--chart-1))"` with `"var(--chart-1)"` in `chartConfig`; (4) replace `w-4 h-4` with `size-4`; (5) update dependencies with `pnpm up "@radix-ui/*" cmdk lucide-react recharts tailwind-merge clsx --latest`; (6) remove `forwardRef`: replace `React.forwardRef<...>` with `React.ComponentProps<...>`, drop `ref={ref}`, add a `data-slot` attribute, optionally convert to a named function and remove `displayName` (the `remove-forward-ref` codemod from reactjs/react-codemod can do it).
- Changelog 2025-03-19: `tailwindcss-animate` deprecated in favor of `tw-animate-css`. Remove `tailwindcss-animate` and `@plugin 'tailwindcss-animate'`, install `tw-animate-css` as a dev dependency, and add `@import "tw-animate-css";` to `globals.css`.
- Changelog 2025-03-12: new, more accessible dark mode colors. For non-upgraded Tailwind v4 projects, commit changes, run `npx shadcn@latest add --all --overwrite` (overwrites existing components), update dark mode colors in `globals.css` to the new OKLCH values, and review changes.
- Before upgrading, read the Tailwind v4 Compatibility Docs; Tailwind v4 targets modern browsers.
- Gatsby guide remains Tailwind v3 only.

## Related

- [React 19](./react-19.md)
- [Manual Installation](./manual.md)

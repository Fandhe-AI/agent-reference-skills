---
source: https://ui.shadcn.com/docs/dark-mode
---

# Dark Mode

Adding dark mode to your site. The index page links to per-framework guides; dark mode works by toggling a `.dark` class that overrides the theme tokens.

## Signature / Usage

Per-framework guides:

- Next.js: `/docs/dark-mode/next`
- Vite: `/docs/dark-mode/vite`
- Astro: `/docs/dark-mode/astro`
- Remix: `/docs/dark-mode/remix`
- TanStack Start: `/docs/dark-mode/tanstack-start`

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

## Notes

- The theming docs state that dark mode works by overriding the same tokens inside a `.dark` selector, with a theme provider toggling the `.dark` class.
- Framework APIs themselves are in skills nextjs-app / react-router / tanstack-start / tanstack-router.

## Related

- [Theming](./theming.md)
- [Next.js](./dark-mode-next.md)
- [Vite](./dark-mode-vite.md)
- [Astro](./dark-mode-astro.md)
- [Remix](./dark-mode-remix.md)
- [TanStack Start](./dark-mode-tanstack-start.md)

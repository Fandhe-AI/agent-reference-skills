---
source: https://ui.shadcn.com/docs/rtl
---

# RTL

Right-to-left support for shadcn/ui components. Text alignment, positioning, and directional styles adapt for languages like Arabic, Hebrew, and Persian.

## Signature / Usage

Enable by setting `rtl: true` in `components.json`; the CLI then transforms classes and props when adding components. Migrate already-installed components:

```bash
npx shadcn@latest migrate rtl [path]
```

`[path]` accepts a path or glob pattern; if omitted, all files in the `ui` directory are migrated.

Pass `dir` to portal elements (workaround for a known `tw-animate-css` issue with logical slide utilities):

```tsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent dir="rtl">
    <div>Content</div>
  </PopoverContent>
</Popover>
```

```tsx
<Tooltip>
  <TooltipTrigger>Open</TooltipTrigger>
  <TooltipContent dir="rtl">
    <div>Content</div>
  </TooltipContent>
</Tooltip>
```

Flip directional icons:

```tsx
<ArrowRightIcon className="rtl:rotate-180" />
```

Add the direction component, then add `DirectionProvider` per your framework's guide:

```bash
npx shadcn@latest add direction
```

## Notes

- With `rtl: true`, the CLI converts physical classes (`left-*`, `right-*`) to logical ones (`start-*`, `end-*`), updates directional props to logical values, adjusts text alignment and spacing classes, and flips supported icons with `rtl:rotate-180`.
- Animation classes are transformed too, e.g. `slide-in-from-right` becomes `slide-in-from-end`.
- Automatic RTL transformation is only available for projects created with `shadcn create` using the new styles (`base-nova`, `radix-nova`, etc.). Other styles must use the migration path above.
- Not auto-migrated; follow the RTL support section of each component: Calendar, Pagination, Sidebar.
- Fonts: the docs recommend Noto, which pairs with Inter and Geist; each framework guide shows font setup.
- Per-framework guides: Next.js, Vite, TanStack Start (see Related). Framework APIs themselves are in skills nextjs-app / react-router / tanstack-start / tanstack-router.

## Related

- [RTL: Next.js](./rtl-next.md)
- [RTL: Vite](./rtl-vite.md)
- [RTL: TanStack Start](./rtl-start.md)
- [Theming](./theming.md)

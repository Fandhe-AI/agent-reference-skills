---
source: https://tailwindcss.com/docs/detecting-classes-in-source-files
---

# Controlling Class Detection with @source

Register, exclude, and force-generate classes with `@source`, `@source not`, and `@source inline()`.

```css
@import "tailwindcss";
@source "../node_modules/@acmecorp/ui-lib";
```

```css
@import "tailwindcss";
@source not "../src/components/legacy";
```

Set the base path, or disable automatic detection:

```css
@import "tailwindcss" source("../src");
```

```css
@import "tailwindcss" source(none);

@source "../admin";
@source "../shared";
```

Safelist with variants and brace-expanded ranges:

```css
@import "tailwindcss";
@source inline("{hover:,focus:,}underline");
@source inline("{hover:,}bg-red-{50,{100..900..100},950}");
```

Exclude classes even if detected:

```css
@import "tailwindcss";
@source not inline("{hover:,focus:,}bg-red-{50,{100..900..100},950}");
```

## Notes

- Tailwind scans source files as plain text, so build class names in full (`'text-red-600'`), never by interpolation like `text-${color}-600`.
- Ignored by default: `.gitignore` entries, `node_modules`, binary files, CSS files, and lock files.
- `@source` paths are relative to the stylesheet.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/detecting-classes-in-source-files.mdx` (fetched 2026-10-16).

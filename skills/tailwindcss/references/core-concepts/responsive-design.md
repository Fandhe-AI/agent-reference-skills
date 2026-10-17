---
source: https://tailwindcss.com/docs/responsive-design
---

# Responsive design

Using responsive utility variants to build adaptive user interfaces.

## Signature / Usage

Add the viewport meta tag to the `<head>`, then prefix a utility with the breakpoint name and `:`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
<img class="w-16 md:w-32 lg:w-48" src="..." />
```

## Options / Props

Default breakpoints:

| Breakpoint prefix | Minimum width | CSS |
|-------------------|---------------|-----|
| `sm` | 40rem (640px) | `@media (width >= 40rem) { ... }` |
| `md` | 48rem (768px) | `@media (width >= 48rem) { ... }` |
| `lg` | 64rem (1024px) | `@media (width >= 64rem) { ... }` |
| `xl` | 80rem (1280px) | `@media (width >= 80rem) { ... }` |
| `2xl` | 96rem (1536px) | `@media (width >= 96rem) { ... }` |

`max-*` variants (generated for each breakpoint):

| Variant | Media query |
|---------|-------------|
| `max-sm` | `@media (width < 40rem) { ... }` |
| `max-md` | `@media (width < 48rem) { ... }` |
| `max-lg` | `@media (width < 64rem) { ... }` |
| `max-xl` | `@media (width < 80rem) { ... }` |
| `max-2xl` | `@media (width < 96rem) { ... }` |

Default container query sizes:

| Variant | Minimum width | CSS |
|---------|---------------|-----|
| `@3xs` | 16rem (256px) | `@container (width >= 16rem) { … }` |
| `@2xs` | 18rem (288px) | `@container (width >= 18rem) { … }` |
| `@xs` | 20rem (320px) | `@container (width >= 20rem) { … }` |
| `@sm` | 24rem (384px) | `@container (width >= 24rem) { … }` |
| `@md` | 28rem (448px) | `@container (width >= 28rem) { … }` |
| `@lg` | 32rem (512px) | `@container (width >= 32rem) { … }` |
| `@xl` | 36rem (576px) | `@container (width >= 36rem) { … }` |
| `@2xl` | 42rem (672px) | `@container (width >= 42rem) { … }` |
| `@3xl` | 48rem (768px) | `@container (width >= 48rem) { … }` |
| `@4xl` | 56rem (896px) | `@container (width >= 56rem) { … }` |
| `@5xl` | 64rem (1024px) | `@container (width >= 64rem) { … }` |
| `@6xl` | 72rem (1152px) | `@container (width >= 72rem) { … }` |
| `@7xl` | 80rem (1280px) | `@container (width >= 80rem) { … }` |

## Notes

- Every utility class can be applied conditionally at breakpoints.

### Working mobile-first

Unprefixed utilities (like `uppercase`) take effect on all screen sizes; prefixed utilities (like `md:uppercase`) take effect at that breakpoint and above. To style for mobile use the unprefixed utility; `sm:` means "at the small breakpoint", not "on small screens".

```html
<!-- Bad: only centers text on screens 640px and wider -->
<div class="sm:text-center"></div>

<!-- Good: centers on mobile, left aligns at 640px and wider -->
<div class="text-center sm:text-left"></div>
```

### Breakpoint ranges and a single breakpoint

Stack a responsive variant with a `max-*` variant. To target a single breakpoint, stack with the `max-*` variant of the next breakpoint.

```html
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
<div class="md:max-lg:flex">
  <!-- ... -->
</div>
```

### Custom breakpoints

Use the `--breakpoint-*` theme variables. Always use the same unit for breakpoints (Tailwind's defaults use `rem`) or the generated utilities may be sorted unexpectedly. Reset one with `initial`, or all with `--breakpoint-*: initial`. For one-off breakpoints use the `min` / `max` variants with arbitrary values.

```css
@import "tailwindcss";

@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-2xl: 100rem;
  --breakpoint-3xl: 120rem;
}
```

```css
@import "tailwindcss";

@theme {
  --breakpoint-*: initial;
  --breakpoint-tablet: 40rem;
  --breakpoint-laptop: 64rem;
  --breakpoint-desktop: 80rem;
}
```

```html
<div class="grid xs:grid-cols-2 3xl:grid-cols-6">
  <!-- ... -->
</div>
<div class="max-[600px]:bg-sky-300 min-[320px]:text-center">
  <!-- ... -->
</div>
```

### Container queries

Container queries style something based on the size of a parent element rather than the viewport. Mark an element with `@container` (an inline-size container), then use `@sm`, `@md`, and so on. They are mobile-first like breakpoint variants. `@max-*` applies below a size, and variants can be stacked for ranges. Name containers with `@container/{name}` and target them with `@sm/{name}`. Use `@container-size` (also named `@container-size/{name}`) for size containers when you need units like `cqb`.

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- ... -->
  </div>
</div>

<div class="@container">
  <div class="flex flex-row @max-md:flex-col">
    <!-- ... -->
  </div>
</div>

<div class="@container">
  <div class="flex flex-row @sm:@max-md:flex-col">
    <!-- ... -->
  </div>
</div>

<div class="@container/main">
  <div class="flex flex-row @sm/main:flex-col">
    <!-- ... -->
  </div>
</div>

<div class="@container-size">
  <div class="h-[50cqb]">
    <!-- ... -->
  </div>
</div>
```

Custom container sizes use `--container-*` theme variables (`--container-8xl: 96rem;` adds `@8xl`). Arbitrary values: `@min-[475px]`, `@max-[960px]`. Container query length units like `cqw` and `cqi` can be used as arbitrary values; for `cqb` and `cqh` use `@container-size`.

```css
@import "tailwindcss";

@theme {
  --container-8xl: 96rem;
}
```

```html
<div class="@container">
  <div class="flex flex-col @min-[475px]:flex-row">
    <!-- ... -->
  </div>
  <div class="w-[50cqw]">
    <!-- ... -->
  </div>
</div>
```

- Chakra UI responsive style props are a different mechanism; see the chakra-ui skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/responsive-design.mdx` (fetched 2026-10-16).

## Related

- [Theme variables](./theme.md)
- [Hover, focus, and other states](./hover-focus-and-other-states.md)
- [Adding custom styles](./adding-custom-styles.md)
- [Styling with utility classes](./styling-with-utility-classes.md)

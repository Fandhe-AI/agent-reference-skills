---
source: https://tailwindcss.com/docs/adding-custom-styles
---

# Adding custom styles

Best practices for adding your own custom styles in Tailwind projects.

## Signature / Usage

```css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}

@utility content-auto {
  content-visibility: auto;
}
```

## Options / Props

`--value()` data types for functional utilities (`@utility name-* { ... }`):

| Form | Syntax | Matches / notes |
|------|--------|-----------------|
| Theme keys | `--value(--tab-size-*)` | Resolves against a set of theme keys (`tab-2`, `tab-4`, `tab-github`) |
| Bare values | `--value(integer)` | Bare value types: `number`, `integer`, `ratio`, `percentage` |
| Literal values | `--value("inherit", "initial", "unset")` | Literal strings (quoted) |
| Arbitrary values | `--value([integer])` | Types: `absolute-size`, `angle`, `bg-size`, `color`, `family-name`, `generic-name`, `image`, `integer`, `length`, `line-width`, `number`, `percentage`, `position`, `ratio`, `relative-size`, `url`, `vector`, `*` |
| Default | `--value(integer, --default(4))` | Default when used without an explicit value |
| Modifier | `--modifier(...)` | Works like `--value()` but operates on the modifier if present |

## Notes

### Customizing your theme

Use `@theme` to change the color palette, spacing scale, typography scale, or breakpoints (see theme variables).

### Using arbitrary values

Square bracket notation generates a class on the fly and combines with modifiers like `hover` and `lg`. A CSS variable shorthand `fill-(--my-brand-color)` is shorthand for `fill-[var(--my-brand-color)]`.

```html
<div class="top-[117px] lg:top-[344px]">
  <!-- ... -->
</div>
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>
<div class="fill-(--my-brand-color) ...">
  <!-- ... -->
</div>
```

Arbitrary properties and variants:

```html
<div class="[mask-type:luminance] hover:[mask-type:alpha]">
  <!-- ... -->
</div>
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
<ul role="list">
  {#each items as item}
  <li class="lg:[&:nth-child(-n+3)]:hover:underline">{item}</li>
  {/each}
</ul>
```

Whitespace: use `_` for a space in arbitrary values (converted at build time). Tailwind preserves the underscore where spaces are invalid (for example URLs). Escape with a backslash for a literal underscore; in JSX use `String.raw` so the backslash is not treated as a JS escape.

```html
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>
<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>
<div class="before:content-['hello\_world']">
  <!-- ... -->
</div>
```

```jsx
<div className={String.raw`before:content-['hello\_world']`}>
  <!-- ... -->
</div>
```

Resolving ambiguities: `text-[22px]` generates a font-size utility and `text-[#bada55]` a color utility. For ambiguous CSS variables hint the CSS data type:

```html
<div class="text-(length:--my-var)">...</div>
<div class="text-(color:--my-var)">...</div>
```

### Using custom CSS

Base styles: add classes to `html` / `body`, or use `@layer base`. Component classes go in `@layer components` so utilities can still override them (for example `class="card rounded-none"`).

```css
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }

  h2 {
    font-size: var(--text-xl);
  }
}

@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);
    box-shadow: var(--shadow-xl);
  }
}
```

### Using variants

Use `@variant` to apply a Tailwind variant in custom CSS. Stack with `hover:focus`, or apply the same styles to multiple variants with a comma.

```css
.my-element {
  background: white;

  @variant dark {
    background: black;
  }
}
```

Compiled:

```css
.my-element {
  background: white;

  @media (prefers-color-scheme: dark) {
    background: black;
  }
}
```

```css
.my-element {
  background: white;

  @variant hover:focus {
    background: black;
  }
}

.my-element-2 {
  background: white;

  @variant hover, focus {
    background: black;
  }
}
```

### Adding custom utilities

`@utility` registers simple, complex (nested), or functional utilities. Custom utilities are inserted into the `utilities` layer and work with variants like `hover`, `focus`, and `lg`.

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}

@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

Multiple forms can be used as multiple declarations (unresolved declarations are omitted), or as multiple arguments resolved left to right:

```css
@utility tab-* {
  tab-size: --value([integer]);
  tab-size: --value(integer);
  tab-size: --value(--tab-size-*);
}

@utility tab-* {
  tab-size: --value(--tab-size-*, integer, [integer]);
}

@utility opacity-* {
  opacity: --value([percentage]);
  opacity: calc(--value(integer) * 1%);
  opacity: --value(--opacity-*);
}
```

Default values (`tab` alone yields `tab-size: 4`; `tab-2/3` gives line-height `3`, `tab-2` gives `1`):

```css
@utility tab-* {
  tab-size: --value(integer, --default(4));
}

@utility tab-* {
  tab-size: --value(integer);
  line-height: --modifier(integer, --default(1));
}
```

Negative values (register separate positive and negative utilities), modifiers, and fractions (the CSS `ratio` type treats value and modifier as one):

```css
@utility inset-* {
  inset: --spacing(--value(integer));
  inset: --value([percentage], [length]);
}

@utility -inset-* {
  inset: --spacing(--value(integer) * -1);
  inset: calc(--value([percentage], [length]) * -1);
}

@utility text-* {
  font-size: --value(--text-*, [length]);
  line-height: --modifier(--leading-*, [length], [*]);
}

@utility aspect-* {
  aspect-ratio: --value(--aspect-ratio-*, ratio, [ratio]);
}
```

If a modifier isn't present, any declaration depending on it is omitted from the output.

### Adding custom variants

```css
@custom-variant theme-midnight {
  &:where([data-theme="midnight"] *) {
    @slot;
  }
}
```

```html
<html data-theme="midnight">
  <button class="theme-midnight:bg-black ..."></button>
</html>
```

Shorthand when nesting is not required, and nested rules for multi-rule variants:

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));

@custom-variant any-hover {
  @media (any-hover: hover) {
    &:hover {
      @slot;
    }
  }
}
```

### Migration (v3 → v4)

- Migration (v3 → v4): custom classes in `@layer utilities` / `@layer components` are no longer picked up as true utilities (v4 uses native cascade layers); use `@utility` instead. Custom utilities are sorted by the number of properties they define, so component-like utilities (for example `.btn`) can be overridden by other Tailwind utilities.
- Migration (v3 → v4): CSS variables as arbitrary values use parentheses, `bg-(--brand-color)` instead of `bg-[--brand-color]`.
- Migration (v3 → v4): commas are no longer converted to spaces in arbitrary values of `grid-cols-*`, `grid-rows-*`, and `object-*`; use underscores, `grid-cols-[max-content_auto]`.
- Migration (v3 → v4): prefixes look like variants at the start of the class name (`tw:flex`); configure theme variables as if no prefix is used, and generated CSS variables include the prefix (`--tw-color-avocado-100`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/adding-custom-styles.mdx` (fetched 2026-10-16) and `upgrade-guide.mdx`.

## Related

- [Theme variables](./theme.md)
- [Functions and directives](./functions-and-directives.md)
- [Styling with utility classes](./styling-with-utility-classes.md)
- [Hover, focus, and other states](./hover-focus-and-other-states.md)
- [Preflight](./preflight.md)

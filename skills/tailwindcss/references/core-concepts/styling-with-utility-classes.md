---
source: https://tailwindcss.com/docs/styling-with-utility-classes
---

# Styling with utility classes

Building complex components from a constrained set of primitive utilities.

## Signature / Usage

```html
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
  <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
  <div>
    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
  </div>
</div>
```

## Notes

- You style things by combining many single-purpose presentational classes (utility classes) directly in markup.
- Benefits listed: faster work (no class naming / selector decisions), safer changes (a class only affects that element), easier maintenance, portable code, and CSS that stops growing.
- Compared to inline styles: utilities pick from a predefined design system (theme variables), and support hover/focus/other state variants, media queries (responsive variants), which inline styles cannot.

### Hover and focus states

Prefix any utility with the state to target. Variants only apply the utility's styles when the condition matches; variants can be stacked.

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
<button class="bg-sky-500 disabled:hover:bg-sky-500 ...">Save changes</button>
```

```css
.hover\:bg-sky-700 {
  &:hover {
    background-color: var(--color-sky-700);
  }
}
```

### Media queries and breakpoints

The `sm:` prefix makes `grid-cols-3` apply at the `sm` breakpoint and above, which is 40rem out of the box.

```html
<div class="grid grid-cols-2 sm:grid-cols-3">
  <!-- ... -->
</div>
```

```css
.sm\:grid-cols-3 {
  @media (width >= 40rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

### Dark mode

A single utility class never includes both light and dark styles; use one class for light and another with the `dark:` prefix.

```css
.dark\:bg-gray-800 {
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-gray-800);
  }
}
```

### Class composition

Multiple classes can build up one CSS property (for example `filter`). Each utility sets a CSS variable for its own effect, and the property reads all of them with empty fallbacks. The generated CSS shown in the docs is "slightly simplified". The same approach is used for gradients, shadow colors, transforms, and more.

```html
<div class="blur-sm grayscale">
  <!-- ... -->
</div>
```

```css
.blur-sm {
  --tw-blur: blur(var(--blur-sm));
  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-grayscale,);
}
.grayscale {
  --tw-grayscale: grayscale(100%);
  filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-grayscale,);
}
```

### Arbitrary values

Use square bracket syntax for one-off values outside the theme, including `calc()` with theme values and arbitrary properties for CSS variables.

```html
<button class="bg-[#316ff6] ...">Sign in with Facebook</button>
<div class="grid grid-cols-[24rem_2.5rem_minmax(0,1fr)]"></div>
<div class="max-h-[calc(100dvh-(--spacing(6)))]"></div>
<div class="[--gutter-width:1rem] lg:[--gutter-width:2rem]"></div>
```

- Tailwind generates CSS from class names found by scanning project files for anything that looks like a class name, so arbitrary values such as `bg-[#316ff6]` work even when not in the theme.

### Complex selectors

```html
<button class="dark:lg:data-current:hover:bg-indigo-600 ..."></button>
<a href="#" class="group rounded-lg p-8">
  <span class="group-hover:underline">Read more…</span>
</a>
<div class="[&>[data-active]+span]:text-blue-600 ...">
  <span data-active></span>
  <span>This text will be blue</span>
</div>
```

```css
@media (prefers-color-scheme: dark) and (width >= 64rem) {
  button[data-current]:hover {
    background-color: var(--color-indigo-600);
  }
}
```

- `group-*` works with other variants such as `group-focus` and `group-active`. Arbitrary variants let you write any selector in a class name.

### When to use inline styles

Inline styles remain useful for dynamic values (database / API), very complicated arbitrary values, or for setting CSS variables inline and referencing them with utilities.

```jsx
export function BrandedButton({ buttonColor, buttonColorHover, textColor, children }) {
  return (
    <button
      style={{
        "--bg-color": buttonColor,
        "--bg-color-hover": buttonColorHover,
        "--text-color": textColor,
      }}
      className="bg-(--bg-color) text-(--text-color) hover:bg-(--bg-color-hover) ..."
    >
      {children}
    </button>
  );
}
```

### Managing duplication

- Loops: markup rendered in a loop only has its class list written once.
- Multi-cursor editing: edit duplicated class lists in one file simultaneously.
- Components / template partials: for reuse across files, create a component (React, Svelte, Vue) or a template partial (Blade, ERB, Twig, Nunjucks).
- Custom CSS: when a partial feels heavy-handed (for example a `btn-primary` class), write CSS in `@layer components` using theme variables.

```css
@import "tailwindcss";

@layer components {
  .btn-primary {
    border-radius: calc(infinity * 1px);
    background-color: var(--color-violet-500);
    padding-inline: --spacing(5);
    padding-block: --spacing(2);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
    box-shadow: var(--shadow-md);
    &:hover {
      @media (hover: hover) {
        background-color: var(--color-violet-700);
      }
    }
  }
}
```

### Managing style conflicts

- Conflicting utilities: the class that appears later in the stylesheet wins (`class="grid flex"` yields `display: grid`). Never add two conflicting classes to one element; in component libraries, expose props for style customization instead of accepting outside classes.
- Important modifier: add `!` at the end of the class name to make declarations `!important`.
- Important flag: `@import "tailwindcss" important;` marks all utilities `!important`.
- Prefix option: `@import "tailwindcss" prefix(tw);` prefixes all generated classes and CSS variables.

```html
<div class="bg-teal-500 bg-red-500!"></div>
```

```css
@import "tailwindcss" important;
@import "tailwindcss" prefix(tw);
```

```css
@layer theme {
  :root {
    --tw-color-red-500: oklch(0.637 0.237 25.331);
  }
}

@layer utilities {
  .tw\:text-red-500 {
    color: var(--tw-color-red-500);
  }
}
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/styling-with-utility-classes.mdx` (fetched 2026-10-16).

## Related

- [Hover, focus, and other states](./hover-focus-and-other-states.md)
- [Responsive design](./responsive-design.md)
- [Dark mode](./dark-mode.md)
- [Theme variables](./theme.md)
- [Adding custom styles](./adding-custom-styles.md)
- [Detecting classes in source files](./detecting-classes-in-source-files.md)

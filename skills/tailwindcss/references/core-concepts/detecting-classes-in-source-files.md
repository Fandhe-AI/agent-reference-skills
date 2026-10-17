---
source: https://tailwindcss.com/docs/detecting-classes-in-source-files
---

# Detecting classes in source files

Understanding and customizing how Tailwind scans your source files.

## Signature / Usage

```css
@import "tailwindcss";
@source "../node_modules/@acmecorp/ui-lib";
```

## Options / Props

| Syntax | Description |
|--------|-------------|
| `@source "<path>"` | Register a source path relative to the stylesheet |
| `@source not "<path>"` | Ignore a path, relative to the stylesheet |
| `@import "tailwindcss" source("<path>")` | Set the base path for source detection |
| `@import "tailwindcss" source(none)` | Disable automatic source detection |
| `@source inline("<classes>")` | Force classes to be generated (safelist); brace expansion supported |
| `@source not inline("<classes>")` | Prevent classes from being generated, even if detected |

## Notes

- Tailwind scans the project for utility classes and generates only the CSS for classes actually used; this is what makes arbitrary values possible.
- Source files are treated as plain text and are not parsed as code. Any token that could be a class name is considered, and tokens that do not map to a known utility are discarded.

### Dynamic class names

String concatenation or interpolation is not understood. Always use complete class names.

```html
<!-- Bad: text-red-600 / text-green-600 do not exist as strings -->
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>

<!-- Good -->
<div class="{{ error ? 'text-red-600' : 'text-green-600' }}"></div>
```

```jsx
// Bad
function Button({ color, children }) {
  return <button className={`bg-${color}-600 hover:bg-${color}-500 ...`}>{children}</button>;
}

// Good: map props to static class names
function Button({ color, children }) {
  const colorVariants = {
    blue: "bg-blue-600 hover:bg-blue-500",
    red: "bg-red-600 hover:bg-red-500",
  };

  return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

### Which files are scanned

Every file in the project, except:

- Files in your `.gitignore`
- Files in `node_modules`
- Binary files like images, videos, or zip files
- CSS files
- Common package manager lock files

Register ignored sources explicitly with `@source`. This is especially useful for external libraries built with Tailwind, since dependencies are usually in `.gitignore`.

### Base path, ignoring paths, disabling detection

The default starting point is the current working directory. `source()` is useful for monorepos where build commands run from the monorepo root. `source(none)` is useful for projects with multiple Tailwind stylesheets.

```css
@import "tailwindcss" source("../src");
```

```css
@import "tailwindcss";
@source not "../src/components/legacy";
```

```css
@import "tailwindcss" source(none);

@source "../admin";
@source "../shared";
```

### Safelisting specific utilities

```css
@import "tailwindcss";
@source inline("underline");
```

Generates:

```css
.underline {
  text-decoration-line: underline;
}
```

Variants and ranges: the source input is brace expanded.

```css
@import "tailwindcss";
@source inline("{hover:,focus:,}underline");
```

```css
@import "tailwindcss";
@source inline("{hover:,}bg-red-{50,{100..900..100},950}");
```

The second example generates red background colors 100 to 900 in increments of 100, plus 50 and 950, each also with the `hover:` variant.

### Explicitly excluding classes

```css
@import "tailwindcss";
@source not inline("{hover:,focus:,}bg-red-{50,{100..900..100},950}");
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/detecting-classes-in-source-files.mdx` (fetched 2026-10-16).

## Related

- [Functions and directives](./functions-and-directives.md)
- [Adding custom styles](./adding-custom-styles.md)
- [Styling with utility classes](./styling-with-utility-classes.md)

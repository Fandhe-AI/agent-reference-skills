# Tailwind CSS

## Usage

Quick start:

```bash
pnpm dlx create-turbo@latest -e with-tailwind
```

Architecture — shared Tailwind config package:

```css
/* packages/tailwind-config/shared-styles.css */
@import "tailwindcss";

@theme {
  --color-brand: #3b82f6;
}
```

UI package: prefix classes with `ui:` to avoid style-priority conflicts.

```html
<button class="ui:bg-blue-500 ui:text-white">Button</button>
```

## Notes

- Separate style builds and component builds into different tasks, running them in parallel while managing dependencies correctly.

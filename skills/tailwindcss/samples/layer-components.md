---
source: https://tailwindcss.com/docs/adding-custom-styles
---

# Component Classes with @layer components

Define card/button-style classes in the `components` layer so utility classes can still override them.

```css
@layer components {
  .card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);
    box-shadow: var(--shadow-xl);
  }
}
```

```html
<!-- Will look like a card, but with square corners -->
<div class="card rounded-none">
  <!-- ... -->
</div>
```

## Notes

- The `components` layer is also a good place for custom styles of third-party components (e.g. `.select2-dropdown`).
- The docs recommend the "managing duplication" guide before reaching for component classes.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/adding-custom-styles.mdx` (fetched 2026-10-16).

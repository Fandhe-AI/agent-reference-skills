---
source: https://tailwindcss.com/docs/adding-custom-styles
---

# Custom Utility with @utility

Register your own utility classes, including nested and functional (`tab-*`) forms, with `@utility`.

```css
@utility content-auto {
  content-visibility: auto;
}
```

```html
<div class="hover:content-auto">
  <!-- ... -->
</div>
```

Complex utility using nesting:

```css
@utility scrollbar-hidden {
  &::-webkit-scrollbar {
    display: none;
  }
}
```

Functional utility resolved against theme keys:

```css
@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-github: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*);
}
```

This matches `tab-2`, `tab-4`, and `tab-github`. Bare integer values use `tab-size: --value(integer);` (matches `tab-1`, `tab-76`).

## Notes

- Custom utilities are inserted into the `utilities` layer and work with variants such as `hover:`, `focus:`, and `lg:`.
- Bare value types are `number`, `integer`, `ratio`, and `percentage`; literals use `--value("inherit", "initial", "unset")`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/adding-custom-styles.mdx` (fetched 2026-10-16).

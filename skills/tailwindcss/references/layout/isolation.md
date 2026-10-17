---
source: https://tailwindcss.com/docs/isolation
---

# isolation

Utilities for controlling whether an element should explicitly create a new stacking context.

## Signature / Usage

```html
<div class="isolate ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `isolate` | `isolation: isolate;` |
| `isolation-auto` | `isolation: auto;` |

## Notes

- Use `isolate` and `isolation-auto` to control whether an element should explicitly create a new stacking context.
- Responsive: `isolate md:isolation-auto`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/isolation.mdx` (fetched 2026-10-16).

## Related

- [z-index](./z-index.md)
- [position](./position.md)

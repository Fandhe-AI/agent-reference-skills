---
source: https://tailwindcss.com/docs/transition-behavior
---

# transition-behavior

Utilities to control the behavior of CSS transitions.

## Signature / Usage

```html
<label class="peer ...">
  <input type="checkbox" checked />
</label>
<button class="hidden transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block ...">
  I fade out
</button>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `transition-normal` | `transition-behavior: normal;` |
| `transition-discrete` | `transition-behavior: allow-discrete;` |

## Notes

- Use `transition-discrete` to start transitions when changing properties with a discrete set of values, such as elements that change from `hidden` to `block`.
- Responsive design: prefix with a breakpoint variant like `md:` to apply only at medium screen sizes and above:

```html
<button class="transition-discrete md:transition-normal ...">
  <!-- ... -->
</button>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/transition-behavior.mdx` (fetched 2026-10-16).

## Related

- [transition-property](./transition-property.md)
- [transition-duration](./transition-duration.md)

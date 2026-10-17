---
source: https://tailwindcss.com/docs/flex-wrap
---

# flex-wrap

Utilities for controlling how flex items wrap.

## Signature / Usage

```html
<div class="flex flex-wrap">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `flex-nowrap` | `flex-wrap: nowrap;` |
| `flex-wrap` | `flex-wrap: wrap;` |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse;` |

## Notes

- Don't wrap: `flex-nowrap` prevents flex items from wrapping, causing inflexible items to overflow the container if necessary.
- Wrap normally: `flex-wrap` allows flex items to wrap.
- Wrap reversed: `flex-wrap-reverse` wraps flex items in the reverse direction.

```html
<div class="flex flex-wrap-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

- Responsive design: prefix a `flex-wrap` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="flex flex-wrap md:flex-wrap-reverse ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/flex-wrap.mdx` (fetched 2026-10-16).

## Related

- [flex-direction](./flex-direction.md)
- [gap](./gap.md)

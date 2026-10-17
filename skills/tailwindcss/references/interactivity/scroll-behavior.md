---
source: https://tailwindcss.com/docs/scroll-behavior
---

# scroll-behavior

Utilities for controlling the scroll behavior of an element.

## Signature / Usage

```html
<html class="scroll-smooth">
  <!-- ... -->
</html>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `scroll-auto` | `scroll-behavior: auto;` |
| `scroll-smooth` | `scroll-behavior: smooth;` |

## Notes

- Using smooth scrolling: use the `scroll-smooth` utility to enable smooth scrolling within an element. Setting the `scroll-behavior` only affects scroll events that are triggered by the browser.
- Using normal scrolling: use the `scroll-auto` utility to revert to the default browser behavior for scrolling:

```html
<html class="scroll-smooth md:scroll-auto">
  <!-- ... -->
</html>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/scroll-behavior.mdx` (fetched 2026-10-16).

## Related

- [scroll-margin](./scroll-margin.md)
- [scroll-padding](./scroll-padding.md)
- [scroll-snap-type](./scroll-snap-type.md)

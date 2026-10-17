---
source: https://tailwindcss.com/docs/field-sizing
---

# field-sizing

Utilities for controlling the sizing of form controls.

## Signature / Usage

```html
<textarea class="field-sizing-content ..." rows="2">
  Latex Salesman, Vanderlay Industries
</textarea>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `field-sizing-fixed` | `field-sizing: fixed;` |
| `field-sizing-content` | `field-sizing: content;` |

## Notes

- Sizing based on content: use the `field-sizing-content` utility to allow a form control to adjust its size based on the content.
- Using a fixed size: use the `field-sizing-fixed` utility to make a form control use a fixed size:

```html
<textarea class="field-sizing-fixed w-80 ..." rows="2">
  Latex Salesman, Vanderlay Industries
</textarea>
```

- Responsive design: prefix a `field-sizing` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<input class="field-sizing-content md:field-sizing-fixed ..." />
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/field-sizing.mdx` (fetched 2026-10-16).

## Related

- [resize](./resize.md)
- [appearance](./appearance.md)

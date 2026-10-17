---
source: https://tailwindcss.com/docs/background-blend-mode
---

# background-blend-mode

Utilities for controlling how an element's background image should blend with its background color.

## Signature / Usage

```html
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-multiply ..."></div>
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-soft-light ..."></div>
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-overlay ..."></div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `bg-blend-normal` | `background-blend-mode: normal;` |
| `bg-blend-multiply` | `background-blend-mode: multiply;` |
| `bg-blend-screen` | `background-blend-mode: screen;` |
| `bg-blend-overlay` | `background-blend-mode: overlay;` |
| `bg-blend-darken` | `background-blend-mode: darken;` |
| `bg-blend-lighten` | `background-blend-mode: lighten;` |
| `bg-blend-color-dodge` | `background-blend-mode: color-dodge;` |
| `bg-blend-color-burn` | `background-blend-mode: color-burn;` |
| `bg-blend-hard-light` | `background-blend-mode: hard-light;` |
| `bg-blend-soft-light` | `background-blend-mode: soft-light;` |
| `bg-blend-difference` | `background-blend-mode: difference;` |
| `bg-blend-exclusion` | `background-blend-mode: exclusion;` |
| `bg-blend-hue` | `background-blend-mode: hue;` |
| `bg-blend-saturation` | `background-blend-mode: saturation;` |
| `bg-blend-color` | `background-blend-mode: color;` |
| `bg-blend-luminosity` | `background-blend-mode: luminosity;` |

## Notes

- Basic example: use utilities like `bg-blend-difference` and `bg-blend-saturation` to control how the background image and color of an element are blended.

### Responsive design

Prefix a `background-blend-mode` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-lighten md:bg-blend-darken ...">
  <!-- ... -->
</div>
```

Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/background-blend-mode.mdx` (fetched 2026-10-16).

## Related

- [mix-blend-mode](./mix-blend-mode.md)
- [background-image](../backgrounds-borders/background-image.md)
- [background-color](../backgrounds-borders/background-color.md)

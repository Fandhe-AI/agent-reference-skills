---
source: https://tailwindcss.com/docs/overflow
---

# overflow

Utilities for controlling how an element handles content that is too large for the container.

## Signature / Usage

```html
<div class="overflow-auto ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `overflow-auto` | `overflow: auto;` |
| `overflow-hidden` | `overflow: hidden;` |
| `overflow-clip` | `overflow: clip;` |
| `overflow-visible` | `overflow: visible;` |
| `overflow-scroll` | `overflow: scroll;` |
| `overflow-x-auto` | `overflow-x: auto;` |
| `overflow-y-auto` | `overflow-y: auto;` |
| `overflow-x-hidden` | `overflow-x: hidden;` |
| `overflow-y-hidden` | `overflow-y: hidden;` |
| `overflow-x-clip` | `overflow-x: clip;` |
| `overflow-y-clip` | `overflow-y: clip;` |
| `overflow-x-visible` | `overflow-x: visible;` |
| `overflow-y-visible` | `overflow-y: visible;` |
| `overflow-x-scroll` | `overflow-x: scroll;` |
| `overflow-y-scroll` | `overflow-y: scroll;` |

## Notes

- `overflow-visible` prevents content from being clipped; any content that overflows the element bounds is then visible.
- `overflow-hidden` clips any content that overflows the bounds of the element.
- `overflow-auto` adds scrollbars only if content overflows. Unlike `overflow-scroll`, which always shows scrollbars.
- `overflow-x-auto` / `overflow-y-auto` allow horizontal / vertical scrolling if needed (e.g. `<div class="h-32 overflow-y-auto ...">`).
- `overflow-x-scroll` / `overflow-y-scroll` allow scrolling and always show scrollbars unless always-visible scrollbars are disabled by the operating system.
- `overflow-scroll` adds scrollbars in all directions and always shows them; some operating systems (like macOS) hide unnecessary scrollbars regardless of this setting.
- Responsive: `overflow-auto md:overflow-scroll`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/overflow.mdx` (fetched 2026-10-16).

## Related

- [overscroll-behavior](./overscroll-behavior.md)
- [text-overflow](../text/text-overflow.md)

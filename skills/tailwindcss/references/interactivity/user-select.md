---
source: https://tailwindcss.com/docs/user-select
---

# user-select

Utilities for controlling whether the user can select text in an element.

## Signature / Usage

```html
<div class="select-none ...">The quick brown fox jumps over the lazy dog.</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `select-none` | `user-select: none;` |
| `select-text` | `user-select: text;` |
| `select-all` | `user-select: all;` |
| `select-auto` | `user-select: auto;` |

## Notes

- Disabling text selection: use the `select-none` utility to prevent selecting text in an element and its children.
- Allowing text selection: use the `select-text` utility to allow selecting text in an element and its children:

```html
<div class="select-text ...">The quick brown fox jumps over the lazy dog.</div>
```

- Selecting all text in one click: use the `select-all` utility to automatically select all the text in an element when a user clicks:

```html
<div class="select-all ...">The quick brown fox jumps over the lazy dog.</div>
```

- Using auto select behavior: use the `select-auto` utility to use the default browser behavior for selecting text:

```html
<div class="select-auto ...">The quick brown fox jumps over the lazy dog.</div>
```

- Responsive design: prefix a `user-select` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above:

```html
<div class="select-none md:select-all ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/user-select.mdx` (fetched 2026-10-16).

## Related

- [pointer-events](./pointer-events.md)
- [cursor](./cursor.md)

---
source: https://tailwindcss.com/docs/border-collapse
---

# border-collapse

Utilities for controlling whether table borders should collapse or be separated.

## Signature / Usage

```html
<table class="border-collapse border border-gray-400 ...">
  <thead>
    <tr>
      <th class="border border-gray-300 ...">State</th>
      <th class="border border-gray-300 ...">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 ...">Indiana</td>
      <td class="border border-gray-300 ...">Indianapolis</td>
    </tr>
  </tbody>
</table>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `border-collapse` | `border-collapse: collapse;` |
| `border-separate` | `border-collapse: separate;` |

## Notes

- `border-collapse` combines adjacent cell borders into a single border when possible; this includes collapsing borders on the top-level `<table>` tag.
- `border-separate` forces each cell to display its own separate borders (e.g. `<table class="border-separate border border-gray-400 ...">`).
- Responsive: `<table class="border-collapse md:border-separate">`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/border-collapse.mdx` (fetched 2026-10-16).

## Related

- [border-spacing](./border-spacing.md)
- [table-layout](./table-layout.md)

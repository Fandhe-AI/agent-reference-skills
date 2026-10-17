---
source: https://tailwindcss.com/docs/caption-side
---

# caption-side

Utilities for controlling the alignment of a caption element inside of a table.

## Signature / Usage

```html
<table>
  <caption class="caption-top">
    Table 3.1: Professional wrestlers and their signature moves.
  </caption>
  <thead>
    <tr>
      <th>Wrestler</th>
      <th>Signature Move(s)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"Stone Cold" Steve Austin</td>
      <td>Stone Cold Stunner, Lou Thesz Press</td>
    </tr>
  </tbody>
</table>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `caption-top` | `caption-side: top;` |
| `caption-bottom` | `caption-side: bottom;` |

## Notes

- `caption-top` positions a caption element at the top of a table; `caption-bottom` at the bottom (`<caption class="caption-bottom">`).
- Responsive: `<caption class="caption-top md:caption-bottom">`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/caption-side.mdx` (fetched 2026-10-16).

## Related

- [table-layout](./table-layout.md)
- [border-collapse](./border-collapse.md)

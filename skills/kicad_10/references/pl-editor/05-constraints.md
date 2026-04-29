# Constraints

Drawing sheet items support constraints that control visibility and text sizing.

## Page 1 Constraint

Individual items can be restricted to specific pages in multi-page schematics. The properties panel provides three visibility options:

| Option | Behavior |
|--------|----------|
| Show on all pages | Item appears on every sheet page (default) |
| First page only | Item appears only on the first page |
| Subsequent pages only | Item appears on all pages except the first |

## Text Maximum Size Constraint

Text items support a maximum bounding-box size defined by height and width parameters. When text exceeds these limits, it is compressed to fit.

| Parameter | Value | Effect |
|-----------|-------|--------|
| Max width | > 0 | Compresses text horizontally when actual width exceeds the limit |
| Max width | 0 | Maximum width enforcement disabled |
| Max height | > 0 | Compresses text vertically when actual height exceeds the limit |
| Max height | 0 | Maximum height enforcement disabled |

## Notes

- Text that fits within the bounding box displays normally without compression
- Setting both parameters to `0` disables all maximum size constraints
- Over-compression can cause visual distortion

## Related

- [Text and Keywords](./04-text-and-keywords.md)
- [Properties Editor](./08-properties-editor.md)

# System Icon Composition: Modifiers, Layering, Localization

Guidance for building system icon glyphs from a base icon plus a modifier icon, layering glyphs for state changes, and validating icon meaning across cultures.

## Signature / Usage

```
Base icon:            file/paper-sheet glyph -> communicates "file"
Base + modifier icon:  file glyph + up-arrow glyph (bottom quadrant) -> "uploaded file"
```

## Options / Props

| Concept | Description |
|---------|--------------|
| Base icon | The main element of a visual metaphor; should occupy the entire icon footprint. |
| Modifier icon | Modifies the meaning of the base icon; should be placed in one of the bottom quadrants of the icon footprint. |
| Layering | Overlapping two glyphs, recommended for creating a different state of the same icon (e.g. an active or selected state), such as a beige folder icon layered with a black outline folder icon. |
| Localization | Validating that an icon's cultural connotations are appropriate in every locale where the app ships. |

## Notes

- Base icons alone communicate a single concept (e.g. a paper sheet = "file"); adding a modifier icon changes that meaning (e.g. adding an up arrow = "uploaded file").
- Modifier icons belong in a bottom quadrant of the icon footprint, not centered or overlapping the base icon's main silhouette.
- Layering is distinct from base+modifier composition: layering overlaps two glyphs to express a *state* of the same icon (active/selected), rather than combining two different concepts.
- Although iconography doesn't require localization in most cases, certain icons might be acceptable in one culture but not in another — validate icon choices against the context in which they'll be used.
- This is system/UI icon guidance (command bars, navigation, status indicators), distinct from app icon design guidance (metaphor selection, 48x48 grid, silhouette) covered separately.

## Related

- [Icon Elements](./icon-elements.md)
- [Segoe Fluent Icons Font](./segoe-fluent-icons-font.md)
- [Design Guidelines for Windows App Icons](./app-icon-design.md)

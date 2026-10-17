# Watch Face Designer advanced usage (subdials, complications, color themes)

Advanced Watch Face Designer features: subdial hands, complication slots with per-type templates, and user-selectable color themes built from Figma styles.

## Signature / Usage

Color theme styles are Figma color styles that must be named in this exact form (Figma treats `/` as a folder separator):

```text
Watch Face Name/Element Family Name/Descriptive Color Name/Specific Element Name
```

Example: `Bauhaus/Hands/Charcoal/Hours`, `Bauhaus/Hands/Charcoal/Minutes`, `Bauhaus/Hands/Rust/Hours`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Rotate around: Layer center | option | Set on the subdial container frame so the second hand inside rotates within that subsection. |
| Behavior: Complication slot | layer behavior | Set on a frame; creates a Figma component with one variant (the empty design). |
| + Support a new type | button | Adds a variant for another complication type (for example "Short text": two small labels alongside an icon). |
| Behavior: Single-color icon | layer behavior | Inside a complication type variant; the icon inherits the color set in Figma. |
| Default app | complication slot setting | App placed in the slot by default. |
| Always on | complication slot setting | Whether the slot appears in ambient (system always-on) mode. |

## Notes

- Subdial setup: create an empty frame covering the subdial area, design the hand inside it (default pointing from center to top), select the frame, set **Rotate around** to "Layer center".
- Complications: the watch face provides a template per complication type; the apps on the user's watch choose the template and data, and the user chooses which app goes in which slot.
- Complication text is always drawn with the device system font (typically Roboto); arbitrary font export applies only to digital time. All-uppercase text uses Figma's Typography text case.
- Color themes: create a style by deselecting everything and pressing **+** next to **Styles** in the right sidebar. Add a new theme by changing the Descriptive Color Name part (for example `Rust`). Themes can be mix-and-matched across element families; users pick them from the watch face picker on the watch.
- Example from the page: hands offer `Rust` and `Charcoal`, dial offers `Light`, `Dark`, `Duotone`.
- Source: https://developer.android.com/training/wearables/watch-face-designer/advanced (page fetched 2026-10; no version pin on the site).

## Related

- [watch-face-designer](./watch-face-designer.md)
- [watch-face-designer-export](./watch-face-designer-export.md)
- [complications](./complications.md)

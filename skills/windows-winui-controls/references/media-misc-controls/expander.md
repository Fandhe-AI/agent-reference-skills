# Expander

A container with a header that is always visible and a content area that can be expanded/collapsed to show or hide secondary content. Pushes adjacent content out of the way (does not overlay).

## Signature / Usage

```xaml
<Expander Header="This text is in the header"
          Content="This is in the content"/>

<Expander IsExpanded="True" ExpandDirection="Up">
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Header | object | Content always visible; the user interacts with it to expand/collapse. |
| Content | object | Secondary content shown/hidden; inherited from `ContentControl`. |
| IsExpanded | bool | Whether the content area is initially/currently expanded. Default `false`. |
| ExpandDirection | ExpandDirection | `Down` (default) or `Up`. |
| Expanding / Collapsed | event | Raised when the content area begins expanding / after it collapses. |
| HorizontalContentAlignment / VerticalContentAlignment | HorizontalAlignment / VerticalAlignment | Alignment of the expanded content only (not the header). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.Expander` (WinUI 3). Distinct from Chakra UI / Ark UI `Accordion`/`Collapsible`, Jetpack Compose `ExpandableCard` patterns, and HTML `<details>`.
- Do not set an explicit `Height` on `Expander` itself — it reserves that space even when collapsed. Constrain the height of the `Content` (optionally wrapped in `ScrollViewer`) instead.
- `Expander` is not light-dismiss; it only collapses via `IsExpanded` or header interaction.

## Related

- [ColorPicker](./color-picker.md)
- [PersonPicture](./person-picture.md)

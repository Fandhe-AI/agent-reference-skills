# Smoke

Smoke is a translucent black material that dims the surfaces beneath an important UI element, causing them to recede into the background. It signals blocking interaction below a modal UI such as a dialog.

## Signature / Usage

Smoke is applied automatically by modal surfaces (such as `ContentDialog`) behind the modal content; it is not a brush you typically set directly on arbitrary elements.

## Notes

- Package: applied by WinUI 3 modal controls (e.g. `Microsoft.UI.Xaml.Controls.ContentDialog`) in the `Microsoft.UI.Xaml.Controls` namespace. Distinct from any JS/Compose overlay/scrim component.
- Unlike Mica and Acrylic, Smoke is **not** mode-aware — it renders as translucent black in both light and dark themes.
- Use Smoke only to emphasize a genuinely blocking/modal surface; it is not a general-purpose dimming or overlay effect.

## Related

- [Materials overview](./materials-overview.md)
- [Mica / Mica Alt](./mica.md)
- [Acrylic](./acrylic.md)

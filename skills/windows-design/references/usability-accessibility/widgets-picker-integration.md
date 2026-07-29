# Integrate with the widget picker

Design requirements for the assets a widget provider supplies so the widget integrates correctly into the Widgets Board's widget picker.

## Signature / Usage

The widget picker shows a preview screenshot when a widget has focus. The screenshot is specified in the widget provider's package manifest.

```xml
<!-- Referenced conceptually via the widget provider manifest's Screenshot elements -->
Screenshot="ms-appx:Assets\Screenshot.png"
```

## Options / Props

| Requirement | Value |
|------|-------------|
| Screenshot content | Must display the **medium** size version of the widget |
| Screenshot dimensions | 300 x 304 px |
| Screenshot background | Transparent, rounded corners |
| Screenshot variants | Top-level (required/default), plus optional `LightMode` and `DarkMode` used per the device's current theme |
| Locale-specific assets | Fallback at `Assets/Screenshot.png`; locale variants at `Assets/<locale>/Screenshot.png` (e.g. `Assets/en-us/Screenshot.png`, `Assets/fr-fr/Screenshot.png`) |

## Notes

- If a locale-specific screenshot is missing, the fallback (root-directory) image is used automatically by the resource loader.
- The default, top-level screenshot is used whenever no `LightMode`/`DarkMode` variant matches the device's current theme.

## Related

- [Widget design fundamentals](./widgets-design-fundamentals.md)
- [Widget states and built-in UI components](./widgets-states-and-ui.md)
- [Widget principles](./widgets-principles.md)

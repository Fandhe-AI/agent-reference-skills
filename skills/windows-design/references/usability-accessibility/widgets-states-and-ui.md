# Widget states and built-in UI components

The different states a widget can be in on the Widgets Board, and the UI elements the Widgets host renders and manages itself.

## Signature / Usage

| State | Owner | Description |
|------|-------------|------|
| Default | App | Normal running state; the primary, fully-implemented experience (should not be empty before user configuration) |
| Signed-out | App | Shown when the user must sign in; present non-personalized content instead of blocking the widget |
| Error | System | Shown when the Widgets Board can't retrieve layout/data; system renders the header, an error message, and a reload button; cached-content timestamp shown as minutes (if <1h) or rounded hours |
| Customization | App (JSON template) | Since Windows App SDK 1.4, provides controls for the user to customize widget appearance/data, defined via a JSON customization template |

## Options / Props

| Built-in component | Description |
|------|-------------|
| Context menu | System-rendered three-dot menu for choosing widget size and accessing the configuration state |
| Attribution area | System-rendered header (name + icon) based on widget registration metadata; not customizable by the provider |

## Notes

- **DO**: make the default state feel personal, show engaging content the user can act on immediately, mirror the parent app's UI within widget constraints, and use generous spacing between elements.
- **DON'T**: use the widget for generic commercial offers, or design busy/complex layouts.
- Long widget-partner names are truncated at 15 characters max when showing a cached-content message.

## Related

- [Widget design fundamentals](./widgets-design-fundamentals.md)
- [Widget interaction design guidance](./widgets-interaction-design.md)

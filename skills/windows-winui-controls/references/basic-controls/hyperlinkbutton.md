# HyperlinkButton

A button styled like a hyperlink, used for navigation to a URI or in-app destinations.

## Signature / Usage

```xaml
<HyperlinkButton Content="www.microsoft.com" NavigateUri="https://www.microsoft.com"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| NavigateUri | Uri | URI to navigate to when the button is clicked. Opens in the default browser. |
| Content | object | The content of the button (inherited from ContentControl). Renders as blue hyperlink-styled text when content is a string. |
| Click | event | Occurs when the button is clicked (inherited from ButtonBase). Handle for custom navigation logic instead of setting `NavigateUri`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from WPF `System.Windows.Controls.Hyperlink`, and the JS `@ark-ui/react` / `@chakra-ui/react` link primitives.
- Use `HyperlinkButton` instead of `Button` when the action is navigation, not an immediate command.
- Inherits from `ButtonBase` via `Button`.

## Related

- [Button](./button.md)

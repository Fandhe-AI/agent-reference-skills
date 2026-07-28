# Button

A button gives the user a way to trigger an immediate action. `Button` initiates an immediate action, such as submitting a form.

## Signature / Usage

```xaml
<Button Content="Subscribe" Click="SubscribeButton_Click"/>
```

```csharp
Button subscribeButton = new Button();
subscribeButton.Content = "Subscribe";
subscribeButton.Click += SubscribeButton_Click;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Content | object | The content of the button (inherited from ContentControl). String content renders as text, UIElement content renders directly. |
| Command | ICommand | Command to invoke when the button is pressed. |
| CommandParameter | object | Parameter passed to `Command`. |
| Flyout | FlyoutBase | Flyout shown when the button is clicked. |
| ClickMode | ClickMode | When the `Click` event occurs: `Release` (default), `Press`, or `Hover`. If `Hover`, `Click` can't be raised via keyboard or touch. |
| IsPressed | bool | Whether the button is currently in a pressed state. |
| IsPointerOver | bool | Whether a pointer is currently over the button. |
| Click | event | Occurs when the button is clicked (tap, left mouse click, or Enter/Spacebar with keyboard focus). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose `Button`.
- `Button` inherits from `ButtonBase` (namespace `Microsoft.UI.Xaml.Controls.Primitives`), which defines `Click`, `Command`, `CommandParameter`, `ClickMode`, `IsPressed`.
- Don't use `Button` for navigation actions; use `HyperlinkButton` instead.
- For wizard/menu buttons with additional options attached, see `DropDownButton` and `SplitButton`.

## Related

- [HyperlinkButton](./hyperlinkbutton.md)
- [RepeatButton](./repeatbutton.md)
- [DropDownButton](./dropdownbutton.md)
- [SplitButton](./splitbutton.md)
- [ToggleButton](./togglebutton.md)

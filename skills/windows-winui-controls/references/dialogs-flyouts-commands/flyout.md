# Flyout

A light-dismiss container that shows arbitrary XAML content. Inherits from `FlyoutBase`. Flyouts can be nested to create cascading experiences.

## Signature / Usage

```xaml
<Button Content="Click me">
  <Button.Flyout>
     <Flyout>
        <TextBlock Text="This is a flyout!"/>
     </Flyout>
  </Button.Flyout>
</Button>
```

Attaching a flyout to an element that has no `Flyout` property, and showing it imperatively:

```xaml
<Image Source="Assets/cliff.jpg" Width="50" Height="50" Tapped="Image_Tapped">
  <FlyoutBase.AttachedFlyout>
    <Flyout>
      <TextBlock Text="This is some text in a flyout."/>
    </Flyout>
  </FlyoutBase.AttachedFlyout>
</Image>
```

```csharp
private void Image_Tapped(object sender, TappedRoutedEventArgs e)
{
    FlyoutBase.ShowAttachedFlyout((FrameworkElement)sender);
}
```

## Options / Props

Inherited from `FlyoutBase`:

| Name | Type | Description |
|------|------|-------------|
| Placement | FlyoutPlacementMode | Default placement relative to the target: `Top`, `Bottom`, `Left`, `Right`, `Full`, etc. |
| IsOpen | bool | Read-only; whether the flyout is currently open |
| Target | DependencyObject | The element used as the flyout's placement target |
| XamlRoot | XamlRoot | The `XamlRoot` in which the flyout is viewed |
| LightDismissOverlayMode | LightDismissOverlayMode | `Auto` (default; dims on Xbox only), `On`, or `Off` — controls the dimming overlay behind the flyout |
| OverlayInputPassThroughElement | UIElement | Element that still receives pointer input even when underneath the light-dismiss overlay |
| ShowMode | FlyoutShowMode | Controls whether the flyout takes focus when shown (`Standard`, `Transient`, `TransientWithDismissOnPointerMoveAway`) |
| ShouldConstrainToRootBounds | bool | Whether the flyout is kept within the bounds of the XAML root |

`Flyout`-specific:

| Name | Type | Description |
|------|------|-------------|
| FlyoutPresenterStyle | Style | Style applied to the `FlyoutPresenter` that hosts the flyout's content |

## Methods

| Name | Description |
|------|-------------|
| `ShowAt(FrameworkElement)` | Shows the flyout placed relative to the specified element |
| `ShowAt(DependencyObject, FlyoutShowOptions)` | Shows the flyout with explicit show options |
| `Hide()` | Closes the flyout |
| `ShowAttachedFlyout(FrameworkElement)` (static) | Shows the flyout attached via `FlyoutBase.AttachedFlyout` on the given element |

## Events

| Name | Description |
|------|-------------|
| Opening | Occurs before the flyout is shown |
| Opened | Occurs when the flyout is shown |
| Closing | Occurs when the flyout starts to be hidden |
| Closed | Occurs when the flyout is hidden |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` / `Microsoft.UI.Xaml.Controls.Primitives` (WinUI 3). Distinct from `System.Windows.Controls.Primitives` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` Popover/Menu APIs.
- `FlyoutBase` is the base class for `Flyout`, `MenuFlyout`, and `CommandBarFlyout`.
- Flyouts close via tap outside, ESC, system back, or gamepad B by default; the first dismissing tap is normally absorbed unless the target is designated as `OverlayInputPassThroughElement`.
- Use a flyout (not a dialog) to show arbitrary contextual content without blocking the whole app; use a dialog for messages that must block interaction.

## Related

- [MenuFlyout / MenuFlyoutItem](./menu-flyout-item.md)
- [CommandBarFlyout](./command-bar-flyout.md)
- [Popup](./popup.md)
- [ContentDialog](./content-dialog.md)

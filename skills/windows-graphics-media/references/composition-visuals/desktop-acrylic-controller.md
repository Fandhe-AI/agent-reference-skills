# DesktopAcrylicController

Manages rendering and system policy for the background Acrylic material — a system backdrop `CompositionBrush` that reveals the desktop wallpaper and other windows behind the currently active app.

## Signature / Usage

```csharp
if (DesktopAcrylicController.IsSupported())
{
    var acrylicController = new DesktopAcrylicController();
    var configurationSource = new SystemBackdropConfiguration();
    acrylicController.AddSystemBackdropTarget(
        window.As<Microsoft.UI.Composition.ICompositionSupportsSystemBackdrop>());
    acrylicController.SetSystemBackdropConfiguration(configurationSource);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsSupported() | static method | Determines whether Acrylic is supported on the current OS. |
| Kind | DesktopAcrylicKind | Which variant of Acrylic material is used (default or base). |
| FallbackColor | Windows.UI.Color | Solid color used when system conditions prevent rendering Acrylic. |
| LuminosityOpacity / TintColor / TintOpacity | float / Color / float | Customizes the material's luminosity opacity and color tint. |
| AddSystemBackdropTarget / RemoveSystemBackdropTarget(ICompositionSupportsSystemBackdrop) | method | Attaches/detaches a window as a backdrop render target. |
| SetTarget(WindowId, CompositionTarget) / SetTarget(CoreWindow, CompositionTarget) | method | Connects the controller to a specific `HWND`/`AppWindow` or `CoreWindow`. |
| SetSystemBackdropConfiguration(SystemBackdropConfiguration) | method | Applies app-specific policy (theme, window activation state) to the controller. |
| ResetProperties() | method | Reverts customized properties to system defaults and automatic light/dark handling. |
| State / StateChanged | property / event | Current backdrop rendering state and its change notification. |

## Notes

- Namespace: `Microsoft.UI.Composition.SystemBackdrops` (Windows App SDK / WinUI 3 desktop only). Implements `ISystemBackdropController` / `ISystemBackdropControllerWithTargets`.
- In WinUI 3 XAML apps, prefer setting `Window.SystemBackdrop = new DesktopAcrylicBackdrop()` (`Microsoft.UI.Xaml.Media.DesktopAcrylicBackdrop`) unless manual control via `DesktopAcrylicController` is required.
- Sibling class: [MicaController](./mica-controller.md) for the Mica material.

## Related

- [MicaController](./mica-controller.md)
- [Compositor](./compositor.md)

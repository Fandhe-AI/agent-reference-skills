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
- `DesktopAcrylicController` (and `DesktopAcrylicBackdrop`) creates external content: an `AcrylicBrush` in front of it cannot see the colors the backdrop draws and blurs transparent black instead, and compositor content cannot be placed behind it. See [Compositor](./compositor.md).
- Sibling class: [MicaController](./mica-controller.md) for the Mica material.
- Windows App SDK 2.0 added `Microsoft.UI.Xaml.Controls.SystemBackdropElement`, a `FrameworkElement` that places a system backdrop such as Mica or Acrylic anywhere in the XAML layout (with `CornerRadius`); it is a XAML control and is covered by the windows-winui-ui skill, not by this controller page.
- Windows App SDK 2.6.5: the 2.6.4 change for system backdrops under the System Composition Engine was reverted, and system backdrops for content islands and XAML windows are not supported with the System Composition Engine in that release.
- Source: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/release-notes/windows-app-sdk-2-0 (fetched 2026-11-14)

## Related

- [MicaController](./mica-controller.md)
- [Compositor](./compositor.md)

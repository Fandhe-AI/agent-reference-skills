# MicaController

Manages rendering and system policy for the Mica material — a system backdrop `CompositionBrush` used behind a window's content, adapting to desktop wallpaper and theme.

## Signature / Usage

```csharp
if (MicaController.IsSupported())
{
    var micaController = new MicaController();
    var configurationSource = new SystemBackdropConfiguration();
    micaController.AddSystemBackdropTarget(
        window.As<Microsoft.UI.Composition.ICompositionSupportsSystemBackdrop>());
    micaController.SetSystemBackdropConfiguration(configurationSource);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsSupported() | static method | Determines whether Mica is supported on the current OS. |
| Kind | MicaKind | Which variation of Mica material is used (base or alt). |
| FallbackColor | Windows.UI.Color | Solid color used when system conditions prevent rendering Mica. |
| LuminosityOpacity / TintColor / TintOpacity | float / Color / float | Customizes the material's luminosity opacity and color tint. |
| AddSystemBackdropTarget / RemoveSystemBackdropTarget(ICompositionSupportsSystemBackdrop) | method | Attaches/detaches a window as a backdrop render target. |
| SetTarget(WindowId, CompositionTarget) / SetTarget(CoreWindow, CompositionTarget) | method | Connects the controller to a specific `HWND`/`AppWindow` or `CoreWindow`. |
| SetSystemBackdropConfiguration(SystemBackdropConfiguration) | method | Applies app-specific policy (theme, window activation state) to the controller. |
| ResetProperties() | method | Reverts customized properties to system defaults and automatic light/dark handling. |
| State / StateChanged | property / event | Current backdrop rendering state and its change notification. |

## Notes

- Namespace: `Microsoft.UI.Composition.SystemBackdrops` (Windows App SDK / WinUI 3 desktop only). Implements `ISystemBackdropController` / `ISystemBackdropControllerWithTargets`.
- In WinUI 3 XAML apps, prefer setting `Window.SystemBackdrop = new MicaBackdrop()` (`Microsoft.UI.Xaml.Media.MicaBackdrop`) unless manual control via `MicaController` is required (e.g. non-XAML Win32 apps).
- `MicaController` (and `MicaBackdrop`) creates external content: an `AcrylicBrush` in front of it cannot see the colors the backdrop draws and blurs transparent black instead, and compositor content cannot be placed behind it. See [Compositor](./compositor.md).
- Sibling class: [DesktopAcrylicController](./desktop-acrylic-controller.md) for the Acrylic material.
- Windows App SDK 2.0 added `Microsoft.UI.Xaml.Controls.SystemBackdropElement`, a `FrameworkElement` that places a system backdrop such as Mica or Acrylic anywhere in the XAML layout (with `CornerRadius`); it is a XAML control and is covered by the windows-winui-ui skill, not by this controller page.
- Windows App SDK 2.6.5: the 2.6.4 change for system backdrops under the System Composition Engine was reverted, and system backdrops for content islands and XAML windows are not supported with the System Composition Engine in that release.
- Source: https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/release-notes/windows-app-sdk-2-0 (fetched 2026-11-14)

## Related

- [DesktopAcrylicController](./desktop-acrylic-controller.md)
- [Compositor](./compositor.md)

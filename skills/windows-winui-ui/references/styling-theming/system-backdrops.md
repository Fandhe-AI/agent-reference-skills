# System Backdrops (SystemBackdrop, MicaBackdrop, DesktopAcrylicBackdrop)

`SystemBackdrop` is the base type set on `Window.SystemBackdrop` (or on `Flyout`/`Popup`/`MenuFlyoutPresenter`/`CommandBarFlyoutCommandBar`) to apply a Mica or Desktop Acrylic material as a window/surface background. `MicaBackdrop` and `DesktopAcrylicBackdrop` are the two built-in implementations.

## Signature / Usage

```xaml
<Window ...>
    <Window.SystemBackdrop>
        <MicaBackdrop/>
    </Window.SystemBackdrop>
</Window>
```

```xaml
<!-- Desktop Acrylic on a transient surface -->
<Flyout ...>
    <Flyout.SystemBackdrop>
        <DesktopAcrylicBackdrop/>
    </Flyout.SystemBackdrop>
</Flyout>
```

```csharp
// Switch backdrop at runtime
DynamicBackdropHost.SystemBackdrop = backdropType switch
{
    "Mica"    => new MicaBackdrop { Kind = MicaKind.Base },
    "MicaAlt" => new MicaBackdrop { Kind = MicaKind.BaseAlt },
    _         => new DesktopAcrylicBackdrop()
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Window.SystemBackdrop | `SystemBackdrop` | Applies the material to the entire window. |
| MicaBackdrop.Kind | `MicaKind` | `Base` or `BaseAlt`. |
| DesktopAcrylicBackdrop.Kind | `DesktopAcrylicKind` | `Base` or `Thin`. |
| SystemBackdropElement | control | Applies a backdrop material to a bounded in-page region (a `Grid`/panel-sized area) rather than the whole window; supports `CornerRadius`. |
| MicaController / DesktopAcrylicController | `ISystemBackdropController` | Advanced (pre-1.3 or fine-grained) API for manual backdrop composition control, requiring `SystemBackdropConfiguration` and a `DispatcherQueue`. |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (`SystemBackdrop`, `MicaBackdrop`, `DesktopAcrylicBackdrop`) and `Microsoft.UI.Composition.SystemBackdrops` (`MicaController`, `DesktopAcrylicController`, `SystemBackdropConfiguration`) — WinUI 3 / Windows App SDK. Distinct from macOS `NSVisualEffectView` materials (`apple-appkit`/`apple-swiftui`) and CSS backdrop-filter blur used in `ark-ui`/`chakra-ui`.
- Since Windows App SDK 1.3, setting `Window.SystemBackdrop` directly (as shown above) is the recommended approach for most apps; the `MicaController`/`DesktopAcrylicController` composition APIs are an advanced fallback for finer control (custom `FallbackColor`, `TintColor`, `TintOpacity`, `LuminosityOpacity`).
- Mica is recommended for the app's foundation/base layer (opaque, wallpaper-derived); Desktop Acrylic (semi-transparent, frosted-glass) is reserved for transient light-dismiss surfaces like flyouts and context menus — see also `in-app-acrylic` for `AcrylicBrush` applied directly to UI elements rather than the window.
- `SystemBackdropElement` is for applying a material to a bounded in-page region (e.g. a card); it is independent of and can be combined with the window-level `Window.SystemBackdrop`.
- When using the manual controller APIs, always check `IsSupported()` first, dispose the controller in the window's `Closed` handler, and update `SystemBackdropConfiguration.Theme`/`IsInputActive` in response to `ActualThemeChanged`/`Activated` events.

## Related

- [Mica Material](./mica-material.md)
- [Brushes (SolidColorBrush, LinearGradientBrush, AcrylicBrush, RevealBrush)](./brushes.md)

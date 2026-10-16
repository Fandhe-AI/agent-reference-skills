# System Backdrops (SystemBackdrop, MicaBackdrop, DesktopAcrylicBackdrop)

`SystemBackdrop` is the base type set on `Window.SystemBackdrop` (or on `Flyout`/`Popup`/`MenuFlyoutPresenter`/`CommandBarFlyoutCommandBar`/`ContentIsland`/`DesktopWindowXamlSource`) to apply a Mica or Desktop Acrylic material as a window/surface background. `MicaBackdrop` and `DesktopAcrylicBackdrop` are the two built-in implementations.

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

```xaml
<!-- SystemBackdropElement: Windows App SDK 2.0+ -->
<Grid Width="300" Height="200">
    <SystemBackdropElement CornerRadius="8">
        <SystemBackdropElement.SystemBackdrop>
            <DesktopAcrylicBackdrop />
        </SystemBackdropElement.SystemBackdrop>
    </SystemBackdropElement>

    <!-- Content rendered on top of the backdrop -->
    <Button HorizontalAlignment="Center" VerticalAlignment="Center" Content="Click Me" />
</Grid>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Window.SystemBackdrop | `SystemBackdrop` | Applies the material to the entire window. |
| MicaBackdrop.Kind | `MicaKind` | `Base` or `BaseAlt`. |
| DesktopAcrylicBackdrop.Kind | `DesktopAcrylicKind` | `Base` or `Thin`. |
| SystemBackdropElement | `FrameworkElement` (`Microsoft.UI.Xaml.Controls`) | Requires Windows App SDK 2.0 or later. Applies a backdrop material to a bounded in-page region (a `Grid`/panel-sized area) rather than the whole window. Main properties: `SystemBackdrop`, `CornerRadius`. |
| SystemBackdrop hosts | property | Elements with a `SystemBackdrop` property: `CommandBarFlyoutCommandBar`, `ContentIsland`, `DesktopWindowXamlSource`, `FlyoutBase`, `MenuFlyoutPresenter`, `Popup`, `Window`. |
| MicaController / DesktopAcrylicController | `ISystemBackdropController` | Advanced (pre-1.3 or fine-grained) API for manual backdrop composition control, requiring `SystemBackdropConfiguration` and a `DispatcherQueue`. |

## Notes

- Package: `Microsoft.UI.Xaml.Media` (`SystemBackdrop`, `MicaBackdrop`, `DesktopAcrylicBackdrop`) and `Microsoft.UI.Composition.SystemBackdrops` (`MicaController`, `DesktopAcrylicController`, `SystemBackdropConfiguration`) — WinUI 3 / Windows App SDK. Distinct from macOS `NSVisualEffectView` materials (`apple-appkit`/`apple-swiftui`) and CSS backdrop-filter blur used in `ark-ui`/`chakra-ui`.
- Since Windows App SDK 1.3, setting `Window.SystemBackdrop` directly (as shown above) is the recommended approach for most apps; the `MicaController`/`DesktopAcrylicController` composition APIs are an advanced fallback for finer control (custom `FallbackColor`, `TintColor`, `TintOpacity`, `LuminosityOpacity`).
- Mica is recommended for the app's foundation/base layer (opaque, wallpaper-derived); Desktop Acrylic (semi-transparent, frosted-glass) is reserved for transient light-dismiss surfaces like flyouts and context menus — see Related for `AcrylicBrush` applied directly to UI elements rather than the window.
- Mica is Windows 11 only (falls back to a solid theme color on Windows 10). Desktop Acrylic requires Windows 10 build 17763 or later (Materials overview).
- Changing any of `MicaController` / `DesktopAcrylicController` `FallbackColor`, `LuminosityOpacity`, `TintColor`, `TintOpacity` stops the controller from applying default Light/Dark values when `SystemBackdropConfiguration.Theme` changes; update those properties manually to match the new theme.
- `SystemBackdropElement` was named `SystemBackdropHost` in the Windows App SDK 2.0 Experimental period (renamed in the 2.0.0-Experimental4 release notes).
- `SystemBackdropElement` is for applying a material to a bounded in-page region (e.g. a card); it is independent of and can be combined with the window-level `Window.SystemBackdrop`.
- When using the manual controller APIs, always check `IsSupported()` first, dispose the controller in the window's `Closed` handler, and update `SystemBackdropConfiguration.Theme`/`IsInputActive` in response to `ActualThemeChanged`/`Activated` events.

## Related

- [Mica Material](./mica-material.md)
- [In-app Acrylic](./in-app-acrylic.md)
- [Materials overview](./materials-overview.md)
- [Brushes (SolidColorBrush, LinearGradientBrush, AcrylicBrush, RevealBrush)](./brushes.md)

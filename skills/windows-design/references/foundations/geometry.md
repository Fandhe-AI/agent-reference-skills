# Geometry

Geometry describes the shape, size, and position of UI elements on screen. Windows 11 applies progressively rounded corners, nested elements, and consistent gutters to create a soft, calm, and coherent effect across the design system, per the Fluent Design shapes language.

## Options / Props

| Corner radius | Usage |
|------|-------------|
| 8px | Top-level containers: app windows, flyouts, dialogs (`ContentDialog`, `Flyout`, `MenuFlyout`, `TeachingTip`). |
| 4px | In-page/rectangle elements: `Button`, `CheckBox`, `ComboBox`, `TextBox`, `ListView` backplates. |
| 4px | Bar elements: `ProgressBar`, `ScrollBar`, `Slider`. |
| 4px | `ToolTip` (exception to the 8px flyout rule, due to its small size). |
| 0px | Straight edges that intersect with other straight edges are not rounded. |
| 0px | Window corners when the window is snapped or maximized. |

| Resource | Default | Purpose |
|------|-------------|------|
| `ControlCornerRadius` | 4px | Global resource controlling standard control corner rounding; override in `App.xaml`. |
| `OverlayCornerRadius` | 8px | Global resource controlling top-level/overlay corner rounding; override in `App.xaml`. |

## Notes

- When not to round: touching UI elements inside the same container (e.g. the two parts of a `SplitButton`) and the edge of a flyout connected to the control that invokes it.
- Win32 desktop apps can opt into rounded window corners via the DWM API (see "Apply rounded corners in desktop apps").
- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` shape tokens, and Jetpack Compose shapes.

## Related

- [Elevation and layering](./elevation-layering.md)
- [Spacing, gutters, and content density](./layout-spacing-and-density.md)
- [Design principles](./design-principles.md)

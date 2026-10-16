# InkCanvas / InkToolbar

Experimental WinUI 3 controls for pen / mouse / touch ink input (`InkCanvas`) and an associated toolbar of ink tools (`InkToolbar`). Both, plus `InkPresenter`, live in `Microsoft.UI.Xaml.Controls` and are marked `[Windows.Foundation.Metadata.Experimental]`.

## Signature / Usage

```xaml
<StackPanel Spacing="8">
    <InkToolbar
        x:Name="inkToolbar"
        AutomationProperties.Name="Drawing tools"
        TargetInkCanvas="{x:Bind inkCanvas}" />
    <Border
        Height="300"
        Background="White"
        BorderBrush="{ThemeResource SystemControlForegroundChromeHighBrush}"
        BorderThickness="1">
        <InkCanvas x:Name="inkCanvas" AutomationProperties.Name="Drawing surface" />
    </Border>
</StackPanel>
```

```csharp
// Mouse input doesn't draw ink by default. Choose every device type that can draw ink.
inkCanvas.InkPresenter.InputDeviceTypes =
    CoreInputDeviceTypes.Pen | CoreInputDeviceTypes.Mouse | CoreInputDeviceTypes.Touch;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| InkCanvas.InkPresenter | InkPresenter | Presenter that collects and renders ink for the canvas. Cannot be created directly; get it from the canvas. |
| InkToolbar.TargetInkCanvas | InkCanvas | The canvas the toolbar controls. |
| InkToolbar.TargetInkPresenter | InkPresenter | Connects the toolbar directly to a presenter (2.5.4-experimental; type is `InkPresenter`). Set only one of `TargetInkCanvas` / `TargetInkPresenter`. |
| InkToolbar.ActiveTool | InkToolbarToolButton | Selected tool. Built-in buttons may not exist until the toolbar loads, so set it in the `Loaded` handler. |
| InkToolbar.InitialControls | InkToolbarInitialControls | Built-in buttons: `All` (default), `PensOnly`, `AllExceptPens`, `None`. |
| InkToolbar.InkDrawingAttributes | InkDrawingAttributes | Attributes of the active tool (Windows Runtime type). |
| InkToolbar.Orientation | Orientation | `Vertical` shows the toolbar vertically. |
| InkToolbar.ButtonFlyoutPlacement | InkToolbarButtonFlyoutPlacement | Where button flyouts open. Default `Auto`. |
| InkToolbar.Children | UIElementCollection | XAML content property; declare custom or built-in buttons here. |
| InkToolbar.IsRulerButtonChecked | bool | State of the ruler button. |
| InkToolbar.IsStencilButtonChecked | bool | State of the stencil button. |
| InkToolbar.GetToolButton(InkToolbarTool) | method | Returns a built-in tool button. |
| InkToolbar.GetToggleButton(InkToolbarToggle) | method | Returns a built-in toggle button. |
| InkToolbar.GetMenuButton(InkToolbarMenuKind) | method | Returns a built-in menu button. |

## Events

| Name | Owner | Description |
|------|-------|-------------|
| ActiveToolChanged | InkToolbar | User selected another tool. |
| EraseAllClicked | InkToolbar | User selected the erase-all command (eraser button `IsClearAllVisible = true`). |
| InkDrawingAttributesChanged | InkToolbar | Attributes of the active tool changed. |
| IsStencilButtonCheckedChanged | InkToolbar | Stencil button toggled. |
| StrokesCollected | InkPresenter | Strokes were drawn; `args.Strokes` holds them. |
| StrokesErased | InkPresenter | Strokes were erased; `args.Strokes` holds them. |

## Notes

- **Experimental only.** `InkCanvas`, `InkToolbar`, and `InkPresenter` are in `Microsoft.UI.Xaml.Controls` (not the UWP `Windows.UI.Xaml.Controls` namespace). Inking support was added in Windows App SDK 2.4.1-experimental (`InkCanvas` has existed since 2.0 Experimental 1); the current docs describe 2.5.4-experimental. They are not in the stable channel, where XAML use gives `WMC0001 Unknown type`. They might change or be removed; don't use them in production.
- `InkCanvas` has no `Background` property. Wrap it in a `Border` and set size and background on the border. Default ink is black.
- Mouse does not draw ink by default; add `CoreInputDeviceTypes.Mouse` to `InkPresenter.InputDeviceTypes`. `IsInputEnabled = false` stops collecting ink from every device.
- Project setup: using the APIs gives warnings CS8305 (C#) and WMC1501 (XAML). Suppress them in the .csproj:

```xml
<PropertyGroup>
  <NoWarn>$(NoWarn);CS8305</NoWarn>
  <MSBuildWarningsAsMessages>$(MSBuildWarningsAsMessages);WMC1501</MSBuildWarningsAsMessages>
</PropertyGroup>
```

- Name collision (CS0104) with `Windows.UI.Input.Inking`: `InkPresenter`, `InkStrokeContainer`, and `InkHighContrastAdjustment` exist in both namespaces. The controls use the `Microsoft.UI.Xaml.Controls` versions; strokes and attributes stay Windows Runtime types (`InkStroke`, `InkDrawingAttributes`, `InkStrokeBuilder`). Use alias directives:

```csharp
using Microsoft.UI.Xaml.Controls;
using InkDrawingAttributes = Windows.UI.Input.Inking.InkDrawingAttributes;
using InkStroke = Windows.UI.Input.Inking.InkStroke;
```

- Save / load: `InkStrokeContainer.SaveAsync(stream, InkPersistenceFormat)`; `GifWithEmbeddedIsf` writes a GIF that also holds editable ink data, `Isf` writes ink data only (most compact). `LoadAsync` removes existing strokes first.
- Set `Palette` of a pen button in code, not XAML (see Known limitations).

### Known limitations

- Available only in experimental releases of the Windows App SDK.
- No handwriting or shape recognition.
- Mouse input doesn't draw ink until `CoreInputDeviceTypes.Mouse` is added.
- Reported with 2.4.1-experimental and not listed as fixed in 2.5.4-experimental:
  - The ruler and protractor stencils don't work.
  - `RenderTargetBitmap` doesn't capture ink; save in the `GifWithEmbeddedIsf` format to create an image.
  - Setting a pen button's `Palette` in XAML causes a XAML parse error; set it in code.
  - Button flyouts can appear empty, and changing `ButtonFlyoutPlacement` might not change where they open.

### Changes from 2.4.1-experimental

| API in 2.4.1-experimental | Change in 2.5.4-experimental |
| --- | --- |
| `InkToolbar.TargetInkPresenter` (type `Object`) | Property type is `InkPresenter`. |
| `InkPresenter.GetHighContrastAdjustment` / `SetHighContrastAdjustment` methods | Replaced by the `InkPresenter.HighContrastAdjustment` property. |
| `InkStrokeInput.GetInkPresenter` / `InkUnprocessedInput.GetInkPresenter` methods | Replaced by an `InkPresenter` property on each class. |
| `InkToolbarEraserButton.SelectedEraser`, `IsStrokeEraserVisible`, `ArePrecisionErasersVisible`; `InkToolbar.EraserFlyoutItemClicked`; `InkToolbarEraserKind`, `InkToolbarEraserFlyoutItemKind`, `InkToolbarEraserFlyoutItemClickedEventArgs` | Removed. |
| Not available | `InkPresenter.ActivateCustomDrying` method and `InkSynchronizer` class added. |

- Stable-channel alternatives: [Win2D](https://github.com/Microsoft/Win2D) with manual pointer input handling, or a custom toolbar. See [Known control gaps](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/migrate-to-windows-app-sdk/what-is-supported#known-control-gaps).

## Related

- [Image](./image.md)

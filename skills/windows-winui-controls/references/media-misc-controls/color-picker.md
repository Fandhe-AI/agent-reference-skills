# ColorPicker

A control for browsing and selecting colors via a spectrum, sliders, or RGB/HSV/hex text input.

## Signature / Usage

```xaml
<ColorPicker x:Name="myColorPicker"
             ColorSpectrumShape="Ring"
             IsColorPreviewVisible="False"
             IsColorChannelTextInputVisible="False"
             IsHexInputVisible="False"/>
```

```xaml
<Rectangle Height="50" Width="50">
    <Rectangle.Fill>
        <SolidColorBrush Color="{x:Bind myColorPicker.Color, Mode=OneWay}"/>
    </Rectangle.Fill>
</Rectangle>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Color | Color | The currently selected color. |
| ColorChanged | event | Raised when `Color` changes. |
| ColorSpectrumShape | ColorSpectrumShape | `Box` (default, square) or `Ring` (circular). Square gives more precise selection; ring is more "casual". |
| IsAlphaEnabled | bool | Enables the opacity slider/textbox. Must be `true` for `IsAlphaSliderVisible`/`IsAlphaTextInputVisible` to take effect. |
| Orientation | Orientation | `Vertical` (default) or `Horizontal` layout of editing controls relative to the spectrum. |
| IsColorPreviewVisible / IsColorSliderVisible / IsColorChannelTextInputVisible / IsHexInputVisible | bool | Toggle visibility of individual UI sections to build simplified or precise pickers. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.ColorPicker` (WinUI 3). Distinct from other frameworks' color pickers (e.g. Ark UI / Chakra UI `ColorPicker`).
- When hosted in a `Flyout`, commit the color only on an explicit confirm action (or on flyout dismiss) rather than live-binding, unless the change is immediately visible on the affected object.
- `Orientation="Horizontal"` disables `IsMoreButtonVisible`.

## Related

- [Expander](./expander.md)

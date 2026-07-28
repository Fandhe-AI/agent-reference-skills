# Focus visuals and gamepad/D-pad focus navigation

Focusable custom controls must expose a clear visual focus indicator, and apps that support gamepad/remote input need explicit XY-focus navigation targets between UI elements.

## Signature / Usage

```xaml
<!-- Turn off system-drawn focus visuals so custom ones in the
     ControlTemplate are used instead -->
<Style TargetType="Button">
  <Setter Property="UseSystemFocusVisuals" Value="False"/>
  <Setter Property="Template">
    <Setter.Value>
      <ControlTemplate TargetType="Button">
        <Grid>
          <VisualStateManager.VisualStateGroups>
            <VisualStateGroup x:Name="FocusStates">
              <VisualState x:Name="Focused">
                <Storyboard>
                  <DoubleAnimation Storyboard.TargetName="FocusVisualWhite"
                                   Storyboard.TargetProperty="Opacity" To="1" Duration="0"/>
                  <DoubleAnimation Storyboard.TargetName="FocusVisualBlack"
                                   Storyboard.TargetProperty="Opacity" To="1" Duration="0"/>
                </Storyboard>
              </VisualState>
              <VisualState x:Name="Unfocused" />
              <VisualState x:Name="PointerFocused" />
            </VisualStateGroup>
          </VisualStateManager.VisualStateGroups>

          <Rectangle x:Name="FocusVisualWhite" IsHitTestVisible="False"
                     Stroke="{ThemeResource FocusVisualWhiteStrokeThemeBrush}"
                     StrokeEndLineCap="Square" StrokeDashArray="1,1" Opacity="0"/>
          <Rectangle x:Name="FocusVisualBlack" IsHitTestVisible="False"
                     Stroke="{ThemeResource FocusVisualBlackStrokeThemeBrush}"
                     StrokeEndLineCap="Square" StrokeDashArray="1,1" Opacity="0"/>
        </Grid>
      </ControlTemplate>
    </Setter.Value>
  </Setter>
</Style>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UIElement.UseSystemFocusVisuals` | `bool` | `true`: control uses focus visuals drawn by the system. `false`: uses focus visuals defined in the control's `ControlTemplate`'s `FocusStates` group. Default is `false`, but all built-in XAML framework controls set it to `true` in their default template. |
| `FrameworkElement.FocusVisualPrimaryBrush` | `Brush` | Brush for the outer border of a HighVisibility/Reveal focus visual. Typically solid black (paired with `FocusVisualSecondaryBrush`, typically solid white, for the inner border). |
| `UIElement.XYFocusUp` / `XYFocusDown` / `XYFocusLeft` / `XYFocusRight` | `DependencyObject` | Gets or sets the element that receives focus when the user presses the corresponding direction on a gamepad D-pad, overriding automatic spatial (XY) focus navigation. |

## Notes

- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.UIElement`, `Microsoft.UI.Xaml.FrameworkElement`). Legacy UWP exposes the equivalent members under `Windows.UI.Xaml.*`.
- When modifying a default `ControlTemplate`, set `UseSystemFocusVisuals` to `false` so your `FocusStates` visual states actually run; otherwise the system-drawn visual is used regardless of your template.
- A custom `FocusStates` `VisualStateGroup` needs exactly the three states `Focused`, `Unfocused`, `PointerFocused`; only `Focused` typically needs an explicit animation since VisualStateManager transitions within the same group cancel prior animations.
- `XYFocusUp/Down/Left/Right` are for gamepad/remote (D-pad) interaction scenarios specifically — they don't affect Tab-key order (`TabIndex`/`IsTabStop`).
- Built-in controls already provide theme-aware focus indicators (including in high-contrast themes); if you retemplate a control, preserve equivalent focus visibility.

## Related

- [Keyboard accessibility](./keyboard-accessibility.md)
- [Contrast themes](./high-contrast-themes.md)

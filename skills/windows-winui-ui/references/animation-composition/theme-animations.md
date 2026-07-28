# Theme Animations (PopInThemeAnimation, etc.)

Preconfigured, non-customizable animations that Windows apps use for common UI moments (control appearing, disappearing, popping in/out). Duration and easing are fixed by the system; you set only targeting and a small set of offsets.

## Signature / Usage

```csharp
public sealed class PopInThemeAnimation : Timeline
```

```xaml
<VisualState x:Name="Opened">
    <Storyboard>
        <PopInThemeAnimation
            FromVerticalOffset="{Binding TemplateSettings.FromVerticalOffset, RelativeSource={RelativeSource Mode=TemplatedParent}}"
            FromHorizontalOffset="{Binding TemplateSettings.FromHorizontalOffset, RelativeSource={RelativeSource Mode=TemplatedParent}}"
            TargetName="LayoutRoot"/>
    </Storyboard>
</VisualState>
<VisualState x:Name="Closed">
    <Storyboard>
        <PopOutThemeAnimation TargetName="LayoutRoot"/>
    </Storyboard>
</VisualState>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| TargetName | string | Reference name of the control element being targeted. |
| FromHorizontalOffset | double | Starting horizontal translation distance (`PopInThemeAnimation`). |
| FromVerticalOffset | double | Starting vertical translation distance (`PopInThemeAnimation`). |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- `Duration` inherited from `Timeline` has no effect — the animation's timing is preconfigured by the system.
- `PopInThemeAnimation` combines opacity and translation for overlay content (e.g. tooltips) as it appears; pair with `PopOutThemeAnimation` for the disappear case.
- Must be hosted inside a `Storyboard` (theme animations have no innate trigger); typically placed in a `VisualState.Storyboard` so it plays automatically on state change.
- Other common theme animations follow the same pattern: `FadeInThemeAnimation`, `FadeOutThemeAnimation`, `PointerDownThemeAnimation`, `PointerUpThemeAnimation`, `SplitOpenThemeAnimation`, `SplitCloseThemeAnimation` — all in `Microsoft.UI.Xaml.Media.Animation`.
- For "container animates its own layout on first appearance / add / delete / reposition", prefer the theme *transitions* (`EntranceThemeTransition`, `AddDeleteThemeTransition`, `RepositionThemeTransition`) instead, which are simpler to apply via `UIElement.Transitions`.

## Related

- [EntranceThemeTransition](./entrance-theme-transition.md)
- [Transitions Property](./transitions-property.md)
- [Storyboard](./storyboard.md)

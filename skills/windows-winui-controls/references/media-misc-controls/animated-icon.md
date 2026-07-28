# AnimatedIcon

An `IconElement` that plays a Lottie-based animated icon in response to user interaction and visual state changes (e.g. hover, press, selection).

## Signature / Usage

```xaml
<Button PointerEntered="Button_PointerEntered" PointerExited="Button_PointerExited">
    <AnimatedIcon x:Name='BackAnimatedIcon'>
        <AnimatedIcon.Source>
            <animatedvisuals:AnimatedBackVisualSource/>
        </AnimatedIcon.Source>
        <AnimatedIcon.FallbackIconSource>
            <SymbolIconSource Symbol='Back'/>
        </AnimatedIcon.FallbackIconSource>
    </AnimatedIcon>
</Button>
```

```csharp
private void Button_PointerEntered(object sender, PointerRoutedEventArgs e)
{
    AnimatedIcon.SetState(this.BackAnimatedIcon, "PointerOver");
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | IAnimatedVisualSource | A LottieGen-generated class providing the animation content. |
| State (attached, via `AnimatedIcon.SetState`) | string | Sets the visual state (e.g. `"Normal"`, `"PointerOver"`, `"Pressed"`) which maps to Lottie markers for playback position. |
| FallbackIconSource | IconSource | Icon shown when animations can't play (older Windows versions) or as the final-frame fallback when the user disables animations. |
| Foreground | Brush | Sets color if the Lottie animation defines a `"Foreground"` color property. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.AnimatedIcon` (WinUI 3). Distinct from Android `AnimatedVectorDrawable`/`AnimatedImageVector` and Apple `SF Symbols` animated variants.
- Use AnimatedIcon only for icons controlled by visual-state transitions (`IconElement`/`IconElementSource` slots such as `NavigationViewItem.Icon`); use AnimatedVisualPlayer for general-purpose, loop/one-shot/pausable animations that aren't tied to a state transition.
- Custom animations are authored in Adobe After Effects and converted with the `LottieGen` tool from the Lottie-Windows library.
- `NavigationViewItem` automatically drives common states (`Normal`, `PointerOver`, `Pressed`, `Selected`, `PressedSelected`, `PointerOverSelected`) on a nested `AnimatedIcon`.

## Related

- [AnimatedVisualPlayer](./animated-visual-player.md)

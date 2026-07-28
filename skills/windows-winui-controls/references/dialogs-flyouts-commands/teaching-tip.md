# TeachingTip

A semi-persistent, content-rich flyout used to inform, remind, or teach users about important or new features. Can target a specific UI element with a tail, or be shown without a target.

## Signature / Usage

```xaml
<Button x:Name="SaveButton" Content="Save">
    <Button.Resources>
        <TeachingTip x:Name="AutoSaveTip"
            Target="{x:Bind SaveButton}"
            Title="Saving automatically"
            Subtitle="We save your changes as you go - so you never have to."
            ActionButtonContent="Disable"
            ActionButtonCommand="{x:Bind DisableAutoSaveCommand}"
            CloseButtonContent="Got it!">
        </TeachingTip>
    </Button.Resources>
</Button>
```

```csharp
AutoSaveTip.IsOpen = true;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsOpen | bool | Shows/hides the teaching tip |
| Target | FrameworkElement | Element the tip's tail points to; omit for a non-targeted tip anchored to the XAML root edges |
| Title / Subtitle | string | Header text of the tip |
| Content | object | Body content shown below the title/subtitle (scrolls if it exceeds the tip's size) |
| PreferredPlacement | TeachingTipPlacementMode | Preferred position relative to the target (or XAML root for non-targeted tips), e.g. `Top`, `BottomLeft`, `Center`; falls back automatically if there's no room |
| PlacementMargin | Thickness | Distance between the tip and its target / the XAML root edges |
| TailVisibility | TeachingTipTailVisibility | Set to `Collapsed` to remove the tail while keeping target-relative placement |
| ActionButtonContent / ActionButtonCommand / ActionButtonCommandParameter | object / ICommand / object | Custom primary action button |
| CloseButtonContent | object | Custom close button content; moves the button to the bottom of the tip. Not shown when light-dismiss is enabled |
| IsLightDismissEnabled | bool | If `true`, dismisses on scroll/other interaction and hides the close button (default `false`) |
| HeroContent / HeroContentPlacement | object / TeachingTipHeroContentPlacementMode | Edge-to-edge content (e.g. an image) at the top or bottom of the tip |
| IconSource | IconSource | Icon shown beside the title/subtitle (recommended 16/24/32px) |
| ShouldConstrainToRootBounds | bool | If `false`, the tip can escape the XAML root/screen bounds and always uses `PreferredPlacement` |

## Events

| Name | Description |
|------|-------------|
| Closing | Occurs when the tip starts to close; supports `Cancel` and deferral to keep it open or delay closing |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` Popover/Tour primitives.
- Not guaranteed to be gamepad-accessible; test each configuration explicitly if the app supports gamepad input.
- Reserve for transient, non-critical guidance — not for errors or important status changes (use `ContentDialog` or `InfoBar` instead).

## Related

- [InfoBar](./info-bar.md)
- [Flyout](./flyout.md)
- [ContentDialog](./content-dialog.md)

# SwipeControl

A touch-gesture accelerator for context menus, wrapping content and exposing directional swipe commands (Reveal or Execute mode).

## Signature / Usage

```xaml
<SwipeControl HorizontalAlignment="Center" VerticalAlignment="Center">
    <SwipeControl.LeftItems>
        <SwipeItems>
            <SwipeItem Text="Pin">
                <SwipeItem.IconSource>
                    <SymbolIconSource Symbol="Pin"/>
                </SwipeItem.IconSource>
            </SwipeItem>
        </SwipeItems>
    </SwipeControl.LeftItems>

    <Border Width="180" Height="44" BorderBrush="Black" BorderThickness="2">
        <TextBlock Text="Swipe to Pin" Margin="4,8,0,0"/>
    </Border>
</SwipeControl>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| LeftItems / RightItems / TopItems / BottomItems | SwipeItems | Directional containers of `SwipeItem` commands; only one instance per direction per control. |
| SwipeItems.Mode | SwipeMode | `Reveal` (menu stays open until a command is tapped) or `Execute` (swipe past a threshold to execute a single command immediately). |
| SwipeItem.Invoked | event | Raised when a swipe command is selected/executed. |
| SwipeItem.BehaviorOnInvoked | SwipeBehaviorOnInvoked | `Auto` (default), `Close`, or `RemainOpen` — controls whether the swipe control collapses after invocation. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.SwipeControl` / `SwipeItem` (WinUI 3). Distinct from Ark UI/Chakra UI gesture primitives and Android `SwipeToDismissBox`.
- Typically placed inside a `ListView` `DataTemplate` for per-item swipe actions.
- Don't combine swipe with `FlipView`/`Hub` or with navigation in the same direction as the swipe.

## Related

- [RefreshContainer](./refresh-container.md)

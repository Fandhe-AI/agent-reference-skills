# RefreshContainer

A `ContentControl` that wraps scrollable content (e.g. `ListView`, `ScrollViewer`) and implements pull-to-refresh via touch, backed by a `RefreshVisualizer`.

## Signature / Usage

```xaml
<RefreshContainer x:Name="RefreshContainer">
    <ListView x:Name="ListView1" Height="400">
        <!-- items -->
    </ListView>
</RefreshContainer>
```

```csharp
RefreshContainer.RefreshRequested += RefreshContainer_RefreshRequested;

private async void RefreshContainer_RefreshRequested(RefreshContainer sender, RefreshRequestedEventArgs args)
{
    using (var deferral = args.GetDeferral())
    {
        await FetchAndInsertItemsAsync(3);
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Visualizer | RefreshVisualizer | The visual spinner shown during pull/refresh; has `State` (`Idle`, `Interacting`, `Pending`, `Refreshing`, `Peeking`). |
| PullDirection | RefreshPullDirection | `TopToBottom` (default), `BottomToTop`, `RightToLeft`, or `LeftToRight`. |
| RefreshRequested | event | Raised when a refresh is triggered (by pull or by calling `RequestRefresh()`); use `args.GetDeferral()` to signal async completion. |
| RequestRefresh() | method | Programmatically starts a refresh (e.g. from a button click), transitioning the visualizer directly from `Idle` to `Refreshing`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.RefreshContainer` / `RefreshVisualizer` (WinUI 3). Distinct from Android `SwipeRefreshLayout` and pull-to-refresh implementations in other frameworks.
- `RefreshContainer` handles touch only; provide a non-touch affordance (e.g. a refresh button calling `RequestRefresh()`) for mouse/keyboard users.
- The `Content` of a `RefreshContainer` must be a scrollable control (`ScrollViewer`, `ListView`, `GridView`, etc.); setting it to a non-scrollable panel like `Grid` results in undefined behavior.

## Related

- [SwipeControl](./swipe-control.md)

# Focus manager (FocusManager, FocusState, GotFocus / LostFocus)

`FocusManager` provides static methods for programmatic focus navigation; `UIElement` exposes `GotFocus`/`LostFocus`/`GettingFocus`/`LosingFocus` routed events and the `FocusState` enum describes how an element was focused.

## Signature / Usage

```csharp
private void OnKeyDown(object sender, KeyRoutedEventArgs e)
{
    DependencyObject candidate = null;
    var options = new FindNextElementOptions { SearchRoot = TicTacToeGrid };

    switch (e.Key)
    {
        case Windows.System.VirtualKey.Down:
            candidate = FocusManager.FindNextElement(FocusNavigationDirection.Down, options);
            break;
    }
    if (candidate is Control control)
    {
        control.Focus(FocusState.Keyboard);
    }
}
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `FocusManager.TryMoveFocus(FocusNavigationDirection)` | `bool` | Moves focus from the currently focused element to the next focusable element in a direction. |
| `FocusManager.FindNextElement(FocusNavigationDirection, FindNextElementOptions)` | `DependencyObject` | Retrieves (without moving to) the element that would receive focus in a direction. |
| `FocusManager.FindFirstFocusableElement(DependencyObject)` / `FindLastFocusableElement(DependencyObject)` | `DependencyObject` | Finds the first/last focusable element within a scope (null scope = current window). |
| `FindNextElementOptions.SearchRoot` | `DependencyObject` | Restricts candidate search to a subtree. |
| `FindNextElementOptions.ExclusionRect` / `HintRect` | `Rect` | Fictitious rectangles used only for candidate calculation, never rendered. |
| `FindNextElementOptions.XYFocusNavigationStrategyOverride` | `XYFocusNavigationStrategyOverride` | Overrides the navigation strategy for this call. |
| `Control.Focus(FocusState)` | `bool` | Programmatically sets focus with an explicit `FocusState`. |
| `FocusState` | enum | `Unfocused`, `Pointer`, `Keyboard`, `Programmatic`. |
| `UIElement.GotFocus` / `LostFocus` | event | Bubbling, asynchronous; fired after focus has moved. |
| `UIElement.GettingFocus` / `LosingFocus` | event | Bubbling, synchronous; fired before focus moves, target can be redirected via `args.TryRedirect(...)` or canceled via `args.TryCancel()`. |
| `UIElement.NoFocusCandidateFound` | event | Fired when Tab/arrow navigation finds no candidate in the requested direction (not fired for `TryMoveFocus`). |

## Notes

- Namespace: `Microsoft.UI.Xaml.Input` (`FocusManager`, `FindNextElementOptions`, `FocusNavigationDirection`); `FocusState` is `Microsoft.UI.Xaml`.
- Event order on a focus change: `LosingFocus` → `GettingFocus` → `LostFocus` → `GotFocus`.
- Calling `TryMoveFocus`/`Control.Focus` while `GettingFocus`/`LosingFocus` is bubbling throws (reentrancy guard).
- Initial focus for a page/app goes to the element with the highest `TabIndex` that can receive focus.

## Related

- [XY focus navigation](./xy-focus.md)
- [Tab navigation](./tab-navigation.md)
- [Keyboard input](./keyboard-input.md)

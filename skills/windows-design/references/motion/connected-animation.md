# Connected Animation

Connected animations create a dynamic, compelling navigation experience by animating the transition of an element between two different views. An element appears to "continue" between views during a content change, flying across the screen from its source location to its destination, emphasizing the shared content and creating continuity across the transition.

## Signature / Usage

```csharp
// Source page: prepare the animation before navigating away
ConnectedAnimationService.GetForCurrentView()
    .PrepareToAnimate("forwardAnimation", SourceImage);

// Destination page: start the animation
ConnectedAnimation animation =
    ConnectedAnimationService.GetForCurrentView().GetAnimation("forwardAnimation");
if (animation != null)
{
    animation.TryStart(DestinationImage);
}
```

## Options / Props

| Configuration | Direction | Behavior | Respects DefaultDuration / DefaultEasingFunction |
|---|---|---|---|
| `GravityConnectedAnimationConfiguration` | Forward (default) | Element "pulls off the page," moves forward in z-space, dips from gravity, then accelerates into position ("scale and dip"). | Yes / Yes (gravity dip uses its own easing) |
| `DirectConnectedAnimationConfiguration` | Backward | Element linearly translates using a decelerate cubic-bezier easing, returning the user to the previous state as fast as possible. | No — animates over 150ms with the Decelerate easing function |
| `BasicConnectedAnimationConfiguration` | Either | Default (and only) animation prior to Windows 10 version 1809 (SDK 17763). | Yes / Yes |

### When to use connected animation

Use connected animation when changing pages and there's an image or other piece of shared UI between the source and destination views — generally preferred over a drill-in navigation transition in that case.

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3) — `ConnectedAnimation` / `ConnectedAnimationService` classes.
- Use `SuppressNavigationTransitionInfo` on the `Frame` when using `ConnectedAnimationService`, since connected animations aren't meant to run simultaneously with default navigation transitions.
- Don't wait on network requests or other long-running async operations between preparing and starting an animation. Between preparation and start, the source element appears frozen above other UI, so don't wait more than ~250ms or the animation may look distracting; if not started within 3 seconds, the system disposes it and `TryStart` fails.
- `ListView` / `GridView` provide `PrepareConnectedAnimation` and `TryStartConnectedAnimationAsync` to simplify connected animations to/from list and grid items.
- A *coordinated animation* is a special entrance animation where an additional element (e.g. a caption) animates in tandem with the connected animation target — use the two-parameter overload of `TryStart` with an array of coordinated `UIElement`s.
- Recommended: `GravityConnectedAnimationConfiguration` for forward navigation, `DirectConnectedAnimationConfiguration` for back navigation.

## Related

- [Directionality and Gravity](./directionality-and-gravity.md)
- [Page Transitions](./page-transitions.md)
- [Motion Overview](./motion-overview.md)

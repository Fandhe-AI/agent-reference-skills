# ConnectedAnimationService / ConnectedAnimation

Creates a dynamic navigation experience by animating the transition of a shared element between two different views (e.g. an image flying from a list item to a detail page header), maintaining user context across navigation.

## Signature / Usage

```csharp
// Source page: prepare the animation before navigating away.
protected override void OnNavigatingFrom(NavigatingCancelEventArgs e)
{
    ConnectedAnimationService.GetForCurrentView()
        .PrepareToAnimate("forwardAnimation", SourceImage);
}
```

```csharp
// Destination page: start the animation targeting the new element.
protected override void OnNavigatedTo(NavigationEventArgs e)
{
    base.OnNavigatedTo(e);
    ConnectedAnimation animation =
        ConnectedAnimationService.GetForCurrentView().GetAnimation("forwardAnimation");
    if (animation != null)
    {
        animation.TryStart(DestinationImage);
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ConnectedAnimationService.GetForCurrentView()` | static method | Gets the service instance for the current view. |
| `PrepareToAnimate(string key, UIElement source)` | method | Registers the source element under `key` for a later animation. |
| `GetAnimation(string key)` | method | Retrieves a previously prepared `ConnectedAnimation` by key. |
| `ConnectedAnimation.TryStart(UIElement destination)` / `TryStart(UIElement destination, UIElement[] coordinatedElements)` | method | Starts the animation to the destination element; second overload adds coordinated ("swoop in tandem") elements. |
| `ConnectedAnimation.Configuration` | `GravityConnectedAnimationConfiguration` \| `DirectConnectedAnimationConfiguration` \| `BasicConnectedAnimationConfiguration` | Animation style: gravity (default, recommended for forward nav), direct (recommended for back nav), or basic (legacy). |
| `ConnectedAnimationService.DefaultDuration` / `DefaultEasingFunction` | `TimeSpan` / `EasingFunctionBase` | Defaults applied to prepared animations (respected differently per `Configuration`). |
| `ListViewBase.PrepareConnectedAnimation(key, item, elementName)` / `TryStartConnectedAnimationAsync(animation, item, elementName)` | methods | Simplify preparing/starting connected animations for `ListView`/`GridView` items. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3) — `ConnectedAnimation`, `ConnectedAnimationService`.
- Setup is two-step: **prepare** the animation on the source page (registers the source element under a unique string key), then **start** it on the destination page by retrieving the animation via the same key and calling `TryStart`.
- Don't wait more than ~250 ms between prepare and start — the source element appears frozen above other UI in the meantime. If not started within 3 seconds, the system disposes the animation and subsequent `TryStart` calls fail.
- Use `SuppressNavigationTransitionInfo` on `Frame.Navigate` to prevent the default navigation transition from conflicting with the connected animation.
- A *coordinated animation* is an additional element that enters in tandem with the connected element, passed via the two-parameter `TryStart` overload.
- Recommended: `GravityConnectedAnimationConfiguration` for forward navigation, `DirectConnectedAnimationConfiguration` for back navigation.

## Related

- [Storyboard](./storyboard.md)
- [EntranceThemeTransition](./entrance-theme-transition.md)

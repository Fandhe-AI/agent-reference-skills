# Page Transitions

Page transitions navigate users between pages in an app, providing feedback about the relationship between pages — whether they're at the top of a navigation hierarchy, moving between sibling pages, or navigating deeper into the hierarchy. Transitions are represented by subclasses of `NavigationTransitionInfo`.

## Signature / Usage

```csharp
// Page refresh: user is taken to the top of a navigational stack (e.g. tabs, left-nav items)
myFrame.Navigate(typeof(Page2), null, new EntranceNavigationTransitionInfo());

// Drill: user navigates deeper into the app
myFrame.Navigate(typeof(Page2), null, new DrillInNavigationTransitionInfo());

// Horizontal slide: sibling pages appear next to each other
myFrame.Navigate(typeof(RightPage), null, new SlideNavigationTransitionInfo() { Effect = SlideNavigationTransitionEffect.FromRight });

// Suppress: no animation during navigation
myFrame.Navigate(typeof(Page2), null, new SuppressNavigationTransitionInfo());
```

## Options / Props

| Transition type | Use When | Desired Feeling |
|---|---|---|
| Page refresh (`EntranceNavigationTransitionInfo`) | User is taken to the top of a navigational stack, e.g. navigating between tabs or left-nav items. Combination of slide-up and fade-in for incoming content. | The user has started over. |
| Drill (`DrillInNavigationTransitionInfo`) | User navigates deeper into an app, e.g. displaying more information after selecting an item. | The user has gone deeper into the app. |
| Horizontal slide (`SlideNavigationTransitionInfo`) | Sibling pages appear next to each other; `NavigationView` uses this automatically for top nav. | The user is navigating between pages that are next to each other. |
| Suppress (`SuppressNavigationTransitionInfo`) | Avoid playing any animation during navigation, typically because a custom transition (such as Connected Animation) is used instead. | N/A |

## Notes

- A `Frame` automatically uses `NavigationThemeTransition` to animate navigation between two pages; by default the animation is page refresh.
- Use `Frame.GoBack(NavigationTransitionInfo)` to play a specific transition when navigating backwards, e.g. in a responsive list/detail scenario.
- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3). Distinct from React Router / react-router-v7 page transitions and other framework-level "page transition" concepts.

## Related

- [Directionality and Gravity](./directionality-and-gravity.md)
- [Connected Animation](./connected-animation.md)
- [Motion Overview](./motion-overview.md)

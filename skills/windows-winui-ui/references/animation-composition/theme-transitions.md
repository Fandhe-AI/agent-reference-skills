# Theme Transitions (ContentThemeTransition, PopupThemeTransition, PaneThemeTransition, ReorderThemeTransition, EdgeUIThemeTransition, NavigationThemeTransition)

Preconfigured `Transition` subclasses (sealed, `Microsoft.UI.Xaml.Media.Animation`) that cover the remaining common UI moments not already given their own page: content swap, popup appearance, pane slide-in, list reorder, edge UI, and page navigation.

## Signature / Usage

```csharp
public sealed class ContentThemeTransition : Transition
public sealed class PopupThemeTransition : Transition
public sealed class PaneThemeTransition : Transition
public sealed class ReorderThemeTransition : Transition
public sealed class EdgeUIThemeTransition : Transition
public sealed class NavigationThemeTransition : Transition
```

```xaml
<!-- ContentThemeTransition: runs when the ContentControl's content changes. -->
<ContentControl>
    <ContentControl.ContentTransitions>
        <TransitionCollection>
            <ContentThemeTransition/>
        </TransitionCollection>
    </ContentControl.ContentTransitions>
</ContentControl>

<!-- NavigationThemeTransition: runs on Frame navigation. -->
<Frame>
    <Frame.ContentTransitions>
        <TransitionCollection>
            <NavigationThemeTransition/>
        </TransitionCollection>
    </Frame.ContentTransitions>
</Frame>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ContentThemeTransition.HorizontalOffset | double | Distance the target is translated horizontally when the transition is active. |
| ContentThemeTransition.VerticalOffset | double | Distance the target is translated vertically when the transition is active. |
| PopupThemeTransition.FromHorizontalOffset | double | Starting horizontal translation distance for pop-in content (e.g. tooltip-like UI) as it appears. |
| PopupThemeTransition.FromVerticalOffset | double | Starting vertical translation distance for pop-in content as it appears. |
| PaneThemeTransition.Edge | `EdgeTransitionLocation` | Edge the pane slides in from (`Left`/`Top`/`Right`/`Bottom`); default `Left`. |
| EdgeUIThemeTransition.Edge | `EdgeTransitionLocation` | Edge the edge UI slides in from; default `Top`. |
| NavigationThemeTransition.DefaultNavigationTransitionInfo | `NavigationTransitionInfo` | Transition used for `Frame` navigation by default (e.g. `EntranceNavigationTransitionInfo`, `DrillInNavigationTransitionInfo`, `SuppressNavigationTransitionInfo`). |
| ReorderThemeTransition | — | No settable properties beyond those inherited from `DependencyObject`; adding an instance to a `ChildrenTransitions` collection is enough to enable the reorder animation. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3). All six inherit from `Transition`; `Duration` (inherited from `Timeline`) has no effect since timing is preconfigured by the system, same as the other theme transitions/animations.
- **ContentThemeTransition**: apply via `ContentControl.ContentTransitions`; often combined with `AddDeleteThemeTransition` when content is added/removed rather than just swapped.
- **PopupThemeTransition**: for pop-in components of controls (e.g. tooltip-like UI) as they appear; conceptually the transition counterpart of `PopInThemeAnimation`/`PopOutThemeAnimation`.
- **PaneThemeTransition** vs **EdgeUIThemeTransition**: both slide UI in from an edge via the same `Edge` property, but choose by distance — use `EdgeUIThemeTransition` for a message/error bar that doesn't extend far into the screen, and `PaneThemeTransition` for UI that slides a significant distance in (task pane, custom soft keyboard).
- **EdgeUIThemeTransition**: prefer adding an `AppBar` via `Page.BottomAppBar`/`Page.TopAppBar`, which applies the appropriate transition and interaction behavior automatically instead of using this transition directly.
- **ReorderThemeTransition**: apply to a panel's `ChildrenTransitions` (e.g. `WrapGrid.ChildrenTransitions`) so items already in the panel animate around an item that is inserted/moved, typically via drag-drop or `Items.Insert`.
- **NavigationThemeTransition**: since Windows 10 version 1803, a `Frame` uses this by default to animate between `Page`s. Add it to the `Frame.ContentTransitions` collection (recommended) or a `Page.Transitions` collection. Its `DefaultNavigationTransitionInfo` selects the per-navigation animation; override per-call via the 3-parameter `Frame.Navigate` overload, or pass `SuppressNavigationTransitionInfo` to skip animation entirely.

## Related

- [EntranceThemeTransition](./entrance-theme-transition.md)
- [AddDeleteThemeTransition](./add-delete-theme-transition.md)
- [RepositionThemeTransition](./reposition-theme-transition.md)
- [Transitions Property](./transitions-property.md)
- [Theme Animations](./theme-animations.md)

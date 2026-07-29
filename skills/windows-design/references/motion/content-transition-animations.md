# Content Transition Animations

Content transition animations change the content of an area of the screen while keeping the container or background constant: new content fades in, and if there is existing content being replaced, that content fades out. Represented by the `ContentThemeTransition` class.

## Signature / Usage

```xaml
<!-- The ContentThemeTransition plays whenever the ContentControl's content changes. -->
<ContentControl x:Name="ContentHost">
    <ContentControl.ContentTransitions>
        <TransitionCollection>
            <ContentThemeTransition/>
        </TransitionCollection>
    </ContentControl.ContentTransitions>
</ContentControl>
```

```csharp
// Assigning new content automatically triggers the ContentThemeTransition.
ContentHost.Content = new Rectangle { Height = 200, Width = 200, Fill = new SolidColorBrush(Colors.Orange) };
```

## Options / Props

| Name | Type | Description |
|---|---|---|
| HorizontalOffset | double | Distance the incoming content is translated horizontally while the transition is active. |
| VerticalOffset | double | Distance the incoming content is translated vertically while the transition is active. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3; UWP namespace `Windows.UI.Xaml.Media.Animation`). Set via a target's `ContentTransitions` collection (e.g. `ContentControl.ContentTransitions`); setting `Duration` on it has no effect since timing is preconfigured by the system.
- May be applied in addition to `AddDeleteThemeTransition` on the same container.
- Distinct from page transitions (`page-transitions.md`, whole-page navigation), connected animation (`connected-animation.md`, a shared element flying between two views), and implicit animations (`implicit-animations.md`, tweening a property change) — content transitions are specifically for swapping a container's content in place.
- The `ContentThemeTransition` class itself, plus sibling transition classes (`EntranceThemeTransition`, `AddDeleteThemeTransition`) and the `Transitions` property, are covered as API reference in the windows-winui-ui skill; this page covers the motion-design guidance (when/how to use it).
- Do's and don'ts:
  - Use an entrance animation when there is a set of new items to bring into an empty container (e.g. late-loaded content after initial app load).
  - Use content transitions to replace one set of content with another set of content that already resides in the same container within a view.
  - When bringing in new content, slide it up (bottom to top) into view, against the general page flow / reading order.
  - Introduce new content in a logical order — introduce the most important piece of content last.
  - If more than one container's content is updating, trigger all of the transition animations simultaneously, without staggering or delay.
  - Don't use content transition animations when the entire page is changing — use page transition animations instead.
  - Don't use content transition animations if the content is only refreshing (not moving/replacing) — use fade animations for refreshes.

## Related

- [Page Transitions](./page-transitions.md)
- [Connected Animation](./connected-animation.md)
- [Implicit Animations](./implicit-animations.md)

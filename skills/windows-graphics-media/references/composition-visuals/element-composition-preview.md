# ElementCompositionPreview

Enables access to composition `Visual` objects that back XAML elements in the XAML composition tree, bridging the XAML element tree and the `Microsoft.UI.Composition` visual tree.

## Signature / Usage

```csharp
Compositor compositor = ElementCompositionPreview.GetElementVisual(RootGrid).Compositor;

SpriteVisual overlay = compositor.CreateSpriteVisual();
overlay.Size = new Vector2(200, 100);
overlay.Brush = compositor.CreateColorBrush(Colors.Red);

ElementCompositionPreview.SetElementChildVisual(RootGrid, overlay);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| GetElementVisual(UIElement) | static method | Retrieves the `Visual` that backs a XAML element in the composition tree. |
| SetElementChildVisual(UIElement, Visual) | static method | Sets a custom `Visual` as the last child of the element's visual tree (e.g. to draw custom effects behind/above the element). |
| GetElementChildVisual(UIElement) | static method | Retrieves a `Visual` previously set by `SetElementChildVisual`. |
| GetScrollViewerManipulationPropertySet(ScrollViewer) | static method | Retrieves the composition `CompositionPropertySet` tracking a `ScrollViewer`'s manipulation (scroll/zoom) values, for use in expression animations. |
| GetPointerPositionPropertySet(UIElement) | static method | Retrieves the pointer position relative to a `UIElement` as a `CompositionPropertySet`. |
| SetIsTranslationEnabled(UIElement, Boolean) | static method | Enables a render-time post-layout translation transform for positioning XAML elements with Composition APIs. |
| SetImplicitShowAnimation / SetImplicitHideAnimation(UIElement, ICompositionAnimationBase) | static method | Associates a show/hide animation with a `UIElement`'s visibility transitions. |

## Notes

- Namespace: `Microsoft.UI.Xaml.Hosting` (Windows App SDK / WinUI 3). The UWP equivalent is `Windows.UI.Xaml.Hosting.ElementCompositionPreview`.
- `GetElementVisual` is the standard entry point for obtaining a `Compositor` instance in a XAML app (`ElementCompositionPreview.GetElementVisual(element).Compositor`).

## Related

- [Compositor](./compositor.md)
- [Visual](./visual.md)
- [SpriteVisual](./sprite-visual.md)

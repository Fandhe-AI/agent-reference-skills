# CompositionEffectBrush

Paints a [SpriteVisual](./sprite-visual.md) with the output of a filter effect graph. The effect graph is described using the Win2D `Microsoft.Graphics.Canvas.Effects` types (e.g. `GaussianBlurEffect`, `ColorSourceEffect`) and compiled by `CompositionEffectFactory`.

## Signature / Usage

```csharp
GaussianBlurEffect blurEffect = new GaussianBlurEffect
{
    Name = "Blur",
    BlurAmount = 1.0f,
    BorderMode = EffectBorderMode.Hard,
    Optimization = EffectOptimization.Balanced,
    Source = new CompositionEffectSourceParameter("source")
};

CompositionEffectFactory blurEffectFactory = compositor.CreateEffectFactory(blurEffect);
CompositionEffectBrush blurBrush = blurEffectFactory.CreateBrush();

CompositionBackdropBrush backdropBrush = compositor.CreateBackdropBrush();
blurBrush.SetSourceParameter("source", backdropBrush);

SpriteVisual blurSprite = compositor.CreateSpriteVisual();
blurSprite.Brush = blurBrush;

ElementCompositionPreview.SetElementChildVisual(blurArea, blurSprite);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| GetSourceParameter(String) | method | Retrieves the `CompositionBrush` bound to a named `CompositionEffectSourceParameter`. |
| SetSourceParameter(String, CompositionBrush) | method | Binds an effect source parameter name (declared via `CompositionEffectSourceParameter`) to a source brush or another effect brush (for chaining). |
| Properties | [CompositionPropertySet](./composition-property-set.md), inherited | Allows getting/animating effect properties declared as animatable, addressed as `"EffectName.PropertyName"`. |

## Notes

- Namespace: `Microsoft.UI.Composition` (Windows App SDK / WinUI 3). Effect descriptions come from the Win2D `Microsoft.Graphics.Canvas.Effects` namespace, not `Windows.UI.Composition.Effects` directly — effects marked `[NoComposition]` in the Win2D reference are unsupported here.
- Creation flow: build an effect description (optionally chaining multiple effects) → `Compositor.CreateEffectFactory(effect)` → `CompositionEffectFactory.CreateBrush()` → `SetSourceParameter` for each `CompositionEffectSourceParameter` → assign to a `SpriteVisual.Brush`.
- Common effect sources are `CompositionBackdropBrush` (blurs/tints whatever is rendered behind the visual) or a [CompositionSurfaceBrush](./composition-surface-brush.md) (blurs/filters a loaded image).
- Effects are compiled to built-in shaders by the system; custom pixel shaders cannot be supplied.
- Distinct from three.js post-processing `EffectComposer`/passes and CSS/Compose blur filters — this is the WinRT composition effect-brush pipeline (Win2D effect graph).

## Related

- [SpriteVisual](./sprite-visual.md)
- [Compositor](./compositor.md)
- [CompositionSurfaceBrush](./composition-surface-brush.md)

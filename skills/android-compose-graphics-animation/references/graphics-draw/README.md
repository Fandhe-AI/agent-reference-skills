# graphics-draw

| Name | Description | Path |
|------|-------------|------|
| Canvas | Composable area for freeform DrawScope drawing. | [canvas.md](./canvas.md) |
| DrawScope | Scoped drawing environment: drawRect/drawCircle/drawLine/drawPath/drawArc/drawImage/drawText and transforms. | [draw-scope.md](./draw-scope.md) |
| Modifier.drawBehind | Draws a DrawScope behind the composable's content. | [modifier-draw-behind.md](./modifier-draw-behind.md) |
| Modifier.drawWithContent | Draws with explicit control over when content() is drawn relative to custom drawing. | [modifier-draw-with-content.md](./modifier-draw-with-content.md) |
| Modifier.drawWithCache | Caches drawing objects (Brush, Path, Shader) across size/state-stable recompositions. | [modifier-draw-with-cache.md](./modifier-draw-with-cache.md) |
| Modifier.graphicsLayer | Separate draw layer for scale/rotation/translation/alpha/clip/shadow/renderEffect/compositing. | [modifier-graphics-layer.md](./modifier-graphics-layer.md) |
| Modifier.clip | Clips content to a Shape. | [modifier-clip.md](./modifier-clip.md) |
| Modifier.shadow | Draws an elevation-based shadow using a Shape outline. | [modifier-shadow.md](./modifier-shadow.md) |
| Modifier.alpha | Draws content with reduced opacity. | [modifier-alpha.md](./modifier-alpha.md) |
| Modifier.blur | Draws content blurred by a given radius (API 31+). | [modifier-blur.md](./modifier-blur.md) |
| Shape | Outline provider interface plus RoundedCornerShape / CircleShape / CutCornerShape / GenericShape. | [shape.md](./shape.md) |
| Brush | Paint source for solid colors, linear/radial/sweep gradients, and custom ShaderBrush. | [brush.md](./brush.md) |
| Path | Mutable geometric path and PathEffect (dash, corner, chain, stamp). | [path.md](./path.md) |
| Color | Value class encoding color components and color space. | [color.md](./color.md) |
| BlendMode | Compositing mode for blending source and destination pixels. | [blend-mode.md](./blend-mode.md) |
| RenderEffect | Post-draw visual effect (BlurEffect, OffsetEffect) applied to a graphicsLayer. | [render-effect.md](./render-effect.md) |

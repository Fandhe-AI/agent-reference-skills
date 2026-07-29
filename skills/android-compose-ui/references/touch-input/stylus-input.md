# Stylus input & Ink API

Stylus-specific pointer data (pressure, tilt, orientation, hover distance, palm rejection) and the `androidx.ink` Ink API for low-latency stroke rendering, brushes, and geometry — built for note-taking/drawing apps. A dedicated hardware-input layer, separate from the generic gesture detectors (`pointerInput`, `detectDragGestures`) used for touch/mouse.

## Signature / Usage

```kotlin
// Reading stylus axis data (pressure, tilt, orientation, hover, tool type)
@Composable
fun DrawArea(modifier: Modifier = Modifier) {
    Canvas(
        modifier = modifier
            .clipToBounds()
            .pointerInteropFilter { event ->
                val pointerIndex = event.actionIndex
                val pressure = event.getAxisValue(MotionEvent.AXIS_PRESSURE, pointerIndex)
                val tilt = event.getAxisValue(MotionEvent.AXIS_TILT, pointerIndex)
                val orientation = event.getAxisValue(MotionEvent.AXIS_ORIENTATION, pointerIndex)
                val isStylus = event.getToolType(pointerIndex) == MotionEvent.TOOL_TYPE_STYLUS
                true
            }
    ) { /* draw */ }
}
```

```kotlin
// Ink API: define a brush, render live ("wet") strokes, then draw finished ("dry") ones
val brush = Brush.createWithColorIntArgb(
    family = StockBrushes.pressurePen(),
    colorIntArgb = android.graphics.Color.BLACK,
    size = 5F,
    epsilon = 0.1F,
)
var finishedStrokes by remember { mutableStateOf(emptyList<Stroke>()) }
val renderer = remember { CanvasStrokeRenderer.create() }

Box(modifier = Modifier.fillMaxSize()) {
    Canvas(modifier = Modifier.fillMaxSize()) {
        drawIntoCanvas { canvas ->
            finishedStrokes.forEach { stroke ->
                renderer.draw(canvas.nativeCanvas, stroke, android.graphics.Matrix())
            }
        }
    }
    InProgressStrokes(
        defaultBrush = brush,
        onStrokesFinished = { newStrokes -> finishedStrokes = finishedStrokes + newStrokes },
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `MotionEvent.AXIS_PRESSURE` | axis constant | — | `0` (no pressure) upward; read via `getAxisValue`/`getPressure()`. |
| `MotionEvent.AXIS_TILT` | axis constant | — | `0` (perpendicular) to `π/2` (flat on surface). |
| `MotionEvent.AXIS_ORIENTATION` | axis constant | — | `0` to `±π` radians, stylus barrel rotation. |
| `MotionEvent.AXIS_DISTANCE` | axis constant | — | Hover distance; `0.0` at contact. |
| `MotionEvent.getToolType(index)` | `Int` | — | Compare to `TOOL_TYPE_STYLUS` / `TOOL_TYPE_ERASER` to detect stylus/eraser input. |
| `Brush.createWithColorIntArgb` | `(family: BrushFamily, colorIntArgb: Int, size: Float, epsilon: Float) -> Brush` | — | Creates an `androidx.ink.brush.Brush`; a `createWithColorLong` overload takes a wide-gamut `ColorLong` instead. `epsilon` is the smallest visually distinct distance (~0.1 for on-screen px at default zoom). |
| `StockBrushes` | object | — | Built-in `BrushFamily` factories: `marker()`, `pressurePen()`, `highlighter(selfOverlap, version)`, `dashedLine()`, `emojiHighlighter(...)`. |
| `InProgressStrokes` | `@Composable` | — | Renders the "wet" (in-progress) ink layer; key params `defaultBrush: Brush?`, `nextBrush: () -> Brush?`, `onStrokesFinished: (List<Stroke>) -> Unit`. |
| `CanvasStrokeRenderer` | interface | — | `.create()` then `.draw(canvas: android.graphics.Canvas, stroke: Stroke, strokeToScreenTransform: android.graphics.Matrix)` to render finished ("dry") strokes. |

## Notes

- `PointerInputChange` (the type Compose's own `pointerInput`/`detectDragGestures` gesture detectors deliver) already exposes `pressure: Float` and `type: PointerType` (`PointerType.Stylus`/`PointerType.Eraser`), so basic pressure reading and stylus/eraser detection do not require dropping to `MotionEvent`. Tilt, orientation, and hover distance have no `PointerInputChange` field, so those still require the platform `MotionEvent`, accessed in Compose via `Modifier.pointerInteropFilter`; avoid heap allocation in that callback since it fires on every move.
- Palm rejection: an unintended pointer arrives as `MotionEvent.ACTION_CANCEL`; on API 33+, check `event.flags and MotionEvent.FLAG_CANCELED` to undo the stroke drawn since the corresponding `ACTION_DOWN`.
- Low-latency rendering additionally pulls in `androidx.graphics:graphics-core` (Jetpack low-latency graphics) and `androidx.input:input-motionprediction` (motion prediction) as separate Gradle dependencies.
- `CanvasStrokeRenderer.draw` takes `android.graphics.Canvas`/`android.graphics.Matrix`, not Compose's `DrawScope`/`androidx.compose.ui.graphics.Matrix` — reach the native canvas from a Compose `Canvas` via `drawIntoCanvas { canvas -> ... canvas.nativeCanvas ... }`. `InProgressStrokes`, by contrast, takes Compose `androidx.compose.ui.graphics.Matrix` for its own `pointerEventToWorldTransform`/`strokeToWorldTransform` params — the two Matrix types are not interchangeable.
- The Ink API modules (`androidx.ink:ink-brush`, `ink-strokes`, `ink-authoring`, `ink-authoring-compose`, `ink-rendering`, `ink-geometry`) reached stable `1.0.0` on December 17, 2025 (after `beta01`/`beta02`/`rc01`); the official setup guide pins `ink_version = "1.0.0"`. Development has since moved to the `1.1.0-alpha` line — check the [release notes](https://developer.android.com/jetpack/androidx/releases/ink) before relying on APIs beyond what is documented here.
- The Ink API's `Brush` (`androidx.ink.brush.Brush`, stroke pen definition with `size`/`epsilon`/`family`) is a different type from Compose's `androidx.compose.ui.graphics.Brush` (gradient/paint source for `drawBehind`/`background`, covered in android-compose-graphics-animation) — same class name, unrelated API.
- Official docs group this under a multi-page "Ink API" sub-section (setup, module selection, brush APIs, draw-stroke, geometry APIs, state preservation, coordinate system) — this page distills the core reading/rendering path; consult `about-ink-api` on developer.android.com for the full walkthrough.
- Package: `androidx.compose.ui.input.pointer` (`pointerInteropFilter`); `androidx.ink.brush` (`Brush`, `StockBrushes`); `androidx.ink.strokes` (`Stroke`); `androidx.ink.authoring.compose` (`InProgressStrokes`); `androidx.ink.rendering.android.canvas` (`CanvasStrokeRenderer`).

## Related

- [pointer-input](./pointer-input.md)
- [detect-drag-gestures](./detect-drag-gestures.md)

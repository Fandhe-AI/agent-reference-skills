# CGBlendMode

An enumeration of compositing operations controlling how source colors combine with destination colors during rendering. Based on Porter-Duff compositing algebra.

## Signature / Usage

```swift
// Set blend mode before drawing
context.setBlendMode(.multiply)
context.setAlpha(0.8)
context.draw(image, in: rect)

// Reset to default
context.setBlendMode(.normal)
```

## Options / Props

### Standard Blend Modes

| Case | Effect |
|------|--------|
| `.normal` | Source painted over destination (default) |
| `.multiply` | `S * D` — darkens; result is darker than either input |
| `.screen` | Inverse multiply — lightens; result is lighter than either input |
| `.overlay` | Multiply or screen depending on destination lightness |
| `.darken` | Selects the darker of source or destination |
| `.lighten` | Selects the lighter of source or destination |
| `.colorDodge` | Brightens destination to reflect source; black source = no change |
| `.colorBurn` | Darkens destination to reflect source; white source = no change |
| `.softLight` | Subtle lighting; similar to overlay but gentler |
| `.hardLight` | Intense lighting; screen or multiply depending on source |
| `.difference` | Subtracts darker from lighter; high contrast result |
| `.exclusion` | Similar to `.difference` but lower contrast |

### Color Component Modes

| Case | Effect |
|------|--------|
| `.hue` | Destination luminance and saturation with source hue |
| `.saturation` | Destination luminance and hue with source saturation |
| `.color` | Destination luminance with source hue and saturation |
| `.luminosity` | Destination hue and saturation with source luminance |

### Porter-Duff Compositing Modes

| Case | Formula | Description |
|------|---------|-------------|
| `.clear` | `R = 0` | Clears destination |
| `.copy` | `R = S` | Replaces destination with source |
| `.sourceIn` | `R = S * Da` | Source visible only where destination is opaque |
| `.sourceOut` | `R = S * (1 - Da)` | Source visible only where destination is transparent |
| `.sourceAtop` | `R = S * Da + D * (1 - Sa)` | Source atop opaque destination |
| `.destinationOver` | `R = S * (1 - Da) + D` | Destination painted over source |
| `.destinationIn` | `R = D * Sa` | Destination visible only where source is opaque |
| `.destinationOut` | `R = D * (1 - Sa)` | Destination visible only where source is transparent |
| `.destinationAtop` | `R = S * (1 - Da) + D * Sa` | Destination atop opaque source |
| `.xor` | `R = S * (1 - Da) + D * (1 - Sa)` | Exclusive-or compositing |
| `.plusDarker` | `R = max(0, 1 - ((1-D) + (1-S)))` | Darkening addition |
| `.plusLighter` | `R = min(1, S + D)` | Lightening addition (clamps at white) |

## Notes

Available on iOS 2.0+, macOS 10.4+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Set via `CGContext.setBlendMode(_:)`. The blend mode applies to all subsequent drawing until changed or the graphics state is restored. Porter-Duff modes work best on pre-multiplied alpha bitmaps.

## Related

- [CGContext](./cgcontext.md)
- [CGImage](./cgimage.md)
- [CGBitmapInfo](./cgbitmapinfo.md)

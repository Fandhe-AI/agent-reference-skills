---
source: https://reactnative.dev/docs/0.87/pixelratio
---

# PixelRatio

`PixelRatio` gives you access to the device's pixel density and font scale.

## Signature / Usage

Fetching a correctly sized image: multiply the size of the displayed image by the pixel ratio.

```tsx
const image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});
<Image source={image} style={{width: 200, height: 100}} />;
```

### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `get()` | `static get(): number;` | Returns the device pixel density. `1`: mdpi Android. `1.5`: hdpi Android. `2`: iPhone SE, 6S, 7, 8, XR, 11; xhdpi Android. `3`: iPhone 6S Plus, 7 Plus, 8 Plus, X, XS, XS Max, 11 Pro, 11 Pro Max; Pixel, Pixel 2; xxhdpi Android. `3.5`: Nexus 6, Pixel XL, Pixel 2 XL; xxxhdpi Android. |
| `getFontScale()` | `static getFontScale(): number;` | Returns the scaling factor for font sizes. Android reflects Settings > Display > Font size; iOS reflects Settings > Display & Brightness > Text Size (also Settings > Accessibility > Display & Text Size > Larger Text). If a font scale is not set, returns the device pixel ratio. |
| `getPixelSizeForLayoutSize()` | `static getPixelSizeForLayoutSize(layoutSize: number): number;` | Converts a layout size (dp) to pixel size (px). Guaranteed to return an integer. |
| `roundToNearestPixel()` | `static roundToNearestPixel(layoutSize: number): number;` | Rounds a layout size (dp) to the nearest layout size corresponding to an integer number of pixels. On a device with PixelRatio 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, exactly (8.33 * 3) = 25 pixels. |

## Notes

- Pixel grid snapping: React Native rounds all pixels automatically. Everything in JavaScript and within the layout engine works with arbitrary precision numbers; rounding happens only when the position and dimensions of the native element are set on the main thread, and relative to the root rather than the parent, to avoid accumulating rounding errors.

## Related

- [Dimensions](./dimensions.md)
- [useWindowDimensions](./usewindowdimensions.md)

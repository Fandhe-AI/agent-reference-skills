---
source: https://www.electronjs.org/docs/latest/api/structures/display
---

# Geometry structures (Display, Point, Rectangle, Size)

Plain-object structures used by `screen`, `BrowserWindow` bounds, `nativeImage` and other Electron APIs.

## Signature / Usage

```js
const { app, screen } = require('electron')

app.whenReady().then(() => {
  const { bounds, workArea, scaleFactor } = screen.getPrimaryDisplay()
  const cursor = screen.getCursorScreenPoint() // { x, y }
})
```

### Display Object

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.

| Name | Type | Description |
|------|------|-------------|
| accelerometerSupport | string | Can be `available`, `unavailable`, `unknown`. |
| bounds | Rectangle | the bounds of the display in DIP points. |
| colorDepth | number | The number of bits per pixel. |
| colorSpace | string | represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions. |
| depthPerComponent | number | The number of bits per color component. |
| detected | boolean | `true` if the display is detected by the system. |
| displayFrequency | number | The display refresh rate. |
| id | number | Unique identifier associated with the display. A value of -1 means the display is invalid or the correct `id` is not yet known, and a value of -10 means the display is a virtual display assigned to a unified desktop. |
| internal | boolean | `true` for an internal display and `false` for an external display. |
| label | string | User-friendly label, determined by the platform. |
| maximumCursorSize | Size | Maximum cursor size in native pixels. |
| nativeOrigin | Point | Returns the display's origin in pixel coordinates. Only available on windowing systems like X11 that position displays in pixel coordinates. |
| rotation | number | Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees. |
| scaleFactor | number | Output device's pixel scale factor. |
| touchSupport | string | Can be `available`, `unavailable`, `unknown`. |
| monochrome | boolean | Whether or not the display is a monochrome display. |
| size | Size | |
| workArea | Rectangle | the work area of the display in DIP points. |
| workAreaSize | Size | The size of the work area. |

### Point Object

* `x` number
* `y` number

> [!NOTE]
> Both `x` and `y` must be whole integers, when providing a point object as input to an Electron API we will automatically round your `x` and `y` values to the nearest whole integer.

### Rectangle Object

* `x` number - The x coordinate of the origin of the rectangle (must be an integer).
* `y` number - The y coordinate of the origin of the rectangle (must be an integer).
* `width` number - The width of the rectangle (must be an integer).
* `height` number - The height of the rectangle (must be an integer).

### Size Object

* `width` number
* `height` number

## Notes

* Structure pages: https://www.electronjs.org/docs/latest/api/structures/display , .../point , .../rectangle , .../size

## Related

* [screen](./screen.md)
* [nativeImage](./native-image.md)

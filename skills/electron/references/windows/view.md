---
source: https://www.electronjs.org/docs/latest/api/view
---

# View

Create and layout native views. Class `View`: a basic native view. Process: Main. This module cannot be used until the `ready` event of the `app` module is emitted. `View` is an EventEmitter. Electron's built-in classes cannot be subclassed in user code.

## Signature / Usage

```js
const { BaseWindow, View } = require('electron')

const win = new BaseWindow()
const view = new View()

view.setBackgroundColor('red')
view.setBounds({ x: 0, y: 0, width: 100, height: 100 })
win.contentView.addChildView(view)
```

### `new View()`

Creates a new `View`.

### Instance Events

#### Event: 'bounds-changed'

Emitted when the view's bounds have changed in response to being laid out. The new bounds can be retrieved with `view.getBounds()`.

### Instance Methods

#### `view.addChildView(view[, index])`

* `view` View - Child view to add.
* `index` Integer (optional) - Index at which to insert the child view. Defaults to adding the child at the end of the child list.

If the same View is added to a parent which already contains it, it will be reordered such that it becomes the topmost view.

#### `view.removeChildView(view)`

* `view` View - Child view to remove.

If the view passed as a parameter is not a child of this view, this method is a no-op.

#### `view.setBounds(bounds[, options])`

* `bounds` Rectangle - New bounds of the View.
* `options` Object (optional) - Options for setting the bounds.
  * `animate` boolean | Object (optional) - If true, the bounds change will be animated. If an object is passed, it can contain the following properties:
    * `duration` Integer (optional) - Duration of the animation in milliseconds. Default is `250`.
    * `easing` string (optional) - Easing function for the animation. Default is `linear`.
      * `linear`
      * `ease-in`
      * `ease-out`
      * `ease-in-out`

#### `view.getBounds()`

Returns `Rectangle` - The bounds of this View, relative to its parent.

#### `view.setBackgroundColor(color)`

* `color` string - Color in Hex, RGB, ARGB, HSL, HSLA or named CSS color format. The alpha channel is optional for the hex type.

Examples of valid `color` values:

* Hex
  * `#fff` (RGB)
  * `#ffff` (ARGB)
  * `#ffffff` (RRGGBB)
  * `#ffffffff` (AARRGGBB)
* RGB
  * `rgb\(([\d]+),\s*([\d]+),\s*([\d]+)\)`
    * e.g. `rgb(255, 255, 255)`
* RGBA
  * `rgba\(([\d]+),\s*([\d]+),\s*([\d]+),\s*([\d.]+)\)`
    * e.g. `rgba(255, 255, 255, 1.0)`
* HSL
  * `hsl\((-?[\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\)`
    * e.g. `hsl(200, 20%, 50%)`
* HSLA
  * `hsla\((-?[\d.]+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)`
    * e.g. `hsla(200, 20%, 50%, 0.5)`
* Color name
  * Options are listed in SkParseColor.cpp (https://source.chromium.org/chromium/chromium/src/+/main:third_party/skia/src/utils/SkParseColor.cpp;l=11-152;drc=eea4bf52cb0d55e2a39c828b017c80a5ee054148)
  * Similar to CSS Color Module Level 3 keywords, but case-sensitive.
    * e.g. `blueviolet` or `red`

Hex format with alpha takes `AARRGGBB` or `ARGB`, _not_ `RRGGBBAA` or `RGB`.

#### `view.setBorderRadius(radius)`

* `radius` Integer - Border radius size in pixels.

The area cutout of the view's border still captures clicks.

#### `view.setBackgroundBlur(blurRadius)`

* `blurRadius` Integer - The radius of the background blur effect (in pixels).

You must set a background color with an alpha channel (e.g. `#80ffffff`) in order for the blur effect to be visible.

#### `view.setVisible(visible)`

* `visible` boolean - If false, the view will be hidden from display.

#### `view.getVisible()`

Returns `boolean` - Whether the view should be drawn. Note that this is different from whether the view is visible on screen-it may still be obscured or out of view.

### Instance Properties

#### `view.children` _Readonly_

A `View[]` property representing the child views of this view.

## Notes

* Distinct from UI-toolkit views: Electron's `View` is a native view laid out in the main process inside a `BaseWindow`. For SwiftUI / UIKit views see apple-swiftui / apple-uikit, for WinUI elements see windows-winui-ui.

## Related

* [BaseWindow overview](./base-window-overview.md)
* [WebContentsView](./web-contents-view.md)
* [ImageView](./image-view.md)

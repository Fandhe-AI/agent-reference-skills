---
source: https://www.electronjs.org/docs/latest/api/image-view
---

# ImageView

A View that displays an image (_Experimental_). Class `ImageView` extends `View`. Process: Main. This module cannot be used until the `ready` event of the `app` module is emitted. Useful for showing splash screens that will be swapped for `WebContentsView`s when the content finishes loading. Note that `ImageView` is experimental and may be changed or removed in the future.

## Signature / Usage

```js
const { BaseWindow, ImageView, nativeImage, WebContentsView } = require('electron')

const path = require('node:path')

const win = new BaseWindow({ width: 800, height: 600 })

// Create a "splash screen" image to display while the WebContentsView loads
const splashView = new ImageView()
const splashImage = nativeImage.createFromPath(path.join(__dirname, 'loading.png'))
splashView.setImage(splashImage)
win.setContentView(splashView)

const webContentsView = new WebContentsView()
webContentsView.webContents.once('did-finish-load', () => {
  // Now that the WebContentsView has loaded, swap out the "splash screen" ImageView
  win.setContentView(webContentsView)
})
webContentsView.webContents.loadURL('https://electronjs.org')
```

`ImageView` inherits from View. `ImageView` is an EventEmitter. Electron's built-in classes cannot be subclassed in user code.

### `new ImageView()` _Experimental_

Creates an ImageView.

### Instance Methods

The following methods are available on instances of the `ImageView` class, in addition to those inherited from View:

#### `image.setImage(image)` _Experimental_

* `image` NativeImage

Sets the image for this `ImageView`. Note that only image formats supported by `NativeImage` can be used with an `ImageView`.

## Related

* [View](./view.md)
* [WebContentsView](./web-contents-view.md)
* [BaseWindow properties and methods](./base-window-properties-methods.md)

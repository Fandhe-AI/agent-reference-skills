---
source: https://www.electronjs.org/docs/latest/api/web-contents#contentsbeginframesubscriptiononlydirty-callback
---

# WebContents methods: frame subscription, startDrag, savePage, offscreen painting, WebRTC, process ids

Instance methods of `WebContents` (Process: Main) for frame capture subscription, drag-out, saving pages, offscreen rendering control, WebRTC policy, process ids, cloning, heap snapshots and misc settings.

## Signature / Usage

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.loadURL('https://github.com')

win.webContents.on('did-finish-load', async () => {
  win.webContents
    .savePage('/tmp/test.html', 'HTMLComplete')
    .then(() => {
      console.log('Page was saved successfully.')
    })
    .catch((err) => {
      console.log(err)
    })
})
```

## Instance Methods

### `contents.beginFrameSubscription([onlyDirty ,]callback)`

* `onlyDirty` boolean (optional) - Defaults to `false`.
* `callback` Function
  * `image` NativeImage
  * `dirtyRect` Rectangle

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of NativeImage that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

### `contents.endFrameSubscription()`

End subscribing for frame presentation events.

### `contents.startDrag(item)`

* `item` Object
  * `file` string - The path to the file being dragged.
  * `files` string[] (optional) - The paths to the files being dragged. (`files` will override `file` field)
  * `icon` NativeImage | string - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

### `contents.savePage(fullPath, saveType)`

* `fullPath` string - The absolute file path.
* `saveType` string - Specify the save type.
  * `HTMLOnly` - Save only the HTML of the page.
  * `HTMLComplete` - Save complete-html page.
  * `MHTML` - Save complete-html page as MHTML.

Returns `Promise<void>` - resolves if the page is saved.

### `contents.showDefinitionForSelection()` _macOS_

Shows pop-up dictionary that searches the selected word on the page.

### Offscreen rendering

| Method | Description |
| --- | --- |
| `contents.isOffscreen()` | Returns `boolean` - Indicates whether _offscreen rendering_ is enabled. |
| `contents.startPainting()` | If _offscreen rendering_ is enabled and not painting, start painting. |
| `contents.stopPainting()` | If _offscreen rendering_ is enabled and painting, stop painting. |
| `contents.isPainting()` | Returns `boolean` - If _offscreen rendering_ is enabled returns whether it is currently painting. |
| `contents.setFrameRate(fps)` | (`fps` Integer) If _offscreen rendering_ is enabled sets the frame rate to the specified number. When `webPreferences.offscreen.useSharedTexture` is `false` only values between 1 and 240 are accepted. |
| `contents.getFrameRate()` | Returns `Integer` - If _offscreen rendering_ is enabled returns the current frame rate. |
| `contents.invalidate()` | Schedules a full repaint of the window this web contents is in. If _offscreen rendering_ is enabled invalidates the frame and generates a new one through the `'paint'` event. |

### WebRTC

#### `contents.getWebRTCIPHandlingPolicy()`

Returns `string` - Returns the WebRTC IP Handling Policy.

#### `contents.setWebRTCIPHandlingPolicy(policy)`

* `policy` string - Specify the WebRTC IP Handling Policy.
  * `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
  * `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
  * `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
  * `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See BrowserLeaks (https://browserleaks.com/webrtc) for more details.

#### `contents.getWebRTCUDPPortRange()`

Returns `Object`: `min` Integer - The minimum UDP port number that WebRTC should use. `max` Integer - The maximum UDP port number that WebRTC should use.

By default this value is `{ min: 0, max: 0 }` , which would apply no restriction on the udp port range.

#### `contents.setWebRTCUDPPortRange(udpPortRange)`

* `udpPortRange` Object
  * `min` Integer - The minimum UDP port number that WebRTC should use.
  * `max` Integer - The maximum UDP port number that WebRTC should use.

Setting the WebRTC UDP Port Range allows you to restrict the udp port range used by WebRTC. By default the port range is unrestricted.

Note: To reset to an unrestricted port range this value should be set to `{ min: 0, max: 0 }`.

### `contents.getMediaSourceId(requestWebContents)`

* `requestWebContents` WebContents - Web contents that the id will be registered to.

Returns `string` - The identifier of a WebContents stream. This identifier can be used with `navigator.mediaDevices.getUserMedia` using a `chromeMediaSource` of `tab`. The identifier is restricted to the web contents that it is registered to and is only valid for 10 seconds. The `desktop` source only accepts screen and window identifiers from `desktopCapturer.getSources`; to capture a WebContents use this identifier with the `tab` source, or `ses.setDisplayMediaRequestHandler`.

### `contents.getOrCreateDevToolsTargetId()`

Returns `string` - The Chrome DevTools Protocol TargetID associated with this WebContents. This is the reverse of `webContents.fromDevToolsTargetId()`.

Note: This method creates a new DevTools agent for this WebContents if one does not already exist.

### `contents.getOSProcessId()`

Returns `Integer` - The operating system `pid` of the associated renderer process.

### `contents.getProcessId()`

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)

### `contents.clone()`

Returns `WebContents` - A cloned WebContents instance. This method creates a copy of the WebContents with the following attributes:

* **WebPreferences** - All preferences from the original WebContents are copied
* **SiteInstance** - Uses the same SiteInstance as the original. This means the cloned WebContents will reuse the same render process as the original when loading same-origin pages, and only spawn a new render process for cross-origin navigations. This process allocation behavior is consistent with window.open and tab duplication in Chromium. For more details, see Chromium's Site Isolation design document.
* **Opener relationship** - Inherits the opener (window.opener) relationship
* **Navigation state** - Copies the navigation history and controller state

The cloned WebContents is an independent instance with its own lifecycle that can be destroyed separately and will not contain any open web pages.

This API is useful for use cases where you want to create a new WebContents that shares the same render process with the original for same-origin content, while maintaining full lifecycle independence. Additionally, reusing the existing render process can help optimize memory usage and page load speed to a certain extent, as it eliminates the overhead of spawning and initializing a new render process from scratch.

### `contents.takeHeapSnapshot(filePath)`

* `filePath` string - Path to the output file.

Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `contents.getBackgroundThrottling()`

Returns `boolean` - whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

### `contents.setBackgroundThrottling(allowed)`

* `allowed` boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

### `contents.getType()`

Returns `string` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

### `contents.setImageAnimationPolicy(policy)`

* `policy` string - Can be `animate`, `animateOnce` or `noAnimation`.

Sets the image animation policy for this webContents. The policy only affects _new_ images, existing images that are currently being animated are unaffected. This is a known limitation in Chromium, you can force image animation to be recalculated with `img.src = img.src` which will result in no network traffic but will update the animation policy.

This corresponds to the animationPolicy accessibility feature in Chromium.

## Notes

* Behavior changed: `WebContents.backgroundThrottling` set to false affects all `WebContents` in the host `BrowserWindow` (source history annotation on `setBackgroundThrottling`; see the breaking-changes category).
* WebRTC IP handling policy exposes or hides local/public IPs; the default policy exposes both.

## Related

* [Events: input, devtools, ipc (paint)](./web-contents-events-input-devtools-ipc.md)
* [Properties](./web-contents-properties.md)
* [Methods: editing, find, print](./web-contents-methods-editing-find-print.md)

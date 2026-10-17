---
source: https://www.electronjs.org/docs/latest/api/desktop-capturer
---

# desktopCapturer

Access information about media sources that can be used to capture audio and video from the desktop using the `navigator.mediaDevices.getUserMedia` API. Process: Main.

## Signature / Usage

The following example shows how to capture video from a desktop window whose title is `Electron`:

```js
// main.js
const { app, BrowserWindow, desktopCapturer, session } = require('electron')

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow()

  session.defaultSession.setDisplayMediaRequestHandler(
    (request, callback) => {
      desktopCapturer.getSources({ types: ['screen'] }).then(
        (sources) => {
          // Grant access to the first screen found.
          callback({ video: sources[0], audio: 'loopback' })
        },
        () => {
          // Deny the request if no sources could be retrieved, for example
          // when the user cancels the PipeWire picker on Linux.
          callback(null)
        }
      )
      // If true, use the system picker if available.
      // Note: this is currently experimental. If the system picker
      // is available, it will be used and the media request handler
      // will not be invoked.
    },
    { useSystemPicker: true }
  )

  mainWindow.loadFile('index.html')
})
```

```js
// renderer.js
const startButton = document.getElementById('startButton')
const stopButton = document.getElementById('stopButton')
const video = document.querySelector('video')

startButton.addEventListener('click', () => {
  navigator.mediaDevices
    .getDisplayMedia({
      audio: true,
      video: {
        width: 320,
        height: 240,
        frameRate: 30
      }
    })
    .then((stream) => {
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    })
    .catch((e) => console.log(e))
})

stopButton.addEventListener('click', () => {
  video.pause()
  video.srcObject?.getTracks().forEach((t) => t.stop())
  video.srcObject = null
})
```

```html
<!-- index.html -->
<html>
<meta http-equiv="content-security-policy" content="script-src 'self' 'unsafe-inline'" />
  <body>
    <button id="startButton" class="button">Start</button>
    <button id="stopButton" class="button">Stop</button>
    <video width="320" height="240" autoplay></video>
    <script src="renderer.js"></script>
  </body>
</html>
```

See `navigator.mediaDevices.getDisplayMedia` (MDN) for more information.

> [!NOTE]
> `navigator.mediaDevices.getDisplayMedia` does not permit the use of `deviceId` for selection of a source - see the W3C specification constraints.

### Methods

#### `desktopCapturer.getSources(options)`

* `options` Object
  * `types` string[] - An array of strings that lists the types of desktop sources to be captured, available types can be `screen` and `window`.
  * `thumbnailSize` Size (optional) - The size that the media source thumbnail should be scaled to. Default is `150` x `150`. Set width or height to 0 when you do not need the thumbnails. This will save the processing time required for capturing the content of each window and screen.
  * `fetchWindowIcons` boolean (optional) - Set to true to enable fetching window icons. The default value is false. When false the appIcon property of the sources return null. Same if a source has the type screen.

Returns `Promise<DesktopCapturerSource[]>` - Resolves with an array of `DesktopCapturerSource` objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

> [!NOTE]
> * Capturing audio requires `NSAudioCaptureUsageDescription` Info.plist key on macOS 14.2 Sonoma and higher - see "macOS versions 14.2 or higher" below.
> * Capturing the screen contents requires user consent on macOS 10.15 Catalina or higher, which can detected by `systemPreferences.getMediaAccessStatus`.

### DesktopCapturerSource Object

* `id` string - The identifier of a window or screen that can be used as a `chromeMediaSourceId` constraint when calling `navigator.getUserMedia`. The format of the identifier will be `window:XX:YY` or `screen:ZZ:0`. XX is the windowID/handle. YY is 1 for the current process, and 0 for all others. ZZ is a sequential number that represents the screen, and it does not equal to the index in the source's name.
* `name` string - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` NativeImage - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.
* `display_id` string - A unique identifier that will correspond to the `id` of the matching Display returned by the Screen API. On some platforms, this is equivalent to the `XX` portion of the `id` field above and on others it will differ. It will be an empty string if not available.
* `appIcon` NativeImage - An icon image of the application that owns the window or null if the source has a type screen. The size of the icon is not known in advance and depends on what the application provides.

### Caveats

#### Linux

`desktopCapturer.getSources(options)` only returns a single source on Linux when using Pipewire.

PipeWire supports a single capture for both screens and windows. If you request the window and screen type, the selected source will be returned as a window capture.

#### macOS versions 14.2 or higher

`NSAudioCaptureUsageDescription` Info.plist key must be added in order for audio to be captured by `desktopCapturer`. If instead you are running Electron from another program like a terminal or IDE then that parent program must contain the Info.plist key.

This is in order to facillitate use of Apple's new CoreAudio Tap API by Chromium.

> [!WARNING]
> Failure of `desktopCapturer` to start an audio stream due to `NSAudioCaptureUsageDescription` permission not present will still create a dead audio stream however no warnings or errors are displayed.

As of Electron `v39.0.0-beta.4`, Chromium made Apple's new `CoreAudio Tap API` the default for desktop audio capture. There is no fallback to the older `Screen & System Audio Recording` permissions system even if CoreAudio Tap API stream creation fails.

If you need to continue using `Screen & System Audio Recording` permissions for `desktopCapturer` on macOS versions 14.2 and later, you can apply a Chromium feature flag to force use of that older permissions system:

```js
// main.js (right beneath your require/import statments)
app.commandLine.appendSwitch('disable-features', 'MacCatapLoopbackAudioForScreenShare')
```

#### macOS versions 12.7.6 or lower

`navigator.mediaDevices.getUserMedia` does not work on macOS versions 12.7.6 and prior for audio capture due to a fundamental limitation whereby apps that want to access the system's audio require a signed kernel extension. Chromium, and by extension Electron, does not provide this. Only in macOS 13 and onwards does Apple provide APIs to capture desktop audio without the need for a signed kernel extension.

It is possible to circumvent this limitation by capturing system audio with another macOS app like BlackHole or Soundflower and passing it through a virtual audio input device. This virtual device can then be queried with `navigator.mediaDevices.getUserMedia`.

## Options / Props

`desktopCapturer.getSources(options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| types | string[] | — | Types of desktop sources to be captured, available types can be `screen` and `window`. |
| thumbnailSize | Size (optional) | `150` x `150` | The size that the media source thumbnail should be scaled to. Set width or height to 0 when you do not need the thumbnails. |
| fetchWindowIcons | boolean (optional) | `false` | Set to true to enable fetching window icons. When false the `appIcon` property of the sources return null. |

## Notes

* The official sample only calls `video.pause()`; the tracks are stopped here so screen capture actually ends.
* Past breaking change: `desktopCapturer.getSources` returns a Promise instead of using a callback (see the breaking-changes category).
* Structure page: https://www.electronjs.org/docs/latest/api/structures/desktop-capturer-source

## Related

* [systemPreferences](./system-preferences.md)
* [Geometry structures (Display, Point, Rectangle, Size)](./screen-structures.md)
* [nativeImage](./native-image.md)

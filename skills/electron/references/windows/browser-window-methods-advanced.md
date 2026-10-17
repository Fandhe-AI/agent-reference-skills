---
source: https://www.electronjs.org/docs/latest/api/browser-window#winsetignoremouseeventsignore-options
---

# BrowserWindow methods: mouse events, content protection, tabs, vibrancy, title bar overlay

Instance methods of `BrowserWindow` for mouse pass-through, content protection, focusability, parent/child windows, macOS native tabs, vibrancy / background material, traffic-light position, Touch Bar, deprecated BrowserView attachment, and title bar overlay. Process: Main.

## Signature / Usage

```js
const { app } = require('electron')

app.commandLine.appendSwitch('disable-features', 'AllowWindowCaptureExclusionInRemoteSessions')
```

(Original example for `win.setContentProtection`.)

#### `win.setIgnoreMouseEvents(ignore[, options])`

* `ignore` boolean
* `options` Object (optional)
  * `forward` boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events. On Linux this is supported on both X11 and Wayland. On X11 the X server has applied the window's new input shape when the call returns; on Wayland the new input region is applied with the window's next frame.

#### `win.setContentProtection(enable)` _macOS_ _Windows_

* `enable` boolean

Prevents the window contents from being captured by other apps.

On Windows, it calls `SetWindowDisplayAffinity` (https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowdisplayaffinity) with `WDA_EXCLUDEFROMCAPTURE`. For Windows 10 version 2004 and up the window will be removed from capture entirely, older Windows versions behave as if `WDA_MONITOR` is applied capturing a black window. The change takes effect with the next desktop composition, not when the call returns, so a capture started immediately afterwards can still contain the window.

Protection also applies in a Windows remote session. A Remote Desktop client still shows the window to the remote user, but remote access software that works by capturing the desktop cannot. To leave windows unprotected in remote sessions instead, disable the `AllowWindowCaptureExclusionInRemoteSessions` Chromium feature at the start of your main script (see the snippet above). `win.isContentProtected()` still returns `true` in that case.

On macOS, it sets the `NSWindow`'s `sharingType` to `NSWindowSharingNone`. Unfortunately, due to an intentional change in macOS, newer Mac applications that use `ScreenCaptureKit` will capture your window despite `win.setContentProtection(true)`. See https://github.com/electron/electron/issues/48258#issuecomment-3269893618.

#### `win.isContentProtected()` _macOS_ _Windows_

Returns `boolean` - whether or not content protection is currently enabled.

#### `win.setFocusable(focusable)` _macOS_ _Windows_

* `focusable` boolean

Changes whether the window can be focused.

On macOS it does not remove the focus from the window.

#### `win.isFocusable()` _macOS_ _Windows_

Returns `boolean` - Whether the window can be focused.

#### `win.setParentWindow(parent)`

* `parent` BrowserWindow | null

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### `win.getParentWindow()`

Returns `BrowserWindow | null` - The parent window or `null` if there is no parent.

#### `win.getChildWindows()`

Returns `BrowserWindow[]` - All child windows.

#### `win.setAutoHideCursor(autoHide)` _macOS_

* `autoHide` boolean

Controls whether to hide cursor when typing.

#### `win.selectPreviousTab()` _macOS_

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### `win.selectNextTab()` _macOS_

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### `win.showAllTabs()` _macOS_

Shows or hides the tab overview when native tabs are enabled.

#### `win.mergeAllWindows()` _macOS_

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### `win.moveTabToNewWindow()` _macOS_

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### `win.toggleTabBar()` _macOS_

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### `win.addTabbedWindow(browserWindow)` _macOS_

* `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### `win.setVibrancy(type[, options])` _macOS_

* `type` string | null - Can be `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. See the macOS documentation (NSVisualEffectView) for more details.
* `options` Object (optional)
  * `animationDuration` number (optional) - if greater than zero, the change to vibrancy will be animated over the given duration (in milliseconds).

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window. The `animationDuration` parameter only animates fading in or fading out the vibrancy effect. Animating between different types of vibrancy is not supported.

#### `win.setBackgroundMaterial(material)` _Windows_

* `material` string
  * `auto` - Let the Desktop Window Manager (DWM) automatically decide the system-drawn backdrop material for this window. This is the default.
  * `none` - Don't draw any system backdrop.
  * `mica` - Draw the backdrop material effect corresponding to a long-lived window.
  * `acrylic` - Draw the backdrop material effect corresponding to a transient window.
  * `tabbed` - Draw the backdrop material effect corresponding to a window with a tabbed title bar.

This method sets the browser window's system-drawn background material, including behind the non-client area.

See the Windows documentation (https://learn.microsoft.com/en-us/windows/win32/api/dwmapi/ne-dwmapi-dwm_systembackdrop_type) for more details.

This method is only supported on Windows 11 22H2 and up.

#### `win.setWindowButtonPosition(position)` _macOS_

* `position` Point | null

Set a custom position for the traffic light buttons in frameless window. Passing `null` will reset the position to default.

#### `win.getWindowButtonPosition()` _macOS_

Returns `Point | null` - The custom position for the traffic light buttons in frameless window, `null` will be returned when there is no custom position.

#### `win.setTouchBar(touchBar)` _macOS_

* `touchBar` TouchBar | null

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar.

The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### `win.setBrowserView(browserView)` _Experimental_ _Deprecated_

* `browserView` BrowserView | null - Attach `browserView` to `win`. If there are other `BrowserView`s attached, they will be removed from this window.

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class.

#### `win.getBrowserView()` _Experimental_ _Deprecated_

Returns `BrowserView | null` - The `BrowserView` attached to `win`. Returns `null` if one is not attached. Throws an error if multiple `BrowserView`s are attached.

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class.

#### `win.addBrowserView(browserView)` _Experimental_ _Deprecated_

* `browserView` BrowserView

Replacement API for setBrowserView supporting work with multi browser views.

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class.

#### `win.removeBrowserView(browserView)` _Experimental_ _Deprecated_

* `browserView` BrowserView

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class.

#### `win.setTopBrowserView(browserView)` _Experimental_ _Deprecated_

* `browserView` BrowserView

Raises `browserView` above other `BrowserView`s attached to `win`. Throws an error if `browserView` is not attached to `win`.

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class.

#### `win.getBrowserViews()` _Experimental_ _Deprecated_

Returns `BrowserView[]` - a sorted by z-index array of all BrowserViews that have been attached with `addBrowserView` or `setBrowserView`. The top-most BrowserView is the last element of the array.

The `BrowserView` class is deprecated, and replaced by the new `WebContentsView` class.

#### `win.setTitleBarOverlay(options)` _Windows_ _Linux_

* `options` Object
  * `color` String (optional) - The CSS color of the Window Controls Overlay when enabled.
  * `symbolColor` String (optional) - The CSS color of the symbols on the Window Controls Overlay when enabled.
  * `height` Integer (optional) - The height of the title bar and Window Controls Overlay in pixels.

On a window with Window Controls Overlay already enabled, this method updates the style of the title bar overlay.

On Linux, the `symbolColor` is automatically calculated to have minimum accessible contrast to the `color` if not explicitly set.

## Notes

* `BrowserView` methods (`setBrowserView`, `getBrowserView`, `addBrowserView`, `removeBrowserView`, `setTopBrowserView`, `getBrowserViews`) are deprecated; use `WebContentsView` with `win.contentView` (see [browser-view.md](./browser-view.md), [web-contents-view.md](./web-contents-view.md)).
* `setVibrancy`, `setWindowButtonPosition`, `setTouchBar` and tab methods are macOS-only features; for native NSVisualEffectView / NSWindow tabbing see apple-appkit. For Windows Mica/Acrylic in WinUI 3 apps see windows-winui-ui.

## Related

* [BrowserWindow methods: loading, menu, progress bar, thumbar](./browser-window-methods-content-taskbar.md)
* [BrowserView (deprecated)](./browser-view.md)
* [WebContentsView](./web-contents-view.md)

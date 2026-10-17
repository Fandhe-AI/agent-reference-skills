---
source: https://v2.tauri.app/reference/config/#windowconfig
---

# WindowConfig

The window configuration object (items of `app.windows`), plus its supporting types: `WebviewUrl`, `PreventOverflowConfig`, `Theme`, `TitleBarStyle`, `LogicalPosition`, `WindowEffectsConfig`, `WindowEffect`, `WindowEffectState`, `Color`, `BackgroundThrottlingPolicy`, `ScrollBarStyle`.

## Signature / Usage

```json
{
  "app": {
    "windows": [
      { "label": "main", "width": 800, "height": 600 }
    ]
  }
}
```

## Options / Props

`additionalProperties: false`. Sizes and positions are in logical pixels unless stated.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | string | `"main"` | The window identifier. It must be alphanumeric. |
| `create` | boolean | `true` | Whether Tauri should create this window at app startup. When `false` you must grab the config via `app.config().app.windows` and create it with `WebviewWindowBuilder::from_config`. |
| `url` | WebviewUrl | `"index.html"` | The window webview URL. |
| `userAgent` | string \| null | — | The user agent for the webview. |
| `dragDropEnabled` | boolean | `true` | Whether the drag and drop handlers used internally to generate `DragDropEvent`s are enabled on the webview. Disabling it is required to use HTML5 drag and drop on the frontend on Windows since Tauri replaces the drag drop handler of WebView2. Maps to `WebviewBuilder::disable_drag_drop_handler`, not `WindowBuilder::drag_and_drop`. |
| `center` | boolean | `false` | Whether or not the window starts centered. |
| `x` | number \| null | — | The horizontal position of the window's top left corner. |
| `y` | number \| null | — | The vertical position of the window's top left corner. |
| `width` | number | `800.0` | The window width. |
| `height` | number | `600.0` | The window height. |
| `minWidth` | number \| null | — | The min window width. |
| `minHeight` | number \| null | — | The min window height. |
| `maxWidth` | number \| null | — | The max window width. |
| `maxHeight` | number \| null | — | The max window height. |
| `preventOverflow` | PreventOverflowConfig \| null | — | Whether or not to prevent the window from overflowing the workarea. iOS / Android: unsupported. |
| `resizable` | boolean | `true` | Whether the window is resizable. When `false`, the native maximize button is automatically disabled. |
| `maximizable` | boolean | `true` | Whether the native maximize button is enabled. Ignored if `resizable` is `false`. macOS: disables the "zoom" button (also used to enter fullscreen). Linux / iOS / Android: unsupported. |
| `minimizable` | boolean | `true` | Whether the native minimize button is enabled. Linux / iOS / Android: unsupported. |
| `closable` | boolean | `true` | Whether the native close button is enabled. Linux: GTK+ does its best to convince the window manager not to show a close button; may have no effect on an already visible window. iOS / Android: unsupported. |
| `title` | string | `"Tauri App"` | The window title. |
| `fullscreen` | boolean | `false` | Whether the window starts as fullscreen. |
| `focus` | boolean | `true` | Whether the window will be initially focused. |
| `focusable` | boolean | `true` | Whether the window will be focusable. |
| `transparent` | boolean | `false` | Whether the window is transparent. Windows: using `noRedirectionBitmap` can help avoid a white flash. |
| `maximized` | boolean | `false` | Whether the window is maximized. |
| `visible` | boolean | `true` | Whether the window is visible. |
| `decorations` | boolean | `true` | Whether the window should have borders and bars. |
| `alwaysOnBottom` | boolean | `false` | Whether the window should always be below other windows. |
| `alwaysOnTop` | boolean | `false` | Whether the window should always be on top of other windows. |
| `visibleOnAllWorkspaces` | boolean | `false` | Whether the window should be visible on all workspaces or virtual desktops. Windows / iOS / Android: unsupported. |
| `contentProtected` | boolean | `false` | Prevents the window contents from being captured by other apps. |
| `skipTaskbar` | boolean | `false` | If `true`, hides the window icon from the taskbar on Windows and Linux. |
| `windowClassname` | string \| null | — | The name of the window class created on Windows to create the window. Windows only. |
| `noRedirectionBitmap` | boolean | `false` | Sets `WS_EX_NOREDIRECTIONBITMAP`. Can avoid the white flash before webview content is rendered when using a transparent window. Windows only. |
| `theme` | Theme \| null | — | The initial window theme. Defaults to the system theme. Only implemented on Windows and macOS 10.14+. |
| `titleBarStyle` | TitleBarStyle | `"Visible"` | The style of the macOS title bar. |
| `trafficLightPosition` | LogicalPosition \| null | — | The position of the window controls on macOS. Requires `titleBarStyle: Overlay` and `decorations: true`. |
| `hiddenTitle` | boolean | `false` | If `true`, sets the window title to be hidden on macOS. |
| `acceptFirstMouse` | boolean | `false` | Whether clicking an inactive window also clicks through to the webview on macOS. |
| `tabbingIdentifier` | string \| null | — | Defines the window tabbing identifier for macOS. Windows with matching identifiers are grouped together. If not set, automatic tabbing is disabled. |
| `additionalBrowserArgs` | string \| null | — | Defines additional browser arguments on Windows. Webview instances with different browser arguments must also have different data directories. By default wry passes `--disable-features=msWebOOUI,msPdfOOUI,msSmartScreenProtection`, so if you set this you also need to disable these components yourself if you want. |
| `shadow` | boolean | `true` | Whether or not the window has shadow. Windows: `false` has no effect on a decorated window (shadow always on); `true` gives an undecorated window a 1px white border and, on Windows 11, rounded corners. Linux: unsupported. |
| `windowEffects` | WindowEffectsConfig \| null | — | Window effects. Requires the window to be transparent. Linux: unsupported. |
| `incognito` | boolean | `false` | Whether the webview should be launched in incognito mode. Android: unsupported. |
| `parent` | string \| null | — | Sets the window associated with this label to be the parent of the window to be created. Windows: owner window. Linux: transient for parent. macOS: added as a child window of parent. |
| `proxyUrl` | string (uri) \| null | — | The proxy URL for the WebView for all network requests. Must be either a `http://` or a `socks5://` URL. macOS: requires the `macos-proxy` feature flag and only compiles for macOS 14+. |
| `zoomHotkeysEnabled` | boolean | `false` | Whether page zooming by hotkeys is enabled. Windows: controls WebView2's `IsZoomControlEnabled`. macOS / Linux: injects a polyfill that zooms with `ctrl/command` + `-/=`, 20% per step from 20% to 1000%; requires the `webview:allow-set-webview-zoom` permission. Android / iOS: unsupported. |
| `browserExtensionsEnabled` | boolean | `false` | Whether browser extensions can be installed for the webview process. Windows only (WebView2 `AreBrowserExtensionsEnabled`). |
| `useHttpsScheme` | boolean | `false` | Whether custom protocols use `https://<scheme>.localhost` instead of `http://<scheme>.localhost` on Windows and Android. |
| `devtools` | boolean \| null | — | Enable web inspector (browser devtools). Enabled by default. Works in debug builds; requires the `devtools` feature flag in release builds. |
| `backgroundColor` | Color \| null | — | Set the window and webview background color. Windows: alpha channel is ignored for the window layer; on Windows 8+ ignored for the webview layer if non-zero. |
| `backgroundThrottling` | BackgroundThrottlingPolicy \| null | — | Change the default background throttling behaviour. Linux / Windows / Android: unsupported. iOS 17.0+, macOS 14.0+. |
| `javascriptDisabled` | boolean | `false` | Whether we should disable JavaScript code execution on the webview. |
| `allowLinkPreview` | boolean | `true` | On macOS and iOS there is a link preview on long pressing links; enabled by default. |
| `disableInputAccessoryView` | boolean | `false` | Allows disabling the input accessory view on iOS (the view above the keyboard with "Done" / "Next" buttons). |
| `dataDirectory` | string \| null | — | Custom path for the webview's data directory (localStorage, cache, etc.), relative to the local data directory (`localDataDir()`), followed by the window label. Not affected by `app > appDirectoriesOverride`. Windows: webviews with different values of `additionalBrowserArgs`, `browserExtensionsEnabled` or `scrollBarStyle` must have different data directories. macOS / iOS: unsupported, use `dataStoreIdentifier`. Android: unsupported. |
| `dataStoreIdentifier` | `integer (uint8)[16]` \| null | — | Initialize the WebView with a custom data store identifier (replacement for `dataDirectory` in WKWebView). The array must contain 16 u8 numbers. iOS 17.0+, macOS 14.0+; other platforms unsupported. |
| `scrollBarStyle` | ScrollBarStyle | `"default"` | Native scrollbar style for the webview. CSS scrollbar styles apply on top. Windows: `fluentOverlay` requires WebView2 Runtime 125.0.2535.41 or higher and must be the same for all webviews sharing a data directory. Other platforms: only `default`. |
| `limitNavigationsToAppBoundDomains` | boolean | `false` | Whether to limit navigations to App-Bound Domains (required to enable Service Workers in WKWebView). When `true`, the webview can only navigate to the domains listed in the `WKAppBoundDomains` array of `src-tauri/Info.ios.plist`; add `localhost` and every registrable domain the webview loads. iOS 14.0+; other platforms unsupported. |
| `activityName` | string \| null | — | The name of the Android activity to create for this window. |
| `createdByActivityName` | string \| null | — | The name of the Android activity that is creating this webview window; determines which stack the activity belongs to. |
| `requestedBySceneIdentifier` | string \| null | — | Sets the identifier of the scene that is requesting the new scene, establishing a relationship between the two scenes. By default the system uses the foreground scene. |
| `generalAutofillEnabled` | boolean | `true` | Controls the WebView's browser-level general autofill. Does not disable password or credit card autofill. Windows only; others perform no operation. |

### Supporting types

| Type | Definition |
| --- | --- |
| WebviewUrl | One of: external URL (`http` / `https`, string uri); path portion of an app URL (e.g. `users/john` loads `tauri://localhost/users/john`, string); custom protocol URL (e.g. `doom://index.html`, string uri). |
| PreventOverflowConfig | `boolean`, or `PreventOverflowMargin` `{ width, height }` (required, uint32 physical pixels) so that window size + margin won't overflow the workarea. |
| Theme | `"Light"` \| `"Dark"` (system theme). |
| TitleBarStyle | `"Visible"` (normal title bar) \| `"Transparent"` (transparent title bar, window background color is shown) \| `"Overlay"` (transparent overlay over content). Overlay caveats: title bar height differs across OS versions; you need a custom drag region and cannot drag when the window is not focused (tauri#4316); window title color depends on the system theme. |
| LogicalPosition | `{ x: number, y: number }` (both required). |
| WindowEffectsConfig | `{ effects: WindowEffect[] (required), state?: WindowEffectState \| null, radius?: number \| null, color?: Color \| null, interactive?: boolean (default false) }`. `effects`: conflicting effects apply the first and ignore the rest, but on macOS you can specify one Liquid Glass style and one Visual Effect material at the same time to fall back to the latter on macOS 15 and below. `state` / `radius`: macOS only (`state` ignored for Liquid Glass). `color`: Windows affects `blur` and `acrylic` only on Windows 10 v1903+; macOS affects Liquid Glass only. `interactive`: macOS 27.0+, Liquid Glass only. |
| WindowEffect | macOS (deprecated, 10.14-): `appearanceBased`, `light`, `dark`, `mediumLight`, `ultraDark`. macOS 10.10+: `titlebar`, `selection`. macOS 10.11+: `menu`, `popover`, `sidebar`. macOS 10.14+: `headerView`, `sheet`, `windowBackground`, `hudWindow`, `fullScreenUI`, `tooltip`, `contentBackground`, `underWindowBackground`, `underPageBackground`. macOS 26.0+: `liquidGlassRegular`, `liquidGlassClear`. Windows 11 only: `mica`, `micaDark` (only if system dark mode is enabled), `micaLight`, `tabbed`, `tabbedDark`, `tabbedLight`. Windows 7/10/11(22H1): `blur` (bad performance resizing/dragging on Windows 11 build 22621). Windows 10/11: `acrylic` (bad performance on Windows 10 v1903+ and Windows 11 build 22000). |
| WindowEffectState | macOS only: `followsWindowActiveState` \| `active` \| `inactive`. |
| Color | One of: hex string (`#fff`, `#ffffff`, `#ffffffff`; pattern `^#?([A-Fa-f0-9]{3}\|[A-Fa-f0-9]{6}\|[A-Fa-f0-9]{8})$`); RGB array of 3 integers 0-255; RGBA array of 4 integers 0-255; object `{ red, green, blue, alpha? }` (0-255, `alpha` default 255). |
| BackgroundThrottlingPolicy | `"disabled"` (background throttling disabled) \| `"suspend"` (a web view not in a window fully suspends tasks; usually the default if no policy is set) \| `"throttle"` (limits processing but does not fully suspend tasks). |
| ScrollBarStyle | `"default"` (platform native scrollbar; the only supported value outside Windows) \| `"fluentOverlay"` (Fluent UI style overlay scrollbars, Windows only). |

## Notes

- Default browser background throttling (see `backgroundThrottling`): browsers suspend timers and may unload the whole view after roughly 5 minutes when minimized or hidden; the policy changes this on supported platforms.
- `useHttpsScheme`: using `https` will NOT allow mixed content when fetching `http` endpoints, so it does not match the `<scheme>://localhost` protocols on macOS and Linux. Changing this value between releases changes the IndexedDB, cookies and localStorage location, and the app will not be able to access old data.
- `devtools` platform: macOS calls private functions; Android: open `chrome://inspect/#devices` in Chrome (wry devtools API unsupported); iOS: Safari > Develop > [Device] > [WebView].
- `windowEffects` on Windows with decorations or shadows: see tao issue #72 comment 975607891 for a workaround.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.WindowConfig` and referenced types).

## Related

- [AppConfig](./app-config.md)
- [Configuration (root Config)](./overview.md)

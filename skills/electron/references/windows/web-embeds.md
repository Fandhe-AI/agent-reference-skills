---
source: https://www.electronjs.org/docs/latest/tutorial/web-embeds
---

# Web Embeds (iframe, webview, WebContentsView)

If you want to embed (third-party) web content in an Electron `BrowserWindow`, there are three options available to you: `<iframe>` tags, `<webview>` tags, and `WebContentsView`. Each one offers slightly different functionality and is useful in different situations. This guide explains the differences and capabilities of each option.

## Signature / Usage

The tutorial contains no code; the minimal `WebContentsView` embedding example from the `WebContentsView` API page:

```js
const { BaseWindow, WebContentsView } = require('electron')

const win = new BaseWindow({ width: 800, height: 400 })

const view1 = new WebContentsView()
win.contentView.addChildView(view1)
view1.webContents.loadURL('https://electronjs.org')
view1.setBounds({ x: 0, y: 0, width: 400, height: 400 })
```

## Iframes

Iframes in Electron behave like iframes in regular browsers. An `<iframe>` element in your page can show external web pages, provided that their Content Security Policy allows it. To limit the number of capabilities of a site in an `<iframe>` tag, it is recommended to use the `sandbox` attribute and only allow the capabilities you want to support.

## WebViews

We do not recommend you to use WebViews, as this tag undergoes dramatic architectural changes that may affect stability of your application. Consider switching to alternatives, like `iframe` and Electron's `WebContentsView`, or an architecture that avoids embedded content by design.

WebViews are based on Chromium's WebViews and are not explicitly supported by Electron. We do not guarantee that the WebView API will remain available in future versions of Electron. To use `<webview>` tags, you will need to set `webviewTag` to `true` in the `webPreferences` of your `BrowserWindow`.

WebView is a custom element (`<webview>`) that will only work inside Electron. They are implemented as an "out-of-process iframe". This means that all communication with the `<webview>` is done asynchronously using IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that provide you with greater control over the content.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third-party content and handling various events.

## WebContentsView

`WebContentsView`s are not a part of the DOM-instead, they are created, controlled, positioned, and sized by your Main process. Using `WebContentsView`, you can combine and layer many pages together in the same `BaseWindow`.

`WebContentsView`s offer the greatest control over their contents, since they implement the `webContents` similarly to how `BrowserWindow` does it. However, as `WebContentsView`s are not elements inside the DOM, positioning them accurately with respect to DOM content requires coordination between the Main and Renderer processes.

## Notes

- Distinct from other embedded-web stacks: `<webview>` here is Electron's Chromium-based tag. For WebView2 in WinUI / Windows App SDK apps see windows-winui-controls; for browser automation of embedded content see playwright.
- `webviewTag` defaults to `false` (see [web-preferences.md](./web-preferences.md)).

## Related

- [WebContentsView](./web-contents-view.md)
- [BaseWindow overview](./base-window-overview.md)
- [WebPreferences](./web-preferences.md)
- [Opening windows from the renderer](./window-open.md)

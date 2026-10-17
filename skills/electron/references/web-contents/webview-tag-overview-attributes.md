---
source: https://www.electronjs.org/docs/latest/api/webview-tag
---

# webview tag: overview and attributes

> Display external web content in an isolated frame and process.

Process: Renderer. Use the `webview` tag to embed 'guest' content (such as web pages) in your Electron app.

## Signature / Usage

The guest content is contained within the `webview` container. An embedded page within your app controls how the guest content is laid out and rendered. Unlike an `iframe`, the `webview` runs in a separate process than your app. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.

> Most methods called on the webview from the host page require a synchronous call to the main process.

To embed a web page in your app, add the `webview` tag to your app's embedder page. In its simplest form, the `webview` tag includes the `src` of the web page and css styles that control the appearance of the `webview` container:

```html
<webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>
```

Sample code with two event listeners (loading start / stop) that displays a "loading..." message during the load time:

```html
<script>
  onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
      indicator.innerText = 'loading...'
    }

    const loadstop = () => {
      indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
  }
</script>
```

### Warning

Electron's `webview` tag is based on Chromium's `webview`, which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, a `WebContentsView`, or an architecture that avoids embedded content altogether.

### Enabling

By default the `webview` tag is disabled in Electron >= 5. You need to enable the tag by setting the `webviewTag` webPreferences option when constructing your `BrowserWindow`.

### Internal implementation

Under the hood `webview` is implemented with Out-of-Process iframes (OOPIFs). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

* When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
* You can not add keyboard, mouse, and scroll event listeners to `webview`.
* All reactions between the embedder frame and `webview` are asynchronous.

### CSS Styling Notes

The `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

## Options / Props

Tag attributes:

| Attribute | Type | Description |
| --- | --- | --- |
| `src` | string | The visible URL. Writing to this attribute initiates top-level navigation. Assigning `src` its own value will reload the current page. Can also accept data URLs, such as `data:text/plain,Hello, world!`. |
| `nodeintegration` | boolean | When present the guest page will have node integration and can use node APIs like `require` and `process`. Disabled by default in the guest page. |
| `nodeintegrationinsubframes` | boolean | Experimental option for enabling NodeJS support in sub-frames such as iframes inside the `webview`. All your preloads will load for every iframe, you can use `process.isMainFrame` to determine if you are in the main frame or not. Disabled by default. |
| `plugins` | boolean | When present the guest page will be able to use browser plugins. Disabled by default. |
| `preload` | string | A script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be `file:` (even when using `asar:` archives) because it will be loaded by Node's `require` under the hood, which treats `asar:` archives as virtual directories. When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing. |
| `httpreferrer` | string | Sets the referrer URL for the guest page. |
| `useragent` | string | Sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent. |
| `disablewebsecurity` | boolean | When present the guest page will have web security disabled. Web security is enabled by default. Can only be modified before the first navigation. |
| `partition` | string | Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. If unset, the default session of the app will be used. Can only be modified before the first navigation; subsequent attempts fail with a DOM exception. |
| `allowpopups` | boolean | When present the guest page will be allowed to open new windows, whether through `window.open()` or a link opened into a new window (for example a modifier-clicked or `target="_blank"` link). Popups are disabled by default. |
| `webpreferences` | string | Comma separated list of web preferences to be set on the webview. The full list is in the BrowserWindow constructor docs. Same format as the features string in `window.open`: a name by itself is `true`; a preference can be set with `=`; `yes` and `1` are `true`, `no` and `0` are `false`. |
| `enableblinkfeatures` | string | List of blink features to be enabled separated by `,`. The full list is in the `RuntimeEnabledFeatures.json5` file. |
| `disableblinkfeatures` | string | List of blink features to be disabled separated by `,`. The full list is in the `RuntimeEnabledFeatures.json5` file. |

Attribute examples:

```html
<webview src="https://github.com" partition="persist:github"></webview>
<webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>
<webview src="https://www.github.com/" preload="./test.js"></webview>
<!-- or if you want to load from an asar archive -->
<webview src="https://www.github.com/" preload="./app.asar/test.js"></webview>
```

## Notes

* Security-critical preferences cannot be used to make the guest less secure than its embedder. When the embedder has any of `contextIsolation`, `javascript`, `nodeIntegration`, `nodeIntegrationInWorker`, `sandbox`, `nodeIntegrationInSubFrames` or `enableWebSQL` set to its more secure value, the guest inherits that value and the corresponding `webpreferences` entry is ignored.
* Electron `<webview>` is a Chromium-based guest-embedding tag, not the Windows WebView2 control (see windows-winui-controls) and not a browser test driver (see playwright).

## Related

* [webview tag: methods](./webview-tag-methods.md)
* [webview tag: DOM events](./webview-tag-dom-events.md)
* [WebContents events: input, devtools, ipc (will-attach-webview)](./web-contents-events-input-devtools-ipc.md)

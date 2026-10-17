---
source: https://www.electronjs.org/docs/latest/api/touch-bar
---

# TouchBar (macOS)

Create TouchBar layouts for native macOS applications. Process: Main.

## Signature / Usage

```js
const { app, BrowserWindow, TouchBar } = require('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

// ... reel1, reel2, reel3, result (TouchBarLabel) and spin (TouchBarButton) defined above ...

const touchBar = new TouchBar({
  items: [
    spin,
    new TouchBarSpacer({ size: 'large' }),
    reel1,
    new TouchBarSpacer({ size: 'small' }),
    reel2,
    new TouchBarSpacer({ size: 'small' }),
    reel3,
    new TouchBarSpacer({ size: 'large' }),
    result
  ]
})

let window

app.whenReady().then(() => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 200,
    height: 200,
    backgroundColor: '#000'
  })
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

The snippet is an excerpt (imports and the final assembly) of the slot machine example in the source page; the label / button definitions are elided, see "Examples" on that page.

## Options / Props

`new TouchBar(options)` - `options` Object:

| Name | Type | Description |
| --- | --- | --- |
| items | (TouchBarButton \| TouchBarColorPicker \| TouchBarGroup \| TouchBarLabel \| TouchBarPopover \| TouchBarScrubber \| TouchBarSegmentedControl \| TouchBarSlider \| TouchBarSpacer)[] (optional) | Items of the touch bar. |
| escapeItem | one of the item classes above \| null (optional) | Item that replaces the "esc" button. |

Static properties (references to the item classes): `TouchBarButton`, `TouchBarColorPicker`, `TouchBarGroup`, `TouchBarLabel`, `TouchBarPopover`, `TouchBarScrubber`, `TouchBarSegmentedControl`, `TouchBarSlider`, `TouchBarSpacer`, `TouchBarOtherItemsProxy`.

Instance property: `touchBar.escapeItem` - a `TouchBarItem` that will replace the "esc" button on the touch bar when set. Setting to `null` restores the default "esc" button. Changing this value immediately updates the escape item in the touch bar.

## Notes

- Use `BrowserWindow.setTouchBar` to add the `TouchBar` to a window.
- The TouchBar API is currently experimental and may change or be removed in future Electron releases.
- The excerpt above omits the `spin` / `reel1`-`reel3` / `result` definitions and cannot run on its own. To run the complete slot machine example from the "Examples" section of the official page: save it as `touchbar.js`, install Electron via `npm install electron`, then run `./node_modules/.bin/electron touchbar.js`; the app appears in your touch bar (or touch bar emulator).
- Electron's built-in classes cannot be subclassed in user code.
- Distinction: macOS-only Electron API; native AppKit NSTouchBar belongs to apple-appkit.

## Related

- [TouchBar items: basic](./touch-bar-items-basic.md)
- [TouchBar items: advanced](./touch-bar-items-advanced.md)
- [BrowserWindow methods](../windows/browser-window-methods-content-taskbar.md)

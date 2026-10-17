---
source: https://www.electronjs.org/docs/latest/api/touch-bar-button
---

# TouchBar items: Button, Label, ColorPicker, Group, Popover, Spacer, OtherItemsProxy

Basic TouchBar item classes. Process: Main. None of these classes is exported from the `'electron'` module; they are reached through `TouchBar` static properties.

## Signature / Usage

```js
const { TouchBar } = require('electron')
const { TouchBarButton, TouchBarLabel, TouchBarColorPicker, TouchBarGroup, TouchBarPopover, TouchBarSpacer, TouchBarOtherItemsProxy } = TouchBar

new TouchBarButton(options)
new TouchBarLabel(options)
new TouchBarColorPicker(options)
new TouchBarGroup(options)
new TouchBarPopover(options)
new TouchBarSpacer(options)
new TouchBarOtherItemsProxy()
```

## Options / Props

TouchBarButton `options`:

| Name | Type | Description |
| --- | --- | --- |
| label | string (optional) | Button text. |
| accessibilityLabel | string (optional) | A short description of the button for use by screenreaders like VoiceOver. |
| backgroundColor | string (optional) | Button background color in hex format, i.e `#ABCDEF`. |
| icon | NativeImage \| string (optional) | Button icon. |
| iconPosition | string (optional) | `left`, `right` or `overlay`. Defaults to `overlay`. |
| click | Function (optional) | Function to call when the button is clicked. |
| enabled | boolean (optional) | Whether the button is in an enabled state. Default is `true`. |

TouchBarLabel `options`:

| Name | Type | Description |
| --- | --- | --- |
| label | string (optional) | Text to display. |
| accessibilityLabel | string (optional) | A short description for use by screenreaders like VoiceOver. |
| textColor | string (optional) | Hex color of text, i.e `#ABCDEF`. |

TouchBarColorPicker `options`:

| Name | Type | Description |
| --- | --- | --- |
| availableColors | string[] (optional) | Array of hex color strings to appear as possible colors to select. |
| selectedColor | string (optional) | The selected hex color in the picker, i.e `#ABCDEF`. |
| change | Function (optional) | Function to call when a color is selected; receives `color` string. |

TouchBarGroup `options`:

| Name | Type | Description |
| --- | --- | --- |
| items | TouchBar | Items to display as a group. |

TouchBarPopover `options`:

| Name | Type | Description |
| --- | --- | --- |
| label | string (optional) | Popover button text. |
| icon | NativeImage (optional) | Popover button icon. |
| items | TouchBar | Items to display in the popover. |
| showCloseButton | boolean (optional) | `true` to display a close button on the left of the popover, `false` to not show it. Default is `true`. |

TouchBarSpacer `options`:

| Name | Type | Description |
| --- | --- | --- |
| size | string (optional) | `small` - small space between items, maps to `NSTouchBarItemIdentifierFixedSpaceSmall` (default); `large` - maps to `NSTouchBarItemIdentifierFixedSpaceLarge`; `flexible` - take up all available space, maps to `NSTouchBarItemIdentifierFlexibleSpace`. |

Instance properties:

| Class | Property | Description |
| --- | --- | --- |
| TouchBarButton | `accessibilityLabel` | string, description read by a screen reader. Only read if no label is set. |
| TouchBarButton | `label`, `backgroundColor`, `icon` (NativeImage) | Current text / hex color / icon. Changing the value immediately updates the button. |
| TouchBarButton | `iconPosition` | string: `left`, `right` or `overlay`. Defaults to `overlay`. |
| TouchBarButton | `enabled` | boolean, whether the button is enabled. |
| TouchBarLabel | `label`, `textColor` | Current text / hex text color. Changing the value immediately updates the label. |
| TouchBarLabel | `accessibilityLabel` | string, description read by a screen reader. |
| TouchBarColorPicker | `availableColors` (string[]), `selectedColor` (string) | Changing the value immediately updates the color picker. |
| TouchBarPopover | `label`, `icon` (NativeImage) | Current popover button text / icon. Changing the value immediately updates the popover. |
| TouchBarSpacer | `size` | string: `small`, `large` or `flexible`. |

## Notes

- When defining `accessibilityLabel`, consider the macOS accessibility best practices linked in the source page.
- `TouchBarOtherItemsProxy` instantiates a special "other items proxy", which nests TouchBar elements inherited from Chromium at the space indicated by the proxy. By default, this proxy is added to each TouchBar at the end of the input. Only one instance of this class can be added per TouchBar.
- Source pages: https://www.electronjs.org/docs/latest/api/touch-bar-label , https://www.electronjs.org/docs/latest/api/touch-bar-color-picker , https://www.electronjs.org/docs/latest/api/touch-bar-group , https://www.electronjs.org/docs/latest/api/touch-bar-popover , https://www.electronjs.org/docs/latest/api/touch-bar-spacer , https://www.electronjs.org/docs/latest/api/touch-bar-other-items-proxy
- Distinction: macOS-only Electron API; native AppKit NSTouchBar items belong to apple-appkit.

## Related

- [TouchBar](./touch-bar.md)
- [TouchBar items: advanced](./touch-bar-items-advanced.md)

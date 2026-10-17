---
source: https://www.electronjs.org/docs/latest/api/touch-bar-scrubber
---

# TouchBar items: Scrubber, SegmentedControl, Slider

Advanced TouchBar item classes. Process: Main. None of these classes is exported from the `'electron'` module; they are reached through `TouchBar` static properties.

## Signature / Usage

```js
const { TouchBar } = require('electron')
const { TouchBarScrubber, TouchBarSegmentedControl, TouchBarSlider } = TouchBar

new TouchBarScrubber(options)
new TouchBarSegmentedControl(options)
new TouchBarSlider(options)
```

## Options / Props

TouchBarScrubber `options`:

| Name | Type | Description |
| --- | --- | --- |
| items | ScrubberItem[] | An array of items to place in this scrubber. |
| select | Function (optional) | Called when the user taps an item that was not the last tapped item; receives `selectedIndex` Integer. |
| highlight | Function (optional) | Called when the user taps any item; receives `highlightedIndex` Integer. |
| selectedStyle | string (optional) | `background`, `outline` or `none`. Defaults to `none`. |
| overlayStyle | string (optional) | Selected overlay item style: `background`, `outline` or `none`. Defaults to `none`. |
| showArrowButtons | boolean (optional) | Whether to show arrow buttons. Defaults to `false` and is only shown if `items` is non-empty. |
| mode | string (optional) | `fixed` or `free`. Default is `free`. |
| continuous | boolean (optional) | Defaults to `true`. |

TouchBarSegmentedControl `options`:

| Name | Type | Description |
| --- | --- | --- |
| segmentStyle | string (optional) | `automatic` (default, `NSSegmentStyleAutomatic`), `rounded`, `textured-rounded`, `round-rect`, `textured-square`, `capsule`, `small-square`, `separated` (map to the corresponding `NSSegmentStyle*`). |
| mode | string (optional) | `single` (default, `NSSegmentSwitchTrackingSelectOne`), `multiple` (`NSSegmentSwitchTrackingSelectAny`), `buttons` (`NSSegmentSwitchTrackingMomentary`; segments can be pressed and released but never marked as active). |
| segments | SegmentedControlSegment[] | An array of segments to place in this control. |
| selectedIndex | Integer (optional) | The index of the currently selected segment, updated automatically with user interaction. In `multiple` mode it is the last selected item. |
| change | Function (optional) | Called when the user selects a new segment; receives `selectedIndex` Integer and `isSelected` boolean. |

TouchBarSlider `options`:

| Name | Type | Description |
| --- | --- | --- |
| label | string (optional) | Label text. |
| value | Integer (optional) | Selected value. |
| minValue | Integer (optional) | Minimum value. |
| maxValue | Integer (optional) | Maximum value. |
| change | Function (optional) | Called when the slider is changed; receives `newValue` number. |

Structures:

| Structure | Field | Type | Description |
| --- | --- | --- | --- |
| ScrubberItem | label | string (optional) | The text to appear in this item. |
| ScrubberItem | icon | NativeImage (optional) | The image to appear in this item. |
| SegmentedControlSegment | label | string (optional) | The text to appear in this segment. |
| SegmentedControlSegment | icon | NativeImage (optional) | The image to appear in this segment. |
| SegmentedControlSegment | enabled | boolean (optional) | Whether this segment is selectable. Default: true. |

Instance properties:

| Class | Property | Description |
| --- | --- | --- |
| TouchBarScrubber | `items` | ScrubberItem[]. Updating the value immediately updates the control; updating deep properties inside the array does not update the touch bar. |
| TouchBarScrubber | `selectedStyle`, `overlayStyle` | `background` (`[NSScrubberSelectionStyle roundedBackgroundStyle]`), `outline` (`[NSScrubberSelectionStyle outlineOverlayStyle]`), `none` (removes all styles). `overlayStyle` is overlaid on top of the item instead of behind it. |
| TouchBarScrubber | `showArrowButtons` | boolean, whether to show the left / right selection arrows. |
| TouchBarScrubber | `mode` | `fixed` (`NSScrubberModeFixed`) or `free` (`NSScrubberModeFree`). |
| TouchBarScrubber | `continuous` | boolean. |
| TouchBarSegmentedControl | `segmentStyle` | string, current segment style. |
| TouchBarSegmentedControl | `segments` | SegmentedControlSegment[]. Updating deep properties inside the array does not update the touch bar. |
| TouchBarSegmentedControl | `selectedIndex` | Integer, currently selected segment; user interaction updates it automatically. |
| TouchBarSegmentedControl | `mode` | `single`, `multiple` or `buttons`. |
| TouchBarSlider | `label` (string), `value`, `minValue`, `maxValue` (number) | Changing the value immediately updates the slider. |

## Notes

- Setting properties on these items updates the touch bar immediately.
- The source pages contain no standalone code example for these classes; the Signature / Usage block lists the documented constructors only. A full TouchBar example is on the TouchBar page.
- Source pages: https://www.electronjs.org/docs/latest/api/touch-bar-segmented-control , https://www.electronjs.org/docs/latest/api/touch-bar-slider , https://www.electronjs.org/docs/latest/api/structures/scrubber-item , https://www.electronjs.org/docs/latest/api/structures/segmented-control-segment
- Distinction: macOS-only Electron API; native AppKit NSScrubber / NSSegmentedControl / NSSlider belong to apple-appkit.

## Related

- [TouchBar](./touch-bar.md)
- [TouchBar items: basic](./touch-bar-items-basic.md)

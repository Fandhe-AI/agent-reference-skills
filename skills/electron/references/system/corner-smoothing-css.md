---
source: https://www.electronjs.org/docs/latest/api/corner-smoothing-css
---

# -electron-corner-smoothing CSS rule

Smoothes out the corner rounding of the `border-radius` CSS rule.

The rounded corners of elements with the `border-radius` CSS rule can be smoothed out using the `-electron-corner-smoothing` CSS rule. This smoothness is very similar to Apple's "continuous" rounded corners in SwiftUI and Figma's "corner smoothing" control on design elements.

Integrating with the operating system and its design language is important to many desktop applications. The shape of a rounded corner can be a subtle detail to many users. However, aligning closely to the system's design language that users are familiar with makes the application's design feel familiar too. Beyond matching the design language of macOS, designers may decide to use smoother round corners for many other reasons.

`-electron-corner-smoothing` affects the shape of borders, outlines, and shadows on the target element. Mirroring the behavior of `border-radius`, smoothing will gradually back off if an element's size is too small for the chosen value.

## Signature / Usage

The following example shows the effect of corner smoothing at different percents.

```css
.box {
  width: 128px;
  height: 128px;
  background-color: cornflowerblue;
  border-radius: 24px;
  -electron-corner-smoothing: var(--percent);  /* Column header in table below. */
}
```

Documented comparison values: 0%, 30%, 60%, 100% (illustrated in the original page).

#### Matching the system UI

Use the `system-ui` keyword to match the smoothness to the OS design language.

```css
.box {
  width: 128px;
  height: 128px;
  background-color: cornflowerblue;
  border-radius: 24px;
  -electron-corner-smoothing: system-ui;  /* Match the system UI design. */
}
```

| OS: | macOS | Windows, Linux |
| --- | --- | --- |
| Value: | `60%` | `0%` |

#### Controlling availability

This CSS rule can be disabled using the Blink feature flag `ElectronCSSCornerSmoothing`.

```js
const myWindow = new BrowserWindow({
  // [...]
  webPreferences: {
    disableBlinkFeatures: 'ElectronCSSCornerSmoothing' // Disables the `-electron-corner-smoothing` CSS rule
  }
})
```

### Formal reference

* **Initial value**: `0%`
* **Inherited**: No
* **Animatable**: No
* **Computed value**: As specified

```css
-electron-corner-smoothing =
  <percentage [0,100]>  |
  system-ui
```

## Notes

* The `-electron-corner-smoothing` CSS rule is **only implemented for Electron** and has no effect in browsers. Avoid using this rule outside of Electron. This CSS rule is considered experimental and may require migration in the future if replaced by a CSS standard.
* Distinction: this is an Electron-specific CSS property, unrelated to the SwiftUI "continuous" corner style API in apple-swiftui or to Web UI component libraries (ark-ui / chakra-ui).

## Related

* WebPreferences

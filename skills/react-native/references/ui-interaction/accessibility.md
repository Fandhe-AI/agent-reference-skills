---
source: https://reactnative.dev/docs/0.87/accessibility
---

# Accessibility

Both Android and iOS provide APIs for integrating apps with assistive technologies like the bundled screen readers VoiceOver (iOS) and TalkBack (Android). React Native has complementary APIs that let your app accommodate all users. Android and iOS differ slightly in their approaches, and thus the React Native implementations may vary by platform.

## Signature / Usage

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Go back"
  accessibilityHint="Navigates to the previous screen"
  onPress={onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Back</Text>
  </View>
</TouchableOpacity>
```

Accessibility actions:

```tsx
<View
  accessible={true}
  accessibilityActions={[
    {name: 'cut', label: 'cut'},
    {name: 'copy', label: 'copy'},
    {name: 'paste', label: 'paste'},
  ]}
  onAccessibilityAction={event => {
    switch (event.nativeEvent.actionName) {
      case 'cut':
        Alert.alert('Alert', 'cut action success');
        break;
      case 'copy':
        Alert.alert('Alert', 'copy action success');
        break;
      case 'paste':
        Alert.alert('Alert', 'paste action success');
        break;
    }
  }}
/>
```

## Options / Props

| Name | Platform | Type | Description |
|------|----------|------|-------------|
| `accessible` | both | boolean | When `true`, the view is discoverable by assistive technologies. By default, all touchable elements are accessible. On Android translates into native `focusable`; on iOS into `isAccessibilityElement`. |
| `accessibilityLabel` | both | string | Verbalized by a screen reader when the element is selected. For a Touchable, defaults to the concatenation of all Text node children separated by spaces. |
| `accessibilityLabelledBy` | Android | string | Matches the `nativeID` of the related element, used to build complex forms. |
| `accessibilityHint` | both | string | Additional context on the result of the action. iOS: VoiceOver reads the hint after the label if hints are enabled in VoiceOver settings. Android: TalkBack reads the hint after the label; hints cannot be turned off. |
| `accessibilityLanguage` | iOS | string | Language for reading the label, value, and hint. Must follow BCP 47. |
| `accessibilityIgnoresInvertColors` | iOS | boolean | Set to `true` for a view (e.g. a photo) you don't want to invert when Invert Colors is on. |
| `accessibilityLiveRegion` | Android | `none` / `polite` / `assertive` | `none`: do not announce changes; `polite`: announce changes; `assertive`: interrupt ongoing speech to announce changes. |
| `accessibilityRole` | both | string | Purpose of a component: adjustable, alert, button, checkbox, combobox, header, image, imagebutton, keyboardkey, link, menu, menubar, menuitem, none, progressbar, radio, radiogroup, scrollbar, search, spinbutton, summary, switch, tab, tablist, text, timer, togglebutton, toolbar, grid. |
| `role` | both | string | Has precedence over `accessibilityRole`: alert, button, checkbox, combobox, grid, heading, img, link, list, listitem, menu, menubar, menuitem, none, presentation, progressbar, radio, radiogroup, scrollbar, searchbox, slider, spinbutton, summary, switch, tab, tablist, timer, toolbar. |
| `accessibilityShowsLargeContentViewer` | iOS | boolean | Whether the large content viewer is shown on long press. iOS 13.0 and later. |
| `accessibilityLargeContentTitle` | iOS | string | Title of the large content viewer. Requires `accessibilityShowsLargeContentViewer` to be `true`. |
| `accessibilityState` | both | object | Fields: `disabled`, `selected`, `checked` (boolean or `'mixed'`), `busy`, `expanded` (all boolean, optional). |
| `accessibilityValue` | both | object | Fields: `min` (integer, required if `now` is set), `max` (integer, required if `now` is set), `now` (integer), `text` (string; overrides min, now, max if set). |
| `accessibilityViewIsModal` | iOS | boolean | Whether VoiceOver should ignore the elements within views that are siblings of the receiver. |
| `accessibilityElementsHidden` | iOS | boolean | Whether the element and any accessibility elements it contains are hidden. Similar to Android `importantForAccessibility="no-hide-descendants"`. |
| `importantForAccessibility` | Android | `auto` / `yes` / `no` / `no-hide-descendants` | Controls if a view fires accessibility events and is reported to accessibility services. `no-hide-descendants` forces services to ignore the component and all of its children. |
| `aria-valuemax`, `aria-valuemin`, `aria-valuenow`, `aria-valuetext` | both | number / string | Range-based component values and textual description. |
| `aria-busy` | both | boolean (default false) | Element is being modified; assistive technologies may wait. |
| `aria-checked` | both | boolean, `'mixed'` (default false) | State of a checkable element. |
| `aria-disabled` | both | boolean (default false) | Perceivable but disabled. |
| `aria-expanded` | both | boolean (default false) | Expandable element is expanded or collapsed. |
| `aria-hidden` | both | boolean (default false) | Hidden from assistive technologies. |
| `aria-label` | both | string | Name for the element. |
| `aria-labelledby` | Android | string | `nativeID` of the element that labels this one. |
| `aria-live` | Android | `'assertive'` / `'off'` / `'polite'` (default `'off'`) | Live region updates. |
| `aria-modal` | iOS | boolean (default false) | Whether VoiceOver should ignore the elements within views that are siblings of the receiver. |
| `aria-selected` | both | boolean | Whether a selectable element is selected. |
| `experimental_accessibilityOrder` | both | array of `nativeID` | Order in which assistive technologies focus descendant components. Experimental. |
| `accessibilityActions` | both | array of `{name: string, label?: string}` | Actions the component supports. |
| `onAccessibilityAction` | both | function | Handles action requests; receives an event with `nativeEvent.actionName`. |
| `onAccessibilityEscape` | iOS | function | Called on the "escape" gesture, a two finger Z shaped gesture; should move back hierarchically (e.g. dismiss a modal). |
| `onAccessibilityTap` | iOS | function | Called when someone activates an accessible element by double tapping on it while selected. |
| `onMagicTap` | iOS | function | Called on the "magic tap" gesture (double-tap with two fingers); performs the most relevant action. |

Standard action names for `accessibilityActions`: `'magicTap'` (iOS only), `'escape'` (iOS only), `'activate'`, `'increment'`, `'decrement'`, `'longpress'` (Android only), `'expand'` (Android only), `'collapse'` (Android only).

## Notes

- Experimental: `experimental_accessibilityOrder` is experimental. "This API is experimental. Experimental APIs may contain bugs and are likely to change in a future version of React Native. Don't use them in production." It is exhaustive (it turns off accessibility of components it does not reference), does not turn on accessibility for referenced components, is nestable (an accessibility container referenced in the order has its default order applied, or its own `experimental_accessibilityOrder`), and a component cannot be both an accessibility container and an accessibility element (`accessible={true}`).

```tsx
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
</View>
```

- `accessible` does not necessarily mean the view will be focused by VoiceOver or TalkBack (e.g. VoiceOver disallows nested accessibility elements, TalkBack may focus a parent element instead).
- The `label` field of an action is optional for standard actions (TalkBack uses it to override the default "Double tap to activate" announcement); for custom actions it is a localized description string.
- On Android, `UIManager.sendAccessibilityEvent(findNodeHandle(this), UIManager.AccessibilityEventTypes.typeViewFocused)` triggers an accessibility event. Supported event types are `typeWindowStateChanged`, `typeViewFocused`, and `typeViewClicked`.
- Check whether a screen reader is active with the AccessibilityInfo API.
- Testing TalkBack on Android: toggle via Settings, Accessibility, TalkBack; emulators need a Google Play image to install TalkBack; or via `adb shell settings put secure enabled_accessibility_services ...`.
- Testing VoiceOver: enable on a device via Settings, General, Accessibility. VoiceOver isn't available via the simulator, but Accessibility Inspector from Xcode can use macOS VoiceOver; testing on a device is always best.

## Related

- [Handling Touches](./handling-touches.md)

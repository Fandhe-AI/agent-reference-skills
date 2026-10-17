---
source: https://reactnative.dev/docs/0.87/accessibilityinfo
---

# AccessibilityInfo

Query whether the device has an active screen reader (and other accessibility settings) and subscribe to changes.

## Signature / Usage

```tsx
const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
  'reduceMotionChanged',
  isReduceMotionEnabled => {
    setReduceMotionEnabled(isReduceMotionEnabled);
  },
);

AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
  setScreenReaderEnabled(isScreenReaderEnabled);
});

reduceMotionChangedSubscription.remove();
```

### Methods

| Method | Platform | Signature | Description |
| --- | --- | --- | --- |
| `addEventListener()` | All | `static addEventListener(eventName: AccessibilityChangeEventName \| AccessibilityAnnouncementEventName, handler: (event: AccessibilityChangeEvent \| AccessibilityAnnouncementFinishedEvent) => void): EventSubscription;` | Add an event handler. See events below. |
| `announceForAccessibility()` | All | `static announceForAccessibility(announcement: string);` | Post a string to be announced by the screen reader. |
| `announceForAccessibilityWithOptions()` | All | `static announceForAccessibilityWithOptions(announcement: string, options: {queue?: boolean; priority?: 'low' \| 'default' \| 'high'});` | Announce with modification options. By default announcements interrupt existing speech; on iOS they can be queued with `queue: true`. `priority` (iOS): high interrupts ongoing speech and cannot be interrupted; default interrupts but can be interrupted; low does not interrupt and can be interrupted. |
| `getRecommendedTimeoutMillis()` | Android | `static getRecommendedTimeoutMillis(originalTimeout: number): Promise<number>;` | Gets the timeout in milliseconds the user needs ("Time to take action (Accessibility timeout)" setting). `originalTimeout` (required) is returned if the setting is not set. |
| `isAccessibilityServiceEnabled()` | Android | `static isAccessibilityServiceEnabled(): Promise<boolean>;` | Whether any accessibility service (TalkBack and third-party) is enabled. Use `isScreenReaderEnabled` to check only TalkBack. |
| `isBoldTextEnabled()` | iOS | `static isBoldTextEnabled(): Promise<boolean>:` | Whether bold text is enabled. |
| `isGrayscaleEnabled()` | iOS | `static isGrayscaleEnabled(): Promise<boolean>;` | Whether grayscale is enabled. |
| `isInvertColorsEnabled()` | iOS | `static isInvertColorsEnabled(): Promise<boolean>;` | Whether invert colors is enabled. |
| `isReduceMotionEnabled()` | All | `static isReduceMotionEnabled(): Promise<boolean>;` | Whether reduce motion is enabled. |
| `isReduceTransparencyEnabled()` | iOS | `static isReduceTransparencyEnabled(): Promise<boolean>;` | Whether reduce transparency is enabled. |
| `isScreenReaderEnabled()` | All | `static isScreenReaderEnabled(): Promise<boolean>;` | Whether a screen reader is enabled. |
| `isHighTextContrastEnabled()` | Android | `static isHighTextContrastEnabled(): Promise<boolean>` | Whether high text contrast is enabled. |
| `isDarkerSystemColorsEnabled()` | iOS | `static isDarkerSystemColorsEnabled(): Promise<boolean>` | Whether dark system colors is enabled. |
| `prefersCrossFadeTransitions()` | iOS | `static prefersCrossFadeTransitions(): Promise<boolean>;` | Whether reduce motion and prefer cross-fade transitions settings are enabled. |
| `setAccessibilityFocus()` | All | `static setAccessibilityFocus(reactTag: number);` | Deprecated. Set accessibility focus to a React component. |
| `sendAccessibilityEvent()` | All | `static sendAccessibilityEvent(host: HostInstance, eventType: AccessibilityEventTypes);` | Imperatively trigger an accessibility event on a component. `host` (required): the component ref. `eventType` (required): one of `'click'` (Android only), `'focus'`, `'viewHoverEnter'` (Android only), or `'windowStateChange'` (Android only). |

#### Events (`addEventListener`)

| Event name | Platform | Description |
| --- | --- | --- |
| `accessibilityServiceChanged` | Android | Fires when services such as TalkBack, other assistive technologies, and third-party accessibility services are enabled. Handler argument is a boolean (`true` when some accessibility service is enabled). |
| `announcementFinished` | iOS | Fires when the screen reader has finished an announcement. Argument is a dictionary: `announcement` (the string announced) and `success` (boolean, whether the announcement was made). |
| `boldTextChanged` | iOS | Bold text toggle changed. Argument is a boolean. |
| `grayscaleChanged` | iOS | Gray scale toggle changed. Argument is a boolean. |
| `invertColorsChanged` | iOS | Invert colors toggle changed. Argument is a boolean. |
| `reduceMotionChanged` | All | Reduce motion toggle changed (or "Transition Animation Scale" in "Developer options" is "Animation off"). Argument is a boolean. |
| `reduceTransparencyChanged` | iOS | Reduce transparency toggle changed. Argument is a boolean. |
| `screenReaderChanged` | All | Screen reader state changed. Argument is a boolean. |

## Notes

- Deprecated: `setAccessibilityFocus()`. "Prefer using `sendAccessibilityEvent` with eventType `focus` instead." On Android it calls `UIManager.sendAccessibilityEvent` with the passed `reactTag` and `UIManager.AccessibilityEventTypes.typeViewFocused`.
- Make sure that any `View` you want to receive the accessibility focus has `accessible={true}` (applies to `setAccessibilityFocus` and `sendAccessibilityEvent`).
- Since 0.85: `AccessibilityInfo.setAccessibilityFocus` deprecated in favor of `AccessibilityInfo.sendAccessibilityEvent` ([0.85 release blog](https://reactnative.dev/blog/2026/04/07/react-native-0.85)).
- Since 0.86: `isDarkerSystemColorsEnabled`, `isHighTextContrastEnabled` and `prefersCrossFadeTransitions` previously returned promises that never resolved on unsupported platforms; they now resolve to `false` ([0.86 release blog](https://reactnative.dev/blog/2026/06/11/react-native-0.86)).

## Related

- [AppState](./appstate.md)
- [Appearance](./appearance.md)

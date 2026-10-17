---
source: https://reactnative.dev/docs/0.87/view
---

# View

The most fundamental component for building a UI. A container that supports layout with flexbox, style, some touch handling, and accessibility controls.

## Signature / Usage

`View` maps directly to the native view equivalent on whatever platform React Native is running on, whether that is a `UIView`, `<div>`, `android.view`, etc. It is designed to be nested inside other views and can have 0 to many children of any type.

```tsx
import {View, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ViewBoxesWithColorAndText = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flexDirection: 'row'}}>
        <View style={{height: 100, backgroundColor: 'blue', flex: 0.2}} />
        <View style={{height: 100, backgroundColor: 'red', flex: 0.4}} />
        <Text>Hello World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewBoxesWithColorAndText;
```

For `View` responder props (e.g., `onResponderMove`), the synthetic touch event passed to them is in the form of PressEvent.

## Options / Props

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| accessibilityActions | array | | | List of action objects (each with name and label) an assistive technology can programmatically invoke. |
| accessibilityElementsHidden | bool | `false` | iOS | Whether the given accessibility element, and any accessibility elements it contains, are hidden. |
| accessibilityHint | string | | | Helps users understand what will happen when they perform an action when that result is not clear from the label. |
| accessibilityLanguage | string | | iOS | Language used by the screen reader. Should follow the BCP 47 specification. |
| accessibilityIgnoresInvertColors | bool | | iOS | `true` tells the view not to be inverted even if color inversion is turned on. |
| accessibilityLabel | string | | | Overrides the text read by the screen reader. By default, the label is constructed by traversing all the children and accumulating all the `Text` nodes separated by space. |
| accessibilityLiveRegion | enum('none', 'polite', 'assertive') | | Android | Whether the user should be notified when this view changes. Android API >= 19 only. `none`: do not announce; `polite`: announce; `assertive`: interrupt ongoing speech. |
| accessibilityRole | string | | | Purpose of the component for assistive technology. One of `'none'`, `'button'`, `'link'`, `'search'`, `'image'`, `'keyboardkey'`, `'text'`, `'adjustable'`, `'imagebutton'`, `'header'`, `'summary'`, `'alert'`, `'checkbox'`, `'combobox'`, `'menu'`, `'menubar'`, `'menuitem'`, `'progressbar'`, `'radio'`, `'radiogroup'`, `'scrollbar'`, `'spinbutton'`, `'switch'`, `'tab'`, `'tablist'`, `'timer'`, `'toolbar'`, `'grid'` (used with ScrollView, VirtualizedList, FlatList, or SectionList to represent a grid; adds the in/out of grid announcements to the android GridView). |
| accessibilityState | object: `{disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool}` | | | Current state of a component to the user of an assistive technology. |
| accessibilityValue | object: `{min: number, max: number, now: number, text: string}` | | | Current value of a component (textual description, or range information). |
| accessibilityViewIsModal | bool | `false` | iOS | Whether VoiceOver should ignore the elements within views that are siblings of the receiver. |
| accessible | bool | | | When `true`, indicates that the view is an accessibility element discoverable by assistive technologies. By default, all the touchable elements are accessible. |
| aria-busy | boolean | false | | An element is being modified; assistive technologies may wait until changes are complete. |
| aria-checked | boolean, 'mixed' | false | | State of a checkable element. |
| aria-disabled | boolean | false | | Element is perceivable but disabled. |
| aria-expanded | boolean | false | | Whether an expandable element is expanded or collapsed. |
| aria-hidden | boolean | false | | Whether the element is hidden from assistive technologies. |
| aria-label | string | | | A string value that labels an interactive element. |
| aria-labelledby | string | | Android | Identifies the element that labels this element; should match the `nativeID` of the related element. |
| aria-live | enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` | Android | Types of updates the user can expect from the live region. |
| aria-modal | boolean | false | iOS | Whether VoiceOver should ignore the elements within sibling views. Has precedence over `accessibilityViewIsModal`. |
| aria-selected | boolean | | | Whether a selectable element is currently selected. |
| aria-valuemax | number | | | Maximum value for range-based components. Has precedence over `max` in `accessibilityValue`. |
| aria-valuemin | number | | | Minimum value for range-based components. Has precedence over `min` in `accessibilityValue`. |
| aria-valuenow | number | | | Current value for range-based components. Has precedence over `now` in `accessibilityValue`. |
| aria-valuetext | string | | | Textual description of the component. Has precedence over `text` in `accessibilityValue`. |
| collapsable | boolean | true | | Views that only lay out their children or don't draw anything may be automatically removed from the native hierarchy as an optimization. Set to `false` to disable this and ensure this `View` exists in the native view hierarchy. |
| collapsableChildren | boolean | true | | Setting to false prevents direct children from being removed from the native view hierarchy, like setting `collapsable={false}` on each child. |
| experimental_accessibilityOrder | array of strings | | | Experimental. The order in which an assistive technology focuses descendants of this `View`; each string is a `nativeID` of a descendant. Does not enable accessibility itself (each referenced component must have `accessible` true). Nestable and exhaustive: a non-accessible referenced component has its descendants focused in default order; an otherwise accessible component not referenced (directly or nested within a referenced container) will not be accessible. |
| focusable | boolean | | Android | Whether this `View` should be focusable with a non-touch input device, e.g. a hardware keyboard. |
| hitSlop | object: `{top: number, left: number, bottom: number, right: number}` | | | How far a touch event can start away from the view. Typical guidelines recommend touch targets at least 30 - 40 points/density-independent pixels. |
| id | string | | | Used to locate this view from native classes. Has precedence over `nativeID`. Disables the 'layout-only view removal' optimization for this view. |
| importantForAccessibility | enum('auto', 'yes', 'no', 'no-hide-descendants') | `'auto'` | Android | How important the view is for accessibility. `auto`: system determines (recommended); `yes`; `no`; `no-hide-descendants`: neither the view nor any descendant is important. |
| nativeID | string | | | Used to locate this view from native classes. Disables the 'layout-only view removal' optimization for this view. |
| needsOffscreenAlphaCompositing | bool | `false` | | Whether this `View` is rendered offscreen and composited with an alpha to preserve 100% correct colors and blending. Extremely expensive and hard to debug for non-native developers, so off by default; if needed for an animation with static contents, consider combining with `renderToHardwareTextureAndroid`. |
| nextFocusDown | number | | Android | Next view to receive focus when the user navigates down. |
| nextFocusForward | number | | Android | Next view to receive focus when the user navigates forward. |
| nextFocusLeft | number | | Android | Next view to receive focus when the user navigates left. |
| nextFocusRight | number | | Android | Next view to receive focus when the user navigates right. |
| nextFocusUp | number | | Android | Next view to receive focus when the user navigates up. |
| onAccessibilityAction | function | | | Invoked when the user performs the accessibility actions. The only argument is an event containing the name of the action. |
| onAccessibilityEscape | function | | iOS | When `accessible` is `true`, invoked when the user performs the escape gesture. |
| onAccessibilityTap | function | | iOS | When `accessible` is true, invoked when the user performs the accessibility tap gesture. |
| onLayout | `({nativeEvent: LayoutEvent}) => void` | | | Invoked on mount and on layout changes. Fired once the layout has been calculated, but the new layout may not yet be reflected on screen (especially if a layout animation is in progress). |
| onMagicTap | function | | iOS | When `accessible` is `true`, invoked when the user performs the magic tap gesture. |
| onMoveShouldSetResponder | `({nativeEvent: PressEvent}) => boolean` | | | Does this view want to "claim" touch responsiveness? Called for every touch move on the `View` when it is not the responder. |
| onMoveShouldSetResponderCapture | `({nativeEvent: PressEvent}) => boolean` | | | If a parent `View` wants to prevent a child from becoming responder on a move, it should have this handler return `true`. |
| onResponderGrant | `({nativeEvent: PressEvent}) => void or boolean` | | | The View is now responding for touch events. On Android, return true to prevent any other native components from becoming responder until this responder terminates. |
| onResponderMove | `({nativeEvent: PressEvent}) => void` | | | The user is moving their finger. |
| onResponderReject | `({nativeEvent: PressEvent}) => void` | | | Another responder is already active and will not release it to that `View`. |
| onResponderRelease | `({nativeEvent: PressEvent}) => void` | | | Fired at the end of the touch. |
| onResponderTerminate | `({nativeEvent: PressEvent}) => void` | | | The responder has been taken from the `View` (by other views after `onResponderTerminationRequest`, or by the OS without asking, e.g. control center/notification center on iOS). |
| onResponderTerminationRequest | `({nativeEvent: PressEvent}) => void` | | | Some other `View` wants to become responder; returning `true` allows its release. |
| onStartShouldSetResponder | `({nativeEvent: PressEvent}) => boolean` | | | Does this view want to become responder on the start of a touch? |
| onStartShouldSetResponderCapture | `({nativeEvent: PressEvent}) => boolean` | | | If a parent wants to prevent a child from becoming responder on a touch start, it should have this handler return `true`. |
| pointerEvents | enum('box-none', 'none', 'box-only', 'auto') | | | Whether the `View` can be the target of touch events. `auto`: can be the target. `none`: never the target. `box-none`: never the target but its subviews can be (CSS `pointer-events: none` on the view, `auto` on its descendants). `box-only`: can be the target but its subviews cannot. |
| ref | ref setter | | | A ref setter that will be assigned an element node when mounted. |
| removeClippedSubviews | bool | | | Reserved performance property exposed by `RCTView`, useful for scrolling content with many offscreen subviews. Subviews must have `overflow: hidden`, as should the containing view (or one of its superviews). |
| renderToHardwareTextureAndroid | bool | | Android | Whether this `View` renders itself (and all its children) into a single hardware texture on the GPU. Useful for animations that only modify opacity, rotation, translation, and/or scale; can use up limited video memory, so set it back to false at the end of the animation. |
| role | Role | | | Purpose of a component to assistive technology. Has precedence over `accessibilityRole`. |
| shouldRasterizeIOS | bool | | iOS | Whether this `View` is rendered as a bitmap before compositing. Incurs an off-screen drawing pass and the bitmap consumes memory; test and measure. |
| style | View Style | | | View style. |
| tabIndex | enum(0, -1) | | Android | Whether this `View` should be focusable with a non-touch input device. `0`: focusable; `-1`: not focusable. |
| testID | string | | | Used to locate this view in end-to-end tests. Disables the 'layout-only view removal' optimization for this view. |

## Notes

- `View`s are designed to be used with StyleSheet for clarity and performance, although inline styles are also supported.
- The `hitSlop` touch area never extends past the parent view bounds, and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.
- `experimental_accessibilityOrder` is experimental: "Experimental APIs may contain bugs and are likely to change in a future version of React Native. Don't use them in production."
- This is the React Native core `View` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit (`UIView`), android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- PressEvent
- LayoutEvent
- View Style Props
- [Text](./text.md)
- Accessibility

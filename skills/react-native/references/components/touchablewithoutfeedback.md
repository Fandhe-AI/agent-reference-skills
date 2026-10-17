---
source: https://reactnative.dev/docs/0.87/touchablewithoutfeedback
---

# TouchableWithoutFeedback

Wrapper that responds to touches without any visual feedback. "Do not use unless you have a very good reason. All elements that respond to press should have a visual feedback when touched."

## Signature / Usage

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableWithoutFeedback>;
```

## Options / Props

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| accessibilityIgnoresInvertColors | Boolean | | iOS | Whether this view should or should not be inverted when color inversion is turned on. `true` tells the view not to be inverted. |
| accessible | bool | | | When `true`, indicates that the view is an accessibility element. By default, all the touchable elements are accessible. |
| accessibilityLabel | string | | | Overrides the text read by the screen reader. By default, the label is constructed by traversing all the children and accumulating all the `Text` nodes separated by space. |
| accessibilityLanguage | string | | iOS | Language used by the screen reader. Should follow the BCP 47 specification. |
| accessibilityHint | string | | | Helps users understand what will happen when they perform an action on the element when that result is not clear from the label. |
| accessibilityRole | string | | | Communicates the purpose of a component to the user of an assistive technology. One of: `'none'`, `'button'`, `'link'`, `'search'`, `'image'`, `'keyboardkey'`, `'text'`, `'adjustable'`, `'imagebutton'`, `'header'`, `'summary'`, `'alert'`, `'checkbox'`, `'combobox'`, `'menu'`, `'menubar'`, `'menuitem'`, `'progressbar'`, `'radio'`, `'radiogroup'`, `'scrollbar'`, `'spinbutton'`, `'switch'`, `'tab'`, `'tablist'`, `'timer'`, `'toolbar'`. |
| accessibilityState | object: `{disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool}` | | | Describes the current state of a component to the user of an assistive technology. |
| accessibilityActions | array | | | List of action objects (each with name and label) that an assistive technology can programmatically invoke. |
| aria-busy | boolean | false | | Indicates an element is being modified and assistive technologies may want to wait until the changes are complete. |
| aria-checked | boolean, 'mixed' | false | | State of a checkable element. |
| aria-disabled | boolean | false | | Element is perceivable but disabled. |
| aria-expanded | boolean | false | | Whether an expandable element is currently expanded or collapsed. |
| aria-hidden | boolean | false | | Whether the element is hidden from assistive technologies. |
| aria-label | string | | | A string value that labels an interactive element. |
| aria-live | enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` | Android | Element will be updated; describes the types of updates the user can expect. off: do not announce; polite: announce changes; assertive: interrupt ongoing speech to announce. |
| aria-modal | boolean | false | iOS | Whether VoiceOver should ignore the elements within views that are siblings of the receiver. Has precedence over `accessibilityViewIsModal`. |
| aria-selected | boolean | | | Whether a selectable element is currently selected or not. |
| onAccessibilityAction | function | | | Invoked when the user performs the accessibility actions. The only argument is an event containing the name of the action. |
| accessibilityValue | object: `{min: number, max: number, now: number, text: string}` | | | Current value of a component (textual description, or range information). |
| aria-valuemax | number | | | Maximum value for range-based components. Has precedence over `max` in `accessibilityValue`. |
| aria-valuemin | number | | | Minimum value for range-based components. Has precedence over `min` in `accessibilityValue`. |
| aria-valuenow | number | | | Current value for range-based components. Has precedence over `now` in `accessibilityValue`. |
| aria-valuetext | string | | | Textual description of the component. Has precedence over `text` in `accessibilityValue`. |
| delayLongPress | number | | | Duration (ms) from `onPressIn` before `onLongPress` is called. |
| delayPressIn | number | | | Duration (ms), from the start of the touch, before `onPressIn` is called. |
| delayPressOut | number | | | Duration (ms), from the release of the touch, before `onPressOut` is called. |
| disabled | bool | | | If true, disable all interactions for this component. |
| hitSlop | Rect or number | | | How far your touch can start away from the button. Added to `pressRetentionOffset` when moving off of the button. |
| id | string | | | Used to locate this view from native code. Has precedence over `nativeID` prop. |
| onBlur | `({nativeEvent: TargetEvent}) => void` | | | Invoked when the item loses focus. |
| onFocus | `({nativeEvent: TargetEvent}) => void` | | | Invoked when the item receives focus. |
| onLayout | `({nativeEvent: LayoutEvent}) => void` | | | Invoked on mount and on layout changes. |
| onLongPress | function | | | Called if the time after `onPressIn` lasts longer than 370 milliseconds. Customizable with `delayLongPress`. |
| onPress | function | | | Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock). The first argument is a PressEvent. |
| onPressIn | function | | | Called as soon as the touchable element is pressed, even before onPress. Can be useful when making network requests. First argument is a PressEvent. |
| onPressOut | function | | | Called as soon as the touch is released, even before onPress. First argument is a PressEvent. |
| pressRetentionOffset | Rect or number | | | When the scroll view is disabled, how far your touch may move off of the button before deactivating it. Pass in a constant to reduce memory allocations. |
| nativeID | string | | | Native identifier. |
| testID | string | | | Used to locate this view in end-to-end tests. |
| touchSoundDisabled | Boolean | | Android | If true, doesn't play a system sound on touch. |

## Notes

- For a more extensive and future-proof way to handle touch-based input, use the Pressable API.
- `TouchableWithoutFeedback` supports only one child. To have several child components, wrap them in a View.
- It works by cloning its child and applying responder props to it, so any intermediary components must pass those props through to the underlying React Native component.
- The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Pressable](./pressable.md)
- [PressEvent](../props-types/pressevent.md)
- [Rect](../props-types/rect.md)
- [LayoutEvent](../props-types/layoutevent.md)
- [TargetEvent](../props-types/targetevent.md)

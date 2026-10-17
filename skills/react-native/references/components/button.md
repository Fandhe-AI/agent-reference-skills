---
source: https://reactnative.dev/docs/0.87/button
---

# Button

A basic button component that should render nicely on any platform. Supports a minimal level of customization.

## Signature / Usage

```tsx
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## Options / Props

| Name | Type | Default | Platform | Required | Description |
| --- | --- | --- | --- | --- | --- |
| onPress | `({nativeEvent: PressEvent}) => void` | | | Yes | Handler to be called when the user taps the button. |
| title | string | | | Yes | Text to display inside the button. On Android the given title will be converted to the uppercased form. |
| accessibilityLabel | string | | | No | Text to display for blindness accessibility features. |
| accessibilityLanguage | string | | iOS | No | A value indicating which language should be used by the screen reader when the user interacts with the element. It should follow the BCP 47 specification. |
| accessibilityActions | array | | | No | Accessibility actions allow an assistive technology to programmatically invoke the actions of a component. Each action object should contain the field name and label. |
| onAccessibilityAction | function | | | No | Invoked when the user performs the accessibility actions. The only argument is an event containing the name of the action to perform. |
| color | color | `'#2196F3'` on Android; `'#007AFF'` on iOS | | No | Color of the text (iOS), or background color of the button (Android). |
| disabled | bool | `false` | | No | If `true`, disable all interactions for this component. |
| hasTVPreferredFocus | bool | `false` | TV | No | TV preferred focus. |
| nextFocusDown | number | | Android, TV | No | Designates the next view to receive focus when the user navigates down. |
| nextFocusForward | number | | Android, TV | No | Designates the next view to receive focus when the user navigates forward. |
| nextFocusLeft | number | | Android, TV | No | Designates the next view to receive focus when the user navigates left. |
| nextFocusRight | number | | Android, TV | No | Designates the next view to receive focus when the user navigates right. |
| nextFocusUp | number | | Android, TV | No | Designates the next view to receive focus when the user navigates up. |
| testID | string | | | No | Used to locate this view in end-to-end tests. |
| touchSoundDisabled | boolean | `false` | Android | No | If `true`, doesn't play system sound on touch. |

## Notes

- If this button doesn't look right for your app, build your own button using Pressable.
- Example from the original page: on iOS the `color` prop controls the color of the text; on Android it adjusts the background color of the button.
- This is the React Native core `Button` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Pressable](./pressable.md)
- [TouchableOpacity](./touchableopacity.md)
- [PressEvent](../props-types/pressevent.md)

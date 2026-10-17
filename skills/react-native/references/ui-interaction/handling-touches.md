---
source: https://reactnative.dev/docs/0.87/handling-touches
---

# Handling Touches

Users interact with mobile apps mainly through touch. React Native provides components to handle all sorts of common gestures, as well as a comprehensive gesture responder system for more advanced gesture recognition. The component you will most likely use is the basic `Button`.

## Signature / Usage

```tsx
<Button
  onPress={() => {
    console.log('You tapped the button!');
  }}
  title="Press Me"
/>
```

This renders a blue label on iOS, and a blue rounded rectangle with light text on Android. You can specify a `color` prop to change the color of your button.

Touchables with a long press:

```tsx
<TouchableHighlight
  onPress={onPressButton}
  onLongPress={onLongPressButton}
  underlayColor="white">
  <View style={styles.button}>
    <Text style={styles.buttonText}>Touchable with Long Press</Text>
  </View>
</TouchableHighlight>
```

## Options / Props

| Component | Feedback |
|-----------|----------|
| `TouchableHighlight` | Generally use anywhere you would use a button or link on web. The view's background will be darkened when the user presses down. |
| `TouchableNativeFeedback` | Android: ink surface reaction ripples that respond to the user's touch. |
| `TouchableOpacity` | Reduces the opacity of the button, allowing the background to be seen through while pressing. |
| `TouchableWithoutFeedback` | Handle a tap gesture without any feedback displayed. |

## Notes

- Touchable components capture tapping gestures and can display feedback, but provide no default styling. Long presses can be handled by passing a function to the `onLongPress` prop of any of the Touchable components.
- For swipes and pans (scrolling through a list of items, or swiping through pages), see the ScrollView Core Component.
- Known issue (react-native#29308): The touch area never extends past the parent view bounds and on Android negative margin is not supported.
- 0.88: Web-based event dispatching is the default. React Native now dispatches events through the W3C `EventTarget` API instead of the plugin-based system. The release blog states nothing should change for apps: event props keep the same names, receive the same synthetic event objects, and the touch responder system is unchanged. The imperative `addEventListener` / `removeEventListener` / `dispatchEvent` API on native refs is exposed only on the Canary channel in 0.88.

## Related

- [Gesture Responder System](./gesture-responder-system.md)
- [PanResponder](./panresponder.md)
- [Button](../components/button.md)
- [TouchableHighlight](../components/touchablehighlight.md)
- [TouchableOpacity](../components/touchableopacity.md)
- [TouchableNativeFeedback](../components/touchablenativefeedback.md)
- [TouchableWithoutFeedback](../components/touchablewithoutfeedback.md)
- [ScrollView](../components/scrollview.md)

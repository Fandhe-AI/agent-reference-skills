---
source: https://reactnative.dev/docs/0.87/touchablehighlight
---

# TouchableHighlight

A wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, which allows the underlay color to show through, darkening or tinting the view.

## Signature / Usage

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDDDD"
  onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableHighlight>;
```

## Options / Props

Inherits [TouchableWithoutFeedback Props](./touchablewithoutfeedback.md#options--props).

| Name | Type | Platform | Description |
| --- | --- | --- | --- |
| activeOpacity | number | | Opacity of the wrapped view when touch is active. Between 0 and 1. Defaults to 0.85. Requires `underlayColor` to be set. |
| onHideUnderlay | function | | Called immediately after the underlay is hidden. |
| onShowUnderlay | function | | Called immediately after the underlay is shown. |
| ref | ref setter | | A ref setter that will be assigned an element node when mounted. |
| style | View.style | | Style of the view. |
| underlayColor | color | | The color of the underlay that will show through when the touch is active. |
| hasTVPreferredFocus | bool | iOS | (Apple TV only) TV preferred focus (see documentation for the View component). |
| nextFocusDown | number | Android | TV next focus down (see documentation for the View component). |
| nextFocusForward | number | Android | TV next focus forward. |
| nextFocusLeft | number | Android | TV next focus left. |
| nextFocusRight | number | Android | TV next focus right. |
| nextFocusUp | number | Android | TV next focus up. |
| testOnly_pressed | bool | | Handy for snapshot tests. |

## Notes

- For a more extensive and future-proof way to handle touch-based input, use the Pressable API.
- The underlay comes from wrapping the child in a new View, which can affect layout, and sometimes cause unwanted visual artifacts if the backgroundColor of the wrapped view isn't explicitly set to an opaque color.
- `TouchableHighlight` must have one child (not zero or more than one). To have several child components, wrap them in a View.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Pressable](./pressable.md)
- [TouchableWithoutFeedback](./touchablewithoutfeedback.md)
- [TouchableOpacity](./touchableopacity.md)

---
source: https://reactnative.dev/docs/0.87/pressable
---

# Pressable

A Core Component wrapper that can detect various stages of press interactions on any of its defined children.

## Signature / Usage

```tsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

Fuller example:

```tsx
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => {
            setTimesPressed(current => current + 1);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
          )}
        </Pressable>
        <View style={styles.logBox}>
          <Text testID="pressable_press_console">{textLog}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default App;
```

### How it works

On an element wrapped by `Pressable`:

- `onPressIn` is called when a press is activated.
- `onPressOut` is called when the press gesture is deactivated.

After pressing `onPressIn`, one of two things will happen:

1. The person will remove their finger, triggering `onPressOut` followed by `onPress`.
2. If the person leaves their finger longer than 500 milliseconds before removing it, `onLongPress` is triggered. (`onPressOut` will still fire when they remove their finger.)

`Pressable` has an optional `HitRect` you can use to define how far a touch can register away from the wrapped element; presses can start anywhere within a `HitRect`. `PressRect` allows presses to move beyond the element and its `HitRect` while maintaining activation and being eligible for a "press". Set `HitRect` with `hitSlop` and `PressRect` with `pressRetentionOffset`.

## Options / Props

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| android_disableSound | boolean | `false` | Android | If true, doesn't play Android system sound on press. |
| android_ripple | RippleConfig | | Android | Enables the Android ripple effect and configures its properties. The `color` field accepts both plain colors and `PlatformColor` values (e.g. `?attr/colorAccent`); with a `PlatformColor` the ripple is automatically updated when the system configuration changes (e.g. light/dark mode). |
| children | React Node | | | Either children or a function that receives a boolean reflecting whether the component is currently pressed. |
| unstable_pressDelay | number | | | Duration (in milliseconds) to wait after press down before calling `onPressIn`. |
| delayLongPress | number | `500` | | Duration (in milliseconds) from `onPressIn` before `onLongPress` is called. |
| disabled | boolean | `false` | | Whether the press behavior is disabled. |
| hitSlop | Rect or number | | | Sets additional distance outside of element in which a press can be detected. |
| onHoverIn | `({ nativeEvent: MouseEvent }) => void` | | | Called when the hover is activated to provide visual feedback. |
| onHoverOut | `({ nativeEvent: MouseEvent }) => void` | | | Called when the hover is deactivated to undo visual feedback. |
| onLongPress | `({nativeEvent: PressEvent}) => void` | | | Called if the time after `onPressIn` lasts longer than 500 milliseconds. Customizable with `delayLongPress`. |
| onPress | `({nativeEvent: PressEvent}) => void` | | | Called after `onPressOut`. |
| onPressIn | `({nativeEvent: PressEvent}) => void` | | | Called immediately when a touch is engaged, before `onPressOut` and `onPress`. |
| onPressMove | `({nativeEvent: PressEvent}) => void` | | | Called when the press location moves. |
| onPressOut | `({nativeEvent: PressEvent}) => void` | | | Called when a touch is released. |
| pressRetentionOffset | Rect or number | `{bottom: 30, left: 20, right: 20, top: 20}` | | Additional distance outside of this view in which a touch is considered a press before `onPressOut` is triggered. |
| style | View Style or `({ pressed: boolean }) => View Style` | | | Either view styles or a function that receives a boolean reflecting whether the component is currently pressed and returns view styles. |
| testOnly_pressed | boolean | `false` | | Used only for documentation or testing (e.g. snapshot testing). |

### RippleConfig

Ripple effect configuration for the `android_ripple` property (type: object).

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| color | color or PlatformColor | No | Defines the color of the ripple effect. |
| borderless | boolean | No | Defines if ripple effect should not include border. |
| radius | number | No | Defines the radius of the ripple effect. |
| foreground | boolean | No | Set to true to add the ripple effect to the foreground of the view, instead of the background. Useful if one of your child views has a background of its own, or you're e.g. displaying images, and you don't want the ripple to be covered by them. |
| alpha | number | No | Controls the opacity of the ripple. Accepts a value between `0.0` (fully transparent) and `1.0` (fully opaque). The value is applied on top of any alpha already present in the color. |

## Notes

- The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.
- `Pressable` uses React Native's `Pressability` API.
- This is the React Native core `Pressable` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- PressEvent
- Rect
- View Style Props
- [TouchableOpacity](./touchableopacity.md)
- [TouchableHighlight](./touchablehighlight.md)

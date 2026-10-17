---
source: https://reactnative.dev/docs/0.87/touchablenativefeedback
---

# TouchableNativeFeedback

A wrapper for making views respond properly to touches (Android only). On Android this component uses native state drawable to display touch feedback.

## Signature / Usage

```tsx
import {useState} from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [rippleColor, setRippleColor] = useState(randomHexColor());
  const [rippleOverflow, setRippleOverflow] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => {
            setRippleColor(randomHexColor());
            setRippleOverflow(!rippleOverflow);
          }}
          background={TouchableNativeFeedback.Ripple(
            rippleColor,
            rippleOverflow,
          )}>
          <View style={styles.touchable}>
            <Text style={styles.text}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function () {
    return Math.round(Math.random() * 16).toString(16);
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  touchable: {
    flex: 0.33,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default App;
```

## Options / Props

Inherits [TouchableWithoutFeedback Props](./touchablewithoutfeedback.md#options--props).

| Name | Type | Platform | Description |
| --- | --- | --- | --- |
| background | backgroundPropType | | Determines the type of background drawable used to display feedback. Takes an object with a `type` property and extra data depending on the `type`. It is recommended to use one of the static methods to generate that dictionary. |
| useForeground | bool | | Set to true to add the ripple effect to the foreground of the view, instead of the background. Check `TouchableNativeFeedback.canUseNativeForeground()` first, as this is only available on Android 6.0 and above; on older versions you will get a warning and fallback to background. |
| hasTVPreferredFocus | bool | Android | TV preferred focus (see documentation for the View component). |
| nextFocusDown | number | Android | TV next focus down (see documentation for the View component). |
| nextFocusForward | number | Android | TV next focus forward. |
| nextFocusLeft | number | Android | TV next focus left. |
| nextFocusRight | number | Android | TV next focus right. |
| nextFocusUp | number | Android | TV next focus up. |

### Methods

```tsx
static SelectableBackground(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;

static SelectableBackgroundBorderless(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;

static Ripple(
  color: ColorValue,
  borderless: boolean,
  rippleRadius?: number | null,
): RippleBackgroundPropType;

static canUseNativeForeground(): boolean;
```

| Method | Description |
| --- | --- |
| SelectableBackground() | Creates an object that represents android theme's default background for selectable elements (`?android:attr/selectableItemBackground`). `rippleRadius` controls the radius of the ripple effect. |
| SelectableBackgroundBorderless() | Creates an object that represents android theme's default background for borderless selectable elements (`?android:attr/selectableItemBackgroundBorderless`). Available on android API level 21+. |
| Ripple() | Creates an object that represents ripple drawable with specified color (as a string). If `borderless` evaluates to true the ripple will render outside of the view bounds. Available on Android API level 21+. |
| canUseNativeForeground() | Returns whether the foreground ripple can be used. |

`Ripple()` parameters:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| color | string | Yes | The ripple color |
| borderless | boolean | Yes | If the ripple can render outside its bounds |
| rippleRadius | ?number | No | controls the radius of the ripple effect |

## Notes

- Android only. For a more extensive and future-proof way to handle touch-based input, use the Pressable API (see its `android_ripple` prop).
- At the moment it only supports having a single View instance as a child node, as it's implemented by replacing that View with another instance of RCTView node with some additional properties set.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [Pressable](./pressable.md)
- [TouchableWithoutFeedback](./touchablewithoutfeedback.md)

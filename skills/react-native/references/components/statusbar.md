---
source: https://reactnative.dev/docs/0.87/statusbar
---

# StatusBar

Component to control the app's status bar. The status bar is the zone, typically at the top of the screen, that displays the current time, Wi-Fi and cellular network information, battery level and/or other status icons.

## Signature / Usage

Multiple `StatusBar` components can be mounted at the same time ("Usage with Navigator"); the props are merged in the order the `StatusBar` components were mounted.

**JavaScript**

```js
import {useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const STYLES = ['default', 'auto', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const App = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
          <Button
            title="Change StatusBar Style"
            onPress={changeStatusBarStyle}
          />
          {Platform.OS === 'ios' ? (
            <Button
              title="Change StatusBar Transition"
              onPress={changeStatusBarTransition}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;
```

**TypeScript**

```tsx
import {useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  StatusBarStyle,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const STYLES = ['default', 'auto', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;

const App = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );
  const [statusBarTransition, setStatusBarTransition] = useState<
    'fade' | 'slide' | 'none'
  >(TRANSITIONS[0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
          <Button
            title="Change StatusBar Style"
            onPress={changeStatusBarStyle}
          />
          {Platform.OS === 'ios' ? (
            <Button
              title="Change StatusBar Transition"
              onPress={changeStatusBarTransition}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;
```

## Options / Props

| Name | Type | Required | Default | Platform | Description |
| --- | --- | --- | --- | --- | --- |
| animated | boolean | No | `false` | | If the transition between status bar property changes should be animated. Supported for `barStyle` and `hidden` properties. |
| barStyle | StatusBarStyle | No | `'default'` | | Sets the color of the status bar text. On Android, this will only have an impact on API versions 23 and above. |
| hidden | boolean | No | `false` | | If the status bar is hidden. |
| showHideTransition | StatusBarAnimation | No | `'fade'` | iOS | The transition effect when showing and hiding the status bar using the `hidden` prop. |

### Constants

| Name | Platform | Description |
| --- | --- | --- |
| currentHeight | Android | The height of the status bar, which includes the notch height, if present. |

### Methods

Imperative API exposed as static functions on the component.

```tsx
static popStackEntry(entry: StatusBarProps);
static pushStackEntry(props: StatusBarProps): StatusBarProps;
static replaceStackEntry(
  entry: StatusBarProps,
  props: StatusBarProps
): StatusBarProps;
static setBarStyle(style: StatusBarStyle, animated?: boolean);
static setHidden(hidden: boolean, animation?: StatusBarAnimation);
```

| Method | Parameters | Description |
| --- | --- | --- |
| popStackEntry | `entry` (any, required): entry returned from `pushStackEntry` | Get and remove the last StatusBar entry from the stack. |
| pushStackEntry | `props` (any, required): object containing the StatusBar props to use in the stack entry | Push a StatusBar entry onto the stack. The return value should be passed to `popStackEntry` when complete. |
| replaceStackEntry | `entry` (any, required): entry returned from `pushStackEntry` to replace; `props` (any, required): props for the replacement stack entry | Replace an existing StatusBar stack entry with new props. |
| setBarStyle | `style` (StatusBarStyle, required): status bar style to set; `animated` (boolean): animate the style change | Set the status bar style. |
| setHidden | `hidden` (boolean, required): hide the status bar; `animation` (StatusBarAnimation, iOS): animation when changing the hidden property | Show or hide the status bar. |

### Type Definitions

#### StatusBarAnimation

Status bar animation type for transitions on the iOS (enum).

| Value | Type | Description |
| --- | --- | --- |
| `'fade'` | string | Fade animation |
| `'slide'` | string | Slide animation |
| `'none'` | string | No animation |

#### StatusBarStyle

Status bar style type (enum).

| Value | Type | Description |
| --- | --- | --- |
| `'default'` | string | Default status bar style (light for Android, dark for iOS) |
| `'auto'` | string | Automatically picks `light-content` or `dark-content` based on the current color scheme. Updates whenever the color scheme changes. |
| `'light-content'` | string | White texts and icons |
| `'dark-content'` | string | Dark texts and icons (requires API>=23 on Android) |

## Notes

- It is not recommended to use the static API and the component for the same prop, because any value set by the static API will get overridden by the one set by the component in the next render.
- This is a React Native core component (imported from `react-native`, rendered as a native view). It is distinct from same-named UI parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [SafeAreaView](./safeareaview.md)
- [View](./view.md)

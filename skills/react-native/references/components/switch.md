---
source: https://reactnative.dev/docs/0.87/switch
---

# Switch

Renders a boolean input. A controlled component that requires an `onValueChange` callback that updates the `value` prop.

## Signature / Usage

```tsx
import {useState} from 'react';
import {Switch, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

## Options / Props

Inherits [View Props](./view.md#options--props).

| Name | Type | Default | Platform | Description |
| --- | --- | --- | --- | --- |
| disabled | bool | `false` | | If true the user won't be able to toggle the switch. |
| ios_backgroundColor | color | | iOS | Custom color for the background. Visible when the switch value is `false` or when the switch is disabled (and the switch is translucent). |
| onChange | function | | | Invoked when the user tries to change the value of the switch. Receives the change event as an argument. To receive only the new value, use `onValueChange`. |
| onValueChange | function | | | Invoked when the user tries to change the value of the switch. Receives the new value as an argument. To receive an event, use `onChange`. |
| ref | ref setter | | | A ref setter that will be assigned an element node when mounted. |
| thumbColor | color | | | Color of the foreground switch grip. If this is set on iOS, the switch grip will lose its drop shadow. |
| trackColor | `{false: color, true: color}` | | | Custom colors for the switch track. iOS: when the switch value is `false`, the track shrinks into the border; use `ios_backgroundColor` to change the color of the background exposed by the shrunken track. |
| value | bool | | | The value of the switch. If true the switch will be turned on. Default value is false. |

## Notes

- If the `value` prop is not updated, the component will continue to render the supplied `value` prop instead of the expected result of any user actions.
- This is the React Native core `Switch` (imported from `react-native`, rendered as a native view). It is distinct from same-named parts in apple-swiftui / apple-uikit, android-compose-components / android-compose-ui, windows-winui-controls, and the web UI libraries ark-ui / chakra-ui / fandhe-frontend.

## Related

- [View](./view.md)
- [Button](./button.md)

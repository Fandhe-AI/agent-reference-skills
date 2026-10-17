---
source: https://reactnative.dev/docs/0.87/systrace
---

# Systrace

`Systrace` marks JavaScript events with a tag and integer value so they can be identified in an Android profiling trace.

## Signature / Usage

```tsx
import {Button, Text, View, StyleSheet, Systrace} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const markEvent = () => {
    Systrace.beginEvent('event_label');
    Systrace.counterEvent('event_label', 10);
    Systrace.endEvent();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>
          React Native Systrace API
        </Text>
        <View style={styles.buttonsColumn}>
          <Button title="Mark event" onPress={markEvent} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonsColumn: {
    gap: 16,
  },
});

export default App;
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `isEnabled()` | `static isEnabled(): boolean;` | |
| `beginEvent()` | `static beginEvent(eventName: string \| (() => string), args?: EventArgs);` | beginEvent/endEvent for starting and then ending a profile within the same call stack frame. |
| `endEvent()` | `static endEvent(args?: EventArgs);` | |
| `beginAsyncEvent()` | `static beginAsyncEvent(eventName: string \| (() => string), args?: EventArgs): number;` | beginAsyncEvent/endAsyncEvent for a profile where the end can occur on another thread or out of the current stack frame; the returned cookie is used as input into `endAsyncEvent`. |
| `endAsyncEvent()` | `static endAsyncEvent(eventName: EventName, cookie: number, args?: EventArgs);` | |
| `counterEvent()` | `static counterEvent(eventName: string \| (() => string), value: number);` | Register the value to the profileName on the systrace timeline. |

## Notes

- `Systrace` here is React Native's JS marker API (begin/end/async/counter events) that emits markers into Android traces; code blocks are surrounded by start/end markers visualized in a chart. The standalone `systrace` command-line tool has been removed from Android platform-tools (per the Profiling guide); capture traces with the Android Studio Profiler or Perfetto, then use these markers to identify events.

## Related

- [Profiling](./profiling.md)
- [Performance Overview](./performance.md)

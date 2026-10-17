---
source: https://reactnative.dev/docs/0.87/keyboard
---

# Keyboard

The `Keyboard` module lets you listen for native keyboard events and react to them, and make changes to the keyboard, like dismissing it.

## Signature / Usage

```tsx
useEffect(() => {
  const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
    setKeyboardStatus('Keyboard Shown');
  });
  const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardStatus('Keyboard Hidden');
  });

  return () => {
    showSubscription.remove();
    hideSubscription.remove();
  };
}, []);

<TextInput placeholder="Click here…" onSubmitEditing={Keyboard.dismiss} />;
```

### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `addListener()` | `static addListener: (eventType: KeyboardEventName, listener: KeyboardEventListener) => EventSubscription;` | Connects a JS function to a native keyboard notification event and returns the listener reference. `eventName` (string, required) and `callback` (function, required). |
| `dismiss()` | `static dismiss();` | Dismisses the active keyboard and removes focus. |
| `scheduleLayoutAnimation` | `static scheduleLayoutAnimation(event: KeyboardEvent);` | Useful for syncing TextInput (or other keyboard accessory view) size or position changes with keyboard movements. |
| `isVisible()` | `static isVisible(): boolean;` | Whether the keyboard is last known to be visible. |
| `metrics()` | `static metrics(): KeyboardMetrics \| undefined;` | Return the metrics of the soft-keyboard if visible. |

`eventName` can be: `keyboardWillShow`, `keyboardDidShow`, `keyboardWillHide`, `keyboardDidHide`, `keyboardWillChangeFrame`, `keyboardDidChangeFrame`.

## Notes

- Only `keyboardDidShow` and `keyboardDidHide` events are available on Android. The events will not be fired on Android 10 or below if your activity has `android:windowSoftInputMode` set to `adjustResize` or `adjustNothing`.

## Related

- [AppState](./appstate.md)

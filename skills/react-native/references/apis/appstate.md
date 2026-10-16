---
source: https://reactnative.dev/docs/0.87/appstate
---

# AppState

`AppState` tells you whether the app is in the foreground or background, and notifies you when the state changes. It is frequently used to determine the intent and proper behavior when handling push notifications.

## Signature / Usage

```tsx
const appState = useRef(AppState.currentState);

useEffect(() => {
  const subscription = AppState.addEventListener('change', nextAppState => {
    if (
      appState.current?.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    appState.current = nextAppState;
  });

  return () => {
    subscription.remove();
  };
}, []);
```

```tsx
static addEventListener(
  type: AppStateEvent,
  listener: (state: AppStateStatus) => void,
): EventSubscription;

static currentState: AppStateStatus;
```

## App states

| State | Platform | Description |
| --- | --- | --- |
| `active` | All | The app is running in the foreground. |
| `background` | All | The app is running in the background. The user is in another app, on the home screen, or (Android) on another `Activity`, including temporary system activities such as autofill credential pickers (even if launched by your app or the system). |
| `inactive` | iOS | Occurs when transitioning between foreground and background, and during periods of inactivity such as entering the multitasking view, opening the Notification Center or on an incoming call. |

## Events

| Event | Platform | Description |
| --- | --- | --- |
| `change` | All | App state changed. The listener is called with one of the app state values. |
| `memoryWarning` | iOS | The app received a memory warning from the OS. |
| `focus` | Android | The app gains focus (the user is interacting with the app). |
| `blur` | Android | The user is not actively interacting with the app, e.g. when the notification drawer is pulled down. `AppState` won't change but `blur` fires. |

## Notes

- `AppState.currentState` is kept up to date. If you are using the legacy architecture, `currentState` is `null` at launch until it is retrieved asynchronously from the native side.
- The official Snack example will only ever show "active" because the app is only visible to the user in the `active` state; test on a real device.

## Related

- [AccessibilityInfo](./accessibilityinfo.md)
- [BackHandler](./backhandler.md)

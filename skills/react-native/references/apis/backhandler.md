---
source: https://reactnative.dev/docs/0.87/backhandler
---

# BackHandler

Detects hardware button presses for back navigation, lets you register listeners for the system's back action, and control how your app responds. Android-only.

## Signature / Usage

```tsx
const subscription = BackHandler.addEventListener(
  'hardwareBackPress',
  function () {
    /**
     * this.onMainScreen and this.goBack are just examples,
     * you need to use your own implementation here.
     *
     * Typically you would use the navigator here to go to the last state.
     */

    if (!this.onMainScreen()) {
      this.goBack();
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      return true;
    }
    /**
     * Returning false will let the event to bubble up & let other event listeners
     * or the system's default back action to be executed.
     */
    return false;
  },
);

// Unsubscribe the listener on unmount
subscription.remove();
```

```tsx
static addEventListener(
  eventName: BackPressEventName,
  handler: () => boolean | null | undefined,
): EventSubscription;

static exitApp();
```

## Notes

- Event subscriptions are called in reverse order (last registered first). If one subscription returns `true`, earlier ones are not called. If none returns `true` or none are registered, the default back button functionality is invoked programmatically to exit the app.
- If your app shows an opened `Modal`, `BackHandler` will not publish any events (see `Modal` `onRequestClose`).
- `addEventListener` returns an `EventSubscription` which should be cleared with `EventSubscription.remove`.
- With React Navigation, follow its guide on custom Android back button behaviour. React Native Hooks (community) offers a `useBackHandler` hook.
- Since 0.86: `hardwareBackPress` events now pass an event object with a `timeStamp` property from the native event (existing callbacks that ignore the argument are unaffected). Fixed: callbacks stopped working after the app resumed from the background on Android API 36+ (0.86 release blog).

## Related

- [AppState](./appstate.md)
- [ToastAndroid](./toastandroid.md)

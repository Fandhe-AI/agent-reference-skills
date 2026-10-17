---
source: https://reactnative.dev/docs/0.87/toastandroid
---

# ToastAndroid

Exposes the Android platform's ToastAndroid module as a JS module.

## Signature / Usage

```tsx
ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);

ToastAndroid.showWithGravity(
  'All Your Base Are Belong To Us',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER,
);

ToastAndroid.showWithGravityAndOffset(
  'A wild toast appeared!',
  ToastAndroid.LONG,
  ToastAndroid.BOTTOM,
  25,
  50,
);
```

### Methods and Properties

| Name | Signature | Description |
| --- | --- | --- |
| `show()` | `static show(message: string, duration: number);` | Shows `message` (text to toast) for `duration` (`ToastAndroid.SHORT` or `ToastAndroid.LONG`). |
| `showWithGravity()` | `static showWithGravity(message: string, duration: number, gravity: number);` | Specifies where the toast appears. |
| `showWithGravityAndOffset()` | `static showWithGravityAndOffset(message: string, duration: number, gravity: number, xOffset: number, yOffset: number);` | Adds an offset in pixels. |
| `SHORT`, `LONG` | `static SHORT: number;` / `static LONG: number;` | Duration on screen. |
| `TOP`, `BOTTOM`, `CENTER` | `static TOP: number;` etc. | Position on screen. |

## Notes

- Starting with Android 11 (API level 30), setting the gravity has no effect on text toasts.
- `showWithGravity` and `showWithGravityAndOffset` only work on Android API 29 and below. For similar functionality on higher APIs, consider a snackbar or notification.

## Related

- [Alert](./alert.md)

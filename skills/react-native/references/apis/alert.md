---
source: https://reactnative.dev/docs/0.87/alert
---

# Alert

Launches an alert dialog with the specified title and message, with an optional list of buttons. Tapping any button fires its `onPress` callback and dismisses the alert; by default the only button is an 'OK' button.

## Signature / Usage

```tsx
Alert.alert('Alert Title', 'My Alert Msg', [
  {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  {text: 'OK', onPress: () => console.log('OK Pressed')},
]);
```

```tsx
static alert (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
);

static prompt: (
  title: string,
  message?: string,
  callbackOrButtons?: ((text: string) => void) | AlertButton[],
  type?: AlertType,
  defaultValue?: string,
  keyboardType?: string,
);
```

## Options / Props

`alert()` parameters:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | Yes | The dialog's title. Passing `null` or empty string will hide the title. |
| message | string | No | An optional message that appears below the dialog's title. |
| buttons | AlertButton[] | No | An optional array containing buttons configuration. |
| options | AlertOptions | No | An optional Alert configuration. |

`prompt()` parameters (iOS):

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | Yes | The dialog's title. |
| message | string | No | An optional message that appears above the text input. |
| callbackOrButtons | function \| AlertButton[] | No | A function is called with the prompt's value `(text: string) => void` when the user taps 'OK'. An array configures buttons. |
| type | AlertType | No | Configures the text input. |
| defaultValue | string | No | The default text in text input. |
| keyboardType | string | No | The keyboard type of first text field (if exists). One of TextInput keyboardTypes. |
| options | AlertOptions | No | An optional Alert configuration. |

`AlertButton` (array of objects):

| Name | Platform | Type | Description |
| --- | --- | --- | --- |
| text | All | string | Button label. |
| onPress | All | function | Callback function when button is pressed. |
| style | iOS | AlertButtonStyle | Button style, on Android this property will be ignored. |
| isPreferred | iOS | boolean | Whether button should be emphasized, on Android this property will be ignored. |

`AlertOptions` (object):

| Name | Platform | Type | Description |
| --- | --- | --- | --- |
| cancelable | Android | boolean | Defines if alert can be dismissed by tapping outside of the alert box. |
| userInterfaceStyle | iOS | string | The interface style used for the alert, `light` or `dark`; otherwise the default system style. |
| onDismiss | Android | function | Callback fired when alert has been dismissed. |

`AlertButtonStyle` (iOS enum): `'default'` (default button style), `'cancel'` (cancel button style), `'destructive'` (destructive button style).

`AlertType` (iOS enum): `'default'` (default alert with no inputs), `'plain-text'` (plain text input alert), `'secure-text'` (secure text input alert), `'login-password'` (login and password alert).

## Notes

- Works on both Android and iOS and can show static alerts. An alert that prompts the user to enter information (`prompt()`) is available on iOS only.
- iOS: any number of buttons can be specified; each can optionally specify a style or be emphasized (`isPreferred`).
- Android: at most three buttons. One button is the 'positive' one (such as 'OK'); two buttons mean 'negative', 'positive' (such as 'Cancel', 'OK'); three buttons mean 'neutral', 'negative', 'positive' (such as 'Later', 'Cancel', 'OK').
- Android: alerts can be dismissed by tapping outside the alert box. Disabled by default; enable with `{cancelable: true}` in `AlertOptions`. Handle the cancel event with an `onDismiss` callback in `options`.

Android dismissable example:

```tsx
Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {
      text: 'Cancel',
      onPress: () => Alert.alert('Cancel Pressed'),
      style: 'cancel',
    },
  ],
  {
    cancelable: true,
    onDismiss: () =>
      Alert.alert(
        'This alert was dismissed by tapping outside of the alert dialog.',
      ),
  },
);
```

## Related

- [ActionSheetIOS](./actionsheetios.md)
- [ToastAndroid](./toastandroid.md)

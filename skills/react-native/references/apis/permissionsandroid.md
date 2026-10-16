---
source: https://reactnative.dev/docs/0.87/permissionsandroid
---

# PermissionsAndroid

Access to Android M's permissions model. "Normal" permissions are granted at install if they appear in `AndroidManifest.xml`; "dangerous" permissions require a dialog prompt, for which you use this module.

## Signature / Usage

```tsx
const granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.CAMERA,
  {
    title: 'Cool Photo App Camera Permission',
    message:
      'Cool Photo App needs access to your camera ' +
      'so you can take awesome pictures.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  },
);
if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  console.log('You can use the camera');
} else {
  console.log('Camera permission denied');
}
```

```tsx
static check(permission: Permission): Promise<boolean>;
static request(permission: Permission, rationale?: Rationale): Promise<PermissionStatus>;
static requestMultiple(permissions: Permission[]): Promise<{[key in Permission]: PermissionStatus}>;
```

## Options / Props

| Method | Parameter | Type | Required | Description |
| --- | --- | --- | --- | --- |
| `check()` | permission | string | Yes | The permission to check for. Resolves to a boolean for whether it has been granted. |
| `request()` | permission | string | Yes | The permission to request. Resolves to a result string. |
| `request()` | rationale | object | No | See below. |
| `requestMultiple()` | permissions | array | Yes | Array of permissions to request in the same dialog. Resolves to an object of permission keys and result-string values. |

`Rationale`:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| title | string | Yes | The title of the dialog. |
| message | string | Yes | The message of the dialog. |
| buttonPositive | string | Yes | The text of the positive button. |
| buttonNegative | string | No | The text of the negative button. |
| buttonNeutral | string | No | The text of the neutral button. |

Result strings, constants under `PermissionsAndroid.RESULTS`: `GRANTED` ('granted'), `DENIED` ('denied'), `NEVER_ASK_AGAIN` ('never_ask_again').

Permissions requiring prompting, constants under `PermissionsAndroid.PERMISSIONS`: `READ_CALENDAR`, `WRITE_CALENDAR`, `CAMERA`, `READ_CONTACTS`, `WRITE_CONTACTS`, `GET_ACCOUNTS`, `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`, `ACCESS_BACKGROUND_LOCATION`, `RECORD_AUDIO`, `READ_PHONE_STATE`, `CALL_PHONE`, `READ_CALL_LOG`, `WRITE_CALL_LOG`, `ADD_VOICEMAIL` ('com.android.voicemail.permission.ADD_VOICEMAIL'), `USE_SIP`, `PROCESS_OUTGOING_CALLS`, `BODY_SENSORS`, `SEND_SMS`, `RECEIVE_SMS`, `READ_SMS`, `RECEIVE_WAP_PUSH`, `RECEIVE_MMS`, `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`, `BLUETOOTH_CONNECT`, `BLUETOOTH_SCAN`, `BLUETOOTH_ADVERTISE`, `ACCESS_MEDIA_LOCATION`, `ACCEPT_HANDOVER`, `ACTIVITY_RECOGNITION`, `ANSWER_PHONE_CALLS`, `READ_PHONE_NUMBERS`, `UWB_RANGING`, `BODY_SENSORS_BACKGROUND`, `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, `READ_MEDIA_AUDIO`, `POST_NOTIFICATIONS`, `NEARBY_WIFI_DEVICES`, `READ_VOICEMAIL` ('com.android.voicemail.permission.READ_VOICEMAIL'), `WRITE_VOICEMAIL` ('com.android.voicemail.permission.WRITE_VOICEMAIL'). Unless noted, each maps to `'android.permission.<NAME>'`.

## Notes

- Project with native code required. With the managed Expo workflow, see the Permissions guide in the Expo documentation for the appropriate alternative.
- On devices before SDK 23, permissions are automatically granted if they appear in the manifest, so `check` always results in `true` and `request` always resolves to `PermissionsAndroid.RESULTS.GRANTED`.
- If a user previously turned off a permission you prompt for, the OS advises the app to show a rationale. The optional `rationale` argument shows a dialog only if necessary; otherwise the normal permission prompt appears.
- This is the React Native JS wrapper; native Android (Kotlin) permission APIs are covered by the android-* skills.

## Related

- [Vibration](./vibration.md)
- [Linking](./linking.md)

# receiver element

Declares a `BroadcastReceiver` component and its access-control attributes. See `android-background-work` for receiver behavior.

## Signature / Usage

```xml
<receiver
    android:name=".ReportReceiver"
    android:exported="false"
    android:permission="com.example.myapp.permission.RECEIVE" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | required | Fully qualified class name implementing `BroadcastReceiver`, or a relative `.ReportReceiver`-style name. |
| `android:enabled` | Boolean | `"true"` | Whether the system can instantiate the receiver; both `<application>` and `<receiver>` must be `"true"`. |
| `android:exported` | Boolean | `"true"` if the receiver has intent filters, otherwise `"false"` | Whether the receiver accepts broadcasts from outside its own app. **Must be declared explicitly for receivers handling non-system broadcasts at API 31+.** |
| `android:permission` | String | inherited from `<application>` | Permission required for broadcasters to send messages to this receiver. |
| `android:process` | String | default app process | Process the receiver runs in; `:`-prefix for a private process, lowercase name for a global process. |
| `android:directBootAware` | Boolean | `"false"` | Whether the receiver can run before the user unlocks the device; during Direct Boot it can access only device-protected storage. |

## Notes

- Contained in: `<application>`. Can contain `<intent-filter>`, `<meta-data>`, `<property>`.
- This page covers manifest attributes only; `BroadcastReceiver` implementation and background-execution behavior are owned by `android-background-work`.

## Related

- [service element](./service-element.md)
- [application element](./application-element.md)

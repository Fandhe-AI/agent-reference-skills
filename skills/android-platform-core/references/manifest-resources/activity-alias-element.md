# activity-alias element

Declares an alternate public name for an existing `<activity>`, with its own icon, label, permission, and intent filters — commonly used for launcher icon swapping without changing the target activity's class name.

## Signature / Usage

```xml
<application>
    <activity android:name=".MainActivity" android:exported="false" />

    <activity-alias
        android:name=".MainLauncherAlias"
        android:targetActivity=".MainActivity"
        android:exported="true"
        android:icon="@drawable/ic_launcher_alt"
        android:label="@string/alt_app_name">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity-alias>
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | required | Unique alias identifier; arbitrary, does not reference an actual class. |
| `android:targetActivity` | String | required | Name of the `<activity>` this alias resolves to; the target must be declared earlier in the manifest. |
| `android:exported` | Boolean | `"false"` if no intent filters, otherwise `"true"` | Whether other apps can launch the target through this alias. |
| `android:enabled` | Boolean | `"true"` | Whether the system can instantiate the target through this alias; both `<application>` and `<activity-alias>` must be `"true"`. |
| `android:icon` / `android:label` | Drawable / string resource | inherited from target | Presented in place of the target activity's own icon/label when launched via the alias. |
| `android:permission` | String | none (no permission required) | Permission required to launch the target through this alias; supplants any permission set on the target activity itself. If unset, no permission is needed to activate the target through the alias, even if the target itself requires one. |
| `android:intentMatchingFlags` | Flags | `"none"` | Fine-tunes intent matching: `"enforceIntentFilter"`, `"allowNullAction"`. |

## Notes

- Contained in: `<application>`. Can contain: `<intent-filter>`, `<meta-data>`, `<property>`.
- Introduced in API level 1.
- The alias's own `<intent-filter>`s — not the target activity's — determine which intents resolve to it and how the system treats it (e.g. as a launcher icon).
- Typical use: declare a second `<intent-filter>` with `MAIN`/`LAUNCHER` on an alias pointing at the same `MainActivity`, then toggle `android:enabled` on alternate aliases at runtime via `PackageManager.setComponentEnabledSetting()` to swap the visible launcher icon.

## Related

- [activity element](./activity-element.md)
- [application element](./application-element.md)

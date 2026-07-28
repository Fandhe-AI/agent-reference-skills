# provider element

Declares a `ContentProvider` component and its access-control attributes. See the app-components category (same skill) for `ContentProvider` usage/behavior.

## Signature / Usage

```xml
<provider
    android:name=".MyContentProvider"
    android:authorities="com.example.provider.cartoonprovider"
    android:exported="false"
    android:grantUriPermissions="true" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | required | Fully qualified class name implementing the `ContentProvider` subclass. |
| `android:authorities` | String list | required | Semicolon-separated URI authority list identifying the provider's data. |
| `android:exported` | Boolean | `"false"` (API 17+), `"true"` (API ≤16) | Whether available to other apps. |
| `android:enabled` | Boolean | `"true"` | Whether the provider can be instantiated; both `<application>` and `<provider>` must be `"true"`. |
| `android:permission` | String | — | Single permission required for both reading and writing; overridden by `readPermission`/`writePermission`. |
| `android:readPermission` | String | — | Permission required to query/read data. |
| `android:writePermission` | String | — | Permission required to modify data. |
| `android:grantUriPermissions` | Boolean | `"false"` | Whether temporary URI permission grants are allowed via `FLAG_GRANT_READ_URI_PERMISSION`/`FLAG_GRANT_WRITE_URI_PERMISSION`. |
| `android:initOrder` | Integer | — | Initialization order relative to other providers in the same process (higher = earlier). |
| `android:multiprocess` | Boolean | `"false"` | If `"true"`, each app process gets its own provider instance; otherwise a single instance is shared. |
| `android:syncable` | Boolean | — | Whether provider data can sync with a server. |

## Notes

- Contained in: `<application>`. Can contain: `<meta-data>`, `<grant-uri-permission>`, `<intent-filter>`, `<path-permission>`, `<property>`.
- This page covers manifest attributes only; `ContentProvider` implementation and usage belong to the app-components category of this skill.

## Related

- [application element](./application-element.md)
- [queries element](./queries-element.md)

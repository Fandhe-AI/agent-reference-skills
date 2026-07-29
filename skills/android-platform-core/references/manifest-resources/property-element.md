# property element

A generic name/value pair attached to a component or the app, read via `PackageManager.getProperty()`. Introduced as a typed successor to `<meta-data>` and used by several modern platform declarations (exact-alarm scheduling, app-integrity, window-manager properties, and similar feature opt-ins).

## Signature / Usage

```xml
<application>
    <property
        android:name="android.window.PROPERTY_ACTIVITY_EMBEDDING_SPLITS_ENABLED"
        android:value="true" />
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | required | Property name. A parsing error occurs if two sibling `<property>` tags share the same name. |
| `android:value` | String/Integer/Boolean/Color/Float | — | Literal value assigned to the property, retrieved via `PackageManager.Property.getString()/getInteger()/getBoolean()/getFloat()`. Do not set together with `android:resource` — if both are present, `android:resource` wins. |
| `android:resource` | Resource ID | — | Reference to a resource; the numeric ID is stored and retrieved via `PackageManager.Property.getResourceId()`. |

## Notes

- Contained in: `<activity>`, `<activity-alias>`, `<application>`, `<provider>`, `<receiver>`, `<service>`.
- Introduced in API level 31.
- Unlike `<meta-data>` (a raw untyped `Bundle` entry), individual `<property>` values are looked up one at a time by name via `PackageManager.getProperty(String, String)`, which is cheaper when only a single flag needs checking.

## Related

- [meta-data element](./meta-data-element.md)
- [application element](./application-element.md)

# meta-data element

Attaches an arbitrary name/value pair to a component or the `<application>` for a library, API key, or feature to read via `PackageManager`.

## Signature / Usage

```xml
<application>
    <meta-data
        android:name="com.example.myapp.API_KEY"
        android:value="abc123" />

    <activity android:name=".MainActivity">
        <meta-data
            android:name="zoo"
            android:resource="@string/kangaroo" />
    </activity>
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` | String | required | Unique name for the item; Java-style naming convention recommended (e.g. `com.example.project.activity.fred`). |
| `android:value` | String/Integer/Boolean/Color/Float | — | The literal value assigned to the item, retrieved via the matching `Bundle.get*()` method. Mutually exclusive with `android:resource` in practice — use one or the other. |
| `android:resource` | Resource ID | — | Reference to a resource; the numeric resource ID (not its resolved value) is what's stored, retrieved via `Bundle.getInt()`. Prefer this over `android:value` for complex/structured data. |

## Notes

- Contained in: `<activity>`, `<activity-alias>`, `<application>`, `<provider>`, `<receiver>`, `<service>`. A component can declare any number of `<meta-data>` children; all are collected into a single `Bundle` exposed as `PackageItemInfo.metaData`.
- Introduced in API level 1.
- `android:value="@string/kangaroo"` stores the resolved string; `android:resource="@string/kangaroo"` stores the resource ID instead — pick based on whether the reading code expects a value or an ID.

## Related

- [application element](./application-element.md)
- [activity element](./activity-element.md)
- [property element](./property-element.md)

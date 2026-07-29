# queries element

Declares the set of other apps this app intends to interact with, for package visibility filtering (API 30+).

## Signature / Usage

```xml
<queries>
    <package android:name="com.example.app" />

    <intent>
        <action android:name="android.intent.action.SEND" />
        <data android:mimeType="text/plain" />
    </intent>

    <provider android:authorities="com.example.app.provider" />
</queries>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<package android:name>` | String | Required. Package name of a single other app this app intends to access. |
| `<intent>` | Element | Intent filter signature. Discovers other apps with a matching `<intent-filter>`. Supports a restricted subset of intent filter options compared to a normal filter. |
| `<provider android:authorities>` | String list | Content provider authorities. Discovers apps whose content providers expose the given authorities. |

## Notes

- Contained in: `<manifest>`. Introduced API level 30.
- Some packages are visible automatically without declaring `<queries>`; this element is only needed for packages not automatically visible.

## Related

- [activity element](./activity-element.md)
- [provider element](./provider-element.md)
- [action / category / data elements](./action-category-data-elements.md)

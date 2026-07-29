# uri-relative-filter-group element

Adds a fine-grained inclusion/exclusion rule to an `<intent-filter>`, matching on URI path, query parameters, and fragment together — attributes an ordinary sibling `<data>` element cannot combine.

## Signature / Usage

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="project.example.com" />

    <uri-relative-filter-group android:allow="true">
        <data android:path="/path" />
        <data android:queryAdvancedPattern=".+" />
    </uri-relative-filter-group>
</intent-filter>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:allow` | Boolean | `"true"` | `"true"`: the intent filter matches when this group matches (inclusion rule). `"false"`: the intent filter is rejected when this group matches, even if other rules would accept it (exclusion rule). |

## Notes

- Contained in: `<intent-filter>`. Can contain: `<data>` (only its `path*`, `fragment*`, and `query*` attributes are honored here — `scheme`, `host`, `port`, and `mimeType` must be declared on a sibling `<data>` outside the group).
- Introduced in API level 35 (Android 15); ignored on lower API levels, so filters should keep a functionally-equivalent sibling `<data>`/`<intent-filter>` for older devices where full fragment/query matching isn't required.
- Multiple `<data>` tags inside the same group are ANDed together; sibling `<data>` tags outside all groups are evaluated first, then groups in declaration order.
- URI-encoded characters match their raw form (e.g. a pattern of `value!` matches both `value!` and `value%21`).

## Related

- [action / category / data elements](./action-category-data-elements.md)

# Manifest Merger Conflicts

The manifest merger combines the build variant, main app, and library manifests (in that priority order) into one `AndroidManifest.xml`; `tools:node`, `tools:replace`, and `tools:remove` markers resolve conflicts when merge fails.

## Signature / Usage

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <activity android:name="com.example.ActivityOne"
        android:theme="@newtheme"
        android:exported="true"
        tools:replace="android:theme,android:exported">
    </activity>
</manifest>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tools:node` | `merge` \| `mergeOnlyAttributes` \| `remove` \| `removeAll` \| `replace` \| `strict` | `merge` | Merge rule applied to an entire XML element. |
| `tools:replace` | comma-separated attr list | — | Replaces the listed attributes with this manifest's values instead of failing on conflict. |
| `tools:remove` | comma-separated attr list | — | Removes the listed attributes from the merged manifest. |
| `tools:strict` | comma-separated attr list | (default behavior) | Fails the build if the listed attributes don't match exactly across manifests. |
| `tools:selector` | package name | — | Restricts a merge marker to apply only to a specific library's manifest. |

## Notes

- Merge priority (highest to lowest): build variant manifest (`src/demoDebug/`) > main app manifest > library manifests (in dependency order).
- Default conflict behavior: if both manifests declare the same attribute with different values and no marker resolves it, the build fails with a merge conflict error.
- `<manifest>` element attributes are never merged — only the highest-priority manifest's values are used.
- `<uses-feature>`/`<uses-library>` `android:required` uses OR logic (any `true` wins); `<intent-filter>` elements are never matched against each other and multiple declarations are always kept.
- Inspect the merged result in Android Studio via the **Merged Manifest** tab on `AndroidManifest.xml`, including a **Merging Errors** panel.
- Source: `developer.android.com/build/manage-manifests`.

## Related

- [Namespace Migration](./namespace-migration.md)

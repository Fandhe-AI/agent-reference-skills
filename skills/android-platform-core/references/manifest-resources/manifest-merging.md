# Manifest merging and placeholders

How multiple manifest files (app, library dependencies, build variant) are merged into one, how to control the merge with the `tools:` namespace, and how to inject build-time values with manifest placeholders.

## Signature / Usage

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myapp"
    xmlns:tools="http://schemas.android.com/tools">

    <activity android:name="com.example.ActivityOne"
        android:screenOrientation="portrait"
        tools:node="merge" />

    <intent-filter>
        <data android:scheme="https" android:host="${hostName}" />
    </intent-filter>
</manifest>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tools:node="merge"` | Node marker | Default behavior; combines attributes and child elements from lower-priority manifests. |
| `tools:node="replace"` | Node marker | Replaces the entire element from lower-priority manifests. |
| `tools:node="remove"` | Node marker | Removes a specific element inherited from a lower-priority manifest. |
| `tools:node="removeAll"` | Node marker | Removes all matching elements. |
| `tools:node="mergeOnlyAttributes"` | Node marker | Merges attributes only; discards child elements. |
| `tools:replace="attr1,attr2"` | Attribute marker | Replaces only the listed attributes. |
| `tools:remove="attr1,attr2"` | Attribute marker | Removes only the listed attributes. |
| `tools:selector="com.example.lib1"` | Selector | Scopes a merge rule to a specific library dependency. |
| `tools:overrideLibrary` (on `<uses-sdk>`) | String list | Allows merging libraries that declare a higher `minSdk` than the app. |
| `manifestPlaceholders` (Gradle) | Map | Key/value pairs substituted into `${key}` tokens in the manifest at build time. |
| `${applicationId}` | Built-in placeholder | Automatically resolves to the final application ID, including flavor suffixes. |

## Notes

- Merge priority, lowest to highest: library manifests (order from Gradle dependency graph) → main app manifest → build variant manifest (product flavor → build type → variant-specific, most specific wins).
- Declare `manifestPlaceholders` in `build.gradle(.kts)` under `defaultConfig` (Groovy: `manifestPlaceholders = [hostName: "www.example.com"]`; Kotlin: `manifestPlaceholders["hostName"] = "www.example.com"`), then reference with `${hostName}` in the manifest.
- View the merged result and any merge conflicts in Android Studio via the **Merged Manifest** tab, or in `module/build/outputs/logs/manifest-merger-<variant>-report.txt`.

## Related

- [manifest element](./manifest-element.md)
- [application element](./application-element.md)

# uses-library / uses-native-library elements

`<uses-library>` declares a shared framework library (e.g. `android.test.runner`) the app must link against at install time. `<uses-native-library>` does the same for a vendor-provided native shared library.

## Signature / Usage

```xml
<application>
    <uses-library
        android:name="android.test.runner"
        android:required="false" />

    <uses-native-library
        android:name="libOpenCL.so"
        android:required="false" />
</application>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:name` (uses-library) | String | required | Name of the shared framework library, e.g. `android.test.runner`. Standard packages like `android.app`, `android.content`, `android.view`, `android.widget` are linked automatically and never need to be declared. |
| `android:required` (uses-library) | Boolean | `"true"` | `"true"`: the app won't function without the library and the system blocks install on devices lacking it (also used by Google Play for device filtering). `"false"`: the app uses the library opportunistically and must check availability via reflection at runtime; install proceeds regardless. |
| `android:name` (uses-native-library) | String | required | File name of the vendor/OEM-provided native shared library. |
| `android:required` (uses-native-library) | Boolean | `"true"` | Same semantics as `uses-library`'s `required` attribute, applied to the native library. |

## Notes

- Both contained in: `<application>`. Introduced API level 1 (`uses-library`) / API level 31 (`uses-native-library`).
- The declaration order of multiple `<uses-library>` tags affects class resolution: earlier entries win when duplicate classes exist across libraries.
- `<uses-native-library>` exists because apps targeting API 31+ no longer get implicit access to non-NDK native libraries from silicon vendors/device manufacturers; NDK libraries remain accessible without declaring anything. Apps targeting API ≤30 don't need this tag.

## Related

- [application element](./application-element.md)
- [property element](./property-element.md)

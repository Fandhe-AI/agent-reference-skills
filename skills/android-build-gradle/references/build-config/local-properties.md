# local.properties and sdk.dir

Machine-local configuration file at the project root, read by the Android Gradle Plugin. Should be excluded from source control since paths are specific to the local machine.

## Signature / Usage

```properties
sdk.dir=/Users/me/Library/Android/sdk
ndk.dir=/Users/me/Library/Android/sdk/ndk/28.2.13676358
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sdk.dir` | path | — | Path to the local Android SDK installation. |
| `ndk.dir` | path | — | Path to the local NDK installation. Deprecated: the NDK is now auto-installed under the Android SDK directory. |
| `cmake.dir` | path | — | Path to a local CMake installation. |
| `ndk.symlinkdir` | path | — | Creates a shorter NDK path (Windows only), useful for avoiding path-length limits. |

## Notes

- Reserved for the Android Gradle Plugin's own use; create a separate properties file for custom project values.
- Must be excluded from version control (e.g. via `.gitignore`) since it contains machine-specific paths.

## Related

- [gradle.properties](./gradle-properties.md)

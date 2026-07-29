# Native Debug Symbols

Controls how much native (C/C++/NDK) debug information is kept in a release build via `android.buildTypes.release.ndk.debugSymbolLevel`. By default, release native libraries are fully stripped, which makes native crash stack traces in Play Console unreadable; this setting restores enough symbol data for Android vitals to symbolicate them.

## Signature / Usage

```kotlin
android {
    buildTypes {
        release {
            ndk {
                debugSymbolLevel = "SYMBOL_TABLE" // or "FULL"
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `debugSymbolLevel` | `String` | `NONE` | Symbol level kept in the release native library: `NONE`, `SYMBOL_TABLE`, or `FULL`. |

- `NONE` — symbols stripped (default); native crashes in Play Console are not symbolicated.
- `SYMBOL_TABLE` — function names only; enables symbolicated stack traces and tombstones with the smallest file size overhead.
- `FULL` — function names, file names, and line numbers; most detail, but produces a larger debug symbols file.

## Notes

- Requires Android Gradle Plugin 4.1+; on 4.0 or earlier, symbols must be extracted and uploaded manually with `ndk-stack` or `objcopy`.
- When building an Android App Bundle, the native debug symbols file is generated and included in the `.aab` automatically, so Play Console receives it with no extra upload step.
- When building an APK, generate and upload the file manually from `app/build/outputs/native-debug-symbols/<variant-name>/native-debug-symbols.zip` via Play Console (same flow as uploading a ProGuard/R8 `mapping.txt`).
- The uploaded native debug symbols file has a 1.6 GB size limit; switch from `FULL` to `SYMBOL_TABLE` if the file exceeds it.
- If a dependency already ships native libraries with stripped debug info, the build log prints `Unable to extract native debug metadata from ... because the native debug metadata has already been stripped.` — this is expected and not an error in your own module.

## Related

- [r8-troubleshooting.md](./r8-troubleshooting.md)
- [app-bundle.md](./app-bundle.md)

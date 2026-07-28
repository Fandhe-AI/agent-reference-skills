# Assets and AssetManager

The `assets/` project directory bundles read-only files with the APK, accessed at runtime through `AssetManager` (or `Context.getAssets()`), and is distinct from `res/raw`.

## Signature / Usage

```kotlin
val assetManager = context.assets

// List files
val files: Array<String> = assetManager.list("") ?: emptyArray()

// Read a text asset
assetManager.open("data.json").bufferedReader().use { it.readText() }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context.assets` / `Context.getAssets()` | `AssetManager` | — | Entry point for reading files bundled under the module's `assets/` directory. |
| `AssetManager.open(fileName)` | `(String) -> InputStream` | — | Opens an asset file for reading. |
| `AssetManager.list(path)` | `(String) -> Array<String>?` | — | Lists files/subdirectories at the given asset path. |
| `AssetManager.openFd(fileName)` | `(String) -> AssetFileDescriptor` | — | Opens an asset with a file descriptor, useful for media playback APIs. |

## Notes

- This is the Android platform storage API (Kotlin / `android.*`) — distinct from the same-named concept in other skills.
- Assets are read-only at runtime and cannot be modified or deleted by the app; use app-specific storage for writable data.
- Prefer `res/raw` over `assets/` when Android resource identifiers (`R.raw.*`) and build-time processing (e.g. density/locale variants) are desired; use `assets/` for arbitrary file hierarchies or non-resource formats.
- Assets are compressed inside the APK by default unless the `aaptOptions.noCompress` build setting excludes them (relevant for streaming/mmap use cases).

## Related

- [App-specific storage](./app-specific-storage.md)

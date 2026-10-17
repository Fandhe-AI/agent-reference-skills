---
source: https://docs.expo.dev/modules/inline-modules-reference/
---

# Inline modules reference

Inline modules let you write native module code (Kotlin and Swift) directly in your Expo project directory, without creating a separate Expo module package. Expo discovers these files automatically and includes them in the build.

## Signature / Usage

```json
{
  "expo": {
    "experiments": {
      "inlineModules": {
        "watchedDirectories": ["app", "src"]
      }
    }
  }
}
```

Naming convention (file name must match the module name):

```kotlin
// SimpleModule.kt
// ...
class SimpleModule: Module() { // Note that the class name has to match the filename.
    override fun definition() = ModuleDefinition {
        // Name("SimpleModule") // Note that `Name` also has to match the filename. So you can just omit it.
    }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `expo.experiments.inlineModules` | object | When defined, enables inline modules in Expo CLI and Expo Modules Autolinking. |
| `expo.experiments.inlineModules.watchedDirectories` | string[] | Directories in which inline modules can be created. Nested directories are also used. |
| `expo.experiments.inlineModules.xcodeProjectTargets` | string[] | iOS only. Xcode targets the inline module files are added to. When omitted, only the app's main target. |

## Notes

- Experimental; available in Expo SDK 56 and later. The API is subject to breaking changes.
- A `watchedDirectories` entry must be inside a TypeScript/JavaScript project (an ancestor has **package.json**), cannot be the whole project directory or an ancestor of it, cannot be a subdirectory of another entry (use `["app"]`, not `["app", "app/nested/directory"]`), and cannot contain special characters such as `" "`, `(`, `)`, `$` (so no `"app/(tabs)"`; `"app"` still picks up native files in **app/(tabs)**).
- `xcodeProjectTargets` entries are target names as they appear in the Xcode project and in `target` blocks of **ios/Podfile**; use the target name only, even if nested inside an `abstract_target`.
- Run `npx expo prebuild` after changing app config for it to take effect.
- The inline module file name has to match the native module name, which must be unique in the whole app.
- Distinct from apple-swift and android-architecture.
- Source modificationDate: September 30, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Module API Reference](./module-api.md)
- [Type generation reference](./type-generation-reference.md)
- [Autolinking](./autolinking.md)

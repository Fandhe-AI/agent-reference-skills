---
source: https://kotlinlang.org/docs/multiplatform/compose-multiplatform-resources-setup.html
---

# Setup and configuration for multiplatform resources

Add the resources library dependency, create the `composeResources` directories for each kind of resource, and add qualifier directories (dark theme images, localized strings, and so on).

## Signature / Usage

```kotlin
kotlin {
    //...
    sourceSets {
        commonMain.dependencies {
            implementation(compose.components.resources)
        }
    }
}
```

Create a `composeResources` directory in the source set directory you want to add resources to (`commonMain` in this example) and organize it by these rules:

- Images go in `drawable`. Rasterized images (JPEG, PNG, bitmap, WebP) and vector Android XML images (without references to Android resources) are supported.
- Fonts go in `font`.
- Strings go in `values`.
- Other files go in `files`, with any folder hierarchy.

### Custom resource directories

In the `compose.resources {}` block, specify custom resource directories per source set. Each has the same layout as `composeResources` (`drawable`, `font`, ...).

```kotlin
compose.resources {
    customDirectory(
        sourceSetName = "jvmMain",
        directoryProvider = provider { layout.projectDirectory.dir("desktopResources") }
    )
}
```

A folder populated by a Gradle task (for example, downloaded files):

```kotlin
abstract class DownloadRemoteFiles : DefaultTask() {

    @get:OutputDirectory
    val outputDir = layout.buildDirectory.dir("downloadedRemoteFiles")

    @TaskAction
    fun run() { /* your code for downloading files */ }
}

compose.resources {
    customDirectory(
        sourceSetName = "iosMain",
        directoryProvider = tasks.register<DownloadRemoteFiles>("downloadedRemoteFiles").map { it.outputDir.get() }
    )
}
```

### Custom web resource paths

Use `configureWebResources()`: a relative path (starting with `/`) references a resource from the domain root; an absolute URL (`http://` or `https://`) references an external domain or CDN.

```kotlin
// Maps resources to an application-specific path
configureWebResources {
    resourcePathMapping { path -> "/myApp/resources/$path" }
}

// Maps resources to an external CDN
configureWebResources {
    resourcePathMapping { path -> "https://mycdn.com/myApp/res/$path" }
}
```

### Resources in the `androidLibrary` target

Starting with Android Gradle plugin 8.8.0, the generated `Res` class and accessors can be used in the `androidLibrary` target:

```
kotlin {
  androidLibrary {
    androidResources.enable = true
  }
}
```

## Qualifiers

Qualifiers present the same resource differently by locale, screen density, or interface theme. All resource types except raw files in `files` support qualifiers, added to directory names with a hyphen. Priority order: language, theme, density.

- Qualifier types can be combined: `drawable-en-rUS-mdpi-dark` is an image for English in the United States, 160 DPI, dark theme.
- If no resource with the requested qualifier is accessible, the default resource (without a qualifier) is used.

| Qualifier | Values / format |
|-----------|-----------------|
| Language | Two-letter (ISO 639-1) or three-letter (ISO 639-2) code; case-sensitive |
| Region | Two-letter ISO 3166-1-alpha-2 code with lowercase `r` prefix, e.g. `drawable-spa-rMX`; case-sensitive |
| Script / BCP 47 subtag | `b+` prefix, hyphens replaced with `+`: `values-b+zh+Hans`, `values-b+zh+Hant` |
| Theme | `light`, `dark` (selected by current system theme) |
| Density | `ldpi` 120 DPI 0.75x; `mdpi` 160 DPI 1x; `hdpi` 240 DPI 1.5x; `xhdpi` 320 DPI 2x; `xxhdpi` 480 DPI 3x; `xxxhdpi` 640dpi 4x |

### Fallback for languages with multiple scripts

On Android and desktop, the system may request a locale with an empty script (for example `zh` instead of `zh-Hans` / `zh-Hant`). If only script-specific resources exist, all of them match such a request and the resource cannot be resolved, so the app throws an exception. Add a script-less directory for every language that has script-specific resources:

```
commonMain/composeResources/
├── values/                 # Default resources
├── values-zh/              # Resources for `zh` without a script
├── values-b+zh+Hans/
└── values-b+zh+Hant/
```

The same applies to other multi-script languages such as Serbian (`sr-Cyrl`, `sr-Latn`) or Uzbek (`uz-Cyrl`, `uz-Latn`).

## Notes

- Resources in the `androidLibrary` target are Experimental.
- Starting with Compose Multiplatform 1.6.10, all necessary resources are included in the publication Maven artifacts. This requires Kotlin 2.0.0 or newer and Gradle 7.6 or newer.
- The same overview page states: almost all resources are read synchronously in the caller thread (exceptions: raw files and web resources, read asynchronously); reading big raw files as a stream is not supported yet (use `Res.getUri()` and pass files to a system API, for example kotlinx-io); from 1.6.10 resources can be placed in any module or source set (Kotlin 2.0.0+, Gradle 7.6+).
- This page configures the Gradle side of the `org.jetbrains.compose.components` resources library; Android's own `res/` resources (covered by android-compose-ui) are a different mechanism.
- Official demo project: https://github.com/JetBrains/compose-multiplatform/tree/master/components/resources/demo

## Related

- [Using multiplatform resources in your app](./resources-usage.md)
- [Manage local resource environment](./resource-environment.md)
- [Localizing strings](./localize-strings.md)
- [Manage regional formats](./regional-format.md)

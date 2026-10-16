# Get started with Navigation 3

Add the Navigation 3 runtime and UI libraries, plus optional add-ons (ViewModel scoping, Material 3 adaptive layouts, KotlinX Serialization), to an Android project.

## Signature / Usage

`libs.versions.toml`:

```toml
[versions]
nav3Core = "1.2.0"
lifecycleViewmodelNav3 = "2.12.0-alpha04"
kotlinSerialization = "2.2.21"
kotlinxSerializationCore = "1.9.0"
material3AdaptiveNav3 = "1.4.0-alpha03"

[libraries]
# Core Navigation 3 libraries
androidx-navigation3-runtime = { module = "androidx.navigation3:navigation3-runtime", version.ref = "nav3Core" }
androidx-navigation3-ui = { module = "androidx.navigation3:navigation3-ui", version.ref = "nav3Core" }

# Optional add-on libraries
androidx-lifecycle-viewmodel-navigation3 = { module = "androidx.lifecycle:lifecycle-viewmodel-navigation3", version.ref = "lifecycleViewmodelNav3" }
kotlinx-serialization-core = { module = "org.jetbrains.kotlinx:kotlinx-serialization-core", version.ref = "kotlinxSerializationCore" }
androidx-material3-adaptive-navigation3 = { group = "androidx.compose.material3.adaptive", name = "adaptive-navigation3", version.ref = "material3AdaptiveNav3" }

[plugins]
# Optional plugins
jetbrains-kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlinSerialization"}
```

`app/build.gradle.kts`:

```kotlin
plugins {
    ...
    // Optional, provides the @Serialize annotation for autogeneration of Serializers.
    alias(libs.plugins.jetbrains.kotlin.serialization)
}

dependencies {
    ...
    implementation(libs.androidx.navigation3.ui)
    implementation(libs.androidx.navigation3.runtime)
    implementation(libs.androidx.lifecycle.viewmodel.navigation3)
    implementation(libs.androidx.material3.adaptive.navigation3)
    implementation(libs.kotlinx.serialization.core)
}
```

## Options / Props

| Name | What it does | Artifact |
|------|--------------|----------|
| Navigation 3 runtime library | Core Navigation 3 API. Includes `NavEntry`, `EntryProvider` and the associated DSL. | `androidx.navigation3:navigation3-runtime` |
| Navigation 3 UI library | Provides classes to display content, including `NavDisplay` and `Scene`. | `androidx.navigation3:navigation3-ui` |
| ViewModel Lifecycle for Navigation 3 | Allows ViewModels to be scoped to entries in the back stack. | `androidx.lifecycle:lifecycle-viewmodel-navigation3` |
| Material 3 adaptive layouts for Navigation 3 | Provides adaptive layouts (SceneStrategies, Scenes and metadata definitions) for use with NavDisplay. | `androidx.compose.material3.adaptive:adaptive-navigation3` |
| KotlinX Serialization | Allows navigation keys to be serialized. | Plugin `org.jetbrains.kotlin.plugin.serialization`; library `org.jetbrains.kotlinx:kotlinx-serialization-core` |

## Notes

- Update the compile SDK to 36 or later (`compileSdk = "36"` in `libs.versions.toml`).
- Version numbers above are the ones shown in the official guide at the time of retrieval (2026-10); check the AndroidX release pages for current versions. Some add-ons are alpha (`lifecycle-viewmodel-navigation3` 2.12.0-alpha04, `adaptive-navigation3` 1.4.0-alpha03).
- Only the runtime and UI artifacts are required; the other libraries are optional add-ons.
- This is the Android Navigation 3 (Kotlin, `androidx.navigation3`) API — distinct from the same-named SwiftUI / React Router / Next.js navigation API.

## Related

- [Navigation 3 overview](./navigation-3.md)
- [NavDisplay](./navdisplay.md)
- [NavEntry](./naventry.md)
- [Save and manage navigation state](./save-state.md)

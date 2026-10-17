---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-android-dependencies.html
---

# Adding Android dependencies

Android-specific dependencies are declared in a Kotlin Multiplatform module the same way as in pure Android projects, but the recommended place is the Android source set.

## Signature / Usage

In the `build.gradle(.kts)` of the `shared` directory:

```kotlin
kotlin {
    //...
    sourceSets {
        androidMain.dependencies {
            implementation("com.example.android:app-magic:12.3")
        }
    }
}
```

Alternative: a `dependencies {}` block inside the `android {}` block, treated the same as top-level dependencies:

```kotlin
kotlin {
    android {
        //...
        dependencies {
            implementation("com.example.android:app-magic:12.3")
        }
    }
}
```

## Notes

- Moving a top-level dependency with a non-trivial configuration name into a source set can be difficult. For example, a `debugImplementation` dependency becomes an implementation dependency of the source set named `androidDebug`; the `android {}`-scoped `dependencies {}` block minimizes this effort.
- A standalone top-level `dependencies {}` block at the end of the script (idiomatic for Android projects) is supported, but the source strongly recommends against it because mixing top-level Android dependencies with per-source-set dependencies for other targets is confusing.
- Migration (AGP 9): on this page the `kotlin { android { ... } }` form is used. The recommended-structure page states that Android Gradle Plugin 9 or newer requires the `com.android.kotlin.multiplatform.library` plugin with a `kotlin.androidLibrary {}` block in place of `kotlin.androidTarget {}`, and that Android app entry points must be separate modules. See agp-9-migration under compatibility for details.
- Distance line: Gradle dependency configuration for plain Android projects belongs to android-build-gradle; this page covers only where to declare them in a multiplatform module.

## Related

- [add-dependencies.md](./add-dependencies.md)
- [ios-dependencies.md](./ios-dependencies.md)
- [recommended-structure.md](./recommended-structure.md)

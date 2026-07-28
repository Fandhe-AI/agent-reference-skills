# Module build.gradle.kts

The subproject-level build file (e.g. `app/build.gradle.kts`). Declares the plugins used to build the module, the `android { }` configuration block, and the module's dependencies.

## Signature / Usage

```kotlin
plugins {
    id("com.android.application")
}

android {
    namespace = "com.example.myapp"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 23
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

dependencies {
    implementation(project(":lib"))
    implementation("androidx.appcompat:appcompat:1.7.1")
}
```

## Notes

- Should contain: plugins used to build the subproject, configuration blocks required by those plugins, and dependencies (libraries/platforms).
- Should **not** contain build logic (Kotlin function definitions, conditionals) or task declarations — those belong inside plugins.
- The `dependencies { }` block itself is out of scope for this category; see the `dependencies` reference category.

## Related

- [Root build.gradle.kts](./root-build-gradle.md)
- [android {} block](./android-block.md)
- [defaultConfig](./default-config.md)

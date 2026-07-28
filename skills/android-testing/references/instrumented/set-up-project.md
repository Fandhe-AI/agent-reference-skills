# Set up project for AndroidX Test

Gradle configuration required to write and run instrumented tests with AndroidX Test.

## Signature / Usage

```gradle
android {
    defaultConfig {
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
}

dependencies {
    // Core library
    androidTestImplementation "androidx.test:core:$androidXTestVersion"

    // AndroidJUnitRunner and JUnit Rules
    androidTestImplementation "androidx.test:runner:$testRunnerVersion"
    androidTestImplementation "androidx.test:rules:$testRulesVersion"

    // Assertions
    androidTestImplementation "androidx.test.ext:junit:$testJunitVersion"
    androidTestImplementation "androidx.test.ext:truth:$truthVersion"

    // Optional -- UI testing with Espresso
    androidTestImplementation "androidx.test.espresso:espresso-core:$espressoVersion"

    // Optional -- UI testing with UI Automator
    androidTestImplementation "androidx.test.uiautomator:uiautomator:$uiAutomatorVersion"

    // Optional -- UI testing with Compose
    androidTestImplementation "androidx.compose.ui:ui-test-junit4:$compose_version"
}
```

## Notes

- Instrumented test sources live in `module-name/src/androidTest/java/`.
- Ensure Google's Maven repository (`google()`) is declared in `repositories`.
- For deprecated `android.test`-based classes, add `useLibrary 'android.test.runner'` (and `android.test.base`, `android.test.mock`) plus corresponding `<uses-library>` manifest entries.
- Check the [AndroidX Test release notes](https://developer.android.com/jetpack/androidx/releases/test) for current version numbers.

## Related

- [AndroidJUnit4 / AndroidJUnitRunner](./androidjunit4-test-runner.md)

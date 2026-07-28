# Test Dependencies and Source Sets

Local unit tests live in the `test/` source set and use `testImplementation`; instrumented tests live in `androidTest/` and use `androidTestImplementation`.

## Signature / Usage

```gradle
dependencies {
    // Required -- JUnit 4 framework, local unit tests
    testImplementation "junit:junit:$jUnitVersion"

    // Optional -- Robolectric environment
    testImplementation "androidx.test:core:$androidXTestVersion"

    // Optional -- Mockito / mockito-kotlin
    testImplementation "org.mockito:mockito-core:$mockitoVersion"
    testImplementation "org.mockito.kotlin:mockito-kotlin:$mockitoKotlinVersion"

    // Optional -- MockK
    testImplementation "io.mockk:mockk:$mockkVersion"
}
```

## Notes

- `test/` (`module-name/src/test/`): local unit tests, run on the host JVM. `androidTest/` (`module-name/src/androidTest/`): instrumented tests, run on a device/emulator.
- `testImplementation` adds a dependency for local (`test/`) tests only; `androidTestImplementation` adds it for instrumented (`androidTest/`) tests only.
- The `test/` source set is created automatically for new Android projects.
- Local tests cannot access real Android framework classes; the Android Gradle Plugin provides a mockable Android library (empty method bodies, throws unless mocked) so classes like `Context` can still be referenced.
- If unmocked Android methods throw and cannot be avoided, `testOptions.unitTests.returnDefaultValues = true` in the top-level `build.gradle` makes them return null/zero — use as a last resort since it can mask real bugs.

## Related

- [test-pyramid](./test-pyramid.md)
- [junit4-basics](./junit4-basics.md)
- [Instrumented tests setup](../instrumented/README.md)

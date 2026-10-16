# Espresso setup instructions

Add Espresso as Gradle dependencies (androidx.test.espresso artifacts from Google Maven) and configure the instrumentation runner (Android Studio recommended): dependencies, instrumentation runner, first test, and how to run.

## Signature / Usage

```kotlin
// app/build.gradle.kts
android {
    defaultConfig {
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
}

dependencies {
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
    androidTestImplementation("androidx.test:runner:1.6.1")
    androidTestImplementation("androidx.test:rules:1.6.1")
    androidTestImplementation("androidx.test.ext:junit:1.3.0") // required for AndroidJUnit4 (see AndroidX Test setup page)
}
```

Groovy form:

```groovy
android {
    defaultConfig {
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
}

dependencies {
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.6.1'
    androidTestImplementation 'androidx.test:runner:1.6.1'
    androidTestImplementation 'androidx.test:rules:1.6.1'
    androidTestImplementation 'androidx.test.ext:junit:1.3.0' // required for AndroidJUnit4 (see AndroidX Test setup page)
}
```

### First test

Android Studio creates tests by default in `src/androidTest/java/com.example.package/`.

```kotlin
@RunWith(AndroidJUnit4::class)
@LargeTest
class HelloWorldEspressoTest {

    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)

    @Test fun listGoesOverTheFold() {
        onView(withText("Hello world!")).check(matches(isDisplayed()))
    }
}
```

### Run tests

- Android Studio: Run > Edit Configurations, add a new Android Tests configuration, choose a module, set the instrumentation runner `androidx.test.runner.AndroidJUnitRunner`, then run it.
- Command line:

```bash
./gradlew connectedAndroidTest
```

## Notes

- To avoid flakiness, turn off system animations on devices used for testing. In Settings > Developer options disable: Window animation scale, Transition animation scale, Animator duration scale.
- Add the dependencies to the app module's `build.gradle(.kts)` (usually `app/build.gradle` or `app/build.gradle.kts`, not the top-level file).
- `AndroidJUnit4` comes from `androidx.test.ext:junit`, which the Espresso setup page's dependency list omits; it is listed on https://developer.android.com/training/testing/instrumented-tests/androidx-test-libraries/test-setup
- The official page intro says to install Espresso using the SDK Manager; Espresso is distributed as Maven artifacts and is added via Gradle dependencies as shown above.
- The official Kotlin tab shows single-quoted strings, which are not valid Kotlin; use double quotes.
- The test runner collects analytics (a hash of the package name of the app under test per invocation). Opt out by including the `disableAnalytics` argument in your instrumentation command (fragment as shown in the source; a full invocation also needs `-w <test-package>/androidx.test.runner.AndroidJUnitRunner`, or pass it from Gradle with `-Pandroid.testInstrumentationRunnerArguments.disableAnalytics=true`):

```bash
adb shell am instrument -e disableAnalytics true
```

- The official example Gradle build uses `compileSdkVersion 36`, `minSdkVersion 23`, `targetSdkVersion 36`, with `androidx.test:runner:1.6.1` and `espresso-core:3.6.1`.
- Source: https://developer.android.com/training/testing/espresso/setup

## Related

- [Espresso overview](./overview.md)
- [Espresso basics](./basics.md)
- [Best practices](./best-practices.md)

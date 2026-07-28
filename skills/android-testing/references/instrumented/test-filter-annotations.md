# Test filter annotations (@SmallTest / @MediumTest / @LargeTest / @SdkSuppress / @FlakyTest)

AndroidX Test annotations used to classify or conditionally run instrumented tests, so subsets can be selected for execution (e.g. by size or by API level).

## Signature / Usage

```kotlin
@RunWith(AndroidJUnit4::class)
@SmallTest
class LogHistoryAndroidUnitTest { /* ... */ }

@SdkSuppress(minSdkVersion = 23)
@Test
fun testOnlyOnApi23Plus() { /* ... */ }
```

```bash
# Run only tests annotated @SmallTest
-Pandroid.testInstrumentationRunnerArguments.size=small
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `minSdkVersion` | `Int` | — | `@SdkSuppress` argument: skip the test below this API level. |
| `maxSdkVersion` | `Int` | — | `@SdkSuppress` argument: skip the test above this API level. |
| `excludedSdks` | `IntArray` | — | `@SdkSuppress` argument: skip the test on the listed API levels. |

## Notes

- `@SmallTest` marks a fast, isolated test (expected < 200ms); use for unit-style tests.
- `@MediumTest` marks a test of moderate scope/duration.
- `@LargeTest` marks a slow, broad-scope test (e.g. full UI flows).
- `@RequiresDevice` runs the test only on physical devices, not emulators.
- `@FlakyTest` marks a test known to be flaky; can be excluded from strict CI runs.
- When `@SdkSuppress` is applied at both class and method level, the method-level annotation takes precedence.
- Size annotations correspond to runner arguments (`size=small|medium|large`) usable to filter which tests execute.

## Related

- [AndroidJUnit4 / AndroidJUnitRunner](./androidjunit4-test-runner.md)

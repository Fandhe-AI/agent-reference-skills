# Unit testing Glance composables: runGlanceAppWidgetUnitTest, provideComposable, onNode

Lightweight unit-test API for Glance composables that runs without inflating views or a UI automator, so it works as plain JVM/instrumented tests. Artifacts: `androidx.glance:glance-testing`, `androidx.glance:glance-appwidget-testing`.

## Signature / Usage

```kotlin
// build.gradle(.kts)
testImplementation("androidx.glance:glance-testing:1.1.1")
testImplementation("androidx.glance:glance-appwidget-testing:1.1.1")
```

```kotlin
private const val FAKE_HEADLINE = "EXTRA! EXTRA! READ ALL ABOUT IT!"

class MyGlanceComposableTest {
    @Test
    fun myNewsItemComposable_largeSize_hasHeadline() = runGlanceAppWidgetUnitTest {
        // Set the composable to test
        provideComposable {
            MyNewsItemComposable(FAKE_HEADLINE)
        }

        // Perform assertions
        onNode(hasTestTag("headline"))
            .assertHasText(FAKE_HEADLINE)
    }
}

@Composable
fun MyNewsItemComposable(headline: String) {
    Row {
        Text(
            text = headline,
            modifier = GlanceModifier.semantics { testTag = "headline" },
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `runGlanceAppWidgetUnitTest(duration) { ... }` | test wrapper function | `duration = 1.second` | Runs the block as a Glance unit test; override `duration` to change the composition timeout. |
| `provideComposable { ... }` | function, called inside `runGlanceAppWidgetUnitTest` | — | Supplies the composable under test. |
| `setContext(context)` | function, called before `provideComposable` | — | Sets the `Context` seen by `LocalContext.current` inside the composable under test. |
| `LocalSize` value | set before `provideComposable` | `349.dp x 455.dp` (5x4 widget, Pixel 4 portrait) | Intended widget size seen by the composable; set to `minWidth`/`minHeight` from `info.xml` (single mode), a specific size (exact mode), or one supported size (responsive mode). |
| `onNode(matcher)` | function | — | Targets a single Glance node matching a matcher (e.g. `hasTestTag`, `hasContentDescriptionEqualTo`, `isChecked`). |
| `onAllNodes(matcher)` | function | — | Targets all Glance nodes matching a matcher. |
| `assertHasText(text)` | assertion on a node | — | Asserts the node's text content. |

## Notes

- Composables are not rendered, so clicks cannot be performed — instead, assert on the `Action` attached to a clickable (e.g. that it starts a given activity/service) rather than simulating a tap.
- Organize composable functions outside the `GlanceAppWidget` class so they can be called directly from `provideComposable` and reused.
- Matchers include `hasTestTag`, `hasContentDescriptionEqualTo`, `isChecked`; apply `testTag` via `GlanceModifier.semantics { testTag = "..." }` on the composable under test.
- May be combined with Robolectric if a test needs to set a `LocalContext` in a JVM (non-instrumented) test.

## Related

- [glance-modifier](./glance-modifier.md)
- [actions](./actions.md)
- [error-handling](./error-handling.md)

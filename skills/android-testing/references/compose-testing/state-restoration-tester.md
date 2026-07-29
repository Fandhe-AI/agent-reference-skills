# StateRestorationTester

Tests that a composable's `rememberSaveable` state survives a save/restore cycle (e.g. process death or configuration change) without relaunching the Activity, by disposing and recomposing the content in place.

## Signature / Usage

```kotlin
class StateRestorationTester(private val composeTestRule: ComposeContentTestRule) {
    fun setContent(composable: @Composable () -> Unit)
    fun emulateSavedInstanceStateRestore()
}
```

```kotlin
class MyRestorationTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    private val restorationTester = StateRestorationTester(composeTestRule)

    @Test
    fun selectionSurvivesRestore() {
        restorationTester.setContent {
            MyScreen()
        }

        composeTestRule.onNodeWithText("Item 2").performClick()

        // Save state, dispose the composition, and recompose it fresh.
        restorationTester.emulateSavedInstanceStateRestore()

        composeTestRule.onNodeWithText("Item 2").assertIsSelected()
    }
}
```

## Notes

- Use `restorationTester.setContent { ... }` instead of `composeTestRule.setContent { ... }` — it must own the content in order to intercept the `SaveableStateRegistry`.
- `emulateSavedInstanceStateRestore()` saves everything stored via `rememberSaveable`, disposes the current composition, and recomposes it with the restored values; state held by plain `remember` is lost, matching real restoration semantics.
- This only exercises local `rememberSaveable` state restoration, not the app/Activity lifecycle itself (`onSaveInstanceState`, process death) — for full-process testing use an instrumented Activity relaunch instead.
- Two classes share this name: `androidx.compose.ui.test.junit4.StateRestorationTester(ComposeContentTestRule)` (documented here, with `emulateSavedInstanceStateRestore()`) and the newer `androidx.compose.ui.test.StateRestorationTester(ComposeUiTest)` (`@ExperimentalTestApi`, used with `runComposeUiTest`, method named `emulateSaveAndRestore()` instead) — the method names are not interchangeable between the two.
- Package: `androidx.compose.ui.test.junit4`. Artifact: `androidx.compose.ui:ui-test-junit4`.

## Related

- [compose-test-rule](./compose-test-rule.md)
- [synchronization](./synchronization.md)

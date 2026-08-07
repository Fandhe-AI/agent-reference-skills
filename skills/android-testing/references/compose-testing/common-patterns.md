# Common Patterns

Well-established approaches for testing Compose apps: isolating composables, reaching activity resources from `setContent`, exposing custom semantics, verifying state restoration, and testing device configurations.

## Signature / Usage

```kotlin
// Access activity resources after setContent
class MyComposeTest {
    @get:Rule
    val composeTestRule = createAndroidComposeRule<ComponentActivity>()

    @Test
    fun myTest() {
        composeTestRule.setContent {
            MyAppTheme {
                MainScreen(uiState = exampleUiState, /*...*/)
            }
        }
        val continueLabel = composeTestRule.activity.getString(R.string.next)
        composeTestRule.onNodeWithText(continueLabel).performClick()
    }
}
```

```kotlin
// Custom semantics property
val PickedDateKey = SemanticsPropertyKey<Long>("PickedDate")
var SemanticsPropertyReceiver.pickedDate by PickedDateKey

MyCustomDatePicker(
    modifier = Modifier.semantics { pickedDate = datePickerValue }
)

composeTestRule
    .onNode(SemanticsMatcher.expectValue(PickedDateKey, 1445378400)) // 2015-10-21
    .assertExists()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DarkMode()` | `DeviceConfigurationOverride` | Overrides system dark/light theme. |
| `FontScale(scale)` | `DeviceConfigurationOverride` | Overrides system font scale. |
| `FontWeightAdjustment(adjustment)` | `DeviceConfigurationOverride` | Overrides system font weight adjustment. |
| `ForcedSize(size)` | `DeviceConfigurationOverride` | Forces a specific space (`DpSize`) regardless of device size. |
| `LayoutDirection(direction)` | `DeviceConfigurationOverride` | Overrides layout direction (LTR or RTL). |
| `Locales(locales)` | `DeviceConfigurationOverride` | Overrides locale. |
| `RoundScreen(isRound)` | `DeviceConfigurationOverride` | Overrides whether the screen is round. |

## Notes

- Test in isolation via `ComposeTestRule.setContent` — this starts an activity displaying just the composable under test (full app, single screen, or small element), but larger-scope UI tests are still needed alongside this.
- Reaching activity resources (e.g. string resources) from `setContent` requires `createAndroidComposeRule<ComponentActivity>()`, plus `debugImplementation("androidx.compose.ui:ui-test-manifest:$compose_version")` so `ComponentActivity` is present in the test manifest.
- Custom semantics properties (`SemanticsPropertyKey`) should only be added when existing finders/matchers can't match an item; avoid exposing purely visual properties (colors, font size, rounded corners) as it pollutes production code.
- `DeviceConfigurationOverride.then()` combines multiple overrides, e.g. `FontScale(1.5f) then FontWeightAdjustment(200)`.
- Package: `androidx.compose.ui.test`.

## Related

- [compose-test-rule](./compose-test-rule.md)
- [state-restoration-tester](./state-restoration-tester.md)
- [device-configuration-override](./device-configuration-override.md)
- [semantics-matcher](./semantics-matcher.md)

# DeviceConfigurationOverride

Wraps test content and locally overrides a device-wide property — screen/window size, font scale, or layout direction — for just that subtree, so a composable can be tested at arbitrary configurations on a single device without a real large-screen device or emulator.

## Signature / Usage

```kotlin
@Composable
fun DeviceConfigurationOverride(
    override: DeviceConfigurationOverride,
    content: @Composable () -> Unit,
)

fun interface DeviceConfigurationOverride {
    @Composable
    fun Override(contentUnderTest: @Composable () -> Unit)
    companion object
}

fun DeviceConfigurationOverride.Companion.ForcedSize(size: DpSize): DeviceConfigurationOverride
```

```kotlin
@Test
fun rendersCorrectly_onTablet() {
    composeTestRule.setContent {
        DeviceConfigurationOverride(
            DeviceConfigurationOverride.ForcedSize(DpSize(1280.dp, 800.dp))
        ) {
            MyScreen()
        }
    }

    composeTestRule.onNodeWithText("Details pane").assertIsDisplayed()
}
```

## Notes

- `ForcedSize` overrides `LocalDensity` so the requested `DpSize` is met without clipping (unlike `Modifier.requiredSize`, which clips instead of resizing available space).
- Sibling overrides in the same `DeviceConfigurationOverride.Companion`: `FontScale(fontScale: Float)`, `LayoutDirection(layoutDirection: LayoutDirection)`, and `WindowSize(size: DpSize)` — `WindowSize` additionally overrides `LocalWindowInfo`/`LocalConfiguration` (window-size-class breakpoints), whereas `ForcedSize` only overrides the measured size.
- Combine multiple overrides with the `then` infix function: `DeviceConfigurationOverride.ForcedSize(size) then DeviceConfigurationOverride.FontScale(2f)`.
- Package: `androidx.compose.ui.test` (artifact `androidx.compose.ui:ui-test`), distinct from the JUnit4 rule factories in `androidx.compose.ui.test.junit4`.

## Related

- [compose-test-rule](./compose-test-rule.md)
- [screenshot-testing](./screenshot-testing.md)

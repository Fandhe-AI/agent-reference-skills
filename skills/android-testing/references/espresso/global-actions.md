# Espresso.pressBack / openActionBarOverflowOrOptionsMenu

Static utility methods on the `Espresso` class for actions that are not scoped to a specific located view, such as simulating the device Back button or opening the action bar's overflow/options menu.

## Signature / Usage

```kotlin
fun Espresso.pressBack()
fun Espresso.pressBackUnconditionally()
fun openActionBarOverflowOrOptionsMenu(context: Context)
fun openContextualActionModeOverflowMenu()
```

```kotlin
// Open the overflow menu and click an item
openActionBarOverflowOrOptionsMenu(
    InstrumentationRegistry.getInstrumentation().targetContext
)
onView(withText("Settings")).perform(click())

// Simulate the device Back button
Espresso.pressBack()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pressBack()` | `() -> Unit` | Simulates pressing the device Back button; fails the test if there is nothing to consume the press. |
| `pressBackUnconditionally()` | `() -> Unit` | Same as `pressBack()`, but does not fail if the press is not consumed. |
| `openActionBarOverflowOrOptionsMenu(context: Context)` | `(Context) -> Unit` | Opens the overflow menu (software) or options menu (hardware menu key) of the action bar. |
| `openContextualActionModeOverflowMenu()` | `() -> Unit` | Opens the overflow menu of an active contextual action bar. |

## Notes

- These are static methods on `androidx.test.espresso.Espresso`, distinct from the `pressBack()` `ViewAction` returned by `ViewActions.pressBack()` used inside `.perform()` on a specific view — see [ViewActions](./viewactions.md).
- Use `openActionBarOverflowOrOptionsMenu()` for menu items hidden behind an overflow icon or triggered by the hardware Menu key on older devices.
- Artifact: `androidx.test.espresso:espresso-core`.

## Related

- [ViewActions](./viewactions.md)
- [Espresso.onView](./onview.md)

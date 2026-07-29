# DrawerActions / PickerActions / NavigationViewActions

`espresso-contrib` `ViewAction`s for widgets that `ViewActions`/`ViewMatchers` alone can't drive: opening/closing a `DrawerLayout`, setting a value on a `DatePicker`/`TimePicker`, and navigating a `NavigationView` menu item.

## Signature / Usage

```kotlin
import androidx.test.espresso.contrib.DrawerActions
import androidx.test.espresso.contrib.PickerActions
import androidx.test.espresso.contrib.NavigationViewActions

// Open a DrawerLayout, then act on content behind it
onView(withId(R.id.drawer_layout)).perform(DrawerActions.open())
onView(withText("Settings")).perform(click())
onView(withId(R.id.drawer_layout)).perform(DrawerActions.close())

// Set a DatePicker value
onView(withClassName(equalTo(DatePicker::class.java.name)))
    .perform(PickerActions.setDate(2020, 6, 15))

// Navigate a NavigationView menu item
onView(withId(R.id.nav_view))
    .perform(NavigationViewActions.navigateTo(R.id.nav_gallery))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DrawerActions.open()` / `open(gravity: Int)` | `ViewAction` | Opens the `DrawerLayout` drawer (default gravity `START`); blocks until fully open; no-op if already open. |
| `DrawerActions.close()` / `close(gravity: Int)` | `ViewAction` | Closes the `DrawerLayout` drawer (default gravity `START`); blocks until fully closed; no-op if already closed. |
| `DrawerActions.waitForClose()` | `ViewAction` | Waits for a drawer that is closing implicitly (e.g. after selecting a drawer item) to finish closing; uses an `IdlingResource` internally. |
| `PickerActions.setDate(year, monthOfYear, dayOfMonth)` | `ViewAction` | Sets a date on a `DatePicker`; `monthOfYear` is zero-based. |
| `PickerActions.setTime(hours, minutes)` | `ViewAction` | Sets a time on a `TimePicker`; `hours` is `0`-`23`, `minutes` is `0`-`59`. |
| `NavigationViewActions.navigateTo(menuItemId: Int)` | `ViewAction` | Selects the given menu item resource id in a `NavigationView`; the target view must be a `NavigationView` child of a `DrawerLayout` and visible/displayed. |

## Notes

- Requires the `espresso-contrib` artifact (`androidx.test.espresso:espresso-contrib`), same as `RecyclerViewActions`.
- `DrawerActions` and `NavigationViewActions` target the `DrawerLayout` / `NavigationView` container view, not the individual drawer/menu item view.

## Related

- [RecyclerViewActions](./recyclerviewactions.md)
- [ViewActions](./viewactions.md)

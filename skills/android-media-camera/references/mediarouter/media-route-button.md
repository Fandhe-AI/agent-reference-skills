# MediaRouteButton and MediaRouteActionProvider

Standard UI widget that shows the current route state and, on tap, opens the system route-chooser/controller dialog. `MediaRouteButton` is a plain `View` for placing anywhere in a layout; `MediaRouteActionProvider` wraps it as an action-bar/toolbar menu item. Package: `androidx.mediarouter.app`.

## Signature / Usage

```xml
<!-- res/menu/main_menu.xml -->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto">
    <item android:id="@+id/media_route_menu_item"
        android:title="@string/media_route_menu_title"
        app:actionProviderClass="androidx.mediarouter.app.MediaRouteActionProvider"
        app:showAsAction="always"/>
</menu>
```

```kotlin
override fun onCreateOptionsMenu(menu: Menu): Boolean {
    menuInflater.inflate(R.menu.main_menu, menu)
    val menuItem = menu.findItem(R.id.media_route_menu_item)
    val actionProvider = MenuItemCompat.getActionProvider(menuItem) as MediaRouteActionProvider
    actionProvider.routeSelector = selector
    return true
}
```

```java
// Direct View usage (outside a menu)
MediaRouteButton mediaRouteButton = findViewById(R.id.media_route_button);
mediaRouteButton.setRouteSelector(selector);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `routeSelector` / `setRouteSelector(MediaRouteSelector)` | `MediaRouteSelector` | empty | Restricts which routes the button shows and triggers discovery for. |
| `dialogFactory` / `setDialogFactory(MediaRouteDialogFactory)` | `MediaRouteDialogFactory` | default factory | Customizes the chooser (`MediaRouteChooserDialogFragment`) / controller (`MediaRouteControllerDialogFragment`) shown on tap. |
| `app:actionProviderClass` (menu XML) | string | — | Must be `androidx.mediarouter.app.MediaRouteActionProvider` to host the button as a toolbar action. |

## Notes

- Tapping the button opens `MediaRouteChooserDialog` when no remote route is selected, or `MediaRouteControllerDialog` (with volume slider / disconnect) once one is selected — both are provided by the framework and require no manual dialog code.
- The button visually updates itself (icon state, visibility when no matching routes exist) automatically as `MediaRouter` route state changes for the attached selector; no manual callback wiring is needed just to keep the icon in sync.
- Requires the host `Activity`/`Fragment` to use an `AppCompatActivity`/`AppCompatDialogFragment` context.

## Related

- [MediaRouter](./media-router.md)
- [MediaRouteSelector](./media-route-selector.md)
- [MediaRouteProvider](./media-route-provider.md)

# `NavController.handleDeepLink` and `NavDeepLinkBuilder`

`handleDeepLink` dispatches an incoming implicit deep-link `Intent` to the right destination on an existing `NavController`; `NavDeepLinkBuilder` constructs an explicit deep link (a `PendingIntent`) for use in notifications, widgets, and similar system surfaces.

## Signature / Usage

```kotlin
// Implicit deep link: dispatch a received Intent (needed when the Activity's
// launchMode isn't the default "standard", e.g. singleTop)
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    navController.handleDeepLink(intent)
}
```

```kotlin
// Explicit deep link for an XML nav graph
val pendingIntent = NavDeepLinkBuilder(context)
    .setGraph(R.navigation.nav_graph)
    .setDestination(R.id.android)
    .setArguments(args)
    .createPendingIntent()
```

```kotlin
// Explicit deep link for a programmatic graph (Navigation Compose), via TaskStackBuilder
val deepLinkIntent = Intent(
    Intent.ACTION_VIEW,
    "https://www.example.com/profile/$id".toUri(),
    context,
    MyActivity::class.java,
)
val pendingIntent = TaskStackBuilder.create(context).run {
    addNextIntentWithParentStack(deepLinkIntent)
    getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setGraph(R.navigation.*)` | `NavDeepLinkBuilder` method | — | XML nav graph resource to target. |
| `setDestination(R.id.*)` | `NavDeepLinkBuilder` method | — | Destination id within the graph. |
| `setArguments(Bundle)` | `NavDeepLinkBuilder` method | — | Arguments passed to the destination. |
| `setComponentName(Activity::class.java)` | `NavDeepLinkBuilder` method | — | Overrides the target `Activity` if `NavHost` lives outside the default one. |
| `createPendingIntent()` | `NavDeepLinkBuilder` method | — | Builds the final `PendingIntent`. |

## Notes

- With the default `standard` launch mode, incoming implicit deep links are handled automatically; only alternate launch modes (e.g. `singleTop`) require manually calling `handleDeepLink()` from `onNewIntent`.
- `NavController.createDeepLink()` can be used instead of `NavDeepLinkBuilder` when an existing `NavController` instance is available.
- Explicit deep links (via `PendingIntent`) clear and replace the task back stack with the deep-link destination; implicit deep links opened with `FLAG_ACTIVITY_NEW_TASK` behave the same, while implicit deep links without that flag keep the user on the originating app's task stack (Back returns to the previous app).
- This is Android deep linking / App Links (Kotlin, `androidx.navigation` and `AndroidManifest.xml`) — distinct from the same-named concept in other skills.

## Related

- [nav-deep-link](./nav-deep-link.md)
- [intent-action-view-launch-mode](./intent-action-view-launch-mode.md)

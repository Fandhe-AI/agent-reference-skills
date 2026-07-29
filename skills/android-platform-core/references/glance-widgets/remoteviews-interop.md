# Interop with classic RemoteViews: AndroidRemoteViews

An escape hatch composable for embedding a hand-built XML `RemoteViews` layout inside a Glance composition, or for embedding Glance composables inside an existing `RemoteViews` container — useful when a feature isn't yet available in Glance or an existing `RemoteViews` layout needs to be reused as-is.

## Signature / Usage

```kotlin
// Place a RemoteViews layout directly alongside Glance composables.
val packageName = LocalContext.current.packageName
Column(modifier = GlanceModifier.fillMaxSize()) {
    Text("Isn't that cool?")
    AndroidRemoteViews(RemoteViews(packageName, R.layout.example_layout))
}
```

```kotlin
// Use a RemoteViews layout as a container that hosts Glance composables.
AndroidRemoteViews(
    remoteViews = RemoteViews(packageName, R.layout.my_container_view),
    containerViewId = R.id.example_view,
) {
    Column(modifier = GlanceModifier.fillMaxSize()) {
        Text("My title")
        Text("Maybe a long content...")
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `remoteViews` | `RemoteViews` | The XML-based `RemoteViews` to render inline in the Glance tree, or the container layout to host composable children in the second overload. |
| `containerViewId` | `Int` (view id, optional) | ID of a `ViewGroup` inside `remoteViews` that the trailing Glance composable content is rendered into. Omit for plain "drop this RemoteViews in" usage. |

## Notes

- The view referenced by `containerViewId` must be a `ViewGroup` supported by `RemoteViews`; any existing children it has in the XML layout are removed and replaced with the rendered Glance content.
- This is an interop/escape-hatch API, not a general authoring pattern — prefer native Glance composables (`Box`/`Column`/`Row`, `Text`, `Button`, etc.) and reach for `AndroidRemoteViews` only for features Glance doesn't expose or to reuse existing `RemoteViews` layouts.
- Artifact: `androidx.glance:glance-appwidget`.

## Related

- [layout-containers](./layout-containers.md)
- [remoteviews-legacy](./remoteviews-legacy.md)

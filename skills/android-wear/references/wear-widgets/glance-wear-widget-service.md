# GlanceWearWidgetService / GlanceWearWidget

Entry-point `Service` a Wear app extends to provide a Wear Widget (the partial-height 2x1/2x2 successor to full-screen tiles). The service exposes a `GlanceWearWidget`, whose `provideWidgetData()` builds the widget's content as a Remote Compose document.

## Signature / Usage

```kotlin
class HelloWidgetService : GlanceWearWidgetService() {
    override val widget: GlanceWearWidget = HelloWidget()
}

class HelloWidget : GlanceWearWidget() {
    override suspend fun provideWidgetData(
        context: Context,
        params: WearWidgetParams,
    ): WearWidgetData {
        return WearWidgetDocument(background = WearWidgetBrush.color(Color.Blue.rc)) {
            HelloWidgetContent()
        }
    }
}

@RemoteComposable @Composable
fun HelloWidgetContent() {
    RemoteBox(
        modifier = RemoteModifier.fillMaxSize(),
        contentAlignment = RemoteAlignment.Center,
    ) {
        RemoteText(
            text = "Hello World".rs,
            color = Color.White.rc
        )
    }
}
```

Manifest declaration:

```xml
<service
    android:name=".snippets.widget.HelloWidgetService"
    android:exported="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/hello_widget_label"
    android:permission="com.google.android.wearable.permission.BIND_TILE_PROVIDER">

    <intent-filter>
        <action android:name="androidx.glance.wear.action.BIND_WIDGET_PROVIDER" />
        <!-- If you already have a Tile, omit the following line. -->
        <action android:name="androidx.wear.tiles.action.BIND_TILE_PROVIDER" />
    </intent-filter>

    <meta-data
        android:name="androidx.glance.wear.widget.provider"
        android:resource="@xml/hello_widget_info" />

    <meta-data
        android:name="androidx.wear.tiles.PREVIEW"
        android:resource="@drawable/tile_preview" />
</service>
```

Widget info XML (`res/xml/hello_widget_info.xml`), declaring supported container sizes:

```xml
<wearwidget-provider
    description="@string/hello_widget_description"
    icon="@mipmap/ic_launcher"
    label="@string/hello_widget_label"
    preferredType="SMALL">

    <container
        type="SMALL"
        previewImage="@drawable/widget_preview_small" />
    <container
        type="LARGE"
        previewImage="@drawable/widget_preview_large" />
</wearwidget-provider>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `GlanceWearWidgetService.widget` | `GlanceWearWidget` | — | Abstract property returning the single widget instance this service provides. |
| `GlanceWearWidget.provideWidgetData(context, params)` | `suspend (Context, WearWidgetParams) -> WearWidgetData` | — | `@MainThread` suspend function invoked by the system to produce the widget's content; the `suspend` modifier lets it dispatch work to another dispatcher internally, but the call itself is made on the main thread. |
| `WearWidgetDocument(background, content)` | `WearWidgetData` | — | Builds the widget's Remote Compose document; `background` accepts a `WearWidgetBrush`, `content` is a `@RemoteComposable` lambda. |
| `<wearwidget-provider preferredType>` | `"SMALL"` \| `"LARGE"` | — | XML attribute naming the default container size shown when the system has not chosen otherwise. |
| `<container type>` | `"SMALL"` \| `"LARGE"` | — | One `<container>` element per supported size (2x1 small, 2x2 large), each with its own `previewImage`. |

## Notes

- Package/artifacts: `androidx.glance.wear:wear`, `androidx.glance.wear:wear-core` (widget runtime, `1.0.0-alpha14`), `androidx.compose.remote:remote-creation-compose`, `androidx.compose.remote:remote-core` (Remote Compose, `1.0.0-alpha15`), `androidx.wear.compose.remote:remote-material3` (Material3 Remote Compose components, `1.0.0-alpha15`) — versions as of this writing.
- The manifest `<service>` reuses the tiles permission `com.google.android.wearable.permission.BIND_TILE_PROVIDER` and can declare both `androidx.glance.wear.action.BIND_WIDGET_PROVIDER` and `androidx.wear.tiles.action.BIND_TILE_PROVIDER` intent-filter actions on the same service class — see migrate-from-tiles for the dual-service vs. single-service strategy this enables.
- Requires a Wear OS 7 emulator or device (Wear Widgets renderer 1.6.1+) and `compileSdk`/`targetSdk` 37+.
- Debug via `adb shell am broadcast -a com.google.android.wearable.app.DEBUG_SURFACE --es operation add-tile --ecn component <package>/.HelloWidgetService` to add the widget to the carousel, and `-a com.google.android.wearable.app.DEBUG_SYSUI --es operation show-tile --ei index 0` to display it.
- This is a distinct, Wear-only API from the mobile `androidx.glance.appwidget` Glance widgets (RemoteViews-based, covered under android-platform-core) — do not confuse `GlanceWearWidget` with `GlanceAppWidget`.

## Related

- [remote-compose-layout](./remote-compose-layout.md)
- [remote-state-and-actions](./remote-state-and-actions.md)
- [migrate-from-tiles](./migrate-from-tiles.md)

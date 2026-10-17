# GlanceWearWidgetService / GlanceWearWidget

Entry-point `Service` a Wear app extends to provide a Wear Widget (the partial-height 2x1/2x2 successor to full-screen tiles). The service exposes a `GlanceWearWidget`, whose `provideWidgetData()` builds the widget's content as a Remote Compose document.

## Signature / Usage

```kotlin
@AssociateWithGlanceWearWidget(HelloWidget::class)
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
| `@AssociateWithGlanceWearWidget(HelloWidget::class)` | annotation on the service | — | Associates the `GlanceWearWidgetService` with its `GlanceWearWidget` class. |
| `GlanceWearWidget.triggerUpdateAll(context)` | `Context` | — | Requests a content update for all active instances of the widget, e.g. `HelloWidget().triggerUpdateAll(context)`. |
| `GlanceWearWidget.triggerUpdate(context, WidgetInstanceId)` | `Context`, `WidgetInstanceId` | — | Updates a specific widget instance without refreshing all active instances. |
| `WearWidgetPreview(widget, params)` | `@Composable` preview helper | — | Previews the widget in Android Studio with `@Preview`; `params` comes from `@PreviewParameter(SquircleAllWidgetPreviewParams::class)` (or `RoundAllWidgetPreviewParams` / `RectangularAllWidgetPreviewParams`). A content lambda and background brush can be passed instead of a widget instance. |
| `GlanceWearWidgetService.widget` | `GlanceWearWidget` | — | Abstract property returning the single widget instance this service provides. |
| `GlanceWearWidget.provideWidgetData(context, params)` | `suspend (Context, WearWidgetParams) -> WearWidgetData` | — | `@MainThread` suspend function invoked by the system to produce the widget's content; the `suspend` modifier lets it dispatch work to another dispatcher internally, but the call itself is made on the main thread. |
| `WearWidgetDocument(background, content)` | `WearWidgetData` | — | Builds the widget's Remote Compose document; `background` accepts a `WearWidgetBrush`, `content` is a `@RemoteComposable` lambda. |
| `<wearwidget-provider preferredType>` | `"SMALL"` \| `"LARGE"` | — | XML attribute naming the default container size shown when the system has not chosen otherwise. |
| `<container type>` | `"SMALL"` \| `"LARGE"` | — | One `<container>` element per supported size (2x1 small, 2x2 large), each with its own `previewImage`. |

## Notes

- Package/artifacts (versions per the get-started guide, 2026-10-09): `androidx.glance.wear:wear`, `androidx.glance.wear:wear-core` (widget runtime, `1.0.0-alpha20`), `androidx.compose.remote:remote-creation-compose`, `androidx.compose.remote:remote-core` (Remote Compose, `1.0.0-alpha21`), `androidx.wear.compose.remote:remote-material3` (Material3 Remote Compose components, `1.0.0-alpha13`; the wear-compose-remote release page, October 07, 2026, confirms alpha13 as the latest, so the number is lower than the Remote Compose artifacts). Optional tooling from the same dependency block: `androidx.compose.remote:remote-tooling-preview:1.0.0-alpha21`, `androidx.wear.compose:compose-ui-tooling:1.7.1`, `androidx.wear.tiles:tiles-tooling-preview:1.6.2`, and `debugImplementation("androidx.wear.tiles:tiles-renderer:1.6.2")`. All Wear Widget and Remote Compose artifacts are alpha.
- Always supply the background brush directly to `WearWidgetDocument(background = ...)` so the host system can paint and mask it to the native OEM container shape; do not set a transparent or black canvas and draw a custom rounded container inside the layout (floating box / letterboxing defects on some devices). The root container composable must use `RemoteModifier.fillMaxSize()`, because container dimensions and safe insets vary across watch models.
- Predefined preview suites (from `androidx.glance.wear:wear-tooling-preview`, referenced by the guide): `SquircleAllWidgetPreviewParams` (rounded rectangle containers), `RoundAllWidgetPreviewParams` (pill-shaped containers), `RectangularAllWidgetPreviewParams` (uncropped rectangular containers with safe padding). To generate `previewImage` assets, use `@Preview(name = "Widget Preview Asset", device = "spec:width=1000dp,height=1000dp,dpi=320")` with `RectangularAllWidgetPreviewParams` (generates small and large variants) and save the images to `res/drawable-nodpi/`, e.g. `widget_preview_small.png` / `widget_preview_large.png`.
- `adb ... add-tile` adds a FULLSCREEN tile by default; pass `--ei type [0|1|2]` to choose the size (type 0 is FULLSCREEN, the others are LARGE and SMALL). With Wear Widget library versions up to `1.0.0-alpha10`, app-triggered `triggerUpdate()` might fail for non-fullscreen types depending on device state (fixed starting in `1.0.0-alpha11`).
- The manifest `<service>` reuses the tiles permission `com.google.android.wearable.permission.BIND_TILE_PROVIDER` and can declare both `androidx.glance.wear.action.BIND_WIDGET_PROVIDER` and `androidx.wear.tiles.action.BIND_TILE_PROVIDER` intent-filter actions on the same service class — see migrate-from-tiles for the dual-service vs. single-service strategy this enables.
- Requires a Wear OS 7 emulator or device (Wear Widgets renderer 1.6.1+) and `compileSdk`/`targetSdk` 37+.
- Debug via `adb shell am broadcast -a com.google.android.wearable.app.DEBUG_SURFACE --es operation add-tile --ecn component <package>/.HelloWidgetService` to add the widget to the carousel, and `-a com.google.android.wearable.app.DEBUG_SYSUI --es operation show-tile --ei index 0` to display it.
- This is a distinct, Wear-only API from the mobile `androidx.glance.appwidget` Glance widgets (RemoteViews-based, covered under android-platform-core) — do not confuse `GlanceWearWidget` with `GlanceAppWidget`.

## Related

- [remote-compose-layout](./remote-compose-layout.md)
- [remote-state-and-actions](./remote-state-and-actions.md)
- [migrate-from-tiles](./migrate-from-tiles.md)

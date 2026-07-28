# glance-widgets

> This is the Glance app-widget API (Kotlin, `androidx.glance` / `androidx.glance.appwidget`) — a separate composable set that compiles to `RemoteViews`, distinct from the same-named mobile Jetpack Compose (`androidx.compose.*`), SwiftUI, Ark UI, and Chakra UI components.

| Name | Description | Path |
|------|-------------|------|
| GlanceAppWidget | Base class for a Glance app widget: provideGlance, provideContent, sizeMode, previewSizeMode. | [glance-app-widget.md](./glance-app-widget.md) |
| GlanceAppWidgetReceiver | AppWidgetProvider bridge to a GlanceAppWidget, plus manifest `<receiver>` / appwidget-provider XML. | [glance-app-widget-receiver.md](./glance-app-widget-receiver.md) |
| GlanceModifier | Chainable modifier API for sizing, padding, background, corner radius, and click handling. | [glance-modifier.md](./glance-modifier.md) |
| Box / Column / Row / Spacer | Glance layout containers translating to RelativeLayout / LinearLayout. | [layout-containers.md](./layout-containers.md) |
| LazyColumn / LazyVerticalGrid | Scrollable lazy list and grid containers backed by ListView / GridView. | [lazy-lists.md](./lazy-lists.md) |
| Text | Glance text view composable. | [text.md](./text.md) |
| Image | Glance image composable backed by an ImageProvider. | [image.md](./image.md) |
| Button | Glance clickable button composable. | [button.md](./button.md) |
| CircularProgressIndicator / LinearProgressIndicator | Determinate/indeterminate progress indicators. | [progress-indicators.md](./progress-indicators.md) |
| CheckBox / Switch / RadioButton | Compound-button toggle composables (Android 12+). | [toggle-controls.md](./toggle-controls.md) |
| Scaffold / TitleBar | Material3 slot components for a widget's top-level layout and title bar. | [scaffold-titlebar.md](./scaffold-titlebar.md) |
| GlanceTheme / ColorProviders | Top-level color theming and Material3-style color schemes. | [glance-theme.md](./glance-theme.md) |
| Actions | actionStartActivity, actionRunCallback, actionSendBroadcast, actionStartService, ActionParameters. | [actions.md](./actions.md) |
| GlanceStateDefinition / PreferencesGlanceStateDefinition | Widget state storage definition and currentState()/updateAppWidgetState(). | [state-management.md](./state-management.md) |
| Widget updates | update, updateAll, updateIf, and WorkManager-driven refresh. | [widget-updates.md](./widget-updates.md) |
| SizeMode | Single, Exact, and Responsive composition strategies for widget resizing. | [size-modes.md](./size-modes.md) |
| Composition locals | LocalContext, LocalGlanceId, LocalSize, LocalState. | [composition-locals.md](./composition-locals.md) |
| RemoteViews relation | How Glance relates to the legacy RemoteViews/AppWidgetProvider framework. | [remoteviews-legacy.md](./remoteviews-legacy.md) |

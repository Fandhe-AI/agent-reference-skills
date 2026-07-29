# glance-widgets

| Name | Description | Path |
|------|-------------|------|
| Actions: actionStartActivity, actionRunCallback, actionSendBroadcast, actionStartService, ActionParameters | `Action` classes describing what happens on user interaction, applied via `GlanceModifier.clickable`. | [actions.md](./actions.md) |
| Button | Clickable button view for Glance compositions. | [button.md](./button.md) |
| LocalContext / LocalGlanceId / LocalSize / LocalState | `CompositionLocal`s available inside any Glance composition for context and widget state. | [composition-locals.md](./composition-locals.md) |
| Error handling in Glance: try/catch around data loading, errorUiLayout, onCompositionError | Patterns for surfacing a usable widget instead of a blank one when composition or data loading fails. | [error-handling.md](./error-handling.md) |
| Generated widget-picker previews: providePreview, setWidgetPreviews | Android 15+ API for pushing live, personalized previews to the widget picker. | [generated-previews.md](./generated-previews.md) |
| GlanceAppWidget | Base class for defining an app widget built with Glance. | [glance-app-widget.md](./glance-app-widget.md) |
| GlanceAppWidgetReceiver | `AppWidgetProvider` subclass that bridges platform app-widget broadcasts to a `GlanceAppWidget`. | [glance-app-widget-receiver.md](./glance-app-widget-receiver.md) |
| GlanceModifier | Ordered, immutable collection of modifier elements for Glance composables. | [glance-modifier.md](./glance-modifier.md) |
| GlanceTheme / ColorProviders | Top-level color theming for Glance widgets. | [glance-theme.md](./glance-theme.md) |
| Image | Lays out and draws an image from an `ImageProvider`. | [image.md](./image.md) |
| Layout containers: Box, Column, Row, Spacer | Glance layout composables that translate to `RemoteViews` layouts. | [layout-containers.md](./layout-containers.md) |
| LazyColumn / LazyVerticalGrid | Scrollable lazy containers that only lay out currently visible items. | [lazy-lists.md](./lazy-lists.md) |
| Pin a widget from in-app: requestPinGlanceAppWidget | Lets the app itself trigger the "Add to Home screen" dialog for one of its Glance widgets. | [pin-in-app.md](./pin-in-app.md) |
| CircularProgressIndicator / LinearProgressIndicator | Progress indicator composables for Glance. | [progress-indicators.md](./progress-indicators.md) |
| Interop with classic RemoteViews: AndroidRemoteViews | Escape hatch for embedding hand-built `RemoteViews` layouts inside a Glance composition. | [remoteviews-interop.md](./remoteviews-interop.md) |
| Relation to traditional RemoteViews-based app widgets | Background on the legacy XML/`RemoteViews` framework that Glance builds on top of. | [remoteviews-legacy.md](./remoteviews-legacy.md) |
| Scaffold / TitleBar | Material3 slot components for structuring a widget's top-level layout. | [scaffold-titlebar.md](./scaffold-titlebar.md) |
| SizeMode | Controls how a `GlanceAppWidget` composes across different widget sizes. | [size-modes.md](./size-modes.md) |
| GlanceStateDefinition / PreferencesGlanceStateDefinition | Defines where and how a `GlanceAppWidget`'s persisted state is stored and accessed. | [state-management.md](./state-management.md) |
| Text | Displays a text view inside a Glance composition. | [text.md](./text.md) |
| CheckBox / Switch / RadioButton | Compound-button composables representing a binary checked state (Android 12+). | [toggle-controls.md](./toggle-controls.md) |
| Widget configuration: APPWIDGET_CONFIGURE activity, reconfigurable / configuration_optional | Per-instance setup screen launched when a widget is added to customize settings. | [widget-configuration.md](./widget-configuration.md) |
| Updating a GlanceAppWidget: update, updateAll, WorkManager | APIs for triggering recomposition and refresh of running widget instances. | [widget-updates.md](./widget-updates.md) |

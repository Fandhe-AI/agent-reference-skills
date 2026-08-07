# Glance Widgets

| Name | Description | Path |
|------|-------------|------|
| Actions: actionStartActivity, actionRunCallback, actionSendBroadcast, actionStartService, ActionParameters | `Action` classes describing what happens on user interaction, applied via `GlanceModifier.clickable` or a composable's `onClick`. | [actions.md](./actions.md) |
| Button | Clickable button view. | [button.md](./button.md) |
| LocalContext / LocalGlanceId / LocalSize / LocalState | `CompositionLocal`s available inside any Glance composition. | [composition-locals.md](./composition-locals.md) |
| Error handling in Glance: try/catch around data loading, errorUiLayout, onCompositionError | Patterns for surfacing a usable widget instead of a blank/broken one… | [error-handling.md](./error-handling.md) |
| Generated widget-picker previews: providePreview, setWidgetPreviews | An Android 15+ (API 35+) API that lets a widget push a live… | [generated-previews.md](./generated-previews.md) |
| GlanceAppWidget | Base class for defining an app widget built with Glance. | [glance-app-widget.md](./glance-app-widget.md) |
| GlanceAppWidgetReceiver | `AppWidgetProvider` subclass that bridges platform app-widget… | [glance-app-widget-receiver.md](./glance-app-widget-receiver.md) |
| GlanceModifier | Ordered, immutable collection of modifier elements for Glance… | [glance-modifier.md](./glance-modifier.md) |
| GlanceTheme / ColorProviders | Top-level color theming for Glance widgets. | [glance-theme.md](./glance-theme.md) |
| Image | Lays out and draws an image from an `ImageProvider`. | [image.md](./image.md) |
| Layout containers: Box, Column, Row, Spacer | Glance layout composables that translate to `RemoteViews` layouts. | [layout-containers.md](./layout-containers.md) |
| LazyColumn / LazyVerticalGrid | Scrollable lazy containers that only lay out currently visible… | [lazy-lists.md](./lazy-lists.md) |
| Widget engagement metrics: AppWidgetEvent, queryAppWidgetEvents, setAppWidgetEventTag | Android 16 platform API for tracking widget taps, scrolls… | [metrics.md](./metrics.md) |
| MultiProcessGlanceAppWidget | A `GlanceAppWidget` subclass that lets a `GlanceAppWidgetReceiver`… | [multi-process-glance-app-widget.md](./multi-process-glance-app-widget.md) |
| Pin a widget from in-app: requestPinGlanceAppWidget | Lets the app itself trigger the "Add to Home screen" system… | [pin-in-app.md](./pin-in-app.md) |
| CircularProgressIndicator / LinearProgressIndicator | Progress indicator composables. | [progress-indicators.md](./progress-indicators.md) |
| Interop with classic RemoteViews: AndroidRemoteViews | An escape hatch composable for embedding a hand-built XML… | [remoteviews-interop.md](./remoteviews-interop.md) |
| Relation to traditional RemoteViews-based app widgets | Background on the legacy, XML/`RemoteViews`-based app widget… | [remoteviews-legacy.md](./remoteviews-legacy.md) |
| Scaffold / TitleBar | Material3 slot components for structuring a widget's top-level… | [scaffold-titlebar.md](./scaffold-titlebar.md) |
| SizeMode | Controls how a `GlanceAppWidget` composes across different widget… | [size-modes.md](./size-modes.md) |
| GlanceStateDefinition / PreferencesGlanceStateDefinition | Defines where and how a `GlanceAppWidget`'s persisted state is… | [state-management.md](./state-management.md) |
| Unit testing Glance composables: runGlanceAppWidgetUnitTest, provideComposable, onNode | Lightweight unit-test API for Glance composables that runs… | [testing.md](./testing.md) |
| Text | Displays a text view inside a Glance composition. | [text.md](./text.md) |
| CheckBox / Switch / RadioButton | Compound-button composables representing a binary checked state… | [toggle-controls.md](./toggle-controls.md) |
| Widget configuration: APPWIDGET_CONFIGURE activity, reconfigurable / configuration_optional | A per-instance setup screen that launches when a widget is… | [widget-configuration.md](./widget-configuration.md) |
| Updating a GlanceAppWidget: update, updateAll, WorkManager | APIs for triggering recomposition/refresh of running widget… | [widget-updates.md](./widget-updates.md) |

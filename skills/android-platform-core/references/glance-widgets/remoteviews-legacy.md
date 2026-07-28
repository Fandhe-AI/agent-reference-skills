# Relation to traditional RemoteViews-based app widgets

Background on the legacy, XML/`RemoteViews`-based app widget framework that Glance builds on top of and replaces as the recommended authoring API.

## Signature / Usage

```kotlin
// Legacy: hand-built RemoteViews, no Glance involved
val views = RemoteViews(context.packageName, R.layout.widget_layout)
views.setTextViewText(R.id.widget_text, "Hello")
appWidgetManager.updateAppWidget(appWidgetId, views)
```

## Notes

- Traditional app widgets are defined with XML layouts and updated imperatively via `RemoteViews` / `AppWidgetProvider`, supporting information, collection, control, and hybrid widget types, but only touch and vertical-swipe gestures and a limited subset of Android views.
- Every `GlanceAppWidget` composition is ultimately compiled down to `RemoteViews` under the hood — Glance is a Compose-style authoring layer over the same underlying `AppWidgetManager`/`RemoteViews` platform mechanism, not a separate widget system. This is why Glance layouts and composables (`Box`/`Column`/`Row`, `Text`, `Button`, etc.) are constrained to what `RemoteViews` can express (no arbitrary custom views, no animations, capped child counts in containers).
- Google's current guidance is to build new widgets with Glance; hand-written `RemoteViews`/`AppWidgetProvider` code remains relevant mainly for maintaining pre-Glance widgets or very low-level custom `RemoteViews` needs (e.g. via `AndroidRemoteViews` interop inside Glance itself).
- This page is an overview only; full `RemoteViews`/`AppWidgetProvider` API details are out of scope for this category — see the platform's general View-based widgets documentation if maintaining a legacy (non-Glance) widget.

## Related

- [glance-app-widget](./glance-app-widget.md)

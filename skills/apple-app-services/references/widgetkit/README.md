# WidgetKit

| Name | Description | Path |
|------|-------------|------|
| Widget | Protocol defining a widget's configuration and content | [widget.md](./widget.md) |
| WidgetConfiguration | Protocol for widget configuration; base for `StaticConfiguration` and `AppIntentConfiguration` | [widgetconfiguration.md](./widgetconfiguration.md) |
| StaticConfiguration | Widget configuration with no user-configurable options | [staticconfiguration.md](./staticconfiguration.md) |
| AppIntentConfiguration | Widget configuration with user-configurable App Intent options | [appintentconfiguration.md](./appintentconfiguration.md) |
| TimelineProvider | Protocol for providing timeline entries to drive widget updates | [timelineprovider.md](./timelineprovider.md) |
| AppIntentTimelineProvider | Timeline provider for user-configurable widgets using App Intents | [appintenttimelineprovider.md](./appintenttimelineprovider.md) |
| TimelineEntry | Protocol specifying the date (and optional relevance) for a widget display update | [timelineentry.md](./timelineentry.md) |
| Timeline | Struct holding an array of entries and a reload policy | [timeline.md](./timeline.md) |
| TimelineReloadPolicy | Determines when WidgetKit requests a new timeline (atEnd / after / never) | [timelinereloadpolicy.md](./timelinereloadpolicy.md) |
| WidgetCenter | Singleton for reloading timelines and querying user-configured widgets | [widgetcenter.md](./widgetcenter.md) |
| WidgetBundle | Container exposing multiple widgets from a single extension | [widgetbundle.md](./widgetbundle.md) |
| WidgetFamily | Enum of widget sizes and shapes (systemSmall, systemMedium, accessoryCircular, etc.) | [widgetfamily.md](./widgetfamily.md) |
| TimelineProviderContext | Context passed to provider methods: family, displaySize, isPreview, environmentVariants | [timelineprovidercontext.md](./timelineprovidercontext.md) |
| ControlWidget | Protocol for creating Control Center / Lock Screen controls (iOS 18+) | [controlwidget.md](./controlwidget.md) |
| StaticControlConfiguration | Control configuration with no user-configurable options | [staticcontrolconfiguration.md](./staticcontrolconfiguration.md) |
| ActivityConfiguration | WidgetKit configuration object describing a Live Activity's UI | [activityconfiguration.md](./activityconfiguration.md) |
| Activity (ActivityKit) | ActivityKit class for starting, updating, and ending Live Activities | [activitykit-activity.md](./activitykit-activity.md) |

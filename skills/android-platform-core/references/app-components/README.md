# app-components

| Name | Description | Path |
|------|-------------|------|
| Activity lifecycle | States an `Activity` transitions through, from creation to destruction, with callbacks. | [activity-lifecycle.md](./activity-lifecycle.md) |
| Activity Result contracts | Type-safe, lifecycle-aware replacement for `startActivityForResult()` and `onActivityResult()`. | [activity-result-contracts.md](./activity-result-contracts.md) |
| Activity | Provides the window in which the app draws UI; entry point for user journeys. | [activity.md](./activity.md) |
| App components overview | The four fundamental building blocks: Activity, Service, BroadcastReceiver, ContentProvider. | [app-components-overview.md](./app-components-overview.md) |
| App process priority and memory trimming | How Android ranks processes for killing under memory pressure via `onTrimMemory()`. | [app-process-priority.md](./app-process-priority.md) |
| Application class and initialization | `Application` base class instantiated once per process; App Startup library alternative. | [application-class.md](./application-class.md) |
| Background activity launch (BAL) restrictions | Restrictions on activities started from background; `ActivityOptions` opt-in flags for legitimate cases. | [background-activity-launch.md](./background-activity-launch.md) |
| Common intents | Catalog of frequently used implicit intents for invoking built-in device apps. | [common-intents.md](./common-intents.md) |
| ComponentActivity and setContent | `ComponentActivity` base class for Compose apps; `setContent` sets composable tree as root. | [component-activity-compose.md](./component-activity-compose.md) |
| Configuration changes and state restoration | Configuration changes destroy/recreate `Activity`; state must be explicitly saved/restored. | [configuration-changes.md](./configuration-changes.md) |
| ContentProvider basics | A `ContentProvider` manages access to central data and exposes it via content URIs. | [content-provider-basics.md](./content-provider-basics.md) |
| Creating a ContentProvider | Implementing a custom `ContentProvider` subclass to expose app data via `ContentResolver`. | [content-provider-creating.md](./content-provider-creating.md) |
| Intent filters and resolution | `<intent-filter>` declares which implicit `Intent`s a component can receive. | [intent-filters.md](./intent-filters.md) |
| Intent | Asynchronous messaging object used to request actions from other components. | [intent.md](./intent.md) |
| Package visibility | Privacy feature (Android 11+) that limits which installed packages an app can query. | [package-visibility.md](./package-visibility.md) |
| Parcelables and bundles | `Parcelable` and `Bundle` marshal data across process boundaries. | [parcelables-and-bundles.md](./parcelables-and-bundles.md) |
| Tasks and back stack | A task is a LIFO back stack of activities; `launchMode` and flags control associations. | [tasks-and-back-stack.md](./tasks-and-back-stack.md) |

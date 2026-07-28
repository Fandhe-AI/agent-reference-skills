# app-components

| Name | Description | Path |
|------|-------------|------|
| App components overview | The four fundamental components (Activity, Service, BroadcastReceiver, ContentProvider) and how they're activated. | [app-components-overview.md](./app-components-overview.md) |
| Activity | Entry point providing the window in which the app draws its UI. | [activity.md](./activity.md) |
| Activity lifecycle | States and callbacks (onCreate/onStart/onResume/onPause/onStop/onDestroy) an Activity transitions through. | [activity-lifecycle.md](./activity-lifecycle.md) |
| ComponentActivity and setContent | Compose entry point Activity subclass and its setContent function. | [component-activity-compose.md](./component-activity-compose.md) |
| Tasks and back stack | launchMode, taskAffinity, intent flags, and Recents behavior controlling how activities group into tasks. | [tasks-and-back-stack.md](./tasks-and-back-stack.md) |
| Configuration changes and state restoration | Activity destroy/recreate on configuration change, rememberSaveable and ViewModel state survival. | [configuration-changes.md](./configuration-changes.md) |
| Intent | Messaging object for activating components, explicit vs. implicit, action/data/category/extras/flags. | [intent.md](./intent.md) |
| Intent filters and resolution | Declaring `<intent-filter>` and how the system matches implicit intents against it. | [intent-filters.md](./intent-filters.md) |
| Common intents | Catalog of frequently used implicit intents (ACTION_VIEW, ACTION_SEND, ACTION_GET_CONTENT, etc.) and Intent.createChooser. | [common-intents.md](./common-intents.md) |
| Package visibility | `<queries>` manifest element controlling which other apps' packages/components are visible to intent resolution. | [package-visibility.md](./package-visibility.md) |
| Activity Result contracts | Type-safe replacement for startActivityForResult/onActivityResult via registerForActivityResult / rememberLauncherForActivityResult. | [activity-result-contracts.md](./activity-result-contracts.md) |
| ContentProvider basics | Querying a ContentProvider via ContentResolver, content URI structure, CRUD methods. | [content-provider-basics.md](./content-provider-basics.md) |
| Creating a ContentProvider | Implementing a custom ContentProvider subclass with UriMatcher and manifest declaration. | [content-provider-creating.md](./content-provider-creating.md) |
| App process priority and memory trimming | Process priority tiers (foreground/visible/service/cached) and the onTrimMemory callback. | [app-process-priority.md](./app-process-priority.md) |
| Application class and initialization | Application base class and the androidx.startup App Startup library for ordered initialization. | [application-class.md](./application-class.md) |

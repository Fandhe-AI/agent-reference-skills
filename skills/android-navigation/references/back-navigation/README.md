# back-navigation

| Name | Description | Path |
|------|-------------|------|
| BackEventCompat | Compat data class describing an in-progress predictive back gesture: touch position, progress, and swipe edge | [back-event-compat.md](./back-event-compat.md) |
| BackHandler | Composable effect for intercepting the system back button/gesture in Jetpack Compose | [back-handler.md](./back-handler.md) |
| Custom back navigation | Overview of how to implement app-specific back behavior per UI toolkit (Compose, Views/Fragments/Activities) | [custom-back-navigation.md](./custom-back-navigation.md) |
| android:enableOnBackInvokedCallback | Manifest attribute that opts an app (or a single activity) into the platform predictive back dispatcher | [enable-on-back-invoked-callback.md](./enable-on-back-invoked-callback.md) |
| LocalOnBackPressedDispatcherOwner | Compose `CompositionLocal` object that provides the `OnBackPressedDispatcherOwner` used by `BackHandler`/`PredictiveBackHandler` | [local-on-back-pressed-dispatcher-owner.md](./local-on-back-pressed-dispatcher-owner.md) |
| NavigationBackHandler | Composable entry point (`NavigationBackHandler`/`rememberNavigationEventState`) for `androidx.navigationevent:navigationevent-compose` back handling via `NavigationEventState` | [navigation-back-handler.md](./navigation-back-handler.md) |
| NavigationEventDispatcher | Central class of the Kotlin Multiplatform `androidx.navigationevent` library that registers handlers/inputs and routes back/forward events | [navigation-event-dispatcher.md](./navigation-event-dispatcher.md) |
| NavigationEventHandler | Abstract class registered on a `NavigationEventDispatcher` to receive back/forward navigation event lifecycle callbacks, including predictive progress | [navigation-event-handler.md](./navigation-event-handler.md) |
| NavigationEventInput | Abstract class for components that generate navigation events and dispatch them into a `NavigationEventDispatcher` | [navigation-event-input.md](./navigation-event-input.md) |
| OnBackInvokedCallback | Platform (`android.window`) callback interface invoked when a back gesture/press is committed | [on-back-invoked-callback.md](./on-back-invoked-callback.md) |
| OnBackInvokedDispatcher | Platform (`android.window`) interface for registering `OnBackInvokedCallback` instances directly with the system | [on-back-invoked-dispatcher.md](./on-back-invoked-dispatcher.md) |
| OnBackPressedCallback | Abstract callback class registered on an `OnBackPressedDispatcher` to handle back navigation events | [on-back-pressed-callback.md](./on-back-pressed-callback.md) |
| OnBackPressedDispatcher | Dispatcher used to register `OnBackPressedCallback` instances for handling back navigation | [on-back-pressed-dispatcher.md](./on-back-pressed-dispatcher.md) |
| Predictive back animations | Guidance for building custom in-app transitions driven by predictive back gesture progress | [predictive-back-animations.md](./predictive-back-animations.md) |
| PredictiveBackHandler | Composable effect for handling predictive system back gestures in Jetpack Compose | [predictive-back-handler.md](./predictive-back-handler.md) |

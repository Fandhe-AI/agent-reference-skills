# back-navigation

| Name | Description | Path |
|------|-------------|------|
| BackHandler | Compose effect for intercepting the system back button/gesture. | [back-handler.md](./back-handler.md) |
| PredictiveBackHandler | Compose effect for predictive back gestures with a `Flow<BackEventCompat>` progress callback. | [predictive-back-handler.md](./predictive-back-handler.md) |
| OnBackPressedDispatcher | AndroidX dispatcher for registering `OnBackPressedCallback`s in Activities/Fragments/Views. | [on-back-pressed-dispatcher.md](./on-back-pressed-dispatcher.md) |
| OnBackPressedCallback | AndroidX callback registered on `OnBackPressedDispatcher`, with predictive back progress hooks. | [on-back-pressed-callback.md](./on-back-pressed-callback.md) |
| LocalOnBackPressedDispatcherOwner | Compose `CompositionLocal` resolving the current `OnBackPressedDispatcherOwner` for `BackHandler`/`PredictiveBackHandler`. | [local-on-back-pressed-dispatcher-owner.md](./local-on-back-pressed-dispatcher-owner.md) |
| BackEventCompat | Compat data class carrying predictive back gesture touch position, progress, and swipe edge. | [back-event-compat.md](./back-event-compat.md) |
| OnBackInvokedDispatcher | Platform (`android.window`) dispatcher for registering `OnBackInvokedCallback`s (API 33+). | [on-back-invoked-dispatcher.md](./on-back-invoked-dispatcher.md) |
| OnBackInvokedCallback | Platform (`android.window`) callback interface for committed/predictive back events (API 33+/34+). | [on-back-invoked-callback.md](./on-back-invoked-callback.md) |
| android:enableOnBackInvokedCallback | Manifest attribute opting an app/activity into the platform predictive back dispatcher. | [enable-on-back-invoked-callback.md](./enable-on-back-invoked-callback.md) |
| Predictive back animations | Guidance for building custom Modifier/AnimatedContent transitions driven by gesture progress. | [predictive-back-animations.md](./predictive-back-animations.md) |
| Custom back navigation | Overview of app-specific back handling across Compose, Fragments, and Activities. | [custom-back-navigation.md](./custom-back-navigation.md) |

# Custom back navigation

Overview of how to implement app-specific back behavior (e.g. `WebView` history, custom back stacks) per UI toolkit: `BackHandler` in Compose, `OnBackPressedDispatcher`/`OnBackPressedCallback` in Views/Fragments/Activities.

## Signature / Usage

```kotlin
// Compose
@Composable
fun MyScreen() {
    BackHandler(enabled = true) {
        // Handle back button event
    }
}
```

```kotlin
// Fragment / View-based
class MyFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val callback = requireActivity().onBackPressedDispatcher.addCallback(this) {
            // Handle the back button event
        }
        callback.isEnabled = true
    }
}
```

## Notes

- **Compose**: use `BackHandler` (or `PredictiveBackHandler` for gesture-progress animations). Only the innermost enabled `BackHandler` intercepts back events; works alongside `NavController.navigateUp()` / `popBackStack()`.
- **Views/Fragments/Activities**: `ComponentActivity` (base of `FragmentActivity`/`AppCompatActivity`) exposes `onBackPressedDispatcher`; register `OnBackPressedCallback` via `addCallback(LifecycleOwner, callback)` for lifecycle-safe registration.
- Android maintains an automatic back stack of destinations; custom handling is only needed for non-standard cases such as `WebView` browsing history.
- Since Android 13+, implement predictive back support to avoid unexpected behavior — see [android:enableOnBackInvokedCallback](./enable-on-back-invoked-callback.md).
- Migrate off deprecated patterns: `KeyEvent.KEYCODE_BACK` interception, `Activity.onBackPressed()`, `Dialog.onBackPressed()`. Use `OnBackPressedCallback` (AndroidX), `OnBackInvokedCallback` (platform), or `BackHandler`/`PredictiveBackHandler` (Compose) instead.
- Don't add unnecessary in-UI back buttons; prefer letting the system back affordance drive navigation.
- For `NavHost`/`NavController` back-stack navigation itself (`popBackStack()`, `navigateUp()`), see the `nav-compose` category. For adaptive-layout pane back behavior (`ThreePaneScaffoldNavigator`), see the `android-compose-ui` skill's `adaptive-layout` category — not duplicated here.

## Related

- [BackHandler](./back-handler.md)
- [OnBackPressedDispatcher](./on-back-pressed-dispatcher.md)
- [OnBackPressedCallback](./on-back-pressed-callback.md)
- [android:enableOnBackInvokedCallback](./enable-on-back-invoked-callback.md)
- [nav-compose](../nav-compose/README.md)

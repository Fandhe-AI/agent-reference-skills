# Predictive back animations

Guidance for building custom in-app transitions driven by predictive back gesture progress, using `PredictiveBackHandler` (Compose) or `OnBackAnimationCallback` (Views) together with `BackEventCompat.progress`.

## Signature / Usage

```kotlin
@Composable
fun DetailScreen(onBack: () -> Unit) {
    var scale by remember { mutableFloatStateOf(1f) }
    var xOffset by remember { mutableFloatStateOf(0f) }
    val scope = rememberCoroutineScope()

    PredictiveBackHandler { progressFlow ->
        try {
            progressFlow.collectLatest { backEvent ->
                scale = 1f - backEvent.progress
                xOffset = backEvent.progress * 100f
            }
            onBack() // gesture completed
        } catch (e: CancellationException) {
            // gesture cancelled - animate back to original state
            scope.launch { animate(scale, 1f) { value, _ -> scale = value } }
            scope.launch { animate(xOffset, 0f) { value, _ -> xOffset = value } }
        }
    }

    Box(
        Modifier
            .fillMaxSize()
            .scale(scale)
            .offset(x = xOffset.dp),
    ) { /* content */ }
}
```

## Navigation Compose: popEnterTransition / popExitTransition

With `androidx.navigation:navigation-compose:2.8.0`+, `NavHost` cross-fades between screens automatically on back swipe. Use `popEnterTransition` / `popExitTransition` to customize the animation specifically for back navigation (as opposed to `enterTransition` / `exitTransition`, which apply to forward navigation too):

```kotlin
NavHost(
    navController = navController,
    startDestination = Home,
    popExitTransition = {
        scaleOut(
            targetScale = 0.9f,
            transformOrigin = TransformOrigin(pivotFractionX = 0.5f, pivotFractionY = 0.5f),
        )
    },
    popEnterTransition = {
        EnterTransition.None
    },
    modifier = modifier,
)
```

## Notes

- Drive `Modifier` transforms (scale, offset, alpha) directly from `backEvent.progress` (0f–1f) inside `PredictiveBackHandler`; on `CancellationException`, animate state back to its resting value.
- API level / opt-in: predictive back gesture progress dispatch requires the app to opt in via `android:enableOnBackInvokedCallback="true"` (API 33+) — see [android:enableOnBackInvokedCallback](./enable-on-back-invoked-callback.md). `AndroidX Activity 1.6.0`+ is required for system animations; `androidx.activity:activity-compose:1.8.0-alpha01`+ is required for `PredictiveBackHandler` itself.
- Material3 components (`SearchBar`, `ModalBottomSheet`, `ModalDrawerSheet`/`DismissibleDrawerSheet`, `ModalNavigationDrawer`/`DismissibleNavigationDrawer`) get predictive-back animation support automatically with `androidx.compose.material3:material3-*:1.3.0`+ (drawer variants require passing `drawerState`).
- For shared element transitions combined with predictive back, see the Navigation Compose shared-elements guide (not duplicated here).
- For Views-based screens (not Compose), drive an AndroidX `Transition`'s seek controller from `OnBackPressedCallback.handleOnBackStarted`/`handleOnBackProgressed` via `TransitionManager.controlDelayedTransition()` and `TransitionSeekController.currentFraction`; this requires `androidx.transition:transition:1.5.0-alpha01`+ and API 34+, and is not backward compatible below Android 14.
- Test on Android 13–14 via **Settings > System > Developer options > Predictive back animations**; enabled by default on Android 15+.

## Related

- [PredictiveBackHandler](./predictive-back-handler.md)
- [BackEventCompat](./back-event-compat.md)
- [OnBackPressedCallback](./on-back-pressed-callback.md)
- [android:enableOnBackInvokedCallback](./enable-on-back-invoked-callback.md)

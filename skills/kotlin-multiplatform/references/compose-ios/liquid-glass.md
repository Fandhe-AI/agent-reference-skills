---
source: https://kotlinlang.org/docs/multiplatform/ios-liquid-glass.html
---

# Liquid Glass in a Compose Multiplatform app

Step-by-step tutorial on adopting iOS 26 Liquid Glass in a Compose Multiplatform app by migrating navigation to native SwiftUI. Liquid Glass effects are rendered by the system through native `TabView`, `NavigationStack`, and toolbar APIs, so the app needs a native SwiftUI shell while Compose keeps rendering each screen's content. The system applies the effects automatically; no Liquid Glass-specific code is written.

## Signature / Usage

Target structure (the tutorial migrates the KotlinConf app from fully Compose-driven navigation):

```
ContentView
  └── TabView  (Liquid Glass, iOS 26)
        ├── Tab: Schedule
        │     └── NavigationStack
        │           ├── NativeNavComposeView  ← Compose tab root
        │           └── DetailComposeView     ← Compose detail screen, one per destination
        └── Tab: Info
              └── NavigationStack
                    ├── NativeNavComposeView  ← Compose tab root
                    └── DetailComposeView     ← Compose detail screen, one per destination
```

Shared Kotlin steps:

1. Add title metadata to routes so SwiftUI can render titles without calling back into Kotlin:

```kotlin
@Serializable
sealed interface AppRoute {
    val title: String? get() = null
    val subtitle: String? get() = null
}
```

2. Add navigation callbacks (`topLevelRoute`, `onNavigate`, `onActivate`) to the iOS entry point. They are optional and default to `null`, so Android, desktop, and web targets are unaffected:

```kotlin
@Composable
fun App(
    appGraph: AppGraph,
    topLevelRoute: TopLevelRoute,
    onThemeChange: ((isDarkTheme: Boolean) -> Unit)? = null,
    onNavigate: ((AppRoute) -> Unit)? = null,
    onActivate: ((TopLevelRoute) -> Unit)? = null,
) {
    // ...
    val startRoute: AppRoute = remember {
        if (isOnboardingComplete) topLevelRoute else StartPrivacyNoticeScreen
    }
    NavHost(startRoute, isDarkTheme, onThemeChange, onNavigate, onActivate)
}
```

3. Intercept navigation at the Compose level (Navigation 3 implementation): forward detail routes to Swift through `onNavigate` and remove them from Compose's back stack; notify Swift of tab switches through `onActivate`:

```kotlin
// Forwards detail routes to Swift and removes them from Compose's stack
if (onNavigate != null) {
    LaunchedEffect(navState) {
        snapshotFlow { navState.currentBackstack.toList() }.collect { backstack ->
            val detailRoutes = backstack.drop(1)
            if (detailRoutes.isNotEmpty()) {
                detailRoutes.forEach { onNavigate(it) }
                navState.currentBackstack.removeRange(1, navState.currentBackstack.size)
            }
        }
    }
}
```

4. Signal that SwiftUI owns navigation, and have screens hide their own title bars and back buttons:

```kotlin
val LocalUseNativeNavigation = staticCompositionLocalOf { false }
```

```kotlin
val useNativeNavigation = LocalUseNativeNavigation.current

if (!useNativeNavigation) {
    MainHeaderTitleBar(...)
    HorizontalDivider(...)
}
```

5. Expose new iOS entry points in `iosMain/main.ios.kt`: a no-callback `MainViewController` (pre-iOS 26 fallback), a `MainViewController` with callbacks (tab root), and `ScreenViewController` (detail screen):

```kotlin
// Detail screen: renders a single screen with LocalUseNativeNavigation = true
@Suppress("unused")
fun ScreenViewController(
    route: AppRoute,
    onNavigate: (AppRoute) -> Unit,
    onGoBack: () -> Unit,
    onSet: (AppRoute) -> Unit,
    onActivate: (TopLevelRoute) -> Unit,
): UIViewController = ComposeUIViewController(
    configure = { onFocusBehavior = OnFocusBehavior.DoNothing }
) {
    SingleScreenApp(appGraph, route, onNavigate, onGoBack, onSet, onActivate)
}
```

Swift steps:

1. Make Kotlin routes usable in `NavigationStack` (requires `Hashable` and `Identifiable`; identity based on a UUID so pushing the same route twice creates two entries):

```swift
@available(iOS 26.0, *)
struct RouteWrapper: Hashable, Identifiable {
    let id = UUID()
    let route: AppRoute

    static func ==(lhs: RouteWrapper, rhs: RouteWrapper) -> Bool {
        lhs.id == rhs.id
    }

    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
```

2. Embed Compose screens as SwiftUI views with `UIViewControllerRepresentable` (`NativeNavComposeView` for tab roots calling `Main_iosKt.MainViewController(...)`, `DetailComposeView` for detail screens calling `Main_iosKt.ScreenViewController(...)`).

3. Build the tab bar with a native `TabView`:

```swift
TabView(selection: Binding(
    get: { appCoordinator.selectedTab },
    set: { appCoordinator.selectedTab = $0 }
)) {
    Tab(String(localized: "Schedule"), systemImage: "clock",
        value: AppNavigationCoordinator.AppTab.schedule) {
        TabContentView(topLevelRoute: ScheduleScreen(),
                       coordinator: appCoordinator.scheduleCoordinator,
                       appCoordinator: appCoordinator, title: String(localized: "Schedule"))
    }
    // ...
}
.tabBarMinimizeBehavior(.automatic) 
.tint(Color(.accent))
```

4. Fall back on older iOS versions:

```swift
struct ContentView: View {
    var body: some View {
        if #available(iOS 26.0, *) {
            NativeNavContentView()
        } else {
            ComposeView(topLevelRoute: ScheduleScreen())
                .ignoresSafeArea(.all)
        }
    }
}
```

The full tutorial also shows `TabNavigationCoordinator` / `AppNavigationCoordinator` (`@Observable` path and tab state), `TabContentView` (a `NavigationStack` with `.navigationDestination(for: RouteWrapper.self)`), `ScreenContent` (a flat `when` over routes), and `SingleScreenApp` (iOS-only wrapper that provides `LocalUseNativeNavigation` as `true`). See the source page for their full code.

## Notes

- Requires Xcode 26 or later with the iOS 26 SDK. Liquid Glass and the new `TabView` APIs are iOS 26 only; older versions fall back to the Compose-driven setup.
- The tutorial uses the official KotlinConf app: `main` branch is the starting state (custom theme in Compose), `lg-nav` branch is the final state.
- `.navigationTitle(title)` must be set on the tab root even with `.navigationBarHidden(true)`, because iOS 26 reads it to label the tab in the floating tab bar.
- `.tabBarMinimizeBehavior(.automatic)` makes the tab bar float and minimize on scroll; without it the tab bar stays fixed at the bottom. `Color(.accent)` resolves to the `AccentColor` asset in the Xcode asset catalog.
- A `data object` route cannot carry per-instance title state; convert it to a `data class` with `override val title`.
- Resolve `stringResource` (a `@Composable`) inside the entry scope and capture it in the click callback, not inside the callback.
- The Navigation 3 interception step is library-specific; the same pattern applies to other Compose navigation libraries but the exact APIs differ.
- Alternative: skip SwiftUI and drive UIKit from Kotlin. Declare `expect class` coordinators in `commonMain` (for example `expect class ScheduleCoordinator()` with `navigateToDetail`, `navigateBack`, `@Composable fun Content()`) with `actual` implementations in `iosMain` that call `push` and `pop` on `UINavigationController`. SwiftUI `TabView` / `NavigationStack` map to `UITabBarController` / `UINavigationController`. Liquid Glass applies to native tab and navigation bars whether declared in SwiftUI or configured in UIKit.
- Other alternatives listed: Compose-driven navigation with native interop controls (`UITabBar` / `UINavigationBar`, with interop limitations between native overlays and Compose content); third-party adaptive UI libraries such as Calf; Compose-only imitation with libraries such as AndroidLiquidGlass or Liquid (visually similar, not identical to system Liquid Glass).
- Relation to apple-swiftui: this page does not use SwiftUI's `glassEffect` modifier. It gets system Liquid Glass by letting native `TabView` / `NavigationStack` own navigation and Compose render screen content. For the SwiftUI glass APIs themselves, see the glass-effect and glass-effect-container pages of the apple-swiftui skill. Native UIKit bars are covered by apple-uikit.

## Related

- [swiftui-integration](./swiftui-integration.md)
- [uikit-integration](./uikit-integration.md)

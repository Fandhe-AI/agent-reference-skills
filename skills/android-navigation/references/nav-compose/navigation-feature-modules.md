# Navigation with Feature Modules

The Dynamic Navigator library (`androidx.navigation:navigation-dynamic-features-fragment`) extends Fragment-based Navigation so destinations can live in Play Feature Delivery dynamic feature modules, installing the owning module on demand when the user navigates to it.

## Signature / Usage

```kotlin
// app/build.gradle.kts (base module)
dependencies {
    val navVersion = "2.9.8"
    api("androidx.navigation:navigation-fragment-ktx:$navVersion")
    api("androidx.navigation:navigation-ui-ktx:$navVersion")
    api("androidx.navigation:navigation-dynamic-features-fragment:$navVersion")
}
```

```xml
<!-- Replace NavHostFragment with DynamicNavHostFragment -->
<androidx.fragment.app.FragmentContainerView
    android:id="@+id/nav_host_fragment"
    android:name="androidx.navigation.dynamicfeatures.fragment.DynamicNavHostFragment"
    app:navGraph="@navigation/nav_graph"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

```xml
<!-- Destination living in a dynamic feature module -->
<fragment
    android:id="@+id/featureFragment"
    android:name="com.example.myapp.feature.FeatureFragment"
    app:moduleName="myDynamicFeature" />
```

```xml
<!-- Including a whole graph from a dynamic feature module -->
<include-dynamic
    android:id="@+id/includedGraph"
    app:moduleName="includedgraphfeature"
    app:graphResName="included_feature_nav"
    app:graphPackage="com.example.dynamicfeatureapp.includedgraphfeature" />
```

```kotlin
// Non-blocking install monitoring
val installMonitor = DynamicInstallMonitor()
navController.navigate(destinationId, null, null, DynamicExtras(installMonitor))

if (installMonitor.isInstallRequired) {
    installMonitor.status.observe(this) { sessionState ->
        when (sessionState.status()) {
            SplitInstallSessionStatus.INSTALLED ->
                navController.navigate(destinationId, destinationArgs, null, null)
            SplitInstallSessionStatus.REQUIRES_USER_CONFIRMATION ->
                SplitInstallManager.startConfirmationDialogForResult(sessionState, this, /* ... */ 0)
            else -> Unit
        }
        if (sessionState.hasTerminalStatus()) {
            installMonitor.status.removeObserver(this)
        }
    }
}
```

## Options / Props

| Name | Location | Description |
|------|----------|-------------|
| `app:moduleName` | `<fragment>`/destination tag | Name of the dynamic feature module (must match a module listed in the base app's `android.dynamicFeatures`) that owns this destination. |
| `app:progressDestination` | `<navigation>` root tag | Destination shown while the owning module installs; defaults to a built-in progress fragment, or point it at a custom fragment extending `AbstractProgressFragment`. |
| `app:graphResName` | `<include-dynamic>` | Name of the navigation graph resource (without extension) inside the dynamic feature module. |
| `app:graphPackage` | `<include-dynamic>` | Application ID of the base app plus the feature module name, e.g. `com.example.app.myDynamicFeature`. |
| `DynamicInstallMonitor` | `DynamicExtras` param | Optional install-progress observable passed to `navController.navigate(..., DynamicExtras(monitor))` for a custom (non-blocking) install UX instead of the default progress destination. |

## Notes

- Replace `NavHostFragment` with `DynamicNavHostFragment` at the host; ordinary (non-dynamic) destinations continue to work unchanged in the same graph.
- If the owning module isn't installed, navigating to a `moduleName` destination shows the progress destination (default or custom) and installs the module automatically before completing the navigation.
- Only the `startDestination` of an `<include-dynamic>` graph is reachable from outside; deep links are not supported into dynamically-included graphs or dynamically-loaded nested graphs.
- Use `api` (not `implementation`) for the navigation dependencies in the base module so feature modules can resolve them.
- This library only concerns the Navigation graph wiring (`moduleName`, `DynamicNavHostFragment`, `include-dynamic`); the Gradle/manifest side of declaring a dynamic feature module (`com.android.dynamic-feature` plugin, `android.dynamicFeatures`, `dist:delivery`) is covered by android-build-gradle's Dynamic Feature Modules page, not here.

## Related

- [NavHostFragment](./navhostfragment.md)
- [Navigation Graph XML](./navigation-graph-xml.md)

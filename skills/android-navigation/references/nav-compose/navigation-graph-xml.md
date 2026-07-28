# Navigation Graph XML

XML resource format (`res/navigation/*.xml`) describing a Fragment-based navigation graph: its destinations, the actions connecting them, and their arguments. Consumed by a [NavHostFragment](./navhostfragment.md) via `app:navGraph`.

## Signature / Usage

```xml
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/main_nav"
    app:startDestination="@id/mainFragment">

    <fragment
        android:id="@+id/mainFragment"
        android:name="com.example.MainFragment"
        android:label="Main">
        <argument
            android:name="myArg"
            app:argType="integer"
            android:defaultValue="0" />
        <action
            android:id="@+id/action_main_to_detail"
            app:destination="@id/detailFragment"
            app:popUpTo="@id/mainFragment"
            app:popUpToInclusive="true" />
    </fragment>

    <fragment
        android:id="@+id/detailFragment"
        android:name="com.example.DetailFragment"
        android:label="Detail" />
</navigation>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `app:startDestination` | `@id/...` reference | — | The graph's initial destination. |
| `android:id` on root `<navigation>` | ID | none | If set, Safe Args generates a `[Id]Directions` class for global actions. |
| `<fragment>` / `<dialog>` / `<activity>` / `<navigation>` (nested) | element | — | Destination declarations; `android:name` points to the destination's class. |
| `<argument>` | element | — | Declares a typed argument; see [Safe Args](./safe-args.md) for `app:argType` values. |
| `<action>` | element | — | Declares a navigable transition; supports `app:destination`, `app:popUpTo`, `app:popUpToInclusive`, `app:enterAnim`/`app:exitAnim`/`app:popEnterAnim`/`app:popExitAnim`, `app:restoreState`, `app:popUpToSaveState`. |
| `<deepLink>` | element | — | Deep link URI patterns resolving to the containing destination. |

## Notes

- Edited visually via the Navigation Editor in Android Studio, or by hand as raw XML.
- The Kotlin DSL (`NavController.createGraph { ... }`) and Compose's [NavHost](./navhost.md) build graphs in code instead of XML; **Safe Args does not work with either**, since it requires this XML resource to generate its classes.
- `app:popUpTo` / `app:popUpToInclusive` on an `<action>` mirror the `popUpTo`/`inclusive` options of [NavOptions](./navoptions.md).
- Package/tooling: `androidx.navigation:navigation-fragment`, Android Studio Navigation Editor.

## Related

- [NavHostFragment](./navhostfragment.md)
- [Safe Args](./safe-args.md)
- [NavOptions](./navoptions.md)

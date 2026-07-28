# NavHostFragment

`Fragment` subclass providing an area within a View-based layout for self-contained navigation. Hosts a `NavController` that swaps child fragments as the user navigates through the graph.

## Signature / Usage

```kotlin
public open class NavHostFragment : Fragment(), NavHost {
    public companion object {
        @JvmStatic
        public fun findNavController(fragment: Fragment): NavController

        @JvmOverloads
        @JvmStatic
        public fun create(
            @NavigationRes graphResId: Int,
            startDestinationArgs: Bundle? = null,
        ): NavHostFragment
    }
}
```

```xml
<androidx.fragment.app.FragmentContainerView
    android:id="@+id/nav_host_fragment"
    android:name="androidx.navigation.fragment.NavHostFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:defaultNavHost="true"
    app:navGraph="@navigation/nav_graph" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `graphResId` | `Int` (`@NavigationRes`) | — | Resource ID of the navigation graph XML to inflate. |
| `startDestinationArgs` | `Bundle?` | `null` | Arguments passed to the graph's start destination. |
| `app:navGraph` | XML attribute | — | Navigation graph resource for the `FragmentContainerView`/`fragment` tag. |
| `app:defaultNavHost` | XML attribute (`Boolean`) | `false` | When `true`, this host intercepts the system Back button. |

## Notes

- Add via a `<FragmentContainerView>` (or legacy `<fragment>`) tag with `android:name="androidx.navigation.fragment.NavHostFragment"`, or create programmatically with `create()`.
- When building the graph with the Kotlin DSL instead of XML, omit `app:navGraph` and assign `navController.graph` in code (see [Navigation Graph XML](./navigation-graph-xml.md) notes).
- Retrieve the hosted `NavController` with [findNavController](./findnavcontroller.md), not by casting the fragment.
- Package: `androidx.navigation.fragment`.

## Related

- [findNavController](./findnavcontroller.md)
- [Navigation Graph XML](./navigation-graph-xml.md)
- [Safe Args](./safe-args.md)

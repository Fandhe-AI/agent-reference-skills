# Safe Args

Gradle plugin that generates type-safe `Directions` and `Args` classes from a Fragment navigation graph XML, for passing and receiving arguments between destinations without manual `Bundle` handling.

## Signature / Usage

```groovy
// Top-level build.gradle
buildscript {
    dependencies {
        classpath "androidx.navigation:navigation-safe-args-gradle-plugin:$nav_version"
    }
}

// App/module build.gradle (Kotlin-only module)
plugins {
    id 'androidx.navigation.safeargs.kotlin'
}
```

```kotlin
// Sending: <OriginFragment>Directions.<actionMethod>(args...)
val action = SpecifyAmountFragmentDirections.confirmationAction(amount)
findNavController().navigate(action)

// Receiving: <DestinationFragment>Args
val args: ConfirmationFragmentArgs by navArgs()
val amount = args.amount
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `app:argType` | XML attribute | — | Argument type on an `<argument>` tag: `integer`, `float`, `long`, `boolean`, `string`, `reference`, or a fully-qualified `Parcelable`/`Serializable`/enum class name. |
| `android:defaultValue` | XML attribute | none | Default value for the argument if not supplied at navigation time. |

## Notes

- Generates one `[Origin]Directions` class per originating destination (one method per `<action>`), and one `[Destination]Args` class per destination declaring `<argument>`s, retrieved via `navArgs()` or `Args.fromBundle()`.
- **Incompatible with type-safe routes and the Kotlin DSL** — Safe Args requires an XML navigation graph resource to generate its classes; it is superseded by [Type-Safe Routes](./type-safe-routes.md) for Compose-based apps.
- Prefer passing minimal data (IDs) and loading full objects in the receiving destination; use a shared `ViewModel` instead of arguments for large/complex data.
- Package (generated code namespace): matches the module applying the plugin; runtime dependency `androidx.navigation:navigation-fragment-ktx`.

## Related

- [Navigation Graph XML](./navigation-graph-xml.md)
- [NavHostFragment](./navhostfragment.md)
- [Type-Safe Routes](./type-safe-routes.md)

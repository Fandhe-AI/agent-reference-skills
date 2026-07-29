# `navDeepLink`

Builder function used in Navigation Compose's `composable()` `deepLinks` parameter to declare a type-safe implicit deep link for a `@Serializable` route.

## Signature / Usage

```kotlin
public inline fun <reified T : Any> navDeepLink(
    basePath: String,
    typeMap: Map<KType, NavType<*>> = emptyMap(),
): NavDeepLink
```

```kotlin
@Serializable
data class Profile(val id: String)

val uri = "https://www.example.com"

composable<Profile>(
    deepLinks = listOf(navDeepLink<Profile>(basePath = "$uri/profile"))
) { backStackEntry ->
    val profile: Profile = backStackEntry.toRoute()
    ProfileScreen(id = profile.id)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `basePath` | `String` | — | Base URI the route's `@Serializable` fields are appended to (path params for non-optional fields, query params for nullable/default fields). |
| `typeMap` | `Map<KType, NavType<*>>` | `emptyMap()` | Custom `NavType` mapping for non-primitive route argument types. |

`NavDeepLink.Builder` (used internally / for the Kotlin DSL `deepLink { }`) also exposes `setUriPattern`, `setAction`, `setMimeType`, and `build()`.

## Notes

- A matching `<intent-filter>` with the same scheme/host must still be declared in `AndroidManifest.xml`; `navDeepLink` alone does not register the app with the OS.
- URI patterns support path parameters (`{id}`), a wildcard `.*`, and query parameters; extraneous query parameters not declared in the route don't break matching, and nullable/default route fields are treated as optional.
- Requires `androidx.navigation.compose` (Navigation Compose). For XML-based graphs, use the `<deepLink>` tag instead.
- This is Android deep linking / App Links (Kotlin, `androidx.navigation` and `AndroidManifest.xml`) — distinct from the same-named concept in other skills.

## Related

- [deep-link-xml-tag](./deep-link-xml-tag.md)
- [handle-deep-link](./handle-deep-link.md)
- [composable](../nav-compose/composable.md)
- [Type-Safe Routes](../nav-compose/type-safe-routes.md)

# `<deepLink>` Tag (Navigation XML)

Declares an implicit deep link directly on a `<fragment>` (or other destination) node inside a Navigation XML graph; the Navigation component auto-generates the matching `<intent-filter>` at build time.

## Signature / Usage

```xml
<fragment android:id="@+id/a"
          android:name="com.example.myapplication.FragmentA"
          tools:layout="@layout/a">
  <deepLink app:uri="www.example.com"
            app:action="android.intent.action.MY_ACTION"
            app:mimeType="type/subtype" />
</fragment>
```

```xml
<!-- AndroidManifest.xml: reference the graph so the build tool can generate intent filters -->
<nav-graph android:value="@navigation/nav_graph" />
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `app:uri` | `String` | — | URI pattern to match; supports path parameters (`{id}`), wildcard `.*`, and query parameters. |
| `app:action` | `String` | — | Optional intent action to match. |
| `app:mimeType` | `String` | — | Optional MIME type to match. |

## Notes

- Requires adding `<nav-graph android:value="@navigation/nav_graph" />` to `AndroidManifest.xml` so the Navigation Gradle plugin can generate the corresponding `<intent-filter>` elements at build time.
- For programmatic (Kotlin DSL) graphs, use `deepLink { }` / `navDeepLink()` instead — see [nav-deep-link](./nav-deep-link.md).
- This is Android deep linking / App Links (Kotlin, `androidx.navigation` and `AndroidManifest.xml`) — distinct from the same-named concept in other skills.

## Related

- [nav-deep-link](./nav-deep-link.md)
- [handle-deep-link](./handle-deep-link.md)

# `Intent.ACTION_VIEW` and Activity `launchMode`

When an intent filter matches, Android launches the target `Activity` with an `ACTION_VIEW` intent carrying the link `Uri` in `intent.data`; the `Activity`'s `launchMode` determines whether it arrives via `onCreate` or `onNewIntent`.

## Signature / Usage

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.main)

    val action: String? = intent?.action
    val data: Uri? = intent?.data

    when (action) {
        Intent.ACTION_VIEW -> {
            data?.let { uri ->
                val productId = uri.lastPathSegment
                loadProduct(productId)
            }
        }
    }
}
```

```kotlin
// Required only for non-"standard" launchMode (e.g. singleTop), where the
// running Activity instance is reused instead of re-created
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)
    setIntent(intent)
    navController.handleDeepLink(intent)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `android:launchMode="standard"` | manifest attribute | `standard` | Default. Deep links are delivered as a new `Activity` instance via `onCreate`; no manual handling needed. |
| `android:launchMode="singleTop"` (or other non-standard modes) | manifest attribute | — | The existing instance is reused; the deep link `Intent` arrives in `onNewIntent` instead, requiring an explicit `handleDeepLink()` / `setIntent()` call. |

## Notes

- `getIntent()` inside `onNewIntent` still returns the **old** intent unless `setIntent(intent)` is called first.
- For Navigation Compose/XML graphs, prefer `NavController.handleDeepLink(intent)` in `onNewIntent` over manually parsing `intent.data` — see [handle-deep-link](./handle-deep-link.md).
- This is Android deep linking / App Links (Kotlin, `androidx.navigation` and `AndroidManifest.xml`) — distinct from the same-named concept in other skills.

## Related

- [intent-filter-deep-links](./intent-filter-deep-links.md)
- [handle-deep-link](./handle-deep-link.md)

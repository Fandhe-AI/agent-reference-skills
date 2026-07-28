# Intent

An asynchronous messaging object used to request an action from another app component; it carries a component name, action, data, category, extras, and flags.

## Signature / Usage

```kotlin
// Explicit intent — names the target component
val downloadIntent = Intent(this, DownloadService::class.java).apply {
    data = Uri.parse(fileUrl)
}
startService(downloadIntent)

// Implicit intent — declares an action, letting the system resolve a component
val sendIntent = Intent().apply {
    action = Intent.ACTION_SEND
    putExtra(Intent.EXTRA_TEXT, textMessage)
    type = "text/plain"
}
try {
    startActivity(sendIntent)
} catch (e: ActivityNotFoundException) {
    // No app can handle the intent
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Component name | `ComponentName?` | `null` | Set via `setComponent()` / `setClass()` / `setClassName()`. Makes the intent explicit when present. |
| `action` | `String?` | `null` | Generic action to perform (`ACTION_VIEW`, `ACTION_SEND`, `ACTION_EDIT`, ...). Required for implicit intents to resolve against `<intent-filter>` actions. |
| `data` / `type` | `Uri?` / `String?` | `null` | URI and/or MIME type of the data to act on; set with `setData()`, `setType()`, or `setDataAndType()`. |
| `category` | `Set<String>` | empty | Additional info about the component kind (`CATEGORY_DEFAULT` required for implicit intents, `CATEGORY_LAUNCHER`, `CATEGORY_BROWSABLE`). |
| `extras` | `Bundle` | empty | Key-value pairs of additional data, added with `putExtra()` / `putExtras()`; prefix custom extra keys with your package name. |
| `flags` | `Int` | `0` | Metadata controlling task/activity launch behavior, set with `setFlags()`. See [Tasks and back stack](./tasks-and-back-stack.md). |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Explicit intents specify a full `ComponentName` and are required for starting a `Service` — never use an implicit intent to start a service (security hazard).
- Implicit intents are resolved by the system against declared `<intent-filter>` elements; see [Intent filters](./intent-filters.md) and [Common intents](./common-intents.md).
- Always guard `startActivity()` with `intent.resolveActivity(packageManager) != null` (or catch `ActivityNotFoundException`) since no matching app may be installed; package visibility rules can also affect resolution — see [Package visibility](./package-visibility.md).
- Use `Intent.createChooser(intent, title)` to force a chooser UI when multiple apps could handle an implicit intent.

## Related

- [Intent filters](./intent-filters.md)
- [Common intents](./common-intents.md)
- [Package visibility](./package-visibility.md)
- [Activity Result contracts](./activity-result-contracts.md)

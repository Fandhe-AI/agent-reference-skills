# Common intents

A catalog of frequently used implicit intents for invoking built-in device apps (maps, sharing, camera, alarms, contacts) without depending on a specific app.

## Signature / Usage

```kotlin
// ACTION_VIEW — show a location on a map
fun showMap(geoLocation: Uri) {
    val intent = Intent(Intent.ACTION_VIEW).apply { data = geoLocation }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}
showMap(Uri.parse("geo:47.6,-122.3?z=11"))
```

```kotlin
// ACTION_SEND — share content, forcing a chooser
fun sendEmail(subject: String, body: String) {
    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "message/rfc822"
        putExtra(Intent.EXTRA_SUBJECT, subject)
        putExtra(Intent.EXTRA_TEXT, body)
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(Intent.createChooser(intent, "Send Email"))
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ACTION_VIEW` | Intent action | — | Display content (maps, media, web pages) identified by `data`. |
| `ACTION_SEND` / `ACTION_SEND_MULTIPLE` | Intent action | — | Share one or more items to another app; use `EXTRA_STREAM` for attachments, `EXTRA_TEXT` / `EXTRA_SUBJECT` for text. |
| `ACTION_GET_CONTENT` | Intent action | — | Ask the user to pick a file of a given `type`, returned via the launched activity's result. |
| `ACTION_DIAL` | Intent action | — | Open the dialer pre-filled with a number (does not require the `CALL_PHONE` permission, unlike `ACTION_CALL`). |
| `ACTION_SET_ALARM` (`AlarmClock`) | Intent action | — | Create an alarm in the clock app via `EXTRA_MESSAGE` / `EXTRA_HOUR` / `EXTRA_MINUTES`. |
| `ACTION_PICK` | Intent action | — | Let the user choose an item (e.g. a contact) from a content provider-backed list. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Android 17: apps sending `ACTION_SEND`, `ACTION_SEND_MULTIPLE`, or `ACTION_IMAGE_CAPTURE` with a content URI should add `FLAG_GRANT_READ_URI_PERMISSION` (plus `FLAG_GRANT_WRITE_URI_PERMISSION` for `ACTION_IMAGE_CAPTURE`) explicitly because automatic grants stop in Android 18; see [Android 17 platform changes](./android-17-platform-changes.md). Source: https://developer.android.com/about/versions/17/behavior-changes-all (fetched 2026-11-14).
- Always guard invocation with `intent.resolveActivity(packageManager) != null`, since no matching app may be installed or visible (see [Package visibility](./package-visibility.md)).
- `Intent.createChooser(intent, title)` forces a disambiguation dialog even if the user has set a default handler for the action.
- Prefer the modern Activity Result APIs (`registerForActivityResult` / `rememberLauncherForActivityResult`) over the deprecated `startActivityForResult()` / `onActivityResult()` shown in older samples for these intents. See [Activity Result contracts](./activity-result-contracts.md).

## Related

- [Intent](./intent.md)
- [Intent filters](./intent-filters.md)
- [Activity Result contracts](./activity-result-contracts.md)

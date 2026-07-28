# Activity Result contracts

A type-safe, lifecycle-aware replacement for `startActivityForResult()` / `onActivityResult()`; `ActivityResultContract` defines the input/output types, and `registerForActivityResult()` (View) / `rememberLauncherForActivityResult()` (Compose) register a launcher.

## Signature / Usage

```kotlin
// View-based: register during onCreate, launch later
val getContent = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
    // Handle the returned Uri
}
selectButton.setOnClickListener { getContent.launch("image/*") }
```

```kotlin
// Compose
val launcher = rememberLauncherForActivityResult(
    contract = ActivityResultContracts.GetContent(),
    onResult = { uri: Uri? -> /* Handle the returned Uri */ }
)
Button(onClick = { launcher.launch("image/*") }) { Text("Select Image") }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ActivityResultContracts.StartActivityForResult` | contract | — | Generic contract wrapping an arbitrary `Intent`; result exposes `resultCode` and `data`. |
| `ActivityResultContracts.RequestPermission` / `RequestMultiplePermissions` | contract | — | Requests one or more runtime permissions; result is `Boolean` / `Map<String, Boolean>`. |
| `ActivityResultContracts.GetContent` | contract | — | Lets the user pick a document/file of a given MIME `type`; result is `Uri?`. |
| `ActivityResultContracts.TakePicturePreview` | contract | — | Launches the camera app for a thumbnail preview; result is `Bitmap?`. |
| Custom `ActivityResultContract<I, O>` | class | — | Override `createIntent(context, input)` and `parseResult(resultCode, intent)` to define a reusable typed contract. |

## Notes

- This is the Android platform / androidx entry-point API (Kotlin, `androidx.activity.result`) — distinct from the same-named concept in other skills.
- `registerForActivityResult()` must be called unconditionally during activity/fragment creation (before `onStart()`), even if the launch itself only happens conditionally — the framework needs to associate the callback before the lifecycle owner starts.
- For classes that don't implement `ActivityResultCaller` (e.g. plain lifecycle observers), register directly against an `ActivityResultRegistry` instead.
- This API replaces the deprecated `startActivityForResult()` / `onActivityResult()` pair referenced in older common-intent samples; new code should prefer it. See [Common intents](./common-intents.md).
- A custom `ActivityResultRegistry` can be substituted in tests to avoid launching real activities.

## Related

- [ComponentActivity and setContent](./component-activity-compose.md)
- [Intent](./intent.md)
- [Common intents](./common-intents.md)

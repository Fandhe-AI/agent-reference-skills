# Parcelables and bundles

`Parcelable` and `Bundle` are the mechanism the platform uses to marshal data across process/component boundaries — Intent extras, `onSaveInstanceState()`/`rememberSaveable`, and Binder/IPC transactions. `Parcel` is not a general-purpose serialization format and must never be persisted to disk or sent over a network.

## Signature / Usage

```kotlin
@Parcelize
data class MediaItem(val id: String, val title: String) : Parcelable

val intent = Intent(this, PlayerActivity::class.java).apply {
    putExtra("media_item", mediaItem as Parcelable)
}
startActivity(intent)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@Parcelize` | annotation (`kotlinx.parcelize`) | — | Generates `writeToParcel()` and the `CREATOR` for a class implementing `Parcelable`; requires the `kotlin-parcelize` Gradle plugin. Recommended over a manual implementation for Kotlin/Compose apps. |
| `Bundle` | class (`android.os`) | — | Key/value container for primitives and `Parcelable`/`Serializable` values; used for Intent extras and instance-state saving. |
| `TransactionTooLargeException` | exception | — | Thrown when a Binder transaction (Intent extras, `startActivity`, saved-instance-state) exceeds the buffer limit. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- The Binder transaction buffer has a fixed **1MB** limit shared by every transaction in a process (`startActivity`, `onSaveInstanceState`/`rememberSaveable`, and other system interactions); exceeding it throws `TransactionTooLargeException` on API 24+ (earlier versions only log a warning).
- Keep Intent extras to a few KB and saved instance state under roughly **50KB** — well below the 1MB ceiling, which is shared process-wide.
- Never send a custom `Parcelable` between different app processes: the receiving process must know the exact class definition, and system processes will strip or fail to unmarshal an unknown custom class from an Intent.
- How to actually preserve UI state across configuration changes / process death (`rememberSaveable`, `ViewModel`, `SavedStateHandle`) is covered by `configuration-changes.md` in this skill, plus the `android-architecture` and `android-compose-ui` skills — this page covers the marshalling mechanism itself, not the state-saving strategy.

## Related

- [Configuration changes and state restoration](./configuration-changes.md)
- [Intent](./intent.md)
- [Activity lifecycle](./activity-lifecycle.md)

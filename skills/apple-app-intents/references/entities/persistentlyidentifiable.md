---
source: https://developer.apple.com/documentation/appintents/persistentlyidentifiable
---

# PersistentlyIdentifiable

Defines a string that uniquely identifies a type. This is useful for maintaining the identity of a type, even when its type name is changed.

## Signature / Usage

```swift
protocol PersistentlyIdentifiable
```

```swift
static var persistentIdentifier: String
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `persistentIdentifier` | `static var persistentIdentifier: String` (required; 3 default implementations) | A string that uniquely identifies this type. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- Inherited by (from the page's relationships): `AppEntity`, `AppEnum`, `AppIntent`, `AppUnionValueCasesProviding`, `AppValue`, `AssistantEntity`, `AssistantEnum`, `AssistantIntent`, `AssistantSchemaEntity`, `AssistantSchemaEnum`, `AssistantSchemaIntent`, `AudioPlaybackIntent`, `AudioRecordingIntent`, `AudioStartingIntent` (deprecated), `CameraCaptureIntent`, `CancellableIntent`, `ControlConfigurationIntent`, `CustomIntentMigratedAppIntent`, `DeleteIntent`, `DeprecatedAppIntent`, `EntityPropertyQuery`, `EntityQuery`, `EntityStringQuery`, `EnumerableEntityQuery`, `FileEntity`, `ForegroundContinuableIntent` (deprecated), `IndexedEntity`, `IndexedEntityQuery`, `IntentValueQuery`, `LiveActivityIntent`, `LiveActivityStartingIntent` (deprecated), `LongRunningIntent`, `OpenIntent`, `OwnershipProvidingEntity`, `PauseWorkoutIntent`, `PlayVideoIntent`, `PredictableIntent`, `ProgressReportingIntent`, `PushToTalkTransmissionIntent`, `ResumeWorkoutIntent`, `SetFocusFilterIntent`, `SetValueIntent`, `ShowInAppSearchResultsIntent`, `SnippetIntent`, `StartDiveIntent`, `StartWorkoutIntent`, `SyncableEntity`, `SystemIntent`, `TargetContentProvidingIntent`, `TransientAppEntity`, `UISceneAppIntent`, `URLRepresentableEntity`, `URLRepresentableEnum`, `URLRepresentableIntent`, `UndoableIntent`, `UniqueAppEntity`, `UniqueAppEntityQuery`, `WidgetConfigurationIntent`. Conforming types: `EmptySnippetIntent`, `OpenURLIntent`, `RunSystemShortcutIntent`, `StringSearchScope`, `SystemShortcut`, `UniqueAppEntityProvider`, `VideoCategory`.

## Related

- [AppEntity](./appentity.md)
- [AppEnum](./appenum.md)
- [EntityIdentifier](./entityidentifier.md)
- [EntityIdentifierConvertible](./entityidentifierconvertible.md)

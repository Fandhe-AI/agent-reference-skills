---
source: https://developer.apple.com/documentation/appintents/startdiveintent
---

# StartDiveIntent

An App Intent that lets people start a dive session when they press the Action button on Apple Watch Ultra.

## Signature / Usage

```swift
protocol StartDiveIntent : SystemIntent
```

```swift
struct MyStartDiveIntent: StartDiveIntent {

    static var title: LocalizedStringResource = "Starting a dive session."

    func perform() async throws -> some IntentResult {
        logger.debug("*** Starting a dive session. ***")

        await DiveManager.shared.start()
        return .result(actionButtonIntent: StartDive())
    }
}
```

## Notes

- watchOS 9.0+ only
- The intent needs a `title` property (localized description of the action) and a `perform()` method, which the system calls when it triggers the intent.
- To read live depth, water pressure, and water temperature data, see the Core Motion article "Accessing submersion data".
- Important: before accessing live dive data, the app needs an entitlement to access submersion data (request via "Express interest in the Submerged Depth and Pressure API" on developer.apple.com).
- See the article "Responding to the Action button on Apple Watch Ultra".
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [StartWorkoutIntent](./startworkoutintent.md)
- [SystemIntent](../intent-types/systemintent.md)

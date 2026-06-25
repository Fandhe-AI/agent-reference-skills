# MLModelCollection

**Deprecated.** A set of Core ML models received from a model deployment (Core ML Model Deployment service). Use Background Assets or URLSession for new projects.

## Signature / Usage

```swift
class MLModelCollection: NSObject  // Deprecated iOS 17.4+

// Request access
MLModelCollection.beginAccessingModelCollection(
    withIdentifier: "MyCollection"
) { collection, error in
    guard let collection else { return }
    let entries = collection.entries   // [String: MLModelCollection.Entry]
}

// Observe updates
NotificationCenter.default.addObserver(
    forName: MLModelCollection.didChangeNotification,
    object: collection,
    queue: .main
) { _ in /* reload models */ }

// End access when done
MLModelCollection.endAccessing(identifier: "MyCollection")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `identifier` | `String` | Unique collection name for your development team |
| `deploymentID` | `String` | Identifier of the active deployment |
| `entries` | `[String: MLModelCollection.Entry]` | Models in the collection, keyed by model identifier |

## Notes

iOS 14.0–17.4 (deprecated), Mac Catalyst 14.0–17.4, visionOS 1.0–1.1. Replacement: use [Background Assets](https://developer.apple.com/documentation/BackgroundAssets) to download model files and `URLSession` for network transfers, then load with `MLModel`.

## Related

- [MLModel](./mlmodel.md)
- [MLModelAsset](./mlmodelasset.md)

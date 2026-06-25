# PHFetchResult

An ordered, lazily-loaded list of assets or collections returned from a Photos fetch method. Provides an NSArray-compatible interface with thread-safe access and automatic caching.

## Signature / Usage

```swift
let result: PHFetchResult<PHAsset> = PHAsset.fetchAssets(with: .image, options: nil)

print(result.count)

result.enumerateObjects { asset, index, stop in
    // process each asset
}

let first = result.firstObject
let third = result.object(at: 2)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `count` | `Int` | Number of objects in the fetch result |
| `firstObject` | `ObjectType?` | First object in the result |
| `lastObject` | `ObjectType?` | Last object in the result |
| `object(at:)` | `ObjectType` | Object at the given index; also accessible via subscript |
| `objects(at:)` | `[ObjectType]` | Objects at the given index set |
| `contains(_:)` | `Bool` | Whether the specified object is present |
| `index(of:)` | `Int` | Lowest index of a matching object |
| `enumerateObjects(_:)` | `Void` | Iterates all objects with a block |
| `enumerateObjects(options:using:)` | `Void` | Iterates with enumeration options (e.g., `.concurrent`) |
| `countOfAssets(with:)` | `Int` | Count of assets matching a given media type |

## Notes

iOS 8.0+, iPadOS 8.0+, macOS 10.13+, tvOS 10.0+, visionOS 1.0+. Contents are lazily loaded and cached in batches; objects outside the cached window are re-fetched on access and may reflect updated values. Register a `PHPhotoLibraryChangeObserver` to receive updated fetch results after library changes.

## Related

- [PHAsset](./phasset.md)
- [PHFetchOptions](./phfetchoptions.md)
- [PHPhotoLibraryChangeObserver](./phphotolibrarychangeobserver.md)

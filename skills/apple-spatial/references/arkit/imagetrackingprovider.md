# ImageTrackingProvider

A source of live data about a 2D image's position in a person's surroundings.

## Signature / Usage

```swift
final class ImageTrackingProvider

init(referenceImages: [ReferenceImage])
var anchorUpdates: AnchorUpdateSequence<ImageAnchor>
var allAnchors: [ImageAnchor]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(referenceImages:)` | `[ReferenceImage]` | Creates an image-tracking provider that tracks the reference images you supply. |
| `anchorUpdates` | `AnchorUpdateSequence<ImageAnchor>` | A sequence of updates that provide information about images a provider tracks. |
| `allAnchors` | `[ImageAnchor]` | An array of all the image anchors the provider is tracking. |
| `state` | `DataProviderState` | The current status of data coming from a provider. |
| `isSupported` | `Bool` (static) | Whether the current runtime environment supports image-tracking providers. |
| `requiredAuthorizations` | `[ARKitSession.AuthorizationType]` (static) | The types of authorizations necessary for tracking images. |

## Notes

- visionOS 1.0+. Conforms to `DataProvider`.
- `ImageAnchor` (struct): a 2D image's position in a person's surroundings.
- `ReferenceImage` (struct): a 2D image the system uses as a reference to find the same image in a person's surroundings.
- Official articles: "Tracking preregistered images in 3D space", "Detecting Images in an AR Experience", "Tracking and altering images".
- Source: https://developer.apple.com/documentation/arkit/imagetrackingprovider (fetched 2026-10 from the DocC JSON).

## Related

- [DataProvider](./dataprovider.md)
- [ARKitSession](./arkitsession.md)

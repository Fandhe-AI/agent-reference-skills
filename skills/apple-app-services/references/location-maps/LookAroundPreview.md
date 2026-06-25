# LookAroundPreview

A SwiftUI view that displays a street-level Look Around preview for a geographic location. Requires fetching an `MKLookAroundScene` first via `MKLookAroundSceneRequest`.

## Signature / Usage

```swift
struct PlacePreviewView: View {
    @State private var scene: MKLookAroundScene?

    var body: some View {
        LookAroundPreview(initialScene: scene)
            .frame(height: 200)
            .onAppear {
                Task {
                    let req = MKLookAroundSceneRequest(coordinate: targetCoord)
                    scene = try? await req.scene
                }
            }
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `initialScene` | `MKLookAroundScene?` | Scene to display (uncontrolled; nil shows empty state) |
| `scene` | `Binding<MKLookAroundScene?>` | Reactive binding to scene (controlled form) |
| `allowsNavigation` | `Bool` | Whether user can navigate within the preview (default `true`) |
| `showsRoadLabels` | `Bool` | Show road name labels (default `true`) |
| `pointsOfInterest` | `PointOfInterestCategories` | Filter visible POI categories |
| `badgePosition` | `MKLookAroundBadgePosition` | Position of the Apple Maps badge |

## Notes

- iOS 17.0+, iPadOS 17.0+, macOS 14.0+, visionOS 1.0+ (not available on tvOS or watchOS)
- Conforms to `View`, `Sendable`.
- Not all locations have Look Around coverage; always handle the `nil` scene case.
- For a full-screen interactive viewer, use the `.lookAroundViewer(isPresented:initialScene:)` view modifier instead.

## Related

- [Map](./Map.md)
- [MKMapItem](./MKMapItem.md)

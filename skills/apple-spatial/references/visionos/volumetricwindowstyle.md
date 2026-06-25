# VolumetricWindowStyle

A `WindowStyle` that creates a 3D volumetric window, enabling depth-based 3D content alongside other windows.

## Signature / Usage

```swift
struct VolumetricWindowStyle: WindowStyle
```

Apply with the `.windowStyle(_:)` scene modifier:

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .windowStyle(.volumetric)
    }
}
```

## Notes

- visionOS 1.0+ only. Not available on macOS, iOS, or other platforms.
- Use `RealityView` or `Model3D` inside a volumetric window to place 3D content.
- The window has a defined 3D bounding box; content outside it is clipped.

## Related

- [WindowGroup](./windowgroup.md)
- [RealityView](./realityview.md)
- [Model3D](./model3d.md)

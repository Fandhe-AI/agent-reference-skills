# ImmersiveSpace

A SwiftUI scene that presents its content in an unbounded 3D space. Available on visionOS 1.0+.

## Signature / Usage

```swift
nonisolated struct ImmersiveSpace<Content, Data>
where Content: ImmersiveSpaceContent,
      Data: Decodable, Data: Encodable, Data: Hashable
```

```swift
@main
struct SolarSystemApp: App {
    @State private var style: ImmersionStyle = .full

    var body: some Scene {
        ImmersiveSpace(id: "solarSystem") {
            SolarSystem()
        }
        .immersionStyle(selection: $style, in: .full)
    }
}
```

## Notes

- visionOS 1.0+. Only one immersive space can be open at a time.
- Default immersion style is `.mixed`; content intermixes with passthrough video.
- Use `.immersionStyle(selection:in:)` modifier to configure available styles.
- Set `UIApplicationPreferredDefaultSceneSessionRole` in `Info.plist` to open a space at launch.

## Related

- [ImmersiveSpaceContent](./immersivespacecontent.md)
- [ImmersionStyle](./immersionstyle.md)
- [openImmersiveSpace (Environment)](./openimmersivespace.md)
- [dismissImmersiveSpace (Environment)](./dismissimmersivespace.md)

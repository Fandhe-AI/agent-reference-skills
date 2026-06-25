# WindowGroup

A SwiftUI scene that presents a group of identically structured windows. On visionOS, multiple windows can coexist in 3D space.

## Signature / Usage

```swift
nonisolated struct WindowGroup<Content> where Content: View
```

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        WindowGroup(id: "detail", for: Item.ID.self) { $itemID in
            DetailView(itemID: itemID)
        }
    }
}
```

Open a window programmatically:

```swift
@Environment(\.openWindow) private var openWindow

Button("Open Detail") {
    openWindow(id: "detail", value: item.id)
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(content:)` | Basic window group |
| `init(id:content:)` | With string identifier for programmatic opening |
| `init(for:content:)` | Data-driven; window receives `Binding<D?>` |
| `init(for:content:defaultValue:)` | Data-driven with a default value |

Data types passed to windows must conform to `Hashable` and `Codable`. Each window maintains independent `@State` / `@StateObject`.

## Notes

- visionOS 1.0+. Each window in 3D space is independently positioned.
- Use lightweight data (e.g., IDs) as presentation values, not full model objects.

## Related

- [VolumetricWindowStyle](./volumetricwindowstyle.md)
- [ImmersiveSpace](./immersivespace.md)

# Model3D

A SwiftUI view that asynchronously loads and displays a 3D model from a USD or Reality file.

## Signature / Usage

```swift
struct Model3D<Content> where Content: View
```

```swift
Model3D(named: "Robot-Drummer") { model in
    model
        .resizable()
        .aspectRatio(contentMode: .fit)
} placeholder: {
    ProgressView()
}
```

Load from a URL with phase-based control:

```swift
Model3D(url: URL(string: "https://example.com/robot.usdz")!) { phase in
    switch phase {
    case .success(let model): model.resizable()
    case .failure:            Color.red
    default:                  Color.blue
    }
}
```

## Options / Props

| Initializer | Description |
|-------------|-------------|
| `init(named:bundle:)` | Load named asset from a bundle |
| `init(named:bundle:content:placeholder:)` | Named asset with resolved model closure and placeholder |
| `init(named:bundle:transaction:content:)` | Named asset with `Model3DPhase`-based content closure |
| `init(url:)` | Load from URL |
| `init(url:content:placeholder:)` | URL with resolved model closure and placeholder |
| `init(asset:)` | Load from a pre-loaded `Model3DAsset` |
| `init(from:configurations:)` | Load from `Entity.ConfigurationCatalog` |

Key types: `ResolvedModel3D` (apply `.resizable()`, `.aspectRatio()` here), `Model3DPhase` (`.success`, `.failure`, loading).

## Notes

- visionOS 1.0+.
- Apply `ResolvedModel3D` modifiers (e.g., `.resizable()`) inside the `content` closure, **not** directly on `Model3D`.

## Related

- [RealityView](./realityview.md)

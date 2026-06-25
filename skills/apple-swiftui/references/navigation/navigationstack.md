# NavigationStack

A view that displays a root view and enables you to present additional views over the root view.

## Signature / Usage

```swift
// Unmanaged state
NavigationStack {
    List(parks) { park in
        NavigationLink(park.name, value: park)
    }
    .navigationDestination(for: Park.self) { park in
        ParkDetails(park: park)
    }
}

// Programmatic / externally managed path
@State private var path: [Park] = []

NavigationStack(path: $path) {
    List(parks) { park in
        NavigationLink(park.name, value: park)
    }
    .navigationDestination(for: Park.self) { park in
        ParkDetails(park: park)
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | `Binding<[Data]>` | Optional binding to a homogeneous array representing the navigation path. Omit to let the stack manage its own state. |
| `root` | `() -> Root` | The root view displayed at the bottom of the stack. |

## Notes

- Available: iOS 16+, iPadOS 16+, macOS 13+, tvOS 16+, watchOS 9+, visionOS 1+
- Use `NavigationPath` as the path type when the stack needs to hold multiple different `Hashable` types.
- Attach `navigationDestination(for:destination:)` to views **inside** the stack but **outside** lazy containers (`List`, `LazyVStack`, etc.).
- Modify `path` directly to push or pop destinations programmatically without `NavigationLink`.

## Related

- [NavigationPath](./navigationpath.md)
- [NavigationLink](./navigationlink.md)
- [navigationDestination](./navigationdestination.md)
- [NavigationSplitView](./navigationsplitview.md)

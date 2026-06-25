# navigationDestination

View modifiers that associate destination views with data types or bindings for use within a `NavigationStack` or `NavigationSplitView`.

## Signature / Usage

```swift
// 1. Type-based — matches every value of type D pushed onto the stack
.navigationDestination(for: Color.self) { color in
    ColorDetail(color: color)
}

// 2. Bool binding — programmatic push without a NavigationLink
@State private var showDetails = false

.navigationDestination(isPresented: $showDetails) {
    ColorDetail(color: favoriteColor)
}

// 3. Optional binding — push when non-nil, pop when set to nil (iOS 17+)
@State private var colorShown: Color?

.navigationDestination(item: $colorShown) { color in
    ColorDetail(color: color)
}
```

## Options / Props

| Variant | Signature | Available |
|---------|-----------|-----------|
| `navigationDestination(for:destination:)` | `(D.Type, (D) -> C) -> some View` | iOS 16+, macOS 13+ |
| `navigationDestination(isPresented:destination:)` | `(Binding<Bool>, () -> V) -> some View` | iOS 16+, macOS 13+ |
| `navigationDestination(item:destination:)` | `(Binding<D?>, (D) -> C) -> some View` | iOS 17+, macOS 14+ |

## Notes

- Available: iOS 16+ (for:) / iOS 17+ (item:); macOS 13+ (for:) / macOS 14+ (item:); visionOS 1+
- Attach the modifier to views **inside** a `NavigationStack` or `NavigationSplitView`.
- **Do not** place inside lazy containers (`List`, `LazyVStack`, etc.); the stack must always be able to see the destination.
- Multiple `navigationDestination(for:)` modifiers can coexist to handle different data types.

## Related

- [NavigationStack](./navigationstack.md)
- [NavigationLink](./navigationlink.md)
- [NavigationPath](./navigationpath.md)
- [NavigationSplitView](./navigationsplitview.md)

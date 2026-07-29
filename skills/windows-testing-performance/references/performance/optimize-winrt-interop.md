# Optimize Windows Runtime interop cost

Crossing the interop boundary between managed (C#/VB) code and Windows Runtime components has a real cost: each property access or method call transitions from a managed to a native stack frame and marshals parameters/return values between managed and unmanaged representations. This is negligible for occasional calls but becomes measurable when an app makes hundreds of thousands to millions of WinRT calls on a hot path (e.g. a physics loop reading `UIElement` bounds every frame).

## Signature / Usage

```csharp
// Bad: repeatedly touches a Windows Runtime object inside a hot loop.
for (int i = 0; i < iterations; i++)
{
    DoPhysics(uiElement.ActualWidth, uiElement.ActualHeight);
}

// Better: cache the values in local .NET variables once, then loop over locals.
double width = uiElement.ActualWidth;
double height = uiElement.ActualHeight;
for (int i = 0; i < iterations; i++)
{
    DoPhysics(width, height);
}
```

## Options / Props

| Practice | Recommendation |
|----------|-----------------|
| Prefer `System.*` types over `Windows.*` types when both exist | Types under .NET namespaces (`System.Xml.XmlReader`, `System.Collections.*`) incur no interop cost from C#/VB; types under `Windows.*` do. Match the API family to the data source instead of mixing them (e.g. use `Windows.Data.Xml.Dom.XmlDocument` for a file read via WinRT storage APIs, `System.Xml.XmlReader` for a `MemoryStream`) |
| Copy returned WinRT collections/streams to .NET types | If a WinRT call returns a collection or stream that will be read many times, copy it into a `List<T>`/`Dictionary<K,V>` once and read from the copy afterward |
| Cache repeated property/method results in local variables | Store a WinRT value read inside a loop into a local once instead of re-reading it on every iteration — especially important for values read from `UIElement`s or other frequently-touched objects |
| Combine calls into fewer, larger operations | Prefer constructors/APIs that initialize multiple properties or read/write large chunks (e.g. `Windows.Storage.BulkAccess`) over many small calls; read large chunks from a stream instead of many small reads |
| Design authored WinRT components for low call traffic | If you are authoring a component consumed from C++ or JavaScript, measure which members are called most and expose APIs that let callers do more work per call |

## Notes

- Measure with the Visual Studio **Functions** view (inclusive time in methods that call into the Windows Runtime) before optimizing — interop overhead is only worth addressing when profiling shows it dominates.
- When authoring a Windows Runtime component with same-arity overloads, exactly one overload must carry `[Windows.Foundation.Metadata.DefaultOverload]` — that is the only overload a JavaScript caller can invoke (JavaScript coerces any argument value to that overload's parameter type; the attribute cannot be applied to constructors). This is a component-authoring correctness constraint distinct from the marshaling-cost tips above, but it surfaces in the same interop-optimization doc because both concern the cost/shape of the C#/VB↔WinRT boundary.
- .NET-to-WinRT type projections (`IIterable<T>`→`IEnumerable<T>`, `IVector<T>`→`IList<T>`, `IMap<K,V>`→`IDictionary<K,V>`, WinRT primitives→`System.*` primitives) make WinRT types look like ordinary .NET types in C#/VB, but every access still crosses the interop boundary and pays the marshaling cost described above — the projection hides the type mismatch, not the cost. This is separate from cross-apartment/thread marshaling covered in the threading category (agile objects and `MarshalingBehaviorAttribute`), which is about which thread a WinRT call must run on, not the ABI transition cost paid on every call.
- Authoring a Windows Runtime component in modern C#/WinRT (rather than the legacy UWP Windows Runtime Component project type this page describes) is covered by windows-interop-modernize; that skill's `authoring-winrt-components.md` and `com-interop.md` document the current C#/WinRT 1.x authoring and `ComWrappers`-based interop APIs, not this classic per-call marshaling-cost guidance.

## Related

- [Keep the UI thread responsive](./keep-ui-thread-responsive.md)
- [MVVM performance tips for WinUI apps](./mvvm-performance-tips.md)

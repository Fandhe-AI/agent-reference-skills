# Agile Objects with C#/WinRT

An agile object can be accessed from any thread across apartments. C#/WinRT types you author are always agile, but projected types (Windows SDK/WinUI types) may not be — C#/WinRT provides `AsAgile`/`AgileReference<T>` to marshal a non-agile object across apartments safely.

## Signature / Usage

```csharp
// Check whether an object is agile.
var queryAgileObject = testObject.As<IAgileObject>();
if (queryAgileObject != null)
{
    // testObject is agile.
}

// Create an agile reference for a non-agile projected type.
var nonAgileObj = new Windows.UI.Popups.PopupMenu();
AgileReference<Windows.UI.Popups.PopupMenu> agileReference = nonAgileObj.AsAgile();

// Use it from another apartment/thread.
await Task.Run(() =>
{
    Windows.UI.Popups.PopupMenu nonAgileObjAgain = agileReference.Get();
});
```

## Options / Props

| API | Description |
| --- | --- |
| `IAgileObject` | Marker interface (from `objidl.h`); querying for it (`.As<IAgileObject>()`) succeeds only if the object is agile. |
| `AsAgile<T>()` | Generic extension method on projected C#/WinRT types that returns an `AgileReference<T>` wrapping a non-agile object. Throws if `T` is not a projected type. |
| `AgileReference<T>` | Holds an agile reference to a non-agile object; `Get()` retrieves the underlying object safely on the calling thread. |

## Notes

- C#/WinRT types that you author yourself are agile by default and cannot opt out.
- Projected types from the Windows SDK/WinUI (many UI-related types in particular) are frequently non-agile — check with `IAgileObject` before assuming.
- In COM terms, agile classes are registered with `ThreadingModel = Both`.
- This is the C#/WinRT projection's take on agility; C++/WinRT's `winrt::agile_ref<T>` / `winrt::make_agile` (see the cppwinrt category) is a distinct, separate API surface for the same COM concept.

## Related

- [.NET Mappings of WinRT Types](./net-mappings-of-winrt-types.md)
- [C#/WinRT Overview](./overview.md)

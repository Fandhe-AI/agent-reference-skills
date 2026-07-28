# Calling Asynchronous WinRT APIs from .NET

WinRT asynchronous methods return `IAsyncAction`, `IAsyncOperation<TResult>`, `IAsyncActionWithProgress<TProgress>`, or `IAsyncOperationWithProgress<TResult,TProgress>` instead of a .NET `Task`. C#/WinRT projections let you `await` these directly, and the `System.WindowsRuntimeSystemExtensions` extension methods (`AsTask`, `AsAsyncAction`, `AsAsyncOperation`) convert between the two async models.

## Signature / Usage

```csharp
// Direct await — the C#/WinRT projection makes IAsyncOperation<T> awaitable.
Windows.Storage.StorageFolder folder = Windows.Storage.KnownFolders.PicturesLibrary;
Windows.Storage.StorageFile file = await folder.GetFileAsync("photo.jpg");

// Converting to Task<TResult> with AsTask for cancellation/progress/composition.
IAsyncOperationWithProgress<StorageFolder, uint> op = folder.CreateFolderAsync("New");
CancellationTokenSource cts = new CancellationTokenSource();
Task<StorageFolder> task = op.AsTask(cts.Token);
StorageFolder created = await task;

// Exposing a .NET Task as a WinRT IAsyncAction/IAsyncOperation<T>
// (for a WinRT component authored in C#) via AsAsyncAction / AsAsyncOperation.
public IAsyncOperation<int> ComputeAsync()
{
    Task<int> t = Task.Run(() => 42);
    return t.AsAsyncOperation();
}
```

## Options / Props

| Member | Description |
| --- | --- |
| `WindowsRuntimeSystemExtensions.AsTask<TResult>(this IAsyncOperation<TResult>)` | Converts a WinRT `IAsyncOperation<TResult>` to a `Task<TResult>`. Overloads accept a `CancellationToken` and/or `IProgress<T>`. |
| `WindowsRuntimeSystemExtensions.AsTask(this IAsyncAction)` | Converts a WinRT `IAsyncAction` to a `Task`. |
| `WindowsRuntimeSystemExtensions.AsAsyncAction(this Task)` | Wraps a .NET `Task` as a WinRT `IAsyncAction`, for exposing managed async work from an authored WinRT component. |
| `WindowsRuntimeSystemExtensions.AsAsyncOperation<TResult>(this Task<TResult>)` | Wraps a .NET `Task<TResult>` as a WinRT `IAsyncOperation<TResult>`. |

## Notes

- C#/WinRT projects `IAsyncAction` / `IAsyncOperation<T>` so they can be `await`-ed directly in C#, without calling `AsTask` first, for the common case.
- Use `AsTask` when you need `Task` composition features that the raw WinRT async interfaces don't expose directly — cancellation via `CancellationToken`, progress reporting via `IProgress<T>`, or APIs like `Task.WhenAll`.
- `AsAsyncAction` / `AsAsyncOperation` are for the opposite direction: exposing a .NET `Task`-based async method as a WinRT-compatible signature when authoring a WinRT component (see [Authoring WinRT Components with C#/WinRT](./authoring-winrt-components.md)).

## Related

- [C#/WinRT Overview](./overview.md)
- [.NET Mappings of WinRT Types](./net-mappings-of-winrt-types.md)
- [Authoring WinRT Components with C#/WinRT](./authoring-winrt-components.md)

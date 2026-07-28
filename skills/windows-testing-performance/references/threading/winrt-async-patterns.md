# WinRT asynchronous patterns

Windows Runtime asynchronous APIs (methods named `...Async`) return one of four interface types instead of blocking, and can be consumed with `await` in C#/C++/VB or bridged to .NET `Task` via `AsTask`.

## Signature / Usage

```csharp
// await works directly against IAsyncAction / IAsyncOperation<T> / *WithProgress variants.
private async void Button_Click_1(object sender, RoutedEventArgs e)
{
    var client = new Windows.Web.Syndication.SyndicationClient();
    try
    {
        SyndicationFeed feed = await client.RetrieveFeedAsync(new Uri("https://example.com/feed"));
        rssOutput.Text = feed.Title.Text;
    }
    catch (Exception ex)
    {
        rssOutput.Text = "Error: " + ex.Message;
    }
}

// Bridging to Task<T> with cancellation and progress.
var cts = new CancellationTokenSource();
IAsyncOperationWithProgress<StorageFile, uint> op = someObject.DoWorkWithProgressAsync();
Task<StorageFile> task = op.AsTask(cts.Token, new Progress<uint>(p => UpdateProgressBar(p)));
StorageFile result = await task;
```

## Options / Props

| Type | Result | .NET counterpart | AsTask overloads |
|------|--------|-------------------|-------------------|
| `IAsyncAction` | `void` | `Task` | `AsTask()`, `AsTask(CancellationToken)` |
| `IAsyncActionWithProgress<TProgress>` | `void`, reports progress | `Task` | `AsTask()`, `AsTask(IProgress<TProgress>)`, `AsTask(CancellationToken)`, `AsTask(CancellationToken, IProgress<TProgress>)` |
| `IAsyncOperation<TResult>` | `TResult` | `Task<TResult>` | `AsTask()`, `AsTask(CancellationToken)` |
| `IAsyncOperationWithProgress<TResult, TProgress>` | `TResult`, reports progress | `Task<TResult>` | `AsTask()`, `AsTask(IProgress<TProgress>)`, `AsTask(CancellationToken)`, `AsTask(CancellationToken, IProgress<TProgress>)` |

Other members shared by all four interface types (via `IAsyncInfo`):

| Name | Description |
|------|-------------|
| `Status` | `AsyncStatus`: `Started`, `Completed`, `Canceled`, `Error`. |
| `Cancel()` | Requests cancellation of the operation. |
| `Close()` | Releases resources held by a completed/cancelled/errored operation. |
| `Completed` | Property to set a completion handler (`AsyncActionCompletedHandler` / `AsyncOperationCompletedHandler<TResult>`), invoked once with the final `AsyncStatus`. |
| `GetResults()` | Retrieves the result (or rethrows the operation's exception); called implicitly by `await`. |

## Notes

- Applies across UWP and Windows App SDK / WinUI 3 apps — the `Windows.Foundation.IAsyncAction` / `IAsyncOperation<T>` family is a WinRT-level contract, not tied to a specific UI framework.
- By convention every WinRT asynchronous method's name ends in `Async`. Any method using `await` on one must itself be declared `async`.
- `await`ing the return value calls `GetResults()` on it; exceptions from the async operation surface at the `await` point and can be caught with a normal `try`/`catch` (also usable in `catch`/`finally` blocks since C# 6.0).
- Prefer `await` directly on WinRT async types in app code; use `AsTask` when you need to interoperate with .NET Task combinators (`Task.WhenAll`, `Task.WhenAny`) or need a `CancellationToken`/`IProgress<T>` that the raw WinRT method doesn't accept as parameters.
- .NET-defined asynchronous methods (as opposed to WinRT ones) already return `Task`/`Task<TResult>` directly — no `AsTask` bridging is needed for those.
- Picker APIs (e.g. `FileOpenPicker.PickSingleFileAsync`) require HWND initialization in WinUI 3 desktop apps via `WinRT.Interop.InitializeWithWindow.Initialize`.

## Related

- [async/await and ConfigureAwait](./async-await-configureawait.md)
- [Thread pool](./thread-pool.md)

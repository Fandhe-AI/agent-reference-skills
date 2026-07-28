# async/await and ConfigureAwait

.NET's `async`/`await` keywords consume `Task`/`Task<TResult>` (and, via `await`, WinRT's `IAsyncAction`/`IAsyncOperation<T>` directly). `Task.ConfigureAwait` controls whether the continuation after `await` resumes on the originally-captured context.

## Signature / Usage

```csharp
// Offload CPU-bound work to a background thread, then resume on the UI thread automatically.
private async void NextMove_Click(object sender, RoutedEventArgs e)
{
    // The await causes the handler to return immediately, keeping the UI responsive.
    int result = await System.Threading.Tasks.Task.Run(() => ComputeNextMove());

    // Execution resumes here on the UI thread (captured SynchronizationContext),
    // so it's safe to touch UI elements directly.
    ResultText.Text = result.ToString();
}

// In library / non-UI code that never needs to touch the UI thread, avoid capturing
// the context to reduce overhead and avoid deadlock risk.
public async Task<string> LoadDataAsync()
{
    var data = await httpClient.GetStringAsync(url).ConfigureAwait(false);
    return Process(data);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Task.ConfigureAwait(bool continueOnCapturedContext)` | method → `ConfiguredTaskAwaitable` | `true` (default via plain `await`) marshals the continuation back to the captured context (e.g. the UI thread's `SynchronizationContext`); `false` lets the continuation run on whatever thread pool thread completes the task. |
| `Task.ConfigureAwait(ConfigureAwaitOptions options)` | method → `ConfiguredTaskAwaitable` | .NET 8+ overload with finer-grained flags (e.g. `ConfigureAwaitOptions.ForceYielding`) in place of the plain bool. |

## Notes

- Applies to any .NET Windows app (WinUI 3, WPF, WinForms, UWP). `await` on a `Task` without `ConfigureAwait` captures the current `SynchronizationContext`/`TaskScheduler` and resumes there — on the UI thread, this is what lets post-`await` code touch UI elements directly without an explicit `DispatcherQueue.TryEnqueue`/`CoreDispatcher.RunAsync` call.
- `await`ing a plain call or delegate does **not** by itself move work to a background thread — many WinRT APIs already do their I/O off-thread, but CPU-bound app code must be explicitly dispatched with `Task.Run` (or the thread pool) to leave the UI thread free.
- Calling `.Result` or `.Wait()` on a `Task` synchronously from the UI thread, combined with an inner `await` that captures the UI `SynchronizationContext` for its continuation, is the classic UI-thread deadlock pattern — the continuation can never run because the UI thread is blocked waiting for it. Use `ConfigureAwait(false)` in library/non-UI code, and prefer `await` end-to-end instead of blocking calls, to avoid it.
- UI elements may only be accessed from the thread that created them (the UI thread) — see UI thread updates and deadlock avoidance for the WinUI 3-specific mechanics (`DispatcherQueue.TryEnqueue`).

## Related

- [WinRT asynchronous patterns](./winrt-async-patterns.md)
- [UI thread updates](./ui-thread-updates.md)
- [Deadlock avoidance](./deadlock-avoidance.md)

# Deadlock avoidance

The most common Windows app deadlock is a UI-thread call that synchronously blocks (`.Result`, `.Wait()`, or a nested message loop) while waiting on a `Task`/WinRT async operation whose continuation needs to resume on that same, now-blocked, UI thread.

## Signature / Usage

```csharp
// Deadlock-prone: blocking the UI thread while the continuation needs that same thread.
private void Button_Click(object sender, RoutedEventArgs e)
{
    var result = LoadDataAsync().Result;   // BLOCKS the UI thread
    StatusBlock.Text = result;             // never reached — LoadDataAsync's
                                            // continuation can't get back onto
                                            // the blocked UI thread
}

// Fix 1: don't block — await end-to-end.
private async void Button_Click_Fixed(object sender, RoutedEventArgs e)
{
    var result = await LoadDataAsync();
    StatusBlock.Text = result;
}

// Fix 2: if a library method must be awaited from sync code, avoid capturing
// the UI context inside it so the blocked wait can still complete.
public async Task<string> LoadDataAsync()
{
    var data = await httpClient.GetStringAsync(url).ConfigureAwait(false);
    return Process(data);
}
```

## Options / Props

| Cause | Mitigation |
|------|-------------|
| `.Result` / `.Wait()` on the UI thread over a `Task` whose continuation needs that same UI thread | Use `await` all the way up the call stack instead of blocking. |
| Library code capturing the UI `SynchronizationContext` unnecessarily | Call `ConfigureAwait(false)` in non-UI library/service code so its continuations can run on any thread pool thread. |
| Nested/reentrant message loops assumed to be blocked (carried over from UWP habits) | WinUI 3's standard STA doesn't block reentrancy the way UWP's ASTA did — don't assume a callback can't re-enter while another is on the stack; see Apartment model. |
| `DispatcherQueueController.ShutdownQueue()` (synchronous) called from the queue's own thread | Prefer `ShutdownQueueAsync()` when shutting down from code that itself may be running on the `DispatcherQueue`'s thread, to avoid waiting on a drain that can't complete. |
| Background-task work item blocking on a `DispatcherQueue.TryEnqueue` result while the UI thread is itself waiting on the background task | Use fire-and-forget `TryEnqueue` (check only the returned `bool`), and report background-task progress via `IBackgroundTaskInstance.Progress` rather than a blocking round-trip. |

## Notes

- Applies to any Windows app using `async`/`await`, `DispatcherQueue`, or `CoreDispatcher`. The mechanism is a `SynchronizationContext` deadlock, not specific to any one dispatcher type — it is documented directly on `Task.ConfigureAwait`.
- A thread pool work item or `ThreadPoolTimer` callback should check `IAsyncInfo.Status`/cancellation flags rather than blocking on another operation to finish, to avoid stalling pool threads.
- When migrating UWP code that relied on ASTA's implicit reentrancy protection, re-audit any place that assumed "this event handler can't be re-entered while it's awaiting" — under WinUI 3's standard STA that assumption can now be false.

## Related

- [async/await and ConfigureAwait](./async-await-configureawait.md)
- [Apartment model (STA / MTA)](./apartment-model.md)
- [UI thread updates](./ui-thread-updates.md)

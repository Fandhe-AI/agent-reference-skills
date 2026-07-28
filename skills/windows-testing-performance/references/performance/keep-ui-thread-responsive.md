# Keep the UI thread responsive

How to avoid blocking the UI thread in a WinUI / Windows App SDK app by using `DispatcherQueue`, asynchronous APIs, and background threads.

## Signature / Usage

```csharp
private async void NextMove_Click(object sender, RoutedEventArgs e)
{
    // The await causes the handler to return immediately.
    await Task.Run(() => ComputeNextMove());

    // Runs back on the UI thread after ComputeNextMove completes.
    statusText.Text = "Move computed.";
}

private void ComputeNextMove()
{
    // Background work; don't access UI elements here directly.
}
```

```csharp
// Post work to the UI thread from a background thread.
dispatcherQueue.TryEnqueue(() =>
{
    statusText.Text = "Updated from background thread.";
});
```

## Options / Props

| API | Purpose |
|-----|---------|
| `Microsoft.UI.Dispatching.DispatcherQueue.TryEnqueue` | Marshal work back onto the UI thread from a background thread; supports low-priority enqueue for deferred work |
| `Task.Run` | Explicitly run app code on a background thread (an `await` alone does not guarantee this) |
| `x:Load` attribute | Delay-instantiate UI elements not needed for the initial view |

## Notes

- UI elements can only be updated on the UI thread. `DispatcherQueue` is the WinUI 3 desktop replacement for the UWP `CoreDispatcher`; access it via the window's `DispatcherQueue` property or `DispatcherQueue.GetForCurrentThread()`.
- A separate render thread can apply certain UI changes (many animations/transitions) without going through the UI thread.
- Always prefer the asynchronous version of an API when one is available, and write event handlers that return quickly, offloading non-trivial work to a background thread.

## Related

- [Responsive interactions and latency measurement](./responsive.md)
- [Optimize XAML loading](./optimize-xaml-loading.md)
- [MVVM performance tips](./mvvm-performance-tips.md)

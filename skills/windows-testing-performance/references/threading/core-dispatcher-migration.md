# CoreDispatcher / CoreApplication migration to DispatcherQueue

UWP's `Windows.UI.Core.CoreDispatcher` (and the `CoreApplication`/`CoreWindow` types that expose it) is **not available in WinUI 3**. Windows App SDK apps use `Microsoft.UI.Dispatching.DispatcherQueue` instead.

## Signature / Usage

```csharp
// UWP app
public void NotifyUser(string strMessage)
{
    if (this.Dispatcher.HasThreadAccess)
    {
        StatusBlock.Text = strMessage;
    }
    else
    {
        var task = this.Dispatcher.RunAsync(
            Windows.UI.Core.CoreDispatcherPriority.Normal,
            () => StatusBlock.Text = strMessage);
    }
}

// WinUI 3 / Windows App SDK app
public void NotifyUser(string strMessage)
{
    if (this.DispatcherQueue.HasThreadAccess)
    {
        StatusBlock.Text = strMessage;
    }
    else
    {
        bool isQueued = this.DispatcherQueue.TryEnqueue(
            Microsoft.UI.Dispatching.DispatcherQueuePriority.Normal,
            () => StatusBlock.Text = strMessage);
    }
}
```

## Options / Props

| UWP (`Windows.UI.Core` / `Windows.UI.Xaml`) | WinUI 3 (`Microsoft.UI.Dispatching` / `Microsoft.UI.Xaml`) |
|------|-------------|
| `CoreDispatcher` | `DispatcherQueue` |
| `CoreDispatcher.RunAsync(priority, handler)` | `DispatcherQueue.TryEnqueue(priority, handler)` |
| `CoreDispatcher.HasThreadAccess` | `DispatcherQueue.HasThreadAccess` |
| `DependencyObject.Dispatcher` | `DependencyObject.DispatcherQueue` (Windows App SDK) |
| `CoreWindow.Dispatcher` | `Microsoft.UI.Xaml.Window.DispatcherQueue` |
| `winrt::resume_foreground(CoreDispatcher)` (C++/WinRT) | `wil::resume_foreground(DispatcherQueue)` from the Windows Implementation Library (WIL) |

## Notes

- Applies to migrating a UWP app to WinUI 3 / Windows App SDK. `CoreApplication` and `CoreWindow` have no Windows App SDK equivalent either — window management moves to `Microsoft.UI.Xaml.Window` / `AppWindow`.
- UWP's threading model is Application STA (ASTA), which blocks reentrancy and helps avoid many reentrancy bugs and deadlocks. The Windows App SDK uses a standard STA model without the same reentrancy safeguards — code that implicitly relied on ASTA's non-reentrant behavior (e.g. no re-entering XAML controls mid-callback) can behave differently after migration. See the apartment model page.
- `RunAsync` returns an `IAsyncAction`; `TryEnqueue` returns a `bool` indicating whether the work item was queued (not whether it has run).
- For C++/WinRT coroutines using `winrt::resume_foreground`, switch to `wil::resume_foreground` (add the `Microsoft.Windows.ImplementationLibrary` NuGet package and `#include <wil/cppwinrt_helpers.h>`).

## Related

- [DispatcherQueue](./dispatcher-queue.md)
- [Apartment model (STA / MTA)](./apartment-model.md)
- [Deadlock avoidance](./deadlock-avoidance.md)

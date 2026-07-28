# Threading functionality migration

Migration guidance for moving from UWP's `CoreDispatcher`/ASTA threading model to the Windows App SDK's `DispatcherQueue`/standard STA threading model.

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
```

```csharp
// Windows App SDK app
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

```cppwinrt
// C++/WinRT: migrate winrt::resume_foreground(Dispatcher()) to wil::resume_foreground(DispatcherQueue())
#include <wil/cppwinrt_helpers.h>
...
winrt::fire_and_forget MainPage::ClickHandler(IInspectable const&, RoutedEventArgs const&)
{
    co_await wil::resume_foreground(this->DispatcherQueue());
}
```

## Options / Props

| UWP | Windows App SDK |
|------|-------------|
| `Windows.UI.Core.CoreDispatcher` | `Microsoft.UI.Dispatching.DispatcherQueue` |
| `CoreDispatcher.RunAsync` | `DispatcherQueue.TryEnqueue` |
| `DependencyObject.Dispatcher` | `DependencyObject.DispatcherQueue` |
| `CoreWindow.Dispatcher` | `Microsoft.UI.Xaml.Window.DispatcherQueue` |
| `winrt::resume_foreground` (C++/WinRT) | `wil::resume_foreground` (requires `Microsoft.Windows.ImplementationLibrary` NuGet package) |

## Notes

- **Threading model changed**: UWP uses ASTA (Application Single-Threaded Apartment), which blocks reentrancy. The Windows App SDK uses a **standard STA** model without ASTA's reentrancy safeguards — code that relied on non-reentrant ASTA behavior may misbehave after migration (watch for reentrancy into XAML controls).
- Stowed-exception crashes (`0xc000027b`) may need WinDbg + the `!pde.dse` extension to get an accurate call stack, since the direct crash stack is frequently already unwound.
- `Microsoft.UI.Dispatching.DispatcherQueue` supports Win32 apps generally, not just WinUI — see also the Messaging row in the feature mapping table.

## Related

- [Windowing functionality migration](./windowing-migration.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)

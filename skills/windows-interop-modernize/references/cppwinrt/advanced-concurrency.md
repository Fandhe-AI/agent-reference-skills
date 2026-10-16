# Advanced Concurrency and Asynchrony with C++/WinRT

Advanced coroutine scenarios in C++/WinRT: offloading to the Windows thread pool, thread affinity (`apartment_context`, `resume_foreground`), cancellation and cancellation callbacks, progress, fire-and-forget, awaiting kernel handles, timeouts (`wait_for`), and returning arrays asynchronously. Builds on async-coroutines.md.

## Signature / Usage

```cppwinrt
IAsyncOperation<uint32_t> DoWorkOnThreadPoolAsync()
{
    co_await winrt::resume_background(); // Return control; resume on thread pool.

    uint32_t result{};
    for (uint32_t y = 0; y < height; ++y)
    for (uint32_t x = 0; x < width; ++x)
    {
        // Do compute-bound work here.
    }
    co_return result;
}
```

Switching to the UI thread of a specific element (WinUI 3 `TextBlock`, whose `DispatcherQueue()` is `Microsoft::UI::Dispatching::DispatcherQueue`):

```cppwinrt
#include <winrt/Microsoft.UI.Dispatching.h>
#include <wil/cppwinrt_helpers.h>

IAsyncAction DoWorkAsync(TextBlock textblock)
{
    co_await winrt::resume_background();
    // Do compute-bound work here.

    // Switch to the foreground thread associated with textblock.
    co_await wil::resume_foreground(textblock.DispatcherQueue());

    textblock.Text(L"Done!"); // Guaranteed to work.
}
```

Detecting queue shutdown, and handling it gracefully (`co_await queue` is for `Windows::System::DispatcherQueue` only):

```cppwinrt
winrt::fire_and_forget RunAsync(winrt::Windows::System::DispatcherQueue queue)
{
    ...

    if (co_await queue)
    {
        ... // Resume on dispatcher thread.
    }
    else
    {
        ... // Still on calling thread.
    }
}
```

Cancellation callback (propagates cancellation to a nested coroutine, Windows SDK 10.0.17763.0+):

```cppwinrt
IAsyncAction CancelationPropagatorAsync()
{
    auto cancelation_token{ co_await winrt::get_cancellation_token() };
    auto nested_coroutine{ NestedCoroutineAsync() };

    cancelation_token.callback([=]
    {
        nested_coroutine.Cancel();
    });

    co_await nested_coroutine;
}
```

Awaiting a kernel handle with a timeout, and `wait_for` on an async object:

```cppwinrt
using namespace std::chrono_literals;

if (co_await winrt::resume_on_signal(event.get(), 2s))
{
    puts("signaled");
}
else
{
    puts("timed out");
}

if (async.wait_for(5s) == AsyncStatus::Started)
{
    puts("timed out");
}
else
{
    // will throw appropriate exception if in canceled or error state
    auto results = async.GetResults();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `winrt::resume_background()` | awaitable | Returns control to the caller, then resumes immediately on a low-level Windows thread pool thread. |
| `winrt::apartment_context` | struct | Captures the calling context; `co_await` it to switch back. |
| `winrt::resume_foreground(dispatcher, priority?)` | awaitable | Switches to the dispatcher's thread via `DispatcherQueue.TryEnqueue`; `co_await queue;` is the default-priority shorthand. Returns `true` if queued, `false` if the queue controller is shutting down (execution stays on the calling thread). Windows::System::DispatcherQueue only; for Microsoft::UI::Dispatching::DispatcherQueue use `wil::resume_foreground` (WIL `cppwinrt_helpers.h`). |
| `wil::resume_foreground(dispatcher, priority?)` | awaitable | For WinUI 3 / Windows App SDK `Microsoft::UI::Dispatching::DispatcherQueue` (WIL `<wil/cppwinrt_helpers.h>`, after including `winrt/Microsoft.UI.Dispatching.h`). Throws `winrt::hresult_error` (`HRESULT_FROM_WIN32(ERROR_NO_TASK_QUEUE)`, 0x800701ab) if the queue is shutting down. |
| `winrt::get_cancellation_token()` | awaitable | Yields a token: call `token()` to poll cancellation, `token.callback(lambda)` to register a pre-emptive callback. |
| `winrt::get_progress_token()` | awaitable | For `IAsyncActionWithProgress` / `IAsyncOperationWithProgress` coroutines; invoke `progress(value)` to report, `progress.set_result(value)` for a provisional result. |
| `winrt::fire_and_forget` | return type | For tasks you don't wait on and that return no value. |
| `winrt::resume_on_signal(HANDLE, timeout?)` | awaitable | Suspends until a kernel event is signaled; with a timeout, the `co_await` result is `true` (signaled) or `false` (timed out). |
| `IAsyncAction::get()` | function | Blocks until the async object completes. |
| `IAsyncAction::wait_for(duration)` | function | Waits up to the duration; returns `AsyncStatus` (`Completed`, `Canceled`, `Error`, `Started`). |

## Notes

- Before doing compute-bound work in a coroutine, introduce a suspension point so the caller isn't blocked; `co_await winrt::resume_background()` does that if you are not already awaiting something else.
- `co_await`-ing any of the four `IAsyncXxx` types captures the calling context and restores it on resumption (STA stays STA, MTA stays MTA) via wait adapters. Other awaitables (for example `co_await 5s;`) are thread pool wrappers and complete on the thread pool.
- Minimize context switches: call Windows Runtime APIs after `co_await winrt::resume_background()` rather than before it, otherwise C++/WinRT restores the UI thread context after each awaited call.
- As of C++/WinRT 2.0, `winrt::resume_foreground` always suspends and queues, even from the dispatcher thread (analogous to `PostMessage` rather than `SendMessage`); the 1.0 implementation returned `m_dispatcher.HasThreadAccess()` from `await_ready` and could deadlock.
- In WinUI 3 / Windows App SDK apps use `DispatcherQueue` instead of `CoreDispatcher`. C++/WinRT's own `winrt::resume_foreground` / `co_await queue` is for `Windows::System::DispatcherQueue` only (cppwinrt `strings/base_coroutine_system.h`). For the WinUI 3 / Windows App SDK `Microsoft::UI::Dispatching::DispatcherQueue` (the return type of WinUI 3 `UIElement.DispatcherQueue()`), include `<wil/cppwinrt_helpers.h>` after `winrt/Microsoft.UI.Dispatching.h` and use `co_await wil::resume_foreground(textblock.DispatcherQueue());`. The official page mentions both types side by side, but the C++/WinRT awaiter does not cover Microsoft.UI.Dispatching. For a Win32 app, create a queue with the Win32 `CreateDispatcherQueueController` and take ownership with `take_ownership_from_abi`.
- The "Guaranteed to work" example assumes the dispatcher queue is still running. For the `Windows::System` version of `winrt::resume_foreground`, if the queue's controller may be shutting down (for example during window close), check the `co_await` result and touch UI objects only on the `true` branch — on `false`, execution stays on the calling (background) thread.
- Failure behavior differs: `winrt::resume_foreground` (Windows::System) returns `false` and continues on the calling thread when enqueue fails, whereas `wil::resume_foreground` throws `winrt::hresult_error` (`HRESULT_FROM_WIN32(ERROR_NO_TASK_QUEUE)`, 0x800701ab) while the queue is shutting down. In WinUI 3, catch the exception and avoid touching UI objects.
- Cancellation is checked implicitly only when a coroutine resumes or reaches another `co_await`; poll the token explicitly for finer-grained latency. Windows Runtime cancellation does not flow to nested async objects automatically; register a callback to propagate it.
- Reporting provisional results with `progress.set_result()` requires C++/WinRT version 2.0.210309.3 or later.
- An async action/operation supports only a single waiter: use either one `Completed` delegate or a `co_await` (not both), and do not combine `get()` and `wait_for()`; `wait_for` cannot be called in a loop. `wait_for` accepts `std::chrono::duration` but is limited to roughly 49.7 days.
- Pass a `winrt::handle` (not a raw `HANDLE`) by value into a coroutine that later calls `resume_on_signal`, so the handle stays valid across suspension points.
- `IAsyncOperation<Int32[]>` is invalid MIDL 3.0 (error MIDL2025); return the array boxed in a `PropertyValue` (`CreateInt32Array`) as `IAsyncOperation<IInspectable>` and unbox with `IPropertyValue::GetInt32Array`.
- The `no_switch` await-adapter in the source (resume on the completing thread, no context switch) is educational only; the docs recommend developing and testing your own adapter structs.
- The official page writes `std::literals::2s`, which is not valid C++; this page uses `using namespace std::chrono_literals;` and `2s` instead.
- The official page declares `uint32_t result;` without initializing or assigning it before `co_return result`, which reads an uninitialized value (undefined behavior); this page value-initializes it (`uint32_t result{};`) — assign the computed value inside the loop in real code.
- The official page writes `winrt::resume_foreground(textblock.DispatcherQueue())` in the UI-thread example; for WinUI 3 this page replaces it with `wil::resume_foreground(...)` (see the correction above). The example omits try/catch; see the shutdown behavior note above.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/concurrency-2 (en-us, fetched 2026-10-16)
- Source (Notes correction): https://github.com/microsoft/wil/blob/v1.0.260126.7/include/wil/cppwinrt_helpers.h and https://github.com/microsoft/cppwinrt/blob/3.0.260818.1/strings/base_coroutine_system.h

## Related

- [Concurrency: IAsyncAction / IAsyncOperation, co_await, resume_foreground, apartment_context, fire_and_forget](./async-coroutines.md)
- [A completion source sample](./completion-source.md)
- [Weak References](./weak-references.md)
- [Events and Delegates](./events-delegates.md)

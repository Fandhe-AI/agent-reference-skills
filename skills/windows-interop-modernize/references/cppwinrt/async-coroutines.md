# Concurrency: IAsyncAction / IAsyncOperation, co_await, resume_foreground, apartment_context, fire_and_forget

C++/WinRT integrates C++ coroutines with the four WinRT asynchronous operation types so you can `co_await` any "Async"-suffixed WinRT function, and author your own coroutines that return one of those types.

## Signature / Usage

```cppwinrt
IAsyncAction ProcessFeedAsync()
{
    Uri rssFeedUri{ L"https://blogs.windows.com/feed" };
    SyndicationClient syndicationClient;
    SyndicationFeed syndicationFeed{ co_await syndicationClient.RetrieveFeedAsync(rssFeedUri) };
    PrintFeed(syndicationFeed);
}
```

Switching to a background thread, then back to a specific UI thread:

```cppwinrt
IAsyncAction DoWorkAsync(TextBlock textblock)
{
    co_await winrt::resume_background();
    // Do compute-bound work here.

    co_await winrt::resume_foreground(textblock.DispatcherQueue());

    textblock.Text(L"Done!"); // Guaranteed to run on the UI thread.
}
```

Capturing the calling context and switching back to it with `apartment_context`:

```cppwinrt
IAsyncAction DoWorkAsync(TextBlock textblock)
{
    winrt::apartment_context ui_thread; // Capture calling context.
    co_await winrt::resume_background();
    // Do compute-bound work here.
    co_await ui_thread; // Switch back to calling context.
    textblock.Text(L"Done!");
}
```

Fire-and-forget for an event handler that needs to be async but returns no value:

```cppwinrt
winrt::fire_and_forget MyClass::MyMediaBinder_OnBinding(MediaBinder const&, MediaBindingEventArgs args)
{
    auto lifetime{ get_strong() }; // Prevent *this* from being destructed early.
    auto file{ co_await StorageFile::GetFileFromApplicationUriAsync(Uri(L"ms-appx:///video.mp4")) };
    args.SetStorageFile(file);
}
```

## Options / Props

| Type / function | Description |
|------|-------------|
| `IAsyncAction` | Async operation with no return value. |
| `IAsyncActionWithProgress<TProgress>` | Async action reporting progress of type `TProgress`. |
| `IAsyncOperation<TResult>` | Async operation returning `TResult`. |
| `IAsyncOperationWithProgress<TResult, TProgress>` | Async operation returning `TResult` with `TProgress` progress reports. |
| `winrt::resume_background()` | `co_await`-able; returns control to the caller then resumes on a Windows thread-pool thread. |
| `winrt::resume_foreground(dispatcherQueue, priority?)` | `co_await`-able; switches (always queues) to the given `DispatcherQueue`/`CoreDispatcher` thread. |
| `winrt::apartment_context` | Captures the current calling context; `co_await`-ing an instance switches back to it. |
| `winrt::fire_and_forget` | Coroutine return type for tasks you don't wait on and that return no value; unhandled exceptions call `winrt::terminate()` (fail-fast, preserving stowed-exception context). |
| `.get()` | Blocks the calling thread until an async object completes (never call from a UI thread). |
| `.Completed(handler)` / `.Progress(handler)` | Delegate-based alternative to `co_await` for completion/progress (mutually exclusive with `co_await`-ing the same object). |

## Notes

- Any WinRT API that may take more than ~50ms is implemented as an "Async" function returning one of the four `IAsyncXxx` types.
- If a coroutine doesn't `co_await`, it needs at least one `co_return` or `co_yield` to qualify as a coroutine.
- Coroutines should take parameters **by value**, not `const&` — after the first suspension point, a reference parameter's source may have gone out of scope; pass-by-value avoids that lifetime hazard.
- `co_await`-ing any of the four `IAsyncXxx` types restores you to the calling context (STA stays STA, MTA stays MTA) automatically; other awaitables (e.g. `std::chrono` durations) resume on the thread pool.
- `winrt::resume_foreground` always queues and unwinds the stack (as of C++/WinRT 2.0), analogous to `PostMessage` vs `SendMessage` — this avoids deadlocks that the earlier "only switch if not already there" behavior could cause.
- If you're returning a non-WinRT type asynchronously, return a PPL `concurrency::task<T>` (preferred over `std::future`) instead of one of the `IAsyncXxx` types, which require WinRT-compatible `T`.
- Cancel via `async.Cancel()`; inside the coroutine, poll `co_await winrt::get_cancellation_token()` or register a cancellation callback with `cancelation_token.callback(...)` to propagate to nested coroutines.
- Report progress via `co_await winrt::get_progress_token()`, then invoke the token with a progress value; set a provisional result with `progress.set_result(...)`.
- For safe `this` access inside a class-member coroutine across suspension points, see `weak-references.md`.

## Related

- [Events and Delegates](./events-delegates.md)
- [Weak References](./weak-references.md)
- [Error Handling](./error-handling.md)

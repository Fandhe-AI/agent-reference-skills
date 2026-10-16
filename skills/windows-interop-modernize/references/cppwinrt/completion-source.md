# A Completion Source Sample (completion_source)

Sample showing how to author and consume your own awaitable completion source class in C++/WinRT, similar to .NET's `TaskCompletionSource<T>`. Support for cancellation and error propagation is outside the scope of the sample.

## Signature / Usage

```cppwinrt
#include <winrt/base.h>
#include <windows.h>

template <typename T>
struct completion_source
{
    completion_source()
    {
        m_signal.attach(::CreateEvent(nullptr, true, false, nullptr));
    }

    void set(T const& value)
    {
        m_value = value;
        ::SetEvent(m_signal.get());
    }

    bool await_ready() const noexcept
    {
        return ::WaitForSingleObject(m_signal.get(), 0) == 0;
    }

    void await_suspend(std::experimental::coroutine_handle<> resume)
    {
        m_wait.attach(winrt::check_pointer(::CreateThreadpoolWait(callback, resume.address(), nullptr)));
        ::SetThreadpoolWait(m_wait.get(), m_signal.get(), nullptr);
    }

    T await_resume() const noexcept
    {
        return m_value;
    }

private:

    static void __stdcall callback(PTP_CALLBACK_INSTANCE, void* context, PTP_WAIT, TP_WAIT_RESULT) noexcept
    {
        std::experimental::coroutine_handle<>::from_address(context)();
    }

    struct wait_traits
    {
        using type = PTP_WAIT;

        static void close(type value) noexcept
        {
            ::CloseThreadpoolWait(value);
        }

        static constexpr type invalid() noexcept
        {
            return nullptr;
        }
    };

    winrt::handle m_signal;
    winrt::handle_type<wait_traits> m_wait;
    T m_value{};
};
```

Offloading completion to a separate coroutine:

```cppwinrt
fire_and_forget CompleteAfterFiveSecondsAsync(completion_source<bool>& completionSource)
{
    co_await 5s;
    completionSource.set(true);
}

IAsyncAction CompletionSourceExample1Async()
{
    completion_source<bool> completionSource;
    CompleteAfterFiveSecondsAsync(completionSource);
    co_await completionSource;
}
```

Encapsulated in a class, returning a value:

```cppwinrt
struct App
{
    completion_source<winrt::hstring> m_completionSource;

    IAsyncOperation<winrt::hstring> CompletionSourceExample2Async()
    {
        co_return co_await m_completionSource;
    }

    winrt::fire_and_forget CompleteAfterFiveSecondsAsync()
    {
        co_await 5s;
        m_completionSource.set(L"Hello, World!");
    }
};
```

## Options / Props

| Member | Description |
|------|-------------|
| `set(T const&)` | Stores the value and signals the event, which resumes the awaiting coroutine. |
| `await_ready()` | Returns true if the event is already signaled (`WaitForSingleObject(..., 0) == 0`). |
| `await_suspend(handle)` | Registers a thread pool wait (`CreateThreadpoolWait` / `SetThreadpoolWait`) that resumes the coroutine when signaled. |
| `await_resume()` | Returns the stored value. |

## Notes

- The sample is intended for illustration: it omits cancellation and error propagation.
- The docs note that a production-ready task completion source implementation is available in the `cpp-async` GitHub repo (`https://github.com/Microsoft/cpp-async`).
- The listing uses `std::experimental::coroutine_handle` as in the official sample.
- The examples are meant to be run in a Visual Studio project based on the Windows Console Application (C++/WinRT) template, with `completion_source` pasted into `main.cpp`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/concurrency-3 (en-us, fetched 2026-10-16)

## Related

- [Advanced Concurrency and Asynchrony with C++/WinRT](./advanced-concurrency.md)
- [Concurrency: IAsyncAction / IAsyncOperation, co_await, resume_foreground, apartment_context, fire_and_forget](./async-coroutines.md)

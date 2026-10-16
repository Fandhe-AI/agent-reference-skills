# Asynchrony, and Interop Between C++/WinRT and C++/CX

Techniques for gradually porting asynchronous C++/CX code (PPL `concurrency::task` chains, `create_async`) to C++/WinRT coroutines while both exist side by side. Picks up where interop-winrt-cx.md leaves off and uses its `from_cx` / `to_cx` helpers.

## Signature / Usage

Add `#include <pplawait.h>` to `pch.h` for coroutine support for PPL. Then:

```cppcx
#include <ppltasks.h>
#include <pplawait.h>
#include <winrt/Windows.Foundation.h>

concurrency::task<bool> TaskAsync()
{
    co_return true;
}

Windows::Foundation::IAsyncOperation<bool>^ IAsyncXxxCppCXAsync()
{
    // co_return true; // Error! Can't do that. But you can do
    // the following.
    return concurrency::create_async([=]() -> concurrency::task<bool> {
        co_return true;
        });
}

winrt::Windows::Foundation::IAsyncOperation<bool> IAsyncXxxCppWinRTAsync()
{
    co_return true;
}

concurrency::task<bool> CppCXAsync()
{
    bool b1 = co_await TaskAsync();
    bool b2 = co_await IAsyncXxxCppCXAsync();
    co_return co_await IAsyncXxxCppWinRTAsync();
}

winrt::fire_and_forget CppWinRTAsync()
{
    bool b1 = co_await TaskAsync();
    bool b2 = co_await IAsyncXxxCppCXAsync();
    bool b3 = co_await IAsyncXxxCppWinRTAsync();
}
```

Porting `concurrency::wait` to `winrt::resume_after`:

```cppcx
task<void> GameRenderer::CreateGameDeviceResourcesAsync(_In_ Simple3DGame^ game)
{
    std::vector<task<void>> tasks;
    ...
    tasks.push_back(create_task([]() -> task<void>
    {
        co_await winrt::resume_after(GameConstants::InitialLoadingDelay); // std::chrono::duration
    }));
    ...
}
```

## Options / Props

Interop support with `pplawait.h`:

| Method returns | Can you `co_await` it? | Can you `co_return` from it? |
|------|------|------|
| `task<void>` | Yes | Yes |
| `task<T>` | Yes (the official table prints "No", but the same page's prose says you can `co_await` both tasks and `IAsyncXxx` with `pplawait.h`, and its sample `co_await`s `TaskAsync()` returning `task<bool>`) | Yes |
| `IAsyncXxx^` | Yes | No. Wrap `create_async` around a task that uses `co_return`. |
| `winrt::IAsyncXxx` | Yes | Yes |

Techniques:

| Technique | Pattern |
|------|------|
| Await `task<void>` in a fire-and-forget method | Replace `create_task`/`.then` chains with flat `co_await` statements; change return type from `void` to `winrt::fire_and_forget`. A constructor can't return `fire_and_forget`, so move the async code into a new fire-and-forget method (for example `ConstructInBackground()`) and call it from the constructor. |
| Await `task<void>` in a `task<void>` method | `co_return co_await m_renderer->LoadLevelResourcesAsync();` |
| Await `IAsyncXxx^` in a `task` method | `co_await` Windows APIs returning `IAsyncXxx^` and `co_return` the value; the return type, and therefore the callers, stay unchanged. |
| Convert `winrt::IAsyncXxx<T>` (T primitive) to `task<T>` | `co_return co_await GetBoolMemberFunctionAsync();` (lambda return type must be explicit: `-> concurrency::task<bool>`). |
| Convert `winrt::IAsyncXxx<T>` (T a Windows Runtime type) to `task<T^>` | `co_return to_cx<Windows::Storage::StorageFile>(co_await ...);` or a reusable `to_task<ResultTypeCX>(awaitable)` template. |
| Wrap `create_async` around a task using `co_return` | `create_async([this]() -> concurrency::task<bool> { ... co_return result; })` |
| Port `task<void>` return type to `winrt::IAsyncXxx` | Possible once every caller uses `co_await`; change to `winrt::Windows::Foundation::IAsyncAction`. |

## Notes

- The official page's interop table lists `task<T>` as not `co_await`able, which contradicts the same page's prose and sample: with `pplawait.h` included, `concurrency::task<T>` can also be `co_await`ed.
- Gradual porting is not possible for a Windows Runtime component project (port in one pass). For a XAML project, page types must be either all C++/WinRT or all C++/CX at any given time.
- There is no one-to-one mapping from PPL tasks to coroutines; the recommended approach is to understand the original synchronous intent and insert `co_await` in the appropriate places. A C#-version of the code (which already uses `await`) can make the port cleaner.
- Do not build until you resolve ambiguity of `byte` (in the Simple3DGameDX case study: comment out `using namespace std;` in `BasicLoader.cpp` and qualify `std::shared_ptr`, `std::vector`, `std::string`).
- When a class-member coroutine introduces a suspension point, the `this` pointer needs protection: derive the class from `winrt::implements<GameMain, winrt::Windows::Foundation::IInspectable>`, construct it with `winrt::make_self<GameMain>(...)`, hold it in a `winrt::com_ptr<GameMain>`, and call `auto strong_this{ get_strong() };` at the start of the coroutine. `get_strong` is only available on classes deriving from `winrt::implements`.
- With C++/CX `IAsyncXxx^`, `TResult` is limited to Windows Runtime types (for example `bool` is allowed; `Platform::Array<byte>^` is not).
- Porting `GameConstants` delays requires changing the constant type to `std::chrono::duration` (for example `2000ms`) for `winrt::resume_after`.
- The walkthrough uses the C++/CX version of the Direct3D game sample `Simple3DGameDX`; after porting, call sites that used `ReadDataAsync(...).then(...)` become `auto textureBuffer = co_await m_basicReaderWriter.ReadDataAsync(filename);`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/interop-winrt-cx-async (en-us, fetched 2026-10-16)

## Related

- [Interop Between C++/WinRT and C++/CX](./interop-winrt-cx.md)
- [Move to C++/WinRT from C++/CX](./move-to-winrt-from-cx.md)
- [Concurrency: IAsyncAction / IAsyncOperation, co_await, resume_foreground, apartment_context, fire_and_forget](./async-coroutines.md)
- [Weak References](./weak-references.md)
- [Author APIs](./author-apis.md)

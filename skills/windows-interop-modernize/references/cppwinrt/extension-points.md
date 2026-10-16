# Extension Points for Your Implementation Types

Extension points of `winrt::implements` in C++/WinRT 2.0: deferred destruction via `final_release`, safe `QueryInterface` during destruction (reference count debouncing), and method entry/exit hooks (`abi_enter`, `abi_exit`, `abi_guard`).

## Signature / Usage

Deferred destruction with a coroutine `final_release`:

```cppwinrt
struct Sample : implements<Sample, IStringable>
{
    winrt::hstring ToString() const;
 
    static winrt::fire_and_forget final_release(std::unique_ptr<Sample> ptr) noexcept
    {
        co_await winrt::resume_background(); // Unwind the calling thread.
 
        // Safely perform complex teardown here.
    }
};
```

Method entry and exit hooks:

```cppwinrt
struct Sample : SampleT<Sample, IClosable>
{
    void abi_enter();
    void abi_exit();

    void Close();
};

void example1()
{
    auto sampleObj1{ winrt::make<Sample>() };
    sampleObj1.Close(); // Calls abi_enter and abi_exit.
}

void example2()
{
    auto sampleObj2{ winrt::make_self<Sample>() };
    sampleObj2->Close(); // Doesn't call abi_enter nor abi_exit.
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `static void final_release(std::unique_ptr<T> ptr) noexcept` | Called when the reference count transitions to 0; the `unique_ptr` owns the object, which is destroyed when it is reset/goes out of scope. May be a coroutine (return `winrt::fire_and_forget`) to switch threads. |
| `abi_enter()` | Called at entry to every projected interface method (not counting `IInspectable` methods). |
| `abi_exit()` | Called at exit from every such method; not called if `abi_enter` throws, but is called if the method itself throws. |
| `abi_guard` (nested type) | If defined, an instance is constructed on entry (with a reference to the object) and destroyed on exit; the default guard calls `abi_enter` / `abi_exit`. |

## Notes

- Requires a public destructor (see diag-direct-alloc.md), which is what enables deferred destruction.
- The object passed to `final_release` is merely a C++ object, no longer a COM object: existing COM weak references to it no longer resolve.
- Reference count debouncing: before calling `final_release`, C++/WinRT 2.0 sets `m_references = 1`, so bounded `QueryInterface` / `Release` pairs (for example calling `DataContext(nullptr)` in a XAML page destructor, which needs `IFrameworkElement`) are safe. Calling code paths that prolong the object's life is still your responsibility to avoid.
- `abi_guard` applies only when a method is invoked via the projected interface; calling methods directly on the implementation object bypasses the guards. For a coroutine method, the guard is active only until the `IAsyncXxx` is returned, not until the coroutine completes.
- The C++/WinRT iterator classes use `abi_enter` to throw an invalid state exception if the underlying collection has changed.
- UI frameworks often require destruction on the creating UI thread; a coroutine `final_release` that resumes on `ptr->DispatcherQueue()` makes that straightforward.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/details-about-destructors (en-us, fetched 2026-10-16)

## Related

- [Diagnosing Direct Allocations](./diag-direct-alloc.md)
- [Author APIs](./author-apis.md)
- [Weak References](./weak-references.md)
- [Advanced Concurrency and Asynchrony with C++/WinRT](./advanced-concurrency.md)

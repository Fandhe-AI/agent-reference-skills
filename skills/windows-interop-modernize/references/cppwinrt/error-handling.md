# Error Handling: hresult_error, check_hresult, throw_last_error

C++/WinRT converts error HRESULTs arising at the ABI layer into `winrt::hresult_error` exceptions on the consuming side, and provides `check_*`/`throw_*` helpers for producing them yourself.

## Signature / Usage

```cppwinrt
IAsyncAction MakeThumbnailsAsync()
{
    auto imageFiles{ co_await KnownFolders::PicturesLibrary().GetFilesAsync() };
    for (StorageFile const& imageFile : imageFiles)
    {
        try
        {
            auto thumbnail{ co_await imageFile.GetThumbnailAsync(FileProperties::ThumbnailMode::PicturesView) };
        }
        catch (winrt::hresult_error const& ex)
        {
            winrt::hresult hr = ex.code();      // e.g. HRESULT_FROM_WIN32(ERROR_FILE_NOT_FOUND)
            winrt::hstring message = ex.message();
        }
    }
}
```

Throwing on a Win32-style failure:

```cppwinrt
winrt::handle h{ ::CreateEvent(nullptr, false, false, nullptr) };
winrt::check_bool(bool{ h });          // -> throw_last_error() -> throw_hresult() on failure
winrt::check_bool(::SetEvent(h.get()));
```

Converting exceptions back to an HRESULT at an ABI boundary:

```cppwinrt
HRESULT DoWork() noexcept
{
    try
    {
        // ... call into implementation ...
        return S_OK;
    }
    catch (...)
    {
        return winrt::to_hresult();
    }
}
```

## Options / Props

| Function | Description |
|------|-------------|
| `winrt::hresult_error` | Base exception type thrown for a failing HRESULT; `.code()` returns the `hresult`, `.message()` the system message string, `.to_abi()` converts back to a COM error object. |
| `winrt::check_hresult(hr)` | Throws via `throw_hresult` if `hr` represents an error. |
| `winrt::check_bool(v)` | Calls `throw_last_error()` if `v` is falsy. |
| `winrt::check_pointer(p)` | Calls `throw_last_error()` if `p` is null. |
| `winrt::check_win32(code)` / `check_nt(code)` | Throws via `throw_hresult` for Win32/NT error codes. |
| `winrt::throw_last_error()` | Calls `GetLastError()`, then `throw_hresult`. |
| `winrt::throw_hresult(hr)` | Throws a `winrt::hresult_error` (or standard exception) for `hr`. |
| `winrt::to_hresult()` | Inside a `catch (...)`, converts the in-flight exception (`hresult_error`-derived or `std::exception`-derived) to an HRESULT; used at `noexcept` ABI boundaries. |

## Notes

- Prefer avoiding exceptions for *expected* failures (handle them with `bool`/`enum` return values close to the source); reserve thrown exceptions for genuinely unexpected runtime errors.
- All WinRT ABI boundaries must be `noexcept` — mark them explicitly. An exception hitting a `noexcept` boundary calls `std::terminate`, which can lose stowed-exception context, especially with coroutines.
- For a `noexcept` ABI method that `co_await`s C++/WinRT projection code, wrap the async work in a `winrt::fire_and_forget` lambda so unhandled exceptions are recorded as a stowed exception via `winrt::terminate()` (calls `RoFailFastWithErrorContext`) rather than losing context to a bare `std::terminate`.
- For purely synchronous `noexcept` ABI methods, use `try { ... } catch (...) { winrt::terminate(); }` — still fails fast, but preserves debuggability.
- Use `WINRT_ASSERT` (expands to `_ASSERTE`) for run-time assumption checks; it's compiled away in release builds. Use `WINRT_VERIFY`/`WINRT_VERIFY_` in destructors, where exceptions must not be thrown.

## Related

- [Interop with the ABI](./interop-abi.md)
- [Concurrency and Coroutines](./async-coroutines.md)
- [String Handling](./strings.md)

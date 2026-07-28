# winrt::init_apartment / winrt::uninit_apartment

Initializes (and later uninitializes) the calling thread for use with the Windows Runtime and COM.

## Signature / Usage

```cppwinrt
#include <winrt/base.h>

int main()
{
    winrt::init_apartment(); // Defaults to a multithreaded apartment (MTA).

    // ... use WinRT APIs ...

    winrt::uninit_apartment(); // Optional; matches init_apartment for symmetry.
}
```

To initialize a single-threaded apartment (STA) — required for UI threads that use XAML/CoreWindow — pass `winrt::apartment_type::single_threaded`:

```cppwinrt
winrt::init_apartment(winrt::apartment_type::single_threaded);
```

## Notes

- `winrt::init_apartment` must be called once on a thread before any Windows Runtime API is used from that thread; it wraps `CoInitializeEx`.
- By default it initializes a multithreaded apartment (MTA). Windows Console Application (C++/WinRT) and Windows Runtime Component templates call it this way by default.
- UWP/WinUI 3 XAML application templates handle apartment initialization for you via `Application::Start`; you typically only call `winrt::init_apartment()` explicitly in console apps, desktop (Win32) apps, and Windows Runtime components.
- `winrt::uninit_apartment` is the counterpart that uninitializes the apartment; it's optional in short-lived console apps since process exit cleans up, but should be used symmetrically in library/DLL code.

## Related

- [Get Started](./get-started.md)
- [Overview](./overview.md)

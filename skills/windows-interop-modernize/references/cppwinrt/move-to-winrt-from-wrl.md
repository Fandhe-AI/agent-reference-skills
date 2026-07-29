# Move to C++/WinRT from WRL

A porting catalog for replacing Windows Runtime C++ Template Library (WRL) constructs — `Microsoft::WRL::ComPtr`, `Microsoft::WRL::Module`, and the `Microsoft::WRL::Wrappers` helpers — with their C++/WinRT equivalents. The WRL counterpart to move-to-winrt-from-cx.md (which covers C++/CX).

## Signature / Usage

Replacing `Microsoft::WRL::ComPtr<T>` with `winrt::com_ptr<T>`:

```cpp
// WRL
ComPtr<IDXGIAdapter1> previousDefaultAdapter;
DX::ThrowIfFailed(m_dxgiFactory->EnumAdapters1(0, &previousDefaultAdapter));
```

```cppwinrt
// C++/WinRT
winrt::com_ptr<IDXGIAdapter1> previousDefaultAdapter;
winrt::check_hresult(m_dxgiFactory->EnumAdapters1(0, previousDefaultAdapter.put()));
```

Re-seating an already-seated `com_ptr` requires clearing it first:

```cppwinrt
winrt::com_ptr<IDXGISwapChain1> m_pDXGISwapChain1;
// ... on each resize:
m_pDXGISwapChain1 = nullptr; // Required before re-seating; put()/put_void() assert if already seated.
winrt::check_hresult(m_pDxgiFactory->CreateSwapChainForHwnd(
    m_pCommandQueue.get(), m_hWnd, &swapChainDesc, nullptr, nullptr, m_pDXGISwapChain1.put()));
```

## Options / Props

| WRL | C++/WinRT | Notes |
|------|-------------|------|
| `Microsoft::WRL::ComPtr<T>` | `winrt::com_ptr<T>` | `ComPtr::Get()` → `com_ptr::get()`; `&ptr` (output param) → `ptr.put()`; `IID_PPV_ARGS(&ptr)` → `ptr.put_void()` with `__uuidof(ptr)`. |
| Passing raw pointer as `IUnknown*` | `winrt::get_unknown(obj)` | Free function replacing `reinterpret_cast<IUnknown*>(...)`. |
| `Microsoft::WRL::Module<InProc>::GetModule().GetActivationFactory(...)` | `WINRT_GetActivationFactory(...)` | Generated in `module.g.cpp` for a new **Windows Runtime Component (C++/WinRT)** project; conditionally falls back to the WRL module so WRL and C++/WinRT classes coexist during a gradual port. |
| `Module<InProc>::GetModule().Terminate()` | `WINRT_CanUnloadNow()` | Same coexistence pattern for `DllCanUnloadNow`. |
| `Microsoft::WRL::Wrappers::CriticalSection` / `Mutex` / `Semaphore` / `SRWLock` | C++ Standard `<thread>` support library | No 1:1 mapping recommended; choice depends on the specific synchronization need. |
| `Microsoft::WRL::Wrappers::Event` | `winrt::event<T>` | |
| `Microsoft::WRL::Wrappers::HandleT` | `winrt::handle` or `winrt::file_handle` | |
| `Microsoft::WRL::Wrappers::HString` | `winrt::hstring` | |
| `Microsoft::WRL::Wrappers::HStringReference` | *(none needed)* | C++/WinRT handles the equivalent optimization internally. |
| `Microsoft::WRL::Wrappers::RoInitializeWrapper` | `winrt::init_apartment` / `winrt::uninit_apartment` | |

## Notes

- The first porting step is installing the `Microsoft.Windows.CppWinRT` NuGet package, which also disables C++/CX support in the project — turn it back on (`/ZW`) only if the project also has C++/CX code you're not porting yet.
- Set **Target Platform Version** to 10.0.17134.0 (Windows 10 version 1803) or later before adding C++/WinRT support.
- WRL and C++/WinRT code can coexist in the same binary during a gradual port — the `WINRT_GetActivationFactory`/`WINRT_CanUnloadNow` pattern is the standard bridge for that.

## Related

- [Move to C++/WinRT from C++/CX](./move-to-winrt-from-cx.md)
- [winrt::com_ptr and IInspectable](./com-ptr-iinspectable.md)
- [Interop with the ABI](./interop-abi.md)

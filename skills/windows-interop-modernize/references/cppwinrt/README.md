# C++/WinRT

| Name | Description | Path |
|------|-------------|------|
| Overview | C++/WinRT overview and its relationship to C++/CX and WRL | [overview.md](./overview.md) |
| Get Started | Quick-start console app and adding C++/WinRT to a Desktop project | [get-started.md](./get-started.md) |
| winrt::init_apartment / uninit_apartment | Thread/apartment initialization for WinRT and COM | [init-apartment.md](./init-apartment.md) |
| Projection Headers (winrt/*.h) | winrt namespace headers, projected types, cppwinrt.exe generation | [projection-headers.md](./projection-headers.md) |
| String Handling | winrt::hstring, to_hstring, to_string, c_str | [strings.md](./strings.md) |
| winrt::com_ptr and IInspectable | Smart pointer for implementation types; base WinRT object interface | [com-ptr-iinspectable.md](./com-ptr-iinspectable.md) |
| Consume APIs | Consuming runtime classes: Windows, third-party, and in-project | [consume-apis.md](./consume-apis.md) |
| Author APIs and IDL | Authoring runtime classes with IDL, midl.exe/cppwinrt.exe, winrt::implements | [author-apis.md](./author-apis.md) |
| Concurrency and Coroutines | IAsyncAction/IAsyncOperation, co_await, resume_foreground, apartment_context, fire_and_forget | [async-coroutines.md](./async-coroutines.md) |
| Events and Delegates | event_token, auto_revoke, winrt::event, revoking handlers | [events-delegates.md](./events-delegates.md) |
| Weak References | get_weak / get_strong, winrt::weak_ref, safe this-pointer access | [weak-references.md](./weak-references.md) |
| Error Handling | winrt::hresult_error, check_hresult, throw_last_error, to_hresult | [error-handling.md](./error-handling.md) |
| Interop with the ABI | Converting between ABI types and C++/WinRT projected types | [interop-abi.md](./interop-abi.md) |
| Native Interop | ISwapChainPanelNative, IWindowNative | [native-interop.md](./native-interop.md) |
| XAML x:Bind | Observable properties, INotifyPropertyChanged, x:Bind with runtime classes | [xaml-binding.md](./xaml-binding.md) |
| Move to C++/WinRT from C++/CX | C++/CX vs C++/WinRT differences and porting catalog | [move-to-winrt-from-cx.md](./move-to-winrt-from-cx.md) |

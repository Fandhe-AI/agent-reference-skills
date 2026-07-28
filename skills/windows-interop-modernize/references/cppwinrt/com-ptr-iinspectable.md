# winrt::com_ptr and winrt::Windows::Foundation::IInspectable

`winrt::com_ptr<T>` is a smart pointer that wraps an implementation type (or an ABI COM interface) and manages its reference count. `IInspectable` is the C++/WinRT projection of the base WinRT interface that all runtime classes derive from (analogous to `IUnknown` for classic COM, but WinRT-aware).

## Signature / Usage

```cppwinrt
// Obtain a com_ptr to your own implementation type via make_self.
winrt::com_ptr<MyType> myimpl = winrt::make_self<MyType>();
myimpl->ToString();
myimpl->Close();
IClosable iclosable = myimpl.as<IClosable>();

// IInspectable as a generic "any WinRT object" parameter/sender type.
void ClickHandler(
    winrt::Windows::Foundation::IInspectable const& sender,
    winrt::Microsoft::UI::Xaml::RoutedEventArgs const& args);

// Delayed initialization: IInspectable initialized to null.
winrt::Windows::Foundation::IInspectable var{ nullptr };
```

## Options / Props

| Member | Description |
|------|-------------|
| `com_ptr<T>::as<U>()` | Queries for interface `U` (like `QueryInterface`), returns a `com_ptr<U>`. |
| `com_ptr<T>::get()` / `put()` | Raw pointer access / output-parameter pointer for receiving a new value. |
| `com_ptr<T>::copy_from(T*)` | Copies a raw pointer into the `com_ptr`, calling `AddRef`. |
| `winrt::make_self<T>()` | Creates a `com_ptr<T>` wrapping a new instance of implementation type `T`; gives direct (non-virtual) access to `T`'s members. |
| `winrt::get_self<T>(iface)` | Recovers a raw pointer to implementation type `T` from a projected interface you know is backed by `T`. |

## Notes

- Use `com_ptr` with the **implementation type**, not the projected type — passing the projected type to `com_ptr<T>` or `make_self<T>` produces compiler errors like `'Release' is not a member of 'T'`.
- `IInspectable` is commonly used as the catch-all sender/argument type for event handlers and as the parameter type for `winrt::box_value`/`winrt::unbox_value` boxing.
- A projected type (e.g. `winrt::Windows::Foundation::Uri`) is itself a proxy — essentially a smart pointer to a backing WinRT object; you typically don't need `com_ptr` when only consuming projected types, only when working with your own implementation types or interop with the ABI.

## Related

- [Consume APIs](./consume-apis.md)
- [Author APIs and IDL](./author-apis.md)
- [Interop with the ABI](./interop-abi.md)

# Boxing and Unboxing Values to IInspectable

Wraps a scalar or array value inside a reference-class object so it can be passed to an API that expects `IInspectable` (the root interface of every WinRT runtime class), and unwraps it back out.

## Signature / Usage

```cppwinrt
// Box a scalar (hstring) into IInspectable.
Button().Content(winrt::box_value(L"Clicked"));

// Unbox back out.
void Unbox(winrt::Windows::Foundation::IInspectable const& object)
{
    hstring hstringValue = winrt::unbox_value<hstring>(object);                   // Throws if not a boxed hstring.
    hstringValue = winrt::unbox_value_or<hstring>(object, L"Default");            // Returns "Default" instead of throwing.
    float floatValue = winrt::unbox_value_or<float>(object, 0.f);
    std::optional<int> optionalInt = object.try_as<int>();                        // std::nullopt if not a boxed int.
}
```

Determine the runtime type of a boxed value before unboxing it:

```cppwinrt
auto piInspectable = winrt::box_value(3.14f);
auto piPropertyValue = piInspectable.as<winrt::Windows::Foundation::IPropertyValue>();
WINRT_ASSERT(piPropertyValue.Type() == winrt::Windows::Foundation::PropertyType::Single);
```

## Options / Props

| Function | Description |
|------|-------------|
| `winrt::box_value(value)` | Boxes a scalar or array value (or an IDL-defined `struct`) into an `IInspectable`. |
| `winrt::unbox_value<T>(inspectable)` | Unboxes back to scalar or array type `T`; throws if `inspectable` isn't a boxed `T`. |
| `winrt::unbox_value_or<T>(inspectable, default)` | Unboxes a scalar to `T`, returning `default` instead of throwing on mismatch. |
| `IInspectable::try_as<T>()` | Alternative unboxing path returning `std::optional<T>` (`std::nullopt` on mismatch). |
| `IPropertyValue::Type()` | Returns the `PropertyType` enum value describing what's boxed inside — query this via `.as<IPropertyValue>()` when the boxed type is unknown. |

## Notes

- You can box/unbox any Windows Runtime type — scalars, most array types (arrays of enums are the exception), and `struct`s declared in IDL. A plain (non-IDL) C++ `struct` cannot be boxed; the compiler rejects it.
- Runtime classes don't need boxing — they can be passed to an `IInspectable`-typed parameter directly, since every runtime class already derives from `IInspectable`.
- `unbox_value` throws on a type mismatch; prefer `unbox_value_or` or `try_as` when the boxed type isn't guaranteed.

## Related

- [winrt::com_ptr and IInspectable](./com-ptr-iinspectable.md)
- [Collections with C++/WinRT](./collections.md)

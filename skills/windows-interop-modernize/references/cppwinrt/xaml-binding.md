# XAML controls: x:Bind with C++/WinRT

Shows how to implement an *observable* property (raises `INotifyPropertyChanged::PropertyChanged`) on a C++/WinRT runtime class, and bind XAML controls to it with `{x:Bind}`.

## Signature / Usage

```idl
// BookSku.idl
namespace Bookstore
{
    runtimeclass BookSku : Microsoft.UI.Xaml.Data.INotifyPropertyChanged
    {
        BookSku(String title);
        String Title;
    }
}
```

```cppwinrt
// BookSku.h
namespace winrt::Bookstore::implementation
{
    struct BookSku : BookSkuT<BookSku>
    {
        BookSku() = delete;
        BookSku(winrt::hstring const& title);

        winrt::hstring Title();
        void Title(winrt::hstring const& value);
        winrt::event_token PropertyChanged(Microsoft::UI::Xaml::Data::PropertyChangedEventHandler const& value);
        void PropertyChanged(winrt::event_token const& token);

    private:
        winrt::hstring m_title;
        winrt::event<Microsoft::UI::Xaml::Data::PropertyChangedEventHandler> m_propertyChanged;
    };
}

// BookSku.cpp
void BookSku::Title(winrt::hstring const& value)
{
    if (m_title != value)
    {
        m_title = value;
        m_propertyChanged(*this, Microsoft::UI::Xaml::Data::PropertyChangedEventArgs{ L"Title" });
    }
}
```

```xaml
<Button Click="ClickHandler" Content="{x:Bind MainViewModel.BookSku.Title, Mode=OneWay}"/>
```

## Options / Props

| Concept | Description |
|------|-------------|
| `INotifyPropertyChanged::PropertyChanged` | The event a runtime class raises to mark a property as *observable*; `{x:Bind}` re-queries the property when it fires. |
| `{x:Bind}` | Compile-time XAML binding extension; requires all bound members (properties, methods, named elements) to be declared **publicly in IDL**. |
| `{Binding}` | Runtime XAML binding extension; requires implementing `ICustomPropertyProvider`/`ICustomProperty` to work with C++/WinRT. |
| `Mode=OneWay` | Required on an `{x:Bind}` expression for the UI to update in response to `PropertyChanged`; omitting it makes the binding one-time only. |

## Notes

- Any type or member referenced from XAML markup — including named elements referenced by other markup (`{x:Bind myTextBox.Text}`) — must be a runtime class member declared in `.idl`, even though it's authored and consumed in the same project.
- A runtime class that derives from a base class ("composable class") must ultimately root in a `Windows.*`/`Microsoft.*` type to pass Windows App Certification Kit checks; view models with no base type (like `BookSku` above) don't need to derive from anything.
- Binding a `{Binding}` (not `{x:Bind}`) expression to a `bool` displays `Windows.Foundation.IReference`1<Boolean>` rather than `true`/`false` in C++/WinRT — use `{x:Bind}` for boolean bindings instead.
- Building after adding/editing an `.idl` file regenerates stub files under `Generated Files\sources\`; copy the relevant accessor stubs into your own `.h`/`.cpp` and implement them (or use uniform construction — see `author-apis.md`).

## Related

- [Author APIs and IDL](./author-apis.md)
- [Events and Delegates](./events-delegates.md)

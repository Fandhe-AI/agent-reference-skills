# XAML Items Controls; Bind to a C++/WinRT Collection

Implementing an observable collection (`IObservableVector<T>`) with `winrt::single_threaded_observable_vector` and binding a XAML items control (`ListBox`) to it.

## Signature / Usage

IDL:

```idl
// BookstoreViewModel.idl
...
runtimeclass BookstoreViewModel
{
    BookSku BookSku{ get; };
    Windows.Foundation.Collections.IObservableVector<BookSku> BookSkus{ get; };
}
...
```

Implementation:

```cppwinrt
// BookstoreViewModel.cpp
...
BookstoreViewModel::BookstoreViewModel()
{
    m_bookSku = winrt::make<Bookstore::implementation::BookSku>(L"Atticus");
    m_bookSkus = winrt::single_threaded_observable_vector<Bookstore::BookSku>();
    m_bookSkus.Append(m_bookSku);
}

Windows::Foundation::Collections::IObservableVector<Bookstore::BookSku> BookstoreViewModel::BookSkus()
{
    return m_bookSkus;
}
...
```

XAML binding, and appending from a handler:

```xaml
<ListBox ItemsSource="{x:Bind MainViewModel.BookSkus}">
    <ItemsControl.ItemTemplate>
        <DataTemplate x:DataType="local:BookSku">
            <TextBlock Text="{x:Bind Title, Mode=OneWay}"/>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ListBox>
```

```cppwinrt
// MainPage.cpp
void MainPage::ClickHandler(IInspectable const&, RoutedEventArgs const&)
{
    MainViewModel().BookSku().Title(L"To Kill a Mockingbird");
    MainViewModel().BookSkus().Append(winrt::make<Bookstore::implementation::BookSku>(L"Moby Dick"));
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IObservableVector<T>::VectorChanged` | event | Raised when an element is added or removed; makes the collection observable to a XAML items control. |
| `winrt::single_threaded_observable_vector<T>()` | factory function template | Creates an observable collection to back the view-model property. |
| `ItemsControl.ItemsSource` | property | Must be set to an `IObservableVector`, `IVector`, or interop type such as `IBindableObservableVector`. |

## Notes

- If `ItemsSource` is set to a value of the wrong type, `{x:Bind}` generates `E_INVALIDARG` and `{Binding}` fails silently.
- The code applies to C++/WinRT version 2.0.190530.8 or later. In earlier versions, declare `BookSkus` as `IObservableVector<IInspectable>` in the IDL and use `IInspectable` instead of `BookSku` in the implementation.
- The topic assumes the project from "XAML controls; bind to a C++/WinRT property" and extends it.
- `Append` raises an event that causes the `ListBox` to re-query the collection and update its `Items`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/binding-collection (en-us, fetched 2026-10-16)

## Related

- [XAML Binding](./xaml-binding.md)
- [Collections](./collections.md)
- [Author APIs](./author-apis.md)
- [Consume APIs](./consume-apis.md)

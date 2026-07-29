# .NET Mappings of WinRT Types

C#/WinRT maps certain WinRT types to .NET equivalents in desktop apps that target .NET 6+. Visual Studio IntelliSense shows the .NET type instead of the WinRT type. When authoring a WinRT component with C#/WinRT, you write the .NET type in member signatures and C#/WinRT translates it to the corresponding WinRT type when generating the component.

## Signature / Usage

```csharp
// WinRT signature: IVector<string> Items { get; }
// C# IntelliSense / authoring surface shows the .NET-mapped type:
IList<string> Items { get; }
```

## Options / Props

### Windows SDK mappings — different name and/or namespace

| WinRT type/namespace | .NET type/namespace |
| --- | --- |
| `DateTime` (Windows.Foundation) | `DateTimeOffset` (System) |
| `EventHandler<T>` (Windows.Foundation) | `EventHandler<T>` (System) |
| `HResult` (Windows.Foundation) | `Exception` (System) |
| `IClosable` (Windows.Foundation) | `IDisposable` (System) |
| `IReference<T>` (Windows.Foundation) | `Nullable<T>` (System) |
| `TimeSpan` (Windows.Foundation) | `TimeSpan` (System) |
| `Uri` (Windows.Foundation) | `Uri` (System) |
| `IIterable<T>` (Windows.Foundation.Collections) | `IEnumerable<T>` (System.Collections.Generic) |
| `IMap<K,V>` (Windows.Foundation.Collections) | `IDictionary<TKey,TValue>` (System.Collections.Generic) |
| `IMapView<K,V>` (Windows.Foundation.Collections) | `IReadOnlyDictionary<TKey,TValue>` (System.Collections.Generic) |
| `IVector<T>` (Windows.Foundation.Collections) | `IList<T>` (System.Collections.Generic) |
| `IVectorView<T>` (Windows.Foundation.Collections) | `IReadOnlyList<T>` (System.Collections.Generic) |
| `Matrix3x2`/`Matrix4x4`/`Plane`/`Quaternion`/`Vector2`/`Vector3`/`Vector4` (Windows.Foundation.Numerics) | Same names (System.Numerics) |
| `TypeName` (Windows.UI.Xaml.Interop) | `Type` (System) |

### Windows SDK mappings — same name and namespace

`IPropertyValue`, `IReferenceArray<T>`, `Point`, `Rect`, `Size` stay in `Windows.Foundation`; `Color` stays in `Windows.UI`. These are structures whose .NET version exposes helper-type functionality (methods/properties) that WinRT hides behind separate helper types.

### WinUI mappings — different name and/or namespace

| WinRT type/namespace | .NET type/namespace |
| --- | --- |
| `INotifyCollectionChanged`/`NotifyCollectionChangedEventHandler`/`NotifyCollectionChangedEventArgs` (Microsoft.UI.Xaml.Data) | Same names (System.Collections.Specialized) |
| `INotifyPropertyChanged`/`PropertyChangedEventHandler`/`PropertyChangedEventArgs` (Microsoft.UI.Xaml.Data) | Same names (System.ComponentModel) |
| `ICommand` (Microsoft.UI.Xaml.Input) | `ICommand` (System.Windows.Input) |
| `IXamlServiceProvider` (Microsoft.UI.Xaml) | `IServiceProvider` (System) |

### WinUI mappings — same name and namespace

`CornerRadius`, `Duration`, `DurationType`, `GridLength`, `GridUnitType`, `Thickness` (Microsoft.UI.Xaml); `GeneratorPosition` (Microsoft.UI.Xaml.Controls.Primitives); `Matrix` (Microsoft.UI.Xaml.Media); `KeyTime`, `RepeatBehavior`, `RepeatBehaviorType` (Microsoft.UI.Xaml.Media.Animation).

## Notes

- These mappings apply to desktop apps targeting .NET 6+ via a TFM (see [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md)); UWP apps have a separate, older ".NET mappings of Windows Runtime types" table.
- `IAsyncAction` / `IAsyncOperation<T>` are not listed here — they remain WinRT types but are directly awaitable; see [Calling Asynchronous WinRT APIs from .NET](./async-operations.md).

## Related

- [C#/WinRT Overview](./overview.md)
- [Calling Asynchronous WinRT APIs from .NET](./async-operations.md)

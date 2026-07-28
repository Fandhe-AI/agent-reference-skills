# Author APIs with C++/WinRT (IDL and cppwinrt.exe)

Shows how to implement WinRT interfaces or full runtime classes using the `winrt::implements` base struct, either directly (local-only interfaces) or via IDL-generated stubs (runtime classes for components/XAML).

## Signature / Usage

```idl
// MyRuntimeClass.idl
namespace MyProject
{
    runtimeclass MyRuntimeClass
    {
        // Declaring a constructor makes the class activatable from outside the compilation unit.
        MyRuntimeClass();
        String Name;
    }
}
```

Building the project runs `midl.exe` (IDL → `.winmd`) then `cppwinrt.exe` (`.winmd` → C++ implementation stubs) into `Generated Files\sources\MyRuntimeClass.h`/`.cpp`:

```cppwinrt
// MyRuntimeClass.h
namespace winrt::MyProject::implementation
{
    struct MyRuntimeClass : MyRuntimeClassT<MyRuntimeClass>
    {
        MyRuntimeClass() = default;

        winrt::hstring Name();
        void Name(winrt::hstring const& value);
    };
}
```

Not authoring a full runtime class — implement a WinRT interface locally by deriving from `winrt::implements`:

```cppwinrt
struct MyType : implements<MyType, IStringable>
{
    hstring ToString()
    {
        return L"MyType";
    }
};
```

## Options / Props

| Namespace / helper | Description |
|------|-------------|
| `winrt::MyProject` | Projected types — proxies (smart pointers) to backing objects. |
| `winrt::MyProject::implementation` | Implementation types — full C++ stack objects; never construct directly, use `winrt::make<T>()`. |
| `winrt::MyProject::factory_implementation` | Activation factories, support `IActivationFactory`. |
| `winrt::make<T>()` | Constructs implementation type `T`, returns its default interface (or the projected type, if implementation and consumption share a compilation unit). |
| `winrt::make_self<T>()` | Constructs `T`, returns a `com_ptr<T>` for direct (non-virtual) implementation access. |
| `unsealed` (IDL keyword) | Marks a runtime class as composable (derivable from). |
| `-opt[imize]` (`cppwinrt.exe` switch) | Enables *uniform construction*: direct calls into the implementation instead of through the activation factory, avoiding `RoGetActivationFactory` overhead and DLL pinning. |

## Notes

- `midl.exe` + `cppwinrt.exe` together generate a `.winmd` (metadata) plus implementation and projection stubs from your `.idl` file — this is the standard authoring workflow for both Windows Runtime Components and in-project XAML-bound runtime classes.
- Never write `MyRuntimeClass myRuntimeClass;` inside implementation code intending to return a projected type — that allocates the **implementation type** on the stack; the returned smart pointer becomes dangling once the stack frame unwinds. Use `winrt::make<T>()` instead.
- Runtime class derivation ("composable classes") requires the base to be declared `unsealed` in IDL; call base methods via the injected `base_type::` alias, not `as`/`try_as` on the composed class.
- ABI boundaries must be `noexcept`; catch all exceptions at the boundary and convert with `winrt::to_hresult()`.
- Consolidating all runtime classes into a single `.idl` file can significantly improve build time versus one IDL file per class (the Visual Studio template default).

## Related

- [Consume APIs](./consume-apis.md)
- [Error Handling](./error-handling.md)
- [Events and Delegates](./events-delegates.md)
- [Weak References](./weak-references.md)
- [XAML x:Bind](./xaml-binding.md)

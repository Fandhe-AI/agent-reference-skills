# Troubleshooting C++/WinRT Issues

Table of symptoms and remedies for common C++/WinRT compile, link, build, and runtime problems, plus guidance for tracking down XAML parse exceptions.

## Signature / Usage

Frequent fix for range-based `for` on a Windows Runtime collection (C++/WinRT 2.0), which otherwise produces a `LNK2019` mentioning `winrt::impl::consume_Windows_Foundation_Collections_IVector`:

```cppwinrt
#include <winrt/Windows.Foundation.Collections.h>
```

Frequent fix for `make` with an `= delete` default constructor: edit the implementation type's header and change `= delete` to `= default` (or add a constructor to the runtime class in the IDL).

## Options / Props

| Symptom | Remedy |
|------|-------------|
| Runtime exception HRESULT `REGDB_E_CLASSNOTREGISTERED` | See the FAQ entry "Why am I getting a 'class not registered' exception?". |
| Compiler: `'implements_type': is not a member of any direct or indirect base class of '<projected type>'` | `make` was called with the unqualified implementation name without including its header; include the implementation type's header (for example `MyRuntimeClass.h`). |
| Compiler: `attempting to reference a deleted function` | `make` with an implementation type whose default constructor is `= delete`; change to `= default`, or add a constructor in the IDL. |
| `INotifyPropertyChanged` implemented but XAML bindings don't update | Set `Mode=OneWay` (or `TwoWay`) on the binding expression. |
| Observable collection bound to an items control throws "The parameter is incorrect" | In IDL and implementation declare the collection as `Windows.Foundation.Collections.IVector<IInspectable>`, but return an object implementing `IObservableVector<T>`. |
| `'MyImplementationType_base<MyImplementationType>': no appropriate default constructor available` | Derived from a type with a non-trivial constructor; pass the required constructor parameters along. |
| `cannot convert from 'const std::vector<std::wstring,...>' to 'const winrt::param::async_iterable<winrt::hstring> &'` | A `std::vector<std::wstring>` was passed where a Windows Runtime collection is expected; see Standard C++ data types and C++/WinRT. |
| Same error with `std::vector<winrt::hstring>` | Passed to an asynchronous API without copying or moving the vector to the async callee. |
| Visual Studio: "The application for the project is not installed" | Install the Windows App SDK C++ templates and the C++/WinRT VSIX. |
| Windows App Certification Kit: runtime class "does not derive from a Windows base class" | The ultimate base class of a composable class must be a type from a `Windows.*` or `Microsoft.*` namespace (for example `Microsoft.UI.Xaml.DependencyObject`). |
| `T must be WinRT type` for an EventHandler / TypedEventHandler specialization | Consider `winrt::delegate<...T>` instead. |
| `T must be WinRT type` for an asynchronous operation specialization | Consider returning a PPL `task` instead. |
| `T must be WinRT type` when calling `winrt::xaml_typename` | Use the projected type (for example `BgLabelControlApp::BgLabelControl`), not the implementation type. |
| `error C2220: warning treated as error` | Fix the warning, or set **C/C++ > General > Treat Warnings As Errors** to **No (/WX-)**. |
| Crash: event handler called after the object was destroyed | Use a safe `this` pointer with an event-handling delegate (see weak-references.md). |
| `error C2338: This is only for weak ref support` | The type passed `winrt::no_weak_ref` to its base class; see "Opting out of weak reference support". |
| `consume_Something: function that returns 'auto' cannot be used before it is defined` (C3779) | See the FAQ entry for C3779. |
| `error LNK2019: Unresolved external symbol` | See the FAQ entry for LNK2019. |
| LLVM / Clang toolchain errors | Not supported for C++/WinRT; the FAQ describes an experiment emulating the internal use. |
| `no appropriate default constructor available` for a projected type | Call the `std::nullptr_t` constructor to delay initialization (or when consuming and implementing a runtime class in the same project). |
| `error C3861: 'from_abi': identifier not found` (VS 2017 15.8.0+, Windows SDK 10.0.17134.0) | Target a later Windows SDK, or set **C/C++ > Language > Conformance mode: No** (and remove `/permissive-` from Additional Options). |
| `error C2039: 'IUnknown': is not a member of '`global namespace''` | See "How to retarget your C++/WinRT project to a later version of the Windows SDK". |
| `error LNK2019: unresolved external symbol _WINRT_CanUnloadNow@0 referenced in function _VSDesignerCanUnloadNow@0` | Same retargeting guidance. |
| "The C++/WinRT VSIX no longer provides project build support..." | Install the `Microsoft.Windows.CppWinRT` NuGet package into the project. |
| `LNK2019` mentioning `winrt::impl::consume_Windows_Foundation_Collections_IVector` | As of C++/WinRT 2.0, `#include <winrt/Windows.Foundation.Collections.h>` when using range-based `for` on a collection. |
| `error C4002: Too many arguments for function-like macro invocation GetCurrentTime` | See the FAQ entry on `GetCurrentTime` / `TRY` ambiguities. |
| `error C2334: unexpected token(s) preceding '{'` | Same FAQ entry. |
| `winrt::impl::produce<D,I> cannot instantiate abstract class, due to missing GetBindingConnector` | `#include <winrt/Microsoft.UI.Xaml.Markup.h>`. |
| `error C2039: 'promise_type': is not a member of 'std::experimental::coroutine_traits<void>'` | The coroutine must return an asynchronous operation object or `winrt::fire_and_forget`. |
| `ambiguous access of 'PopulatePropertyInfoOverride'` | Can occur when one base class is declared in IDL and a different one in XAML markup. |
| "Designtime build failed for project ... IntelliSense might be unavailable." | Resolves after the first build. |
| `winrt::auto_revoke` registration throws `winrt::hresult_no_interface` | See "If your auto-revoke delegate fails to register" (events-delegates.md). |
| Consuming a C# Windows Runtime component that uses XAML: `'MyNamespace_XamlTypeInfo': is not a member of 'winrt::MyNamespace'` | In `pch.h` add `#include <winrt/MyNamespace.MyNamespace_XamlTypeInfo.h>`. |
| IntelliSense `error E1696: cannot open source file` | Compile the project once, then right-click > **Rescan** > **Rescan File**. |

## Notes

- For XAML parse exceptions: configure the debugger to catch first-chance exceptions, inspect the exception HRESULT/message, and check Visual Studio's output window for XAML parser messages. A missing resource key, or an exception inside a `UserControl`, custom control, or custom layout panel, are likely causes; as a last resort, bisect the markup by removing about half of the page at a time.
- When porting, you can make temporary progress by commenting or stubbing out non-essential code and paying the debt later.
- Many remedies defer to the UWP C++/WinRT FAQ, which is not reproduced here.
- For the VSIX / NuGet package support, see "Visual Studio support for C++/WinRT, and the VSIX".
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/troubleshooting (en-us, fetched 2026-10-16)

## Related

- [Weak References](./weak-references.md)
- [Events and Delegates](./events-delegates.md)
- [XAML Binding](./xaml-binding.md)
- [Standard C++ Data Types](./std-cpp-data-types.md)
- [Author APIs](./author-apis.md)

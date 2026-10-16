# C++/WinRT

| Name | Description | Path |
| --- | --- | --- |
| Advanced Concurrency and Asynchrony with C++/WinRT | Offloading to the thread pool, apartment_context, cancellation, timeouts, and fire-and-forget coroutines. | [advanced-concurrency.md](./advanced-concurrency.md) |
| Agile Objects with C++/WinRT | An agile object can be accessed from any thread/apartment without marshaling. | [agile-objects.md](./agile-objects.md) |
| Concurrency: IAsyncAction / IAsyncOperation, co_await, resume_foreground, apartment_context, fire_and_forget | C++/WinRT integrates C++ coroutines with the four WinRT asynchronous operation types. | [async-coroutines.md](./async-coroutines.md) |
| Author APIs with C++/WinRT (IDL and cppwinrt.exe) | Shows how to implement WinRT interfaces or full runtime classes using winrt::implements. | [author-apis.md](./author-apis.md) |
| Author COM Components with C++/WinRT | Uses winrt::implements to author classic COM components and class factories. | [author-coclasses.md](./author-coclasses.md) |
| Calling and Overriding Your Base Type with C++/WinRT | Overriding XAML overridable methods and calling base-class members through base_type. | [base-type.md](./base-type.md) |
| XAML Items Controls; Bind to a C++/WinRT Collection | Implements IObservableVector with single_threaded_observable_vector and binds a ListBox to it. | [binding-collection.md](./binding-collection.md) |
| Boxing and Unboxing Values to IInspectable | Wraps a scalar or array value inside a reference-class object for IInspectable APIs. | [boxing.md](./boxing.md) |
| Collections with C++/WinRT | Functions and base classes for passing std::vector/std::map as Windows Runtime collections. | [collections.md](./collections.md) |
| winrt::com_ptr and winrt::Windows::Foundation::IInspectable | Smart pointer that wraps an implementation type and manages its reference count. | [com-ptr-iinspectable.md](./com-ptr-iinspectable.md) |
| A Completion Source Sample (completion_source) | Authoring an awaitable completion source class, similar to .NET TaskCompletionSource<T>. | [completion-source.md](./completion-source.md) |
| Consume APIs with C++/WinRT | Shows how to consume runtime classes from Windows, third-party components, or own projects. | [consume-apis.md](./consume-apis.md) |
| Consume COM Components with C++/WinRT | Uses winrt::com_ptr (put_void, put, as, try_as, capture) to consume classic COM APIs such as Direct2D/DirectX. | [consume-com.md](./consume-com.md) |
| Diagnosing Direct Allocations (winrt::make) | Turns direct allocation of implementation types into a compile error, steering to winrt::make / make_self. | [diag-direct-alloc.md](./diag-direct-alloc.md) |
| Error Handling: hresult_error, check_hresult, throw_last_error | C++/WinRT converts error HRESULTs into exceptions and provides helper functions. | [error-handling.md](./error-handling.md) |
| Events and Delegates: event_token, auto_revoke, winrt::event | Shows how to register, revoke, and author event-handling delegates in C++/WinRT. | [events-delegates.md](./events-delegates.md) |
| Extension Points for Your Implementation Types | Deferred destruction via final_release, safe QueryInterface during destruction, and abi_enter/abi_exit hooks. | [extension-points.md](./extension-points.md) |
| Get Started with C++/WinRT | Walks through a simple C++/WinRT console app and adding support to Desktop projects. | [get-started.md](./get-started.md) |
| winrt::init_apartment / winrt::uninit_apartment | Initializes the calling thread for use with the Windows Runtime and COM. | [init-apartment.md](./init-apartment.md) |
| Interop between C++/WinRT and the ABI | Techniques for converting between ABI types and C++/WinRT projected types. | [interop-abi.md](./interop-abi.md) |
| Interop Between C++/WinRT and C++/CX | Helper functions for converting objects between C++/CX and C++/WinRT. | [interop-winrt-cx.md](./interop-winrt-cx.md) |
| Asynchrony, and Interop Between C++/WinRT and C++/CX | Porting asynchronous PPL task / create_async code to C++/WinRT coroutines side by side. | [interop-winrt-cx-async.md](./interop-winrt-cx-async.md) |
| C++/WinRT Configuration Macros | Preprocessor macros that configure C++/WinRT's generated code behavior. | [macros.md](./macros.md) |
| Moving from C# to C++/WinRT | A catalog of technical details for porting C# source code to C++/WinRT (projection, syntax, procedure, IDL). | [move-to-winrt-from-csharp.md](./move-to-winrt-from-csharp.md) |
| Move to C++/WinRT from C++/CX | A catalog of technical differences between C++/CX and C++/WinRT for porting. | [move-to-winrt-from-cx.md](./move-to-winrt-from-cx.md) |
| Move to C++/WinRT from WRL | A porting catalog for replacing WRL constructs with their C++/WinRT equivalents. | [move-to-winrt-from-wrl.md](./move-to-winrt-from-wrl.md) |
| C++/WinRT Naming Conventions | Reserved-name rules for the winrt namespace and its sub-namespaces. | [naming.md](./naming.md) |
| Native Interop: ISwapChainPanelNative / IWindowNative | Native interop interfaces for bridging to non-WinRT native concepts. | [native-interop.md](./native-interop.md) |
| Visual Studio Native Debug Visualization (natvis) for C++/WinRT | Natvis debug visualization of C++/WinRT projected types via the VSIX. | [natvis.md](./natvis.md) |
| C++/WinRT Overview | A standard C++17 language projection for Windows Runtime APIs implemented as a header library. | [overview.md](./overview.md) |
| Passing Parameters into the ABI Boundary | C++/WinRT projected functions accept a wider range of parameter types than the ABI. | [pass-parms-to-abi.md](./pass-parms-to-abi.md) |
| C++/WinRT Projection Headers (winrt/*.h) | For every Windows Runtime type in metadata, C++/WinRT defines a C++-friendly equivalent. | [projection-headers.md](./projection-headers.md) |
| Standard C++ Data Types and C++/WinRT | C++/WinRT accepts standard C++ types as arguments to WinRT collection APIs. | [std-cpp-data-types.md](./std-cpp-data-types.md) |
| String Handling: winrt::hstring, to_hstring, c_str | C++/WinRT lets you call WinRT APIs using standard wide string types or custom hstring. | [strings.md](./strings.md) |
| Troubleshooting C++/WinRT Issues | Symptoms and remedies for common compile, link, build, and runtime problems. | [troubleshooting.md](./troubleshooting.md) |
| Use a C# Component from C++/WinRT | Consumes a Windows Runtime Component authored in C# from a C++/WinRT app. | [use-csharp-component-from-cpp-winrt.md](./use-csharp-component-from-cpp-winrt.md) |
| Weak References: get_weak / get_strong | Safely manages the lifetime of this across coroutine suspension and event handling. | [weak-references.md](./weak-references.md) |
| XAML controls: x:Bind with C++/WinRT | Implement an observable property and bind XAML controls to it with {x:Bind}. | [xaml-binding.md](./xaml-binding.md) |
| XAML Custom (Templated) Controls with C++/WinRT | Authors a custom control deriving from Control with dependency properties and ControlTemplate. | [xaml-cust-ctrl.md](./xaml-cust-ctrl.md) |

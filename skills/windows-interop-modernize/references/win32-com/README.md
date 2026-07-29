# Win32 / COM

| Name | Description | Path |
| --- | --- | --- |
| CoCreateInstance / CLSID / IID | Creates and default-initializes a single COM object and returns a pointer to the requested interface. | [com-create-instance.md](./com-create-instance.md) |
| CoInitializeEx / COM Apartments (STA / MTA) | Initializes the COM library for the calling thread and sets its concurrency model. | [com-initialization.md](./com-initialization.md) |
| ComPtr / winrt::com_ptr | RAII smart pointers that wrap COM interface pointers and automate AddRef/Release calls. | [com-smart-pointers.md](./com-smart-pointers.md) |
| CreateWindowExW | Creates an overlapped, pop-up, or child window with an extended window style. | [create-window.md](./create-window.md) |
| CsWin32 Source Generator | Roslyn source generator that produces strongly-typed C# P/Invoke bindings for Win32 APIs. | [cswin32.md](./cswin32.md) |
| DialogBoxParamW | Creates a modal dialog box from a dialog box template resource. | [dialog-box.md](./dialog-box.md) |
| SetProcessDpiAwarenessContext / GetDpiForWindow | Functions for opting into per-monitor DPI awareness and querying window DPI. | [dpi-awareness.md](./dpi-awareness.md) |
| Extended Window Styles (WS_EX_*) | Style bits passed as dwExStyle parameter of CreateWindowExW. | [extended-window-styles.md](./extended-window-styles.md) |
| HRESULT Error Handling (SUCCEEDED/FAILED, HRESULT_FROM_WIN32) | 32-bit result code returned by COM and Win32-interop APIs. | [hresult-error-handling.md](./hresult-error-handling.md) |
| IUnknown (QueryInterface / AddRef / Release) | The root COM interface that enables discovering other interfaces and managing object lifetime. | [iunknown.md](./iunknown.md) |
| MessageBoxW | Displays a modal dialog box containing a system icon, buttons, and message. | [message-box.md](./message-box.md) |
| Message Loop (GetMessage / TranslateMessage / DispatchMessage) | Retrieves queued window messages and dispatches them to the appropriate window procedure. | [message-loop.md](./message-loop.md) |
| P/Invoke from C# (DllImport / LibraryImport) | Lets managed C# code call unmanaged Win32 functions. | [pinvoke-csharp.md](./pinvoke-csharp.md) |
| RegisterClassExW / WNDCLASSEXW | Registers a window class for use in CreateWindow / CreateWindowEx calls. | [register-window-class.md](./register-window-class.md) |
| Win32 Data Types (HWND / HINSTANCE / LRESULT / WPARAM / LPARAM) | Core opaque handle and message-parameter types used throughout the Win32 windowing API. | [win32-data-types.md](./win32-data-types.md) |
| ShowWindow / UpdateWindow / DestroyWindow | Functions that control a window's visibility, force repaint, and tear down windows. | [window-lifecycle.md](./window-lifecycle.md) |
| Window Messages (WM_PAINT / WM_DESTROY / WM_SIZE / WM_COMMAND) | Core WM_* notification codes handled inside a WNDPROC. | [window-messages.md](./window-messages.md) |
| WNDPROC / DefWindowProcW | Callback signature for application-defined window procedure and default message processing. | [window-procedure.md](./window-procedure.md) |
| Window Styles (WS_*) | Style bits controlling frame, border, and behavior passed to CreateWindowExW. | [window-styles.md](./window-styles.md) |
| windows-rs | Microsoft's official Rust binding to the Windows API surface (Win32, WinRT, COM). | [windows-rs.md](./windows-rs.md) |

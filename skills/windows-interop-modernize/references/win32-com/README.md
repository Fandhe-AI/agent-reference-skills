# Win32 と COM の基礎

| Name | Description | Path |
|------|-------------|------|
| CreateWindowExW | Creates a window from a registered class with extended style | [create-window.md](./create-window.md) |
| RegisterClassExW / WNDCLASSEXW | Registers a window class before window creation | [register-window-class.md](./register-window-class.md) |
| WNDPROC / DefWindowProcW | Window procedure callback signature and default message handling | [window-procedure.md](./window-procedure.md) |
| Message Loop (GetMessage / TranslateMessage / DispatchMessage) | Per-thread message retrieval and dispatch loop | [message-loop.md](./message-loop.md) |
| Window Messages (WM_PAINT / WM_DESTROY / WM_SIZE / WM_COMMAND) | Core window message codes and their wParam/lParam payloads | [window-messages.md](./window-messages.md) |
| ShowWindow / UpdateWindow / DestroyWindow | Window visibility, initial repaint, and teardown | [window-lifecycle.md](./window-lifecycle.md) |
| Window Styles (WS_*) | Base window style bits for CreateWindowExW's dwStyle | [window-styles.md](./window-styles.md) |
| Extended Window Styles (WS_EX_*) | Extended window style bits for CreateWindowExW's dwExStyle | [extended-window-styles.md](./extended-window-styles.md) |
| Win32 Data Types (HWND / HINSTANCE / LRESULT / WPARAM / LPARAM) | Core handle and message-parameter typedefs | [win32-data-types.md](./win32-data-types.md) |
| MessageBoxW | Modal message box with system icon and buttons | [message-box.md](./message-box.md) |
| DialogBoxParamW | Modal dialog box from a template resource | [dialog-box.md](./dialog-box.md) |
| CoInitializeEx / COM Apartments (STA / MTA) | Per-thread COM library initialization and apartment models | [com-initialization.md](./com-initialization.md) |
| CoCreateInstance / CLSID / IID | Instantiates a COM object by class ID and interface ID | [com-create-instance.md](./com-create-instance.md) |
| IUnknown (QueryInterface / AddRef / Release) | Root COM interface for interface discovery and lifetime management | [iunknown.md](./iunknown.md) |
| ComPtr / winrt::com_ptr | RAII smart pointers for COM interface pointers (WRL / C++/WinRT) | [com-smart-pointers.md](./com-smart-pointers.md) |
| SetProcessDpiAwarenessContext / GetDpiForWindow | Per-monitor DPI awareness opt-in and DPI query | [dpi-awareness.md](./dpi-awareness.md) |
| P/Invoke from C# (DllImport / LibraryImport) | Calling Win32 functions from managed C# code | [pinvoke-csharp.md](./pinvoke-csharp.md) |
| CsWin32 Source Generator | Source-generated strongly-typed Win32 bindings for C# | [cswin32.md](./cswin32.md) |
| windows-rs | Official Rust bindings to Win32/WinRT/COM APIs | [windows-rs.md](./windows-rs.md) |

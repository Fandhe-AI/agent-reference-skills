---
source: https://docs.flutter.dev/platform-integration/windows/extern_win
---

# External windows in Flutter Windows apps

Special considerations for adding external (non-Flutter) windows to Flutter Windows apps so application lifecycle state updates stay correct.

## Signature / Usage

In the message handler of your custom external window (often a class method called from the window's `WndProc`; the exact file and class name depend on your app), forward messages to the engine:

```cpp
  LRESULT MyExternalWindow::MessageHandler(HWND hwnd, UINT msg, WPARAM wparam, LPARAM lparam) {
+     std::optional<LRESULT> result = flutter_controller_->engine()->ProcessExternalWindowMessage(hwnd, msg, wparam, lparam);
+     if (result.has_value()) {
+         return *result;
+     }
      // Original contents of WndProc...
  }
```

(Lines prefixed with `+` are the additions; the source marks the block as a diff.)

## Notes

- Who is affected: Windows applications built against Flutter versions after 3.13 that open non-Flutter windows.
- By default, a non-Flutter window added to a Flutter Windows app is not part of the application lifecycle state logic. When the external window is shown or hidden, the lifecycle state does not update to inactive or hidden, so the app might receive incorrect lifecycle changes through `WidgetsBindingObserver.didChangeAppLifecycleState`.
- To include the window, its `WndProc` procedure must invoke `FlutterEngine::ProcessExternalWindowMessage`. See also the breaking change `/release/breaking-changes/win_lifecycle_process_function`.
- This is the Flutter embedder hook for Win32 windows. Win32 / WinUI APIs belong to the windows-app-sdk and windows-interop-modernize skills.

## Related

- [desktop](./desktop.md)

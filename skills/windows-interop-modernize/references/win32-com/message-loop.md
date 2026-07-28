# Message Loop (GetMessage / TranslateMessage / DispatchMessage)

The message loop retrieves queued window messages for the calling thread and dispatches them to the appropriate window procedure. Every thread that creates a window needs one.

## Signature / Usage

```cpp
MSG msg = { };
while (GetMessage(&msg, NULL, 0, 0) > 0)
{
    TranslateMessage(&msg);
    DispatchMessage(&msg);
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `GetMessage(&msg, NULL, 0, 0)` | Blocks until a message is available; removes the first message from the calling thread's queue and fills `MSG`. Returns nonzero normally, `0` when `WM_QUIT` is received, `-1` on error |
| `TranslateMessage(&msg)` | Translates virtual-key messages into character messages; call before `DispatchMessage` |
| `DispatchMessage(&msg)` | Invokes the window procedure of the message's target window |
| `PostQuitMessage(0)` | Posts `WM_QUIT`, causing `GetMessage` to return `0` and the loop to end |

## Notes

- The OS maintains a per-thread message queue; it cannot be accessed directly except through `GetMessage`/`PeekMessage`.
- *Posting* a message enqueues it (delivered via the loop); *sending* a message calls the window procedure directly, bypassing the queue.
- The window procedure never receives `WM_QUIT` directly; the loop terminates when `GetMessage` returns `0`.

## Related

- [WNDPROC / DefWindowProcW](./window-procedure.md)
- [Window Messages](./window-messages.md)

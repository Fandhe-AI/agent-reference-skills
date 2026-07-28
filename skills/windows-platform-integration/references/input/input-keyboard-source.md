# InputKeyboardSource

Processes keyboard input and queries virtual-key state for the current thread, a top-level window, or a `ContentIsland` — used for modifier-key checks and low-level keyboard handling outside `UIElement.KeyDown`/`KeyUp`.

## Signature / Usage

```csharp
var ctrlState = Microsoft.UI.Input.InputKeyboardSource.GetKeyStateForCurrentThread(Windows.System.VirtualKey.Control);
bool isCtrlDown = ctrlState.HasFlag(Windows.UI.Core.CoreVirtualKeyStates.Down);
```

```csharp
class RespondToKeyDown
{
    InputKeyboardSource myInputKeyboardSource;

    public RespondToKeyDown(Microsoft.UI.Content.ContentIsland island)
    {
        myInputKeyboardSource = InputKeyboardSource.GetForIsland(island);
        myInputKeyboardSource.KeyDown += OnKeyDown;
    }

    void OnKeyDown(InputKeyboardSource sender, InputKeyboardSourceEventArgs args)
    {
        if (args.VirtualKey == Windows.System.VirtualKey.Escape)
        {
            args.Handled = true;
        }
    }
}
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `InputKeyboardSource.GetForWindowId(WindowId)` / `GetForIsland(ContentIsland)` | static methods | Retrieve a keyboard source scoped to a window/island. |
| `InputKeyboardSource.GetKeyStateForCurrentThread(VirtualKey)` | static method | Retrieves current key state for the calling thread (recommended for modifier-key checks in WinUI 3 desktop apps). |
| `GetCurrentKeyState(VirtualKey)` / `GetKeyState(VirtualKey)` | instance methods | Retrieve key state at the current time vs. at the time of the message currently being processed. |
| `KeyDown` / `KeyUp` | event | Non-Alt key press/release. |
| `SystemKeyDown` / `SystemKeyUp` | event | Key press/release while Alt is also held. |
| `CharacterReceived` | event | New character received by the input queue. |
| `ContextMenuKey` | event | Fired for unhandled Menu key / Shift+F10 after a `KeyDown`. |

## Notes

- Namespace: `Microsoft.UI.Input` (Windows App SDK). The static `GetKeyStateForCurrentThread` method is the WinUI 3 desktop replacement for `CoreWindow.GetKeyState` when checking modifier-key state inside a `KeyDown`/`KeyUp` handler (see [Keyboard input](./keyboard-input.md)).

## Related

- [Keyboard input](./keyboard-input.md)
- [Keyboard accelerators](./keyboard-accelerators.md)
- [InputPointerSource](./input-pointer-source.md)

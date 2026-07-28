# InputActivationListener

Observes changes to the input activation state (activated/deactivated) of a top-level window or `ContentIsland`.

## Signature / Usage

```csharp
class RespondToAppWindowActivation
{
    InputActivationListener inputActivationListener;

    public RespondToAppWindowActivation(Microsoft.UI.Windowing.AppWindow appWindow)
    {
        inputActivationListener = InputActivationListener.GetForWindowId(appWindow.Id);
        inputActivationListener.InputActivationChanged += OnActivationChanged;
    }

    void OnActivationChanged(InputActivationListener sender, InputActivationListenerActivationChangedEventArgs args)
    {
        if (sender.State == InputActivationState.Activated)
            LeaveMyBackgroundMode();
        else
            EnterMyBackgroundMode();
    }
}
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `InputActivationListener.GetForWindowId(WindowId)` | static method | Retrieves the listener for a top-level window. |
| `InputActivationListener.GetForIsland(ContentIsland)` | static method | Retrieves the listener for a `ContentIsland`. |
| `State` | `InputActivationState` | Current activation state (`Deactivated`, `Activated`, `PointerActivated`). |
| `InputActivationChanged` | event | Fired when the activation state changes. |
| `DispatcherQueue` | `DispatcherQueue` (inherited from `InputObject`) | Dispatcher queue associated with the listener. |

## Notes

- Namespace: `Microsoft.UI.Input` (Windows App SDK). If the associated window/island is destroyed, the listener is implicitly disposed.

## Related

- [Focus manager](./focus-manager.md)

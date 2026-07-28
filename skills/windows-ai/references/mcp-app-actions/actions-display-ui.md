# Position App Action UI relative to the invoking app

How a provider app can determine the invoking app window's position to place its own UI near the caller for a more seamless experience.

## Signature / Usage

```csharp
Microsoft.UI.WindowId invokerWindowIdCast = new Microsoft.UI.WindowId { Value = context.InvokerWindowId.Value };
AppWindow callerWindow = AppWindow.GetFromWindowId(invokerWindowIdCast);

if (callerWindow != null)
{
    PointInt32 callerPosition = callerWindow.Position;
    Window.Current.AppWindow.Move(callerPosition);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| displaysUI | Boolean (JSON) | Action definition JSON property hinting that an action may display UI; defaults to `true`. |
| `ActionInvocationContext.InvokerWindowId` | `Windows.UI.WindowId` | The invoker's window ID, if the invoker supplied one via `ActionRuntime.CreateInvocationContextWithWindowId`. Zero if not provided. |

## Notes

- Convert `Windows.UI.WindowId` to `Microsoft.UI.WindowId` (same `Value`) to use WinUI's `AppWindow.GetFromWindowId`.

## Related

- [Get started with App Actions on Windows](./actions-get-started.md)
- [Discover and invoke registered App Actions](./actions-consume.md)
- [Action definition JSON schema](./actions-json.md)

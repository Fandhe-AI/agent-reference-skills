# Routed Events

Routed events (`System.Windows.RoutedEvent`) propagate through the WPF element tree, invoking handlers on multiple listeners rather than only the source element — a capability plain CLR events lack.

## Signature / Usage

```csharp
// Register a custom routed event using the Bubble routing strategy.
public static readonly RoutedEvent TapEvent = EventManager.RegisterRoutedEvent(
    name: "Tap",
    routingStrategy: RoutingStrategy.Bubble,
    handlerType: typeof(RoutedEventHandler),
    ownerType: typeof(CustomButton));

public event RoutedEventHandler Tap
{
    add => AddHandler(TapEvent, value);
    remove => RemoveHandler(TapEvent, value);
}
```

```xaml
<!-- Attach a handler to a parent for a child's routed event -->
<StackPanel Button.Click="Button_Click">
    <Button>Click me</Button>
</StackPanel>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RoutingStrategy.Bubble` | enum value | Handlers invoked from source up to the root (most events, e.g. `Click`) |
| `RoutingStrategy.Tunnel` | enum value | Handlers invoked from root down to the source (`Preview*` events) |
| `RoutingStrategy.Direct` | enum value | Only the source's handlers are invoked (like a CLR event, but still supports class handling / `EventSetter`) |
| `RoutedEventArgs.Handled` | `bool` | Set `true` to stop most subsequent handlers along the route |
| `RoutedEventArgs.Source` | `object` | The element that originally raised the event (constant along the route) |
| `UIElement.AddHandler(RoutedEvent, Delegate, handledEventsToo?)` | method | Attach a handler in code, optionally receiving already-handled events |
| `EventManager.RegisterClassHandler` | method | Registers a class handler invoked before any instance handler |

## Notes

- Input events are typically implemented as tunnel/bubble pairs (`PreviewMouseDown` then `MouseDown`) sharing the same event data.
- `EventSetter` and `EventTrigger` (used in `Style`/`ControlTemplate`) only accept routed events, not plain CLR events.
- WinUI 3 (`Microsoft.UI.Xaml.RoutedEvent`) has a much smaller routed-event surface than WPF (fewer built-in bubbling events; no tunneling `Preview*` pair pattern for most controls) — check WinUI 3 API docs before assuming parity. WinForms events (e.g. `Control.Click`) are plain CLR events with no routing/tunneling.

## Related

- [wpf-basic-controls.md](./wpf-basic-controls.md)
- [wpf-dependency-property.md](./wpf-dependency-property.md)
- [wpf-styles-templates.md](./wpf-styles-templates.md)

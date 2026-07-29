# Events and routed events overview

Events wire XAML-defined UI elements to code-behind handlers, either declaratively (`Click="Handler"` in XAML) or imperatively (`+=` in code). A *routed event* is a subset of events on `UIElement` (mostly input events) that bubble from the source element up through its parent chain, so ancestors can handle events raised on descendants without attaching a handler to every element.

## Signature / Usage

```xaml
<Button x:Name="showUpdatesButton" Content="Click me" Click="ShowUpdatesButton_Click"/>
```

```csharp
private void ShowUpdatesButton_Click(object sender, RoutedEventArgs e)
{
    var b = sender as Button;
}

// Adding/removing a handler in code
textBlock1.PointerEntered += textBlock1_PointerEntered;
textBlock1.PointerEntered -= textBlock1_PointerEntered;

// Registering a handler that still runs after another handler set e.Handled = true
someElement.AddHandler(UIElement.PointerPressedEvent,
    new PointerEventHandler(OnPointerPressed), handledEventsToo: true);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `RoutedEventArgs.OriginalSource` | object | The element that originally raised the event, constant along the whole bubble route (unlike `sender`, which is the element the current handler is attached to). |
| `PointerRoutedEventArgs.Handled` / `KeyRoutedEventArgs.Handled` / `DragEventArgs.Handled` | `bool` | Setting `true` stops the event from reaching most subsequent handlers further up the route. Not all routed events have a `Handled` property (e.g. `GotFocus`/`LostFocus` always bubble to the root). |
| `UIElement.AddHandler(RoutedEvent, handler, handledEventsToo)` | method | Attaches a handler that is invoked even for events already marked `Handled` by an earlier handler. Requires the event's static `*Event` identifier (e.g. `UIElement.PointerPressedEvent`). |
| `IsHitTestVisible` | bool (read/write) | Settable in XAML (`<uiElement IsHitTestVisible="bool"/>`) or code; default `true`. Per the conceptual overview, returns `true` only if `Visibility == Visible`, `Background`/`Fill` is non-null, the control is enabled, and it has non-zero actual size; determines whether an element can be an input event source. |

## Notes

- Most routed events bubble only (child → parent). A small number of `Preview*` events (e.g. `PreviewKeyDown`, `PreviewKeyUp`) do use a genuine tunneling routing strategy (parent → child, ahead of the bubbling pass) — `PreviewKeyDown`'s corresponding bubbling event is `KeyDown` — but this tunnel/bubble pairing exists only for that small set, not for every event as in WPF.
- Custom routed events cannot be declared — routed events are limited to the fixed set defined on `UIElement` (`PointerPressed`, `KeyDown`, `Tapped`, `GotFocus`, `DragOver`, etc.). Define a plain CLR/WinRT event instead for custom control notifications.
- Events raised from a `Popup` or `ToolTip` do not route through the main visual tree — attach handlers to elements inside the `Popup`/`ToolTip` content, not to the `Popup`/`ToolTip` itself.
- Controls can internally mark input events handled (e.g. `Button` handles `PointerPressed` to raise `Click`); override the relevant `On*` method (e.g. `Control.OnKeyDown`) to change that behavior in a derived control.
- WinUI 3 / UWP: `Microsoft.UI.Xaml.RoutedEventArgs` / `Windows.UI.Xaml.RoutedEventArgs`. This is a different, much smaller routed-event model than WPF's `System.Windows.RoutedEvent` (which supports `RoutingStrategy.Bubble`/`Tunnel`/`Direct`, custom routed events via `EventManager.RegisterRoutedEvent`, and `EventSetter`/`EventTrigger`) — see `wpf-routed-events.md` in windows-interop-modernize for the WPF model. WinForms events (e.g. `Control.Click`) are plain CLR events with no routing.

## Related

- [x:Bind markup extension](./x-bind-markup-extension.md)
- [Attached properties overview](./attached-properties-overview.md)

# Screen readers and hardware system buttons

Screen readers such as Narrator must recognize and handle hardware system button events (e.g. the **Fn** key) and communicate their state to users, sometimes consuming the event exclusively so it doesn't bubble to other handlers.

## Signature / Usage

```cppwinrt
namespace winrt
{
    using namespace Windows::System;
    using namespace Windows::UI::Input;
}

winrt::DispatcherQueueController _queueController;
winrt::DispatcherQueue _queue;
winrt::SystemButtonEventController _controller;

void SetupSystemButtonEventController()
{
    _queueController = winrt::DispatcherQueueController::CreateOnDedicatedThread();
    _queue = _queueController.DispatcherQueue();
    _controller = winrt::SystemButtonEventController::CreateForDispatcherQueue(_queue);

    _controller->SystemFunctionButtonPressed(
        [](const winrt::SystemButtonEventController&, const winrt::SystemFunctionButtonEventArgs& args)
        {
            PronounceFunctionButtonPressedMock();
            args.Handled(true); // consume so no other target receives it
        });
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Windows.UI.Input.SystemButtonEventController` | class | Listens for Fn hardware system button events. Created via `CreateForDispatcherQueue`. Cannot receive events already handled by a higher-priority handler. |
| `SystemFunctionButtonPressed` | event | Fires when the Fn button is pressed. |
| `SystemFunctionButtonReleased` | event | Fires when the Fn button is released. |
| `SystemFunctionLockChanged` | event | Fires when the Fn lock state toggles. |
| `SystemFunctionLockIndicatorChanged` | event | Fires when the Fn lock indicator light state changes; commonly fires alongside the other three events for a single press. |
| `args.Handled(bool)` | method on event args | Set `true` to mark the event consumed by this controller (stops further bubbling); useful for a Narrator "learning mode" that announces what a key would do without performing the action. |

## Notes

- API surface is `Windows.UI.Input.SystemButtonEventController` (`Windows.UI.Input` namespace) — for WinUI 3 / Windows App SDK apps, it is still consumed from the `Windows.*` namespace (`winrt::Windows::UI::Input`), not `Microsoft.UI.*`.
- Fn button support and its lock/indicator behavior is OEM-specific.

## Related

- [Keyboard accessibility](./keyboard-accessibility.md)
- [Accessibility testing](./accessibility-testing.md)

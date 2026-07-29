# Keyboard events migration

Migration guidance for keyboard input handling: moving from UWP's global `CoreWindow` keyboard events to WinUI 3's per-element `Microsoft.UI.Xaml.UIElement` routed events and `KeyboardAccelerator`.

## Signature / Usage

```csharp
// UWP: global keyboard events via CoreWindow
var coreWindow = CoreWindow.GetForCurrentThread();
coreWindow.KeyDown += CoreWindow_KeyDown;
coreWindow.KeyUp += CoreWindow_KeyUp;
coreWindow.CharacterReceived += CoreWindow_CharacterReceived;
coreWindow.Dispatcher.AcceleratorKeyActivated += Dispatcher_AcceleratorKeyActivated;
```

```csharp
// WinUI 3: per-UIElement routed events, no CoreWindow equivalent
public MainWindow()
{
    this.InitializeComponent();
    stackPanelControl.KeyDown += OnKeyDownHandler;
    stackPanelControl.KeyUp += OnKeyUpHandler;
    stackPanelControl.CharacterReceived += OnCharacterReceivedHandler;
}

private void OnKeyDownHandler(object sender, KeyRoutedEventArgs e) { }
private void OnCharacterReceivedHandler(UIElement sender, CharacterReceivedRoutedEventArgs args) { }
```

```xaml
<!-- Accelerator keys (Ctrl+C etc.) declared in XAML instead of AcceleratorKeyActivated -->
<StackPanel x:Name="stackPanelControl">
    <StackPanel.KeyboardAccelerators>
        <KeyboardAccelerator Key="C" Modifiers="Control" Invoked="OnCtrlCInvoked"/>
    </StackPanel.KeyboardAccelerators>
</StackPanel>
```

## Options / Props

| UWP (`CoreWindow`) | WinUI 3 (`UIElement`) |
|------|-------------|
| `CoreWindow.KeyDown` | `UIElement.KeyDown` (`KeyRoutedEventArgs`) |
| `CoreWindow.KeyUp` | `UIElement.KeyUp` (`KeyRoutedEventArgs`) |
| `CoreWindow.CharacterReceived` | `UIElement.CharacterReceived` (`CharacterReceivedRoutedEventArgs`) |
| `CoreDispatcher.AcceleratorKeyActivated` + manual `VirtualKey`/modifier checks | `UIElement.KeyboardAccelerators` + `KeyboardAccelerator` (declared in XAML or code, `Invoked` event) |
| `Window.Current.CoreWindow.GetKeyState(VirtualKey)` | `KeyboardAccelerator.Modifiers` (for accelerators) or `Microsoft.UI.Input.InputKeyboardSource.GetKeyStateForCurrentThread` (for ad hoc checks) |

## Notes

- `CoreWindow` raises keyboard events **globally** for the whole app window; WinUI 3 has no window-level equivalent — events are raised per `UIElement` and follow routed-event bubbling, so the handler must be attached to a control that can receive focus (or a focusable ancestor).
- `KeyboardAccelerator` replaces the manual `AcceleratorKeyActivated` + `VirtualKey`/`CoreVirtualKeyStates` bitwise check pattern; set `args.Handled = true` in the `Invoked` handler to stop further processing, matching the UWP `args.Handled` convention.
- `KeyDown`/`KeyUp`/`CharacterReceived` here are `Microsoft.UI.Xaml.UIElement` routed events (WinUI 3, Windows App SDK) — distinct from `Windows.UI.Core.CoreWindow` (UWP), `System.Windows.Input` routed events (WPF), and `System.Windows.Forms.Control` key events (WinForms).

## Related

- [Windowing functionality migration](./windowing-migration.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)

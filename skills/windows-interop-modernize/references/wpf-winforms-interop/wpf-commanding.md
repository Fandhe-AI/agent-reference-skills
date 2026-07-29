# Commanding (ICommand, RoutedCommand, CommandBinding)

WPF commanding is an input mechanism that separates the semantics of an action (e.g. Cut, Paste, Open) from the object that invokes it and from the logic that executes it. A `RoutedCommand` raises tunneling/bubbling events that are handled by a `CommandBinding` found on the command target or one of its ancestors, so the same command can be wired to a button, a menu item, and a keyboard shortcut at once.

## Signature / Usage

```xaml
<Window.CommandBindings>
    <CommandBinding Command="ApplicationCommands.Open"
                    Executed="OpenCmdExecuted"
                    CanExecute="OpenCmdCanExecute"/>
</Window.CommandBindings>
<Window.InputBindings>
    <KeyBinding Key="B" Modifiers="Control" Command="ApplicationCommands.Open"/>
</Window.InputBindings>

<Menu>
    <MenuItem Command="ApplicationCommands.Open"/>
</Menu>
```

```csharp
void OpenCmdExecuted(object sender, ExecutedRoutedEventArgs e)
{
    // Command logic goes here.
}

void OpenCmdCanExecute(object sender, CanExecuteRoutedEventArgs e)
{
    e.CanExecute = true;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ICommand` | interface (`System.Windows.Input`) | `Execute(object)`, `CanExecute(object)`, `CanExecuteChanged` event — the base commanding contract |
| `RoutedCommand` / `RoutedUICommand` | class | WPF's `ICommand` implementation; `Execute`/`CanExecute` raise routed events instead of running logic directly |
| `CommandBinding` | class | Maps a command to `Executed`/`CanExecute` (and `Preview*`) handlers; attached to a `Window`, control, or `Application` |
| `ICommandSource` | interface | Exposes `Command`, `CommandTarget`, `CommandParameter`; implemented by `ButtonBase`, `MenuItem`, `Hyperlink`, `InputBinding` |
| `CommandTarget` | property | Element where routing starts; defaults to the element with keyboard focus when unset |
| `KeyBinding` / `MouseBinding` | class | `InputBinding` subclasses that associate a `KeyGesture`/`MouseGesture` with a command |
| `ApplicationCommands`, `NavigationCommands`, `MediaCommands`, `ComponentCommands`, `EditingCommands` | static classes | Predefined command libraries (`Cut`, `Copy`, `Paste`, `Open`, `BrowseBack`, `Play`, ...) with default input gestures |
| `CommandManager` | static class | Centralizes `Executed`/`CanExecute` handler registration and `RequerySuggested`/`InvalidateRequerySuggested` for re-evaluating `CanExecute` |

## Notes

- The four core concepts are: the **command** (what to do), the **command source** (what invokes it, e.g. `MenuItem`), the **command target** (what it runs on), and the **command binding** (maps command to handlers).
- `CommandTarget` on `ICommandSource` is only honored when the command is a `RoutedCommand`; for plain `ICommand` implementations (common in MVVM, e.g. `RelayCommand`/`DelegateCommand`) it is ignored and `Execute`/`CanExecute` run directly with no routing.
- A `CommandBinding` attached to an ancestor of the command target is reachable (events bubble/tunnel up to it); one attached to a descendant is not.
- WinUI 3 has a separate, non-routed commanding model (`Microsoft.UI.Xaml.Input.ICommand`, `XamlUICommand`, `StandardUICommand`) with no `RoutedCommand`/`CommandBinding`/command-library equivalent — see `commanding.md` in windows-design's navigation-commanding category for that API. WinForms has no commanding abstraction at all; controls wire directly to CLR events (`Click`, etc.).

## Related

- [wpf-routed-events.md](./wpf-routed-events.md)
- [wpf-data-binding.md](./wpf-data-binding.md)
- [wpf-basic-controls.md](./wpf-basic-controls.md)

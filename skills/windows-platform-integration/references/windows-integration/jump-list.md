# JumpList / JumpListItem

`JumpList` provides functionality for an app's jump list — the system menu shown when the user right-clicks the app on the taskbar or Start menu. `JumpListItem` represents a single custom task/entry within that list. Only the desktop device family supports jump lists.

## Signature / Usage

```csharp
// Add a custom task to the jump list
var jumpList = await Windows.UI.StartScreen.JumpList.LoadCurrentAsync();

var taskItem = JumpListItem.CreateWithArguments("/Argument", "DisplayName");
taskItem.Description = "Compose a new message";
taskItem.Logo = new Uri("ms-appx:///Assets/taskImage.png");
// Leaving GroupName blank puts the item in the default "Tasks" group.

jumpList.Items.Add(taskItem);
await jumpList.SaveAsync();
```

```csharp
// Disable the system-managed jump list group and clear custom items
var jumpList = await JumpList.LoadCurrentAsync();
jumpList.SystemGroupKind = JumpListSystemGroupKind.None;
jumpList.Items.Clear();
await jumpList.SaveAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `JumpList.LoadCurrentAsync()` | method | Retrieves the current jump list and its items. |
| `JumpList.SaveAsync()` | method | Persists changes to the jump list. |
| `JumpList.IsSupported()` | method | Whether the system supports jump lists (desktop device family only). |
| `JumpList.Items` | `IVector<JumpListItem>` | The list's items. |
| `JumpList.SystemGroupKind` | `JumpListSystemGroupKind` | Controls the system-managed group: `None`, `Recent`, or `Frequent`. |
| `JumpListItem.CreateWithArguments(String, String)` | static method | Creates an item with launch arguments and a display name. |
| `JumpListItem.CreateSeparator()` | static method | Creates an inert separator for a custom group. |
| `JumpListItem.Arguments` | property | Command-line arguments passed back to the app on activation. |
| `JumpListItem.DisplayName` / `Description` / `Logo` | property | Item text and icon. |
| `JumpListItem.GroupName` | property | Custom group name; items with the same name are grouped together (default group is "Tasks"). |
| `JumpListItem.RemovedByUser` | property | Set to `true` if the user removed the item via "Remove from this list"; the app should respect this and not re-add it until conditions are met again. |

## Notes

- Namespace: `Windows.UI.StartScreen` (WinRT).
- On save, the OS reorders items: removed-by-user items are dropped, items sharing a `GroupName` are grouped, system-managed groups float to the top, and the "Tasks" group sinks to the bottom.
- Handle jump list task activation in `App.OnLaunched` by checking `LaunchActivatedEventArgs.Arguments` against the string passed to `CreateWithArguments`.

## Related

- [Launcher](./launcher.md)

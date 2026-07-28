# Discover and invoke registered App Actions on Windows

How a consumer app can query for registered App Actions that accept a given set of inputs, and invoke a selected action.

## Signature / Usage

```csharp
List<ActionInstance>? actionInstances;
using (ActionRuntime runtime = ActionRuntimeFactory.CreateActionRuntime())
{
    var photoEntity = runtime.EntityFactory.CreatePhotoEntity(imageFile.Path);
    var inputEntities = new ActionEntity[] { photoEntity };
    actionInstances = runtime.ActionCatalog.GetActionsForInputs(inputEntities).ToList();
}

// Invoke a selected action
await actionInstance.InvokeAsync();
var outputs = actionInstance.Context.GetOutputEntities();
if (outputs.Length > 0 && outputs.First().Entity.Kind == ActionEntityKind.Photo)
{
    var outputPhoto = (PhotoActionEntity)outputs.First().Entity;
    var path = outputPhoto.FullPath;
}
```

## Options / Props

| Member | Namespace | Description |
|------|------|-------------|
| `ActionCatalog.GetActionsForInputs(entities)` | `Windows.AI.Actions.Hosting` | Returns `ActionInstance[]` matching the given input entities. |
| `ActionInstance.DisplayInfo.Description` | `Windows.AI.Actions.Hosting` | Human-readable description for UI binding. |
| `ActionInstance.InvokeAsync()` | `Windows.AI.Actions.Hosting` | Invokes the selected action. |
| `ActionInstance.Context.GetOutputEntities()` | `Windows.AI.Actions` | Returns output entities after invocation. |

## Notes

- `ActionRuntimeFactory.CreateActionRuntime()` (from the `Microsoft.AI.Actions` NuGet package) creates the runtime used to build input entities via `EntityFactory` (for example `CreatePhotoEntity`).
- Bind a `ListBox`/`ListBoxItem` to `ActionInstance.DisplayInfo.Description` to present available actions to the user before invocation.

## Related

- [App Actions on Windows Overview](./app-actions-overview.md)
- [Get started with App Actions on Windows](./actions-get-started.md)
- [Position App Action UI](./actions-display-ui.md)

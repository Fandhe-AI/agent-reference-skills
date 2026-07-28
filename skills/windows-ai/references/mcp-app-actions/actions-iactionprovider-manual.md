# Manually implement IActionProvider

How to implement an App Action provider by directly implementing the `IActionProvider` interface, for edge cases not covered by the `Microsoft.AI.Actions` code-generation package.

## Signature / Usage

```csharp
[System.Runtime.InteropServices.GuidAttribute("00001111-aaaa-2222-bbbb-3333cccc4444")]
public partial class MyAppActionProvider : IActionProvider
{
    public IAsyncAction InvokeAsync(ActionInvocationContext context)
    {
        return InvokeAsyncHelper(context).AsAsyncAction();
    }

    async Task InvokeAsyncHelper(ActionInvocationContext context)
    {
        NamedActionEntity[] inputs = context.GetInputEntities();
        switch (context.ActionId)
        {
            case "ExampleActionProvider.MyActionProvider.SendMessage":
                foreach (var inputEntity in inputs)
                {
                    if (inputEntity.Name.Equals("message", StringComparison.Ordinal))
                    {
                        var entity = (TextActionEntity)inputEntity.Entity;
                        string message = entity.Text;
                        TextActionEntity result = context.EntityFactory.CreateTextEntity("This is the message response");
                        context.SetOutputEntity("response", result);
                    }
                }
                break;
        }
    }
}
```

## Options / Props

| Member | Description |
|------|-------------|
| `IActionProvider.InvokeAsync(ActionInvocationContext context)` | The single method the system calls to invoke an action; returns `IAsyncAction`. |
| `ActionInvocationContext.GetInputEntities()` | Returns the `NamedActionEntity[]` passed as input. |
| `ActionInvocationContext.ActionId` | The invoked action's `id`, as declared in the action definition JSON; used to dispatch when a provider implements multiple actions. |
| `ActionInvocationContext.SetOutputEntity(name, entity)` | Registers an output entity under the name declared in the JSON `outputs` field. |

## Notes

- The class must carry a `GuidAttribute` matching the `invocation.clsid` declared in the action definition JSON, and register a `com:Class`/`com2:Extension` COM server in the package manifest.
- Even when implementing `IActionProvider` manually, the `Microsoft.AI.Actions` NuGet package's `ActionRuntimeFactory`/`ActionProviderFactory` helpers are still used to auto-generate COM server activation code in `Program.cs`.
- Requires a manually authored `registration.json` action definition file (the code-gen package does not generate it in this scenario).

## Related

- [Get started with App Actions on Windows](./actions-get-started.md)
- [Implement URI launch](./actions-uri-launch.md)
- [Action definition JSON schema](./actions-json.md)
- [Return streaming text](./actions-streaming-text.md)

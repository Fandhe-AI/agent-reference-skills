# Get started with App Actions on Windows

Steps to create an App Action provider app using COM activation and the `Microsoft.AI.Actions` NuGet code-generation package (the recommended approach).

## Signature / Usage

```csharp
using Microsoft.AI.Actions.Annotations;
using Windows.AI.Actions;

[ActionProvider]
public sealed class MyActionsProvider
{
    [WindowsAction(
        Description = "Send a message to a contact",
        Icon = "ms-resource://Files/Assets/StoreLogo.png",
        FeedbackHandler = nameof(SendMessageFeedback),
        UsesGenerativeAI = false
    )]
    [WindowsActionInputCombination(
        Inputs = ["Contact"],
        Description = "Send message to '${Contact.Text}'"
    )]
    [WindowsActionInputCombination(
        Inputs = ["Contact", "Message"],
        Description = "Send '${Message.Text}' to '${Contact.Text}'"
    )]
    public async Task<SendMessageResult> SendMessage(
        [Entity(Name = "Contact")] string contact,
        [Entity(Name = "Message")] string? message,
        InvocationContext context)
    {
        string result = await ProcessMessageAsync(contact, message);
        return new SendMessageResult { Text = context.EntityFactory.CreateTextEntity(result) };
    }

    public record SendMessageResult
    {
        public required TextActionEntity Text { get; init; }
    }
}
```

## Options / Props

| Attribute | Description |
|------|-------------|
| `ActionProviderAttribute` | Marks a class that implements one or more actions. |
| `WindowsActionAttribute` | Metadata about an action (description, icon, `UsesGenerativeAI`, `FeedbackHandler`). |
| `WindowsActionInputCombinationAttribute` | Declares an accepted set of input entities; multiple combinations are allowed per action. |
| `EntityAttribute` | Marks a parameter/class as representing an `ActionEntity`. |

## Notes

- `IActionProvider` is the primary interface app action providers implement; `Microsoft.AI.Actions` auto-generates it from .NET attributes (recommended). For manual implementation, see [Manually implement IActionProvider](./actions-iactionprovider-manual.md).
- Register the provider by adding a `uap3:AppExtension` with `Name="com.microsoft.windows.ai.actions"` to `Package.appxmanifest`, plus a `com2:Extension`/`com:Class` for COM activation.
- Project properties `GenerateActionRegistrationManifest`, `ActionRegistrationManifest`, `GenerateActionsWinRTComServer` control auto-generation of the `registration.json` action definition file and COM server activation code.
- The generated `registration.json`'s `invocation.clsid` must match the `com:Class` `Id` in the package manifest.
- `allowedAppInvokers` (added in schema version 3) lists AppUserModelIDs that can discover the action via `GetActionsForInputs`/`GetAllActions`; `["*"]` is recommended unless callers must be restricted. It is overwritten on each code-gen build, so set `GenerateActionRegistrationManifest` to `false` after adding it manually.
- Test with the [App Actions Testing Playground app](./actions-test-tool.md).

## Related

- [App Actions on Windows Overview](./app-actions-overview.md)
- [Manually implement IActionProvider](./actions-iactionprovider-manual.md)
- [Implement URI launch](./actions-uri-launch.md)
- [Action definition JSON schema](./actions-json.md)
- [Action provider package manifest XML format](./actions-provider-manifest.md)
- [App Actions Testing Playground app](./actions-test-tool.md)

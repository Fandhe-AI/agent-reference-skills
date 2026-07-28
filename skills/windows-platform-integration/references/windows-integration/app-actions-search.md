# App Actions and Windows search integration

App Actions on Windows let a packaged app register atomic units of functionality (e.g. "send a message", "translate text") that other apps, Windows search, and Click to Do can discover and invoke, without the user needing to open the provider app directly.

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
        UsesGenerativeAI = false)]
    [WindowsActionInputCombination(
        Inputs = ["Contact", "Message"],
        Description = "Send '${Message.Text}' to '${Contact.Text}'")]
    public async Task<SendMessageResult> SendMessage(
        [Entity(Name = "Contact")] string contact,
        [Entity(Name = "Message")] string? message,
        InvocationContext context)
    {
        string result = await ProcessMessageAsync(contact, message);
        return new SendMessageResult { Text = context.EntityFactory.CreateTextEntity(result) };
    }

    public Task SendMessageFeedback(ActionFeedback feedback, InvocationContext context) => Task.CompletedTask;

    public record SendMessageResult { public required TextActionEntity Text { get; init; } }
}
```

```xml
<!-- Package.appxmanifest: register the action provider extension + COM activation -->
<Extensions>
  <com2:Extension Category="windows.comServer">
    <com2:ComServer>
      <com3:ExeServer Executable="ExampleAppActionProvider.exe" DisplayName="ExampleAppActionProvider">
        <com:Class Id="00001111-aaaa-2222-bbbb-3333cccc4444" DisplayName="ExampleAppActionProvider" />
      </com3:ExeServer>
    </com2:ComServer>
  </com2:Extension>
  <uap3:Extension Category="windows.appExtension">
    <uap3:AppExtension Name="com.microsoft.windows.ai.actions" DisplayName="Example App Action Provider" Id="appactionprovider" PublicFolder="Assets">
      <uap3:Properties>
        <Registration>registration.json</Registration>
      </uap3:Properties>
    </uap3:AppExtension>
  </uap3:Extension>
</Extensions>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IActionProvider` | interface | Primary interface an app action provider implements; the `Microsoft.AI.Actions` NuGet package auto-generates it from attributed classes. |
| `[ActionProvider]` | attribute | Marks a class as containing one or more app actions. |
| `[WindowsAction]` | attribute | Declares metadata for one action (description, icon, feedback handler, whether it uses generative AI). |
| `[WindowsActionInputCombination]` | attribute | Declares one accepted combination of input entities and its display description. |
| `[Entity]` | attribute | Marks a parameter/class as an `ActionEntity` (e.g. `Text`, `File`, `Contact`). |
| `uap3:AppExtension/@Name` | manifest attribute | Must be `"com.microsoft.windows.ai.actions"` to register as an action provider. |
| `registration.json` `invocation.type` | field | `"COM"` (via `com2:Extension`) or URI launch, for how the system activates the provider. |
| `allowedAppInvokers` | JSON field | List of AppUserModelIDs allowed to discover the action via `ActionCatalog.GetActionsForInputs`/`GetAllActions`; `["*"]` allows all callers. |

## Notes

- Namespace/APIs: `Windows.AI.Actions` (WinRT) plus the `Microsoft.AI.Actions` NuGet source-generator (`Microsoft.AI.Actions.Annotations`). Requires package identity (MSIX) — unpackaged apps cannot register as providers.
- Two activation models: COM activation (recommended, supports advanced scenarios like streaming responses) or URI launch activation (simpler, fewer capabilities).
- Actions registered this way surface in Windows search, Click to Do, and other apps' action pickers — this is distinct from a custom in-app search implementation.
- Requires target OS version 10.0.26100.0 or later.

## Related

- [Context menu extensions](./context-menu-extensions.md)

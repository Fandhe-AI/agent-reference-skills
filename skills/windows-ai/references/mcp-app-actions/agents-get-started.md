# Get started with Agent Launchers on Windows

Steps to create an Agent Launcher provider app: extend an App Action to accept the required `agentName`/`prompt` inputs, then register it as an agent statically or dynamically.

## Signature / Usage

```csharp
[WindowsAction(Id = "ZavaAgentAction", Description = "Start an agent for Zava", UsesGenerativeAI = true)]
[WindowsActionInputCombination(Inputs = ["agentName", "prompt"], Description = "Start Zava Agent with '${agentName.Text}'.")]
[WindowsActionInputCombination(Inputs = ["agentName", "prompt", "attachedFile"], Description = "Start Zava Agent with '${agentName.Text}' and additional context.")]
public async Task StartZavaAgent(
    [Entity(Name = "agentName")] string agentName,
    [Entity(Name = "prompt")] string prompt,
    [Entity(Name = "attachedFile")] FileActionEntity? attachedFile,
    InvocationContext context)
{
    await InvokeAgentAsync(agentName, prompt, attachedFile);
}
```

```powershell
# Dynamic registration
odr.exe agent-info add "<path to agentDefinition.json>"
odr.exe agent-info remove "<path to agentDefinition.json>"
odr.exe agent-info list
odr agent-info list --theme dark,light --scale 200
```

## Options / Props

| Requirement | Description |
|------|-------------|
| `agentName` input | A required `TextActionEntity` input named `agentName`. |
| `prompt` input | A required `TextActionEntity` input named `prompt`. |
| Invocation behavior | Must open an application for active user interaction, not just complete work silently in the background. |
| Icon qualifiers (`agent-info list`) | `contrast` (standard/high/black/white), `language`, `scale`, `targetsize`, `theme` (light/dark) — filter/select returned icon resources. |

## Notes

- Static registration: add a second `uap3:AppExtension` with `Name="com.microsoft.windows.ai.agentInfo"` and a `Registration` element pointing at the agent definition JSON. Each statically registered launcher needs its own `AppExtension` entry.
- Dynamic registration (`odr agent-info add`/`remove`) requires package identity; it cannot be used from an unpackaged app, and must run from within the packaged app containing the associated App Action.
- `odr agent-info list` returns `package_family_name` and `action_id` for each registered agent — use these together to invoke the associated App Action via the Windows.AI.Actions APIs.
- `extended_error` in command output: `0` = success; nonzero = an HRESULT-style error code, with an accompanying `message` field on failure (for example `E_NOTFOUND`, `E_INVALIDARG`, `E_ACCESSDENIED`, `E_ABORT`, `E_FAIL`).

## Related

- [Agent Launchers on Windows overview](./agent-launchers-overview.md)
- [Agent definition JSON schema](./agents-json.md)
- [Get started with App Actions on Windows](./actions-get-started.md)
- [The ODR command-line tool](./odr-tool.md)

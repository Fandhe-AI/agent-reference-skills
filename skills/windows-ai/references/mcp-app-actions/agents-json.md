# Agent definition JSON schema for Agent Launchers on Windows

The format of the agent definition JSON file used to register an Agent Launcher, linking an agent identity to the App Action that handles its invocation.

## Signature / Usage

```json
{
  "manifest_version": "0.1.0",
  "version": "1.0.0",
  "name": "Zava.ZavaAgent",
  "display_name": "ms-resource://zavaAgentDisplayName",
  "description": "ms-resource://zavaAgentDescription",
  "placeholder_text": "ms-resource://zavaAgentPlaceHolderText",
  "icon": "ms-resource://Files/Assets/ZavaLogo.png",
  "action_id": "ZavaAgentAction"
}
```

## Options / Props

| Property | Type | Description | Required |
|------|------|-------------|------|
| manifest_version | string | Schema version of the agent definition manifest. Current: `"0.1.0"`. | Yes |
| version | string | Agent version (semantic versioning). | Yes |
| name | string | Unique identifier, typically reverse-domain notation. Not localizable; unique within the package. | Yes |
| display_name | string | User-facing display name. Localizable via `ms-resource://`. | Yes |
| description | string | User-facing description. Localizable via `ms-resource://`. | Yes |
| placeholder_text | string | Sample/reference query text shown to users. Localizable. | No |
| icon | string | Agent icon. Localizable via `ms-resource://`. | Yes |
| action_id | string | ID of the App Action (in the same package) that handles invocations of this agent. | Yes |

## Notes

- `display_name`, `description`, and `icon` support localization via the `ms-resource://` URI scheme, resolved from the app's `.resw`/`.rc` resource files.
- Icon resources can provide multiple variants that resolve automatically based on theme, contrast, target size, and scale.
- This file must be set to **Build Action** = "Content", **Copy to Output Directory** = "Copy if newer", and referenced by package-relative path in the manifest XML.

## Related

- [Agent Launchers on Windows overview](./agent-launchers-overview.md)
- [Get started with Agent Launchers on Windows](./agents-get-started.md)
- [Action definition JSON schema](./actions-json.md)

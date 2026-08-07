# Workspace model availability

Separate model access across ChatGPT, Codex in the ChatGPT desktop app, Codex CLI, the IDE extension, Codex cloud, and the OpenAI API Platform.

## Overview

Model availability depends on the product surface and authentication boundary. A ChatGPT workspace model setting isn't a universal model switch for Codex across every surface.

## Model boundaries

| Boundary | Model access follows |
|----------|------------------------|
| ChatGPT workspace | Workspace plan, member access, workspace settings, role permissions |
| Codex in desktop app / CLI / IDE extension (ChatGPT sign-in) | Models supported by the client + access of the signed-in ChatGPT identity |
| Codex cloud | Models supported by hosted Codex workflows + signed-in identity access |
| Codex in desktop app / CLI / IDE extension (API-key auth) | OpenAI API organization and project associated with the key |

## GPT-5.4 retirement (August 31, 2026)

GPT-5.4 and GPT-5.4 mini retire from Codex for ChatGPT-signed-in users. Update workspace defaults, saved model settings, managed configurations, custom agents, and scheduled tasks:

- Replace `gpt-5.4` with `gpt-5.6-terra`
- Replace `gpt-5.4-mini` with `gpt-5.6-luna`

The OpenAI API and Codex authenticated with your own API key aren't affected.

## Notes

- A permission profile can't grant model access; model access also can't weaken sandbox, approval policy, network controls, or source-system permissions.
- To troubleshoot missing models: confirm product surface + sign-in method, confirm workspace/org/project, review current access controls for that boundary, and check client/Codex cloud support for the model.

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Managed configuration](./managed-configuration.md)
- [Authentication](./authentication.md)

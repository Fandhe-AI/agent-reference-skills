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

## Set a clear starting experience for employees

Configure Models settings for your workspace before granting access. Workspace owners and admins can configure separate starting defaults for Chat and for Work and Codex; where supported, choose a starting model, reasoning level, speed, and new-chat behavior for Chat, Work, and local Codex surfaces. Treat these as defaults, not permissions: available models still depend on the member's seat, role, workspace or API identity, enforced workspace requirements, and the surface. Codex cloud doesn't support changing its default model. Fast mode availability depends on the workspace, product surface, and any enforced `features.fast_mode` in `requirements.toml`, which can pin Fast mode on or off for managed local Codex clients (it isn't a starting default and can't override workspace or product availability).

## Save Preview and Launch access

Where separate Preview and Launch access settings are visible and editable, select **Save changes**. If **Sync preview and launch access** is available and editable, turning it on copies Preview choices to Launch when you save (it doesn't continuously update Launch access). With Sync off, saving keeps the latest saved Launch choices unless you also edit them; Launch choices can be edited and saved separately. After a successful save, reopen the access settings to verify; if the page reports it couldn't save all changes, some may already be saved, so follow the on-screen guidance for the remainder.

## GPT-6 Sol and Luna in Enterprise

GPT-6 Sol and GPT-6 Luna are off by default in Enterprise workspaces at launch. An administrator must enable each model before members can select it; confirm access on each client. Choosing a model in local configuration doesn't override workspace controls.

## GPT-6.1 Sol in Enterprise

GPT-6.1 Sol has its own planned rollout; the plan keeps it off by default in Enterprise and Edu until an administrator enables it. Check workspace model settings and the Codex model rollout before changing a workspace default. Choosing a model in local configuration doesn't grant access.

## GPT-6 Astra in Enterprise

Astra is off by default at launch in eligible ChatGPT Enterprise and Edu workspaces. A workspace owner must enable access through workspace model settings; access does not automatically turn on after two weeks, and existing Early Model Access settings do not grant access to Astra. Owners can enable Astra for the workspace or specific roles across Chat, Work, and Codex; existing product eligibility still applies. Enabling access and choosing a starting model are separate decisions: check the applicable seat, role, and billing arrangement before setting Astra as a default (see pricing and safety monitoring in agent-approvals-security.md). For API-key sign-in, Astra access follows the API organization and project associated with the key; enabling Astra in a ChatGPT workspace doesn't grant API access, and early access with an API key also requires client configuration (ask your OpenAI account team).

## Prepare for the GPT-5.5 retirement

GPT-5.5 retires from Codex with ChatGPT sign-in on October 14, 2026, at noon PDT (19:00 UTC). The OpenAI API and Codex sessions authenticated with an API key aren't affected. Review Codex workspace defaults and choose an available replacement: `gpt-6.1-sol` once an administrator has enabled it for the affected users. Replace `gpt-5.5` in workspace defaults, saved model settings, managed configurations, custom agents, scheduled tasks, and scripts or commands that explicitly select it. Changing a default doesn't grant model access; confirm the replacement is available to the affected users on each client.

## Prepare for the GPT-5.4 retirement

GPT-5.4 and GPT-5.4 mini retired from Codex for users signed in with ChatGPT on August 31, 2026. Update any remaining workspace defaults, saved model settings, managed configurations, custom agents, and scheduled tasks: replace `gpt-5.4` with `gpt-6-sol` (GPT-6 Sol) when available, and `gpt-5.4-mini` with `gpt-6-luna` (GPT-6 Luna) when available (in Enterprise and Edu an administrator must enable Luna first). The OpenAI API and Codex authenticated with your own API key aren't affected.

## Notes

- A permission profile can't grant model access; model access also can't weaken sandbox, approval policy, network controls, or source-system permissions.
- Source: https://learn.chatgpt.com/docs/enterprise/workspace-model-availability (retrieved 2026-10).
- To troubleshoot missing models: confirm product surface + sign-in method, confirm workspace/org/project, review current access controls for that boundary, and check client/Codex cloud support for the model.

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Groups and provisioning](./groups-and-provisioning.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Managed configuration](./managed-configuration.md)
- [Authentication](./authentication.md)

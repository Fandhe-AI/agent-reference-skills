# Manage app updates

Control how your organization updates the ChatGPT desktop app on macOS and Windows.

## Overview

The ChatGPT desktop app normally self-updates. Organizations that need to review releases before rollout can turn off the built-in updater via managed configuration and deploy approved versions through their device-management platform. Turning off the in-app updater doesn't stop the Microsoft Store, Intune, MDM, or package managers from installing updates.

## Signature / Usage

Disable the desktop app's own updater via a managed policy:

```toml
[features]
in_app_updates = false
```

Set this in [Managed configuration](https://chatgpt.com/codex/settings/managed-configs) > Add policy > Targets (Groups/Users/Platforms) > Raw TOML > `requirements.toml` editor. To restore normal updates, remove `in_app_updates = false` from every applicable policy/MDM profile and have users fully quit and reopen the app.

## Verification

Settings > General > **In-app updates** should show **Managed** with "Your organization has turned off in-app updates." The **Check for Updates** menu item can remain visible even when blocked — trust the **Managed** indicator instead.

## Before you begin / procedure

- Prerequisites: Codex administrator access to Managed configuration for your workspace; a macOS or Windows app release that supports organization-managed updates; an MDM or software-deployment platform that can install approved packages; a process for testing releases, deploying security updates, and tracking installed versions. If the app isn't yet deployed on Windows start with windows-deployment.md.
- Policy steps: open Managed configuration > **Add policy** (or an existing policy) > **Targets** > **Add target** (**Groups**, **Users**, or **Platforms**; start with a pilot group) > **Raw TOML** `requirements.toml` editor > add `[features] in_app_updates = false` (add to an existing `[features]` table, never a second one or `config.toml`) > **Save changes** > ask users to fully quit and reopen the app (closing the window isn't always enough). Some workspaces show a policy-list editor instead of **Raw TOML**; add the same TOML block and use **Groups** to assign.
- Verify: **Settings** > **General** > **In-app updates** shows **Managed** with "Your organization has turned off in-app updates."; confirm your device management platform can still deploy an approved version. If the indicator doesn't appear after the first restart the app might still use a cached policy; allow it to refresh, fully quit and reopen again, and don't rely on the restriction until **Managed** appears.
- Deploy approved versions: choose a version, get the package for each OS and architecture, test with a small group, deploy via Intune, your MDM platform, or another tool, check device inventory, then expand. Rolling back doesn't extend support or guarantee service compatibility. macOS installer: `https://persistent.oaistatic.com/codex-app-prod/ChatGPT.dmg`; Windows packages are in windows-deployment.md.
- Turn updates back on: identify managed policies, system `requirements.toml` files, and MDM profiles that set `in_app_updates = false`; remove it from each `[features]` table; save and redeploy device-managed requirements; ask users to fully quit and reopen; confirm the **In-app updates** managed row no longer appears (if it still does, review other policies and see Locations and precedence in managed-configuration.md).
- Security and support: the policy prevents the app from checking for, downloading, or installing updates through its own updater, and doesn't provide OpenAI-managed version pinning, a separate release channel, or guaranteed service compatibility for older versions; delaying updates can leave the app and bundled components exposed to known vulnerabilities.
- Troubleshoot: if **Managed** doesn't appear confirm the user selected the intended workspace, the policy targets that user/group/platform, the device runs a supported app version, the app can reach the policy-delivery service, the setting is in `requirements.toml`, and the user fully restarted the app. If you can't open Managed configuration or save a policy, confirm you have Codex administrator access. If the version changes after disabling in-app updates, check whether Microsoft Store, Intune, MDM, a package manager, or another system installed it.

## Notes

- After disabling, the organization is responsible for promptly deploying new releases and security fixes; older versions don't receive separate patches or extended support.
- The setting must be in `requirements.toml`, not `config.toml`.
- Applies only to the ChatGPT desktop app on macOS/Windows — not mobile apps, Codex CLI, or the IDE extension.
- If the app can't reach the policy-delivery service (auth/connection/timeout issues), the built-in updater can remain enabled — don't assume updates are blocked unless **Managed** appears.

## Related

- [Managed configuration](./managed-configuration.md)
- [Deploy the Windows app](./windows-deployment.md)
- [Admin rollout guide](./admin-rollout-guide.md)

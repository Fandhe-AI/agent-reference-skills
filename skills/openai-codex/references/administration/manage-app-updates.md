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

## Notes

- After disabling, the organization is responsible for promptly deploying new releases and security fixes; older versions don't receive separate patches or extended support.
- The setting must be in `requirements.toml`, not `config.toml`.
- Applies only to the ChatGPT desktop app on macOS/Windows — not mobile apps, Codex CLI, or the IDE extension.
- If the app can't reach the policy-delivery service (auth/connection/timeout issues), the built-in updater can remain enabled — don't assume updates are blocked unless **Managed** appears.

## Related

- [Managed configuration](./managed-configuration.md)
- [Deploy the Windows app](./windows-deployment.md)
- [Admin rollout guide](./admin-rollout-guide.md)

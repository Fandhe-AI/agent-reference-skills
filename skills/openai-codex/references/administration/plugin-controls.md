# Plugin controls

Decide who can use each plugin and what its apps can do: member permissions, installation settings, app access and actions, content restrictions, and member-experience checks.

## Signature / Usage

A plugin can include **Skills** (instructions, templates, reference material) and **Apps** (tools and information from services such as Google Drive or Slack, limited by app settings and the connected account's permissions). Admin console: https://admin.openai.com > workspace > **Plugins**. Member permissions: **Permissions & roles**, search **plugins**.

Public catalog export (Enterprise owners/admins): **Plugins** > **Public** > **Export CSV**, producing:

```text
public-plugins-security-review.csv
```

## Options / Props

### What each control does

| What you want to control | Where to look |
| --- | --- |
| Who can use, upload, share, or publish plugins | Member permissions |
| Who can install a plugin and who gets it by default | Installation settings |
| Who can use an app and which actions it allows | App access and actions |
| When ChatGPT asks before using an app | The app's **Permissions** settings |
| Files, records, and actions an account can reach | Permissions in the connected service |
| Extra limits on content ChatGPT can access | Content restrictions (**Safety & Security Controls**), where supported |
| What an agent can do on a computer or cloud environment | Environment permissions |

### Member permissions

| Permission | Allows |
| --- | --- |
| Use plugins | Use plugins and apps available to the workspace |
| Upload plugins | Create plugins by uploading ZIP files |
| Upload plugins with custom MCP servers | Upload or update plugins with custom tool connections (still needs permission to create or edit the plugin) |
| Share plugins | Share owned plugins with people, groups, or anyone in the workspace with a link |
| Publish plugins to workspace | Add owned plugins to the workspace plugin directory |
| Create plugins with MCPs | Use developer mode to create custom app connections |

### Installation settings (bulk edit menu)

| Setting | What it changes |
| --- | --- |
| Available for installation | Members can install the plugin |
| Installed for workspace | Installs by default, keeping role-specific settings |
| Customize by role | Sets availability for a custom role where supported |
| Disable | Sets the workspace default to disabled (review role overrides) |

### App access and actions

| Control | Purpose |
| --- | --- |
| **App access** | Who can use the app |
| **Tools** / **Actions** | Allow actions that read or change data (where supported) |
| **New tools** / **New actions** | Whether actions added later are allowed; doesn't turn off already-enabled actions |
| **Permissions** | When ChatGPT asks before using the app |

## Notes

- Installing a plugin doesn't grant access to its apps or external data; allow the required apps, and the connected account must have service-side permission. **Manage Legacy Apps** opens the older app settings page where available.
- Per-plugin role settings: **Workspace default** uses the workspace setting; **Off** for an ordinary custom role means no access from that role, but another role (including via groups) may still grant it. Role changes can take up to five minutes. Select several plugins and **Edit** for bulk changes.
- Workspace connections: members need permission to use the shared account; installing a plugin for everyone doesn't create one. Plugins in Sites use each visitor's connected accounts with a separate Sites permission.
- Write actions: check what they can change and how to review or correct results; confirmation prompts don't replace access restrictions.
- Test with the member's account (not an owner's): find the plugin, use an included app, try the team's task, test content restrictions (allowed vs restricted item), test a write on a disposable record.
- "Disabled by admin": check **Plugins** availability (**Apps** in FedRAMP; Business uses workspace-wide availability), **Permissions & roles** (**Use plugins** / **Allow members to use plugins**; **Use apps** in FedRAMP) across every assigned role, app access and enabled actions, and Lockdown Mode roles (which don't affect Codex network access).
- Catalog export: uses data up to 48 hours old, includes public plugins visible to the workspace (not plugins created for it), isn't available in FedRAMP workspaces, and doesn't show per-member access. Columns: Plugin Name, Plugin Description, Date Added (UTC), OpenAI Verified, Developer Name, Version, App Name(s), App Description(s), Skill Name(s), Skill Description(s); semicolons separate multiple values.
- Verified-domain restrictions can block new connections to supported apps with company-domain accounts in personal or unauthorized workspaces; verifying a domain doesn't activate them, and existing connections aren't disconnected.
- Hooks can run at specific points but a hook failure doesn't necessarily stop the action; keep access restrictions in place. Retire a plugin by reviewing installation settings and app access separately (disabling an app doesn't uninstall the plugin).
- Locally configured MCP servers are covered by the Codex MCP configuration docs.
- Source: https://learn.chatgpt.com/docs/enterprise/apps-and-connectors (retrieved 2026-11-14). Updated from the previous revision of this page, which described six control layers and a capability chain no longer present in the official page.

## Related

- [Skill controls](./skill-controls.md)
- [Shared connections](./shared-connections.md)
- [Plugin management](./plugin-management.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Admin rollout guide](./admin-rollout-guide.md)

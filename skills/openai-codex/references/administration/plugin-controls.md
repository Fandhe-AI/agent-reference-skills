# Plugin controls

Understand plugin availability, connector-backed capabilities, actions, and connected-system access.

## Overview

Workspace administrators govern plugin availability and connector access in ChatGPT and Codex through six distinct layers.

## Control layers

| Layer | Governs |
|-------|---------|
| Plugin availability | Whether plugins are accessible to users |
| Bundled skills | Reusable instructions shipped with installed plugins |
| Connector access | Whether connector-backed capabilities can be used |
| Connector actions | Which operations users can perform (read-only vs. custom vs. all) |
| Source authorization | External data access through authenticated identities in the connected service |
| Runtime permissions | Agent capabilities during execution |

## Management locations

- Workspace settings (web and desktop surfaces)
- CLI plugin browser (command-line installations)
- Workspace apps / Permissions & Roles sections

## Capability chain and rollout

- Terminology: **app** and **MCP server** refer to the same connected integration; UI labels such as **Workspace apps** and **App permissions** keep "app". A member can use an MCP server's capabilities only when the plugin and MCP server are available to their role and the authenticated account has access to the connected service (for a shared credential, the member also needs permission to use it). Installing a plugin for everyone doesn't, by itself, provide a shared account (see workspace connections guidance). Plugins in Sites let each visitor use their own connected accounts, with a separate Sites permission per plugin.
- Plugins work in Chat and Work across ChatGPT on the web, desktop, and mobile, in Codex in the ChatGPT desktop app, and through the Codex CLI plugin browser; they aren't available in the IDE extension. ChatGPT and Codex share one public plugin directory.
- Capability chain (use as a two-step rollout: first make the right plugins available, then configure capabilities and permissions): availability (workspace settings for web and desktop; the CLI plugin browser for CLI), included skills (the plugin package and skill controls), MCP server access (**Workspace apps** and **Permissions & roles**), actions and permissions (**Action control** and **App permissions**), service authorization (the connected service and its identity provider), runtime permissions (runtime, sandbox, and approval controls).
- Step 1: workspace plugin controls determine which roles can use or install a plugin; the Codex CLI uses its own plugin browser; import workspace plugins from GitHub with plugin-management.md. Export the public catalog: eligible Enterprise owners and admins open **Admin > Plugins**, select **Public**, and select **Export CSV**; the file `public-plugins-security-review.csv` contains `Plugin Name`, `Plugin Description`, `Date Added (UTC)`, `OpenAI Verified`, `Developer Name`, `Version`, `App Name(s)`, `App Description(s)`, `Skill Name(s)`, `Skill Description(s)` (semicolons separate multiple values); it uses a snapshot up to 48 hours old, includes only public plugins visible to the workspace (not plugins created for it), and isn't available in FedRAMP workspaces.
- Step 2: Manage capabilities from **Workspace apps** and **Permissions & roles**: enable MCP server connections by workspace role; for connections supporting **Action control** allow read-only actions or an approved custom set (including how newly added actions are handled); set **App permissions** for when ChatGPT asks before using a connection. Making an MCP server or plugin available doesn't grant access to files, records, or actions in the connected service; check the workspace role, approved action settings, then the account's permissions in the service. Conversation sync doesn't grant additional access; for Local computer access with Work Cloud, Agent Security's enterprise `apps` and `plugins` requirements apply to local executors (configure through TOML). Hook support is separate from plugin availability: command hooks and hooks from local configuration or plugins don't run under cloud orchestration even when the plugin is allowed.
- Managed settings: `features.plugins = false` disables plugins, and the managed `[marketplaces]` / `[plugins]` / `[skills]` settings control marketplace sources and plugin defaults (see managed-configuration.md and plugin-management.md).
- Restrict company app accounts to authorized workspaces: when activated, verified-domain restrictions prevent users from creating new connections to supported apps with company-domain accounts in personal or other unauthorized workspaces; verifying a domain doesn't activate the restriction, and existing connections aren't automatically disconnected.
- Choose a focused initial set: enable plugins for an approved business need, set each plugin's audience, complete required review; for each connected service record the business owner, permitted data, approved read or write actions, authentication method, and support or removal contact; start with read actions and everyday categories (email, calendar, file and document systems); before enabling write actions identify the plugin owner, review MCP server scopes and service permissions, confirm data access, and document external effects and a recovery path; test with an account that has only the intended permissions.
- Data flow: non-synced data from Chat and deep research is processed transiently and not indexed; synced connections index selected content in advance (the mode doesn't replace chat-retention controls); conversations using these connections remain available through the Compliance API. Connected-service guidance documents encryption in transit and at rest, per-user authorization, role and action controls, restricted network access, and no model training for Business, Enterprise, and Edu customers; the connected service's own policies also apply. For locally configured MCP servers see mcp-config.md.

## Notes

- For an initial rollout, start with everyday plugin categories (email, calendar, file/document systems such as Google Drive or Notion), read-only actions before write access, and review ownership/scopes/data impact first.
- Connectors operate transiently for non-synced use and respect per-user authorization; chats that use plugins remain available through the Compliance API regardless of sync status.
- Business, Enterprise, and Edu customer data isn't used for model training through plugin connectors.

## Related

- [Skill controls](./skill-controls.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [Admin rollout guide](./admin-rollout-guide.md)

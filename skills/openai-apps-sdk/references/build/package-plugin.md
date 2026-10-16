# Package your plugin

Assembles skills and (optionally) an MCP server into the installable plugin unit. The manifest gives the plugin a stable identity and tells ChatGPT/Codex which skills, MCP server connections, and resources belong together. The primary layout is the portable Agent Plugins package: root `plugin.json` + `mcp.json` + `skills/` + `assets/`. Public plugins publish once to the universal directory shared by ChatGPT and Codex; local/repo marketplaces are separate authoring and team-distribution sources.

## Signature / Usage

Portable root `plugin.json` (identity and portable metadata only):

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Bundle reusable skills and MCP servers.",
  "author": {
    "name": "Your team",
    "email": "team@example.com",
    "url": "https://example.com"
  },
  "homepage": "https://example.com/plugins/my-plugin",
  "repository": "https://github.com/example/my-plugin",
  "license": "MIT",
  "keywords": ["research", "crm"]
}
```

OpenAI-specific settings (`apps`, `hooks`, `interface`, `onboardingSkill`) go under `extensions.com.openai` in the same `plugin.json`:

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Reusable skills and MCP servers",
  "extensions": {
    "com.openai": {
      "apps": "./.app.json",
      "hooks": "./hooks/hooks.json",
      "interface": {
        "displayName": "My Plugin",
        "shortDescription": "Reusable skills and MCP servers",
        "longDescription": "Distribute skills and MCP servers together.",
        "developerName": "Your team",
        "category": "Productivity",
        "capabilities": ["Read", "Write"],
        "websiteURL": "https://example.com",
        "privacyPolicyURL": "https://example.com/privacy",
        "termsOfServiceURL": "https://example.com/terms",
        "defaultPrompt": [
          "Use My Plugin to summarize new CRM notes.",
          "Use My Plugin to triage new customer follow-ups."
        ],
        "brandColor": "#10A37F",
        "composerIcon": "./assets/icon.png",
        "logo": "./assets/logo.png",
        "screenshots": ["./assets/screenshot-1.png"]
      }
    }
  }
}
```

Root `mcp.json` for bundled MCP servers (portable format; each server declares a transport `type`):

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "docs": {
      "type": "streamable-http",
      "url": "https://example.com/mcp"
    }
  }
}
```

Per-server authentication under `extensions["com.openai"].auth` (registered OAuth client example):

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json",
  "mcpServers": {
    "docs": {
      "type": "streamable-http",
      "url": "https://example.com/mcp",
      "extensions": {
        "com.openai": {
          "auth": {
            "type": "oauth",
            "client": {
              "mode": "provided",
              "clientId": "docs-client",
              "tokenEndpointAuthMethod": "client_secret_basic"
            },
            "authorizationUrl": "https://example.com/oauth/authorize",
            "tokenUrl": "https://example.com/oauth/token",
            "baseScopes": ["docs:read"]
          }
        }
      }
    }
  }
}
```

Onboarding skill (`skills/setup/SKILL.md` in the package):

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Reusable skills with a guided setup workflow",
  "extensions": {
    "com.openai": {
      "onboardingSkill": "./skills/setup/SKILL.md"
    }
  }
}
```

Codex compatibility fallback, `.codex-plugin/plugin.json` (still supported; the `@plugin-creator` scaffold emits this layout):

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Bundle reusable skills and MCP servers.",
  "author": { "name": "Your team", "email": "team@example.com", "url": "https://example.com" },
  "homepage": "https://example.com/plugins/my-plugin",
  "repository": "https://github.com/example/my-plugin",
  "license": "MIT",
  "keywords": ["research", "crm"],
  "skills": "./skills/",
  "mcpServers": "./.mcp.json",
  "apps": "./.app.json",
  "hooks": "./hooks/hooks.json",
  "interface": {
    "displayName": "My Plugin",
    "shortDescription": "Reusable skills and MCP servers",
    "longDescription": "Distribute skills and MCP servers together.",
    "developerName": "Your team",
    "category": "Productivity",
    "capabilities": ["Read", "Write"],
    "websiteURL": "https://example.com",
    "privacyPolicyURL": "https://example.com/privacy",
    "termsOfServiceURL": "https://example.com/terms",
    "defaultPrompt": ["Use My Plugin to summarize new CRM notes."],
    "brandColor": "#10A37F",
    "composerIcon": "./assets/icon.png",
    "logo": "./assets/logo.png",
    "screenshots": ["./assets/screenshot-1.png"]
  }
}
```

```bash
codex plugin marketplace add owner/repo
codex plugin marketplace add owner/repo --ref main
codex plugin marketplace list
codex plugin marketplace upgrade
codex plugin marketplace remove marketplace-name
```

Installed-server policy (Codex config TOML):

```toml
[plugins."my-plugin".mcp_servers.docs]
enabled = true
default_tools_approval_mode = "prompt"
enabled_tools = ["search"]

[plugins."my-plugin".mcp_servers.docs.tools.search]
approval_mode = "approve"
```

## Options / Props

Root `plugin.json` and compatibility manifest:

| Field | Description |
|-------|-------------|
| `$schema` | `https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` for the portable manifest |
| `name`, `version`, `description` | Plugin identity; `name` stable, kebab-case, used as identifier and component namespace |
| `author`, `homepage`, `repository`, `license`, `keywords` | Publisher/discovery metadata |
| `skills` | Compatibility manifest only: path to bundled skill folders, relative to plugin root, `./`-prefixed. Portable packages discover skills from root `skills/`, so no `skills` field is needed |
| `mcpServers` | Compatibility manifest only: path to `.mcp.json`. Portable packages use root `mcp.json` |
| `extensions.com.openai.apps` | Points to `.app.json`, which maps a *registered* MCP server connection (not bundled) |
| `extensions.com.openai.hooks` | Path, array of paths, inline hooks object, or array of inline hooks objects; an explicit value replaces default `hooks/hooks.json` discovery |
| `extensions.com.openai.interface.*` | Install-surface metadata: display name, descriptions, category, capabilities, URLs, starter prompts, icons/screenshots |
| `extensions.com.openai.onboardingSkill` | Optional; path (relative to plugin root) to a skill in the package that runs as the setup workflow after install |

`mcp.json` server authentication, `extensions["com.openai"].auth`:

| Method | Configuration |
|--------|---------------|
| No authentication | `auth.type: "none"` |
| OAuth | `auth.type: "oauth"`, with optional client registration settings |
| Public and OAuth-protected access | `auth.type: "mixed"` |
| API key | `auth.type: "api_key"`, with a header scheme |

OAuth configuration reference (`type: "oauth"` or `"mixed"`):

| Field | Type | Description |
|-------|------|-------------|
| `client` | Object | Optional client registration configuration |
| `client.mode` | String | `provided`, `dcr`, or `cimd`. Required when `client` is present |
| `client.clientId` | String | Required for a `provided` client |
| `client.tokenEndpointAuthMethod` | String | Optional method for a provided client: `none`, `client_secret_basic`, `client_secret_post`, or `private_key_jwt` |
| `authorizationUrl` | String | Authorization endpoint override |
| `tokenUrl` | String | Token endpoint override |
| `registrationUrl` | String | Dynamic registration endpoint override |
| `authorizationServerBase` | String | Authorization server base override |
| `resource` | String | OAuth resource identifier override |
| `baseScopes` | Array of strings | Scopes included on every OAuth request |
| `defaultScopes` | Array of strings | Default scope override. An empty array requests no default scopes; omit the field to use client or server defaults |
| `oidcEnabled` | boolean | OpenID Connect (OIDC) override |
| `oidcConfigurationUrl` | String | OIDC discovery endpoint override |
| `oidcUserinfoEndpoint` | String | OIDC user information endpoint override |
| `oidcScopesSupported` | Array of strings | Supported OIDC scope override |

API-key `auth` (`type: "api_key"`):

| Field | Description |
|-------|-------------|
| `headerScheme` | `bearer`, `basic`, or `custom_header` |
| `headerName` | Required with `custom_header` and only allowed with it; `Host` is not allowed |

## Notes

- Portable layout: keep `plugin.json`, `mcp.json`, `skills/`, and `assets/` at the plugin root. When a Codex overlay is used, only its `plugin.json` goes inside `.codex-plugin/`; referenced hooks, `.app.json`, and other resources stay at the plugin root.
- Compatibility fallback: when `extensions.com.openai` is an object it replaces the entire `.codex-plugin/plugin.json` overlay as the source of OpenAI-specific settings; the two are not merged. If the inline object is absent, the compatibility overlay supplies those settings. Root identity and portable components stay canonical either way. Legacy packages can declare `hooks` directly in `.codex-plugin/plugin.json`; for the Codex compatibility format, `extensions.com.openai.onboardingSkill` goes in `.codex-plugin/plugin.json` and the path still resolves from the plugin root.
- `@plugin-creator` (Work mode in ChatGPT) / `$plugin-creator` (Codex) scaffolds the manifest and can generate a local marketplace entry from a registered MCP connection's `plugin_asdk_app...` ID. The current scaffold still emits the `.codex-plugin/` compatibility layout (`.codex-plugin/plugin.json`, `.mcp.json`, `.app.json`, `skills/`, `hooks/`, `scripts/`, `assets/`; only `plugin.json` is always created). To author a portable package, use root `plugin.json` and `mcp.json`. Do not just rename `.mcp.json`: the portable MCP format also declares a transport `type` for each server.
- Path rules: keep paths in `extensions.com.openai` or a compatibility manifest relative to the plugin root and start them with `./`; store `composerIcon`, `logo`, `screenshots` under `./assets/` when possible; use the OpenAI extension's `apps` field only for registered MCP server mappings in `.app.json`.
- Public examples: Figma (`github.com/openai/plugins/tree/main/plugins/figma`), Notion (`.../plugins/notion`), Build web apps (`.../plugins/build-web-apps`).
- Onboarding skill: optional; invoked in a new conversation, or in the existing one if the plugin was installed during it. Test both. Protocol: plugin onboarding specification in `openai/mcp-extensions` (`docs/spec.md#plugin-onboarding`).
- MCP auth: the manifest declares connection settings, not secrets. `clientSecret` is not accepted; supply it through the connection setup flow. For `dcr` / `cimd`, do not include `clientId` or client credentials; CIMD preference does not disable the DCR fallback. The schema also accepts `private_key_jwt`, but declaring it does not configure signing keys. Mixed authentication does not combine OAuth with a fixed API key. Endpoint overrides must be absolute HTTP/HTTPS URLs without embedded credentials or fragments; field names are case-sensitive (`clientId` inside `client`, not `oauth.client_id`). API-key declarations are not supported by the submission portal's connection form.
- Lifecycle hooks: supported for plugins installed manually in Codex desktop; plugins containing lifecycle hooks are not eligible for the public plugin directory. Plugin-bundled hooks are non-managed, so Codex skips them until the user reviews and trusts the current hook definition. An explicit `hooks` value replaces default `hooks/hooks.json` discovery rather than adding to it. Hook paths start with `./` and stay inside the plugin root. Hook commands receive `PLUGIN_ROOT` / `PLUGIN_DATA` (also mirrored as `CLAUDE_PLUGIN_ROOT` / `CLAUDE_PLUGIN_DATA`).
- For public submission, submit the remote HTTPS endpoint; local MCP servers follow the desktop-only submission path. Manifest submission fields live in `../deploy/submission.md`; they are not duplicated here.
- Marketplace file: repo-scoped at `$REPO_ROOT/.agents/plugins/marketplace.json` (legacy-compatible path `$REPO_ROOT/.claude-plugin/marketplace.json` also read), personal at `~/.agents/plugins/marketplace.json`. Each `plugins[]` entry needs `source.path` (or `source: "url"` / `"git-subdir"` / `"npm"`), `policy.installation`, `policy.authentication`, and `category`.
- Installed plugins live at `~/.codex/plugins/cache/$MARKETPLACE_NAME/$PLUGIN_NAME/$VERSION/`; local plugins use `$VERSION = local`.
- Workspace sharing (Share button on a plugin's detail page) is separate from marketplace/public publishing and stays within the workspace boundary; admins can disable via `features.plugin_sharing = false` in `requirements.toml`.

## Related

- [Build skills](./build-skills.md)
- [MCP server](./mcp-server.md)
- [Upload and submit your plugin](../deploy/submission.md)

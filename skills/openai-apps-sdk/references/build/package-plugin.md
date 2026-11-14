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
        "logo": "./assets/logo.png"
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
    "logo": "./assets/logo.png"
  }
}
```

```bash
codex plugin marketplace add owner/repo
codex plugin marketplace add owner/repo --ref main
codex plugin marketplace add https://github.com/example/plugins.git --sparse .agents/plugins
codex plugin marketplace add ./local-marketplace-root
```

```bash
codex plugin marketplace list
codex plugin marketplace upgrade
codex plugin marketplace upgrade marketplace-name
codex plugin marketplace remove marketplace-name
```

Marketplace file `$REPO_ROOT/.agents/plugins/marketplace.json` (local source entries):

```json
{
  "name": "local-example-plugins",
  "interface": {
    "displayName": "Local Example Plugins"
  },
  "plugins": [
    {
      "name": "my-plugin",
      "source": {
        "source": "local",
        "path": "./plugins/my-plugin"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    },
    {
      "name": "research-helper",
      "source": {
        "source": "local",
        "path": "./plugins/research-helper"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}
```

Git-backed entry (`"source": "url"` for a repo-root plugin, `"git-subdir"` for a subdirectory):

```json
{
  "name": "remote-helper",
  "source": {
    "source": "git-subdir",
    "url": "https://github.com/example/codex-plugins.git",
    "path": "./plugins/remote-helper",
    "ref": "main"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Productivity"
}
```

npm entry:

```json
{
  "name": "npm-helper",
  "source": {
    "source": "npm",
    "package": "@example/codex-plugin",
    "version": "^1.2.0",
    "registry": "https://registry.npmjs.org"
  },
  "policy": {
    "installation": "AVAILABLE",
    "authentication": "ON_INSTALL"
  },
  "category": "Productivity"
}
```

Per-repo enable/disable for a local-marketplace plugin (repo `.codex/config.toml`, key `plugin-name@marketplace-name`):

```toml
[plugins."my-plugin@local-repo"]
enabled = true
```

Default hooks file `hooks/hooks.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 ${PLUGIN_ROOT}/hooks/session_start.py",
            "statusMessage": "Loading plugin context"
          }
        ]
      }
    ]
  }
}
```

Explicit `hooks` override in root `plugin.json` (replaces default `hooks/hooks.json` discovery):

```json
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "repo-policy",
  "extensions": {
    "com.openai": {
      "hooks": ["./hooks/session.json", "./hooks/tools.json"]
    }
  }
}
```

OAuth `auth` objects for automatic client registration (same location as the registered-client example):

```json
{
  "type": "oauth",
  "client": {
    "mode": "dcr"
  },
  "registrationUrl": "https://example.com/oauth/register"
}
```

```json
{
  "type": "oauth",
  "client": {
    "mode": "cimd"
  }
}
```

API-key `auth` object (describes how a credential supplied during connection setup is sent; it contains no token):

```json
{
  "type": "api_key",
  "headerScheme": "bearer"
}
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
| `extensions.com.openai.interface.*` | Install-surface metadata: display name, descriptions, category, capabilities, URLs, starter prompts, icons |
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
- Path rules: keep paths in `extensions.com.openai` or a compatibility manifest relative to the plugin root and start them with `./`; store `composerIcon` and `logo` under `./assets/` when possible; use the OpenAI extension's `apps` field only for registered MCP server mappings in `.app.json`.
- Public examples: Figma (`github.com/openai/plugins/tree/main/plugins/figma`), Notion (`.../plugins/notion`), Build web apps (`.../plugins/build-web-apps`).
- Onboarding skill: optional (write it per the skills guide; Codex compatibility format puts the same field in `.codex-plugin/plugin.json`); when users run setup after installation it is invoked in a new conversation, or in the existing one if the plugin was installed during it. Test both. Protocol: plugin onboarding specification in `openai/mcp-extensions` (`docs/spec.md#plugin-onboarding`).
- MCP auth: the manifest declares connection settings, not secrets. `clientSecret` is not accepted; supply it through the connection setup flow. For `dcr` / `cimd`, do not include `clientId` or client credentials; CIMD preference does not disable the DCR fallback. The schema also accepts `private_key_jwt`, but declaring it does not configure signing keys. Mixed authentication does not combine OAuth with a fixed API key. Endpoint overrides must be absolute HTTP/HTTPS URLs without embedded credentials or fragments; field names are case-sensitive (`clientId` inside `client`, not `oauth.client_id`). API-key declarations are not supported by the submission portal's connection form (see Authentication limitations in `../deploy/submission.md`). `client.mode: "provided"` configures the plugin's OAuth client with your registered application's client ID: omit endpoint overrides when OAuth discovery supplies them and register the callback URL used by the connection flow with your OAuth provider. Token endpoint methods: `client_secret_basic` (HTTP Basic), `client_secret_post` (request body), `none` (public client). `dcr` uses `registrationUrl` (omit if discovery supplies it); `cimd` prefers Client Identifier Metadata Document. Scope strings need at least one non-whitespace character. Omitted optional OAuth values remain available for discovery. A fixed bearer token without an OAuth flow uses `api_key` with `headerScheme: "bearer"` (the object describes how to send a credential supplied at connection setup; it holds no token); an OAuth access token may also use the bearer scheme, and a fixed token does not replace OAuth client registration or user authorization.
- Lifecycle hooks: supported for plugins installed manually in Codex desktop; plugins containing lifecycle hooks are not eligible for the public plugin directory. When the plugin is enabled the Codex runtime loads its hooks alongside user, project, and managed hooks (ChatGPT Work and Codex). Hook scripts must exist in the execution environment: installing a plugin on the web does not deploy them; enterprise admins can deploy required scripts through MDM. Plugin-bundled hooks are non-managed, so Codex skips them until the user reviews and trusts the current hook definition (installing or enabling does not trust them). `hooks/hooks.json` is discovered by default only when the selected OpenAI extension or compatibility manifest does not define `hooks`; an explicit `hooks` value (path, array of paths, inline hooks object, or array of inline hooks objects) replaces default discovery rather than adding to it. Hook paths start with `./`, resolve relative to the plugin root, and stay inside it. Hook commands receive `PLUGIN_ROOT` (installed plugin root) / `PLUGIN_DATA` (writable data directory), also mirrored as `CLAUDE_PLUGIN_ROOT` / `CLAUDE_PLUGIN_DATA`. Hooks use the same event schema as regular hooks (see Hooks on Learn: https://learn.chatgpt.com/docs/hooks). `@plugin-creator` with hooks requested creates only an empty `hooks/` directory, not a hook configuration or script.
- For public submission, submit the remote HTTPS endpoint; local MCP servers follow the desktop-only submission path. Manifest submission fields live in `../deploy/submission.md`; they are not duplicated here.
- Marketplace file: repo-scoped at `$REPO_ROOT/.agents/plugins/marketplace.json` (legacy-compatible path `$REPO_ROOT/.claude-plugin/marketplace.json` also read), personal at `~/.agents/plugins/marketplace.json`. It controls plugin ordering and install policies in the ChatGPT desktop app; top-level `name` identifies the marketplace and `interface.displayName` is the title shown in the desktop app / marketplace picker. One marketplace can hold one plugin while testing and grow into a curated list (one object per plugin under `plugins[]`); restart the ChatGPT desktop app after editing.
- Marketplace entry rules: every `plugins[]` entry needs `source` (local `source.path`, or `source: "url"` for a repo-root plugin / `"git-subdir"` / `"npm"`), `policy.installation`, `policy.authentication`, and `category`. `source.path` is relative to the marketplace root (not to `.agents/plugins/`), starts with `./`, and stays inside that root. For local entries `source` can also be a plain string path such as `"./plugins/my-plugin"`. Common locations: `./plugins/` for repo installs, `./.codex/plugins/<plugin-name>` for personal installs; the directories are examples, not requirements.
- `policy.installation` values: `AVAILABLE`, `INSTALLED_BY_DEFAULT`, `NOT_AVAILABLE` (the official page lists them as "values such as"). `policy.authentication` decides whether auth happens on install (`ON_INSTALL`, used in all official examples) or on first use; the official page does not spell out an `ON_USE` value or any other detail beyond that.
- Git-backed entries may use `ref` or `sha` selectors; if Codex cannot resolve an entry's source it skips that entry instead of failing the whole marketplace. npm entries: `package` required (may include a registry scope); `version` optional (package versions, distribution tags, version ranges; not path or URL selectors); `registry` optional and must be an HTTPS URL without embedded credentials, query, or fragment. Codex downloads the package without running lifecycle scripts; the `npm` CLI must be installed and registry authentication comes from its configuration.
- Marketplace CLI: sources can be GitHub shorthand (`owner/repo` or `owner/repo@ref`), HTTP/HTTPS Git URLs, SSH Git URLs, or local marketplace root directories. `--ref` pins a Git ref; repeat `--sparse PATH` for a sparse checkout (valid only for Git sources). `list` prints each marketplace Codex is considering and its resolved root path, including local default marketplaces and configured snapshots. These commands support authoring and catalog setup; use the ChatGPT desktop app to install and test a local plugin. Administrators can also define local or Git marketplaces in system `config.toml` or cloud-managed configuration (same catalog format).
- Manual local plugin flow: create `my-first-plugin/plugin.json` (portable manifest with `$schema`, `name`, `version`, `description`), add `skills/<skill-name>/SKILL.md` (`name` + `description` frontmatter), add the plugin to a marketplace, restart the ChatGPT desktop app. Use a stable kebab-case `name`; portable packages need no `skills` field. After changing the plugin, update the directory the marketplace entry points to and restart the app.
- Test with a registered MCP server: in ChatGPT Plugins (chatgpt.com/plugins) select the plus button, **Add custom MCP server**, complete the form, accept the risk warning, select **Create as a plugin**, then copy the technical ID (starts with `plugin_asdk_app`) from the browser URL and give it to `@plugin-creator` (Work mode in ChatGPT) or `$plugin-creator` (Codex), e.g. "Use plugin_asdk_app_... and name it Acme Support. Include a personal marketplace entry so I can test it locally." Afterwards confirm `.app.json` maps the right `plugin_asdk_app...` ID, `apps` points to `./.app.json`, add bundled skills under `skills/`, refresh ChatGPT, install from the local source in the Plugins Directory and test in a new chat.
- Per-repo enable/disable: the repo marketplace only makes plugins discoverable; `.codex/config.toml` (trusted projects only) key `plugins."plugin-name@marketplace-name"` with `enabled = true|false` controls enablement without uninstalling. During marketplace refresh Codex can install or refresh files for configured plugins even when `enabled = false`; connected services still require authentication. Project settings override user, cloud-managed, and system defaults (subject to enforced requirements). These settings apply to local-marketplace plugins in supported local clients (Codex CLI, Codex in the ChatGPT desktop app); plugins imported via **Admin** > **Plugins** keep their workspace-managed enabled state. The plugin browser saves user-level choices in `~/.codex/config.toml`.
- Publish to workspace (workspace admins only): ChatGPT Plugins, **Personal**, plugin three-dot menu, **Publish**, choose the roles with access. This does not publish to the universal public directory; accounts not signed in to that workspace cannot access it.
- Installed plugins live at `~/.codex/plugins/cache/$MARKETPLACE_NAME/$PLUGIN_NAME/$VERSION/`; local plugins use `$VERSION = local`.
- Workspace sharing (Share button on a plugin's detail page) is separate from marketplace/public publishing and stays within the workspace boundary; admins can disable via `features.plugin_sharing = false` in `requirements.toml`.
- Source: https://developers.openai.com/plugins/build/plugins (local .md twin copy, fetched 2026-11-14).

## Related

- [Build skills](./build-skills.md)
- [MCP server](./mcp-server.md)
- [Upload and submit your plugin](../deploy/submission.md)

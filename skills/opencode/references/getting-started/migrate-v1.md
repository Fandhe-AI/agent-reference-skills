---
source: https://opencode.ai/docs/migrate-v1/
---

# Migrate from V1

OpenCode 1 and OpenCode 2 both use the `opencode` command and are no longer installed side by side by default. Remove a package-managed V1 installation before installing V2; the V2 curl installer replaces the V1 binary.

## Signature / Usage

### Breaking changes

V2 has three intentional breaking changes:

- [Plugins](https://opencode.ai/docs/build/plugins/migrate-v1/) use a new plugin API.
- The [server API and clients](#server-api-and-clients) have new contracts.
- [Terminal client configuration](https://opencode.ai/docs/cli/config/) moves from layered `tui.json(c)` files to one global `cli.json` file
  (auto-migrated).

Supported V1 functionality outside those areas is intended to remain compatible with V1. Some fields accepted by the V1
schema never had a V2 equivalent and are intentionally ignored; these are listed under
[Accepted but unsupported fields](./migrate-v1-configuration.md).

Existing supported server config fields, agent definitions, command definitions, skills, and other files in `.opencode/`
should continue to work without changes. If supported behavior described in this guide stops working in V2, treat it as a
compatibility bug rather than an expected migration requirement.

If supported V1 functionality does not work in V2, follow the issue-reporting guidance in
[Troubleshooting](https://opencode.ai/docs/troubleshooting/) and file a compatibility issue.

### Install V2

Install the V2 terminal client with the [installation instructions](https://opencode.ai/docs/#cli).

You do not need to rewrite everything before starting V2. A practical migration is:

1. Keep your existing configuration and file-based definitions.
2. Start V2 and verify models, credentials, agents, permissions, and MCP servers.
3. Port plugins, because V1 plugin implementations do not run in V2.
4. Port integrations that call the server API.
5. Convert configuration to the native V2 shape when you are ready. This step is optional.

Keep a copy of your V1 setup while validating the migration. V1 and V2 use the same configuration locations, so do not
point V1 at files after converting them to native V2-only shapes.

Configuration and file-based definitions are covered in [Migrate from V1: Configuration](./migrate-v1-configuration.md).

### Terminal client configuration

V2 replaces layered V1 `tui.json(c)` files with one global terminal client configuration file:

```text
~/.config/opencode/cli.json
```

The terminal client owns this file; the background service does not load it. When `cli.json` is absent, the first V2
terminal client startup migrates supported global `tui.json` settings and persisted preferences while leaving V1 files
unchanged. Project-local client configuration is not migrated because V2 client configuration is global. See
[CLI settings](https://opencode.ai/docs/cli/config/) for the current client settings reference.

### Plugins

Rename `plugin` to `plugins`. Replace a package-and-options tuple with an object:

```jsonc
// V1
{
  "plugin": ["opencode-example-plugin", ["./plugin/local.ts", { "enabled": true }]]
}

// V2
{
  "plugins": [
    "opencode-example-plugin",
    {
      "package": "./plugin/local",
      "options": { "enabled": true }
    }
  ]
}
```

V2 discovers local plugins from both `.opencode/plugin/` and `.opencode/plugins/`; use `.opencode/plugins/` for V2 files.
Configured local paths must be directories, so move the ported plugin to `./plugin/local/index.ts`.

V1 plugin implementations do not run in V2. Moving a file or renaming its config entry is not enough.

Port entrypoints, hooks, tools, events, and package exports with the dedicated
[plugin migration guide](https://opencode.ai/docs/build/plugins/migrate-v1/).

### Server API and clients

OpenCode 2 has a revised, more ergonomic server API and a new set of clients. Integrations that call the V1 server API
must migrate to the V2 API.

Use the `@opencode/client` package to access the released V2 API. See the generated [API reference](https://opencode.ai/docs/api/) for its
endpoints, request types, and responses.

#### Server authentication

V2 servers still use HTTP Basic auth, with these changes:

- `OPENCODE_PASSWORD` sets the password. `OPENCODE_SERVER_PASSWORD` still works.
- `OPENCODE_SERVER_USERNAME` is no longer supported. The username is always `opencode`.

```bash
# V1
OPENCODE_SERVER_USERNAME=alice OPENCODE_SERVER_PASSWORD=secret opencode serve

# V2
OPENCODE_PASSWORD=secret opencode serve
```

See [Web](https://opencode.ai/docs/cli/web/#authentication).

### Verify your setup

Verify your model, provider credentials, agents, permissions, MCP servers, and plugins in a project before relying on V2
for regular work. Keep your V1 setup until you have confirmed the V2 behavior you need, and do not point V1 at
configuration that you have converted to the native V2 shape.

## Notes

- V1 plugin implementations do not run in V2; they must be ported.
- OpenCode plugins, agents, commands, and permissions are distinct from Claude Code (anthropic-claude-code / anthropic-claude-code-extend / anthropic-claude-code-admin) concepts.
- In the V1 server auth example, `secret` is a placeholder value; use a strong password of your own.

## Related

- [Migrate from V1: Configuration](./migrate-v1-configuration.md)
- [Troubleshooting](./troubleshooting.md)
- [Overview](./overview.md)

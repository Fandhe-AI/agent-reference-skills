---
source: https://v2.tauri.app/reference/config/#pluginconfig
---

# PluginConfig (plugins.<name> keys cross-index)

The plugin configs hold a map from a plugin name to its configuration object (`plugins` in `tauri.conf.json`). The schema leaves the value free-form (`type: object`, `additionalProperties: true`); each plugin defines its own keys.

## Signature / Usage

```json
{
  "plugins": {
    "updater": {
      "pubkey": "CONTENT FROM PUBLICKEY.PEM",
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
      ]
    }
  }
}
```

## Options / Props

Cross-index of `plugins.<name>` keys that appear in the pinned docs (`tauri-docs@32f68c5`). Not exhaustive: only keys shown on the plugin pages are listed.

| `plugins.<name>` | Keys (as shown in docs) | Description | Plugin page |
| --- | --- | --- | --- |
| `updater` | `pubkey`, `endpoints`, `windows.installMode` | `pubkey` is the content of the generated public key; `endpoints` are update server URLs (supports `{{target}}`, `{{arch}}`, `{{current_version}}`). `windows.installMode` is `"passive"` (default; small progress window, no interaction), `"basicUi"` (basic UI requiring interaction) or `"quiet"` (no progress feedback; only works in user-wide installations or when the app already runs with admin privileges). Requires `bundle.createUpdaterArtifacts`. | [updater](../plugins-app/updater.md) |
| `deep-link` | `mobile[]` (`scheme`, `appLink`, `host`, `pathPrefix`), `desktop.schemes` | Mobile: `{"scheme": ["ovi"], "appLink": false}` registers a custom scheme; `{"scheme": ["https"], "host": "your.website.com", "pathPrefix": ["/open"], "appLink": true}` registers an App Link / Universal Link. Desktop: `{"schemes": ["something", "my-tauri-app"]}`. | [deep-linking](../plugins-app/deep-linking.md) |
| `cli` | `description`, `args[]` (`short`, `name`, ...), `subcommands` | Defines the command-line interface parsed by the CLI plugin. | [cli](../plugins-core/cli.md) |
| `fs` | `requireLiteralLeadingDot` | Whether dot-prefixed path components must be matched literally in scope patterns (`false` allows `*` etc. to match them). | [file-system](../plugins-core/file-system.md) |
| `sql` | `preload` | Database connection strings to load (and run migrations for) at startup, e.g. `["sqlite:mydatabase.db"]`. | [sql](../plugins-core/sql.md) |

## Notes

- Platform-specific configs (`tauri.linux.conf.json` etc.) are merged with the main file; the docs example sets `"plugins": { "cli": { "description": "My app", "subcommands": { "update": {} } }, "deep-link": {} }` in a platform file.
- Plugins that need no configuration are simply omitted (or set to `{}`, as in `"deep-link": {}`).
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.PluginConfig`); keys from `tauri-apps/tauri-docs@32f68c5` `plugin/{updater,deep-linking,cli,file-system,sql}.mdx` and `develop/configuration-files.mdx`.

## Related

- [Configuration (root Config)](./overview.md)
- [BundleConfig](./bundle-config.md)

<!-- source: https://code.claude.com/docs/en/plugin-relevance.md / last verified: 2026-08-07 -->

# Recommend plugins for your org

Add a relevance block to marketplace plugin entries so Claude Code suggests them when a user's work matches.

## Signature / Usage

```json
{
  "name": "terraform-helpers",
  "source": "./plugins/terraform-helpers",
  "relevance": {
    "topic": "Terraform",
    "signals": {
      "cli": ["terraform"],
      "filesRead": ["**/*.tf"]
    }
  }
}
```

```json
// managed-settings.json — required to activate suggestions
{
  "extraKnownMarketplaces": {
    "acme-corp-plugins": { "source": { "source": "github", "repo": "acme-corp/claude-plugins" } }
  },
  "pluginSuggestionMarketplaces": ["acme-corp-plugins"]
}
```

## Options / Props

| `relevance.signals` field | Type | Matches |
| --- | --- | --- |
| `cwd` | string[] (max 10) | Glob against session working directory; only signal that can match before the first turn |
| `cli` | string[] (max 10) | Exact command names run this session |
| `hosts` | string[] (max 20) | Bare lowercase hostnames from `http(s)://` URLs in Bash commands |
| `filesRead` | string[] (max 10) | Glob against paths of files Claude has read |
| `manifestDeps` | object[] (max 10) | `{file, pattern}` regex pair matched against manifest file path/contents |

## Notes

- Declaring `relevance` in `marketplace.json` is not enough on its own — an administrator must allowlist the marketplace in `pluginSuggestionMarketplaces` (managed settings) before suggestions appear; this applies even to the official Anthropic marketplace.
- Signal matching happens entirely locally; no network traffic and no reporting of matched signals to Anthropic or the marketplace operator.
- Surfaces: spinner tip (`Working with <topic>? Install the <plugin> plugin`), session-start notification (`cwd` signal only), and a pinned entry in the `/plugin` Discover tab.
- Requires Claude Code v2.1.152+; older clients ignore `relevance`.
- Claude Code never installs a plugin automatically — the user always confirms.

## Related

- [Create and distribute a plugin marketplace](./plugin-marketplaces.md)
- [Recommend your plugin from your CLI](./plugin-hints.md)

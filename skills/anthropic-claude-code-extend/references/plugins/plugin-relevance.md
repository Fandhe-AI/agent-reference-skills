<!-- source: https://code.claude.com/docs/en/plugins/relevance.md / last verified: 2026-10-17 -->

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

- `relevance.topic` (optional, max 64 characters) fills "Working with *topic*?" in the spinner tip and defaults to the plugin name with each hyphen segment capitalized; Claude Code suggests the plugin only if at least one signal is set. Signal limits: `cwd` 10 patterns of 256 characters, `cli` 10 entries of 64, `hosts` 20 entries of 128 (bare lowercase hostname, case-insensitive exact match), `filesRead` 10 patterns of 256 (forward-slash normalized, case-insensitive), `manifestDeps` 10 entries with each value at most 256 characters (manifest files over 512 KB are skipped). `filesRead` and `manifestDeps` also match files Claude has written or edited and the project's auto-loaded `CLAUDE.md` files.
- `cwd` is matched against the working directory as an absolute path and, inside a git repository, also its path relative to the repository root; each pattern matches the directory and everything under it (`infra`, `infra/`, `infra/**` behave identically). `cli` records one command name per shell command: the first token after leading environment variable assignments and `sudo`, so `cd infra && terraform plan` records `cd`. `manifestDeps` entries pair two JavaScript RegExp source strings: `file` (case-insensitive against the manifest path, typically absolute, no separator normalization, so anchor at the end and allow backslashes, e.g. `[/\\\\]package\\.json$`) and `pattern` (case-sensitive against the file's contents).
- Unknown fields under `relevance` and `relevance.signals` are ignored at load time, but a recognized field exceeding its limit invalidates the whole plugin entry (users can't install it until fixed). `claude plugin validate ./my-marketplace` reports unknown keys (warnings), a non-object `relevance`, and a `hosts` entry with a scheme, port or path.
- Allowlisting: add the marketplace name to `pluginSuggestionMarketplaces`; for any marketplace other than the official one, also declare its source in `extraKnownMarketplaces` or `strictKnownMarketplaces` (no suggestions appear if the marketplace is unregistered or registered under that name from a different source). The official marketplace needs only `{ "pluginSuggestionMarketplaces": ["claude-plugins-official"] }`.
- Suggestion frequency: at most once every three sessions across the spinner tip and session-start notification combined; the session-start notification stops after the two surfaces have shown the plugin twice in total; neither repeats once the plugin is installed; the Discover tab pins the plugin the first time the user opens it while signals match (recorded in `~/.claude.json`). The spinner tip and session-start notification also stop when `spinnerTipsEnabled` is `false` or a `spinnerTipsOverride` with `excludeDefault` replaces the built-in tips; the Discover pin isn't affected. Notification text: `plugin suggestion: terraform-helpers@your-marketplace · /plugin`.
- Declaring `relevance` in `marketplace.json` is not enough on its own — an administrator must allowlist the marketplace in `pluginSuggestionMarketplaces` (managed settings) before suggestions appear; this applies even to the official Anthropic marketplace.
- Signal matching happens entirely locally; no network traffic and no reporting of matched signals to Anthropic or the marketplace operator.
- Surfaces: spinner tip (`Working with <topic>? Install the <plugin> plugin`), session-start notification (`cwd` signal only), and a pinned entry in the `/plugin` Discover tab.
- Requires Claude Code v2.1.152+; older clients ignore `relevance`.
- Claude Code never installs a plugin automatically — the user always confirms.

## Related

- [Create and distribute a plugin marketplace](./plugin-marketplaces.md)
- [Recommend your plugin from your CLI](./plugin-hints.md)

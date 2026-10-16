<!-- source: https://code.claude.com/docs/en/plugins/host-marketplace.md / last verified: 2026-10-17 -->

# Host and maintain a marketplace

Host a `marketplace.json` catalog where users can add it with `/plugin marketplace add`, grant access to private ones, and release updates and renames without breaking installs.

## Signature / Usage

```json
{
  "name": "your-marketplace",
  "owner": { "name": "Your Org" },
  "plugins": [
    { "name": "code-formatter", "source": "./plugins/code-formatter" }
  ],
  "renames": {
    "formatter": "code-formatter",
    "legacy-linter": null
  }
}
```

```text
/plugin marketplace add your-org/your-marketplace
/plugin marketplace add https://gitlab.example.com/team/plugins.git
/plugin marketplace add https://plugins.example.com/marketplace.json
/plugin marketplace add /Volumes/shared/claude-plugins
/plugin marketplace add your-org/your-marketplace#stable     # pin branch or tag
```

## Options / Props

| Host | Users need |
| --- | --- |
| GitHub | `git`; private repo needs stored credentials |
| Other git host (GitLab, Bitbucket, GHES) | `git` and the full URL (`owner/repo` shorthand always means github.com) |
| Hosted `marketplace.json` URL | HTTPS access; no `git` for the catalog |
| Shared directory | Read access to the path |

| Download limit | Largest | Response time | Redirects |
| --- | --- | --- | --- |
| `marketplace.json` from a `url` source | 5 MiB | 10 s | Cross-origin redirect must use `https://` and not target loopback / link-local / cloud-metadata hosts |
| Zip from an `archive` source | 256 MiB | 120 s | At most five; each `https://`, same host restrictions |

Archive extraction limits: 100,000 entries; 512 MiB per file; 1 GiB total uncompressed; 50x compression ratio.

| `headersHelper` placement | Headers apply to | Helper runs |
| --- | --- | --- |
| Marketplace `url` source | Archive downloads on that URL's origin | Before each `marketplace.json` fetch and archive download on that origin (output reused up to 60 s) |
| Plugin entry (v2.1.238+; entry needs `"strict": false`) | That entry's download only | Only when a user installs/updates that plugin alone and accepts the command |

## Notes

- A successful add prints `Successfully added marketplace: <name>`; the name comes from the `name` field of `marketplace.json`, not the repository name.
- Register for everyone in a repo: `claude plugin marketplace add your-org/your-marketplace --scope project`, then commit the written `.claude/settings.json`.
- Relative-path `source` entries fail in a bare-URL marketplace (only the JSON file is downloaded); use `github` / `archive` sources or host in git.
- Git LFS files arrive as pointer files (clones never download LFS content).
- Symlinks when copying to cache: within the plugin dir are preserved; elsewhere in the same marketplace are dereferenced; outside the marketplace are skipped.
- Organization sync (Team/Enterprise): Organization settings > Plugins & skills on claude.ai; repo must be private/internal on github.com and gitlab.com; claude.ai rejects a plugin with a top-level `bin/` directory.
- Private access: Claude Code runs `git` non-interactively with the machine's existing credentials; no token field exists in `marketplace.json`. GitHub `owner/repo` probes `ssh -T git@github.com`, else HTTPS; `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` skips the probe. HTTPS needs a stored credential (e.g. `gh auth login` then `gh auth setup-git`).
- `archive` source (v2.1.224+) needs no git account; pin with `sha256`.
- Background auto-update on private marketplaces re-clones on new commits or on auth failure; `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1` keeps the existing checkout instead.
- Auto-update is off by default and has no `marketplace.json` field; users enable it under **Marketplaces** in `/plugin`, or admin sets `"autoUpdate": true` on `extraKnownMarketplaces`. Manual: `/plugin marketplace update <name>` or `claude plugin update <plugin>@<name>`.
- Release by changing `version` (plugin.json first, then marketplace entry); do not set it in both (validate reports the mismatch). Omit `version` to track commits. Local-path in-place plugins load current files every session.
- Pin versions with `ref` / `sha` on the entry, `#<ref>` on add, or `<plugin>--v<version>` tags.
- Release channels: two marketplaces with different `name` values pointing at different refs; one marketplace serves one version per plugin.
- `renames` map: old name to new name or `null`; append-only; `claude plugin validate .` rejects chains that do not resolve. `forceRemoveDeletedPlugins: true` uninstalls removed plugins at session start and flags them `Removed from marketplace`. Managed-settings `enabledPlugins` cannot be rewritten (notice recurs).
- Changing a `command` source's command or `mode` requires each user to accept it again.
- `headersHelper` command: at most 500 printable ASCII characters; prints one JSON object of string values on stdout, exit 0 within 10 s; run through `sh` (or `cmd.exe`) in the config directory; credential-like env vars are removed when set in marketplace entries or project settings; skipped for non-`https://` marketplace URLs, off-origin redirects, `--add-dir` settings, or when `disableCommandPluginSources` / `allowManagedHooksOnly` block it.
- No marketplace field exists for: audience-specific entries, deprecation state, forced install, git credentials.

## Related

- [Publish and distribute a plugin](./publish-plugin.md)
- [Marketplace reference](./marketplace-reference.md)
- [Manage plugins for your organization](./plugins-org.md)
- [Plugin dependencies](./plugin-dependencies.md)
- [Plugin relevance](./plugin-relevance.md)
- [Troubleshoot plugins](./plugins-troubleshooting.md)

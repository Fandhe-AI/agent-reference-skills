<!-- source: https://code.claude.com/docs/en/plugins/publish.md / last verified: 2026-10-17 -->

# Publish and distribute a plugin

Publish a plugin by listing it in a marketplace (your own or Anthropic's directory), or share it without publishing as a directory or `.zip`.

## Signature / Usage

```json
// .claude-plugin/marketplace.json (plugin's own repository, source "./" = repo root)
{
  "name": "your-marketplace",
  "owner": { "name": "Your Name" },
  "plugins": [
    { "name": "deploy-helper", "source": "./" }
  ]
}
```

```bash
claude plugin validate --strict ./your-plugin
claude plugin marketplace add your-org/your-marketplace
claude plugin install deploy-helper@your-marketplace
claude plugin update deploy-helper@your-marketplace
claude plugin tag --push        # creates {name}--v{version}
```

## Options / Props

| Route | Who can install | Auto-updates |
| --- | --- | --- |
| No marketplace | People you send the folder or `.zip` to | None |
| Your own marketplace | Anyone who can reach the repository (private repo = private marketplace) | Off by default |
| Anthropic's directory | People who add it on claude.ai / Cowork; also loads in Claude Code via account sync as `<name>@synced` | Yes, after the pushed version is published |

| Pre-release step | Detail |
| --- | --- |
| Permanent name | kebab-case (validate warns otherwise); users install by `name@marketplace`; set `displayName` for the label |
| Versioning | Increment `version` each release, or omit it in a git-hosted marketplace to use commit SHA |
| Validate | `claude plugin validate --strict ./your-plugin`; prints `✔ Validation passed`; `--strict` exits 1 on warnings |
| Local install test | `claude plugin marketplace add ./path-to-marketplace`, install, start a session |
| Metadata | `description`, `author`, `homepage` (must parse as URL), `repository`, plus root `README.md` |
| Evals | `claude plugin eval` |

## Notes

- If `version` is set and not changed, `claude plugin update` prints `<name> is already at the latest version (1.0.0).` and users keep the old copy.
- In plugin hook commands and MCP configs refer to files as `${CLAUDE_PLUGIN_ROOT}/...`; validation reports component paths not starting with `./`.
- Sharing without a marketplace: `claude --plugin-dir ./deploy-helper` (clone, unzipped folder, or the `.zip`) for one session; `--plugin-url` pointed at a release `.zip`; or place the directory with its `.claude-plugin/plugin.json` under `~/.claude/skills/` for every session.
- One-command install: `/plugin install deploy-helper --marketplace your-org/your-marketplace` needs Claude Code v2.1.275+; `claude plugin install deploy-helper --marketplace ...` from the shell needs v2.1.292+.
- Directory submission: developer portal at claude.ai/directory/manage; requires a paid claude.ai plan (Pro/Max own account; Team/Enterprise Owner, Enterprise can grant the **Directory** permission). The official marketplace `claude-plugins-official` does not take portal submissions. The portal applies extra rules the CLI does not check. Some components are Claude Code-only and do not load on claude.ai / Cowork.
- Never rename a published plugin: existing installs lose it. If unavoidable use the marketplace `renames` map; change `displayName` for a different label.
- Tag releases only when other plugins declare a version range on yours; tags are `{name}--v{version}`.
- `dependencies` in `plugin.json`: bare names or objects with a semver `version` range; the dependency is installed and enabled too.

## Related

- [Plugin marketplaces](./plugin-marketplaces.md)
- [Host and maintain a marketplace](./host-marketplace.md)
- [Plugin dependencies](./plugin-dependencies.md)
- [Recommend your plugin from your CLI](./plugin-hints.md)
- [Measure plugin cost and usage](./measure-plugin.md)

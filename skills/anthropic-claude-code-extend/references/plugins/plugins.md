<!-- source: https://code.claude.com/docs/en/plugins/create.md / last verified: 2026-10-17 -->

# Create a Claude Code plugin

Build your first Claude Code plugin from an empty directory, test it without a marketplace, and convert an existing `.claude/` setup. A plugin is a directory of skills, agents, hooks, and MCP servers, plus a `plugin.json` manifest that names the plugin; Claude Code loads the directory as one unit.

## Signature / Usage

```bash
mkdir -p my-first-plugin/.claude-plugin
# my-first-plugin/.claude-plugin/plugin.json
# {
#   "name": "my-first-plugin",
#   "description": "A greeting plugin to learn the basics",
#   "version": "1.0.0",
#   "author": { "name": "Your Name" }
# }

mkdir -p my-first-plugin/skills/hello
# my-first-plugin/skills/hello/SKILL.md
# ---
# name: hello
# description: Greet the user with a friendly message
# disable-model-invocation: true
# ---
# Greet the user warmly and ask how you can help them today.

claude plugin validate ./my-first-plugin
claude --plugin-dir ./my-first-plugin
# /my-first-plugin:hello
```

## Options / Props

Plugin layout (the directories most plugins start with; the full layout is on the manifest reference):

| Location | Contents |
| --- | --- |
| `.claude-plugin/plugin.json` | The manifest. When you load a plugin with `--plugin-dir` and it has no manifest, Claude Code names the plugin after its directory |
| `skills/` | One `<name>/SKILL.md` directory per skill |
| `commands/` | Flat Markdown files, the older form of skills. Use `skills/` for new plugins |
| `agents/` | One Markdown file per subagent |
| `hooks/hooks.json` | Hook configuration: a top-level `"hooks"` key whose value has the same shape as `hooks` in a settings file |
| `.mcp.json` | MCP server definitions |

Ways to develop without a marketplace:

| Mechanism | Behavior |
| --- | --- |
| `claude --plugin-dir <dir-or-.zip>` | Loads a plugin directory or `.zip` archive for one session; repeat the flag for several. Passing a folder of plugins (no `.claude-plugin/` and no components at its top level) loads each immediate subfolder with a manifest (v2.1.265+); a folder that also holds a `.claude-plugin/marketplace.json` without a `plugin.json` still loads its plugin folders, and the marketplace file isn't read (v2.1.281+) |
| `claude --plugin-url <zip-url>` | Fetches a `.zip` archive at startup for one session; repeat the flag or pass space-separated URLs in one quoted argument. Point it only at archives you control or trust |
| `CLAUDE_CODE_PLUGIN_DIRS` | Absolute paths of plugins to load in sessions where you can't add the flag; in addition to `--plugin-dir` (v2.1.280+; project and local settings can't set it) |
| `claude plugin init <name> [--with skills]` | Scaffolds `~/.claude/skills/<name>/` with `.claude-plugin/plugin.json` and a root `SKILL.md`; auto-loads every session as `<name>@skills-dir` |

## Notes

- Standalone (`.claude/`) configuration is best for personal or single-project work; make a plugin to share with teammates, install in several projects, or publish versioned releases. Plugin skills and agents get the plugin name as a prefix (`/my-plugin:hello`), so two plugins can each provide `hello`.
- Only `plugin.json` goes inside `.claude-plugin/`; components saved there don't load. The plugin root is the plugin's own directory, not `~/.claude/` itself (a `.mcp.json` at `~/.claude/.mcp.json` doesn't load).
- Edits during a session apply with `/reload-plugins`. Loading a plugin or folder mid-conversation that would invalidate the prompt cache is held until you run `/reload-plugins`.
- `claude plugin init` root skill is also a personal skill (`/my-tool`, not `/my-tool:my-tool`); skills under its `skills/` get the prefix (`/my-tool:example`). Stop loading it by deleting the directory or `claude plugin disable my-tool@skills-dir`. To load a plugin for everyone in one repository, create the same layout at `<project>/.claude/skills/<name>/` including `.claude-plugin/plugin.json`.
- Test and debug order: `claude plugin validate <path>` (exit `0` on `Validation passed`; `--strict` fails on warnings too), `/reload-plugins`, `/plugin` (**Installed** tab for found components, **Errors** tab for load failures), then `claude plugin list` (pass `--plugin-dir` before `plugin list` to include the plugin under development). Check an MCP server with `/mcp`; check a hook by triggering its event and reading the debug log.
- Common failures: `<component> path not found: <path>` (a manifest path such as `commands` / `skills` / `agents` / `hooks` points at nothing); `--plugin-dir` pointed at a marketplace root doesn't load plugins under `plugins/` and shows no error (point it at one plugin's folder, or add the marketplace); the plugin loads but skills are missing (`skills/` is inside `.claude-plugin/`, or a `skills` entry points at a file); the `userConfig` dialog never appears with `--plugin-dir` or `claude plugin install` (it is part of installing through `/plugin`; run `/plugin configure <plugin-name>` in the session).
- To check that a plugin changes Claude's behavior, `claude plugin eval` runs your test cases with and without the plugin and scores the difference; see plugin-evals.md.
- Convert an existing `.claude/` setup: create `my-plugin/.claude-plugin/plugin.json`, copy `.claude/commands`, `.claude/agents`, `.claude/skills` to the plugin root, move the `hooks` object from settings into `hooks/hooks.json`, test with `--plugin-dir`, then delete the originals. While originals remain, skills and agents don't collide (prefix) but hooks have no prefix and run twice.
- To get it to other people: send the directory or a `.zip`, list it in your own marketplace, or submit it to Anthropic's directory; see publish-plugin.md. The per-component details are in plugin-components.md.
- The old URL `/docs/en/plugins.md` now serves the Plugins overview (see plugins-overview.md); this page's canonical source is `/docs/en/plugins/create`.
- Loading a plugin from the SDK is a distinct integration surface; for details see the Agent SDK plugin-loading docs (`anthropic-agent-sdk`).

## Related

- [Plugin manifest reference](./plugins-reference.md)
- [Plugin components](./plugin-components.md)
- [Test plugins with evals](./plugin-evals.md)
- [Publish a plugin](./publish-plugin.md)
- [Install and manage plugins](./discover-plugins.md)
- [Create a marketplace](./plugin-marketplaces.md)

# package-and-marketplace

Package a plugin manually, scaffold it with `@plugin-creator`, and manage local marketplace sources with the `codex plugin marketplace` CLI. Public submission itself is a form-based flow in the plugin submission portal (platform.openai.com/plugins) with no CLI commands; see the source pages linked below for that process.

## Scaffold a plugin with @plugin-creator (chat prompt)

Give this prompt to `@plugin-creator` in Work mode in ChatGPT, or `$plugin-creator` in Codex, after registering the MCP server connection and copying its `plugin_asdk_app...` ID:

```text
@plugin-creator create a plugin for ChatGPT and Codex using my MCP server.
Use plugin_asdk_app_6a4c0062f3b88191855c0a80eac5d53d and name it Acme Support.
Include a personal marketplace entry so I can test it locally.
```

Source: https://developers.openai.com/plugins/build/plugins

## Create a plugin manually

```bash
mkdir -p my-first-plugin/.codex-plugin
```

Create the manifest at `my-first-plugin/.codex-plugin/plugin.json`:

```json
{
  "name": "my-first-plugin",
  "version": "1.0.0",
  "description": "Reusable greeting workflow",
  "skills": "./skills/"
}
```

Add a skill under `skills/<skill-name>/SKILL.md`:

```bash
mkdir -p my-first-plugin/skills/hello
```

Source: https://developers.openai.com/plugins/build/plugins

## Install a plugin into a repo marketplace

> **Warning**: `cp -R` overwrites an existing directory of the same name at the destination without confirmation.

```bash
mkdir -p ./plugins
cp -R /absolute/path/to/my-plugin ./plugins/my-plugin
```

Then add or update `$REPO_ROOT/.agents/plugins/marketplace.json` so its `source.path` points to `./plugins/my-plugin`, and restart the ChatGPT desktop app.

Source: https://developers.openai.com/plugins/build/plugins

## Install a plugin into a personal marketplace

> **Warning**: `cp -R` overwrites an existing directory of the same name at the destination without confirmation.

```bash
mkdir -p ~/.codex/plugins
cp -R /absolute/path/to/my-plugin ~/.codex/plugins/my-plugin
```

Then add or update `~/.agents/plugins/marketplace.json` so its `source.path` points to that directory, and restart the ChatGPT desktop app.

Source: https://developers.openai.com/plugins/build/plugins

## Add a marketplace from the CLI

```bash
codex plugin marketplace add owner/repo
codex plugin marketplace add owner/repo --ref main
codex plugin marketplace add https://github.com/example/plugins.git --sparse .agents/plugins
codex plugin marketplace add ./local-marketplace-root
```

Marketplace sources can be GitHub shorthand (`owner/repo` or `owner/repo@ref`), HTTP/HTTPS Git URLs, SSH Git URLs, or local marketplace root directories. `--ref` pins a Git ref; repeat `--sparse PATH` for a sparse checkout of Git-backed sources (`--sparse` is valid only for Git marketplace sources).

Source: https://developers.openai.com/plugins/build/plugins

## Inspect, refresh, or remove a configured marketplace

> **Warning**: `codex plugin marketplace remove marketplace-name` drops that configured marketplace source. `codex plugin marketplace upgrade` with no name refreshes every configured marketplace, not just one.

```bash
codex plugin marketplace list
codex plugin marketplace upgrade
codex plugin marketplace upgrade marketplace-name
codex plugin marketplace remove marketplace-name
```

`codex plugin marketplace list` prints each marketplace Codex is considering and the root path it resolves from.

Source: https://developers.openai.com/plugins/build/plugins

## Disable plugin sharing workspace-wide

> **Warning**: This setting is organization-wide and disables plugin sharing for every member of the workspace, not just the current user.

Add to `requirements.toml`:

```toml
features.plugin_sharing = false
```

Source: https://developers.openai.com/plugins/build/plugins

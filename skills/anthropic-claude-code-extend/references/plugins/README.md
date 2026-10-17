# plugins

| Name | Description | Path |
| --- | --- | --- |
| Anthropic's marketplaces | Anthropic publishes three general-purpose plugin marketplaces (official, community, demo); the name is used after `@` when installing. | [anthropic-marketplaces.md](./anthropic-marketplaces.md) |
| Code intelligence plugins | A code intelligence plugin connects Claude Code to a language server (LSP) for diagnostics after edits and symbol navigation. | [code-intelligence.md](./code-intelligence.md) |
| Install and manage plugins | Install plugins from a marketplace on any surface, choose an install scope, add marketplaces, and update or remove plugins. | [discover-plugins.md](./discover-plugins.md) |
| Host and maintain a marketplace | Host a `marketplace.json` catalog, grant access to private ones, and release updates and renames without breaking installs. | [host-marketplace.md](./host-marketplace.md) |
| Marketplace reference | Complete reference for `marketplace.json` fields, plugin entries, source objects, and `claude plugin validate` messages. | [marketplace-reference.md](./marketplace-reference.md) |
| Measure plugin cost and usage | See a plugin's token cost, check whether it is still used, and pick telemetry events for organization-wide questions. | [measure-plugin.md](./measure-plugin.md) |
| Plugin commands reference | The `claude plugin` shell commands, `/plugin` and `/reload-plugins` in a session, and the flags that load a plugin for one session. | [plugin-cli-reference.md](./plugin-cli-reference.md) |
| Add components to a plugin | Add skills, commands, agents, hooks, MCP servers, LSP servers, executables, default settings, themes, output styles, channels, and monitors. | [plugin-components.md](./plugin-components.md) |
| Constrain plugin dependency versions | Declare version constraints on plugin dependencies and bundle a curated plugin set behind one install. | [plugin-dependencies.md](./plugin-dependencies.md) |
| Test plugins with evals | Run `claude plugin eval` against a suite of cases (prompt plus graders), compare with a no-plugin baseline, and gate CI. | [plugin-evals.md](./plugin-evals.md) |
| Recommend your plugin from your CLI | Emit a one-line marker from your CLI so Claude Code prompts users to install your official plugin. | [plugin-hints.md](./plugin-hints.md) |
| Plugin loading reference | Rules applied at session start and on `/reload-plugins`: where each plugin loads from, which settings decide loading, and why an update changed nothing. | [plugin-loading.md](./plugin-loading.md) |
| Create a marketplace | Build a marketplace from a `marketplace.json` file, test it locally, and push it to a git host for registration. | [plugin-marketplaces.md](./plugin-marketplaces.md) |
| Recommend plugins for your org | Add a relevance block to marketplace plugin entries so Claude Code suggests them when a user's work matches. | [plugin-relevance.md](./plugin-relevance.md) |
| Plugin security and trust | An installed plugin can execute arbitrary code with your user privileges; review each plugin before installing. | [plugin-security.md](./plugin-security.md) |
| Manage Claude Code plugins for your organization | Control which plugins Claude Code installs and allows across an organization through managed settings. | [plugins-org.md](./plugins-org.md) |
| Plugins overview | A plugin is a directory of skills, agents, hooks, MCP servers, or other components that Claude Code loads as one unit. | [plugins-overview.md](./plugins-overview.md) |
| Plugin manifest reference | Complete reference for `plugin.json`: every field with its type and default, accepted path forms, and the `userConfig` and environment variable schemas. | [plugins-reference.md](./plugins-reference.md) |
| Troubleshoot plugins | Error messages and symptoms for Claude Code plugins and marketplaces, grouped by stage, each with cause and one fix. | [plugins-troubleshooting.md](./plugins-troubleshooting.md) |
| Create a Claude Code plugin | Build your first plugin from an empty directory, test it without a marketplace, and convert an existing `.claude/` setup. | [plugins.md](./plugins.md) |
| Publish and distribute a plugin | Publish a plugin by listing it in a marketplace (your own or Anthropic's directory), or share it as a directory or `.zip`. | [publish-plugin.md](./publish-plugin.md) |

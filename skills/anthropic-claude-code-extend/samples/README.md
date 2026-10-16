# samples

| Name | Description | Path |
| --- | --- | --- |
| Block edits to protected files with a PreToolUse hook | Prevent Claude from modifying sensitive files (`.env`, `package-lock.json`, `.git/`) by running a script before every `Edit`/`Write` call; the script exits 2 to block, and Claude receives the reason as feedback. | [hook-config.md](./hook-config.md) |
| Project-scoped MCP servers via .mcp.json | Hand-written `.mcp.json` at the project root, defining an HTTP server and a local stdio server; checked into version control so teammates get the same servers on clone. | [mcp-config.md](./mcp-config.md) |
| Mod: first-mod | A three-file mod that counts Claude's tool calls, shows the count beside the spinner, and adds a `/tally` command. | [mod-first-mod.md](./mod-first-mod.md) |
| Output style definition | A custom output style that changes response format (not what Claude knows) by rewriting the system prompt. | [output-style.md](./output-style.md) |
| Plugin eval case | An eval case (`prompt.md` plus graders) for a plugin skill, scaffolded with `claude plugin eval init --bare` and run with `claude plugin eval`. | [plugin-eval-case.md](./plugin-eval-case.md) |
| Plugin manifest (plugin.json) | Complete `.claude-plugin/plugin.json` example declaring a plugin's identity, component locations, inline components, and `userConfig`. | [plugin-manifest.md](./plugin-manifest.md) |
| Plugin marketplace manifest (marketplace.json) | A `.claude-plugin/marketplace.json` catalog listing plugins by relative path and by GitHub source, plus the commands to register and install from it. | [plugin-marketplace.md](./plugin-marketplace.md) |
| Skill definition | A minimal SKILL.md with frontmatter and instructions, invoked automatically or via `/skill-name`. | [skill-definition.md](./skill-definition.md) |
| Custom slash command with arguments | A skill invoked as `/fix-issue 123`; the `$ARGUMENTS` placeholder is replaced with whatever follows the skill name. `commands.md` documents only built-in `/` commands and points to skills for custom ones ("To add custom commands, write a skill"). | [slash-command.md](./slash-command.md) |
| Subagent definition in .claude/agents/ | A project-scoped subagent with a restricted, read-only tool set, invoked by name or `@`-mention. | [subagent-definition.md](./subagent-definition.md) |

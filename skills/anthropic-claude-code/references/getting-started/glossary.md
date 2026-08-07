<!-- source: https://code.claude.com/docs/en/glossary.md / last verified: 2026-08-07 -->

# Glossary

Definitions for Claude Code terminology: agentic loop, compaction, CLAUDE.md, hooks, subagents, MCP, and other core concepts.

## Options / Props

| Term | Definition |
|------|------------|
| Agent teams | Multiple independent Claude Code sessions coordinated by a team lead, shared task list, peer-to-peer messaging; experimental (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) |
| Agentic coding | Workflow where the AI reads files, runs commands, and makes changes autonomously, vs. chat-based assistants that only respond with text |
| Agentic harness | The tools, context management, and execution environment that turn a language model into a capable coding agent (Claude Code is the harness) |
| Agentic loop | The cycle: gather context, take action, verify results, repeat until done; interruptible at any point |
| Artifact | A live, interactive web page published from a session to a private claude.ai URL |
| Auto memory | Notes Claude writes for itself under `~/.claude/projects/`; first 200 lines/25KB of `MEMORY.md` loads every session |
| Auto mode | A permission mode where a separate classifier model reviews actions in the background so most run without approval prompts |
| Bare mode | `--bare` starts without hooks, skills, plugins, MCP, auto memory, or CLAUDE.md |
| Bundled skills | Prompt-based playbooks included with Claude Code, such as `/batch`, `/code-review`, `/debug`, `/loop` |
| Channel | An MCP server that pushes events into a running session (e.g. Telegram, Discord, iMessage) |
| Checkpoint | A restore point created at each prompt; `Esc` twice or `/rewind` restores code/conversation |
| `.claude` directory | Project-scoped config: settings, hooks, skills, subagents, rules, auto memory |
| CLAUDE.md | Persistent instructions loaded at the start of every session as a user message after the system prompt |
| Command | Reusable instruction invoked with `/name`; distinct from `claude` CLI subcommands and MCP server `command` field |
| Compaction | Automatic summarization when the context window approaches its limit |
| Connector | An MCP server added to a claude.ai account rather than configured locally |
| Context window | The working memory for a session: history, files, outputs, CLAUDE.md, memory, skills, system instructions |
| Dispatch | Phone-initiated task router that spawns a Desktop app session (Pro/Max) |
| Effort level | Controls thinking-budget depth per turn (Fable 5, Opus 4.6+, Sonnet 4.6+) |
| Extended thinking | Visible step-by-step reasoning before responding |
| Hook | User-defined handler executing at a lifecycle point (shell command, HTTP endpoint, MCP tool, LLM prompt, or subagent) |
| Managed settings | Settings enforced org-wide by IT/DevOps; user/project settings cannot override |
| MCP (Model Context Protocol) | Open standard connecting AI tools to external data sources and services |
| MCP server | A program giving Claude tools/prompts/resources over MCP |
| MCP Tool Search | Defers MCP tool schemas until needed; only tool names load at startup |
| Non-interactive mode | `-p`/`--print`; executes a single prompt and exits, formerly "headless mode" |
| Output style | Modifies Claude's system prompt to change response behavior/tone/format |
| Permission mode | Baseline approval behavior: `default` (Manual), `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions` |
| Permission rule | Settings entry allowing/asking/denying a tool call; evaluated deny -> ask -> allow, first match wins |
| Plan mode | Claude researches and proposes changes without editing source files |
| Plugin | Bundle of skills, hooks, subagents, MCP servers packaged as one installable unit |
| Project trust | Dialog accepting a directory before Claude Code loads its `.claude/settings.json`/`.mcp.json` |
| Prompt injection | Hostile instructions embedded in a file/page/tool result attempting to redirect Claude |
| Remote Control | Continue a local session from phone/browser via claude.ai; execution/files stay local |
| Rules | Modular instruction files in `.claude/rules/`, optionally path-scoped with `paths:` frontmatter |
| Sandboxing | OS-level filesystem/network isolation for the Bash tool |
| Session | A conversation tied to the current directory with its own context window |
| Settings layers | Precedence order: managed policy > CLI args > `.claude/settings.local.json` > `.claude/settings.json` > `~/.claude/settings.json` |
| Skill | A `SKILL.md` file of instructions/knowledge/workflow; recommended successor to custom commands |
| Subagent | Specialized assistant in its own context window with custom system prompt, tools, and permissions |
| Surface | Any place Claude Code is accessed: CLI, VS Code, JetBrains, Desktop, claude.ai |
| Teleport | `/teleport` pulls a cloud session into the local terminal; `--cloud` sends a local task to the web |
| Tool | An action Claude can take: read a file, edit code, run a shell command, search the web, spawn a subagent |
| Turn | One complete response from Claude within a session; Stop hooks fire at the end of each turn |
| Verification loop | Giving Claude a runnable check so it iterates until the check passes instead of stopping after one attempt |
| Worktree isolation | Runs Claude in a separate git worktree under `.claude/worktrees/` (`-w` flag or `isolation: worktree`) |

## Notes

- Deprecated/renamed terms: "Headless mode" is now Non-interactive mode; "Custom commands" is now Skills (`.claude/commands/` files still work); "Slash commands" is now Commands.
- For model-level concepts (tokens, temperature, RAG) see the separate platform glossary; this page covers Claude Code product terminology only.

## Related

- [How Claude Code works](./how-claude-code-works.md)
- [Extend Claude Code](./features-overview.md)
- [How Claude remembers your project](./memory.md)
- [Explore the context window](./context-window.md)

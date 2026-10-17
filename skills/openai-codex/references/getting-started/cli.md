# Codex CLI

Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal. Works against your local repository with configurable model, reasoning effort, and permissions.

## Signature / Usage

Install with one of the standalone installers, npm, or Homebrew, then run `codex` from a project directory:

```bash
# macOS/Linux
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"

# npm
npm install -g @openai/codex

# Homebrew
brew install --cask codex
```

```bash
codex
```

Updates use the same install command for the standalone installers and npm; Homebrew updates with `brew upgrade --cask codex`. Run the Windows installer from a new PowerShell window.

Build a terminal workflow around Codex:

```bash
codex resume                 # reopen a recent chat from the current repository, or search older local chats
codex --image ./error.png "..."   # pass visual context with the first prompt (or paste into the composer)
codex --search               # switch a run to live web search; activity stays visible in the transcript
codex cloud                  # browse chats, submit work to a configured environment, apply results locally
codex mcp                    # add local or remote MCP servers, authenticate, inspect available tools
codex completion             # generate shell completions
```

## Getting started

1. **Install Codex** with the installer, npm, or Homebrew (see above).
2. **Run Codex and sign in.** Open a project directory and run `codex`; the first time, choose "Sign in with ChatGPT" or another available sign-in method.
3. **Start your first task.** Describe what you want (e.g. `Tell me about this project`). Create Git checkpoints before and after a task so you can revert changes.

## Build a terminal workflow

- **Return to a saved chat:** `codex resume` reopens a recent chat from the current repository, or searches across local chats.
- **Bring visual context:** `codex --image` passes an error screenshot, architecture diagram, or design reference with the first prompt.
- **Split up a larger investigation:** ask Codex to delegate focused work to subagents and bring findings back into the main session.
- **Search for current context:** `codex --search` switches a run to live web search.
- **Move work to Codex cloud:** `codex cloud`.
- **Connect external tools with MCP:** `codex mcp`.
- **Set the boundaries for each run:** `/permissions` chooses when Codex can edit files or run commands without asking and shows the active sandbox and writable roots.
- **Fit Codex to your terminal:** `codex completion` generates completions for your shell; choose a syntax theme; open longer prompts in the editor configured by `VISUAL` or `EDITOR`.
- **Review changes before they ship:** run a dedicated review against uncommitted changes, a commit, or a base branch; Codex reports prioritized findings without modifying your working tree.
- Use the CLI when you work from the terminal, need scripting or CI (`codex exec`), want a local code review, or want to hand work to the cloud.

## Next steps

- CLI reference, configuration (config-basics.md), and automation with `codex exec` (non-interactive-mode.md).

## Notes

- `codex exec` runs Codex non-interactively for scripts and CI — the flag/option reference for automation belongs to a different scope (see the automation-focused reference); this page covers only the interactive CLI entry point.
- Codex CLI can delegate work to Codex cloud (`codex cloud`) and browse/apply results from the terminal.
- Full command/flag/slash-command reference and IDE/config surfaces are documented on separate pages outside this category.
- Source: https://learn.chatgpt.com/docs/codex/cli (retrieved 2026-10).

## Related

- [ide.md](./ide.md)
- [cloud.md](./cloud.md)
- [models.md](./models.md)
- [best-practices.md](./best-practices.md)

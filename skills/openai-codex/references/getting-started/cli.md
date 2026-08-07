> OpenAI Codex (learn.chatgpt.com) のドキュメント。

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

Updates use the same install command for each method (e.g. `brew upgrade --cask codex`).

## Getting started

1. **Install Codex** with the installer, npm, or Homebrew (see above).
2. **Run Codex and sign in.** Open a project directory and run `codex`; the first time, choose "Sign in with ChatGPT" or another available sign-in method.
3. **Start your first task.** Describe what you want (e.g. `Tell me about this project`). Create Git checkpoints before and after a task so you can revert changes.

## Notes

- `codex exec` runs Codex non-interactively for scripts and CI — the flag/option reference for automation belongs to a different scope (see the automation-focused reference); this page covers only the interactive CLI entry point.
- Codex CLI can delegate work to Codex cloud (`codex cloud`) and browse/apply results from the terminal.
- Full command/flag/slash-command reference and IDE/config surfaces are documented on separate pages outside this category.

## Related

- [ide.md](./ide.md)
- [cloud.md](./cloud.md)
- [models.md](./models.md)
- [best-practices.md](./best-practices.md)

# Install

Install or update the Codex CLI binary on macOS, Linux, or Windows.

## macOS / Linux standalone installer

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

## Windows standalone installer

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

## npm

```bash
npm install -g @openai/codex
```

## Homebrew (macOS)

```bash
brew install --cask codex
```

## Update

Re-run the same command used for the original install (the `curl | sh` installer, the PowerShell installer, `npm install -g @openai/codex`, or `brew upgrade --cask codex`) to update to the latest release.

## Environment diagnostics

```bash
codex doctor
```

Runs environment diagnostics for the CLI install.

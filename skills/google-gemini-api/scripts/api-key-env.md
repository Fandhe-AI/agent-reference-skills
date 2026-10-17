---
source: https://ai.google.dev/gemini-api/docs/api-key
---

# API Key Environment Variable

Set `GEMINI_API_KEY` so the Gemini API client libraries detect it automatically. Placeholders only; never commit a real key.

## Bash (Linux/macOS)

```bash
touch ~/.bashrc && "${EDITOR:-nano}" ~/.bashrc
```

Opens or creates `~/.bashrc`. Add this line at the end of the file:

```bash
export GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

Then apply the change:

```bash
source ~/.bashrc
```

## Zsh (macOS)

```sh
touch ~/.zshrc && open ~/.zshrc
```

Add this line to the file:

```sh
export GEMINI_API_KEY="YOUR_API_KEY_HERE"
```

Then apply the change:

```sh
source ~/.zshrc
```

## Notes

- The client libraries read `GEMINI_API_KEY` or `GOOGLE_API_KEY`. If both are set, `GOOGLE_API_KEY` takes precedence.
- Windows: the official page describes the GUI steps (Environment Variables dialog, variable name `GEMINI_API_KEY`) and gives no command, so none is listed here.
- Keys are created or viewed at `https://aistudio.google.com/apikey`. Never check keys into source control and never hardcode them in client-side code (see `references/getting-started/api-key.md`).
- The original uses `open` (macOS only) for Bash on Linux/macOS and an unquoted `<YOUR_API_KEY_HERE>` placeholder, which the shell parses as redirection; this page uses `${EDITOR:-nano}` and a quoted placeholder. `open` in the Zsh (macOS) section is the macOS command.
- Setting `export` lines edits your shell startup file. Back it up first if it is shared or managed.

---
source: https://docs.cloud.google.com/sdk/docs/interactive-gcloud
---

# gcloud interactive shell (Beta)

The `gcloud` interactive shell gives a richer `bash` experience with as-you-type autocompletion and help snippets. It suggests and completes commands for any tool with a man page, including `gcloud`, `bq`, `gsutil`, and `kubectl`.

## Signature / Usage

Included in the `gcloud beta` components.

```bash
gcloud components list
```

```bash
gcloud components install beta
```

```bash
gcloud beta interactive
```

Your usual shell prompt is replaced with the interactive prompt `$`. To work with one command for a while, type the reusable part (for example `gcloud compute`) and press `F7`; then type subcommands such as `list`. Press `Ctrl-C` and `F7` to clear the context. Exit with `Ctrl-D` or `F9`.

## Options / Props

Shortcuts:

| Action | Shortcut |
|---|---|
| Complete a file path or resource argument | `Tab` |
| Refine the dropdown completion menu | Continue typing the command |
| Scroll through the menu | `Tab`, `Shift+Tab`, or arrow keys |
| Select a highlighted item or directory | `Space` or `/` |
| Toggle the active help section, ON when enabled, OFF when disabled | `F2` |
| Set the context for command input to avoid retyping command prefixes | `F7` |
| Clear the context for command input | `Ctrl-C` and `F7` |
| Open a web browser tab or window to display the complete man page for the current command | `F8` |
| Exit | `F9` or `Ctrl+D` |

## Notes

- Beta feature, subject to the "Pre-GA Offerings Terms" in the General Service Terms; pre-GA features are available "as is" and might have limited support.
- Bash compatibility: `bash` completion configs, aliases, exports, functions, `set -o` settings, and variables from your `.bashrc` are available at the interactive prompt. The edit mode derives from `set -o emacs` or `set -o vi`.
- Static information (command, sub-command, flag names, enumerated flag values) is auto-completed via dropdown menus. Full details: `gcloud beta interactive` reference page.
- Source: https://docs.cloud.google.com/sdk/docs/interactive-gcloud (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [components.md](./components.md)

---
source: https://docs.cloud.google.com/shell/docs/using-cloudshell-command
---

# Use the `cloudshell` command

The `cloudshell` command lets you launch tutorials, download files, set aliases, and open existing files in the code editor from the Cloud Shell command line.

## Signature / Usage

To open your `.bashrc` file for edit in the Cloud Shell Editor, from the Cloud Shell command line, run:

```bash
cloudshell edit $HOME/.bashrc
```

Similarly, to download your `.bashrc` file, run:

```bash
cloudshell download $HOME/.bashrc
```

To display information about the `cloudshell` command from your Cloud Shell session, run `cloudshell help`.

## Options / Props

Available positional arguments for `cloudshell`:

| Positional Argument | Alternative name | Description |
| --- | --- | --- |
| help | -h, --help | show `cloudshell` help |
| edit-files | edit-file, edit | Open specified file in the Cloud Shell Editor |
| download-files | download-file, download, dl | Initiate the download of the specified file |
| aliases |   | Generates short aliases for common subcommands |

## Notes

- Source: https://docs.cloud.google.com/shell/docs/using-cloudshell-command (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [launching-cloud-shell-editor.md](./launching-cloud-shell-editor.md)
- [uploading-and-downloading-files.md](./uploading-and-downloading-files.md)
- [use-cloud-shell-terminal.md](./use-cloud-shell-terminal.md)

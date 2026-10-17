---
source: https://docs.astral.sh/uv/getting-started/help/
---

# Getting help

Help menus, verbose output, version checks, and where to report issues.

## Signature / Usage

```console
$ uv --help
$ uv init --help
$ uv help
$ uv help init
$ uv sync -v
$ uv sync -vv
$ uv self version
```

- `--help` displays a condensed help menu for a command.
- `uv help [command]` displays the longer help menu; uv attempts to use `less` or `more` to page the output (press `q` to exit).
- `-v` displays verbose output and can be repeated (`-vv`) to increase verbosity. Verbose output often includes additional information about why uv behaves a certain way.

## Viewing the version

```console
$ uv self version
$ uv --version      # Same output as `uv self version`
$ uv -V             # Will not include the build commit and date
```

## Notes

- Before uv 0.7.0, `uv version` was used instead of `uv self version`.
- When seeking help, determine the installed uv version first; the problem may already be solved in a newer version.
- The reference documentation contains a troubleshooting guide for common issues.
- Report bugs and request features on the GitHub issue tracker (`https://github.com/astral-sh/uv/issues`); search for similar issues first. Astral also has a Discord server (`https://discord.com/invite/astral-sh`).

## Related

- [Reproducible examples](./reproducible-examples.md)
- [Features](./features.md)

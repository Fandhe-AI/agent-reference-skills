---
source: https://docs.astral.sh/uv/reference/cli/#uv-tool-update-shell
---

# uv tool update-shell

Ensure that the tool executable directory is on the `PATH`.

## Signature / Usage

```
uv tool update-shell [OPTIONS]
```

```console
$ uv tool update-shell
```

- If the tool executable directory is not present on the `PATH`, uv attempts to add it to the relevant shell configuration files.
- If the shell configuration files already include a blurb to add the executable directory to the path, but the directory is not present on the `PATH`, uv exits with an error.
- The tool executable directory is determined according to the XDG standard and can be retrieved with `uv tool dir --bin`.

## Notes

- This command has no options of its own; only global options apply. They are listed in uv.md (project-commands).
- It modifies shell configuration files.

## Related

- [Tools](./tools.md)
- [uv tool dir](./uv-tool-dir.md)

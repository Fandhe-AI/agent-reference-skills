---
source: https://opencode.ai/docs/tools/#files
---

# Tools: Files (read / glob / grep / edit / write / patch)

File tools for reading, searching, and modifying files.

## Signature / Usage

### Read

`read` returns a file or a non-recursive directory listing. Give it a `path`; use `offset` and `limit` to page through large results.

```text
Read src/server.ts starting at line 120 and return at most 80 lines.
```

Text reads contain numbered lines and are limited to 2,000 lines and 50 KiB per page. Individual lines are shortened after 2,000 characters. The tool also passes PNG, JPEG, GIF, WebP, and PDF files to the model, up to 20 MiB of source data. Other binary files fail. See [Attachments](https://opencode.ai/docs/attachments/) for supported media and image processing.

Permission: `read` with the normalized path as its resource.

### Glob

`glob` finds file paths from a pattern such as `**/*.ts`. It searches the current directory unless `path` selects another relative directory; `hidden` includes hidden entries and `limit` caps the results.

```text
Use glob with **/*.test.ts under packages/core and return at most 50 files.
```

The default limit is 100 files and the search timeout is 30 seconds. Permission: `glob` with the requested pattern as its resource.

### Grep

`grep` searches file contents and returns paths, line numbers, and previews. Its `pattern` uses regular-expression syntax unless `literal` is true. Narrow a search with `path`, `include`, `caseSensitive`, or `limit`.

```text
Use grep for the literal text "request timed out" in src, including only *.ts files.
```

The default limit is 100 matching lines and the search timeout is 30 seconds. Permission: `grep` with the requested pattern, not the search path, as its resource.

### Edit

`edit` replaces text in an existing file. Supply `path`, `oldString`, and a different `newString`; the old text must match exactly once unless `replaceAll` is true.

```text
In src/config.ts, replace the unique text "timeout: 60" with "timeout: 30".
```

Use `edit` for a focused change. OpenCode may format the file after writing it. Permission: `edit` with the target path as its resource.

### Write

`write` creates or completely replaces a text file from `path` and `content`. It creates missing parent directories and may run the configured formatter.

```text
Create docs/example.md with a heading and one setup command.
```

Use `edit` instead when only part of an existing file should change. Permission: `edit` with the target path as its resource.

### Patch

`patch` applies one patch that can add, update, move, or delete several files. Its `patchText` uses `*** Add File`, `*** Update File`, and `*** Delete File` sections.

```text
Use patch to rename src/old.ts to src/new.ts and update its exported name.
```

OpenCode exposes `patch` for supported GPT models; other models receive `edit` and `write` instead. Permission: `edit` with every affected path as a resource.

## Options / Props

| Tool | Parameters | Permission resource |
|------|------------|---------------------|
| `read` | `path`, `offset`, `limit` | normalized path |
| `glob` | pattern, `path`, `hidden`, `limit` | requested pattern |
| `grep` | `pattern`, `literal`, `path`, `include`, `caseSensitive`, `limit` | requested pattern |
| `edit` | `path`, `oldString`, `newString`, `replaceAll` | target path |
| `write` | `path`, `content` | target path (`edit` action) |
| `patch` | `patchText` | every affected path (`edit` action) |

## Notes

- Paths outside the active Location or its project worktree are also checked against `external_directory`, which is allowed by default. See [Permissions](https://opencode.ai/docs/permissions/) for path normalization, rule order, and saved approvals. To make outside material available by name, configure [References](https://opencode.ai/docs/references/).
- OpenCode permissions are distinct from Claude Code permissions (anthropic-claude-code-admin).

## Related

- [tools-overview.md](./tools-overview.md)
- [tools-shell-web.md](./tools-shell-web.md)

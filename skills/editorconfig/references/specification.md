---
source: https://spec.editorconfig.org/
---

# EditorConfig Specification

The EditorConfig file format: file discovery, line types, key-value pair parsing and empty files.

## Signature / Usage

```ini
# Preamble (before the first section header)
root = true

# Section
[*.js]
indent_style = space
indent_size = 2
```

- **Preamble**: the lines before the first section header. Optional; may contain key-value pairs, comments and blank lines.
- **Section name**: the string between the beginning `[` and the ending `]` (a glob).
- **Section**: the lines from a section header until the next section header or the end of the file.

### File discovery

1. Search the directory of the given file and all parent directories for `.editorconfig` files. Non-existing directories are treated as if they exist and are empty.
2. Search all found files for sections whose names match the filename.
3. Stop when a file with `root = true` in the preamble is found, or when the root filesystem directory is reached.

### Precedence

- Files are read top to bottom and the most recent pairs found take precedence.
- When a file matches several sections of one `.editorconfig`, pairs from the later section take precedence over pairs from the earlier section.
- When several `.editorconfig` files have matching sections, the closer file is read last, so its pairs take precedence.

### Line types

Each line is trimmed of leading and trailing whitespace, then processed by type.

| Type | Description |
|------|-------------|
| Blank | Contains nothing. Ignored |
| Comment | Starts with `;` or `#`. Ignored |
| Section header | Starts with `[` and ends with `]`. Any characters may be between the brackets (including `[`, `]`, spaces and tabs). `/` is the path separator; `\` is not allowed as a path separator, even on Windows |
| Key-value pair | A key and a value separated by `=` |
| Invalid | Any other line |

- Files must be UTF-8 encoded, with LF or CRLF line separators.

### No inline comments

A `;` or `#` anywhere other than at the beginning of a line does not start a comment; it is part of the text of that line. There is no escaping mechanism for `;` or `#`.

```ini
[*.txt]
foo = editorconfig ;)
```

For `*.txt` files, `foo` has the value `editorconfig ;)`, not `editorconfig`.

### Key-value pair parsing

- Key: the part before the first `=` on the line.
- Value: the part, if any, after the first `=` on the line. If no value is provided, the value is an empty string.
- Keys and values are trimmed of leading and trailing whitespace but keep whitespace between non-whitespace characters.
- Keys are case-insensitive and lowercased after parsing.

### Empty `.editorconfig` files

A file containing only blank and comment lines, or no lines at all, is equivalent to a file containing only `root = false`.

## Options / Props

Terminology (since 0.15.1):

| Term | Meaning |
|------|---------|
| EditorConfig files | Files named `.editorconfig` (lowercase) that store sections of key-value pairs |
| Cores | Parse EditorConfig files and provide key-value pairs to plugins |
| Plugins | Receive pairs from cores and update an editor's settings |
| Editors | Edit files and use plugins to update settings |

Minimum accepted lengths:

| Element | Length |
|---------|--------|
| Section name | 1024 characters |
| Key | 1024 characters |
| Value | 4096 characters |

Versioning (since 0.14.0): the specification follows Semantic Versioning 2.0.0, is tagged in the specification repository, and each version corresponds to the same version of the core-tests repository. To pass the core tests a core must process the `-b` switch and report the specification version for `-v` / `--version`. Core, plugin and editor version numbers are independent of the specification version.

## Notes

- Capitalization of the file name: `.editorconfig` is lowercase. On platforms where opening a differently capitalized name (for example `.editorConfig`) opens the same file, such as case-insensitive filesystems, a core may also accept that capitalization as if it were lowercase (informative).
- Version caveat: spec.editorconfig.org shows "version 0.17.2" but, as of 2026-11-14, is built from master `f580513`, 15 commits after the latest tag v0.17.2 (`329077a`). The following are only in master and not in the tag's `index.rst`: the empty-file section, the file-name capitalization section, the empty-string value when no value is provided, the within-file precedence rule for multiple matching sections, and the leading-slash rule (see glob-patterns).
- The tag v0.17.2 does contain: trimming of leading and trailing whitespace, any characters between section header brackets, the `\` separator restriction, the no-inline-comments rule, and non-existing directories being treated as empty.
- The section "Suggestions for Plugin Developers" is TODO in the specification and points to the Plugin Guidelines wiki page.
- Source: https://spec.editorconfig.org/ (fetched 2026-11-14, master `f580513`)
- Source: https://github.com/editorconfig/specification/blob/v0.17.2/index.rst (latest tag v0.17.2 / `329077a`, fetched 2026-11-14)

## Related

- [properties](./properties.md) — All properties
- [glob-patterns](./glob-patterns.md) — Glob pattern syntax
- [indentation](./indentation.md) — How the indentation properties combine
- [best-practices](./best-practices.md) — Examples and FAQ

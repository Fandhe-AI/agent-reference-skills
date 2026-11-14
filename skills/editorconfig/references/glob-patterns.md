---
source: https://spec.editorconfig.org/#glob-expressions
---

# EditorConfig Glob Patterns

Glob (wildcard) patterns used in `.editorconfig` section names.

## Signature / Usage

```ini
# .js files in all subdirectories
[*.js]
indent_size = 2

# .ts files directly under src/ only
[src/*.ts]
indent_size = 2

# all .ts files under src/ (including subdirectories)
[src/**.ts]
indent_size = 2

# .ts and .tsx
[*.{ts,tsx}]
indent_size = 2

# a specific file without extension
[Makefile]
indent_style = tab

# several specific files
[{package.json,tsconfig.json,.prettierrc}]
indent_size = 2

# file1.txt to file12.txt
[file{1..12}.txt]
indent_size = 2

# files starting with a, b or c
[[abc]*.txt]
indent_size = 2

# files starting with a character other than a, b, c
[[!abc]*.txt]
indent_size = 2

# nested braces
[{*.{js,ts},Makefile}]
indent_size = 2
```

## Options / Props

| Character | Matches |
|-----------|---------|
| `*` | Any string of characters, except path separators (`/`) |
| `**` | Any string of characters |
| `?` | Any single character, except path separators (`/`) |
| `[seq]` | Any single character in `seq`. Any character inside the brackets is considered literally: `[ab*c{1..2}]` matches one of `a`, `b`, `*`, `c`, `{`, `1`, `.`, `2`, `}` |
| `[!seq]` | Any single character not in `seq`. Characters inside the brackets are considered literally as well |
| `{s1,s2,s3}` | Any of the strings given (separated by commas, can be nested). `{s1}` matches `{s1}` literally |
| `{num1..num2}` | Any integer between `num1` and `num2`, which can be positive or negative. `num1` must be less than `num2` |
| `\` | Escapes the next character so it is not interpreted as special |

## Notes

### Path separators

- A glob without a path separator (a `/` not inside square brackets) can match at any level below the `.editorconfig`: `*.c` matches `.c` files in the directory of the `.editorconfig` and in directories below it.
- A glob containing a path separator is relative to the directory of the `.editorconfig`: `subdir/*.c` matches only `.c` files directly in `subdir`.
- A leading slash is not relevant if there is already a slash in the middle of the pattern: `/subdir/*.c` and `subdir/*.c` must yield the same result.
- A section name ending with `/` does not match any file.

### Numeric ranges

- `{1..3}` and `{-1..4}` are valid; `{-4..-5}` and `{3..1}` are not, because `num1` must be less than `num2`.

### Length

- Cores must accept section names up to and including 1024 characters; beyond that each implementation may define its own limit.

### Version caveat

- The literal treatment of characters inside `[seq]` / `[!seq]`, the `num1 < num2` requirement and the leading-slash rule are in the specification as rendered by spec.editorconfig.org on 2026-11-14 (master `f580513`) but not in `index.rst` of the latest tag v0.17.2 (`329077a`). The tag has the trailing-slash corollary, the literal `{s1}`, `\` escaping and the 1024-character minimum.
- The editorconfig.org front page describes `?` as "any single character" without the path-separator exception, and marks `{s1,s2,s3}` as available since EditorConfig Core 0.11.0; the specification above is more precise.
- Source: https://spec.editorconfig.org/#glob-expressions (fetched 2026-11-14, master `f580513`)
- Source: https://github.com/editorconfig/specification/blob/v0.17.2/index.rst (latest tag v0.17.2 / `329077a`, fetched 2026-11-14)
- Source: https://editorconfig.org/ (fetched 2026-11-14)

## Related

- [specification](./specification.md) — File format
- [properties](./properties.md) — All properties
- [best-practices](./best-practices.md) — Examples

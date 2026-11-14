---
source: https://editorconfig.org/
---

# EditorConfig Best Practices

Example `.editorconfig` files, FAQ and common patterns.

## Signature / Usage

### Basic setup

```ini
# Project root
root = true

# Defaults (all files)
[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2
```

### Per-language patterns

#### Web (JavaScript / TypeScript)

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

#### Python

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[*.py]
indent_style = space
indent_size = 4

[*.{yml,yaml}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
```

#### Go

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[*.go]
indent_style = tab
indent_size = 4

[*.{yml,yaml,json}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
```

#### Java / Kotlin

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 4

[*.{xml,gradle,kts}]
indent_size = 4

[*.{yml,yaml,json}]
indent_size = 2

[Makefile]
indent_style = tab
```

### Common patterns

#### Keep trailing whitespace in Markdown

Two trailing spaces mean a line break in Markdown, so disable `trim_trailing_whitespace`.

```ini
[*.md]
trim_trailing_whitespace = false
```

#### Makefile requires tabs

Makefile recipe lines require hard tabs.

```ini
[Makefile]
indent_style = tab
```

#### Disable specific properties

Use `unset` to cancel a property and fall back to the editor default.

```ini
[*.generated.*]
indent_size = unset
indent_style = unset
```

#### Configure several file types together

Group extensions with braces.

```ini
[*.{json,yml,yaml,toml}]
indent_style = space
indent_size = 2

[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2
```

## Notes

### FAQ

#### Q: Does EditorConfig automatically reformat existing files?

**A: No.** EditorConfig plugins apply the settings only to newly input lines. To reformat existing files, use a separate tool.

#### Q: How do EditorConfig and formatters (Prettier, Biome, etc.) interact?

**A:** The official documentation does not define the interaction with formatters. Whether a formatter reads `.editorconfig`, which properties it uses and which settings win when they differ are documented by each tool (not verified in this skill).

#### Q: How can `.editorconfig` be checked in CI?

**A:** The official FAQ lists these tools (and notes that none of them works perfectly at the moment):

- **editorconfig-checker**
- **eclint**
- **editorconfig-tools**
- **editorconfig-cf**
- **editorconfig-maven-plugin** (Maven)
- **editorconfig-gradle-plugin** (Gradle)
- **editorconfig-action** (a GitHub Action that uses eclint to check a top-level `.editorconfig`)

#### Q: How do I create `.editorconfig` in Windows Explorer?

**A:** Create a file named `.editorconfig.` (note the trailing dot); Windows Explorer renames it to `.editorconfig` automatically.

#### Q: What does `indent_size = tab` mean?

**A:** It sets `indent_size` to the tab size: `tab_width` if specified, otherwise the tab size set by the editor.

### Sources

- Examples follow the specification (fetched 2026-11-14) and the editorconfig.org front page.
- Source: https://editorconfig.org/ (fetched 2026-11-14)
- Source: https://github.com/editorconfig/editorconfig/wiki/FAQ (fetched 2026-11-14)
- Source: https://spec.editorconfig.org/ (fetched 2026-11-14)

## Related

- [specification](./specification.md) — Specification
- [properties](./properties.md) — All properties
- [glob-patterns](./glob-patterns.md) — Glob patterns

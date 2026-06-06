# Multi-Language Project Configuration

`.editorconfig` for a monorepo or project mixing multiple languages, each with distinct conventions.

```ini
# EditorConfig is awesome: https://editorconfig.org
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

# Web: JS/TS/CSS/HTML — 2-space
[*.{js,jsx,ts,tsx,css,html}]
indent_style = space
indent_size = 2

# Python — 4-space (PEP 8)
[*.py]
indent_style = space
indent_size = 4

# Go — hard tabs
[*.go]
indent_style = tab
indent_size = 4

# Java/Kotlin — 4-space
[*.{java,kt,kts}]
indent_style = space
indent_size = 4

# Config/data files — 2-space
[*.{json,yml,yaml,toml}]
indent_style = space
indent_size = 2

# Markdown
[*.md]
trim_trailing_whitespace = false

# Makefile
[Makefile]
indent_style = tab
```

## Notes

- Sections are applied in order; later sections override earlier ones for the same property
- Brace expansion `{ext1,ext2}` keeps the file concise when multiple extensions share settings
- Files not matched by any filetype section still receive settings from `[*]`

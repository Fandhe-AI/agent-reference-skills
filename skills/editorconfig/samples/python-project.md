# Python Project Configuration

`.editorconfig` for a Python project following PEP 8 (4-space indentation).

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

# PEP 8: 4-space indentation
[*.py]
indent_style = space
indent_size = 4

# YAML/TOML config files use 2-space
[*.{yml,yaml,toml}]
indent_style = space
indent_size = 2

# Makefile requires hard tabs
[Makefile]
indent_style = tab
```

## Notes

- `[*.py]` overrides only `indent_style` and `indent_size`; other properties inherit from `[*]`
- PEP 8 mandates 4 spaces per indentation level; this configuration enforces it across all editors
- `[*.{yml,yaml,toml}]` uses brace expansion to match multiple extensions in one section

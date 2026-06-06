# Basic Setup

Minimal `.editorconfig` for a project with Unix line endings and UTF-8 encoding.

```ini
# EditorConfig is awesome: https://editorconfig.org

# top-most EditorConfig file
root = true

# Apply to all files
[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2
```

## Notes

- Place this file at the repository root alongside `.git/`
- `root = true` stops EditorConfig from searching parent directories
- `trim_trailing_whitespace` and `insert_final_newline` are applied on save, not on open
- Most editors require a plugin; VS Code, JetBrains IDEs, and Neovim have built-in support

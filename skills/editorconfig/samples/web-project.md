# Web Project Configuration

`.editorconfig` for a JavaScript/TypeScript web project with per-filetype overrides.

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2

# Markdown: preserve trailing spaces (two spaces = line break)
[*.md]
trim_trailing_whitespace = false

# Makefile requires hard tabs
[Makefile]
indent_style = tab
```

## Notes

- The `[*]` section establishes project-wide defaults; per-filetype sections only need to specify overrides
- Markdown trailing spaces are intentional (`  ` = `<br>`), so `trim_trailing_whitespace = false` prevents data loss
- Prettier reads `indent_style`, `indent_size`, and `end_of_line` from `.editorconfig` automatically

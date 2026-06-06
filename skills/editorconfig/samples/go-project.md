# Go Project Configuration

`.editorconfig` for a Go project (tabs for Go source, spaces for config files).

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

# Go standard: hard tabs, displayed as 4 columns
[*.go]
indent_style = tab
indent_size = 4

# Config and data files: 2-space
[*.{yml,yaml,json}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
```

## Notes

- `gofmt` enforces tabs; this configuration aligns editors to the same convention before `gofmt` runs
- `indent_size = 4` on a tab section sets `tab_width` (display width), not the number of spaces
- `tab_width` defaults to `indent_size` when not specified separately

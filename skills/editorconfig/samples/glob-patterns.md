# Glob Pattern Examples

Common glob patterns for targeting specific files and directories in `.editorconfig`.

```ini
root = true

# All files in any directory (no slash = recursive)
[*]
end_of_line = lf

# Multiple extensions via brace expansion
[*.{ts,tsx,js,jsx}]
indent_size = 2

# Exact filenames (no wildcards)
[{package.json,tsconfig.json,.prettierrc}]
indent_size = 2

# Files under a specific directory (recursive with **)
[src/**.ts]
indent_size = 2

# Files directly under lib/ only (single *)
[lib/*.js]
indent_size = 4

# Numeric range: file01.txt through file12.txt
[file{1..12}.txt]
charset = utf-8

# Exclude files starting with a digit
[[!0-9]*.sh]
indent_style = space
```

## Notes

- `*` does not cross directory boundaries; `**` does
- A pattern without `/` matches in the `.editorconfig`'s directory and all subdirectories
- A pattern with `/` is anchored to the `.editorconfig` file's directory
- `{s1}` (single element brace) matches the literal string, not as a glob expansion
- A section name ending with `/` matches no files

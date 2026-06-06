# Unset Property Override

Use `unset` to cancel an inherited property and restore the editor's default behavior.

```ini
root = true

[*]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

# Generated files: do not enforce indentation
[*.generated.*]
indent_size = unset
indent_style = unset

# Binary-adjacent files: skip whitespace trimming
[*.{patch,diff}]
trim_trailing_whitespace = unset
```

## Notes

- `unset` removes the EditorConfig constraint; the editor falls back to its own default for that property
- Use it for generated files, vendored code, or patch files where reformatting would corrupt content
- `unset` is different from omitting the property: it actively cancels a value inherited from a broader glob section

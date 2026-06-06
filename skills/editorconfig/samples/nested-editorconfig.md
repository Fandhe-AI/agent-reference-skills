# Nested .editorconfig Files

Override root settings for a subdirectory by placing a second `.editorconfig` inside it.

```
project/
├── .editorconfig        # root = true, indent_size = 2
└── legacy/
    ├── .editorconfig    # overrides for legacy code
    └── old-module.js
```

Root `.editorconfig`:

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
```

`legacy/.editorconfig` (no `root = true`):

```ini
[*.js]
indent_size = 4
```

When `legacy/old-module.js` is opened, EditorConfig applies:
1. `legacy/.editorconfig` → `indent_size = 4`
2. `project/.editorconfig` → `indent_style = space`, `end_of_line = lf`, `insert_final_newline = true`

## Notes

- Without `root = true` in the nested file, the search continues up to the root `.editorconfig`
- The closer file wins: `legacy/.editorconfig` overrides `indent_size` from the root file
- Adding `root = true` to the nested file would stop the search there and discard root settings entirely

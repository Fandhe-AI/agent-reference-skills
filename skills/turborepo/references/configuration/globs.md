# File Glob Specification

## Usage

| Pattern | Description |
|---|---|
| `*` | All files within a single directory level |
| `**` | Recursively matches all nested directories |
| `some-dir/` | The directory itself and all of its contents |
| `some-dir` | A file or directory with that name (matches recursively) |
| `*.js` | Files with the given extension at the current level |
| `!` | Negates the entire glob |

```
dist/**          # All files under dist
dist/            # The dist directory and everything inside it
!dist            # Exclude the dist directory entirely
dist/*.js        # Only the JS files directly under dist
dist/**/*.js     # JS files at any depth under dist
../scripts/**    # Files inside the scripts directory one level up
```

## Notes

- A negation with `!` automatically appends `/**`, which simplifies excluding an entire directory tree.

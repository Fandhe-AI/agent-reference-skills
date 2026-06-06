# Git Hooks

Run Biome automatically on commit using Lefthook or Husky + lint-staged.

## Lefthook

`lefthook.yml`:

```yaml
pre-commit:
  commands:
    check:
      glob: "*.{js,ts,cjs,mjs,jsx,tsx,json,jsonc}"
      run: npx @biomejs/biome check --no-errors-on-unmatched --files-ignore-unknown=true --colors=off {staged_files}
```

```bash
lefthook install
```

## Husky + lint-staged

```bash
npm install -D husky lint-staged
npx husky init
```

`.husky/pre-commit`:

```sh
lint-staged
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx,json,jsonc}": [
      "biome check --files-ignore-unknown=true",
      "biome check --write --no-errors-on-unmatched"
    ]
  }
}
```

## Notes

- `--no-errors-on-unmatched` suppresses errors when no files match the glob
- `--files-ignore-unknown=true` silently skips file types Biome does not support
- Lefthook passes only staged files via `{staged_files}`; no stash juggling needed
- For staged-only checks without lint-staged, use `biome check --staged` directly in the hook script

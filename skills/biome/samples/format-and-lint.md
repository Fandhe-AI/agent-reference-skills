# Format and Lint

Run formatter and linter individually or together with `biome check`.

```bash
# Format only (check, no write)
biome format ./src

# Format and apply changes
biome format --write ./src

# Lint only (check, no write)
biome lint ./src

# Lint and apply safe fixes
biome lint --write ./src

# Lint and apply safe + unsafe fixes
biome lint --write --unsafe ./src

# Format + lint + import sorting in one command
biome check --write ./src
```

## Notes

- `biome check` is the recommended all-in-one command for local development
- `--write` without `--unsafe` applies only safe fixes that do not change semantics
- `--only=<rule>` and `--skip=<rule>` narrow which lint rules run (e.g., `--only=correctness/noUnusedVariables`)
- In CI use `biome ci` instead — it is read-only and exits non-zero on any finding

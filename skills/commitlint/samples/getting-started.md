# Getting Started

Install commitlint CLI and conventional config, then create a minimal config file.

```bash
# Install
npm install -D @commitlint/cli @commitlint/config-conventional

# Create config (Linux/macOS)
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Test immediately (no flags — commitlint must resolve the config file just created)
echo "feat: add new feature" | npx commitlint   # exit 0: valid message
echo "bad message" | npx commitlint             # non-zero exit: proves the config is loaded
```

## Notes

- `@commitlint/config-conventional` provides the Conventional Commits ruleset out of the box
- Do not test with `--default-config`: when the config file is missing or yields no rules, commitlint silently falls back to `@commitlint/config-conventional`, so the test can pass even though the setup is broken (a config with rules always takes precedence over the fallback)
- A non-zero exit code means the commit message failed validation; exit 0 means it passed
- Run `npx commitlint --print-config` to inspect the resolved configuration

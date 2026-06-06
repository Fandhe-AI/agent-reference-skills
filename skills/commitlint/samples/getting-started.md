# Getting Started

Install commitlint CLI and conventional config, then create a minimal config file.

```bash
# Install
npm install -D @commitlint/cli @commitlint/config-conventional

# Create config (Linux/macOS)
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

# Test immediately
echo "feat: add new feature" | npx commitlint --default-config
```

## Notes

- `@commitlint/config-conventional` provides the Conventional Commits ruleset out of the box
- Without a `package.json` declaring `"type": "module"`, rename config to `commitlint.config.mjs` (required for Node v24+)
- A non-zero exit code means the commit message failed validation; exit 0 means it passed
- Run `npx commitlint --print-config` to inspect the resolved configuration

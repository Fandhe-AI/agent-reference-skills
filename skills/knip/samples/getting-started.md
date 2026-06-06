# Getting Started

Install knip and run it on a project to find unused files, exports, and dependencies.

```sh
# Automated setup (recommended)
npm init @knip/config

# Then run
npm run knip
```

```sh
# Manual install
npm install -D knip typescript @types/node
```

```json
// package.json
{
  "scripts": {
    "knip": "knip"
  }
}
```

```sh
# Without installation
npx knip
```

## Notes

- Automated setup (`npm init @knip/config`) creates `knip.json` and adds the `knip` script to `package.json`
- `typescript` and `@types/node` are peer dependencies required for TypeScript analysis
- Knip exits with code `1` when issues are detected, making it CI-friendly by default
- For large codebases, use `--max-show-issues 5` to limit initial output

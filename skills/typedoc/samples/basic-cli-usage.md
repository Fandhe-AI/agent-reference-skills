# Basic CLI Usage

Generate HTML documentation from a TypeScript entry point using the command line.

```bash
# Install TypeDoc as a dev dependency
npm install typedoc --save-dev

# Generate docs from a single entry point
npx typedoc src/index.ts

# Specify output directory explicitly
npx typedoc --entryPoints src/index.ts --out docs

# Output JSON model instead of HTML
npx typedoc --entryPoints src/index.ts --json docs/api.json

# Watch mode for development
npx typedoc --entryPoints src/index.ts --out docs --watch
```

## Notes

- TypeDoc reads configuration automatically from `typedoc.json`, `tsconfig.json`, or `package.json` in that order.
- Prefer local installation over global to avoid plugin/theme resolution issues.
- Use `--skipErrorChecking` to speed up generation when type errors are not the concern.
- Run `npx typedoc --showConfig` to verify the resolved configuration before generating.

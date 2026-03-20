# Plugins

Source: https://knip.dev/explanations/plugins

## What Does a Plugin Do?

Plugins activate automatically when their associated package appears in `package.json` dependencies. Each plugin:

- Handles configuration files (e.g., `astro.config.mjs`)
- Adds entry file patterns (e.g., `src/pages/**/*.astro`)
- Defines command-line arguments

## Configuration Files

Knip uses plugins to parse configuration files and extract dependency references not found through static import analysis.

### ESLint Example

```json
{
  "extends": ["airbnb", "prettier"],
  "plugins": ["@typescript-eslint"]
}
```

Identified dependencies: `eslint-config-airbnb`, `eslint-config-prettier`, `@typescript-eslint/eslint-plugin`

### Vitest Example

```typescript
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    coverage: { provider: 'istanbul' },
    environment: 'happy-dom',
  },
});
```

Revealed dependencies: `@vitest/coverage-istanbul`, `vitest-environment-happy-dom`

## Entry Files

Plugins automatically configure entry file patterns:

- **Next.js**: `pages/**/*.{js,jsx,ts,tsx}`
- **Vitest**: `**/*.{test,test-d,spec,spec-d}.ts`

Override in `knip.json`:

```json
{
  "playwright": {
    "entry": "src/**/*.integration.ts"
  }
}
```

## Entry Files from Config Files

### Angular

Reads `angular.json` to extract `main` entry file, `@angular-devkit/build-angular` dependency, and `tsconfig.app.json` reference.

### GitHub Actions

Parses workflow YAML `run` scripts to identify entry files like `scripts/build.js`.

### Webpack

Extracts entry files from `entry` config and dependencies from module `rules`.

## Bringing It All Together

A config file is processed both as:
1. An **entry file** (to resolve static imports)
2. A **config file** (to parse and extract dynamic dependencies)

## Config File Location

Specify non-default locations in `knip.json`:

```jsonc
{
  "playwright": { "config": ["e2e/playwright.config.ts"] },
  "vite": "packages/*/vite.config.ts"
}
```

## Summary

1. **Config files** are dynamically loaded and parsed by plugins
2. **Entry files** are added to the module graph
3. Both can recursively lead to additional entries, configs, and dependencies

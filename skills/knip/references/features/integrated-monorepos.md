# Integrated Monorepos

Source: https://knip.dev/features/integrated-monorepos

## Overview

Integrated monorepos have multiple projects within a single `package.json`, with configuration files distributed throughout. Nx integrated style is a notable example.

An integrated monorepo functions as a single workspace.

## Entry Files

Default entry points may be insufficient. Use glob patterns:

```json
{
  "entry": ["{apps,libs}/**/src/index.{ts,tsx}"],
  "project": ["{apps,libs}/**/src/**/*.{ts,tsx}"]
}
```

## Plugins

Configure plugins with appropriate globs for distributed config files:

```json
{
  "eslint": {
    "config": ["{apps,libs}/**/.eslintrc.json"]
  },
  "cypress": {
    "entry": ["apps/**/cypress.config.ts", "apps/**/cypress/e2e/*.spec.ts"]
  }
}
```

## Internal Workspace Dependencies

Two approaches:

1. List all dependencies in each consuming `package.json` for fine-grained reporting
2. Use `ignoreDependencies: ["@internal/*"]` to suppress internal package warnings

# Writing A Plugin

Source: https://knip.dev/writing-a-plugin

## Overview

Plugins accomplish at least one of:
1. Define entry file patterns
2. Find dependencies in configuration files

## Basic Entry Plugin (Tailwind)

```javascript
const title = 'Tailwind';
const enablers = ['tailwindcss'];
const isEnabled = ({ dependencies }) => hasDependency(dependencies, enablers);
const entry = ['tailwind.config.{js,cjs,mjs,ts}'];
const plugin = { title, enablers, isEnabled, entry };
export default plugin;
```

### Properties

- **title**: Display name
- **enablers**: Dependency names (regex supported) matched against `package.json`
- **isEnabled**: Function checking required dependencies
- **entry**: File patterns added as entry files

## Config File Parsing (NYC)

```javascript
const title = 'nyc';
const enablers = ['nyc'];
const isEnabled = ({ dependencies }) => hasDependency(dependencies, enablers);
const config = ['.nycrc', '.nycrc.{json,yml,yaml}', 'nyc.config.js', 'package.json'];

const resolveConfig = config => {
  const extend = config?.extends ?? [];
  const requires = config?.require ?? [];
  return [extend, requires].flat().map(id => toDeferResolve(id));
};

const plugin = { title, enablers, isEnabled, config, resolveConfig };
```

- **config**: Configuration file locations
- **resolveConfig**: Processes config values, returns entries/dependencies

## Entry Pattern Customization (Mocha)

```javascript
const entry = ['**/test/*.{js,cjs,mjs}'];

const resolveConfig = localConfig => {
  const entryPatterns = localConfig.spec ? [localConfig.spec].flat() : entry;
  return entryPatterns.map(id => toEntry(id));
};
```

## AST Processing (Astro)

```javascript
const resolveFromAST = (program) => {
  const componentPaths = getComponentPaths(program);
  return [...production, ...componentPaths].map(id => toProductionEntry(id));
};
```

`resolveFromAST` accesses dynamic configuration values not available in parsed objects.

## Custom Resolution (Fallback)

```javascript
const resolve = async options => {
  return toDependency('troublesome', { optional: true });
};
```

## Creating New Plugins

```sh
cd packages/knip
npm create-plugin --name tool
```

Generates source, test files, and fixtures. Run tests:

```sh
node --test test/plugins/tool.test.ts
```

## Supported Config Formats

JSON, YAML, TOML, JavaScript, TypeScript, plain text.

# Getting Started

Install and basic setup of commitlint.

> **Source**: https://commitlint.js.org/guides/getting-started

## Installation

Install `@commitlint/cli` and the config package `@commitlint/config-conventional` as devDependencies.

```bash
# npm
npm install -D @commitlint/cli @commitlint/config-conventional
```

```bash
# yarn
yarn add -D @commitlint/cli @commitlint/config-conventional
```

```bash
# pnpm
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

```bash
# bun
bun add -d @commitlint/cli @commitlint/config-conventional
```

```bash
# deno
deno add -D npm:@commitlint/cli npm:@commitlint/config-conventional
# Deno 2 only: create a local node_modules directory for Node.js module resolution
deno install --node-modules-dir=auto
```

## Create a configuration file

Create a config file that extends `@commitlint/config-conventional`.

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

This generates a `commitlint.config.js` with the following content:

```javascript
export default { extends: ['@commitlint/config-conventional'] };
```

`@commitlint/config-conventional` provides a ruleset based on the [Conventional Commits](https://www.conventionalcommits.org/) specification.

On Windows, create the file with the node command to avoid encoding issues:

```bash
# Here we use the node command to avoid encoding issue on Windows.
node -e "fs.writeFileSync('commitlint.config.js', process.argv[1])" "export default { extends: ['@commitlint/config-conventional'] };"
```

## Notes

- v21.2.3 removed the Node 24 config-loading workaround (`npm init es6` / renaming to `.mjs`) from the docs; the same release fixed config loading on Node majors above 20 (#4961, #4972).
- Requirements are Node.js >= 22.12.0 and git >= 2.13.2. These are not on the docs site; the sources are README.md "Version Support and Releases" and `engines` in `@commitlint/cli/package.json`

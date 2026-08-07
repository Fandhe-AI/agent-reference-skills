# Configuring Tasks

## Usage

### dependsOn

#### `^` topological dependency

```json
{ "build": { "dependsOn": ["^build"] } }
```

Runs `build` in all dependency packages first.

#### Same-package dependency

```json
{ "test": { "dependsOn": ["build"] } }
```

Runs `build` in the same package first.

#### `package#task` syntax

```json
{ "lint": { "dependsOn": ["utils#build"] } }
```

Declares an explicit dependency on a specific task in a specific package.

#### No dependency (parallel execution)

Omit `dependsOn` or set it to an empty array.

### outputs (cache targets)

```json
{ "build": { "outputs": [".next/**", "!.next/cache/**", "dist/**"] } }
```

Without `outputs`, no file caching occurs (only logs are cached).

### inputs (files that affect the hash)

```json
{ "spell-check": { "inputs": ["**/*.md", "**/*.mdx"] } }
```

Special values:
- `$TURBO_DEFAULT$`: keep the default behavior while adding/excluding files
- `$TURBO_ROOT$`: path relative to the repository root
- `$TURBO_EXTENDS$`: append to an inherited value

### Root tasks

```json
{ "//#lint:root": {} }
```

Runs a `package.json` script from the workspace root.

### cache: false (side-effect tasks)

```json
{ "deploy": { "dependsOn": ["^build"], "cache": false } }
```

### persistent + with (long-running tasks)

```json
{
  "dev": {
    "with": ["api#dev"],
    "persistent": true,
    "cache": false
  }
}
```

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

#### Deferred hashing

Some tasks need to hash files created by another task in the same run. Use structured `inputs` with `mode: "jit"` or `mode: "dependencyOutputs"` to defer hashing until the task's dependencies have completed (see the turbo.json reference for the full object shapes):

```json
{ "build": { "dependsOn": ["codegen"], "inputs": ["$TURBO_DEFAULT$", { "mode": "jit", "globs": ["src/generated/**"] }] } }
```

### Root tasks

```json
{ "//#lint:root": {} }
```

Runs a `package.json` script from the workspace root (`turbo run lint:root` from the root or `turbo run //#lint:root` from any workspace). Use for linting/formatting the Workspace root, incremental migration, and scripts without a package scope.

### Advanced use cases

- Using Package Configurations: `turbo.json` files placed directly in a package let it define behavior for its own tasks without affecting the rest of the repository.
- Composing configurations: extend from other packages (shared configuration packages) and use `$TURBO_EXTENDS$` to add to inherited arrays like `outputs` and `env` instead of replacing them.
- Dependent tasks that can be run in parallel (transit nodes): `"check-types": {}` runs in parallel but ignores source changes in dependencies; `"dependsOn": ["^check-types"]` is correct but serializes. Introduce a Transit Node, a task matching no `package.json` script (any unused name):
  ```json
  { "transit": { "dependsOn": ["^transit"] }, "check-types": { "dependsOn": ["transit"] } }
  ```
  Tasks then run in parallel and stay aware of changes to internal dependencies.

### cache: false (side-effect tasks)

Use for tasks that must always run (e.g. a deployment script after a cached build).

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

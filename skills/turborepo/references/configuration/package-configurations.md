# Package-Specific turbo.json

## Usage

`extends` inherits the root `turbo.json` configuration. It is only valid in a package-level `turbo.json`.

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

`"extends": ["//"]` refers to the root workspace. `//` is the special name identifying the monorepo root; other packages can be appended by `package.json` name (e.g. `["//", "shared-config"]`).

```
apps/web/turbo.json      # defines outputs for the Next.js app
packages/ui/turbo.json   # defines outputs for the UI library
```

## Notes

### Inheritance behavior

- Scalar fields (`outputLogs`, `cache`, `persistent`, `interactive`, ...) are inherited from the root; specify them only to override.
- Array fields (`outputs`, `env`, `inputs`, `dependsOn`, `passThroughEnv`, task `tags`) completely replace the root values by default (they are not merged; `dependsOn` is also replaced).
- To append instead, put `$TURBO_EXTENDS$` as the first element; it works with `outputs`, `env`, `inputs`, `dependsOn`, `passThroughEnv`, task `tags`, and `with`:
  ```jsonc
  "build": { "outputs": ["$TURBO_EXTENDS$", ".next/**"] }  // keeps root "dist/**"
  ```
- Task `tags`: omission inherits, an explicit array replaces, `[]` clears. Top-level package `tags` label the current package and are not inherited as task configuration.
- Extending from other packages: the root `"//"` must be listed first. Order of application: root `turbo.json`, then each additional package in order, then the current package last. Later configurations override earlier ones for scalar fields.
  ```jsonc
  { "extends": ["//", "shared-config"], "tasks": { "build": { "env": ["MY_API_URL"] } } }
  ```
- Sharing patterns: extend from an existing "canonical" package, or create a dedicated configuration package containing only `package.json` and `turbo.json`.
- Excluding tasks: task-level `extends: false` with no other config excludes the inherited task from the package (the package is skipped for that task); with other config it creates a fresh definition that inherits nothing. Exclusions propagate to packages that extend the excluding package. Task-level `extends` in the root `turbo.json` is a validation error.
  ```jsonc
  "lint": { "extends": false }
  ```

### Comparison to package-specific tasks

The `package#task` syntax in the root `turbo.json` completely overwrites all task configuration (nothing is inherited). With Package Configurations scalar fields are inherited and only specified fields are overridden. There are no plans to remove package-specific task configurations.

### Boundaries Tags (Experimental)

Package Configurations also declare tags for Boundaries with a top-level `tags` field (e.g. `"tags": ["my-tag"]`); rules for allowed dependencies / dependents are defined in the root `boundaries` config.

### Limitations

- No `workspace#task` entries in a Package Configuration (the package is inferred from the location; configuring another package is not allowed). A task may still `dependsOn` a package-specific task such as `some-pkg#compile`.
- Only the `tasks` key can be overridden; global options like `globalEnv` / `globalDependencies` cannot.
- The root `turbo.json` cannot use `extends` (it is ignored) to avoid circular dependencies.

### Troubleshooting

`turbo run build --dry-run` output includes a `resolvedTaskDefinition`, the combination of all `turbo.json` configurations considered for the task.

## Related

- [turbo.json](./turbo-json.md)

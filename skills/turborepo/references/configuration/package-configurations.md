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

`"extends": ["//"]` refers to the root workspace.

```
apps/web/turbo.json      # defines outputs for the Next.js app
packages/ui/turbo.json   # defines outputs for the UI library
```

## Notes

- A package's `turbo.json` can override the same-named task's configuration from the root:
  - `outputs`, `inputs`, `env`, `passThroughEnv` are overridden
  - `dependsOn` is merged with the root configuration

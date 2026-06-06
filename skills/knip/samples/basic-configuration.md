# Basic Configuration

Configure entry and project file patterns in `knip.json` to define the analysis scope.

```json
{
  "$schema": "https://unpkg.com/knip@6/schema.json",
  "entry": ["src/index.ts", "scripts/{build,create}.js"],
  "project": ["src/**/*.ts", "scripts/**/*.js"]
}
```

Exclude specific paths with negated patterns:

```json
{
  "entry": ["src/routes/*.ts", "!src/routes/_*.ts"],
  "project": ["src/**/*.ts", "!src/exclude/**"]
}
```

## Notes

- Custom `entry` and `project` values **override** defaults, they do not merge
- Default entry: `index.{js,ts}` and `src/index.{js,ts}`; default project: `**/*.{js,ts}`
- Config file is auto-detected: `knip.json`, `.knip.json`, `knip.ts`, `knip.config.ts`, or `"knip"` key in `package.json`
- Do not use `ignore` to exclude files from analysis; use negated `project` patterns instead

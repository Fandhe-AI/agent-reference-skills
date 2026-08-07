# Dependency Management

## Usage

### Declaring internal package dependencies

**pnpm / bun**: `"@repo/ui": "workspace:*"`
**npm / yarn**: `"@repo/ui": "*"`

### Bulk install across multiple packages

```bash
# pnpm
pnpm add jest --save-dev --recursive --filter=web --filter=@repo/ui

# npm
npm install jest --workspace=web --workspace=@repo/ui --save-dev

# yarn (2+)
yarn workspaces foreach -R --from '{web,@repo/ui}' add jest --dev
```

## Notes

- **Install where it's used**: declare dependencies directly in the `package.json` of the package that uses them.
- **Keep the root for tooling only**: turbo, husky, lint-staged, etc.
- Turborepo does not manage dependencies itself — that is the package manager's job.
- Version alignment tools: `syncpack`, `manypkg`, `sherif`, or pnpm v9.5+'s **catalogs** feature.

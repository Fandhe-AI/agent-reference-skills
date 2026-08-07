# Upgrading

## Usage

### Automatic migration with codemods

```bash
# pnpm
pnpm dlx @turbo/codemod migrate

# yarn
yarn dlx @turbo/codemod migrate

# npm
npx @turbo/codemod migrate

# bun
bunx @turbo/codemod migrate
```

Automatically updates `turbo.json` and adds a `name` field to workspace `package.json` files.

### Key changes in v2.0

#### packageManager field is now required

Add a `packageManager` field to the root `package.json`:

```json
{
  "packageManager": "pnpm@9.2.0"
}
```

#### Environment variable mode change

Strict Mode is now the default. For a gradual migration, use the `--env-mode=loose` flag or the `envMode` key in `turbo.json`.

#### Removed flags

| Removed flag | Replacement |
| --- | --- |
| `--ignore` | `--filter` |
| `--scope` | `--filter` |

#### Filtering changes

- Automatic namespace inference has been removed
- Specifying a package that doesn't match now errors
- `--only` now restricts task dependencies instead of package dependencies

#### Cache hash change

The root `package.json`'s `engines` field is now included in the cache hash.

## Notes

- If you use `eslint-config-turbo`, update it to a matching major version.

## Related

- [configuring-tasks](../crafting-your-repository/tasks.md)
- [environment-variables](../crafting-your-repository/environment-variables.md)

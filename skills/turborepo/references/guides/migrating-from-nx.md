# Migrating from Nx

## Signature / Usage

Migration motivations:

- Alignment with ecosystem standards (reuse the JS package manager's native workspaces)
- Reduced configuration (roughly 15 lines vs 40+)

Migration steps:

1. Add `.turbo` to `.gitignore`
2. Create the workspace definition
3. Add a `package.json` to each app
4. Remove Nx plugins from the configuration
5. Set the `packageManager` field
6. Run the package manager's install
7. Install Turborepo
8. Create `turbo.json`
9. Verify with `turbo build`
10. Enable Remote Caching

## Options / Props

| Nx | Turborepo |
|---|---|
| `sharedGlobals` | `globalDependencies` |
| `cacheDirectory` | `cacheDir` |
| `inputs` | `tasks[task].inputs` |
| `outputs` | `tasks[task].outputs` |

| Nx | Turborepo |
|---|---|
| `nx run` | `turbo run` |
| `nx run-many` | `turbo run` |
| `--projects` | `--filter` |
| `--parallel` | `--concurrency` |

## Notes

- Migrate one task or package at a time. Nx and Turborepo can run side by side during the migration.

# Upgrading Storybook

Run the `upgrade` script from the repository root to move Storybook projects to a new version, apply automigrations, and run a health check. Storybook follows Semantic Versioning: patch releases continuously, minor releases every few months, major releases (breaking changes) roughly once per year.

## Signature / Usage

```bash
npx storybook@latest upgrade [options]
```

```bash
# Upgrade with logging for debugging
npx storybook@latest upgrade --loglevel debug --logfile debug-storybook.log

# Force upgrade without prompts
npx storybook@latest upgrade --force --yes

# Upgrade specific config directories only
npx storybook@latest upgrade --config-dir .storybook-app .storybook-ui
```

Target version is whatever you specify:

- `npx storybook@latest upgrade` upgrades to the latest version
- `npx storybook@8.6.1 upgrade` upgrades to `8.6.1`
- `npx storybook@9 upgrade` upgrades to the newest `9.x.x`
- `npx storybook@next upgrade` upgrades to the newest pre-release
- `npx storybook@8.0.0-beta.1 upgrade` upgrades to that pre-release

See the `upgrade` command reference in `../api/cli-options.md` for the full flag list.

## Upgrade process

The script:

- Detects all Storybook projects in the repository
- Upgrades all Storybook packages to the specified version
- Runs the relevant automigrations, factoring in the breaking changes between the current and target version
- Runs the `doctor` command to verify the upgrade

### Automigrate and doctor

```bash
npx storybook automigrate
npx storybook@latest doctor
```

`automigrate` runs standard configuration checks, explains what is out of date, and offers to fix it. It runs automatically as part of `upgrade` but is also available on its own (useful when ecosystem changes in Angular, Next.js, Svelte, etc. require config updates without a Storybook upgrade). `doctor` checks for duplicated dependencies, incompatible addons, or mismatched versions.

### Experimental feature flags

When an upgrade crosses into Storybook 10.5, the automigration step additionally offers to enable the experimental `experimentalReview` and `experimentalDocgenServer` feature flags. They are strictly opt-in: they appear unchecked in the prompt, and `--yes` skips them unless named with `--features`. If your configuration already sets one of them (`true` or `false`), it is left untouched and not offered. `experimentalDocgenServer` is only offered on frameworks that provide server-side docgen.

```bash
npx storybook@latest upgrade --features experimentalReview,experimentalDocgenServer
```

### Mono-repositories

- Automatic detection of all Storybook projects
- If each Storybook has its own independent dependencies in its own `package.json`, you can select which project to upgrade
- If Storybooks share dependencies, all detected projects are upgraded together

Limit scope in large mono-repositories with `STORYBOOK_PROJECT_ROOT`:

```bash
STORYBOOK_PROJECT_ROOT=./packages/frontend npx storybook@latest upgrade
```

### Error handling

- A `debug-storybook.log` file is created in the repository root with all relevant logs
- Use `--loglevel debug` for more detail
- File a GitHub issue with the logs if needed

## Notes

- Always run the command from the repository root.
- `upgrade` is designed to go from one major version to the next. Storybook 8 -> `npx storybook@9 upgrade` is OK; Storybook 7 -> `npx storybook@9 upgrade` is not. To go across more than one major, run it repeatedly (e.g. `npx storybook@8 upgrade`, then `npx storybook@9 upgrade`). The only exception: 6.x.x -> 8.x.x can be done directly with `npx storybook@8 upgrade`.
- The docs prose writes `storybook@<version> upgrade` as shorthand; run it through a package runner (`npx` / `pnpm dlx` / `yarn dlx`), as the official storybook-upgrade snippet does.
- Pre-releases are published almost daily; to downgrade to a stable version, edit the package versions in `package.json` and reinstall.
- Troubleshooting: if the project is not detected, pass `--config-dir` (accepts multiple directories; default is `.storybook` directories). Automigrations usually only transform files inside `.storybook` and the story / mdx files referenced by the Storybook configuration; other files containing Storybook-specific code may need manual migration.
- Vue 2 projects can no longer upgrade past the latest 7.x (Vue 2 reached end of life on December 31st, 2023); upgrade to Vue 3 first.
- Also check `MIGRATION.md` in the Storybook repository for the detailed log of changes and deprecations.
- Source: https://storybook.js.org/docs/releases/upgrading (Storybook v10.6.2).

## Related

- [Migration guide for Storybook 10](./migration-guide.md)
- [Migration guide from Storybook 8.x to 9.1](./migration-guide-from-older-version.md)
- [Feature lifecycle](./feature-lifecycle.md)
- [CLI options](../api/cli-options.md)

# Migration guide from Storybook 8.x to 9.1

Guide for upgrading from Storybook 8.x to 9.1: breaking changes, automatic upgrade, package consolidation, and optional migrations. Storybook 9 adds Storybook Test (component testing, accessibility testing, test coverage), a 48% lighter bundle, React Native for device and web, and tags-based story organization.

## Signature / Usage

```bash
npx storybook@9 upgrade
```

The upgrade finds all Storybook projects, checks that no breaking change blocks the project (otherwise it prints resolution instructions), upgrades dependencies, and runs automigrations (check, explain, ask approval, apply). To add Storybook 9 to a new project, run `npm create storybook@latest`.

## Major breaking changes

- Packages consolidated/removed (see below)
- Essential addons (viewport, controls, interactions, actions) moved to core
- Test addon renamed from `experimental-addon-test` to `addon-vitest`
- `nextjs-vite` framework stabilized
- Webpack builder support removed for Preact, Vue, and Web Components in favor of Vite
- Manager builder removed alias for `util`, `assert` and `process`
- Ecosystem minimums: Node 20+, Angular 18+, Lit v3+, Next.js 14+, Svelte 5+, Vite 5+, Vitest 3+, npm 10+, pnpm 9+, yarn 4+, TypeScript 4.9+

## Package structure changes

Removed packages (consolidated into core `storybook`):

| Removal | Replacement |
|---------|-------------|
| `@storybook/addon-actions` | `storybook/actions` |
| `@storybook/addon-backgrounds` | N/A |
| `@storybook/addon-controls` | N/A |
| `@storybook/addon-highlight` | `storybook/highlight` |
| `@storybook/addon-interactions` | N/A |
| `@storybook/addon-measure` | N/A |
| `@storybook/addon-outline` | N/A |
| `@storybook/addon-toolbars` | N/A |
| `@storybook/addon-viewport` | `storybook/viewport` |
| `@storybook/manager-api` | `storybook/manager-api` |
| `@storybook/preview-api` | `storybook/preview-api` |
| `@storybook/test` | `storybook/test` |
| `@storybook/theming` | `storybook/theming` |

Moved to internal paths (work in 9.x, likely removed in 10.0; addon authors may keep using them, no replacement yet):

| Deprecation | Replacement |
|-------------|-------------|
| `@storybook/builder-manager` | `storybook/internal/builder-manager` |
| `@storybook/channels` | `storybook/internal/channels` |
| `@storybook/client-logger` | `storybook/internal/client-logger` |
| `@storybook/components` | `storybook/internal/components` |
| `@storybook/core-common` | `storybook/internal/common` |
| `@storybook/core-events` | `storybook/internal/core-events` |
| `@storybook/core-server` | `storybook/internal/core-server` |
| `@storybook/csf-tools` | `storybook/internal/csf-tools` |
| `@storybook/docs-tools` | `storybook/internal/docs-tools` |
| `@storybook/manager` | `storybook/internal/manager` |
| `@storybook/node-logger` | `storybook/internal/node-logger` |
| `@storybook/preview` | `storybook/internal/preview` |
| `@storybook/router` | `storybook/internal/router` |
| `@storybook/telemetry` | `storybook/internal/telemetry` |
| `@storybook/types` | `storybook/internal/types` |

## Optional migrations

- `test-runner` to `addon-vitest`: `addon-vitest` and the Storybook Test experience are designed to supersede the `test-runner` (faster, better authoring). Consider it if the project uses React, Vue, or Svelte and is built with Vite.
- CSF 2 to CSF 3: a codemod converts stories (update the glob to fit your files). The codemod command is given in the official page as a snippet; it is not reproduced in the local source.

## Notes

- Troubleshooting: run `storybook doctor`; try `build` instead of `dev` for clearer errors; consult the full migration notes (`MIGRATION.md`, section "From version 8.x to 9.0.0"); remove non-`@storybook` addons to isolate incompatibilities (keep the `storybook` package); bisect prerelease versions (e.g. `9.0.0-alpha.0` is nearly identical to `8.6.x`).
- Storybook 7.x -> 8.x and 6.x -> 8.x have separate older guides on the 8.6 docs (`release-8-6`).
- If a new requirement blocks you, stay on Storybook 8.x.
- For Storybook 9.x to 10, see the Storybook 10 guide.

## Related

- [Migration guide for Storybook 10](./migration-guide.md)
- [Upgrading Storybook](./upgrading.md)

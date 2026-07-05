# ESLint Plugin

Next.js's `eslint-config-next` package catches common issues in a Next.js app, bundling `@next/eslint-plugin-next` plus recommended `eslint-plugin-react` / `eslint-plugin-react-hooks` rule sets.

## Signature / Usage

```bash
npm i -D eslint eslint-config-next
```

```js filename="eslint.config.mjs"
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
])

export default eslintConfig
```

## Options / Props

| Config export | Description |
|------|-------------|
| `eslint-config-next` | Base config: Next.js + React + React Hooks rules (JS and TS). |
| `eslint-config-next/core-web-vitals` | Base config plus Core Web Vitals-impacting rules upgraded from warning to error. Recommended for most projects; auto-included by `create-next-app`. |
| `eslint-config-next/typescript` | Adds `typescript-eslint` recommended rules; use alongside base or core-web-vitals config. |

Notable `@next/eslint-plugin-next` rules (all enabled in the recommended config): `no-img-element`, `no-html-link-for-pages`, `no-sync-scripts`, `no-css-tags`, `no-page-custom-font`, `google-font-display`, `google-font-preconnect`, `no-unwanted-polyfillio`, `no-async-client-component`, `no-assign-module-variable`, `inline-script-id`, `no-typos`, and several `pages/_document.js`-specific rules (`no-document-import-in-page`, `no-head-element`, `no-duplicate-head`, `no-title-in-document-head`, `no-styled-jsx-in-document`, `no-script-component-in-head`, `no-before-interactive-script-outside-document`, `no-head-import-in-document`).

## Notes

- **`next lint` and the `eslint` next.config.js option were removed in Next.js 16** in favor of running the ESLint CLI directly; a codemod (`migrate-from-next-lint-to-eslint-cli`) is available to help migrate.
- Monorepo setups: set `settings.next.rootDir` (path, glob, or array) when Next.js isn't installed at the ESLint root.
- Disable/override individual rules via the `rules` property in your flat config array.
- Pair with `eslint-config-prettier` (as a later entry in the config array) to avoid conflicts between ESLint formatting rules and Prettier.
- If you already have conflicting plugins (`react`, `react-hooks`, `jsx-a11y`, `import`) or custom `parserOptions`/resolvers configured, use `@next/eslint-plugin-next` directly instead of spreading `eslint-config-next`.

## Related

- [typescript.md](./typescript.md)

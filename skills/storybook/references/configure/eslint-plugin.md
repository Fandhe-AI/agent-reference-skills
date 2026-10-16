# ESLint plugin

`eslint-plugin-storybook` helps write stories and components aligned with Storybook best practices. Applied automatically to files matching `*.stories.*` (recommended) or `*.story.*`.

## Signature / Usage

Flat config (default in ESLint v9, usable from v8.57.0). The `defineConfig` / `globalIgnores` helpers imported from `eslint/config` below require ESLint v9.22.0 or later; on v8.57.x or earlier v9 releases, export the config array directly (see Notes):

```js
// eslint.config.js
import storybook from 'eslint-plugin-storybook';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...storybook.configs['flat/recommended'],
  {
    // This should match the `stories` property in .storybook/main.js|ts
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      'storybook/csf-component': 'error',
      'storybook/default-exports': 'off',
    },
  },
]);
```

Legacy `.eslintrc` (ESLint < v9):

```js
{
  "extends": ["plugin:storybook/recommended"]
}
```

```txt
# .eslintignore
!.storybook
```

Flat config equivalent of the `.eslintignore` line (`globalIgnores` requires ESLint v9.22.0 or later):

```js
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  // ...
]);
```

With `typescript-eslint` helpers, do not destructure the config:

```ts
// eslint.config.ts
import storybook from 'eslint-plugin-storybook';
import somePlugin from 'some-plugin';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  somePlugin,
  storybook.configs['flat/recommended'], // notice that it is not destructured
);
```

## Options / Props

ESLint compatibility:

| ESLint version | Storybook plugin version |
| --- | --- |
| `^10.0.0` | `^10.3.0` |
| `^9.0.0` | `^9.0.0` or `^10.0.0` |
| `^8.57.0` | `^9.0.0` or `^10.0.0` |
| `^7.0.0` | `~0.9.0` |

Configurations: `csf`, `csf-strict`, `addon-interactions`, `recommended` (each also available as `flat/<name>`).

Rules (all prefixed `storybook/`):

| Name | Description | Auto-fixable | Configurations |
| --- | --- | --- | --- |
| `await-interactions` | Interactions should be awaited | yes | addon-interactions, recommended |
| `context-in-play-function` | Pass a context when invoking play function of another story | no | recommended, addon-interactions |
| `csf-component` | The component property should be set | no | csf, csf-strict |
| `default-exports` | Story files should have a default export | yes | csf, recommended, csf-strict |
| `hierarchy-separator` | Deprecated hierarchy separator in title property | yes | csf, recommended, csf-strict |
| `meta-inline-properties` | Meta should only have inline properties | no | N/A |
| `meta-satisfies-type` | Meta should use `satisfies Meta` | yes | N/A |
| `no-redundant-story-name` | A story should not have a redundant name property | yes | csf, recommended, csf-strict |
| `no-renderer-packages` | Do not import renderer packages directly in stories | no | recommended |
| `no-stories-of` | storiesOf is deprecated and should not be used | no | csf-strict |
| `no-title-property-in-meta` | Do not define a title in meta | yes | csf-strict |
| `no-uninstalled-addons` | Identifies addons that are invalid because they are not installed or contain a typo | no | recommended |
| `prefer-pascal-case` | Stories should use PascalCase | yes | recommended |
| `story-exports` | A story file must contain at least one story export | no | recommended, csf, csf-strict |
| `use-storybook-expect` | Use expect from `@storybook/test`, `storybook/test` or `@storybook/jest` | yes | addon-interactions, recommended |
| `use-storybook-testing-library` | Do not use testing-library directly on stories | yes | addon-interactions, recommended |

## Notes

- The `!.storybook` ignore entry makes the plugin lint files inside `.storybook` too (e.g. it can catch mistyped addon names in `main.js|ts`).
- The `defineConfig` / `globalIgnores` helpers imported from `eslint/config` require ESLint v9.22.0 or later; on v8.57.x or earlier v9 releases, export the config array directly (e.g. `export default [...storybook.configs['flat/recommended'], { files: [...], rules: {...} }];` and use `{ ignores: ['!.storybook'] }` instead of `globalIgnores`).
- The plugin does not support MDX files.
- oxlint usage is not described in the v10.6.2 docs source for this page; nothing is stated here about it.
- Plugin rule docs live in the Storybook repo under `code/lib/eslint-plugin/docs/rules/`.
- Source: https://storybook.js.org/docs/configure/integration/eslint-plugin (Storybook v10.6.2).

## Related

- [Features and behavior](./features-and-behavior.md)
- [TypeScript](./typescript.md)

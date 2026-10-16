# Kit: Extensions

Plugins, adapters, and parsers are all extensions. `defineExtension` takes a definition object with a `kind` and `meta`, and returns a factory that the config calls with the user's options.

## Signature / Usage

```typescript
import { defineExtension } from 'kubb/kit'

export const pluginExample = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-example' },
})
```

| `kind` | Defines | Other fields |
| --- | --- | --- |
| `'plugin'` | A plugin that generates code from the AST. | `setup`, `dependencies`, `enforce`, `hooks` |
| `'adapter'` | An adapter that reads the input into the AST. | `setup`, `build` |
| `'parser'` | A parser that prints files to source text. | `build` |

## `meta`

```typescript
import { defineExtension } from 'kubb/kit'

export const pluginExample = defineExtension({
  kind: 'plugin',
  meta: {
    name: 'plugin-example',
    version: '1.0.0',
    displayName: 'Example',
    description: 'Adds a comment to every generated schema.',
    compatibility: { kubb: '>=5.7.0', node: '>=22' },
  },
})
```

| Property | Type | Description |
| --- | --- | --- |
| `name` | `string` | Unique name. Required. The plugin's or parser's own `name` is deprecated in favor of it. |
| `version` | `string` | Package version. Plugins that depend on this one check their `version` range against it. |
| `displayName` | `string` | Human-readable name, such as `'TypeScript'`. |
| `description` | `string` | One-sentence summary of what the extension generates or does. |
| `category` | `string` | Registry category, such as `'types'` or `'client'`. |
| `icon` | `{ light: string; dark?: string }` | Icon URLs, with an optional variant for dark backgrounds. |
| `media` | `Array<string>` | Screenshots or videos, as HTTPS URLs. |
| `tags` | `Array<string>` | Search keywords for the registry. |
| `compatibility` | `{ kubb?: string; node?: string }` | Semver ranges for `@kubb/core` and Node.js. |
| `docs` | `string` | URL of the extension's docs page. |
| `issues` | `string` | URL of the issue tracker. When the extension crashes, Kubb prints it as the `report:` link. |

## `dependencies`

A plugin's `dependencies` lists the plugins it builds on, keyed by name. They run first when the config has them.

```typescript
import { defineExtension } from 'kubb/kit'

export const pluginExample = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-example' },
  dependencies: {
    'plugin-ts': { version: '>=5.0.0' },
    'plugin-zod': { optional: true },
  },
})
```

| Entry field | Type | Description |
| --- | --- | --- |
| `version` | `string` | Semver range the dependency's `meta.version` must satisfy. Skipped when the dependency has no `meta.version`. |
| `optional` | `boolean` | When `true`, a missing plugin is skipped. An installed one still has its `version` checked. |

A function form `dependencies: (options) => ({ ... })` receives the user's options and returns the record.

## Notes

- 出典: https://kubb.dev/docs/5.x/reference/kit/extensions （kubb@5.11.0 の docs/5.x/reference/kit/extensions.md）
- `definePlugin`, `defineParser`, and `createAdapter` are deprecated. Each takes the same definition object as `defineExtension`, without `kind`; pass it to `defineExtension` and add `kind: 'plugin'`, `'parser'`, or `'adapter'`.
- Read `version` from `package.json` (`import { version } from '../package.json'`). A package shipping `kubb-extension.json` imports `compatibility` from it.
- Before any plugin runs, Kubb checks each plugin's and parser's `meta.compatibility` against the running `@kubb/core` and Node.js versions. A mismatch fails with `KUBB_INCOMPATIBLE_EXTENSION`. Prerelease versions are compared like regular ones.
- A missing required dependency fails with `KUBB_MISSING_DEPENDENCY`; a `meta.version` outside the range fails with `KUBB_INCOMPATIBLE_DEPENDENCY`.
- An array such as `dependencies: ['plugin-ts']` still works but only orders plugins; a missing one is skipped and versions are not checked.
- Every factory carries `kind` and `meta` statics (`pluginExample.kind`, `pluginExample.meta.name`). A factory built from a deprecated factory function has no `meta` on it; the returned plugin or parser still has `meta`, falling back to `{ name }`.

## Related

- [Plugins](./plugins.md)
- [Adapters](./adapters.md)
- [Parsers](./parsers.md)
- [Manifest](./manifest.md)

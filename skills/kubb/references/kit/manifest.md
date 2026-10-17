# Kit: Manifest

`kubb-extension.json` describes an extension package. It sits at the package root and ships on npm. The Kubb registry, `kubb add`, `kubb init`, `kubb list`, and the Studio agent read it.

## Signature / Usage

```json
{
  "$schema": "https://kubb.dev/schemas/kubb-extension.json",
  "kind": "plugin",
  "name": "plugin-example",
  "export": "pluginExample",
  "displayName": "Example",
  "description": "Writes a comment with the HTTP method and path of every operation.",
  "category": "documentation",
  "icon": { "light": "https://example.com/icon.svg" },
  "tags": ["comments", "operations"],
  "docs": "https://github.com/acme/kubb-plugin-example#readme",
  "maintainers": [{ "name": "Acme", "github": "acme" }],
  "compatibility": { "kubb": ">=5.8.3", "node": ">=22" },
  "options": [
    {
      "key": "prefix",
      "path": ["prefix"],
      "label": "Prefix",
      "description": "Text written at the start of every comment.",
      "type": "text"
    }
  ]
}
```

## Fields

| Name | Type | Description |
| --- | --- | --- |
| `$schema` | `string` | `https://kubb.dev/schemas/kubb-extension.json`. Only editors read it. |
| `kind` (required) | `'plugin' \| 'adapter' \| 'parser'` | What the package extends. `kubb add` adds a `plugin` to the config and prints the code for an `adapter` or `parser`. |
| `name` (required) | `string` | The extension's `meta.name`. Skipped when not shaped like an npm package name (lowercase letters, digits, `.`, `_`, `~`, `-`, optional `@scope/`). |
| `export` (required) | `string` | Factory export users call in `kubb.config.ts`, such as `pluginZod`. Must be a JavaScript identifier. |
| `displayName` (required) | `string` | Human-readable name. |
| `description` (required) | `string` | One sentence on what the extension does. |
| `category` | `string` | Category for filtering. The registry replaces it with the reviewer-picked main category. |
| `icon` | `{ light: string; dark?: string }` | Icon URLs; both must use HTTPS. |
| `media` | `Array<string>` | Screenshots or videos, as HTTPS URLs. |
| `tags` | `Array<string>` | Search keywords. |
| `docs` | `string` | Documentation URL, using HTTPS. |
| `maintainers` | `Array<{ name: string; github?: string }>` | People who maintain the extension, shown on its kubb.dev page. |
| `dependencies` | `Array<string>` | Extensions that must be in the same config, such as `["plugin-ts"]`. `kubb init` checks each is chosen. Generation does not read them. |
| `optionalDependencies` | `Array<string>` | Extensions used when present or needed only for some option values (`@kubb/plugin-msw` lists `["plugin-faker"]`). `kubb init` does not require them. |
| `compatibility` | `{ kubb?: string; node?: string }` | Semver ranges for `@kubb/core` and Node.js. Only these two keys are allowed. |
| `role` | `'client' \| 'consumer'` | Plugins only. `client` provides the HTTP client runtime (`@kubb/plugin-fetch`); `consumer` generates code that calls a client (`@kubb/plugin-react-query`). |
| `options` | `Array<ExtensionManifestOption>` | Form fields Kubb Studio shows for the extension. |

## Validation

| Reader | Checks | On failure |
| --- | --- | --- |
| `kubb add`, `kubb init`, `kubb update`, `kubb list`, Studio agent | Required fields set and well formed; each `maintainers` entry has a `name`; `dependencies` entries are extension names; `role` is `client` or `consumer`; `compatibility` holds only `kubb` and `node` string ranges; `options` is an array. | The manifest is skipped. |
| The registry | JSON Schema, unique option keys, `choices` on every `select`, and a `select` default equal to one of its choices. | The review pull request lists the problem, and the weekly bump keeps the previous pin. |

## Import `compatibility` into `meta`

```typescript
import { defineExtension } from 'kubb/kit'
import { compatibility } from '../kubb-extension.json'
import { version } from '../package.json'

export const pluginExampleName = 'plugin-example'

export const pluginExample = defineExtension({
  kind: 'plugin',
  meta: { name: pluginExampleName, version, compatibility },
  setup(options) {
    return options
  },
})
```

## Notes

- 出典: https://kubb.dev/docs/5.x/reference/kit/manifest （kubb@5.11.0 の docs/5.x/reference/kit/manifest.md）
- Readers ignore unknown top-level keys.
- Generation does not read the manifest; at runtime Kubb reads the extension's `meta`. Import only `compatibility` so a bundler leaves the rest (including `options`) out of your build.
- `kubb add` and `kubb update` check `compatibility` before installing.
- Keep `name` as a typed constant: a JSON import widens it to `string`. Named imports from JSON need a bundler that inlines them (such as tsdown). With plain `tsc` and `"module": "NodeNext"`, write the ranges in `meta.compatibility` instead.

## Related

- [Extensions](./extensions.md)
- [Extension docs](./extension-docs.md)

---
source: https://developers.cloudflare.com/workers/wrangler/configuration/#bundling
---

# Bundling Configuration (rules, find_additional_modules, python_modules)

Wrangler can bundle (default) or run with `--no-bundle`. In bundling mode it traverses all imports and generates a single JavaScript entry-point file. Additional modules uploaded alongside the entry-point are specified with the `rules` key.

## Signature / Usage

```jsonc
{
	"rules": [
		{
			"type": "Text",
			"globs": ["**/*.md"],
			"fallthrough": true,
		},
	],
}
```

```toml
[[rules]]
type = "Text"
globs = [ "**/*.md" ]
fallthrough = true
```

```js
import markdown from "./example.md";

export default {
	async fetch() {
		return new Response(markdown);
	},
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `string` required | One of `ESModule`, `CommonJS`, `CompiledWasm`, `Text` or `Data`. |
| `globs` | `string[]` required | Glob rules, e.g. `["**/*.md"]`. |
| `fallthrough` | `boolean` optional | When `true`, allows multiple rules for the same `type`. |

### Python Workers: `python_modules.exclude`

By default Python Workers bundle files in `python_modules` at the root of the Worker (where pywrangler copies packages). Exclude files to reduce bundle size:

```jsonc
{
	"python_modules": {
		"exclude": ["**/*.pyc", "**/__pycache__"],
	},
}
```

```toml
[python_modules]
exclude = [ "**/*.pyc", "**/__pycache__" ]
```

## Notes

- Normally Wrangler only includes additional modules that are statically imported. Setting `find_additional_modules` to `true` traverses the file tree below `base_dir` (defaults to the directory containing `main`); files matching `rules` are included as unbundled, external modules.
- By default `python_modules.exclude` is `["**/*.pyc"]`; include this when setting a different value.
- Wrangler bundling is not applicable with the Cloudflare Vite plugin.
- Docs inconsistency: this page and the type list use `ESModule`, while the official Bundling page example writes `"type": "EsModule"`; [bundling.md](./bundling.md) corrects that example to `ESModule`.

## Related

- [bundling.md](./bundling.md)
- [top-level-keys.md](./top-level-keys.md)
- [custom-builds.md](./custom-builds.md)

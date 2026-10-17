---
source: https://ui.shadcn.com/docs/registry/registry-json
---

# registry.json

Schema for the registry catalog / entry point. JSON Schema: `https://ui.shadcn.com/schema/registry.json`.

## Signature / Usage

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "shadcn",
  "homepage": "https://ui.shadcn.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "registryDependencies": [
        "button",
        "@acme/input-form",
        "https://example.com/r/foo"
      ],
      "dependencies": ["is-even@3.0.0", "motion"],
      "files": [
        {
          "path": "registry/default/hello-world/hello-world.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Composing with `include`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "include": [
    "components/ui/registry.json",
    "hooks/registry.json"
  ]
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `$schema` | `https://ui.shadcn.com/schema/registry.json`. |
| `name` | Name of the registry; used for data attributes and other metadata. |
| `homepage` | Homepage of the registry; used for data attributes and other metadata. |
| `include` | Relative paths to explicit `registry.json` files to compose. |
| `items` | Registry items; each must implement the registry-item schema. |

## Notes

- Each `include` path must be a relative path to an explicit `registry.json` file; folder shorthand is not supported.
- Included files may omit `name` and `homepage`; they are required only on the root `registry.json`.
- With `include`, `shadcn build` reads item file paths relative to the declaring `registry.json`; output is flattened and contains no `include`. Item names must be unique across the resolved registry, including all included files.
- The root must define at least one of `items` or `include`; `items` defaults to an empty array if omitted.
- Public GitHub repositories use the same source registry format; see GitHub Registries.

## Related

- [registry-item.json](./registry-item-json.md)
- [Getting Started](./getting-started.md)
- [GitHub Registries](./github.md)

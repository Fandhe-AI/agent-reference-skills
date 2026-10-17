---
source: https://ui.shadcn.com/docs/registry/registry-item-json
---

# registry-item.json

Specification for registry items. JSON Schema: `https://ui.shadcn.com/schema/registry-item.json`.

## Signature / Usage

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
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
  "devDependencies": ["tw-animate-css"],
  "files": [
    {
      "path": "registry/new-york/hello-world/hello-world.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/hello-world/use-hello-world.ts",
      "type": "registry:hook"
    }
  ],
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "oklch(0.205 0.015 18)"
    },
    "dark": {
      "brand": "oklch(0.205 0.015 18)"
    }
  }
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `$schema` | `https://ui.shadcn.com/schema/registry-item.json`. |
| `name` | Unique identifier of the item in the registry. |
| `title` | Short human-readable title. |
| `description` | Longer description than `title`. |
| `type` | Item type; determines type and target path when resolved for a project. |
| `author` | Author of the item (e.g. `"John Doe <john@doe.com>"`). |
| `dependencies` | npm packages; `name@version` allowed. |
| `devDependencies` | npm dev-only packages; `name@version` allowed. |
| `registryDependencies` | Item addresses: `button` (shadcn/ui), `@acme/input-form` (namespace), `acme/ui/button#v1.2.0` (GitHub), URL, or local file path `./editor.json`. |
| `files` | Array of `{ path, type, target? }`. |
| `tailwind` | DEPRECATED: use `cssVars.theme` for Tailwind v4 projects. |
| `cssVars` | CSS variables with `theme`, `light`, `dark` groups. |
| `css` | Rules added to the project CSS (`@layer base`, `@layer components`, `@utility`, `@keyframes`, `@plugin`, ...). |
| `envVars` | Environment variables added to `.env.local` or `.env`. |
| `font` | Required for `registry:font` items. |
| `docs` | Message shown when the item is installed via the CLI. |
| `categories` | Organizing categories, e.g. `["sidebar", "dashboard"]`. |
| `meta` | Arbitrary key/value metadata. |

Supported `type` values:

| Type | Description |
| --- | --- |
| `registry:base` | Use for entire design systems. |
| `registry:block` | Use for complex components with multiple files. |
| `registry:component` | Use for simple components. |
| `registry:font` | Use for fonts. |
| `registry:lib` | Use for lib and utils. |
| `registry:hook` | Use for hooks. |
| `registry:ui` | Use for UI components and single-file primitives. |
| `registry:page` | Use for page or file-based routes. |
| `registry:file` | Use for miscellaneous files. |
| `registry:style` | Use for registry styles. eg. `new-york`. |
| `registry:theme` | Use for themes. |
| `registry:item` | Use for universal registry items. |

`font` properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `family` | `string` | Yes | The CSS font-family value. |
| `provider` | `string` | Yes | The font provider. Currently only `google` is supported. |
| `import` | `string` | Yes | The import name for the font from `next/font/google`. |
| `variable` | `string` | Yes | The CSS variable name (e.g. `--font-sans`, `--font-mono`). |
| `weight` | `string[]` | No | Array of font weights to include. |
| `subsets` | `string[]` | No | Array of font subsets to include. |
| `selector` | `string` | No | CSS selector to apply the font to. Defaults to `html`. |
| `dependency` | `string` | No | npm package to install for non-Next.js projects (e.g. `@fontsource-variable/inter`). |

Target placeholders (only at the start of `target`):

| Placeholder | Resolves to |
| --- | --- |
| `@components/` | `aliases.components` |
| `@ui/` | `aliases.ui` |
| `@lib/` | `aliases.lib` |
| `@hooks/` | `aliases.hooks` |

## Notes

- `files[].target` is required for `registry:page` and `registry:file`. `~` refers to the project root (`~/foo.config.js`). `path` is used by the build script to parse, transform and build the JSON payload.
- Placeholders are independent of the project's import prefix (`@/`, `#`, package imports, workspace exports). `target` decides where the file is written even if it differs from the file `type`. Unknown placeholders are regular paths (`@foo/bar.ts` is written as `foo/bar.ts`); embedded ones such as `components/@ui/button.tsx` are regular paths. `@utils/` is not supported because `utils` points to a file, not a directory.
- Bare names in `registryDependencies` keep existing behavior: `button` means the built-in shadcn `button`, not an item from the same GitHub repository. Refs are not inherited across dependencies; pin each GitHub dependency to its own tag or full commit SHA.
- `envVars`: use for development or example variables, NOT production variables; existing variables are not overwritten.
- Deprecated: `tailwind.config` (theme extend, keyframes, animation); use `cssVars.theme` / `css` for Tailwind v4.

## Related

- [registry.json](./registry-json.md)
- [Examples](./examples.md)
- [GitHub Registries](./github.md)

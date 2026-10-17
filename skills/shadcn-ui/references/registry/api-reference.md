---
source: https://ui.shadcn.com/docs/registry/api-reference
---

# API Reference

Programmatic APIs exposed by the `shadcn` package under subpath imports: `shadcn/registry`, `shadcn/schema`, `shadcn/preset`. CLI commands themselves are not part of the public API; only the documented imports are stable.

## Signature / Usage

```ts
import { getRegistryItems } from "shadcn/registry"
import { registryItemSchema } from "shadcn/schema"
```

```ts
import { addRegistryItems, getRegistriesConfig } from "shadcn/registry"

const cwd = process.cwd()
const config = await getRegistriesConfig(cwd)

await addRegistryItems(["@acme/agent"], {
  cwd,
  config,
  overwrite: false,
  silent: true,
})
```

```ts
import { encodePreset } from "shadcn/preset"

const code = encodePreset({
  style: "vega",
  baseColor: "stone",
  theme: "blue",
  radius: "large",
  font: "geist",
})
// "bJ4FLU0"
```

## Options / Props

Common options for `shadcn/registry` functions:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `config` | `Partial<Config>` | built-in registries only | Registry configuration; its `registries` field maps a namespace to a URL and any headers / env vars. Load from a project with `getRegistriesConfig`. |
| `useCache` | `boolean` | `true` | In-memory cache for the process lifetime, keyed by resolved URL; concurrent requests are de-duplicated. Set `false` in long-running processes (servers, watchers, the MCP server). |

`shadcn/registry` functions:

| Function | Description |
| --- | --- |
| `getRegistriesConfig(cwd)` | Reads `components.json` when present, otherwise top-level `registries` in `package.json`. |
| `getRegistry(name, { config, useCache })` | Fetch one remote registry by name; rejects catalogs that still use `include`. |
| `getRegistryItems(names, { config, useCache })` | Fetch items by qualified name; returns an array. |
| `resolveRegistryItems(names, { config })` | Resolve items with `registryDependencies` into one merged tree (`dependencies`, `files`, `cssVars`, `docs`). |
| `addRegistryItems(names, { cwd, config, overwrite, silent })` | Programmatic equivalent of `shadcn add`. |
| `getRegistries({ useCache })` | Fetch the registry directory (`name`, `url`, `homepage` entries). |
| `searchRegistries(registries, { query, types, limit, offset, config, continueOnError })` | Fuzzy search; returns `{ pagination, items }` with `registry` and `addCommandArgument` per item. |
| `loadRegistry({ cwd, registryFile })` | Read and resolve a local `registry.json` (follows `include`); catalog omits file contents. Defaults: `process.cwd()`, `"registry.json"`. |
| `loadRegistryItem(name, { cwd })` | Build one item from local sources with file contents inlined. |

`shadcn/preset` config fields (output of `decodePreset("bJ4FLU0")` in the source docs): `style`, `baseColor`, `theme`, `chartColor`, `iconLibrary`, `font`, `fontHeading`, `radius`, `menuAccent`, `menuColor`.

## Notes

- `addRegistryItems` does not read project config itself; pass `getRegistriesConfig` output or `config`. A config with only `registries` suffices when every item and dependency is universal (`registry:item` / `registry:file` whose files all declare explicit targets); otherwise a full resolved project config (aliases, `resolvedPaths`) is needed, and every custom namespace referenced must be present. It throws instead of exiting and never prompts; existing files are skipped unless `overwrite` is enabled; npm uses `--force` for React 19 peer dependency conflicts.
- `loadRegistry` vs `getRegistry`: local disk with `include` resolution vs remote network fetch of an already-flattened catalog. `loadRegistryItem` vs `getRegistryItems`: local on-demand build (for dynamic routes) vs remote resolution.
- Errors extend `RegistryError`; use `RegistryErrorCode` or `instanceof`: `RegistryError`, `RegistryNotFoundError`, `RegistryUnauthorizedError`, `RegistryForbiddenError`, `RegistryFetchError`, `RegistryNotConfiguredError`, `RegistryLocalFileError`, `RegistryParseError`, `RegistryValidationError`, `RegistryItemNotFoundError`, `RegistriesIndexParseError`, `RegistryMissingEnvironmentVariablesError`, `RegistryInvalidNamespaceError`.
- `shadcn/schema` (Zod): `registrySchema`, `registryItemSchema`, `registryItemFileSchema`, `registryItemTypeSchema`, `registryItemCssVarsSchema`, `registryItemTailwindSchema`, `registryBaseColorSchema`, `configSchema`, `presetSchema`. Types: `Registry`, `RegistryItem`, `RegistryItemFile`, `RegistryBaseItem`, `RegistryFontItem`, `Config`, `Preset`, `ConfigJson`.
- `shadcn/preset`: `encodePreset` (omitted fields fall back to `DEFAULT_PRESET_CONFIG`; returns a version-prefixed URL-safe code), `decodePreset` (returns `null` for missing or invalid code), plus `isPresetCode`, `isValidPreset`, `generateRandomConfig`, `generateRandomPreset`, `toBase62`, `fromBase62`, and constants `PRESET_BASES`, `PRESET_STYLES`, `PRESET_BASE_COLORS`, `PRESET_THEMES`, `PRESET_ICON_LIBRARIES`, `PRESET_FONTS`, `PRESET_FONT_HEADINGS`, `PRESET_RADII`, `PRESET_MENU_ACCENTS`, `PRESET_MENU_COLORS`, `PRESET_CHART_COLORS`, `DEFAULT_PRESET_CONFIG`.

## Related

- [Getting Started](./getting-started.md)
- [registry.json](./registry-json.md)
- [registry-item.json](./registry-item-json.md)

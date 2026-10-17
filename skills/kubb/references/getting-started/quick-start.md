# Quick Start

Generate TypeScript types and an Axios client from an OpenAPI specification (Kubb 5.11.0 / docs 5.x tutorials/quickstart).

## Prerequisites

- Node.js 22.12 or higher
- npm (or another package manager)
- A valid OpenAPI 2.0, 3.0, or 3.1 file (YAML or JSON)

## Steps

### 1. Create a project

```bash
mkdir kubb-first-client
cd kubb-first-client
npm init -y
npm pkg set type=module
npm install -D kubb typescript @kubb/plugin-ts @kubb/plugin-axios
npm install axios
```

### 2. Add the specification

Create `petStore.yaml` in the project root (the official tutorial uses a single `GET /pet/{petId}` operation with `operationId: getPetById` returning a `Pet` schema with required `id` (integer) and `name` (string)).

### 3. Configure generation

```typescript
import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen', clean: true },
  plugins: [
    pluginTs({ output: { path: 'models' } }),
    pluginAxios({ output: { path: 'clients' } }),
  ],
})
```

Types are written to `src/gen/models` and the client to `src/gen/clients`. Keep `src/gen` dedicated to generated files because `clean: true` removes its contents before each run.

### 4. Generate

```bash
npx kubb generate
```

The tree contains `src/gen/clients/getPetById.ts`, `src/gen/models/GetPetById.ts`, `src/gen/models/Pet.ts`, and a `.kubb` directory that holds shared client and serialization helpers.

### 5. Regenerate after a change

Edit `petStore.yaml` (for example add an optional `tag: { type: string }` property to `Pet`) and run `npx kubb generate` again. The regenerated `models/Pet.ts` gains an optional `tag` field.

## Config variations

### Several specifications

Pass an array to `defineConfig` to generate from several specifications in one run, each with its own plugins and output directory. Set a `name` per entry so the CLI output tells them apart (docs: how-to/recipes).

```typescript
export default defineConfig([
  {
    name: 'petStore',
    input: './petStore.yaml',
    output: { path: './src/gen/petStore' },
    plugins: [pluginTs()],
  },
  {
    name: 'userApi',
    input: './userApi.yaml',
    output: { path: './src/gen/userApi' },
    plugins: [pluginTs()],
  },
])
```

### Programmatic usage

`createKubb` from `kubb` runs a build from your own code (docs: reference/kit/engine). It applies the same defaults as `defineConfig`.

```typescript
import { createKubb } from 'kubb'
import { pluginTs } from '@kubb/plugin-ts'

const kubb = createKubb({
  input: './petStore.yaml',
  output: { path: './gen' },
  plugins: [pluginTs()],
})

const { files, diagnostics } = await kubb.safeBuild()
```

## Notes

- `input` takes the path, URL, spec string, or parsed object directly. The v4 wrapper `input: { path }` fails with `KUBB_LEGACY_INPUT`
- `defineConfig` is imported from `kubb/config` (not `@kubb/core`)
- `pluginOas()` is no longer needed. `defineConfig` supplies `adapterOas()`, the parsers, and a barrel plugin
- Stable 5.x packages need no `@beta` tag
- `kubb generate --watch` regenerates on spec changes. Run `kubb validate` before generation in CI to fail on an invalid specification
- Import `createKubb` from `@kubb/core` for a bare engine without package defaults
- After `safeBuild()`, check `Diagnostics.hasError(diagnostics)` (from `kubb/kit`) before processing files; plugins can fail without `safeBuild()` throwing

## Related

- [installation.md](./installation.md)
- [troubleshooting.md](./troubleshooting.md)

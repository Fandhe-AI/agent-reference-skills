# Kit: Engine (createKubb)

`createKubb` from the `kubb` package runs a build from your own code. It accepts a `UserConfig` and returns a `Kubb` instance. An optional second argument takes `hooks`, a `Hookable<KubbHooks>` to share one emitter between builds, `signal`, an `AbortSignal` that stops the build at the next checkpoint, and `fileRefs`, the only folders a `$ref` in the input may read local files from.

## Signature / Usage

```typescript
import { createKubb } from 'kubb'
import { Diagnostics } from 'kubb/kit'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'

const kubb = createKubb({
  input: './petStore.yaml',
  output: { path: './gen' },
  plugins: [pluginTs(), pluginAxios()],
})

const { files, diagnostics } = await kubb.safeBuild()

if (Diagnostics.hasError(diagnostics)) {
  for (const diagnostic of diagnostics.filter(Diagnostics.isProblem)) {
    if (diagnostic.severity === 'error') {
      console.error(`${diagnostic.plugin ?? 'kubb'}: ${diagnostic.message}`)
    }
  }
  process.exit(1)
}

for (const { plugin, duration } of diagnostics.filter(Diagnostics.isPerformance)) {
  console.log(`${plugin}: ${duration}ms`)
}
console.log(`Generated ${files.length} files`)
files.forEach((file) => console.log(`  ${file.path}`))
```

## `Kubb` instance members

| Member | Type | Description |
| --- | --- | --- |
| `.setup()` | `() => Promise<void>` | Initializes the driver and storage. The build methods call it when needed. |
| `.safeBuild()` | `() => Promise<BuildOutput>` | The canonical call. Runs the pipeline and collects problems in `BuildOutput.diagnostics` instead of throwing. |
| `.build()` | `() => Promise<BuildOutput>` | Runs `safeBuild()` and throws an `AggregateError` holding every error diagnostic when one has `severity: 'error'`. |
| `.generate()` | `(options?) => Promise<GenerateResult>` | Runs one full generation, including the `kubb:generation:*` hooks and the optional `processOutput` pass. Never throws on a build error. Returns `{ success, files, diagnostics, input }`. |
| `.dispose()` | `() => void` | Releases the driver. The next build sets up a new one. The instance implements `Symbol.dispose`, so `using kubb = createKubb(config)` disposes it. |
| `.hooks` | `Hookable<KubbHooks>` | Read-only. Shared hook emitter. Call `.hook(name, handler)` before a build. |
| `.config` | `Config` | Read-only. Resolved config, available right after `createKubb`. |
| `.storage` | `Storage` | Read-only. The configured storage backend (`config.storage`), available right after `createKubb`. Generated files are written under their absolute path. |
| `.driver` | driver handle | Advanced plugin driver, available after `setup()` until the build ends. Throws before and after. |

### `Kubb.generate(configs)`

To build every config of a `defineConfig([...])` array, call the static `Kubb.generate` from `@kubb/core`. It is what `kubb generate` runs.

```typescript
import { Kubb } from '@kubb/core'
import configs from './kubb.config.ts'

for await (const { success, files, kubb } of Kubb.generate(configs)) {
  console.log(kubb.config.name, success ? `${files.length} files` : 'failed')
}
```

- The configs build one after another, and each result is yielded as its config finishes. A result you do not keep is released before the next config builds, so a large array never holds every config's files in memory.
- A config that fails does not stop the others: its result has `success: false`.
- Each result is a `GenerateResult` with the `kubb` instance that built it, to read its `config`, `storage` or `hooks`.

## `BuildOutput` fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `Array<FileNode>` | Generated files with paths, names, and content |
| `storage` | `Storage` | Generated source code behind the `Storage` API |
| `driver` | driver handle | Plugin driver for introspection |
| `diagnostics` | `Array<Diagnostic>` | Problems collected during the build, plus a `performance` diagnostic per plugin |
| `input` | `InputNode \| null` | The parsed spec the build generated from, `null` when there was none to parse |

Each problem diagnostic carries a `code`, a `severity` (`error`, `warning`, or `info`), a `message`, and the `plugin` that produced it. A failed plugin keeps its original error on `cause`. A `performance` diagnostic (`kind: 'performance'`) carries a `duration` in milliseconds.

## `Diagnostics`

`Diagnostics` from `kubb/kit` builds and narrows the structured errors a build collects.

| Member | Purpose |
| --- | --- |
| `Diagnostics.Error` | Error class (`DiagnosticError`) that carries a `ProblemDiagnostic` with `code`, `severity`, `message`, and `location` |
| `Diagnostics.report` | Collects a diagnostic into the running build without throwing. Use `warning` or `info` severity for non-fatal issues |
| `Diagnostics.from` | Coerces any thrown value into a `ProblemDiagnostic`. Anything that is not a `Diagnostics.Error` becomes `KUBB_UNKNOWN` |
| `Diagnostics.hasError` | `true` when any diagnostic has `severity: 'error'` |
| `Diagnostics.isProblem` | Narrows to the `problem` kind |
| `Diagnostics.isPerformance` | Narrows to the `performance` kind, which carries a per-plugin `duration` |
| `Diagnostics.isUpdate` | Narrows to the `update` kind, emitted when a newer Kubb version exists |
| `Diagnostics.count` | Totals errors, warnings, and infos |
| `Diagnostics.explain` | Returns the catalog entry (title, fix, docs URL) for a code |

```typescript
import { Diagnostics } from 'kubb/kit'

throw new Diagnostics.Error({
  code: Diagnostics.code.refNotFound,
  severity: 'error',
  message: 'Could not find a definition for #/components/schemas/Pet.',
  location: { kind: 'schema', pointer: '#/components/schemas/Pet', ref: '#/components/schemas/Pet' },
})
```

## Notes

- Source: https://kubb.dev/docs/5.x/reference/kit/engine (docs/5.x/reference/kit/engine.md at kubb@5.20.0, retrieved 2026-11-14)
- Migration (5.11 → 5.20): `kubb.storage` is now the configured backend and is available right after `createKubb`, `.driver` is available only until the build ends, `.generate()` and `BuildOutput` gain `input`, and the example reads `files` instead of `storage.readKeys()` (docs diff 5.11 → 5.20; the changelog does not itemize this change).
- `createKubb` applies the same defaults as `defineConfig`, so a shared config generates the same files from the CLI and from a script. Import it from `@kubb/core` for a bare engine without package defaults.
- After `safeBuild()`, check `Diagnostics.hasError(diagnostics)` before you process files. Plugins can fail without `safeBuild()` throwing.
- Use it when orchestrating several builds, inspecting diagnostics, or feeding Kubb output into a larger toolchain.

## Related

- [Lifecycle hooks](./hooks.md)
- [Storage](./storage.md)
- [Diagnostics](../reference/diagnostics.md)

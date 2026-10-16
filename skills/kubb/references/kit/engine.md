# Kit: Engine (createKubb)

`createKubb` from the `kubb` package runs a build from your own code. It accepts a `UserConfig` and returns a `Kubb` instance.

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

const { files, storage, diagnostics } = await kubb.safeBuild()

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
const paths = await storage.readKeys()
paths.forEach((path) => console.log(`  ${path}`))
```

## `Kubb` instance members

| Member | Type | Description |
| --- | --- | --- |
| `.setup()` | `() => Promise<void>` | Initializes the driver and storage. The build methods call it when needed. |
| `.safeBuild()` | `() => Promise<BuildOutput>` | The canonical call. Runs the pipeline and collects problems in `BuildOutput.diagnostics` instead of throwing. |
| `.build()` | `() => Promise<BuildOutput>` | Runs `safeBuild()` and throws an `AggregateError` holding every error diagnostic when one has `severity: 'error'`. |
| `.generate()` | `(options?) => Promise<GenerateResult>` | Runs one full generation, including the `kubb:generation:*` hooks and the optional `processOutput` pass. Never throws on a build error. Returns `{ success, files, diagnostics }`. |
| `.dispose()` | `() => void` | Releases the driver. The instance implements `Symbol.dispose`, so `using kubb = createKubb(config)` disposes it. |
| `.hooks` | `Hookable<KubbHooks>` | Read-only. Shared hook emitter. Call `.hook(name, handler)` before a build. |
| `.config` | `Config` | Read-only. Resolved config, available right after `createKubb`. |
| `.storage` | `Storage` | Read-only. Final source code keyed by absolute path. Available after `setup()`, throws before. |
| `.driver` | driver handle | Advanced plugin driver, available after `setup()`. Throws before. |

## `BuildOutput` fields

| Field | Type | Description |
| --- | --- | --- |
| `files` | `Array<FileNode>` | Generated files with paths, names, and content |
| `storage` | `Storage` | Generated source code behind the `Storage` API |
| `driver` | driver handle | Plugin driver for introspection |
| `diagnostics` | `Array<Diagnostic>` | Problems collected during the build, plus a `performance` diagnostic per plugin |

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

- `createKubb` applies the same defaults as `defineConfig`, so a shared config generates the same files from the CLI and from a script. Import it from `@kubb/core` for a bare engine without package defaults.
- After `safeBuild()`, check `Diagnostics.hasError(diagnostics)` before you process files. Plugins can fail without `safeBuild()` throwing.
- Use it when orchestrating several builds, inspecting diagnostics, or feeding Kubb output into a larger toolchain.

## Related

- [Lifecycle hooks](./hooks.md)
- [Storage](./storage.md)
- [Diagnostics](../reference/diagnostics.md)

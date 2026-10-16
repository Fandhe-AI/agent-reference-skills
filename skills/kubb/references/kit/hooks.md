# Kit: Lifecycle hooks

Kubb runs on one shared, typed hook emitter, and every phase of a build fires a `kubb:*` hook on it. Plugins listen through their `hooks` map; outside code listens through `kubb.hooks`.

## Signature / Usage

```ts
import { createKubb } from 'kubb'

const kubb = createKubb({
  input: './petStore.yaml',
  output: { path: './gen' },
})

kubb.hooks.hook('kubb:plugin:end', ({ plugin, duration }) => {
  console.log(`${plugin.name} finished in ${duration}ms`)
})

kubb.hooks.hook('kubb:build:end', ({ files }) => {
  console.log(`Generated ${files.length} files`)
})

await kubb.build()
```

Every hook name and payload lives in the `KubbHooks` type. Handlers can be async, and Kubb awaits each one. Attach listeners before calling `build()`.

## Generation run

These wrap a full run. A direct `.build()` or `.safeBuild()` does not fire them.

| Hook | Payload | When it fires |
| --- | --- | --- |
| `kubb:lifecycle:start` | `{ version }` | The bundler plugin starts, before anything else |
| `kubb:generation:start` | `{ config }` | A run begins, before setup |
| `kubb:setup:start` | none | Before the driver and storage are initialized |
| `kubb:setup:end` | none | After setup, before the build pipeline |
| `kubb:generation:end` | `{ config, storage, status, diagnostics, filesCreated, hrStart }` | The run finishes, after the output passes |
| `kubb:generation:summary` | `KubbGenerationSummaryContext` | After the run, with the summary the reporters render |
| `kubb:lifecycle:end` | none | The bundler plugin is done |

## Build pipeline

Fired by `.build()` and `.safeBuild()` too.

| Hook | Payload | When it fires |
| --- | --- | --- |
| `kubb:plugin:setup` | `KubbPluginSetupContext` | Once per plugin during setup, to register generators, resolvers, macros, and options |
| `kubb:build:start` | `{ config, adapter, meta, getPlugin, files, upsertFile }` | The AST is ready, before plugins run. Skipped when no adapter parsed input |
| `kubb:plugin:start` | `{ plugin }` | Before a plugin's generators run |
| `kubb:generate:schema` | `(node, ctx)` | For each schema node the adapter produced |
| `kubb:generate:operation` | `(node, ctx)` | For each operation node |
| `kubb:generate:operations` | `(nodes, ctx)` | Once with every operation node |
| `kubb:plugin:end` | `{ plugin, duration, success, error, config, files, upsertFile }` | After a plugin finishes, with its timing and a file snapshot |
| `kubb:plugins:end` | `{ config, files, upsertFile }` | After every plugin has generated, before files hit disk. The spot to add aggregate files like a barrel |
| `kubb:files:processing:start` | `{ files }` | Before the batch of generated files is written |
| `kubb:files:processing:update` | `{ files }` | As files are written. `files` holds progress records (`{ processed, total, percentage, source?, file, config }`), not the `FileNode` array |
| `kubb:files:processing:end` | `{ files }` | After the batch is written |
| `kubb:build:end` | `{ files, config, outputDir }` | After every file is written |

## Output passes

Run after a successful build, only during a full generation run.

| Hook | Payload | When it fires |
| --- | --- | --- |
| `kubb:format:start` | none | Before the formatter runs |
| `kubb:format:end` | none | After formatting |
| `kubb:lint:start` | none | Before the linter runs |
| `kubb:lint:end` | none | After linting |
| `kubb:hooks:start` | none | Before the `postGenerate` commands run |
| `kubb:hook:start` | `{ id, command, name, args }` | Before one `postGenerate` command runs |
| `kubb:hook:line` | `KubbHookLineContext` | For each output line a `postGenerate` command emits |
| `kubb:hook:end` | `KubbHookEndContext` | After one `postGenerate` command finishes |
| `kubb:hooks:end` | none | After every `postGenerate` command |

## Messaging

Carry log messages and diagnostics; can fire at any point.

| Hook | Payload | When it fires |
| --- | --- | --- |
| `kubb:info` | `{ message, info }` | An informational message |
| `kubb:success` | `{ message, info }` | A step completed successfully |
| `kubb:warn` | `{ message, info }` | A non-fatal problem |
| `kubb:error` | `{ error, meta }` | An unstructured error, so its stack survives |
| `kubb:diagnostic` | `{ diagnostic }` | A structured diagnostic (warning, info, or an update notice) |

## Notes

- 出典: https://kubb.dev/docs/5.x/reference/kit/hooks （kubb@5.11.0 の docs/5.x/reference/kit/hooks.md）

## Related

- [Plugins](./plugins.md)
- [Engine](./engine.md)
- [Diagnostics](../reference/diagnostics.md)

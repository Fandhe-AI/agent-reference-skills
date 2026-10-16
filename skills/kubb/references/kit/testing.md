# Kit: Testing

`kubb/kit/testing` is a separate subpath for the Vitest-backed helpers used to test plugins, generators, and adapters.

## Signature / Usage

```typescript
import { createMockedPlugin, renderGeneratorOperation, matchFiles } from 'kubb/kit/testing'
```

| Export | What it does |
| --- | --- |
| `createMockedPlugin` | Builds a minimal plugin for a test without wiring a full config. |
| `createMockedAdapter` | Builds a minimal adapter for a test. `parse` returns an empty `InputNode` by default. |
| `createMockedPluginDriver` | Builds a driver around a set of plugins so a generator runs through its real lifecycle in isolation. |
| `createMockedSetupContext` | Builds the `kubb:plugin:setup` context with spy methods. Its `requirePlugin` fails for plugins not listed in `plugins`. |
| `renderGeneratorSchema` | Calls a generator's `schema()` against a `SchemaNode` fixture and collects the files it emits. |
| `renderGeneratorOperation` | Calls a generator's `operation()` against an `OperationNode` fixture and collects the files it emits. |
| `renderGeneratorOperations` | Calls a generator's `operations()` against an array of `OperationNode` fixtures and collects the files it emits. |
| `matchFiles` | Asserts the generated `FileNode`s match expected paths and contents through file snapshots. |

## Test a plugin's setup

Pass a mocked setup context to the plugin's `kubb:plugin:setup` handler, then assert on its spies.

```typescript
import { addGenerator, defineExtension, kubbContext } from 'kubb/kit'
import { createMockedSetupContext } from 'kubb/kit/testing'
import { expect, test } from 'vitest'

const pluginExample = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-example' },
  hooks: {
    'kubb:plugin:setup'() {
      addGenerator({ name: 'example', operation: () => [] })
    },
  },
})

test('registers one generator', () => {
  const plugin = pluginExample()
  const ctx = createMockedSetupContext()

  kubbContext.run(ctx, () => plugin.hooks['kubb:plugin:setup']?.(ctx))

  expect(ctx.addGenerator).toHaveBeenCalledTimes(1)
})
```

## Notes

- It stays separate from `kubb/kit` so importing the authoring toolkit never pulls Vitest into a plugin's runtime dependencies.
- When setup uses composables, run it inside `kubbContext.run(ctx, …)`. Without it, the composables throw `KUBB_NO_CONTEXT`.

## Related

- [Plugins](./plugins.md)
- [Generators](./generators.md)
- [Storage](./storage.md)

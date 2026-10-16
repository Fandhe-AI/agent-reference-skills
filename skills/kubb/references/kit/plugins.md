# Kit: Plugins

Plugins are the main extension point in Kubb. A plugin owns its file naming, output folder, lifecycle hooks, and the generators that walk the AST and emit `FileNode` objects. Define one with `defineExtension` and `kind: 'plugin'`.

## Signature / Usage

```typescript
import { defineExtension, type PluginType } from 'kubb/kit'

type PluginExample = PluginType<'plugin-example', { prefix?: string }, { prefix: string }>

export const pluginExample = defineExtension<PluginExample>({
  kind: 'plugin',
  meta: { name: 'plugin-example', version: '1.0.0' },
  dependencies: { 'plugin-ts': {} },
  setup(options, kubb) {
    // Register resolvers, generators, and macros on `kubb`.
    return { prefix: options.prefix ?? '' }
  },
})
```

`PluginType<TName, TOptions, TResolvedOptions, TResolver>` types the plugin. `TOptions` is what users pass; `TResolvedOptions` is what `setup` returns and generators read. Kubb runs `setup` before the plugin's generators.

## Definition shape

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `kind` | `'plugin'` | Yes | Tells `defineExtension` to define a plugin. |
| `meta` | `ExtensionMeta` | Yes | Name, version, and compatibility. `meta.name` follows `plugin-<feature>`. |
| `setup` | `(options, kubb: KubbPluginSetupContext) => TResolvedOptions` | No | Main plugin logic. Returns the resolved options. Can be `async`. |
| `dependencies` | `ExtensionDependencies` | No | Plugins this one builds on. They run first; a missing required one fails the run. |
| `enforce` | `'pre' \| 'post'` | No | Run before or after the normal plugins. Dependency order still wins. |
| `hooks` | `{ 'kubb:plugin:setup'?: ...; ... }` | No | Lifecycle handlers. `kubb:plugin:setup` runs after `setup`. |

## Setup context

`setup` and `kubb:plugin:setup` register generators, the resolver, macros, and options through the setup context: either the context argument (`kubb` in `setup`, `ctx` in the hook) or composables from `kubb/kit`.

```typescript
import { addGenerator, createResolver, defineExtension, defineGenerator, requirePlugin, setResolver } from 'kubb/kit'

const resolver = createResolver({ pluginName: 'plugin-example' })
const generator = defineGenerator({ name: 'example', operation: () => [] })

export const pluginExample = defineExtension({
  kind: 'plugin',
  meta: { name: 'plugin-example' },
  setup(options) {
    requirePlugin('plugin-ts')
    setResolver(resolver)
    addGenerator(generator)
    return options
  },
})
```

| `kubb` member | Composable | Signature | Purpose |
| --- | --- | --- | --- |
| `addGenerator` | `addGenerator()` | `(...generators: Array<Generator>) => void` | Register one or more generators for this plugin |
| `setResolver` | `setResolver()` | `(resolver: ResolverPatch<Resolver> \| Resolver) => void` | Set or partially override the file naming resolver |
| `addMacro` | `addMacro()` | `(macro: Macro) => void` | Add a macro that rewrites AST nodes before generators |
| `setMacros` | `setMacros()` | `(macros: Array<Macro>) => void` | Replace this plugin's macros with a new list |
| `setOptions` | `setOptions()` | `(options: ResolvedOptions) => void` | Set the resolved options used by generators. In `setup`, return them instead |
| `injectFile` | `injectFile()` | `(file: UserFileNode) => void` | Inject a raw file into the build output, bypassing generation |
| `requirePlugin` | `requirePlugin()` | `(name: string) => Plugin` | Return another plugin, or fail the run with `KUBB_PLUGIN_NOT_FOUND` |
| `config` | `useConfig()` | `Config` | The resolved build configuration at setup time |
| `options` | `useOptions()` | `TOptions` | The plugin's own options as passed by the user |

## Notes

- `definePlugin` is deprecated. Use `defineExtension` with `kind: 'plugin'`: rename the call and add `kind: 'plugin'`. The plugin's own `name` is deprecated in favor of `meta.name`.
- The `Plugin` the factory returns keeps the user's raw options in `plugin.options`.
- `useKubb()` returns the whole setup context; `tryUseKubb()` returns `undefined` outside setup instead of throwing.
- Composables read the context of the plugin whose setup is running, also after an `await`. Outside `setup` and `kubb:plugin:setup` (including generators and later hooks, which receive their own `ctx`) they throw `KUBB_NO_CONTEXT`. Both styles can be mixed in one setup.
- Plugin names follow `plugin-<feature>`, such as `plugin-react-query` or `plugin-zod`.
- Import only `compatibility` from `kubb-extension.json` into `meta` so Kubb checks the same ranges at runtime.

## Related

- [Extensions](./extensions.md)
- [Generators](./generators.md)
- [Resolvers](./resolvers.md)
- [Lifecycle hooks](./hooks.md)
- [Manifest](./manifest.md)
- [Testing](./testing.md)

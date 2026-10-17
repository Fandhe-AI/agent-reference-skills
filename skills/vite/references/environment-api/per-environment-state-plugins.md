---
source: https://vite.dev/guide/api-environment-plugins#per-environment-plugins-using-the-applytoenvironment-hook
---

# Per-environment State / applyToEnvironment

Because one plugin instance serves several environments, plugin state must be keyed by `this.environment`; `applyToEnvironment` selects or replaces the plugin per environment.

## Signature / Usage

`applyToEnvironment` hook:

- **Type:** `(environment: PartialEnvironment) => boolean | PluginOption | Promise<boolean>`
- **Kind:** `async`, `sequential`
- **Scope:** Per-environment

```js
const UnoCssPlugin = () => {
  // shared global state
  return {
    buildStart() {
      // init per-environment state with WeakMap<Environment,Data>
      // using this.environment
    },
    configureServer() {
      // use global hooks normally
    },
    applyToEnvironment(environment) {
      // return true if this plugin should be active in this environment,
      // or return a new plugin to replace it.
      // if the hook is not used, the plugin is active in all environments
    },
    resolveId(id, importer) {
      // only called for environments this plugin apply to
    },
  }
}
```

Per-environment state:

```js
function PerEnvironmentCountTransformedModulesPlugin() {
  const state = new Map<Environment, { count: number }>()
  return {
    name: 'count-transformed-modules',
    perEnvironmentStartEndDuringDev: true,
    buildStart() {
      state.set(this.environment, { count: 0 })
    },
    transform(id) {
      state.get(this.environment).count++
    },
    buildEnd() {
      console.log(this.environment.name, state.get(this.environment).count)
    }
  }
}
```

Making a non-environment-aware plugin per-environment:

```js
import { nonShareablePlugin } from 'non-shareable-plugin'

export default defineConfig({
  plugins: [
    {
      name: 'per-environment-plugin',
      applyToEnvironment(environment) {
        return nonShareablePlugin({ outputName: environment.name })
      },
    },
  ],
})
```

The `perEnvironmentPlugin` helper for cases where no other hooks are required:

```js
import { nonShareablePlugin } from 'non-shareable-plugin'

export default defineConfig({
  plugins: [
    perEnvironmentPlugin('per-environment-plugin', (environment) =>
      nonShareablePlugin({ outputName: environment.name }),
    ),
  ],
})
```

## Notes

- State pattern: a `Map<Environment, State>` keeps state per environment (the same pattern the ecosystem used with the `ssr` boolean as key).
- For backward compatibility, `buildStart` and `buildEnd` are only called for the client environment without `perEnvironmentStartEndDuringDev: true`. Same for `watchChange` and `perEnvironmentWatchChangeDuringDev: true`.
- If `applyToEnvironment` is not used, the plugin is active in all environments.
- The plugin returned from `applyToEnvironment` or `perEnvironmentPlugin` should not use Vite-specific hooks.
- `applyToEnvironment` is called at config time, currently after `configResolved` because ecosystem projects modify plugins in it. Environment plugin resolution may move before `configResolved` in the future.
- Release Candidate: the Environment API is generally in the release candidate phase.

## Related

- [Per-environment Hooks](./per-environment-hooks.md)
- [Environment in Build Hooks / Shared Plugins During Build](./environment-build-hooks.md)

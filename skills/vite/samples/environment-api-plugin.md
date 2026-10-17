---
source: https://vite.dev/guide/api-environment-plugins#per-environment-plugins-using-the-applytoenvironment-hook
---

# Environment API: Per-environment Plugin

Apply a plugin per Environment API environment with `applyToEnvironment` and keep state keyed by `this.environment`.

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

```ts
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

## Notes

- The Environment API is generally in the release candidate phase per the docs; some specific APIs are still experimental. This Environment API (DevEnvironment / ModuleRunner) is unrelated to vitest test environments.
- `applyToEnvironment` may return `true` / `false` or a replacement plugin; plugins returned from it (or from `perEnvironmentPlugin`) should not use Vite-specific hooks.
- Without `perEnvironmentStartEndDuringDev: true`, `buildStart` / `buildEnd` are called only for the client environment in dev (same for `watchChange` with `perEnvironmentWatchChangeDuringDev: true`).
- Vite also exports a `perEnvironmentPlugin(name, factory)` helper for the case where no other hooks are required.
- The state example is verbatim from the docs and contains TypeScript generics inside a `js` block.

# Getting Started (Advanced API)

Node.js APIs exported from `vitest/node` for running Vitest programmatically. Primarily intended for library authors.

## Signature / Usage

```ts
function startVitest(
  cliFilters: string[] = [],
  options: CliOptions = {},
  viteOverrides?: ViteUserConfig,
  vitestOptions?: VitestOptions,
): Promise<Vitest>

function createVitest(
  options: CliOptions,
  viteOverrides: ViteUserConfig = {},
  vitestOptions: VitestOptions = {},
): Promise<Vitest>

function resolveConfig(
  options: UserConfig = {},
  viteOverrides: ViteUserConfig = {},
  harness?: PluginHarness,
): Promise<ResolvedViteConfig>

function parseCLI(argv: string | string[], config: CliParseOptions = {}): {
  filter: string[]
  options: CliOptions
}

function createCLI(options?: CliParseOptions): CAC
```

```ts
import { startVitest } from 'vitest/node'

const vitest = await startVitest()

await vitest.close()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `startVitest` | function | Starts Vitest and runs tests. Returns a `Vitest` instance if tests can be started. Without watch mode, `close` is called automatically; with watch mode on a TTY terminal, console shortcuts are registered. |
| `createVitest` | function | Returns the same `Vitest` instance but does not start tests and does not validate installed packages. |
| `resolveConfig` | function | Resolves config without creating a Vite server. `root` defaults to `process.cwd()`. The fully resolved Vitest config (including every project) lives on the returned `test` property. |
| `parseCLI` | function | Parses a string (split by single spaces) or string array of CLI args into `filter` and `options`, usable with `createVitest` / `startVitest`. |
| `createCLI` | function | Creates a `cac` instance with all Vitest commands and options registered; `parseCLI` is built on top of it. |
| `PluginHarness` | class | Container passed to Vitest's internal plugins during config resolution (`vitest?`, `version`, `logger`, `packageInstaller`, `getVitest()`). `getVitest()` throws if called before the instance exists. |
| `Logger` | class | Terminal logger (`new Logger(outputStream?, errorStream?)`), exposed as `vitest.logger`. Pass custom streams to capture or redirect output. |

## Notes

- `startVitest`: the second argument is a list of filters (tests whose file path contains at least one string run); the third is CLI-style options overriding test config; the fourth is a full Vite config that takes precedence over other user-defined options.
- Results are read via `vitest.state.getTestModules()`.
- `resolveConfig` is the same method Vitest uses internally; options passed to `startVitest` / `createVitest` are resolved again. Pass a shared `PluginHarness` as the third argument to reuse a logger and package installer.
- Project config resolution (with test projects): root config is resolved from, in ascending priority, the root config file, `viteOverrides`, then CLI options.
  - A project referenced as a config file or directory resolves only its own file and inherits nothing from the root.
  - An inline project inherits the root config by default (`extends`): the root config file is re-executed, `viteOverrides` merged on top, then the project's own options. This works even without a root config file.
  - With `extends: false`, an inline project resolves only its own options. With `extends: './path'`, the referenced file is re-executed instead and `viteOverrides` are not merged.
  - Never inherited: `plugins` from `viteOverrides`; `test.browser` and `test.tagsFilter` from `viteOverrides`; `name` and `projects`; root `globalSetup`. A project's own `tags` replace (not concatenate with) the extended config's `tags`.
  - A fixed subset of CLI options that configure how tests run (`--testTimeout`, `--retry`, `--pool`, and similar) applies to every project at highest priority. Every project receives the root's resolved `coverage`, `attachmentsDir`, and `mergeReportsLabel`.
- Source: Vitest v5.0.5 docs, https://vitest.dev/guide/advanced/

## Related

- [Running Tests via API](./running-tests.md)
- [Extending Reporters](./extending-reporters.md)
- [Custom Pool](./custom-pool.md)
- [Custom Benchmark Provider](./benchmark-provider.md)

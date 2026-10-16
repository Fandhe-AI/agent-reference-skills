# Running Tests via API

Use `startVitest` or `createVitest` from `vitest/node` to run tests from a Node.js script. Primarily used by library authors.

## Signature / Usage

```ts
import { createVitest } from 'vitest/node'

const vitest = await createVitest(
  {}, // override test config
  {}, // override Vite config
  {}, // custom Vitest options
)

// called when `vitest.cancelCurrentRun()` is invoked
vitest.onCancel(() => {})
// called during `vitest.close()` call
vitest.onClose(() => {})
// called when Vitest reruns test files
vitest.onTestsRerun((files) => {})

try {
  // this will set process.exitCode to 1 if tests failed,
  // and won't close the process automatically
  await vitest.start(['my-filter'])
}
catch (err) {
  // this can throw
  // "FilesNotFoundError" if no files were found
  // "GitNotFoundError" with `--changed` and repository is not initialized
}
finally {
  await vitest.close()
}
```

`startVitest` example:

```ts
import { startVitest } from 'vitest/node'

const vitest = await startVitest(
  [], // CLI filters
  {}, // override test config
  {}, // override Vite config
  {}, // custom Vitest options
)
const testModules = vitest.state.getTestModules()
for (const testModule of testModules) {
  console.log(testModule.moduleId, testModule.ok() ? 'passed' : 'failed')
}
```

Manual reruns when you control the watcher:

```ts
watcher.on('change', async (file) => {
  const specifications = vitest.getModuleSpecifications(file)
  if (specifications.length) {
    vitest.invalidateFile(file)
    // you can use runTestSpecifications if "reporter.onWatcher*" hooks
    // should not be invoked
    await vitest.rerunTestSpecifications(specifications)
  }
})
```

Disabling the Vite watcher:

```ts
await createVitest(
  {},
  {
    plugins: [
      {
        name: 'stop-watcher',
        async configureServer(server) {
          await server.watcher.close()
        }
      }
    ],
    server: {
      watch: null,
    },
  }
)
```

## Notes

- `startVitest` validates that required packages are installed and runs tests immediately; `createVitest` only creates the instance.
- `createVitest` does not validate installed packages, does not respect `config.standalone` or `config.mergeReports`, and is not closed automatically even if `watch` is disabled.
- To keep a `Vitest` instance, call at least `init` (initialises reporters and the coverage provider without running tests). Enabling `watch` is recommended even without using the watcher, since Vitest relies on this flag for some features in a continuous process.
- After reporters are initialised, use `runTestSpecifications` or `rerunTestSpecifications` for manual runs. Default Vitest already reruns tests on file changes; the rerun example is for when default watcher behaviour is disabled.
- `getModuleSpecifications` does not resolve test files unless already processed by `globTestSpecifications`. For newly created files, use `project.matchesGlobPattern(file)` and `project.createSpecification(file)` across `vitest.projects`.
- `server.watch: null` works since Vite 5.3; alternatively use `server.watch: { ignored: ['*/*'] }`.
- Source: Vitest v5.0.5 docs, https://vitest.dev/guide/advanced/tests

## Related

- [Getting Started (Advanced API)](./getting-started.md)
- [Extending Reporters](./extending-reporters.md)

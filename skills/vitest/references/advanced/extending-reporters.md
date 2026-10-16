# Extending Reporters

Extend built-in reporters or implement the `Reporter` interface from `vitest/node` to create custom reporters.

## Signature / Usage

```ts
import type { Reporter } from 'vitest/node'

export default class CustomReporter implements Reporter {
  onTestModuleCollected(testModule) {
    console.log(testModule.moduleId, 'is finished')

    for (const test of testModule.children.allTests()) {
      console.log(test.name, test.result().state)
    }
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import CustomReporter from './custom-reporter.js'

export default defineConfig({
  test: {
    reporters: [new CustomReporter()],
  },
})
```

Extending a built-in reporter:

```ts
import { DefaultReporter } from 'vitest/node'

export default class MyDefaultReporter extends DefaultReporter {
  // do something
}
```

## Options / Props

Exported reporters from `vitest/node`:

| Name | Kind | Description |
|------|------|-------------|
| `DefaultReporter` | built-in | Default reporter |
| `DotReporter` | built-in | Dot reporter |
| `JsonReporter` | built-in | JSON reporter |
| `VerboseReporter` | built-in | Verbose reporter |
| `TapReporter` | built-in | TAP reporter |
| `JUnitReporter` | built-in | JUnit reporter |
| `TapFlatReporter` | built-in | Flat TAP reporter |
| `HangingProcessReporter` | built-in | Hanging process reporter |
| `TreeReporter` | built-in | Tree reporter |
| `Reporter` | interface | Interface to implement for custom reporters |

## Notes

- Exposed reporters are not considered stable and can change the shape of their API within a minor version.
- Reported events receive tasks for tests, suites and modules (e.g. `onTestRunEnd(testModules: ReadonlyArray<TestModule>)` iterates `testModule.children`, using `task.type` and `task.fullName`).
- Artifacts: store them inside the `.vitest` directory in the project `root`, a convention for co-locating reporter results so users only need one `.gitignore` entry. `vitest.createReport` provides utilities for writing artifacts.
  - A reporter can create `.vitest` if it does not exist, and should never remove it.
  - A reporter should create its own directory inside it (e.g. `.vitest/yaml-reporter/`) and may remove only that directory.
- Source: Vitest v5.0.5 docs, https://vitest.dev/guide/advanced/reporters

## Related

- [Getting Started (Advanced API)](./getting-started.md)
- [Running Tests via API](./running-tests.md)

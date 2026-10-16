# Watching Non-Imported Files

`watchTriggerPatterns` (since 3.2.0) maps changes in files that tests do not `import` (templates, JSON fixtures, generated artifacts) to the tests that should rerun in watch mode.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watchTriggerPatterns: [
      {
        pattern: /src\/templates\/(.*)\.(ts|html|txt)$/,
        testsToRun: (file, match) => {
          // edit `src/templates/welcome.html` ⇒ rerun `api/tests/mailers/welcome.test.ts`
          return `api/tests/mailers/${match[1]}.test.ts`
        },
      },
    ],
  },
})
```

Multiple patterns:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watchTriggerPatterns: [
      {
        pattern: /src\/(.*)\/schema\.json$/,
        testsToRun: (_file, match) => `src/${match[1]}/__tests__/index.test.ts`,
      },
      {
        pattern: /test\/shared-fixture\.json$/,
        testsToRun: () => [
          'test/integration/users.test.ts',
          'test/integration/billing.test.ts',
        ],
      },
    ],
  },
})
```

## Notes

- `testsToRun` returns one or more test file paths (string or string array), or `undefined` if no tests should rerun. Paths are resolved against the workspace root and are not interpreted as globs. `match` is the result of `RegExp.exec` against the changed file.
- `forceRerunTriggers` covers the same gap but reruns every test on every match; `watchTriggerPatterns` reruns only the mapped tests.
- Default watch mode only reruns tests whose import graph reaches the changed file.
- Source: https://vitest.dev/guide/recipes/watch-templates (Vitest v5.0.5)

## Related

- [Config](../guide/config.md)
- [CLI](../guide/cli.md)

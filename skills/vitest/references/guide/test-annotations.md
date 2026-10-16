# Test Annotations

Attach custom messages and files to a test via `context.annotate`; reporters receive them in the `onTestAnnotate` hook.

## Signature / Usage

```ts
test('hello world', async ({ annotate }) => {
  await annotate('this is my test')

  if (condition) {
    await annotate('this should\'ve errored', 'error')
  }

  const file = createTestSpecificFile()
  await annotate('creates a file', { body: file })

  await annotate('creates a file with text', {
    contentType: 'text/markdown',
    body: 'Hello **markdown**',
    bodyEncoding: 'utf-8',
  })
})
```

## Options / Props

How built-in reporters show annotations:

| Reporter | Behavior |
|----------|----------|
| `default` | Prints annotations only if the test failed |
| `verbose` | Only terminal reporter that prints annotations for passing tests |
| `html` | Shown at the call line, like the UI; not visible if called outside a test file |
| `junit` | Listed in the testcase `properties` tag; only type and message, attachments ignored |
| `github-actions` | Printed as notice by default; second argument `notice` / `warning` / `error` sets the type (other values become notice) |
| `tap` / `tap-flat` | Diagnostic line starting with `#`; only type and message |

## Notes

- `annotate` returns a Promise; Vitest awaits any non-awaited annotation before the test finishes.
- The `github-actions` reporter can inline annotations in the GitHub UI; disable with `displayAnnotations: false`.
- Source: https://vitest.dev/guide/test-annotations (Vitest v5.0.5)

## Related

- [Test Context](./test-context.md)
- [Extending Reporters](../advanced/extending-reporters.md)

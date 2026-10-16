---
source: https://react.dev/reference/react-compiler/logger
---

# logger

The `logger` option provides custom logging for React Compiler events during compilation.

## Signature / Usage

```js
{
  logger: {
    logEvent(filename, event) {
      console.log(`[Compiler] ${event.kind}: ${filename}`);
    }
  }
}
```

Detailed error logging:

```js
{
  logger: {
    logEvent(filename, event) {
      if (event.kind === 'CompileError') {
        console.error(`\nCompilation failed: ${filename}`);
        console.error(`Reason: ${event.detail.reason}`);

        if (event.detail.description) {
          console.error(`Details: ${event.detail.description}`);
        }

        if (event.detail.loc) {
          const { line, column } = event.detail.loc.start;
          console.error(`Location: Line ${line}, Column ${column}`);
        }

        if (event.detail.suggestions) {
          console.error('Suggestions:', event.detail.suggestions);
        }
      }
    }
  }
}
```

## Options / Props

Type: `{ logEvent: (filename: string | null, event: LoggerEvent) => void } | null`. Default: `null`.

`logEvent` is called for each compiler event with the filename and event details. Event kinds:

| Name | Type | Description |
| --- | --- | --- |
| `CompileSuccess` | event | Function successfully compiled |
| `CompileError` | event | Function skipped due to errors |
| `CompileDiagnostic` | event | Non-fatal diagnostic information |
| `CompileSkip` | event | Function skipped for other reasons |
| `PipelineError` | event | Unexpected compilation error |
| `Timing` | event | Performance timing information |

## Notes

- Event structure may change between versions.
- Large codebases generate many log entries.

## Related

- [Configuration](./configuration.md)
- [panicThreshold](./panicThreshold.md)

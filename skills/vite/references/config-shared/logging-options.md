---
source: https://vite.dev/config/shared-options#loglevel
---

# logLevel / customLogger / clearScreen

Console output verbosity, custom logger, and terminal clearing.

## Signature / Usage

```ts
interface Logger {
  info(msg: string, options?: LogOptions): void
  warn(msg: string, options?: LogOptions): void
  warnOnce(msg: string, options?: LogOptions): void
  error(msg: string, options?: LogErrorOptions): void
  clearScreen(type: LogType): void
  hasErrorLogged(error: Error | RollupError): boolean
  hasWarned: boolean
}
```

```ts
import { createLogger, defineConfig } from 'vite'

const logger = createLogger()
const loggerWarn = logger.warn

logger.warn = (msg, options) => {
  // Ignore empty CSS files warning
  if (msg.includes('vite:css') && msg.includes(' is empty')) return
  loggerWarn(msg, options)
}

export default defineConfig({
  customLogger: logger,
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `logLevel` | `'info' \| 'warn' \| 'error' \| 'silent'` | `'info'` | Adjust console output verbosity. |
| `customLogger` | `Logger` | — | Custom logger. Use Vite's `createLogger` to get the default logger and customize it. |
| `clearScreen` | `boolean` | `true` | Set to `false` to prevent clearing the terminal screen when logging certain messages. CLI: `--clearScreen false`. |

## Related

- [Root / base / mode](./root-base-mode.md)

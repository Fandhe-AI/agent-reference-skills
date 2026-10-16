# Debugging

Debug Vitest tests in VS Code, IntelliJ IDEA, or any Node inspector client such as Chrome DevTools.

## Signature / Usage

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}
```

Select "Debug Current Test File" in the debug tab, open the test file, and press F5.

## Options / Props

| Option | Description |
|--------|-------------|
| `--test-timeout=0` | Prevent timeouts while stopped at breakpoints |
| `--no-file-parallelism` | Prevent files from running in parallel |
| `--inspect` / `--inspect-brk` | Node inspector (default port `9229`; override with `--inspect-brk=127.0.0.1:3000`); config equivalents `inspectBrk: true`, `fileParallelism: false` |
| `--isolate false` | Keep the debugger open across reruns in watch mode |

## Notes

- Quick VS Code option: open a `JavaScript Debug Terminal` and run `npm run test` or `vitest`. The official VS Code extension also provides a "Debug Tests" button, and is the simplest way to debug browser tests.
- Browser mode from CLI: `vitest --inspect-brk --browser --no-file-parallelism`; attach with a VS Code compound configuration (a `node` launch config running `vitest.mjs` with `["--inspect-brk", "--browser", "--no-file-parallelism"]` plus a `chrome` `attach` config on port `9229`, combined under `compounds` with `stopAll: true`).
- IntelliJ IDEA: create a vitest run configuration with the working directory set to the project root and run it in debug mode.
- Node inspector: `vitest --inspect-brk --no-file-parallelism` (add `--browser` for browser mode), then open `chrome://inspect`.

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    inspectBrk: true,
    fileParallelism: false,
    browser: {
      provider: playwright(),
      instances: [{ browser: 'chromium' }]
    },
  },
})
```

## Related

- [CLI](./cli.md)
- [Common Errors](./common-errors.md)
- [Browser Mode](../browser-mode/overview.md)

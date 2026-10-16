# Commands

A command is a function that runs on the Vitest server and passes the result back to the browser. Built-in commands include file handling (`readFile`, `writeFile`, `removeFile`) and CDP; custom commands are added via `browser.commands`.

## Signature / Usage

```ts
import { server } from 'vitest/browser'

const { readFile, writeFile, removeFile } = server.commands

it('handles files', async () => {
  const file = './test.txt'

  await writeFile(file, 'hello world')
  const content = await readFile(file)

  expect(content).toBe('hello world')

  await removeFile(file)
})
```

CDP session:

```ts
import { cdp } from 'vitest/browser'

await cdp().send('Input.dispatchKeyEvent', {
  type: 'keyDown',
  text: 'a',
})
```

Custom command:

```ts
import type { Plugin } from 'vitest/config'
import type { BrowserCommand } from 'vitest/node'

const myCustomCommand: BrowserCommand<[arg1: string, arg2: string]> = ({
  testPath,
  provider
}, arg1, arg2) => {
  if (provider.name === 'playwright') {
    console.log(testPath, arg1, arg2)
    return { someValue: true }
  }

  throw new Error(`provider ${provider.name} is not supported`)
}

export default function BrowserCommands(): Plugin {
  return {
    name: 'vitest:custom-commands',
    config() {
      return {
        test: {
          browser: {
            commands: {
              myCustomCommand,
            }
          }
        }
      }
    }
  }
}
```

```ts
import { commands } from 'vitest/browser'

const result = await commands.myCustomCommand('test1', 'test2')

// TypeScript augmentation
declare module 'vitest/browser' {
  interface BrowserCommands {
    myCustomCommand: (arg1: string, arg2: string) => Promise<{ someValue: true }>
  }
}
```

Trace markers from a command (server-side equivalent of `page.mark`):

```ts
export const uploadFixture: BrowserCommand<[name: string]> = async (context, name) => {
  await context.mark(`upload start: ${name}`, { kind: 'action' })
  // ... do server-side work
  await context.mark(`upload done: ${name}`, { kind: 'action' })
}
```

## Options / Props

Command context properties by provider:

| Provider | Property | Description |
|----------|----------|-------------|
| playwright | `page` | Full page containing the test iframe (orchestrator HTML; avoid touching) |
| playwright | `frame` | Async method resolving the tester `Frame` |
| playwright | `iframe` | `FrameLocator` for querying elements (preferred over `frame`) |
| playwright | `context` | The unique `BrowserContext` |
| webdriverio | `browser` | `WebdriverIO.Browser`; context is switched to the test iframe via `browser.switchFrame` before the command runs |

## Notes

- Since Vitest 3.2 file command paths resolve relative to the project root (`process.cwd()` unless overridden), not the test file. Encoding defaults to `utf-8`.
- Built-in file commands follow Vite `server.fs` restrictions; `writeFile` / `removeFile` also require `api.allowWrite`.
- CDP works only with `playwright` + `chromium`, and only when `api.allowWrite` and `api.allowExec` are enabled.
- Custom commands override built-ins with the same name. They run in the Node process and do not inherit the built-in path / write protections: validate browser-provided input (use `isFileLoadingAllowed` from `vitest/node`, check `api.allowWrite` / `api.allowExec`).
- `context.mark` is a no-op when browser tracing is off or no test is running; unlike `page.mark` it has no callback form.
- Locator arguments are serialized automatically when passed to commands (see `locator.serialize()`).
- Source: https://vitest.dev/api/browser/commands (Vitest v5.0.5)

## Related

- [Context API](./context-api.md)
- [Locators](./locators.md)
- [Browser Config](./browser-config.md)

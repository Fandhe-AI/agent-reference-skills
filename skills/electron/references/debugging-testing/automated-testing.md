---
source: https://www.electronjs.org/docs/latest/tutorial/automated-testing
---

# Automated Testing

End-to-end test automation for Electron apps. Electron does not maintain its own testing solution; the guide covers WebDriver (WebdriverIO, Selenium), Playwright, and a custom test driver over Node.js IPC-over-STDIO.

## Signature / Usage

Playwright (experimental Electron support via the Chrome DevTools Protocol), launching the app through `_electron.launch`:

```js
import { test, expect, _electron as electron } from '@playwright/test'

test('example test', async () => {
  const electronApp = await electron.launch({ args: ['.'] })
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    // This runs in Electron's main process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.isPackaged
  })

  expect(isPackaged).toBe(false)

  // Wait for the first BrowserWindow to open
  // and return its Page object
  const window = await electronApp.firstWindow()
  await window.screenshot({ path: 'intro.png' })

  // close app
  await electronApp.close()
})
```

Run with `npx playwright test`. Install with `npm install --save-dev @playwright/test`.

## WebdriverIO

```sh
npm init wdio@latest ./
```

Choose "Desktop Testing - of Electron Applications" in the wizard. Resulting `wdio.conf.js`:

```js
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
      'wdio:electronServiceOptions': {
        // WebdriverIO can automatically find your bundled application
        // if you use Electron Forge or electron-builder, otherwise you
        // can define it here, e.g.:
        // appBinaryPath: './path/to/bundled/application.exe',
        appArgs: ['foo', 'bar=baz']
      }
    }
  ]
  // ...
}
```

Run tests with `npx wdio run wdio.conf.js`. Electron APIs are reachable from tests via `browser.electron.execute((electron, ...params) => { ... }, ...params)`.

## Selenium

Run a ChromeDriver server (`electron-chromedriver`, default port `9515`) and point `selenium-webdriver` at it:

```js
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // The "9515" is the port opened by ChromeDriver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    'goog:chromeOptions': {
      // Here is the path to your Electron binary.
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
  .build()
```

## Custom test driver

Spawn the Electron process with `child_process` and an `'ipc'` stdio channel; the app side uses `process.on('message')` / `process.send()`.

```js
const electronPath = require('electron')

const childProcess = require('node:child_process')

// spawn the process
const env = {
  /* ... */
}
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

// listen for IPC messages from the app
appProcess.on('message', (msg) => {
  // ...
})

// send an IPC message to the app
appProcess.send({ my: 'message' })
```

```js
// main.js: listen for messages from the test suite
process.on('message', (msg) => {
  // ...
})

// send a message to the test suite
process.send({ my: 'message' })
```

## Notes

- The Playwright section of the guide was written with `@playwright/test@1.52.0`; check Playwright's release notes for later changes. Playwright Test automatically runs files matching `.*(test|spec)\.(js|ts|mjs)`.
- Playwright's Electron support is described as experimental in the guide.
- Distance: this page covers testing a running Electron app end to end. The playwright skill documents Playwright itself, and the vitest skill covers unit testing; neither is Electron-specific.
- On Linux CI without a display, see Testing on Headless CI Systems.

## Related

- [Testing on Headless CI Systems](./testing-on-headless-ci.md)
- [Application Debugging](./application-debugging.md)

---
source: https://v2.tauri.app/develop/tests/webdriver/example/selenium/
---

# WebDriver Example: Selenium

Run end-to-end tests against a Tauri app through `tauri-driver` with Selenium and Mocha.

`e2e-tests/package.json`

```json
{
  "name": "selenium",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "mocha"
  },
  "dependencies": {
    "chai": "^5.2.1",
    "mocha": "^11.7.1",
    "selenium-webdriver": "^4.34.0"
  }
}
```

`e2e-tests/test/test.js`

```javascript
import os from 'os';
import path from 'path';
import { expect } from 'chai';
import { spawn, spawnSync } from 'child_process';
import { Builder, By, Capabilities } from 'selenium-webdriver';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// create the path to the expected application binary
const application = path.resolve(
  __dirname,
  '..',
  '..',
  'src-tauri',
  'target',
  'debug',
  'tauri-app'
);

// keep track of the webdriver instance we create
let driver;

// keep track of the tauri-driver process we start
let tauriDriver;
let exit = false;

before(async function () {
  // set timeout to 2 minutes to allow the program to build if it needs to
  this.timeout(120000);

  // ensure the app has been built
  spawnSync('yarn', ['tauri', 'build', '--debug', '--no-bundle'], {
    cwd: path.resolve(__dirname, '../..'),
    stdio: 'inherit',
    shell: true,
  });

  // start tauri-driver
  tauriDriver = spawn(
    path.resolve(os.homedir(), '.cargo', 'bin', 'tauri-driver'),
    [],
    { stdio: [null, process.stdout, process.stderr] }
  );
  tauriDriver.on('error', (error) => {
    console.error('tauri-driver error:', error);
    process.exit(1);
  });
  tauriDriver.on('exit', (code) => {
    if (!exit) {
      console.error('tauri-driver exited with code:', code);
      process.exit(1);
    }
  });

  const capabilities = new Capabilities();
  capabilities.set('tauri:options', { application });
  capabilities.setBrowserName('wry');

  // start the webdriver client
  driver = await new Builder()
    .withCapabilities(capabilities)
    .usingServer('http://127.0.0.1:4444/')
    .build();
});

after(async function () {
  // stop the webdriver session
  await closeTauriDriver();
});

describe('Hello Tauri', () => {
  it('should be cordial', async () => {
    const text = await driver.findElement(By.css('body > h1')).getText();
    expect(text).to.match(/^[hH]ello/);
  });

  it('should be excited', async () => {
    const text = await driver.findElement(By.css('body > h1')).getText();
    expect(text).to.match(/!$/);
  });

  it('should be easy on the eyes', async () => {
    // selenium returns color css values as rgb(r, g, b)
    const text = await driver
      .findElement(By.css('body'))
      .getCssValue('background-color');

    const rgb = text.match(/^rgb\((?<r>\d+), (?<g>\d+), (?<b>\d+)\)$/).groups;
    expect(rgb).to.have.all.keys('r', 'g', 'b');

    const luma = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    expect(luma).to.be.lessThan(100);
  });
});

async function closeTauriDriver() {
  exit = true;
  try {
    // stop the webdriver session first
    await driver?.quit();
  } finally {
    // then kill the tauri-driver process
    tauriDriver?.kill();
  }
}

function onShutdown(fn) {
  const cleanup = () => {
    try {
      fn();
    } finally {
      process.exit();
    }
  };

  process.on('exit', cleanup);
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGHUP', cleanup);
  process.on('SIGBREAK', cleanup);
}

onShutdown(() => {
  closeTauriDriver();
});
```

Run

```sh
npm test
```

## Notes

- Tauri apps are tested through `tauri-driver` (WebDriver server), not through Playwright; see the playwright skill for Playwright.
- Complete the WebDriver prerequisites (manual setup) first; the app binary must exist at `src-tauri/target/debug/tauri-app` and `tauri-driver` at `~/.cargo/bin/tauri-driver`.
- Selenium has no bundled test suite, so Mocha plus manual `tauri-driver` start / stop hooks are needed; the capability `tauri:options.application` points at the binary and the browser name is `wry`.
- The official snippet kills tauri-driver before driver.quit(); the order is swapped so the session is deleted first.
- The `before` hook runs `yarn tauri build --debug --no-bundle`; change `yarn` if you use another package manager.

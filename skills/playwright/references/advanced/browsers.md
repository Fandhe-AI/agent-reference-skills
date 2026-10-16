# Browsers

Playwright downloads and manages browser binaries for Chromium, Firefox, and WebKit. Each Playwright release is pinned to specific browser versions to guarantee consistent behavior.

## Installation

```bash
# Install all default browsers
npx playwright install

# Install a specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

# Install system dependencies (Linux)
npx playwright install-deps

# Install browser with system dependencies
npx playwright install --with-deps chromium
```

## Supported Browsers

| Browser    | Engine  | Matches                        |
| ---------- | ------- | ------------------------------ |
| Chromium   | Blink   | Google Chrome, Microsoft Edge  |
| Firefox    | Gecko   | Recent Firefox Stable          |
| WebKit     | WebKit  | Safari (latest main branch)    |

## System Requirements (v1.64)

- Node.js: latest 22.x, 24.x, or 26.x.
- Windows: Windows 11+, Windows Server 2019+, or WSL.
- macOS: macOS 14 (Sonoma) or later per the v1.64 installation docs (intro-js.md). Note that the source docs are not consistent here: the v1.59 release notes (Breaking Changes) state "Removed macOS 14 support for WebKit", so WebKit may require a newer macOS; the source does not name the minimum version.
- Linux: Debian 12 / 13, Ubuntu 22.04 / 24.04 / 26.04 (x86-64 or arm64).

Removed support: Debian 11 (v1.62), Ubuntu 20.04 (v1.63). Ubuntu 26.04 added in v1.61. On Linux arm64, Chromium is the Chrome for Testing build (v1.63). Browser versions: v1.64 Chromium 156.0.8078.4 / Firefox 157.0 / WebKit 27.2; v1.60 Chromium 148.0.7778.96 / Firefox 150.0.2 / WebKit 26.4. `BrowserType.launch` has an `artifactsDir` option (v1.59).

## Browser Channels

Channels allow testing against branded (stable/beta/dev/canary) browser builds instead of the bundled Chromium/Firefox/WebKit:

| Channel          | Browser                   |
| ---------------- | ------------------------- |
| `chrome`         | Google Chrome Stable      |
| `msedge`         | Microsoft Edge Stable     |
| `chrome-beta`    | Google Chrome Beta        |
| `msedge-beta`    | Microsoft Edge Beta       |
| `chrome-dev`     | Google Chrome Dev         |
| `msedge-dev`     | Microsoft Edge Dev        |
| `chrome-canary`  | Google Chrome Canary      |
| `msedge-canary`  | Microsoft Edge Canary     |

Install branded browsers:

```bash
npx playwright install msedge
npx playwright install chrome
```

## Headless Shell

For CI environments that only need headless Chromium, install the lightweight headless shell:

```bash
# Install headless shell only (smaller download)
npx playwright install --with-deps --only-shell

# Install full Chromium without headless shell
npx playwright install --with-deps --no-shell
```

## Configuring Browser Projects

Define multiple browser targets in `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
  ],
});
```

Run a single project:

```bash
npx playwright test --project=firefox
```

## Browser Cache

Default cache locations by platform:

| Platform | Path                                      |
| -------- | ----------------------------------------- |
| macOS    | `~/Library/Caches/ms-playwright`          |
| Linux    | `~/.cache/ms-playwright`                  |
| Windows  | `%USERPROFILE%\AppData\Local\ms-playwright` |

### PLAYWRIGHT_BROWSERS_PATH

Override the cache directory:

```bash
# Custom location
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers npx playwright install
PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers npx playwright test

# Hermetic install (inside node_modules)
PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install
```

### Network Configuration

```bash
# Proxy for downloads
HTTPS_PROXY=https://192.0.2.1 npx playwright install

# Custom certificate authority
export NODE_EXTRA_CA_CERTS="/path/to/cert.pem"

# Increase download timeout (milliseconds)
PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=120000 npx playwright install

# Custom download host
PLAYWRIGHT_DOWNLOAD_HOST=http://192.0.2.1 npx playwright install

# Per-browser custom host
PLAYWRIGHT_FIREFOX_DOWNLOAD_HOST=http://203.0.113.3 npx playwright install
```

### Stale browser removal

Playwright keeps track of the clients that use its browsers. When there are no more clients that require a particular version of the browser, that version is deleted from the system. That way you can safely use Playwright instances of different versions and at the same time, you don't waste disk space for the browsers that are no longer in use.

To opt-out from the unused browser removal, you can set the `PLAYWRIGHT_SKIP_BROWSER_GC=1` environment variable, or pass the `--no-remove` option to the install command:

```bash
npx playwright install --no-remove
```

## Listing and Uninstalling

```bash
# List installed browsers
npx playwright install --list

# Uninstall browsers for current Playwright version
npx playwright uninstall

# Uninstall all Playwright browser versions
npx playwright uninstall --all
```

## Version Management

```bash
# Check current version
npx playwright --version

# Update Playwright and re-install browsers
npm install -D @playwright/test@latest
npx playwright install
```

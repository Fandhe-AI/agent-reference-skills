---
source: https://www.electronjs.org/docs/latest/tutorial/automated-testing
---

# Testing and CI

Running E2E tests and headless CI. Sources: automated-testing and testing-on-headless-ci (`https://www.electronjs.org/docs/latest/tutorial/testing-on-headless-ci`).

## Run in headless CI

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

Linux needs a display driver. `xvfb-maybe` sets up Xvfb automatically when needed and does nothing on Windows / macOS.

## Set up WebdriverIO

```sh
npm init wdio@latest ./
```

Choose "Desktop Testing - of Electron Applications" in the wizard. It generates `wdio.conf.js`.

## Run WebdriverIO tests

```sh
npx wdio run wdio.conf.js
```

WebdriverIO launches and closes the app.

## Install and start ChromeDriver for Selenium

```sh
npm install --save-dev electron-chromedriver
./node_modules/.bin/chromedriver
```

Listens on port `9515` (official sample output). Then run `npm install --save-dev selenium-webdriver`.

## Install and run Playwright

```sh
npm install --save-dev @playwright/test
npx playwright test
```

The official page notes it was written against `@playwright/test@1.52.0`. Electron support is experimental.

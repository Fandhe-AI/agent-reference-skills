---
source: https://www.electronjs.org/docs/latest/tutorial/automated-testing
---

# Testing and CI

E2E テストとヘッドレス CI の実行。出典は automated-testing と testing-on-headless-ci（`https://www.electronjs.org/docs/latest/tutorial/testing-on-headless-ci`）。

## ヘッドレス CI での実行

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

Linux ではディスプレイドライバが必要。`xvfb-maybe` が必要なら Xvfb を自動設定し、Windows / macOS では何もしない。

## WebdriverIO のセットアップ

```sh
npm init wdio@latest ./
```

ウィザードで "Desktop Testing - of Electron Applications" を選択する。`wdio.conf.js` が生成される。

## WebdriverIO テストの実行

```sh
npx wdio run wdio.conf.js
```

アプリの起動・終了は WebdriverIO が行う。

## Selenium 用 ChromeDriver のインストールと起動

```sh
npm install --save-dev electron-chromedriver
./node_modules/.bin/chromedriver
```

ポート `9515` で待ち受ける（公式出力例）。続けて `npm install --save-dev selenium-webdriver` を実行する。

## Playwright のインストールと実行

```sh
npm install --save-dev @playwright/test
npx playwright test
```

公式は `@playwright/test@1.52.0` で執筆された旨を注記している。Electron サポートは experimental。

---
source: https://v2.tauri.app/develop/tests/webdriver/manual-setup/
---

# WebDriver Manual Setup

Driving `tauri-driver` directly, without the WebdriverIO Tauri service. Use it if you are not using Node.js, prefer Selenium, or integrate WebDriver into a custom test harness. For most projects the service is the easier path and additionally supports macOS.

## Signature / Usage

Install or update `tauri-driver`:

```shell
cargo install tauri-driver --locked
```

When driving `tauri-driver` directly, only Windows and Linux are supported on desktop, as macOS has no WKWebView driver tool available. iOS and Android work through Appium 2, but the process is not currently streamlined.

## System dependencies

`tauri-driver` uses the platform's native WebDriver server.

### Linux

`WebKitWebDriver` is used. Check whether it exists with `which WebKitWebDriver` (some distributions bundle it with the regular WebKit package). Other platforms may have a separate package, such as `webkit2gtk-driver` on Debian-based distributions.

### Windows

Use the version of Microsoft Edge Driver that matches the Windows Edge version the application is built and tested on (almost always the latest stable on up-to-date Windows installs). If the versions do not match, the WebDriver testing suite may hang while trying to connect.

`msedgedriver-tool` downloads the appropriate Microsoft Edge Driver:

```powershell
cargo install --git https://github.com/chippers/msedgedriver-tool
& "$HOME/.cargo/bin/msedgedriver-tool.exe"
```

The download contains `msedgedriver.exe`. `tauri-driver` looks for that binary in the `$PATH`, so make sure it is on the path or use the `--native-driver` option of `tauri-driver`. Download it automatically as part of CI setup to keep the Edge and Edge Driver versions in sync on Windows CI machines.

## Example applications

Step-by-step guides create a minimal example application tested with WebDriver, using Selenium or WebdriverIO. A finished minimal codebase is at https://github.com/tauri-apps/webdriver-example. The examples also come with a CI script for GitHub Actions.

## Notes

- Tauri uses WebDriver via `tauri-driver`. This is not Playwright; see the playwright skill for Playwright.

## Related

- [WebDriver](./webdriver-overview.md)
- [Continuous Integration (WebDriver)](./webdriver-ci.md)

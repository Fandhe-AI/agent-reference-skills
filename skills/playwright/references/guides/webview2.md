# WebView2

Automate Microsoft Edge WebView2 (a Windows control that renders web content with Edge) using Playwright over the Chrome DevTools Protocol.

## Signature / Usage

Enable CDP in the WebView2 control (either set the `WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS` environment variable to `--remote-debugging-port=9222`, or pass the argument via `EnsureCoreWebView2Async`):

```csharp
await this.webView.EnsureCoreWebView2Async(await CoreWebView2Environment.CreateAsync(null, null, new CoreWebView2EnvironmentOptions()
{
  AdditionalBrowserArguments = "--remote-debugging-port=9222",
})).ConfigureAwait(false);
```

Connect from Playwright:

```js
const browser = await playwright.chromium.connectOverCDP('http://localhost:9222');
const context = browser.contexts()[0];
const page = context.pages()[0];
```

Wait for the control to be ready with the `CoreWebView2InitializationCompleted` event:

```csharp
this.webView.CoreWebView2InitializationCompleted += (_, e) =>
{
    if (e.IsSuccess)
    {
        Console.WriteLine("WebView2 initialized");
    }
};
```

## Writing and running tests

Playwright can run the WebView2 app as a sub-process with a unique user data directory per worker and provide the `Page` to tests (JS fixture, abridged):

```ts
export const test = base.extend({
  browser: async ({ playwright }, use, testInfo) => {
    const cdpPort = 10000 + testInfo.workerIndex;
    const userDataDir = path.join(
        fs.realpathSync.native(os.tmpdir()),
        `playwright-webview2-tests/user-data-dir-${testInfo.workerIndex}`,
    );
    const webView2Process = childProcess.spawn(EXECUTABLE_PATH, [], {
      shell: true,
      env: {
        ...process.env,
        WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS: `--remote-debugging-port=${cdpPort}`,
        WEBVIEW2_USER_DATA_FOLDER: userDataDir,
      }
    });
    // ...wait for "WebView2 initialized" on stdout...
    const browser = await playwright.chromium.connectOverCDP(`http://127.0.0.1:${cdpPort}`);
    await use(browser);
    // ...cleanup...
  },
  context: async ({ browser }, use) => { await use(browser.contexts()[0]); },
  page: async ({ context }, use) => { await use(context.pages()[0]); },
});
```

## Notes

- Playwright connects via `BrowserType.connectOverCDP`. 9222 is an example port; any unused port works.
- By default all WebView2 instances share the same user data directory, so parallel tests interfere. Set `WEBVIEW2_USER_DATA_FOLDER` (or use `EnsureCoreWebView2Async`) to a different folder per test or worker.
- The official page provides the full fixtures for JS, Java (JUnit), Python (pytest) and .NET (MSTest / NUnit / xUnit / xUnit v3); the app is expected to print `WebView2 initialized` once ready, which the fixtures wait for.
- In the .NET base classes, WebView2 does lazy cleanups on shutdown, so the user data dir is deleted before the next run rather than after each test.
- Debugging: right-click inside the control and choose "Inspect", press F12, or call `CoreWebView2.OpenDevToolsWindow`. For test debugging see the Playwright Debugging guide.
- Source: https://playwright.dev/docs/webview2 (microsoft/playwright v1.64.1 `docs/src/webview2.md`)

## Related

- [Best Practices](./best-practices.md)

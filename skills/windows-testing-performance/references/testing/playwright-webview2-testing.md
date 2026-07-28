# Playwright / WebView2 Testing

If a Windows app hosts web content in **WebView2**, the web portion can be tested with **Microsoft Playwright**, which supports automated browser testing and can connect to WebView2 instances for end-to-end scenario validation.

## Signature / Usage

```bash
# Install Playwright in a Node.js or .NET test project, then point tests at
# the WebView2-hosted content the way you would any Chromium-based browser target.
npm install -D @playwright/test
```

## Notes

- This tests the **web content rendered inside WebView2** (HTML/CSS/JS), complementary to WinAppDriver/Appium, which drives the native Windows UI Automation tree of the surrounding desktop app.
- For general Playwright API reference (locators, assertions, fixtures) use the dedicated `playwright` skill rather than duplicating that content here — this page covers only the WebView2-specific testing scenario as documented for Windows apps.
- Combine with WinAppDriver/Appium when a scenario spans both native chrome (buttons, menus) and embedded web content.

## Related

- [UI Testing with WinAppDriver / Appium](./ui-testing-winappdriver.md)

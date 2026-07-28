# UI Testing with WinAppDriver / Appium

Windows Application Driver (WinAppDriver) is a Selenium-like UI test automation service for Windows desktop apps (UWP, WinForms, WPF, Win32). It exposes the WebDriver protocol over UI Automation. WinAppDriver itself is no longer actively developed; the recommended path is **Appium** with the **Windows Application Driver plugin** (`appium-windows-driver`), which uses the same protocol and capabilities model.

## Signature / Usage

```csharp
// Desired capabilities
var appCapabilities = new DesiredCapabilities();

// UWP app: use the Application User Model ID (AUMID)
appCapabilities.SetCapability("app", "Microsoft.WindowsAlarms_8wekyb3d8bbwe!App");

// Classic Win32 app: use the executable path
appCapabilities.SetCapability("app", @"C:\Windows\System32\notepad.exe");

// Start a session against the local WinAppDriver/Appium server
var session = new WindowsDriver<WindowsElement>(
    new Uri("http://127.0.0.1:4723"),
    appCapabilities);

// Find elements
var element = session.FindElementByAccessibilityId("SomeAutomationId");
var byName = session.FindElementByName("Some Button Text");
```

```bash
# Appium + Windows driver setup (requires Node.js LTS)
npm install -g appium
appium driver install windows
appium driver list   # verify "windows" is installed
appium                # start the Appium server
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `app` | capability | AUMID (packaged apps) or executable path (unpackaged apps) to launch |
| `appArguments` | capability | Launch arguments passed to the app |
| `appWorkingDir` | capability | Working directory (classic Win32 apps only) |
| `FindElementByAccessibilityId` | method | Locate an element by its UI Automation AutomationId |
| `FindElementByName` | method | Locate an element by its accessible Name |
| `FindElementByClassName` | method | Locate an element by its UI Automation ClassName |

## Notes

- Legacy `WinAppDriver.exe` listens on `127.0.0.1:4723` by default (`WinAppDriver.exe 4727` for a custom port, `WinAppDriver.exe 10.0.0.10 4725` for a custom IP+port; non-default addresses require admin rights). Requires Developer Mode enabled on the test machine.
- The device under test must have Developer Mode enabled (see MSIX sideloading / developer mode reference) before WinAppDriver/Appium can launch and automate apps.
- Test clients are available for C#, Python, Java, and JavaScript via standard WebDriver client libraries.
- **Accessibility Insights for Windows** can be used to inspect the UI Automation tree of an app to confirm which elements/AutomationIds are exposed to automation — a well-structured automation tree improves both testability and accessibility.
- Do not confuse this Selenium/WebDriver-based `FindElementBy*` API with Playwright's locator API used for WebView2 content testing.

## Related

- [Playwright / WebView2 Testing](./playwright-webview2-testing.md)
- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)

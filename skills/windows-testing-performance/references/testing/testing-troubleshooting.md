# Testing Troubleshooting

Common failure points when setting up or running Windows app tests, gathered from the unit testing, WACK, and Developer Mode/sideloading guides.

## Notes

- **Test Explorer shows no tests**: build the solution first — Visual Studio only discovers tests after a successful build. If a WinUI 3 test needs `Microsoft.UI.Xaml` types, verify it uses `[UITestMethod]` (not `[TestMethod]`); the latter has no XAML UI thread and will fail or hang.
- **MSTest/NUnit/xUnit project referencing a WinUI 3 project fails to build/run**: check that `TargetFramework` matches the WinUI 3 project's Windows-specific TFM (e.g. `net8.0-windows10.0.19041.0`) and that `RuntimeIdentifiers` and `WindowsAppSdkBootstrapInitialize` are set; otherwise the Windows App SDK runtime won't load at test time.
- **WACK appears stuck on "Process Install Trace Files"**: the installer likely left active processes or windows running after exit — close them manually to let the kit continue.
- **WACK / appcert.exe fails to run at all**: it must execute within an active, interactive user session; it cannot run in Session0, though it can be *launched* by a service if that service initiates the process inside an active session.
- **App won't launch during WACK deployment/launch tests**: `IApplicationActivationManager::ActivateApplication` requires UAC enabled and a minimum screen resolution of 1024x768 (or 768x1024) — verify both on the test machine, then check the `Application and Services Log\Microsoft\Windows\Immersive-Shell` event log (Event IDs 5900-6000) for the specific activation failure.
- **Supported API test fails unexpectedly**: confirm the build is a **Release** build, not Debug — debug builds fail this WACK test even when only approved UWP APIs are used.
- **Can't sideload / install unsigned MSIX package**: Developer Mode or the sideloading policy (`AllowAllTrustedApps` registry DWORD, or the corresponding `gpedit.msc` policy) must be enabled on the target device first.
- **WinAppDriver/Appium can't find or launch the app**: confirm Developer Mode is enabled on the test machine, the `app` capability is correct (AUMID for packaged apps, exe path for unpackaged apps), and the Appium/WinAppDriver server is actually running on the expected `host:port` before starting the session.

## Related

- [Unit Testing WinUI 3 Apps](./unit-testing-winui3.md)
- [Windows App Certification Kit (WACK)](./wack-certification.md)
- [UI Testing with WinAppDriver / Appium](./ui-testing-winappdriver.md)
- [MSIX Sideloading and Developer Mode](./msix-sideloading.md)

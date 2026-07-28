# WACK Test Categories

The Windows App Certification Kit runs a fixed set of test categories against a submitted app package. Each category has pass/fail criteria and suggested corrective actions on failure.

## Options / Props

| Name | Description |
|------|-------------|
| Deployment and launch tests | Monitors the app for crashes/hangs during certification; requires UAC enabled and a minimum screen resolution for `IApplicationActivationManager::ActivateApplication` to launch the app |
| Platform Version Launch test | Verifies the app doesn't crash when it detects a future OS version (checks correct use of OS version APIs) |
| Background tasks cancellation handler validation | Verifies declared background tasks implement a cancellation handler so the app doesn't hang when the OS reclaims resources |
| App count | Verifies the package/bundle contains exactly one main application |
| App manifest compliance test | Validates file/protocol associations, Framework Dependency rules, and blocks inter-process communication (IPC) outside the app container for UWP packages |
| Windows Security features test | Runs the BinScope Binary Analyzer (APTCA, /SafeSEH, DEP, ASLR, shared PE sections, AppContainerCheck, ExecutableImportsCheck, WXCheck) and checks for accidentally-included private code-signing files (.pfx/.snk) |
| Supported API test | Verifies every binary only calls supported UWP/Win32 APIs and managed binaries stay within the approved profile; debug builds fail this test |
| Performance tests | Bytecode generation for `.js` files and `WinJS.Binding.optimizeBindingReferences` checks, evaluated against a low-power reference computer |
| App manifest resources test | Validates manifest-declared images/strings exist, are correctly sized, and that default template images/branding were replaced |
| Debug configuration test | Fails if the app is a debug build or links debug frameworks |
| File encoding test | HTML/CSS/JS files must be UTF-8 with a byte-order mark |
| Direct3D feature level test | Verifies the app renders or fails gracefully on Direct3D feature level 9-1 hardware, and calls `IDXGIDevice3::Trim` on suspend |
| App Capabilities test | Warns when special-use capabilities (`EnterpriseAuthentication`, `SharedUserCertificates`, `DocumentsLibrary`) are declared without justification |
| Windows Runtime metadata validation | Validates `.winmd` files conform to Windows Runtime type-system rules (ExclusiveTo, type location, name case-sensitivity, property getters/setters) |
| Package Sanity tests | Validates binaries match the declared processor architecture and install paths don't exceed `MAX_PATH` |
| Resource Usage test | Verifies JavaScript background tasks call `Close()` as their last statement to avoid draining battery |

## Notes

- The full corrective-action text and error-message strings for each sub-test are documented per category on the official page; consult it directly when triaging a specific WACK failure message.
- These categories apply to both UWP and Desktop Bridge (Win32-packaged) app workflows; some tests (e.g. Direct3D, WinJS-specific ones) are conditionally skipped depending on app type.

## Related

- [Windows App Certification Kit (WACK)](./wack-certification.md)

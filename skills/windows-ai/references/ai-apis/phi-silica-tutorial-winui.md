# Tutorial: Build a chat app with Phi Silica and WinUI 3

Step-by-step WinUI 3 desktop app that sends a prompt (chat / summarize / rewrite) to the on-device Phi Silica `LanguageModel`.

## Signature / Usage

Unlock the Limited Access Feature, check readiness, create the model, and generate:

```csharp
var access = LimitedAccessFeatures.TryUnlockFeature(
    "com.microsoft.windows.ai.languagemodel",
    "YOUR_TOKEN_HERE",
    "YOUR_ATTESTATION_STRING_HERE");

if (access.Status != LimitedAccessFeatureStatus.Available &&
    access.Status != LimitedAccessFeatureStatus.AvailableWithoutToken)
{
    return;
}

var readyState = LanguageModel.GetReadyState();
if (readyState == AIFeatureReadyState.NotReady)
{
    var ensureResult = await LanguageModel.EnsureReadyAsync();
    if (ensureResult.ExtendedError != null) { return; }
}

_languageModel = await LanguageModel.CreateAsync();
var result = await _languageModel.GenerateResponseAsync(fullPrompt);
ResponseText.Text = result.Text;
```

Manifest (`Package.appxmanifest`): declare the `systemai` namespace in the `<Package>` opening tag, raise `MinVersion` to 10.0.26100.0, and add the capability:

```xml
<Dependencies>
  <TargetDeviceFamily Name="Windows.Universal" MinVersion="10.0.26100.0" MaxVersionTested="10.0.26300.0" />
  <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.26100.0" MaxVersionTested="10.0.26300.0" />
</Dependencies>
<Capabilities>
  <rescap:Capability Name="runFullTrust"/>
  <systemai:Capability Name="systemAIModels"/>
</Capabilities>
```

Project file:

```xml
<AppxOSMinVersionReplaceManifestVersion>false</AppxOSMinVersionReplaceManifestVersion>
<AppxOSMaxVersionTestedReplaceManifestVersion>false</AppxOSMaxVersionTestedReplaceManifestVersion>
```

Find the Package Family Name needed for the LAF token:

```powershell
Get-AppxPackage | Where-Object {$_.Name -like "*PhiSilicaChat*"} | Select-Object PackageFamilyName
```

## Notes

- Phi Silica runs on Copilot+ PCs (NPU) and on non-Copilot+ Windows 11 devices with a supported GPU. If neither applies, Foundry Local is the alternative named by the page. Phi Silica features are not available in China.
- Prerequisites: Windows 11 build 26100 or later (24H2), Developer Mode, Visual Studio 2022 with the Windows application development workload, Windows App SDK 1.8 experimental NuGet package `Microsoft.WindowsAppSDK` version `1.8.250410001-experimental1` (check "Include prerelease"), and a Phi Silica LAF unlock token.
- Project: "Blank App, Packaged (WinUI 3 in Desktop)" named `PhiSilicaChat`, build configuration ARM64, launch profile `PhiSilicaChat (Package)` (the `LanguageModel` API only works in a packaged MSIX app; the unpackaged profile makes `GetReadyState()` fail with a COM error).
- If `MinVersion` is lower than 10.0.26100.0, Windows silently ignores `systemai:Capability` and `GetReadyState()` throws "Not declared by app". `xmlns:systemai` must be in the `<Package>` opening tag, otherwise an "undeclared prefix" parse error occurs.
- The `LanguageModelSkill` enum (`Summarize`, `Rewrite`) is not available in all experimental builds; the tutorial prepends instructions (for example `Summarize the following text concisely:`) to the prompt. Later: `new LanguageModelOptions { Skill = LanguageModelSkill.Summarize }`.
- LAF token: Microsoft emails a token and an attestation string, both bound to the app's Package Family Name. Do not commit them to a public repository.
- Troubleshooting: "not supported on this device" (not a Copilot+ PC or build below 26100); namespace not found (check package version and ARM64); `E_ACCESSDENIED` (missing LAF token); `EnsureReadyAsync` fails or hangs (check Settings > Windows Update for model download progress; requires internet).
- WinUI 3 control names here (`Grid`, `TextBox`, `ComboBox`, `Button`) are `Microsoft.UI.Xaml.Controls`, not WPF or WinForms.

## Related

- [Get started building an app with Windows AI APIs](./get-started.md)
- [LanguageModel](./language-model.md)
- [Tutorial: Phi Silica and .NET MAUI](./phi-silica-tutorial-maui.md)
- [Device requirements and fallback](./device-requirements.md)

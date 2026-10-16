# Get started building an app with Windows AI APIs

Hardware requirements, dependency setup, project configuration (WinUI / WPF / WinForms / .NET MAUI), and a first `LanguageModel` call for Windows AI APIs.

## Signature / Usage

Packaged apps declare the `systemAIModels` capability and a `MaxVersionTested` of at least 10.0.26226.0 in `Package.appxmanifest`, with a `MinVersion` of 10.0.26100.0 or later (see Notes):

```xml
<Capabilities>
   <systemai:Capability Name="systemAIModels"/>
</Capabilities>
```

```xml
xmlns:systemai="http://schemas.microsoft.com/appx/manifest/systemai/windows10"
IgnorableNamespaces="uap rescap systemai"
```

```xml
<TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.26100.0" MaxVersionTested="10.0.26226.0" />
```

Prevent Visual Studio from overriding the tested version (add to the .waproj / .csproj / .vcxproj):

```xml
<AppxOSMinVersionReplaceManifestVersion>false</AppxOSMinVersionReplaceManifestVersion>
<AppxOSMaxVersionTestedReplaceManifestVersion>false</AppxOSMaxVersionTestedReplaceManifestVersion>
```

First API call (check model availability, then generate):

```csharp
using Microsoft.Windows.AI;
using Microsoft.Windows.AI.Text;

var readyState = LanguageModel.GetReadyState();
if (readyState == AIFeatureReadyState.NotReady)
{
    var ensureResult = await LanguageModel.EnsureReadyAsync();
    if (ensureResult.Status != AIFeatureReadyResultState.Success)
    {
        throw ensureResult.ExtendedError;
    }
    readyState = LanguageModel.GetReadyState();
}

if (readyState != AIFeatureReadyState.Ready)
{
    throw new Exception($"LanguageModel is unavailable: {readyState}");
}

using LanguageModel languageModel = await LanguageModel.CreateAsync();
var result = await languageModel.GenerateResponseAsync("Provide the molecular formula of glucose.");
```

## Options / Props

| `AIFeatureReadyState` | Meaning | What the app should do |
|------|------|------|
| `Ready` | Model is installed and the device supports the API. | Call the API. |
| `NotReady` | Device supports the API, but the model needs to be downloaded or prepared. | Show a consent dialog (size, network usage), then call `EnsureReadyAsync` and report progress. |
| `DisabledByUser` | The user disabled the required AI component. | Ask the user to enable it in Windows Settings, or hide/disable the feature. |
| `NotSupportedOnCurrentSystem` | The device cannot run this API (incompatible hardware, missing drivers, or policy). | Do not call `EnsureReadyAsync`. Hide/disable the feature or fall back (for example, a cloud AI service). |

## Notes

- Automated setup: `winget configure https://raw.githubusercontent.com/microsoft/winget-dsc/refs/heads/main/samples/Configuration%20files/Learn%20tutorials/Windows%20AI/learn_wcr.winget` checks the minimum OS version, enables Developer Mode, installs Visual Studio Community with WinUI workloads, and installs the Windows App SDK.
- Most APIs require a Copilot+ PC with an NPU; some APIs also support GPU or CPU on non-Copilot+ devices.
- Manual setup: Windows 11 Insider Preview build 26120.3073 (Dev and Beta Channels) or later; Developer Mode enabled; Visual Studio with WinUI / Windows App SDK workloads.
- Phi Silica on GPU: Windows Insider Experimental Channel build 26300.8553 or later, Developer Mode (required), and Windows App SDK 2.2.2-experimental9 (June 2026 Experimental) or later (check "Include prerelease").
- Otherwise select the latest stable Windows App SDK, such as 2.5.1 or later.
- WinUI: use the "Blank App, Packaged (WinUI 3 in Desktop)" template, target .NET 8.0 and OS 10.0.22621 or later, and set the build configuration to the device architecture (ARM64 or x64).
- WPF / WinForms: set `<TargetFramework>net8.0-windows10.0.22621.0</TargetFramework>`, `<WindowsPackageType>None</WindowsPackageType>` and `<RuntimeIdentifiers>win-x86;win-x64;win-arm64</RuntimeIdentifiers>` in the project file.
- WPF / WinForms: `WindowsPackageType=None` builds an unpackaged app, but apps that use Windows AI APIs must be granted package identity at runtime (troubleshooting page); otherwise the `systemAIModels` capability in `Package.appxmanifest` does not apply and calls fail with `UnauthorizedAccessException` / a COM error. Give the app identity by packaging it and launch the packaged profile. Sources: https://learn.microsoft.com/en-us/windows/ai/apis/troubleshooting, https://learn.microsoft.com/en-us/windows/ai/apis/phi-silica-winui-tutorial
- Deviation: the get-started page shows `MinVersion="10.0.17763.0"`, but the Phi Silica WinUI tutorial states that a `MinVersion` lower than 10.0.26100.0 makes Windows silently ignore `systemai:Capability` and `GetReadyState()` throws "Not declared by app"; this page uses 10.0.26100.0. Source: https://learn.microsoft.com/en-us/windows/ai/apis/phi-silica-winui-tutorial
- .NET MAUI: condition the `Microsoft.WindowsAppSDK` package reference (for example `Version="2.5.1"`) on `GetTargetPlatformIdentifier('$(TargetFramework)') == 'windows'`, and put the Windows code in `Platforms/Windows` via partial classes/methods.
- Limited Access Feature: `LanguageModel` (Phi Silica) is a Limited Access Feature, and the first API call above omits the unlock. Before `GetReadyState`, call `LimitedAccessFeatures.TryUnlockFeature("com.microsoft.windows.ai.languagemodel", token, attestation)` and proceed only when the status is `Available` or `AvailableWithoutToken` (see `phi-silica-tutorial-winui.md`). Aion Instruct needs no LAF token. Source: https://learn.microsoft.com/en-us/windows/ai/apis/phi-silica
- `GetReadyState` must be called before any call to the model. `EnsureReadyAsync` installs the model in the background; progress is visible under Windows Settings > Windows Update.
- For APIs with recommended CPU specifications (such as Video Super Resolution), `GetReadyState` alone is not enough; gate availability with `GetReadyState` and quality choices with the CPU check.
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/get-started (retrieved 2026-10-16)

## Related

- [Device requirements and fallback](./device-requirements.md)
- [Troubleshooting](./troubleshooting.md)
- [LanguageModel](./language-model.md)
- [Text recognizer walkthrough](./text-recognition-tutorial.md)
- [Imaging walkthrough](./imaging-tutorial.md)

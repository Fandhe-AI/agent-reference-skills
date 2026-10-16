# Install

Install commands for the Windows AI development environment, Foundry Local, and Windows ML (Python).

Source: https://learn.microsoft.com/en-us/windows/ai/apis/get-started, https://learn.microsoft.com/en-us/windows/ai/foundry-local/get-started, https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/distributing-your-app (retrieved 2026-10-16)

## Automatically install Windows AI APIs dependencies

> **Warning**: This runs a configuration file from an external URL that enables Developer Mode and installs Visual Studio and the Windows App SDK. Review the configuration file before running it, and try it in a disposable environment (such as a VM).

```cmd
winget configure https://raw.githubusercontent.com/microsoft/winget-dsc/refs/heads/main/samples/Configuration%20files/Learn%20tutorials/Windows%20AI/learn_wcr.winget
```

Run in Windows Terminal. It checks the minimum OS version, enables Developer Mode, and installs Visual Studio Community (with workloads such as WinUI) and the Windows App SDK (from apis/get-started).

## Install the Foundry Local CLI

```powershell
winget install Microsoft.FoundryLocal
```

The CLI is not required for the SDK workflow. Reopen the terminal so that `foundry` is picked up on PATH.

## Check the Foundry Local CLI version

```bash
foundry --version
```

## Add the Foundry Local NuGet package (C#)

Set the following in the `<PropertyGroup>` of the `.csproj`.

```xml
<PropertyGroup>
  <OutputType>Exe</OutputType>
  <TargetFramework>net9.0-windows10.0.26100.0</TargetFramework>
  <Nullable>enable</Nullable>
  <ImplicitUsings>enable</ImplicitUsings>
  <RuntimeIdentifiers>win-x64;win-arm64</RuntimeIdentifiers>
</PropertyGroup>
```

```bash
dotnet restore
dotnet add package Microsoft.AI.Foundry.Local.WinML
```

The NuGet package contains native Windows binaries, so a Windows TFM and RuntimeIdentifiers are required.

## Install the Foundry Local Python SDK

```bash
pip install foundry-local-sdk-winml   # Windows — includes hardware acceleration (recommended on Windows)
pip install foundry-local-sdk         # macOS/Linux, or Windows without hardware acceleration
```

Install only one of the two. Installing both causes a conflict in the `onnxruntime-core` dependency.

## Resolve a Foundry Local SDK dependency conflict

```bash
pip uninstall foundry-local-sdk        # if you want the winml (Windows) package
pip uninstall foundry-local-sdk-winml  # if you want the cross-platform package
```

Then reinstall the package you want to keep. Using a virtual environment also avoids the conflict (from the FAQ in foundry-local/get-started).

## Windows ML Python packages (framework-dependent)

```powershell
pip install wasdk-Microsoft.Windows.AI.MachineLearning[all] wasdk-Microsoft.Windows.ApplicationModel.DynamicDependency.Bootstrap onnxruntime-windowsml
```

Separately install the Windows App SDK Runtime that matches the version of the `wasdk-` packages (from new-windows-ml/distributing-your-app).

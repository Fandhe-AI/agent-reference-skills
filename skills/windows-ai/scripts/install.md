# Install

Windows AI 開発環境・Foundry Local・Windows ML (Python) のインストールコマンド集。出典は learn.microsoft.com/windows/ai の各ページ。

## Windows AI APIs の依存関係の自動インストール

> **警告**: 外部 URL の構成ファイルを実行し、Developer Mode の有効化・Visual Studio・Windows App SDK のインストールを行う。実行前に構成ファイルの内容を確認し、使い捨ての検証環境（VM 等）で試すこと。

```cmd
winget configure https://raw.githubusercontent.com/microsoft/winget-dsc/refs/heads/main/samples/Configuration%20files/Learn%20tutorials/Windows%20AI/learn_wcr.winget
```

Windows Terminal で実行。OS の最小バージョン確認、Developer Mode 有効化、Visual Studio Community（WinUI 等のワークロード）、Windows App SDK のインストールを行う（apis/get-started より）。

## Foundry Local CLI のインストール

```powershell
winget install Microsoft.FoundryLocal
```

SDK ワークフローには CLI は不要。ターミナルを開き直して `foundry` を PATH に反映する。

## Foundry Local CLI のバージョン確認

```bash
foundry --version
```

## Foundry Local の NuGet パッケージ追加 (C#)

`.csproj` の `<PropertyGroup>` に以下を設定する。

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

NuGet パッケージにネイティブ Windows バイナリが含まれるため、Windows TFM と RuntimeIdentifiers が必要。

## Foundry Local の Python SDK インストール

```bash
pip install foundry-local-sdk-winml   # Windows — includes hardware acceleration (recommended on Windows)
pip install foundry-local-sdk         # macOS/Linux, or Windows without hardware acceleration
```

どちらか一方のみをインストールする。両方は `onnxruntime-core` の依存が衝突する。

## Foundry Local SDK の依存衝突の解消

```bash
pip uninstall foundry-local-sdk        # if you want the winml (Windows) package
pip uninstall foundry-local-sdk-winml  # if you want the cross-platform package
```

残したい側のパッケージを再インストールする。仮想環境の使用で衝突を回避できる（foundry-local/get-started の FAQ より）。

## Windows ML の Python パッケージ (framework-dependent)

```powershell
pip install wasdk-Microsoft.Windows.AI.MachineLearning[all] wasdk-Microsoft.Windows.ApplicationModel.DynamicDependency.Bootstrap onnxruntime-windowsml
```

`wasdk-` パッケージの版に対応する Windows App SDK Runtime を別途インストールする（new-windows-ml/distributing-your-app より）。

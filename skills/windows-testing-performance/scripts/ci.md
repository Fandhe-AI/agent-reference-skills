# ci

GitHub Actions / Azure Pipelines で Windows アプリのビルド・静的解析を実行するコマンド集。

## .NET プロジェクトの解析付きビルド（GitHub Actions）

```yaml
runs-on: windows-latest
steps:
  - name: Build with analysis
    run: dotnet build --configuration Release /p:AnalysisLevel=latest-recommended /p:TreatWarningsAsErrors=true
```

`AnalysisLevel=latest-recommended` は Roslyn アナライザーをローカル同等に CI 上で有効化する。プルリクエストごとに実行してリグレッションを検出する。

## C++ / MSBuild プロジェクトの解析付きビルド

```yaml
runs-on: windows-latest
steps:
  - name: Build with /analyze
    run: msbuild MySolution.sln /p:Configuration=Release /p:EnableMicrosoftCodeAnalysis=true /p:RunCodeAnalysis=true
```

MSIX の署名証明書はリポジトリにコミットせず、Azure Pipelines の **Secure files**（Pipelines > Library > Secure files）に保管し、秘密鍵パスワードは Azure Key Vault から variable group 経由で参照する。UI Automation（WinAppDriver/Appium）や WACK の実行にはアクティブなユーザーセッションが必要（WACK は Session0 では実行不可）なため、CI ランナー側でセッションを構成する必要がある。

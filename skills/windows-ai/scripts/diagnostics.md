# Diagnostics

Windows ML の実行プロバイダー (EP) の状態確認コマンド集。出典は new-windows-ml/versioning。

## インストール済み EP の版確認

```sh
Get-AppxPackage MicrosoftCorporationII.WinML.*
```

開発機にインストールされている Windows ML EP のパッケージ名・版を PowerShell で確認する。QNN EP が入っている場合、`MicrosoftCorporationII.WinML.Qualcomm.QNN.EP.1.8` のようなパッケージが出力される。

> **注記**: 上記は PowerShell コマンドレットであり、PowerShell セッションで実行する（bash / zsh では動作しない）。

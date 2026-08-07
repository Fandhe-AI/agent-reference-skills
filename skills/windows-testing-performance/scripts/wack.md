# wack

Windows App Certification Kit（WACK）を `appcert.exe` から実行するコマンド集。Windows SDK に同梱。

## 検証の実行

```bat
:: elevated command prompt で、キットのインストールディレクトリから実行
:: 既定: C:\Program Files (x86)\Windows Kits\10\App Certification Kit\

:: 状態をリセットしてから、インストール済みパッケージを検証
appcert.exe reset
appcert.exe test -packagefullname [package full name] -reportoutputpath [report file name]

:: 未インストールのパッケージを検証（キットがパッケージ自体を開く）
appcert.exe reset
appcert.exe test -appxpackagepath [package path] -reportoutputpath [report file name]
```

`reset` は新しいテスト実行前にキットの状態を初期化する。アクティブなユーザーセッション内で実行する必要があり、Session0 では実行できない。

## コマンドラインヘルプ

```bat
appcert.exe /?
```

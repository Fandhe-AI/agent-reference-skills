# winapp-cli

`winapp` CLI によるパッケージ ID デバッグと UI Automation 操作のコマンド集。

## 未パッケージビルドにパッケージ ID を付与して起動

```powershell
# ビルドフォルダ全体をルーズレイアウトパッケージとして登録し、そのまま起動
winapp run .\build\Debug

# 登録のみ行い起動しない（IDE 側から AUMID/エイリアス経由で起動する場合）
winapp run .\build\Debug --no-launch

# コンソールアプリ用に現在のターミナルの stdin/stdout を維持
winapp run .\build\Debug --with-alias

# OutputDebugString とファーストチャンス例外をインラインでキャプチャ
winapp run .\build\Debug --debug-output
```

## 単一 exe にパッケージ ID を付与（スパースパッケージ）

```powershell
winapp create-debug-identity .\bin\Debug\myapp.exe
.\bin\Debug\myapp.exe
```

ID は起動パスではなく exe 自体に紐づくため、ターミナル・IDE F5・スクリプトいずれの起動方法でも有効。

## UI Automation による検査・操作（`winapp ui`）

```bash
# UI ツリーの検査
winapp ui inspect -a notepad

# 要素の検索
winapp ui search Button -a notepad

# 要素の呼び出し（クリック相当）
winapp ui invoke Close -a notepad

# スクリーンショット取得
winapp ui screenshot -a notepad

# CI アサーション: 要素の出現を待機（一致で exit 0、タイムアウトで exit 1）
winapp ui invoke "Login" -a $appPid
winapp ui wait-for "Dashboard" -a $appPid --timeout 10000
```

CI（GitHub Actions / Azure Pipelines）では `winapp run --detach --json` で PID を取得してから `invoke` / `wait-for` / `screenshot` を連結する。PowerShell では `&&` ではなく `;` でコマンドを連結する（`&&` はネイティブ CLI の ANSI/stderr 出力でデッドロックすることがある）。

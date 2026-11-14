# Gateway

メッセージングゲートウェイサービスの起動・管理・サービス登録。

> **注**: v0.22.2 では複数プロファイルを 1 つの multiplexing gateway（1 マシン 1 プロセス）で扱うのが既定（`gateway.multiplex_profiles` が既定で `true`）。名前付きプロファイルで `hermes -p <name> gateway run` を実行しても、ホストの gateway が稼働中なら 2 つ目は起動せず attach する。

## フォアグラウンドで実行

```bash
hermes gateway run
```

WSL・Docker・Termux では `gateway run` を推奨する。

## 対話式プラットフォーム設定

```bash
hermes gateway setup
```

## サービスとして登録（Linux: systemd ユーザーサービス）

```bash
hermes gateway install
```

## サービスとして登録（Linux: システム起動時サービス）

```bash
sudo hermes gateway install --system
```

> **警告**: `--system` を指定するとシステムサービスとして登録される。root 権限が必要。ユーザーサービスとの併存は避ける（start / stop / status の挙動が曖昧になる）。

## サービスとして登録（macOS: launchd）

```bash
hermes gateway install
```

plist は `~/Library/LaunchAgents/ai.hermes.gateway.plist` に書き込まれる。`--no-start-now` を付けると、起動せずに plist のみを書き込む。

## サービスとして登録（Windows: Task Scheduler）

```powershell
hermes gateway install
```

`Hermes_Gateway` Scheduled Task を登録し、ログオン時に実行する。

## サービスの起動・停止・再起動

```bash
hermes gateway start
hermes gateway stop
hermes gateway restart
hermes gateway status
```

```bash
hermes gateway stop --yes
hermes gateway restart --yes
hermes gateway restart --detach
```

`stop` / `restart` は gateway がチャットターン・cron ジョブ・バックグラウンド委譲を実行中だと一覧を出して `y/N` を確認する。`--yes`（別名 `--interrupt`）で確認を省略する。端末が無い環境（スクリプト・cron）では `--yes` 無しだと拒否される。`--detach` は `restart` 時にサービス未導入ならバックグラウンドで置換起動する。

> **警告**: `--yes` は実行中のターン・cron ジョブ・委譲を中断する。

Windows では `start` が非表示で起動し、`stop` がドレインして停止し、`status` が登録内容のずれ（テンプレートとの差）も表示する。Task Scheduler の RestartOnFailure は launcher の失敗のみを対象とし、外部から kill された gateway は自動復旧しない。

## ローカルのセッションランタイムの検出・取得（ensure / attach）

```bash
hermes gateway ensure --json --timeout 60
hermes gateway attach --json
hermes gateway attach --json --start
hermes gateway attach --json --recover
```

`ensure` はプロファイルのセッションランタイムを検出し、無ければ起動する（既存サービスがあればそれを優先し、無ければ detached プロセスを要求する）。既存または起動中のオーナーは待つだけで置換せず、サービスの導入もしない（終了コード `0` が ready、それ以外は拒否またはタイムアウト）。`attach` は `ensure` の JSON に加え、attach 可能になると `url`（`ws://127.0.0.1:<port>/api/ws`）・`protocol`（`hermes-gateway-v1`）・`protocols`・単回使用の `ticket`（30 秒で失効）を出力する。`--start` は gateway が無ければ起動、`--recover` は ready でない場合のみ起動または旧版の gateway を置換する。

## 全プロファイルの gateway を対象にした操作

```bash
hermes gateway list
hermes gateway start --all
hermes gateway restart --all
hermes gateway stop --all
```

multiplexing 時は `--all` が「ホストの gateway 1 つ」を指す。

## 既存の per-profile gateway の multiplexing への統合

```bash
hermes gateway migrate --dry-run
hermes gateway migrate --yes
```

preflight（bot token の重複等）でブロックされた場合は何も変更しない。

## サービスの削除

```bash
hermes gateway uninstall
```

## ログの確認（Linux: systemd）

```bash
journalctl --user -u hermes-gateway -f
```

## ログの確認（macOS: launchd）

```bash
tail -f ~/.hermes/logs/gateway.log
```

## ログアウト後もサービスを継続（Linux）

```bash
sudo loginctl enable-linger $USER
```

## Termux でのバックグラウンド実行

```bash
mkdir -p "${HERMES_HOME:-$HOME/.hermes}/logs"
nohup hermes gateway run >> "${HERMES_HOME:-$HOME/.hermes}/logs/gateway.log" 2>&1 &
```

Termux の APT インストールは systemd / launchd / Windows Scheduled Tasks を使わない。Android にバックグラウンドプロセスを止められる場合がある。

## WhatsApp 設定

```bash
hermes whatsapp
```

## ペアリングコードの管理

```bash
hermes pairing list
hermes pairing approve <platform> <code>
hermes pairing revoke <platform> <user-id>
hermes pairing clear-pending
```

## Webhook サブスクリプションの作成

```bash
hermes webhook subscribe <name> [options]
hermes webhook list
hermes webhook remove <name>
hermes webhook test <name>
```

## 注記

v0.23 で追加・変更されたコマンド: `hermes gateway ensure` / `attach`、`stop` / `restart` の `-y` / `--yes` と `restart --detach`（いずれも `reference/cli-commands` の `hermes gateway` 節）。TUI と古典 CLI は同じ attach 経路でプロファイルの共有 gateway に接続する。

- Source: https://hermes-agent.nousresearch.com/docs/reference/cli-commands (pinned to v0.23.1)
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/tui (pinned to v0.23.1)

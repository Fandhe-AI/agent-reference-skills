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

Windows では `start` が非表示で起動し、`stop` がドレインして停止し、`status` が登録内容のずれ（テンプレートとの差）も表示する。Task Scheduler の RestartOnFailure は launcher の失敗のみを対象とし、外部から kill された gateway は自動復旧しない。

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

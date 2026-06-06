# Gateway

メッセージングゲートウェイサービスの起動・管理・サービス登録。

## フォアグラウンドで実行

```bash
hermes gateway run
```

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

> **警告**: `--system` を指定するとシステムサービスとして登録される。root 権限が必要。

## サービスとして登録（macOS: launchd）

```bash
hermes gateway install
```

plist は `~/Library/LaunchAgents/ai.hermes.gateway.plist` に書き込まれる。

## サービスの起動・停止・再起動

```bash
hermes gateway start
hermes gateway stop
hermes gateway restart
hermes gateway status
```

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

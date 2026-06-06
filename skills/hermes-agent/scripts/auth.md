# Auth

プロバイダー認証・クレデンシャルプール・ログイン管理。

## OAuth ログイン（Nous Portal）

```bash
hermes login --provider nous
```

## OAuth ログイン（OpenAI Codex）

```bash
hermes login --provider openai-codex
```

## ログイン（ブラウザを開かない）

```bash
hermes login --provider nous --no-browser
```

## ログアウト

```bash
hermes logout --provider nous
hermes logout --provider openai-codex
```

## クレデンシャルプールの対話式ウィザード

```bash
hermes auth
```

## クレデンシャルプールの一覧

```bash
hermes auth list
hermes auth list <provider>
```

## API キーの追加

```bash
hermes auth add <provider> --api-key <key>
```

## OAuth クレデンシャルの追加

```bash
hermes auth add <provider> --type oauth
```

## クレデンシャルの削除

```bash
hermes auth remove <provider> <index>
```

> **警告**: 削除したクレデンシャルは復元できない。

## クールダウンタイマーのリセット

```bash
hermes auth reset <provider>
```

## OpenClaw からの移行（ドライラン）

```bash
hermes claw migrate --dry-run
```

## OpenClaw からの移行（全データ）

```bash
hermes claw migrate --preset full
```

> **警告**: `hermes claw migrate` は `~/.openclaw` から `~/.hermes` へ設定を書き込む。`--overwrite` を指定すると既存ファイルを上書きする。実行前に `--dry-run` で確認することを推奨する。

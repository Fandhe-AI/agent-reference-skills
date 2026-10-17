# Auth

プロバイダー認証・クレデンシャルプール・OpenClaw 移行。

> **注**: `hermes login` / `hermes logout` は v0.22.2 で削除済み（cli-commands: Deprecated）。OAuth ログインは `hermes auth add <provider> --type oauth`、ログアウトは `hermes auth logout <provider>` を使う。

## クレデンシャルプールの対話式ウィザード

```bash
hermes auth
```

## OAuth ログイン（Anthropic）

```bash
hermes auth add anthropic --type oauth
```

## OAuth ログイン（OpenAI Codex）

```bash
hermes auth add openai-codex --type oauth
hermes auth add openai-codex --type oauth --priority 0   # 追加アカウントを最優先にする
```

## OAuth ログイン（Codex: ブラウザ認可コード + PKCE）

```bash
hermes auth add openai-codex --browser
```

device code の代わりに localhost:1455 でブラウザ認可コード + PKCE を使う。

## OAuth ログイン（OpenRouter）

```bash
hermes auth add openrouter --type oauth
```

ブラウザログイン（PKCE）で API キーが発行される。

## クレデンシャルプールの一覧

```bash
hermes auth list
hermes auth list <provider>
```

## API キーの追加

```bash
hermes auth add <provider> --api-key <key>
```

## クレデンシャルの優先順位変更

```bash
hermes auth priority <provider> <credential> <index>
```

指定したクレデンシャルを `fill_first` 順の先頭へ移す例: `hermes auth priority openrouter backup-key 0`。

## クレデンシャルの削除

```bash
hermes auth remove <provider> <index>
```

> **警告**: 削除したクレデンシャルは復元できない。

## クールダウンタイマーのリセット

```bash
hermes auth reset <provider>
hermes auth reset <provider> <index>
```

## OAuth クレデンシャルの更新

```bash
hermes auth refresh <provider> <label>
```

指定した OAuth クレデンシャルを更新し、クールダウンも解除する（例: `hermes auth refresh openai-codex work`）。

## 認証状態の確認

```bash
hermes auth status <provider>
```

## ログアウト

```bash
hermes auth logout <provider>
```

保存済みの認証状態を消去する。

> **警告**: 保存済みの認証状態が消去される。再度利用するには再ログインが必要。

## アカウントのレート制限ウィンドウの確認

```bash
hermes usage
hermes usage --provider openai-codex
hermes usage --json
```

対応プロバイダーは `openai-codex` / `anthropic` / `openrouter`。

## OpenClaw からの移行（ドライラン）

```bash
hermes claw migrate --dry-run
```

## OpenClaw からの移行（全データ）

```bash
hermes claw migrate --preset full
```

> **警告**: `hermes claw migrate` は `~/.openclaw` から `~/.hermes` へ設定を書き込む。`--overwrite` を指定すると既存ファイルを上書きする。実行前に `--dry-run` で確認することを推奨する。

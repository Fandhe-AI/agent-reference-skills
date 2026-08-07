# AI Gateway

AI Gateway の API キー・ルーティングルール・モデル管理・コーディングエージェント連携

## API キーの作成

対話形式でデフォルト設定のまま作成。

```sh
vercel ai-gateway api-keys create
```

名前・月次予算を指定して作成。

```sh
vercel ai-gateway api-keys create --name my-key --budget 500 --refresh-period monthly
```

## ルーティングルールの管理（beta）

モデルを別モデルへリライト。

```sh
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-4.7 --destination anthropic/claude-haiku-4.5
```

特定モデルへのリクエストを拒否。

```sh
vercel ai-gateway rules add --type deny --source openai/gpt-5.5
```

ルール一覧を表示。

```sh
vercel ai-gateway rules list
```

ルールを無効化。

```sh
vercel ai-gateway rules edit rule_123 --disable
```

ルールを削除。

```sh
vercel ai-gateway rules remove rule_123 --yes
```

## モデルの参照

利用可能なモデル一覧を表示。

```sh
vercel ai-gateway models ls
```

モデルを提供するプロバイダーのエンドポイント（価格・レイテンシ・稼働率）を比較。

```sh
vercel ai-gateway models endpoints anthropic/claude-opus-5
```

## コーディングエージェントの AI Gateway 接続

検出されたエージェント（Claude Code / Codex / OpenCode / Pi）をプロンプトなしで一括接続。

```sh
vercel ai-gateway coding-agents setup --yes
```

エージェント・予算・有効期限を指定して接続。

```sh
vercel ai-gateway coding-agents setup --agent claude-code --agent codex --budget 500 --refresh-period monthly --expiration 30d --yes
```

変更内容だけを確認（ファイル書き込み・キー作成なし）。

```sh
vercel ai-gateway coding-agents setup --key vck_... --dry-run
```

既に設定済みの環境でキーローテーション・チーム切り替えのため再設定。

> **警告**: 出力（非 `--dry-run` 実行時）には API キーの平文が含まれる場合がある。ログや CI 出力に残さないよう扱う。

```sh
vercel ai-gateway coding-agents setup --reconfigure --yes
```

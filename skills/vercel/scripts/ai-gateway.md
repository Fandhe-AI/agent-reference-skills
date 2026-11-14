# AI Gateway

AI Gateway の API キー・予算・ルーティングルール・モデル管理・コーディングエージェント連携

## API キーの作成

対話形式でデフォルト設定のまま作成。

```sh
vercel ai-gateway api-keys create
```

名前・月次予算（ドル）を指定して作成。平文のキーは作成時に一度だけ返される。

```sh
vercel ai-gateway api-keys create --name my-key --amount 500 --refresh-period monthly
```

アラートのしきい値（`50` / `75` / `100` のサブセット）を指定。

```sh
vercel ai-gateway api-keys create --name my-key --amount 500 --refresh-period monthly --alert-thresholds 75,100
```

## API キーの一覧・詳細・失効

```sh
vercel ai-gateway api-keys list
```

```sh
vercel ai-gateway api-keys list --limit 50 --json
```

```sh
vercel ai-gateway api-keys inspect key_123
```

> **警告**: 失効したキーは使用できなくなる。

```sh
vercel ai-gateway api-keys revoke key_123 --yes
```

## 予算の管理

チーム予算を設定。

```sh
vercel ai-gateway budgets set team --amount 500 --refresh-period monthly
```

プロジェクトの予算を設定。

```sh
vercel ai-gateway budgets set project my-project --amount 200
```

予算を持たないプロジェクトに適用するデフォルト予算。

```sh
vercel ai-gateway budgets set project --default --amount 200 --refresh-period monthly
```

```sh
vercel ai-gateway budgets list
```

```sh
vercel ai-gateway budgets inspect project my-project --json
```

```sh
vercel ai-gateway budgets remove project my-project --yes
```

## ルーティングルールの管理（beta）

モデルを別モデルへリライト。

```sh
vercel ai-gateway rules add --type rewrite --source anthropic/claude-opus-5 --destination anthropic/claude-haiku-4.5
```

特定モデルへのリクエストを拒否。

```sh
vercel ai-gateway rules add --type deny --source openai/gpt-5.6-sol
```

ルール一覧を表示（`--include-disabled` で無効なルールも表示）。

```sh
vercel ai-gateway rules list
```

ルールを無効化（`--enable` で再有効化）。

```sh
vercel ai-gateway rules update rule_123 --no-enable
```

ルールを削除。

```sh
vercel ai-gateway rules remove rule_123 --yes
```

## モデルの参照

利用可能なモデル一覧を表示。

```sh
vercel ai-gateway models list
```

チームの仮想モデルのみ表示。

```sh
vercel ai-gateway models list --virtual
```

モデルを提供するプロバイダーのエンドポイント（価格・レイテンシ・稼働率）を比較。

```sh
vercel ai-gateway models endpoints anthropic/claude-opus-5
```

## コーディングエージェントの AI Gateway 接続

`vercel ai-gateway setup`。ローカルのコーディングエージェントを AI Gateway へ接続し、API キーの作成または再利用とエージェントごとの設定ファイル書き込みを行う。`--yes` なしでは対話形式で各プロンプトを進む。

検出されたエージェントをプロンプトなしで一括接続。

```sh
vercel ai-gateway setup --yes
```

エージェント・予算・有効期限を指定して接続。

```sh
vercel ai-gateway setup --agent claude-code --agent codex --name "My Coding Key" --scope my-team --amount 500 --refresh-period monthly --expiration 30d --yes
```

対応する全エージェントを接続（未インストールのものも含む）。

```sh
vercel ai-gateway setup --all --yes
```

既存キーを再利用し、変更内容だけを確認（ファイル書き込み・キー作成なし）。`vck_...` は実際のキーに置き換える。

```sh
vercel ai-gateway setup --key vck_... --dry-run
```

> **警告**: 出力（非 `--dry-run` 実行時）には API キーの平文が含まれる場合がある（`--non-interactive` の JSON は全文を含む）。ログや CI 出力に残さないよう扱う。

既に設定済みの環境でキーローテーション・チーム切り替えのため再設定。

```sh
vercel ai-gateway setup --reconfigure --yes
```

`vercel setup gateway` は同じ AI Gateway ステップのみを実行する（[setup.md](./setup.md) 参照）。

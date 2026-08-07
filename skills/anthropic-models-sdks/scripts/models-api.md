<!-- source: https://platform.claude.com/docs/en/api/models / last verified: 2026-08-07 -->

# Models API

Claude API の `/v1/models` エンドポイントをモデル一覧・詳細取得するための curl コマンド集。

## モデル一覧の取得

```bash
curl https://api.anthropic.com/v1/models \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## モデル一覧のページング

`limit` はデフォルト 20、1〜1000 の範囲。`first_id` / `last_id` を次ページの `before_id` / `after_id` に使う。

```bash
curl "https://api.anthropic.com/v1/models?limit=5" \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"

# after_id / before_id はそれぞれ一覧レスポンスの last_id / first_id を渡す
curl "https://api.anthropic.com/v1/models?after_id=$AFTER_ID&limit=5" \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"

curl "https://api.anthropic.com/v1/models?before_id=$BEFORE_ID&limit=5" \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## 特定モデルの詳細取得

```bash
MODEL_ID=claude-opus-5

curl https://api.anthropic.com/v1/models/$MODEL_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

`model_id` にはモデル ID だけでなくエイリアス（例: `claude-sonnet-4-5`）も指定できる。

## Notes

- レスポンスの `capabilities` オブジェクトで `batch` / `citations` / `code_execution` / `context_management` / `effort` / `image_input` / `pdf_input` / `structured_outputs` / `thinking` の各サポート有無を確認できる。
- 両エンドポイントとも任意で `anthropic-beta` ヘッダーを受け付ける（有効なベータ値はリファレンスの enum を参照）。

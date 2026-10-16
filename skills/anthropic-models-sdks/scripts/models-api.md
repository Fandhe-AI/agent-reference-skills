<!-- source: https://platform.claude.com/docs/en/api/models / last verified: 2026-10-17 -->

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
MODEL_ID=claude-opus-5-5

curl https://api.anthropic.com/v1/models/$MODEL_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

`model_id` にはモデル ID だけでなくエイリアス（例: `claude-haiku-4-5`）も指定できる。`claude-sonnet-4-5` は deprecated（2026-11-30 retire）のため例に使わない。

## Notes

- レスポンスの `capabilities` オブジェクトで `batch` / `citations` / `code_execution` / `context_management` / `effort` / `image_input` / `pdf_input` / `structured_outputs` / `thinking` の各サポート有無を確認できる。
- `capabilities.thinking.types.disabled.supported` は `thinking: {type: "disabled"}` を受け付けるかを示す。`false` は 400 で拒否、thinking 非対応モデルでは `true`。`true` でも effort レベル等の別理由で拒否され得る。
- `capabilities.server_tools` は web search / code execution ツールの受け付けを示す（`server_tools.web_search.supported` / `server_tools.code_execution.supported` / `server_tools.supported`）。いずれも少なくとも 1 バージョン受け付ければ `true`。web fetch 等の他のサーバーツールは対象外。組織設定により `true` でもリクエストが失敗する場合がある。
- トップレベルの `code_execution` capability は別の判定で、code execution ツール内で Claude が実行するコードがリクエストの他のツールを呼べるか（programmatic tool calling 可否）を示す。例: Claude Haiku 4.5 は `server_tools.code_execution.supported` が `true`、`code_execution.supported` が `false`。
- 各モデルの `line` フィールドはモデルライン名（例: `opus`）で、ライン無しは `null`。グルーピングにはモデル ID から推測せず `line` を読む。値の集合は固定ではない。
- 両エンドポイントとも任意で `anthropic-beta` ヘッダーを受け付ける（有効なベータ値はリファレンスの enum を参照）。

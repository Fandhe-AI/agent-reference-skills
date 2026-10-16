<!-- source: https://platform.claude.com/docs/en/api/versioning / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta-headers / last verified: 2026-10-17 -->
<!-- source: https://platform.claude.com/docs/en/build-with-claude/compaction-on-demand / last verified: 2026-10-17 -->

# headers

`anthropic-version` and `anthropic-beta` header usage. Every API request must send `anthropic-version`; SDKs set it automatically.

## anthropic-version の指定（必須ヘッダー）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

最新版 `2023-06-01` を使う。過去バージョン（`2023-01-01`）は非推奨で新規ユーザーには提供されない場合がある。

## anthropic-beta の指定（curl / 単一 beta 機能）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: context-management-2025-06-27" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Claude"}
    ]
  }'
```

## anthropic-beta の指定（複数 beta 機能をカンマ区切り）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: feature1,feature2,feature3" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

## anthropic-beta の指定（ヘッダーを繰り返す形式）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: feature1" \
  -H "anthropic-beta: feature2" \
  -H "anthropic-beta: feature3" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

Claude API は `anthropic-beta` ヘッダーをすべて読むため、カンマ区切りと同等。

## anthropic-beta の指定（ant CLI の --beta）

```bash
ant beta:messages create \
  --beta context-management-2025-06-27 \
  --model claude-opus-5-5 \
  --max-tokens 1024 \
  --message '{role: user, content: "Hello, Claude"}'
```

複数指定はカンマ区切り（`--beta feature1,feature2`）またはフラグの繰り返し（`--beta feature1 --beta feature2`）。

## anthropic-beta の指定（Python SDK の betas パラメータ）

```python
client = Anthropic()

response = client.beta.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
    betas=["context-management-2025-06-27"],
)
```

## オンデマンド compaction の beta ヘッダー（compact-2026-09-04）

```bash
# max_tokens caps the whole call, including any thinking, so allow several thousand tokens.
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: compact-2026-09-04" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5-5",
    "max_tokens": 4096,
    "messages": [
      {"role": "user", "content": "I am building a recipe app. Help me name the main entities in the data model."},
      {"role": "assistant", "content": "Start with Recipe, Ingredient, and Step. Add a RecipeIngredient entry that holds the quantity and unit for each ingredient in a recipe."},
      {"role": "user", "content": "Good. Now suggest field names for Recipe."}
    ],
    "compaction": {"type": "summarize"}
  }'
```

要約を要求するリクエストと、署名付き `compaction` ブロックを含む以降のすべてのリクエストに `compact-2026-09-04` を送る。`compaction` と `context_management` は同一リクエストで併用できない。

## Notes

- 閾値ベースの compaction（`compact_20260112`）は別の beta 名 `compact-2026-01-12` を使う。このファイルの `compact-2026-09-04` はオンデマンド compaction 用。
- エンドポイント固有の必須 beta ヘッダー: `/v1/agents` `/v1/sessions` `/v1/environments` は `managed-agents-2026-04-01`、`/v1/tunnels` は `mcp-tunnels-2026-06-22`、`/v1/memory_stores` 系は `agent-memory-2026-07-22`。
- `agent-memory-2026-07-22` と `managed-agents-2026-04-01` は memory-store 系エンドポイントに同時送信不可（400 エラー）。SDK の `client.beta` 名前空間はこれらのヘッダーを自動付与する。
- 無効・利用不可な beta 名を送ると 400 `invalid_request_error` になる。
- Beta features on other platforms: beta 名は全プラットフォームで共通だが、すべてを受け付けるわけではない。Claude Platform on AWS・Microsoft Foundry・Google Cloud は `anthropic-beta` ヘッダーで受け取る。複数指定は 1 つのヘッダーにカンマ区切りで書く（Google Cloud は `anthropic-beta` ヘッダーを 1 つしか読まず、残りは無視される）。
- Amazon Bedrock: `bedrock-mantle` エンドポイント（Claude in Amazon Bedrock）は `anthropic-beta` ヘッダー。InvokeModel API はヘッダーではなくリクエストボディの `anthropic_beta` 配列（例: `"anthropic_beta": ["feature1", "feature2"]`）で指定する。

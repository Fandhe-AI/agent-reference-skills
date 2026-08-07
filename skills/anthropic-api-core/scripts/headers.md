<!-- source: https://platform.claude.com/docs/en/api/versioning / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta-headers / last verified: 2026-08-07 -->

# headers

`anthropic-version` and `anthropic-beta` header usage. Every API request must send `anthropic-version`; SDKs set it automatically.

## anthropic-version の指定（必須ヘッダー）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

最新版 `2023-06-01` を使う。過去バージョン（`2023-01-01`）は非推奨で新規ユーザーには提供されない場合がある。

## anthropic-beta の指定（curl / 単一 beta 機能）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: files-api-2025-04-14" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

## anthropic-beta の指定（複数 beta 機能をカンマ区切り）

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: feature1,feature2,feature3" \
  -H "content-type: application/json" \
  -d '{"model": "claude-opus-5", "max_tokens": 1024, "messages": [{"role":"user","content":"Hello, Claude"}]}'
```

## anthropic-beta の指定（Python SDK の betas パラメータ）

```python
client = Anthropic()
response = client.beta.messages.create(
    model="claude-opus-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
    betas=["files-api-2025-04-14"],
)
```

## Notes

- エンドポイント固有の必須 beta ヘッダー: `/v1/agents` `/v1/sessions` `/v1/environments` は `managed-agents-2026-04-01`、`/v1/tunnels` は `mcp-tunnels-2026-06-22`、`/v1/memory_stores` 系は `agent-memory-2026-07-22`。
- `agent-memory-2026-07-22` と `managed-agents-2026-04-01` は memory-store 系エンドポイントに同時送信不可（400 エラー）。
- 無効・利用不可な beta 名を送ると 400 `invalid_request_error` になる。

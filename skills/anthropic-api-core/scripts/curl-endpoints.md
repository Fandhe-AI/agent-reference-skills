<!-- source: https://platform.claude.com/docs/en/api/messages/create.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/messages/count_tokens.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/messages/batches/create.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/messages/batches/list.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/messages/batches/retrieve.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/messages/batches/results.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/messages/batches/cancel.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/messages/batches/delete.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/models/list.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/models/retrieve.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta/files/upload.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta/files/list.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta/files/retrieve_metadata.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta/files/download.md / last verified: 2026-08-07 -->
<!-- source: https://platform.claude.com/docs/en/api/beta/files/delete.md / last verified: 2026-08-07 -->

# curl-endpoints

Copy-pasteable `curl` calls for the main Claude API endpoints. All examples assume `ANTHROPIC_API_KEY` is exported (see `setup.md`). All requests require the `anthropic-version` header.

## Message の作成

```bash
curl https://api.anthropic.com/v1/messages \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    --max-time 600 \
    -d '{
          "max_tokens": 1024,
          "messages": [
            {"content": "Hello, world", "role": "user"}
          ],
          "model": "claude-opus-4-6",
          "stream": false
        }'
```

## Message のトークン数カウント（生成しない）

```bash
curl https://api.anthropic.com/v1/messages/count_tokens \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "model": "claude-opus-4-6",
          "messages": [{"role": "user", "content": "Hello, world"}]
        }'
```

## Message Batch の作成

```bash
curl https://api.anthropic.com/v1/messages/batches \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "requests": [
            {
              "custom_id": "my-custom-id-1",
              "params": {
                "max_tokens": 1024,
                "messages": [{"content": "Hello, world", "role": "user"}],
                "model": "claude-opus-4-6"
              }
            }
          ]
        }'
```

## Message Batch 一覧の取得

```bash
curl https://api.anthropic.com/v1/messages/batches \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Message Batch の取得（ポーリング）

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Message Batch 結果の取得（.jsonl ストリーム）

`processing_status` が `"ended"` になってから呼び出す。

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID/results \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Message Batch のキャンセル

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID/cancel \
    -X POST \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## Message Batch の削除

> **警告**: 処理が終了した（`processing_status: "ended"`）バッチのみ削除できる。処理中のバッチは先にキャンセルすること。削除は不可逆。

```bash
curl https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## モデル一覧の取得

```bash
curl https://api.anthropic.com/v1/models \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## モデル詳細の取得（エイリアス解決も可）

```bash
curl https://api.anthropic.com/v1/models/$MODEL_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## ファイルのアップロード（Files API, beta）

```bash
curl https://api.anthropic.com/v1/files \
    -H 'Content-Type: multipart/form-data' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: files-api-2025-04-14' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -F 'file=@/path/to/file'
```

## ファイル一覧の取得（Files API, beta）

```bash
curl https://api.anthropic.com/v1/files \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: files-api-2025-04-14' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## ファイルメタデータの取得（Files API, beta）

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: files-api-2025-04-14' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## ファイルのダウンロード（Files API, beta）

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID/content \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: files-api-2025-04-14' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

## ファイルの削除（Files API, beta）

> **警告**: 削除は不可逆。以降そのファイルを Messages API のドキュメント/画像/コード実行入力として参照できなくなる。

```bash
curl https://api.anthropic.com/v1/files/$FILE_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: files-api-2025-04-14' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

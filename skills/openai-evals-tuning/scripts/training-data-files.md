# training-data-files

Copy-pasteable `curl` calls for uploading and managing training-data files via the `/v1/files` endpoint, for use with fine-tuning jobs and evals. All examples assume `OPENAI_API_KEY` is exported (SDK install and auth setup are covered by the `openai-api-core` skill).

## Upload a fine-tuning training file

```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@mydata.jsonl"
```

The response `id` (e.g. `file-RCnFCYRhFDcq1aHxiYkBHw`) is used as `training_file` when creating a fine-tuning job.

## Upload an evals data file

```bash
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="evals" \
  -F file="@tickets.jsonl"
```

The response `id` is used as the `source.id` of `file_id` type data sources when creating an eval run.

## List files

```bash
curl https://api.openai.com/v1/files \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve a file

```bash
curl https://api.openai.com/v1/files/file-abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

Returns file metadata (size, creation timestamp, filename, `purpose`) — not the file content itself.

## Delete a file

> **警告**: ファイルを不可逆に削除する。関連する fine-tuning ジョブ・eval run から再参照できなくなる。

```bash
curl https://api.openai.com/v1/files/$FILE_ID \
    -X DELETE \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

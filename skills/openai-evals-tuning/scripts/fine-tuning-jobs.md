# fine-tuning-jobs

Copy-pasteable `curl` calls for managing fine-tuning jobs via the `/v1/fine_tuning/jobs` endpoint. All examples assume `OPENAI_API_KEY` is exported (SDK install and auth setup are covered by the `openai-api-core` skill).

## Create a fine-tuning job

```bash
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-RCnFCYRhFDcq1aHxiYkBHw",
    "model": "gpt-4.1-nano-2025-04-14"
  }'
```

`training_file` must be the `id` of a file previously uploaded with `purpose=fine-tune` (see `training-data-files.md`).

## List fine-tuning jobs

```bash
curl https://api.openai.com/v1/fine_tuning/jobs \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

Supports pagination and metadata filtering:

```bash
curl -g "https://api.openai.com/v1/fine_tuning/jobs?limit=2&metadata[key]=value" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Retrieve job status

```bash
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-uL1VKpwx7maorHNbOiDwFIn6 \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

Replace the job id with the value returned from the create/list calls above. Check `status` in the response (`validating_files`, `queued`, `running`, `succeeded`, `failed`, `cancelled`).

## Cancel a fine-tuning job

> **警告**: 実行中のジョブを不可逆に終了させる。課金済みトークンは戻らない。

```bash
curl -X POST https://api.openai.com/v1/fine_tuning/jobs/ftjob-abc123/cancel \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## List checkpoints for a job

```bash
curl https://api.openai.com/v1/fine_tuning/jobs/ftjob-abc123/checkpoints \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

Returns intermediate checkpoints saved during training (one per completed epoch, most recent first).

## Use the fine-tuned model

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "ft:gpt-4.1-nano-2025-04-14:openai::BTz2REMH",
    "input": "What is 4+4?"
  }'
```

The `model` value is the `fine_tuned_model` id returned once the job status is `succeeded`.

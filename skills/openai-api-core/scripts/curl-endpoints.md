# curl-endpoints

Copy-pasteable `curl` calls for the main OpenAI API endpoints. All examples assume `OPENAI_API_KEY` is exported (see `auth.md`).

## Responses の作成（テキスト生成）

```bash
curl "https://api.openai.com/v1/responses" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{"model": "gpt-5.6","input": "Write a one-sentence bedtime story about a unicorn."}'
```

## Chat Completions の作成（レガシー互換 API）

```bash
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5.6",
    "messages": [
      {
        "role": "developer",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ],
    "store": true
  }'
```

`store: true` を指定すると completion が保存され、以降の「Chat Completions の取得」で参照できる。

## Chat Completions の取得

```bash
curl https://api.openai.com/v1/chat/completions/$COMPLETION_ID \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## モデル一覧の取得

```bash
curl https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## モデル詳細の取得

```bash
curl https://api.openai.com/v1/models/$MODEL \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Embeddings の作成

```bash
curl https://api.openai.com/v1/embeddings \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "input": "The quick brown fox jumped over the lazy dog",
          "model": "text-embedding-3-small",
          "encoding_format": "float",
          "user": "user-1234"
        }'
```

## ファイルのアップロード

```bash
curl https://api.openai.com/v1/files \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -F 'file=@/path/to/file' \
    -F purpose=assistants
```

`purpose` は用途に応じて `assistants` / `user_data` 等を指定する。

## ファイル一覧の取得

```bash
curl https://api.openai.com/v1/files \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

## 画像生成

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-image-1.5",
    "prompt": "A cute baby sea otter",
    "n": 1,
    "size": "1024x1024"
  }'
```

## 画像生成（ストリーミング）

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-image-1.5",
    "prompt": "A cute baby sea otter",
    "n": 1,
    "size": "1024x1024",
    "stream": true
  }' \
  --no-buffer
```

# auth

Setting the OpenAI API key (and related credentials) as environment variables.

## API key の設定（macOS / Linux）

```bash
export OPENAI_API_KEY="your_api_key_here"
```

## API key の設定（Windows PowerShell）

```bash
setx OPENAI_API_KEY "your_api_key_here"
```

## Admin API 用キーの設定

プロジェクト管理・組織管理系の Admin API を叩く場合は `OPENAI_ADMIN_KEY` を使う（`OPENAI_API_KEY` とは別物）。

```bash
export OPENAI_ADMIN_KEY="sk-admin-..."
```

## API のベース URL を変更する

プロキシ経由や互換エンドポイントへリダイレクトする場合に設定する。

```bash
export OPENAI_BASE_URL="https://api.openai.com/v1"
```

## 動作確認（key が有効かを models 一覧で確認）

```bash
curl https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

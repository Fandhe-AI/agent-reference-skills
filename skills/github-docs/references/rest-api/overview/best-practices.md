# ベストプラクティス

GitHub REST API を効率的・安全に利用するためのベストプラクティスとアンチパターン。

## 推奨事項

### 1. Webhook を使用し、ポーリングを避ける

変更の検知にはポーリングではなく Webhook を使用する。

```
# 悪い例: 定期的にポーリング
while true; do
  curl https://api.github.com/repos/OWNER/REPO/events
  sleep 60
done

# 良い例: Webhook を設定してイベントを受信
POST /repos/{owner}/{repo}/hooks
{
  "config": {
    "url": "https://example.com/webhook",
    "content_type": "json"
  },
  "events": ["push", "pull_request"]
}
```

### 2. 常に認証する

未認証リクエストはレート制限が 60リクエスト/時間 に制限される。認証することで 5,000リクエスト/時間 に拡大される。

### 3. リクエストは逐次的に送信する

同一リソースへの並列ミューテーション（POST/PATCH/PUT/DELETE）は避ける。競合状態やデータの不整合を引き起こす可能性がある。

```
# 悪い例: 並列で複数のIssueを作成
Promise.all([
  createIssue("Issue 1"),
  createIssue("Issue 2"),
  createIssue("Issue 3"),
]);

# 良い例: 逐次的に作成
for (const title of ["Issue 1", "Issue 2", "Issue 3"]) {
  await createIssue(title);
}
```

### 4. 条件付きリクエストを使用する（ETag / If-None-Match）

`ETag` ヘッダーを活用して、データが変更されていない場合のリクエストを節約する。`304 Not Modified` が返された場合、レート制限にカウントされない。

```bash
# 初回リクエスト: ETagをレスポンスヘッダーから取得
curl -I -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO

# レスポンスヘッダー:
# etag: "abc123"

# 2回目以降: If-None-Match ヘッダーで ETag を送信
curl -H "Authorization: Bearer TOKEN" \
  -H "If-None-Match: \"abc123\"" \
  https://api.github.com/repos/OWNER/REPO

# データ未変更の場合: 304 Not Modified（レート制限にカウントされない）
# データ変更済みの場合: 200 OK + 新しいデータ
```

### 5. `If-Modified-Since` ヘッダーの利用

`Last-Modified` ヘッダーの値を次のリクエストの `If-Modified-Since` に設定することでも条件付きリクエストが可能。

```bash
curl -H "Authorization: Bearer TOKEN" \
  -H "If-Modified-Since: Thu, 05 Jul 2024 15:30:00 GMT" \
  https://api.github.com/repos/OWNER/REPO
```

### 6. レート制限ヘッダーを確認する

すべてのレスポンスのレート制限ヘッダーを確認し、制限に近づいた場合はリクエスト頻度を下げる。

```javascript
const response = await fetch("https://api.github.com/repos/OWNER/REPO", {
  headers: { Authorization: "Bearer TOKEN" },
});

const remaining = parseInt(response.headers.get("x-ratelimit-remaining"));
const resetTime = parseInt(response.headers.get("x-ratelimit-reset"));

if (remaining < 100) {
  const waitMs = (resetTime * 1000) - Date.now();
  console.log(`Rate limit low. Waiting ${waitMs}ms`);
  await new Promise(resolve => setTimeout(resolve, waitMs));
}
```

### 7. 適切なエラーハンドリング

```javascript
async function apiRequest(url, options = {}) {
  const response = await fetch(url, options);

  switch (response.status) {
    case 200:
    case 201:
      return response.json();
    case 304:
      return null; // Not Modified — キャッシュを使用
    case 403:
      if (response.headers.get("x-ratelimit-remaining") === "0") {
        // レート制限超過 — リセットまで待機
        const resetTime = parseInt(response.headers.get("x-ratelimit-reset"));
        throw new Error(`Rate limit exceeded. Reset at ${new Date(resetTime * 1000)}`);
      }
      throw new Error("Forbidden");
    case 404:
      throw new Error("Not found or no access");
    case 429:
      // セカンダリレート制限 — retry-after に従う
      const retryAfter = parseInt(response.headers.get("retry-after"));
      throw new Error(`Secondary rate limit. Retry after ${retryAfter}s`);
    default:
      throw new Error(`API error: ${response.status}`);
  }
}
```

### 8. `per_page=100` でリクエスト数を削減

一覧取得時は `per_page=100` を指定してページ数を削減する。

## アンチパターン（避けるべき行為）

### ポーリングを継続的に行わない

- Webhook を使って変更を検知する
- やむを得ずポーリングする場合は条件付きリクエストを使用し、適切な間隔を空ける

### 並列ミューテーションを行わない

- 書き込み操作は逐次実行する
- 同一リソースへの同時書き込みは競合状態を引き起こす

### レート制限ヘッダーを無視しない

- `x-ratelimit-remaining` を監視する
- 制限超過前にリクエスト頻度を自動調整する
- 制限超過後のリトライには指数バックオフを使用する

### 不要なデータを取得しない

- 必要なフィールドだけが必要な場合は GraphQL API の使用を検討
- 一覧取得後に大半を捨てるような使い方は避ける
- `since` パラメータで差分のみ取得する

### ハードコードされたURLを使わない

- ページネーションでは `link` ヘッダーのURLを使用する
- APIレスポンス内のURLをそのまま使用する

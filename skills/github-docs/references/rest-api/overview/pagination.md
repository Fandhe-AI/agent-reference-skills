# ページネーション

GitHub REST API の一覧取得エンドポイントにおけるページネーションの仕組み。

## 基本パラメータ

| パラメータ | デフォルト | 最大値 | 説明 |
|-----------|-----------|--------|------|
| `per_page` | 30 | 100（通常） | 1ページあたりの取得件数 |
| `page` | 1 | - | 取得するページ番号（1始まり） |
| `before` | - | - | カーソルベースのページネーション（前方向） |
| `after` | - | - | カーソルベースのページネーション（後方向） |
| `since` | - | - | 指定した日時以降のリソースを取得（ISO 8601形式） |

> **注意**: 一部のエンドポイントでは `per_page` の最大値が100未満の場合がある（例: コミット一覧は100、コード検索結果は100）。

### リクエスト例

```bash
# 1ページ目、50件ずつ取得
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/issues?per_page=50&page=1"

# 2ページ目
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/issues?per_page=50&page=2"

# 特定日時以降のリソースを取得
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/issues?since=2024-01-01T00:00:00Z"
```

## Link ヘッダー

ページネーション可能なレスポンスには `link` ヘッダーが含まれる。次のページや前のページのURLが提供される。

### Link ヘッダーの種類

| rel | 説明 |
|-----|------|
| `next` | 次のページのURL |
| `prev` | 前のページのURL |
| `first` | 最初のページのURL |
| `last` | 最後のページのURL |

### Link ヘッダーの例

```
link: <https://api.github.com/repos/OWNER/REPO/issues?page=2>; rel="next",
      <https://api.github.com/repos/OWNER/REPO/issues?page=5>; rel="last"
```

### 重要なポイント

- **`link` ヘッダーのURLを直接使用すること** — URLを自分で組み立てない
- `rel="next"` が存在しない場合、現在のページが最後のページ
- `rel="last"` のページ番号から総ページ数がわかる
- ページ番号を直接指定してジャンプすることも可能だが、`link` ヘッダーのURLを辿る方が安全

## Octokit でのページネーション

### すべてのページを一括取得（paginate）

```javascript
const octokit = new Octokit({ auth: "TOKEN" });

// すべてのIssueを取得
const issues = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
  owner: "OWNER",
  repo: "REPO",
  per_page: 100,
  state: "open",
});

console.log(`Total issues: ${issues.length}`);
```

### マッピング関数で特定フィールドのみ取得

```javascript
const issueTitles = await octokit.paginate(
  "GET /repos/{owner}/{repo}/issues",
  {
    owner: "OWNER",
    repo: "REPO",
    per_page: 100,
  },
  (response) => response.data.map((issue) => issue.title)
);
```

### イテレーターで逐次処理（paginate.iterator）

大量のデータを処理する場合にメモリ効率が良い。

```javascript
const iterator = octokit.paginate.iterator("GET /repos/{owner}/{repo}/issues", {
  owner: "OWNER",
  repo: "REPO",
  per_page: 100,
});

for await (const { data: issues } of iterator) {
  for (const issue of issues) {
    console.log(`#${issue.number}: ${issue.title}`);
  }
  // 必要に応じて途中で break できる
}
```

### 早期終了

```javascript
const issues = await octokit.paginate(
  "GET /repos/{owner}/{repo}/issues",
  {
    owner: "OWNER",
    repo: "REPO",
    per_page: 100,
  },
  (response, done) => {
    // 条件を満たしたら以降のページを取得しない
    if (response.data.find((issue) => issue.title === "target")) {
      done();
    }
    return response.data;
  }
);
```

## ページネーション利用時の注意

- **総件数の取得**: 多くのエンドポイントでは総件数を直接返さない。`rel="last"` のURLからページ番号を抽出して `ページ番号 × per_page` で概算可能
- **結果の一貫性**: ページネーション中にデータが変更されると、結果に重複や欠落が生じる可能性がある
- **パフォーマンス**: `per_page=100` を設定してリクエスト数を削減すること
- **深いページへのアクセス**: ページ番号が大きくなるとパフォーマンスが低下する場合がある。`since` パラメータの利用を検討

# Copilot Content Exclusion Management API

organization の Copilot content exclusion path ルールを取得・設定するエンドポイント。出典: https://docs.github.com/en/rest/copilot/copilot-content-exclusion-management

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/copilot/content_exclusion` | content exclusion ルールの取得（public preview） |
| PUT | `/orgs/{org}/copilot/content_exclusion` | content exclusion ルールの設定（public preview） |

## 例

```curl
curl -L \
  -X PUT \
  https://api.github.com/orgs/ORG/copilot/content_exclusion \
  -d '{
  "octo-repo": [
    "/src/some-dir/kernel.rs"
  ]
}'
```

GET のレスポンス (200): object, additional properties: array。PUT のレスポンス (200): `message` (string)。

## 注意事項

- 両エンドポイントとも public preview。organization owner が対象。`X-GitHub-Api-Version: 2026-03-10` 前提（原文ヘッダー注記）
- classic PAT / OAuth app トークンのスコープ: GET は `copilot` または `read:org`、PUT は `copilot`
- API はコメント非対応: GET は既存ルールのコメントを返さず、PUT は既存コメントを削除する
- API は重複キー非対応: GET は最後の出現のみ返し、PUT は最後の出現のみ保存する（先のエントリは上書き）
- PUT の status code に 413（Payload Too Large）と 422 がある。GET は 200 / 401 / 403 / 404 / 500

## Related

- [user-management.md](./user-management.md)

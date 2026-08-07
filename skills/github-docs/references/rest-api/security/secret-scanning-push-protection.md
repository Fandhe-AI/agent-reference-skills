# Secret Scanning Push Protection API

Organization の secret scanning push protection パターン設定を取得・更新するエンドポイント。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/orgs/{org}/secret-scanning/pattern-configurations` | パターン設定の一覧取得 |
| PATCH | `/orgs/{org}/secret-scanning/pattern-configurations` | パターン設定の更新 |

## Notes

- レスポンスに `bypass_rate` を含み、push protection バイパスの発生率を確認できる
- 個別アラートへのバイパス作成は `POST /repos/{owner}/{repo}/secret-scanning/push-protection-bypasses`（secret-scanning.md 参照）

## Related

- [secret-scanning.md](./secret-scanning.md)

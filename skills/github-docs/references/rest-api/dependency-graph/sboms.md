# SBOM API

リポジトリの dependency graph を SPDX JSON 形式の software bill of materials (SBOM) としてエクスポートするエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/dependency-graph/sboms

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/dependency-graph/sbom/generate-report` | SBOM 生成ジョブを起動（201、`sbom_url`） |
| GET | `/repos/{owner}/{repo}/dependency-graph/sbom/fetch-report/{sbom_uuid}` | 生成済み SBOM を取得（完了時は 302 で一時ダウンロード URL へリダイレクト、処理中は 202） |
| GET | `/repos/{owner}/{repo}/dependency-graph/sbom` | 同期エクスポート（closing down、下記 Notes 参照） |

```bash
curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/dependency-graph/sbom/generate-report

curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/dependency-graph/sbom/fetch-report/SBOM_UUID
```

## パラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| `owner` | string | 必須 | リポジトリのアカウントオーナー |
| `repo` | string | 必須 | `.git` 拡張子なしのリポジトリ名 |
| `sbom_uuid` | string | 必須（fetch-report のみ） | SBOM エクスポートの一意識別子 |

### ステータスコード

| Endpoint | Status |
|---|---|
| generate-report | 201 / 403 / 404 |
| fetch-report | 202 / 302 / 403 / 404 |
| 同期版 | 200 / 403 / 404 |

### レスポンス（同期版 200 の `sbom` オブジェクト）

| Field | Description |
|---|---|
| `SPDXID` / `spdxVersion` / `comment` / `name` / `dataLicense` / `documentNamespace` | ドキュメント属性 |
| `creationInfo` | `created`, `creators` |
| `packages` | `SPDXID`, `name`, `versionInfo`, `downloadLocation`, `filesAnalyzed`, `licenseConcluded`, `licenseDeclared`, `supplier`, `copyrightText`, `externalRefs` |
| `relationships` | `relationshipType`, `spdxElementId`, `relatedSpdxElement` |

## 注意事項

- `GET .../dependency-graph/sbom`（同期版）は closing down: 2026-11-13 以降アクセス不可。generate-report で生成を起動し fetch-report で取得する非同期フローへ移行する
- 生成された SBOM レポートは元のリクエストから最大 1 週間保持される。fetch-report が返す一時ダウンロード URL の有効期限は別途、取得リクエスト時に設定される
- リポジトリへの read 以上のアクセスが必要
- 標準ヘッダー: `Accept: application/vnd.github+json`、`X-GitHub-Api-Version: 2026-03-10`

## Related

- [dependency-review.md](./dependency-review.md)
- [dependency-submission.md](./dependency-submission.md)

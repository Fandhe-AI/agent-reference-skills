# Dependency Review API

2 つのコミット間の依存関係の差分（既知の脆弱性情報付き）を取得するエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/dependency-graph/dependency-review

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/repos/{owner}/{repo}/dependency-graph/compare/{basehead}` | 2 コミット間の依存関係の差分を取得 |

```bash
curl -L \
  -X GET \
  https://api.github.com/repos/OWNER/REPO/dependency-graph/compare/BASEHEAD
```

## パラメータ

| パラメータ | 型 | 必須 | 説明 |
|---|---|---|---|
| `owner` | string | 必須 | リポジトリのアカウントオーナー（大文字小文字は区別しない） |
| `repo` | string | 必須 | `.git` 拡張子なしのリポジトリ名 |
| `basehead` | string | 必須 | 比較する base と head の Git リビジョン。`{base}...{head}` 形式。リビジョンはコミット SHA に解決され、名前付きリビジョンは HEAD コミットに解決されて適切なマージベースが決定される |
| `name` | string | 任意 | 依存関係マニフェストファイルのリポジトリルートからのフルパス |

### レスポンス（200）

オブジェクトの配列:

| フィールド | 型 | 説明 |
|---|---|---|
| `change_type` | string | `added` / `removed` |
| `manifest` | string | マニフェスト |
| `ecosystem` | string | エコシステム |
| `name` | string | 依存関係名 |
| `version` | string | バージョン |
| `package_url` | string or null | PURL |
| `license` | string or null | ライセンス |
| `source_repository_url` | string or null | ソースリポジトリ URL |
| `vulnerabilities` | array | 各要素: `severity` / `advisory_ghsa_id` / `advisory_summary` / `advisory_url`（すべて string） |
| `scope` | string | `unknown` / `runtime` / `development` |

| Status | Meaning |
|---|---|
| 200 | OK |
| 400 | Bad Request |
| 403 | Response for a private repository when GitHub Advanced Security is not enabled, or if used against a fork |
| 404 | Resource not found |
| 500 | Internal Error |
| 503 | Service unavailable |

## 注意事項

- 403 は、GitHub Advanced Security が有効でない private リポジトリ、または fork に対して使った場合に返る
- 標準ヘッダー: `Accept: application/vnd.github+json`、`X-GitHub-Api-Version: 2026-03-10`
- Dependency Submission API で送信した依存関係もこの差分に含まれる

## Related

- [dependency-submission.md](./dependency-submission.md)
- [sboms.md](./sboms.md)

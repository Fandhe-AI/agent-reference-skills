# Dependency Submission API

ビルド時に解決された依存関係をスナップショットとして送信し、dependency graph に追加するエンドポイント。

公式ドキュメント: https://docs.github.com/en/rest/dependency-graph/dependency-submission

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| POST | `/repos/{owner}/{repo}/dependency-graph/snapshots` | リポジトリの依存関係スナップショットを作成（201 Created） |

```bash
curl -L \
  -X POST \
  https://api.github.com/repos/OWNER/REPO/dependency-graph/snapshots \
  -d '{
  "version": 0,
  "sha": "ce587453ced02b1526dfb4cb910479d431683101",
  "ref": "refs/heads/main",
  "job": {
    "correlator": "yourworkflowname_youractionname",
    "id": "yourrunid"
  },
  "detector": {
    "name": "octo-detector",
    "version": "0.0.1",
    "url": "https://github.com/octo-org/octo-repo"
  },
  "scanned": "2022-06-14T20:25:00Z",
  "manifests": {
    "package-lock.json": {
      "name": "package-lock.json",
      "file": {
        "source_location": "src/package-lock.json"
      },
      "resolved": {
        "@actions/core": {
          "package_url": "pkg:/npm/%40actions/core@1.1.9",
          "dependencies": [
            "@actions/http-client"
          ]
        },
        "@actions/http-client": {
          "package_url": "pkg:/npm/%40actions/http-client@1.0.7",
          "dependencies": [
            "tunnel"
          ]
        },
        "tunnel": {
          "package_url": "pkg:/npm/tunnel@0.0.6"
        }
      }
    }
  }
}'
```

## パラメータ

| Name | Type | Required | Description |
|---|---|---|---|
| `version` | integer | yes | スナップショット送信のバージョン |
| `job.id` | string | yes | ジョブの外部 ID |
| `job.correlator` | string | yes | 時間をまたいで送信されるスナップショットをグループ化するキー。`job.correlator` と `detector.name` の組ごとに「最新」のみが現在の依存関係の算出に使われる。GitHub Actions では `GITHUB_WORKFLOW` と `GITHUB_JOB` の連結が妥当な既定値。build matrix では各送信を区別する追加キーが必要 |
| `job.html_url` | string | no | ジョブの URL |
| `sha` | string | yes | スナップショットに紐づくコミット SHA（最大 64 文字） |
| `ref` | string | yes | スナップショットを発火させたブランチ |
| `detector.name` / `detector.version` / `detector.url` | string | yes | 使用した detector の名前・バージョン・URL |
| `metadata` | object | no | ユーザー定義メタデータ（スカラー値のキー最大 8 個） |
| `manifests` | object | no | パッケージマニフェストの集合。各値に `name`（必須）・`file.source_location`・`metadata`・`resolved` |
| `manifests.*.resolved.*.package_url` | string | no | 依存関係の Package-url (PURL) |
| `manifests.*.resolved.*.relationship` | string | no | `direct` / `indirect` |
| `manifests.*.resolved.*.scope` | string | no | `runtime` / `development` |
| `manifests.*.resolved.*.dependencies` | array of strings | no | 直接の子依存関係の PURL 配列 |
| `scanned` | string | yes | スナップショットをスキャンした時刻 |

レスポンス（201）:

| フィールド | 型 |
|---|---|
| `id` | integer |
| `created_at` | string |
| `result` | string |
| `message` | string |

## 注意事項

- 公式スキーマは `dependencies` を PURL 配列と説明するが、公式の送信例は `resolved` 内のキー名（`@actions/http-client` / `tunnel`）を列挙している。送信時は公式例の形式に合わせる

- 認証ユーザーはリポジトリへのアクセスが必要。OAuth app token と classic PAT は `repo` スコープが必要
- 標準ヘッダー: `Accept: application/vnd.github+json`、`X-GitHub-Api-Version: 2026-03-10`
- 送信した依存関係には Dependabot alerts / security updates が適用される（GitHub Advisory Database 対応エコシステムのみ）。推移的依存関係は更新可能なら親依存関係の更新 PR が自動作成される
- 送信した依存関係は dependency review には表示されるが、Organization の dependency insights では利用できない
- マニフェストが複数手段で検出される場合の優先順位: 1. ユーザー送信（異なる detector が複数ある場合は correlator のアルファベット順で先頭を採用。同一 detector の correlator が 2 つなら resolved をマージ） 2. Dependabot graph jobs（現在 Go と Python） 3. 自動送信 4. 静的解析結果

## Related

- [dependency-review.md](./dependency-review.md)
- [sboms.md](./sboms.md)

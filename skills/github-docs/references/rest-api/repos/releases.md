# リリース

リリースとリリースアセットの管理に関するエンドポイント。

## エンドポイント一覧

### リリース

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/releases` | リリース一覧を取得 |
| `POST` | `/repos/{owner}/{repo}/releases` | リリースを作成 |
| `GET` | `/repos/{owner}/{repo}/releases/latest` | 最新リリースを取得 |
| `GET` | `/repos/{owner}/{repo}/releases/tags/{tag}` | タグ名でリリースを取得 |
| `GET` | `/repos/{owner}/{repo}/releases/{release_id}` | IDでリリースを取得 |
| `PATCH` | `/repos/{owner}/{repo}/releases/{release_id}` | リリースを更新 |
| `DELETE` | `/repos/{owner}/{repo}/releases/{release_id}` | リリースを削除 |
| `POST` | `/repos/{owner}/{repo}/releases/generate-notes` | リリースノートを自動生成 |

### リリースアセット

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| `GET` | `/repos/{owner}/{repo}/releases/{release_id}/assets` | アセット一覧を取得 |
| `GET` | `/repos/{owner}/{repo}/releases/assets/{asset_id}` | アセットを取得 |
| `POST` | `https://uploads.github.com/repos/{owner}/{repo}/releases/{release_id}/assets` | アセットをアップロード |
| `PATCH` | `/repos/{owner}/{repo}/releases/assets/{asset_id}` | アセットを更新 |
| `DELETE` | `/repos/{owner}/{repo}/releases/assets/{asset_id}` | アセットを削除 |

## リリースの作成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/releases \
  -d '{
    "tag_name": "v1.0.0",
    "target_commitish": "main",
    "name": "Release v1.0.0",
    "body": "## Changes\n- Feature A\n- Bug fix B",
    "draft": false,
    "prerelease": false,
    "generate_release_notes": true
  }'
```

### 作成パラメータ

| パラメータ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `tag_name` | string | **必須** | - | タグ名（存在しない場合は自動作成） |
| `target_commitish` | string | - | デフォルトブランチ | タグ作成先のコミットSHAまたはブランチ名 |
| `name` | string | - | - | リリースタイトル |
| `body` | string | - | - | リリースの説明（Markdown対応） |
| `draft` | boolean | - | `false` | ドラフトリリースとして作成 |
| `prerelease` | boolean | - | `false` | プレリリースとしてマーク |
| `generate_release_notes` | boolean | - | `false` | リリースノートを自動生成 |
| `make_latest` | string | - | `true` | `true`, `false`, `legacy` — 最新リリースとして設定するか |
| `discussion_category_name` | string | - | - | ディスカッションカテゴリ名（設定するとディスカッションが作成される） |

## リリース一覧の取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  "https://api.github.com/repos/OWNER/REPO/releases?per_page=100"
```

> **注意**: ドラフトリリースは認証済みユーザーかつリポジトリへのプッシュ権限がある場合のみ返される。

## 最新リリースの取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/releases/latest
```

> **注意**: `latest` はドラフトやプレリリースを除く、最新の公開リリースを返す。

## タグ名でリリースを取得

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/releases/tags/v1.0.0
```

## リリースの更新

```bash
curl -X PATCH \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/releases/{release_id} \
  -d '{
    "name": "Updated Release Name",
    "body": "Updated description",
    "prerelease": false,
    "make_latest": "true"
  }'
```

## リリースの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/releases/{release_id}
```

> **注意**: リリースを削除してもタグは削除されない。タグも削除する場合は別途 Git References API を使用。

## リリースノートの自動生成

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/releases/generate-notes \
  -d '{
    "tag_name": "v2.0.0",
    "target_commitish": "main",
    "previous_tag_name": "v1.0.0"
  }'
```

### パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `tag_name` | string | **必須** | 新しいリリースのタグ名 |
| `target_commitish` | string | - | タグのターゲット |
| `previous_tag_name` | string | - | 前回リリースのタグ名（差分の起点） |
| `configuration_file_path` | string | - | リリースノート設定ファイルのパス |

### リリースノートのカスタマイズ

`.github/release.yml` で自動生成されるリリースノートの形式をカスタマイズ可能:

```yaml
changelog:
  exclude:
    labels:
      - ignore-for-release
    authors:
      - dependabot
  categories:
    - title: Breaking Changes
      labels:
        - breaking-change
    - title: New Features
      labels:
        - enhancement
    - title: Bug Fixes
      labels:
        - bug
    - title: Other Changes
      labels:
        - "*"
```

## リリースアセットのアップロード

アセットのアップロードは `uploads.github.com` に対して行う（`api.github.com` ではない）。

```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @./build/app-v1.0.0.zip \
  "https://uploads.github.com/repos/OWNER/REPO/releases/{release_id}/assets?name=app-v1.0.0.zip&label=Application%20Package"
```

### アップロードパラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `name` | string | **必須** | アセットのファイル名（クエリパラメータ） |
| `label` | string | - | 表示ラベル（クエリパラメータ） |

### 注意事項

- `Content-Type` はアップロードするファイルの実際のMIMEタイプを設定する
- 同じ名前のアセットが既に存在する場合はエラーになる（先に削除が必要）
- アセットサイズの上限: **2 GB**

## リリースアセットの取得

```bash
# アセット一覧
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/releases/{release_id}/assets

# 特定アセットの情報
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/releases/assets/{asset_id}

# アセットのダウンロード（バイナリ）
curl -L -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/octet-stream" \
  https://api.github.com/repos/OWNER/REPO/releases/assets/{asset_id} \
  -o downloaded-file.zip
```

## リリースアセットの更新

```bash
curl -X PATCH \
  -H "Authorization: Bearer TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/releases/assets/{asset_id} \
  -d '{
    "name": "new-filename.zip",
    "label": "New Label"
  }'
```

## リリースアセットの削除

```bash
curl -X DELETE \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO/releases/assets/{asset_id}
```

## 必要な権限

| 操作 | Fine-grained PAT 権限 |
|------|----------------------|
| リリースの読み取り | `contents: read` |
| リリースの作成・更新・削除 | `contents: write` |
| アセットのアップロード・更新・削除 | `contents: write` |

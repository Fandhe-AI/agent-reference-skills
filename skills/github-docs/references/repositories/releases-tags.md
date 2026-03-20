# リリースとタグ (Releases & Tags)

GitHub リリースは、特定のバージョンのソフトウェアをパッケージ化して配布するための機能です。Git タグに基づいて作成され、リリースノートやバイナリファイルを添付できます。

## リリースの作成

### Web UI から

1. リポジトリのメインページで **Releases** をクリック（または右サイドバーの Releases セクション）
2. **Draft a new release** をクリック
3. 以下を設定:
   - **Tag**: 既存のタグを選択するか、新しいタグ名を入力
   - **Target**: タグのターゲットブランチを選択（デフォルトブランチまたは任意のブランチ）
   - **Release title**: リリースのタイトル
   - **Description**: リリースノート（Markdown 対応）
4. （任意）バイナリファイルをドラッグ＆ドロップで添付
5. オプションを選択:
   - **Set as a pre-release**: プレリリースとしてマーク
   - **Set as the latest release**: 最新リリースとして設定
   - **Create a discussion for this release**: リリースディスカッションを作成
6. **Publish release**（公開）または **Save draft**（下書き保存）をクリック

### GitHub CLI から

```bash
# リリースの作成
gh release create v1.0.0 --title "Release v1.0.0" --notes "Release notes here"

# ファイルを添付してリリースを作成
gh release create v1.0.0 ./dist/*.zip --title "v1.0.0" --notes "Release notes"

# ドラフトリリースの作成
gh release create v1.0.0 --draft --title "v1.0.0" --notes "Draft release"

# プレリリースの作成
gh release create v1.0.0-beta.1 --prerelease --title "v1.0.0-beta.1"

# リリースノートを自動生成
gh release create v1.0.0 --generate-notes

# 特定ブランチをターゲットに指定
gh release create v1.0.0 --target release-branch --generate-notes
```

### API から

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/REPO/releases \
  -d '{
    "tag_name": "v1.0.0",
    "target_commitish": "main",
    "name": "Release v1.0.0",
    "body": "Description of the release",
    "draft": false,
    "prerelease": false,
    "generate_release_notes": true
  }'
```

## 自動生成リリースノート

GitHub はリリース間の差分に基づいてリリースノートを自動生成できます。

- Pull Request のタイトルと作者情報を含む
- 前回のリリースからの変更一覧を自動的にリスト化
- コントリビューター一覧を自動的に追加
- `.github/release.yml` でカテゴリとラベルのマッピングをカスタマイズ可能

### release.yml の例

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

## リリースの種類

| 種類 | 説明 | 用途 |
|------|------|------|
| Latest release | 最新の安定版リリース | 一般利用向け |
| Pre-release | 安定版ではないリリース | ベータ版、RC版のテスト用 |
| Draft release | 未公開のドラフト | リリース準備中、レビュー待ち |

### ドラフトリリース

- 公開前にレビューや準備ができる
- Immutable releases（不変リリース）を使用する場合、ドラフトとして作成し、すべてのアセットを添付してから公開することを推奨
- 公開後の Immutable releases ではタイトルとリリースノートのみ編集可能

### プレリリース

- **Set as a pre-release** にチェックを入れて作成
- プレリリースのラベルが表示される
- ユーザーに安定版ではないことを明示

## リリースアセット（バイナリ添付ファイル）

リリースにはバイナリファイルを添付できます:

- ドラッグ＆ドロップまたはファイル選択で添付
- 各ファイルのサイズ上限: **2 GB**
- ソースコードの ZIP / tar.gz アーカイブは自動的に生成される
- Git LFS オブジェクトをリリースアーカイブに含めるかどうかは設定可能

## リリースの編集

```bash
# CLI で編集
gh release edit v1.0.0 --title "Updated Title" --notes "Updated notes"

# ドラフトを公開に変更
gh release edit v1.0.0 --draft=false

# プレリリースに変更
gh release edit v1.0.0 --prerelease
```

## リリースの削除

```bash
# CLI で削除
gh release delete v1.0.0

# 関連するタグも削除
gh release delete v1.0.0 --cleanup-tag
```

## リリースの一覧表示

```bash
# すべてのリリースを一覧
gh release list

# 最新のリリースを表示
gh release view --latest

# 特定のリリースを表示
gh release view v1.0.0
```

## タグの管理

### タグの作成

```bash
# 軽量タグ
git tag v1.0.0

# 注釈付きタグ（推奨）
git tag -a v1.0.0 -m "Version 1.0.0"

# 特定のコミットにタグ付け
git tag -a v1.0.0 COMMIT_SHA -m "Version 1.0.0"

# タグをリモートに push
git push origin v1.0.0

# すべてのタグを push
git push origin --tags
```

### タグの削除

```bash
# ローカルタグの削除
git tag -d v1.0.0

# リモートタグの削除
git push origin --delete v1.0.0
```

## セマンティックバージョニング (SemVer)

リリースのバージョン番号には[セマンティックバージョニング](https://semver.org/)の使用を推奨します。

### 形式

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
```

| 要素 | 説明 | 変更のタイミング |
|------|------|----------------|
| MAJOR | メジャーバージョン | 後方互換性のない変更 |
| MINOR | マイナーバージョン | 後方互換性のある機能追加 |
| PATCH | パッチバージョン | 後方互換性のあるバグ修正 |

### 例

| バージョン | 説明 |
|-----------|------|
| `v1.0.0` | 最初の安定版リリース |
| `v1.1.0` | 新機能の追加 |
| `v1.1.1` | バグ修正 |
| `v2.0.0` | 破壊的変更を含むメジャーアップデート |
| `v2.0.0-beta.1` | ベータ版プレリリース |
| `v2.0.0-rc.1` | リリース候補 |

## コントリビューターの表示

リリースの説明で `@mention` を使用すると、コントリビューターのアバターリストが自動的に追加されます。

## 参考リンク

- [Managing releases in a repository - GitHub Docs](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Semantic Versioning 2.0.0](https://semver.org/)

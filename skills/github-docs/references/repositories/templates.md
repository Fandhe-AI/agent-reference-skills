# テンプレートリポジトリ (Template Repositories)

テンプレートリポジトリは、同じディレクトリ構造とファイルを持つ新しいリポジトリを素早く作成するための雛形です。

## テンプレートリポジトリの作成

既存のリポジトリをテンプレートとして設定する手順:

1. リポジトリの **Settings** に移動
2. **General** セクションで **Template repository** チェックボックスをオンにする

これにより、リポジトリページに **Use this template** ボタンが表示されるようになります。

## テンプレートからリポジトリを作成

### Web UI から

1. テンプレートリポジトリのページで **Use this template** > **Create a new repository** をクリック
2. オーナーを選択
3. リポジトリ名と説明を入力
4. 可視性（Public / Private）を選択
5. （任意）**Include all branches** にチェックを入れると、デフォルトブランチ以外も含まれる
6. **Create repository** をクリック

### GitHub CLI から

```bash
# テンプレートからリポジトリを作成
gh repo create my-new-repo --template OWNER/TEMPLATE-REPO

# プライベートリポジトリとして作成
gh repo create my-new-repo --template OWNER/TEMPLATE-REPO --private

# クローンも同時に実行
gh repo create my-new-repo --template OWNER/TEMPLATE-REPO --clone
```

### API から

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/OWNER/TEMPLATE-REPO/generate \
  -d '{
    "owner": "YOUR-USERNAME",
    "name": "my-new-repo",
    "description": "Created from template",
    "private": false,
    "include_all_branches": false
  }'
```

## フォークとの違い

| 特徴 | テンプレートから作成 | フォーク |
|------|---------------------|---------|
| Git 履歴 | 新規（1 コミットから開始） | 元リポジトリの全履歴を含む |
| 親子関係 | なし（完全に独立） | 元リポジトリとの関係が維持される |
| PR の作成 | 元リポジトリへの PR 不可 | 元リポジトリへの PR が可能 |
| マージ | 元リポジトリとのマージ不可 | upstream からの変更を取り込める |
| ネットワークグラフ | 独立したネットワーク | 元リポジトリのネットワークに含まれる |
| 可視性 | 自由に設定可能 | パブリックリポジトリのフォークはパブリック |

## テンプレートに含まれるもの

テンプレートから作成したリポジトリには以下が引き継がれます:

- ファイルとディレクトリ構造
- ブランチ（**Include all branches** を選択した場合）
- `.gitignore` ファイル
- その他のコミットされたファイル

## テンプレートに含まれないもの

以下はテンプレートからの作成時に **引き継がれません**:

- Git の履歴（コミットログ）
- Issues
- Pull Requests
- Labels
- Milestones
- Projects
- Wiki
- Discussions
- Settings（ブランチ保護ルール、Webhooks など）
- Secrets
- Environments
- GitHub Actions のワークフロー実行履歴

## 制限事項

- **Git LFS 非対応**: テンプレートリポジトリには Git LFS で保存されたファイルを含めることができない
- テンプレートリポジトリ自体はフォーク可能だが、テンプレートから作成したリポジトリはテンプレートとの関係を持たない

## ユースケース

| シナリオ | 推奨方法 |
|---------|---------|
| プロジェクトの雛形として新規作成 | テンプレート |
| オープンソースプロジェクトへの貢献 | フォーク |
| 組織内の標準プロジェクト構成の展開 | テンプレート |
| 既存プロジェクトの派生版を開発 | フォーク |
| 教育用のスターターコード配布 | テンプレート（GitHub Classroom でも利用可能） |

## 参考リンク

- [Creating a template repository - GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
- [Creating a repository from a template - GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)

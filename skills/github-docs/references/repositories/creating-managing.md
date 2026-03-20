# リポジトリの作成・管理

GitHub リポジトリの作成、設定変更、および管理操作に関するリファレンスです。

## リポジトリの作成

### Web UI から

1. ページ右上の **+** アイコンをクリックし、**New repository** を選択
2. （任意）テンプレートリポジトリを選択
3. オーナーを選択（個人アカウントまたは組織）
4. リポジトリ名を入力（最大 100 文字）
5. 説明を入力（任意）
6. 可視性を選択（Public / Private）
7. 初期化オプションを設定（任意）:
   - **README file**: プロジェクトの説明ファイル
   - **.gitignore**: 無視ルールのテンプレート（言語別に選択可能）
   - **License**: ソフトウェアライセンス
8. **Create repository** をクリック

> 既存のリポジトリをインポートする場合は、初期化オプションを選択しないでください。マージコンフリクトが発生する可能性があります。

### GitHub CLI から

```bash
# インタラクティブに作成
gh repo create

# パブリックリポジトリを作成
gh repo create my-repo --public

# プライベートリポジトリを作成（README付き）
gh repo create my-repo --private --add-readme

# 組織にリポジトリを作成
gh repo create my-org/my-repo --public

# テンプレートから作成
gh repo create my-repo --template owner/template-repo

# クローンも同時に実行
gh repo create my-repo --public --clone
```

### API から

```bash
# 個人リポジトリの作成
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d '{
    "name": "my-repo",
    "description": "A new repository",
    "private": false,
    "auto_init": true
  }'

# 組織リポジトリの作成
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/orgs/ORG/repos \
  -d '{
    "name": "my-repo",
    "private": true
  }'
```

### URL パラメータによるフォーム事前入力

`https://github.com/new` に URL パラメータを付与して、リポジトリ作成フォームを事前入力できます:

```
https://github.com/new?name=my-repo&description=My+project&visibility=public&owner=my-org
```

## 可視性 (Visibility)

| 可視性 | 説明 | 利用可能プラン |
|--------|------|---------------|
| **Public** | インターネット上の全員がアクセス可能 | すべて |
| **Private** | 明示的にアクセス権を付与されたユーザーのみ | すべて |
| **Internal** | 同一 Enterprise 内のメンバーがアクセス可能 | Enterprise のみ |

### 可視性の変更

**Settings** > **Danger zone** > **Change repository visibility** から変更できます。

> Public から Private への変更は即座に反映されます。Private から Public への変更はフォーク、Stars、Watchers に影響を与える可能性があるため注意が必要です。

## リポジトリの初期化オプション

| オプション | 説明 |
|-----------|------|
| README.md | プロジェクトの概要を説明するファイル |
| .gitignore | 言語やフレームワークに応じた無視ルール（テンプレートから選択可能） |
| LICENSE | オープンソースライセンス（MIT, Apache 2.0, GPL など） |

## リポジトリのアーカイブ

アーカイブされたリポジトリは読み取り専用になります。

- Issue、Pull Request、コメントの新規作成不可
- コードの変更（push）不可
- Stars、Watchers、フォークは維持される
- アーカイブは解除可能

```bash
# CLI でアーカイブ
gh repo archive OWNER/REPO

# CLI でアーカイブ解除
gh repo unarchive OWNER/REPO
```

## リポジトリの転送

リポジトリを別のユーザーまたは組織に転送できます。

- **Settings** > **Danger zone** > **Transfer ownership** から実行
- 転送先のユーザーまたは組織の承認が必要
- GitHub は自動的に古い URL から新しい URL へのリダイレクトを設定する
- Issue、Pull Request、Stars、Watchers は転送先に引き継がれる

## リポジトリの削除

**Settings** > **Danger zone** > **Delete this repository** から削除できます。

```bash
# CLI で削除
gh repo delete OWNER/REPO --yes
```

> 削除は取り消せません。削除前にアーカイブを検討してください。

## リポジトリ名の変更

**Settings** > **Repository name** からリポジトリ名を変更できます。

- GitHub は古い URL から新しい URL へのリダイレクトを自動設定する
- ローカルのリモート URL は手動で更新が必要:
  ```bash
  git remote set-url origin https://github.com/OWNER/NEW-REPO-NAME.git
  ```

## リポジトリの複製（フォーク）

```bash
# Web UI: リポジトリページの Fork ボタンをクリック

# CLI でフォーク
gh repo fork OWNER/REPO

# フォークしてクローン
gh repo fork OWNER/REPO --clone
```

## 参考リンク

- [Creating a new repository - GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [About repositories - GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)

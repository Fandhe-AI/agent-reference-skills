# GitHub Pages の始め方 (Getting Started)

GitHub Pages は、リポジトリから直接 HTML、CSS、JavaScript ファイルを取得し、必要に応じてビルドプロセスを経てウェブサイトを公開する静的サイトホスティングサービスです。

## サイトの種類

### ユーザー/組織サイト

| 項目 | 内容 |
|------|------|
| リポジトリ名 | `<username>.github.io` または `<orgname>.github.io` |
| URL | `https://<username>.github.io` |
| 制限 | アカウントごとに **1 つ** のみ |
| デフォルトブランチ | `main`（任意のブランチに変更可能） |

### プロジェクトサイト

| 項目 | 内容 |
|------|------|
| リポジトリ名 | 任意の名前 |
| URL | `https://<username>.github.io/<repository>` |
| 制限 | リポジトリごとに **1 つ** |
| デフォルトブランチ | 任意のブランチ |

## 公開ソース (Publishing Source)

GitHub Pages のサイトを公開する方法は 2 つあります。

### 1. ブランチからの公開

特定のブランチの特定のフォルダをソースとして指定します。

| ソースフォルダ | 説明 |
|--------------|------|
| `/`（ルート） | リポジトリのルートディレクトリ |
| `/docs` | `docs/` フォルダ |

設定手順:

1. **Settings** > **Pages** に移動
2. **Build and deployment** > **Source** で **Deploy from a branch** を選択
3. ブランチとフォルダを選択
4. **Save** をクリック

> ソースブランチに変更を push するたびに、サイトが自動的に再ビルド・公開されます。

### 2. GitHub Actions による公開

GitHub Actions ワークフローを使用してサイトをビルド・デプロイします。Jekyll 以外の静的サイトジェネレーターを使う場合や、カスタムビルドプロセスが必要な場合に推奨されます。

設定手順:

1. **Settings** > **Pages** に移動
2. **Build and deployment** > **Source** で **GitHub Actions** を選択
3. 提案されたワークフローテンプレートを選択するか、カスタムワークフローを作成

## 静的サイトジェネレーター

### Jekyll（デフォルト）

GitHub Pages は Jekyll を組み込みでサポートしています。ブランチから公開する場合、Jekyll が自動的にサイトをビルドします。

- Markdown ファイルを HTML に変換
- Liquid テンプレートエンジンをサポート
- 豊富なテーマが利用可能
- `_config.yml` で設定

### その他のジェネレーター

GitHub Actions を使用する場合、任意の静的サイトジェネレーターを利用できます:

- **Next.js** (Static Export)
- **Astro**
- **Hugo**
- **Gatsby**
- **Nuxt** (Static Generation)
- **VitePress**
- **MkDocs**

## GitHub Actions ワークフローの例

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      # ビルドステップ（例: npm build）
      - name: Build
        run: |
          npm ci
          npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 制限事項

| 制限 | 値 |
|------|---|
| リポジトリサイズ | **1 GB** 推奨上限 |
| デプロイサイズ | **1 サイトあたり 10 GB** |
| 帯域幅 | **1 か月あたり 100 GB**（ソフトリミット） |
| ビルド回数 | **1 時間あたり 10 ビルド**（GitHub Actions は対象外） |

### コンテンツの制限

GitHub Pages は以下の用途を想定しています:

- オープンソースプロジェクトのドキュメント
- 個人のブログやポートフォリオ
- プロジェクトのランディングページ

以下の用途は **禁止または非推奨** です:

- オンラインストアなどの商用利用
- SaaS アプリケーション
- 機密データの公開
- パスワード保護が必要なコンテンツ

## プライバシーに関する注意

GitHub Pages サイトへの訪問者の IP アドレスは、セキュリティ目的でログに記録・保存されます。これは訪問者が GitHub にログインしているかどうかに関係なく行われます。

## セットアップ手順（ブランチからの公開）

### ユーザーサイトの場合

```bash
# 1. リポジトリを作成
gh repo create username.github.io --public --clone

# 2. サイトのファイルを作成
cd username.github.io
echo "<!DOCTYPE html><html><body><h1>My Site</h1></body></html>" > index.html

# 3. コミットして push
git add .
git commit -m "Initial site"
git push

# 4. Settings > Pages で公開ソースを設定
# → https://username.github.io でアクセス可能
```

### プロジェクトサイトの場合

```bash
# 1. 既存リポジトリに docs/ フォルダを作成
mkdir docs
echo "<!DOCTYPE html><html><body><h1>Project Docs</h1></body></html>" > docs/index.html

# 2. コミットして push
git add docs/
git commit -m "Add GitHub Pages site"
git push

# 3. Settings > Pages で source を main ブランチの /docs に設定
# → https://username.github.io/repo-name でアクセス可能
```

## 参考リンク

- [About GitHub Pages - GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- [Creating a GitHub Pages site - GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

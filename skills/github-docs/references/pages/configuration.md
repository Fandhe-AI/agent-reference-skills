# GitHub Pages の設定 (Configuration)

GitHub Pages の公開ソース、Jekyll の設定、カスタム 404 ページに関するリファレンスです。

## 公開ソースの設定

### ブランチからの公開

1. **Settings** > **Pages** に移動
2. **Build and deployment** セクションで **Source** を **Deploy from a branch** に設定
3. ブランチを選択（例: `main`, `gh-pages`）
4. フォルダを選択:
   - `/`（ルート）: リポジトリのルートディレクトリ
   - `/docs`: `docs/` フォルダ
5. **Save** をクリック

> ソースブランチに変更が push されるたびに、サイトが自動的にリビルドされます。

### GitHub Actions による公開

Jekyll 以外のビルドツールを使用する場合や、コンパイル済みの静的ファイルを専用ブランチに保持したくない場合に推奨されます。

1. **Settings** > **Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. 提案されたワークフローテンプレートを使用するか、カスタムワークフローを作成

#### 標準的なワークフローパターン

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5

      # ビルドステップ（サイトジェネレーターに応じて変更）
      - run: npm ci && npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist  # ビルド出力ディレクトリ

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

#### 主要な Actions

| Action | 説明 |
|--------|------|
| `actions/configure-pages` | Pages のデプロイに必要な設定を構成 |
| `actions/upload-pages-artifact` | ビルド成果物をアップロード |
| `actions/deploy-pages` | アップロードされた成果物を Pages にデプロイ |

## Jekyll の設定

ブランチからの公開を使用する場合、GitHub Pages は自動的に Jekyll でサイトをビルドします。

### _config.yml

Jekyll の設定ファイル `_config.yml` をリポジトリのルートに配置します。

```yaml
# サイトの基本設定
title: My Site
description: A description of my site
url: "https://username.github.io"
baseurl: "/repo-name"  # プロジェクトサイトの場合

# テーマ
theme: minima
# または remote_theme を使用:
# remote_theme: pages-themes/cayman@v0.2.0

# ビルド設定
markdown: kramdown
highlighter: rouge

# プラグイン（GitHub Pages でサポートされるもの）
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# パーマリンク
permalink: /blog/:year/:month/:day/:title/

# コレクション
collections:
  docs:
    output: true
    permalink: /docs/:path/

# 除外するファイル/ディレクトリ
exclude:
  - README.md
  - Gemfile
  - Gemfile.lock
  - node_modules/
  - vendor/
```

### Jekyll のディレクトリ構造

```
.
├── _config.yml          # 設定ファイル
├── _posts/              # ブログ記事
│   └── 2024-01-01-welcome.md
├── _layouts/            # レイアウトテンプレート
│   ├── default.html
│   └── post.html
├── _includes/           # 再利用可能なパーツ
│   ├── header.html
│   └── footer.html
├── _data/               # データファイル（YAML/JSON/CSV）
├── _sass/               # Sass パーシャル
├── assets/              # 静的ファイル（CSS, JS, 画像）
├── index.md             # トップページ
└── about.md             # その他のページ
```

### Front Matter

各ページやポストには YAML Front Matter を記述します:

```markdown
---
layout: post
title: "記事のタイトル"
date: 2024-01-01 12:00:00 +0900
categories: blog
tags: [github, pages]
---

記事の内容をここに記述します。
```

### GitHub Pages でサポートされるプラグイン

GitHub Pages の Jekyll ビルドでは、以下のような承認済みプラグインのみ使用可能です:

- `jekyll-coffeescript`
- `jekyll-feed`
- `jekyll-github-metadata`
- `jekyll-paginate`
- `jekyll-redirect-from`
- `jekyll-seo-tag`
- `jekyll-sitemap`

> サポートされていないプラグインを使用する場合は、GitHub Actions でのビルドに切り替えてください。

### Jekyll のビルドを無効化

Jekyll のビルドをスキップしたい場合（プレーンな HTML/CSS/JS サイト、または他のビルドツールを使用する場合）、リポジトリのルートに `.nojekyll` ファイルを作成します。

```bash
touch .nojekyll
git add .nojekyll
git commit -m "Disable Jekyll build"
```

## カスタム 404 ページ

リポジトリのルート（またはソースフォルダ）に `404.html` または `404.md` を作成すると、存在しないページにアクセスした際に表示されます。

### 404.html の例

```html
---
permalink: /404.html
---
<!DOCTYPE html>
<html>
<head>
  <title>Page Not Found</title>
</head>
<body>
  <h1>404 - ページが見つかりません</h1>
  <p>お探しのページは存在しません。</p>
  <a href="{{ site.baseurl }}/">ホームに戻る</a>
</body>
</html>
```

### 404.md の例（Jekyll 使用時）

```markdown
---
layout: default
title: "404 - Page Not Found"
permalink: /404.html
---

# ページが見つかりません

お探しのページは存在しないか、移動した可能性があります。

[ホームに戻る]({{ site.baseurl }}/)
```

> `permalink: /404.html` を Front Matter に指定することで、GitHub Pages が 404 エラー時にこのページを表示します。

## HTTPS の設定

GitHub Pages はデフォルトで HTTPS をサポートしています。

### github.io ドメインの場合

- `https://<username>.github.io` で自動的に HTTPS が有効
- HTTP から HTTPS への自動リダイレクトが可能

### カスタムドメインの場合

- DNS 設定完了後、**Settings** > **Pages** > **Enforce HTTPS** にチェック
- Let's Encrypt による証明書が自動的に発行される
- 証明書の発行に最大 24 時間かかる場合がある

## 参考リンク

- [Configuring a publishing source for your GitHub Pages site - GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [About Jekyll on GitHub Pages - GitHub Docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)

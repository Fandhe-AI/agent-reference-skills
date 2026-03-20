# Deploying

React Router v7 アプリのデプロイ方法。

## デプロイモード

1. **Fullstack Hosting** - サーバーレンダリングアプリ
2. **Static Hosting** - SPA（通常の React アプリと同様）

## 公式テンプレート

### Node.js + Docker（デフォルト）
```bash
npx create-react-router@latest --template remix-run/react-router-templates/default
```
対応: AWS ECS, Google Cloud Run, Azure, Digital Ocean, Fly.io, Railway

### Node.js + Docker + カスタムサーバー
```bash
npx create-react-router@latest --template remix-run/react-router-templates/node-custom-server
```
Express サーバーでより細かい制御が可能。

### Node.js + Docker + Postgres
```bash
npx create-react-router@latest --template remix-run/react-router-templates/node-postgres
```
Drizzle ORM + Postgres データベース付き。

## ホスティングプラットフォーム

| プラットフォーム | 公式サポート |
|----------------|------------|
| Vercel | ○ |
| Cloudflare Workers | ○ |
| Netlify | ○ |
| EdgeOne Pages | ○ |

## 注意点

- Docker ベーステンプレートは標準コンテナプラットフォームにデプロイ可能
- カスタムサーバーテンプレートで Express 設定をカスタマイズ
- 各テンプレートの README に従ってデプロイ

## 関連

- [installation](./installation.md)
- [rendering](./rendering.md)

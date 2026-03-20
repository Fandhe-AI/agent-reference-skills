# マイクロフロントエンド

Turborepo はローカル開発用のプロキシサーバーをビルトインで提供。複数アプリを単一エントリーポイント（デフォルト: `http://localhost:3024`）で統合できる。

## microfrontends.json

```json
{
  "$schema": "https://turborepo.dev/microfrontends/schema.json",
  "options": { "localProxyPort": 3024 },
  "applications": {
    "web": {
      "development": { "local": { "port": 3000 } }
    },
    "docs": {
      "packageName": "documentation",
      "development": {
        "local": { "port": 3001 },
        "fallback": "example.com"
      },
      "routing": [
        { "group": "documentation", "paths": ["/docs", "/docs/:path*"] }
      ]
    }
  }
}
```

## ポート設定

```json
{ "scripts": { "dev": "next dev --port $(turbo get-mfe-port)" } }
```

Vite: `TURBO_MFE_PORT` 環境変数を使用。

## フレームワーク別ベースパス設定

| フレームワーク | 設定ファイル | プロパティ |
|---|---|---|
| Next.js | `next.config.ts` | `basePath` |
| Nuxt / SvelteKit / Vite | `vite.config.ts` | `base` |

## ルーティングパスパターン

| パターン | 説明 |
|---|---|
| `/pricing` | 完全一致 |
| `/blog/:slug` | パラメータ（単一セグメント） |
| `/docs/:path*` | ワイルドカード（0以上） |
| `/api/:path+` | Plus（1以上） |

パスは大文字・小文字を区別する。

## 本番環境

Turborepo のプロキシはローカル開発専用。Vercel の場合は `@vercel/microfrontends` で本番対応。

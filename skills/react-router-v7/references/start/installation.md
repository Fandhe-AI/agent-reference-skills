# Installation

React Router v7 Framework Mode のインストールと初期セットアップ。

## クイックスタート

```bash
npx create-react-router@latest my-react-router-app
cd my-react-router-app
npm i
npm run dev
```

`http://localhost:5173` でアクセス可能。

## テンプレートベース

```bash
npx create-react-router@latest --template remix-run/react-router-templates/<template-name>
```

## 主要ファイル構成

| ファイル | 役割 |
|---------|------|
| `app/root.tsx` | ルートルートコンポーネント |
| `app/routes.ts` | ルート設定 |
| `react-router.config.ts` | フレームワーク設定 |
| `entry.client.tsx` | クライアントエントリーポイント |
| `entry.server.tsx` | サーバーエントリーポイント |

## 主要依存関係

- `react-router` (v7+)
- `react`, `react-dom`
- Vite（ビルドツール）

## 注意点

- Framework Mode は `react-router.config.ts` で設定
- Vite ベースのビルドシステム
- 3つのモード: Framework Mode / Data Mode / Declarative Mode

## 関連

- [routing](./routing.md)
- [route-module](./route-module.md)
- [rendering](./rendering.md)
- [react-router.config.ts](../conventions/react-router-config-ts.md)

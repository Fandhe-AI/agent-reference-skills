# Dynamic Base URL

許可リストベースのアプローチで複数ドメイン・プレビューデプロイメントに対応した動的ベース URL 解決ガイド。詳細なリファレンスは `concepts/dynamic-base-url.md` を参照。

## 概要

Better Auth の動的ベース URL 機能により、複数ホスト名（カスタムドメイン・プレビューデプロイ・ブランチ環境）でアプリケーションを安全に運用できる。リクエストの `x-forwarded-host` または `host` ヘッダーから現在のホスト名を抽出し、許可リストに対して検証してからリクエスト固有のベース URL を構築する。

## 主な設定オプション

| プロパティ | 説明 |
|---|---|
| `allowedHosts` | 許可するドメイン配列（ワイルドカード `*.vercel.app` 対応） |
| `protocol` | `http` / `https` / `auto`（デフォルト） |
| `fallback` | 許可リスト外のホスト用のフォールバック URL |
| `crossSubDomainCookies` | サブドメイン間での Cookie 共有 |

## 代表的なパターン

- Vercel ワイルドカードサポート
- 開発・本番でのプロトコル切り替え
- 複数地域の本番ドメイン
- クロスサブドメイン Cookie 共有

## Related

- [concepts/dynamic-base-url.md](../concepts/dynamic-base-url.md)
- [optimizing-for-performance.md](./optimizing-for-performance.md)

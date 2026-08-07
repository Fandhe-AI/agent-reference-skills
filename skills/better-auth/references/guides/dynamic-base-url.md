# Dynamic Base URL

許可リストベースのアプローチで複数ドメイン・プレビューデプロイメントに対応した動的ベース URL 解決ガイド。公式ドキュメントでは本ガイドが唯一の一次情報源（`concepts/dynamic-base-url` は 2026-08 時点で公式ナビゲーションから削除・404）。設定項目の詳細は `concepts/dynamic-base-url.md` にも記載がある。

Better Auth の動的ベース URL 機能により、複数ホスト名（カスタムドメイン・プレビューデプロイ・ブランチ環境）でアプリケーションを安全に運用できる。リクエストの `x-forwarded-host` または `host` ヘッダーから現在のホスト名を抽出し、許可リストに対して検証してからリクエスト固有のベース URL を構築する。

## Signature / Usage

代表的なパターン:

- Vercel ワイルドカードサポート
- 開発・本番でのプロトコル切り替え
- 複数地域の本番ドメイン
- クロスサブドメイン Cookie 共有

## Options / Props

| プロパティ | Type | Default | 説明 |
| --- | --- | --- | --- |
| `allowedHosts` | string[] | — | 許可するドメイン配列（ワイルドカード `*.vercel.app` 対応） |
| `protocol` | `"http"` \| `"https"` \| `"auto"` | `"auto"` | 使用プロトコル |
| `fallback` | string | — | 許可リスト外のホスト用のフォールバック URL |
| `crossSubDomainCookies` | boolean | — | サブドメイン間での Cookie 共有 |

## Related

- [Dynamic Base URL (concepts)](../concepts/dynamic-base-url.md)
- [Optimizing for Performance](./optimizing-for-performance.md)

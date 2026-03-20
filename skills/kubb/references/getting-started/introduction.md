# Introduction

Kubb はプラグインベースのコードジェネレーターで、OpenAPI/Swagger 仕様から本番環境で使えるTypeScriptコードを自動生成する。

## 概要

フロントエンド開発者が APIクライアントを手動で保守すると、バックエンドAPIの変更時に型の陳腐化・クライアント関数の更新漏れ・フロントエンドとバックエンドの不整合が生じる。Kubb はOpenAPI仕様を唯一の真実源として読み込み、単一コマンドで完全な本番対応コードを生成することでこの問題を解決する。

## 生成できるコード

| カテゴリ | 内容 |
|---------|------|
| TypeScript Types | API仕様に対応したインターフェース・型・スキーマ |
| HTTP Clients | Axios / Fetch / カスタムHTTPクライアントラッパー（型安全） |
| Data Fetching Hooks | React Query, Vue Query, Solid Query, Svelte Query, SWR |
| Validation | Zodスキーマ（Zod v4サポート済み） |
| Mock Data | Faker.jsジェネレーターおよびMSW（Mock Service Worker）ハンドラー |
| Testing | Cypressコマンド（E2Eテスト用ユーティリティ） |
| Documentation | ReDoc連携によるAPIドキュメント |
| AI Integration | AIアシスタント向けMCP（Model Context Protocol）サーバー |

## 対応OpenAPIバージョン

- OpenAPI 2.0（Swagger）
- OpenAPI 3.0
- OpenAPI 3.1

## システム要件

- **Node.js:** 20以上

## クイックスタート

```bash
npx kubb init
npx kubb generate
```

`init` コマンドは以下を実行する:

1. `package.json` がなければ作成
2. OpenAPI/Swagger ファイルの場所を対話形式で確認
3. 使用プラグインを選択（TypeScript, React Query, Zod など）
4. 依存パッケージをインストール
5. `kubb.config.ts` を生成

## プラグインエコシステム

### コアプラグイン

| パッケージ | 用途 |
|-----------|------|
| `@kubb/plugin-oas` | OpenAS仕様のパース（多くのプラグインの依存） |
| `@kubb/plugin-ts` | TypeScript型・インターフェース生成 |
| `@kubb/plugin-client` | HTTPクライアント生成 |
| `@kubb/plugin-zod` | Zodスキーマ生成 |
| `@kubb/plugin-react-query` | React Query フック生成 |
| `@kubb/plugin-vue-query` | Vue Query フック生成 |
| `@kubb/plugin-solid-query` | Solid Query フック生成 |
| `@kubb/plugin-svelte-query` | Svelte Query フック生成 |
| `@kubb/plugin-swr` | SWR フック生成 |
| `@kubb/plugin-faker` | Faker.jsモックデータ生成 |
| `@kubb/plugin-msw` | MSWハンドラー生成 |
| `@kubb/plugin-cypress` | Cypressテストユーティリティ生成 |
| `@kubb/plugin-mcp` | MCPサーバー生成 |
| `@kubb/plugin-redoc` | ReDocドキュメント生成 |

### ビルドツール

| パッケージ | 用途 |
|-----------|------|
| `@kubb/core` | コアライブラリ（プログラマティック利用） |
| `@kubb/cli` | CLIツール |
| `@kubb/mcp` | MCPサーバー |
| `unplugin-kubb` | Vite/Webpack/Rollupプラグイン |

## Kubbを選ぶ理由

- **単一の真実源**: OpenAPI仕様のみを管理
- **プラグインベース**: 必要な生成物だけを選択
- **ゼロメンテナンス**: API変更時は再生成するだけ
- **コンパイル時型安全**: ランタイムエラーを排除
- **拡張可能**: カスタムプラグインで任意の生成ロジックを追加

## FAQ

**JavaScriptプロジェクトでも使えるか?**
Kubbは TypeScriptファイルを生成するが、JavaScriptとして利用するかトランスパイルして使用可能。

**GraphQLはサポートされているか?**
No。KubbはOpenAPI/Swagger REST APIのみを対象とする。

**生成コードの更新方法は?**
`npx kubb generate` を再実行するだけで最新のAPI変更が反映される。

**カスタマイズはできるか?**
はい。ジェネレーター、トランスフォーマー、カスタムプラグインで対応可能。

**本番環境で使えるか?**
はい。広く本番環境で利用されており、TypeScriptのベストプラクティスに従った型安全なコードを生成する。

## コミュニティ・サポート

- **Discord:** discord.gg/shfBFeczrm
- **GitHub:** github.com/kubb-labs/kubb

## Related

- [installation.md](./installation.md)
- [quick-start.md](./quick-start.md)
- [configure.md](./configure.md)

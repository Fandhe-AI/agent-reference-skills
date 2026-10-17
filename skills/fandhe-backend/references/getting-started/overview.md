# fandhe-backend 概要

AI によるセキュリティ脆弱性発見リスクに備えて Rust で新規構築された、軽量・高速・高並行なバックエンドフレームワーク。axum 級の性能を目標に、最小コア + Cargo feature 駆動プラグイン設計で WebSocket / GraphQL / WebRTC / OpenAPI 自動生成 / 可観測性などを段階的に拡張できる。

## Usage

```bash
cargo add fandhe-backend-core fandhe-backend-http fandhe-backend-routes
cargo add tokio --features rt-multi-thread,macros
```

## Notes

- 2 つの核となる原則
  - **pay-for-what-you-use**: feature を無効化すると、その依存・コード・`unsafe`・バイナリサイズ増をすべてゼロにする。使わない機能のコストを一切払わせない設計
  - **AI ファースト保守性**: doc test・網羅テスト・CI ガードレールを整備し、AI エージェントが安全に保守できる状態を保つ
- 全体構成: 公開対象は 15 クレート（コア 3 + プラグイン 12）で、すべて v0.5.0（2026-10-16、lockstep）。通常は `fandhe-backend-core` の Cargo feature 経由で利用し、個別プラグインクレートを直接依存に追加する必要はない（Gate 型の `fandhe-backend-plugin-hub-wiring` / `jwt` / `csrf` は独立クレートとして直接利用する）
- ドキュメントサイトの構成
  - Getting Started: crates.io からの依存追加〜最小サーバ起動〜動作確認までの最短手順
  - Guides: feature 構成別サンプル・チュートリアル・拡張点自作・ストリーミング・graceful shutdown など目的別ガイド
  - Examples: `examples/with-*` 4 種（cors / graphql / interceptor / websocket）と `templates/app` への独立サンプル入口
  - API Reference: `Server` / `BoundServer` / `Handler` から各クレート・プラグイン設定 API までの契約
- 原本 `site/index.md` は `examples/with-*` を 3 種と書いているが、e23b9a2 のツリーと `site/examples.md` は 4 種（`with-interceptor` を含む）

## Related

- [crates.md](./crates.md)（クレート一覧の詳細）
- [features.md](./features.md)（feature フラグの詳細）
- [installation.md](./installation.md)（依存追加手順）
- [minimal-server.md](./minimal-server.md)（最小構成のサーバコード例）

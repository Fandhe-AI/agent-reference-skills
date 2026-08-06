# fandhe-backend 概要

AI によるセキュリティ脆弱性発見リスクに備えて Rust で新規構築された、軽量・高速・高並行なバックエンドフレームワーク。axum 級の性能を目標に、最小コア + Cargo feature 駆動プラグイン設計で WebSocket / GraphQL / WebRTC / OpenAPI 自動生成 / 可観測性などを段階的に拡張できる。

## 2 つの核となる原則

- **pay-for-what-you-use**: feature を無効化すると、その依存・コード・`unsafe`・バイナリサイズ増をすべてゼロにする。使わない機能のコストを一切払わせない設計
- **AI ファースト保守性**: doc test・網羅テスト・CI ガードレールを整備し、AI エージェントが安全に保守できる状態を保つ

## 全体構成

公開対象は 13 クレート（コア 3 + プラグイン 10）で、すべて v0.3.0（2026-08-05 公開、lockstep）。通常は `fandhe-backend-core` の Cargo feature 経由で利用し、個別プラグインクレートを直接依存に追加する必要はない（`fandhe-backend-plugin-hub-wiring` のみ独立クレートとして直接利用する）。

- クレート一覧の詳細は [crates.md](./crates.md) を参照
- feature フラグの詳細は [features.md](./features.md) を参照
- 依存追加手順は [installation.md](./installation.md) を参照
- 最小構成のサーバコード例は [minimal-server.md](./minimal-server.md) を参照

## ドキュメントサイトの構成

- Getting Started: crates.io からの依存追加〜最小サーバ起動〜動作確認までの最短手順
- Guides: feature 構成別サンプル・チュートリアル・拡張点自作・ストリーミング・graceful shutdown など目的別ガイド
- Examples: `examples/with-*` 3 種と `templates/app` への独立サンプル入口
- API Reference: `Server` / `BoundServer` / `Handler` から各クレート・プラグイン設定 API までの契約

## Related

- [crates.md](./crates.md)
- [features.md](./features.md)
- [installation.md](./installation.md)
- [minimal-server.md](./minimal-server.md)

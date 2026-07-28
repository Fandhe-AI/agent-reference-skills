# fandhe-frontend

Rust 製フロントエンドフレームワーク。AI 時代のセキュリティリスク低減を目的に、テキスト補間の既定エスケープ・`unsafe` の排除・依存クレート数の上限管理を製品仕様として固定する。プレーンな HTML/JavaScript/CSS を尊重しながら SSR・SPA・SSG・ビュー遷移を単一フレームワークで網羅し、単一実行ファイルでのデプロイ（Docker 想定）まで見据える。

## Notes

- 既定エスケープ: テキスト補間は必ずエスケープを経由し、迂回は `raw_html()` 等の明示的なオプトイン API のみに限定される
- `unsafe` の排除: 描画コア・状態管理コア（`core` / `interactive`）は `#![forbid(unsafe_code)]` で `unsafe` を一切使用しない
- 依存最小: 標準サーバー構成で依存パッケージ 60 件以内・深さ 6 以内に収め、サプライチェーンの脅威面を抑制する
- プレーン HTML/JS/CSS の尊重: 既存の静的ページへの部分埋め込みからフル機能構成までグラデーションを持つ
- SSR/SPA/SSG/ビュー遷移を網羅: モードを問わず同じコンポーネント実装を再利用できる
- 目的別の入口: Getting Started（`fw new` からの最短経路）、Guides（目的別の実践ガイド）、API Reference（公開 API の仕様）の 3 つ

## Related

- [クイックスタート](./quickstart.md)
- [ガイド一覧](../guides/README.md)

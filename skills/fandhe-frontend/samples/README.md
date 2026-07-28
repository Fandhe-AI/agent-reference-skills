# samples

| Name | Description | Path |
| --- | --- | --- |
| SSR page with Loader, respond_with, and Router | `Loader` trait を自作実装し、`respond_with` で一覧・詳細画面の SSR 応答を組み立て、独自ルートは `Router` で直接処理する | [ssr-routing.md](./ssr-routing.md) |
| Static site generation with generate_pages | `generate_pages` に (リクエストパス, `Node`) 列を渡し、静的ブログサイトを `dist/` へ書き出す | [ssg-blog.md](./ssg-blog.md) |
| Single-binary distribution server with route_request | `fandhe-frontend-dist-server` を通常の外部依存として使い、`route_request` を薄い hyper トランスポート層でラップして単一バイナリ配布する | [dist-server-docker.md](./dist-server-docker.md) |
| Client-side state machine with dispatch and hydration | `AppState` に対して `dispatch` でアクションを適用し、`render_for_hydration` でハイドレーション属性付きの `Node` を組み立てる | [interactive-state-machine.md](./interactive-state-machine.md) |
| Headless UI component anatomy (Dialog) | `fandhe-frontend-pre-styled-ui` の headless ラッパー経由で、`data-scope`/`data-part` の anatomy と WAI-ARIA 属性を持つ静的 SSR マークアップを組み立てる | [headless-ui-anatomy.md](./headless-ui-anatomy.md) |
| Pre-styled component variants and StyleSheet aggregation | variant/size/colorPalette を Rust enum で型安全に指定する styled 部品と、`StyleSheet` によるテーマ + recipe CSS の集約・書き出し | [pre-styled-ui-theming.md](./pre-styled-ui-theming.md) |

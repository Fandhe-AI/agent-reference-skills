# guides

| Name | Description | Path |
|------|-------------|------|
| fandhe-animation / fandhe-frontend-animation API ガイド | `fandhe-animation`（演算コア）と `fandhe-frontend-animation`（Web アダプタ）を Rust コードから直接呼び出す API | [animation-core.md](./animation-core.md) |
| アニメーション機能ガイド | 宣言的な `data-*` 属性で動くアニメーション機能を機能別に示す（pre-styled-ui recipe → `data-*` / CSS → wasm-full 配線） | [animation.md](./animation.md) |
| コンポーネント記述ガイド（`fandhe-frontend-core`） | マクロ DSL に依存せず、関数・enum・`Vec` でノード木を組み立てる純 Rust 方式のコンポーネント記述 | [component-authoring.md](./component-authoring.md) |
| デプロイガイド | 静的出力 SSG / 単一実行ファイルの配布形態と、Vercel への静的配置・Container Images による SSR デプロイ、Basic 認証 | [deployment.md](./deployment.md) |
| docs サイト生成器の外部リポジトリ利用ガイド | docs サイト生成器 `docs-site` を fandhe-frontend 以外のリポジトリで使う導入・`nav.toml`・GitHub Pages 公開手順 | [docs-site-external-repos.md](./docs-site-external-repos.md) |
| 最小埋め込みガイド | 既存の静的 HTML の `<div>` へコンポーネントを部分的にマウントする手順（SSR 構成と描画関数を共有） | [embedding-guide.md](./embedding-guide.md) |
| JS ゼロ SSG 利用ガイド（`fandhe-frontend-server`） | クライアント JavaScript を読み込まない JS ゼロ SSG での制約（開閉状態がビルド時の初期値に固定）と代替パターン | [no-js-ssg.md](./no-js-ssg.md) |
| NPM アセットビルドパイプライン | `--ignore-scripts` を既定としたサプライチェーン対策付きの、ビルド時静的アセット取り込み用 NPM パイプライン | [npm-asset-build.md](./npm-asset-build.md) |
| pre-styled-ui motion feature ガイド | `fandhe-frontend-pre-styled-ui` の Cargo feature `motion`（既定 off）の opt-in アニメーション API と無効時のゼロコスト保証 | [pre-styled-ui-motion-feature.md](./pre-styled-ui-motion-feature.md) |
| SSR 組み込みガイド | 既存サーバー（fandhe-backend など）のリクエストハンドラから `Document` で HTML を生成して返す方法 | [ssr-embedding.md](./ssr-embedding.md) |
| View Transitions | クロスドキュメント・SPA 内の両方でビュー遷移を有効化する仕組み（遷移の種類ごとに異なる標準 API を使用） | [view-transitions.md](./view-transitions.md) |
| wasm-full feature 選択ガイド | `fandhe-frontend-wasm-full` の 2 軸 Cargo feature（配線群別・scope 別、いずれも既定 on）の選択方法と最小構成 7 feature | [wasm-full-features.md](./wasm-full-features.md) |

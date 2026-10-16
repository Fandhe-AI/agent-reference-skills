# guides

| Name | Description | Path |
|------|-------------|------|
| fandhe-animation / fandhe-frontend-animation API ガイド | `fandhe-animation`（演算コア）と `fandhe-frontend-animation`（Web アダプタ）を Rust から直接呼び出す… | [animation-core.md](./animation-core.md) |
| アニメーション機能ガイド | 宣言的な `data-*` 属性を書くだけで動くアニメーション機能の使い方を、機能別に示す… | [animation.md](./animation.md) |
| コンポーネント記述ガイド（`fandhe-frontend-core`） | `fandhe-frontend-core` はマクロ DSL に依存せず、通常の Rust の関数・enum・`Vec` でノード木を組み立てる… | [component-authoring.md](./component-authoring.md) |
| デプロイガイド | fandhe-frontend の配布形態（静的出力 SSG / 単一実行ファイル）と、Vercel へのデプロイ方式を扱う… | [deployment.md](./deployment.md) |
| docs サイト生成器の外部リポジトリ利用ガイド | fandhe-frontend の docs サイト生成器（`docs-site`）を、fandhe-frontend 以外のリポジトリで使うための手順… | [docs-site-external-repos.md](./docs-site-external-repos.md) |
| 最小埋め込みガイド | 既存の静的 HTML ページの `<div>` へコンポーネントを部分的にマウントする手順… | [embedding-guide.md](./embedding-guide.md) |
| JS ゼロ SSG 利用ガイド（`fandhe-frontend-server`） | クライアント JavaScript を一切読み込まない静的サイト構成での制約と代替パターンを扱うガイド… | [no-js-ssg.md](./no-js-ssg.md) |
| NPM アセットビルドパイプライン | `--ignore-scripts` を既定としたサプライチェーン対策付きの、NPM 互換の静的アセット取り込みパイプライン… | [npm-asset-build.md](./npm-asset-build.md) |
| pre-styled-ui motion feature ガイド | `fandhe-frontend-pre-styled-ui` の Cargo feature `motion` で使える opt-in アニメーション API… | [pre-styled-ui-motion-feature.md](./pre-styled-ui-motion-feature.md) |
| SSR 組み込みガイド | 既存のサーバー（fandhe-backend 等）のリクエストハンドラから、fandhe-frontend の描画で HTML を返す方法… | [ssr-embedding.md](./ssr-embedding.md) |
| View Transitions | クロスドキュメント・SPA 内のビュー遷移を有効化する仕組み… | [view-transitions.md](./view-transitions.md) |
| wasm-full feature 選択ガイド | `fandhe-frontend-wasm-full` の 2 軸 Cargo feature（配線群別・scope 別）と最小構成選択ガイド… | [wasm-full-features.md](./wasm-full-features.md) |

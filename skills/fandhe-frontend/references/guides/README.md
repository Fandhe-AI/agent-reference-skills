# guides

| Name | Description | Path |
|------|-------------|------|
| animation | 宣言的な `data-*` 属性で動くアニメーション機能（presence・keyframes・stagger・scroll-driven・in-view・gesture・cursor・View Transitions・layout FLIP・…） | [animation.md](./animation.md) |
| animation-core | `fandhe-animation` コアと `fandhe-frontend-animation` Web アダプタの Rust API ガイド（`data-*` 属性機能は対象外） | [animation-core.md](./animation-core.md) |
| component-authoring | マクロ DSL に依存しない純 Rust 方式でのコンポーネント記述（`el`/`text`/`raw_html`/`render`） | [component-authoring.md](./component-authoring.md) |
| deployment | fandhe-frontend の配布形態と Vercel へのデプロイ方式（SSG・SSR・Deployment Protection・Basic 認証） | [deployment.md](./deployment.md) |
| docs-site-external-repos | `docs-site` 生成器を外部リポジトリで使う手順（導入、`--no-page-sections`、`nav.toml`、ブランドキー、GitHub Pages 公開） | [docs-site-external-repos.md](./docs-site-external-repos.md) |
| embedding-guide | 既存 HTML ページの `<div>` へのコンポーネント最小埋め込み（`mount_csr`）とフルスタック構成への移行 | [embedding-guide.md](./embedding-guide.md) |
| no-js-ssg | JS ゼロ SSG での静的サイト構成（`generate_assets`/`<details>`/`<summary>`） | [no-js-ssg.md](./no-js-ssg.md) |
| npm-asset-build | `--ignore-scripts` 既定の NPM 静的アセット取り込みパイプライン（`install.sh`/`check_static_only.py`） | [npm-asset-build.md](./npm-asset-build.md) |
| pre-styled-ui-motion-feature | `pre-styled-ui` feature `motion` の opt-in アニメーション API とゼロコスト保証 | [pre-styled-ui-motion-feature.md](./pre-styled-ui-motion-feature.md) |
| view-transitions | クロスドキュメント・SPA 内のビュー遷移有効化（`@view-transition` at-rule / `withViewTransition`） | [view-transitions.md](./view-transitions.md) |
| wasm-full-features | `fandhe-frontend-wasm-full` の Cargo feature 2 軸（配線群別・scope 別）と最小構成選択ガイド | [wasm-full-features.md](./wasm-full-features.md) |

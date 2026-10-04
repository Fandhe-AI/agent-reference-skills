# samples

| Name | Description | Path |
| --- | --- | --- |
| Single-binary distribution server with route_request | `fandhe-frontend-dist-server` を通常の外部依存として使い、`route_request` を薄い hyper トランスポート層でラップして単一バイナリ配布する | [dist-server-docker.md](./dist-server-docker.md) |
| Headless UI anatomy with pre-styled variants and theme token overrides | `fandhe-frontend-pre-styled-ui` の headless ラッパー（Dialog/Menu/Select/Popover/Tooltip/NavigationMenu/Menubar/Tabs/Accordion）と styled 部品（Button/Badge/Card/Alert/Spinner/Switch/RadioGroup/Avatar）を横断し、`Theme::upsert_color`/`upsert_space` でテーマトークンをカスタマイズして `StyleSheet` へ集約する | [headless-pre-styled-ui.md](./headless-pre-styled-ui.md) |
| Client-side state machine with View Transitions and headless-ui overlays | `AppState`/`NavigationMenu`/`Menubar` に対して `dispatch` でアクションを適用し、`@view-transition` を含む `page_shell` へ `NavigationMenu` の headless-ui オーバーレイを配線した SSR ページを書き出す | [interactive-view-transitions.md](./interactive-view-transitions.md) |
| Static site generation with generate_pages | `generate_pages` に (リクエストパス, `Node`) 列を渡し、静的ブログサイトを `dist/` へ書き出す | [ssg-blog.md](./ssg-blog.md) |
| SSR page with Loader, respond_with, and Router | `Loader` trait を自作実装し、`respond_with` で一覧・詳細画面の SSR 応答を組み立て、独自ルートは `Router` で直接処理する | [ssr-routing.md](./ssr-routing.md) |
| Vercel Build Output API with generate_pages | `generate_pages` で `.vercel/output/static/` へ HTML を、`generate_assets` で `config.json`（Build Output API v3）と `404.html` を書き出し、`vercel deploy --prebuilt` で配置する | [vercel-ssg.md](./vercel-ssg.md) |
| Request-time SSR on Vercel Container Images | `fandhe-frontend-dist-server` の `route_request` を hyper でラップし、`PORT` 環境変数による bind 先解決と GET / HEAD 限定の応答を行う。Vercel Container Images 上でリクエスト時 SSR を実行する | [vercel-ssr.md](./vercel-ssr.md) |
| Wireframe UI showcase page with wireframe_css | `fandhe-frontend-wireframe-ui`（ローファイ・モノクロのワイヤーフレーム部品）で 1 ページを組み立て、`dist/index.html` と `wireframe_css()` の出力を別ファイル `dist/assets/wireframe.css` へ書き出す | [wireframe-ui.md](./wireframe-ui.md) |

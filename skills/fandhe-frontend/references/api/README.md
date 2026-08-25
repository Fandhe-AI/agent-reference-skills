# api

| Name | Description | Path |
| --- | --- | --- |
| fandhe-frontend-app API | ページ組み立て・共通レイアウト・Loader trait を提供するアプリケーション API | [app-api.md](./app-api.md) |
| 束縛 (binding) API | テキスト・属性・class の状態束縛マーカーを SSR へ埋め込む API | [binding-api.md](./binding-api.md) |
| コンポーネント記述 API | `fandhe-frontend-core` のマクロ非依存プレーン Rust コンポーネント記述 API（Node/el/text/raw_html/render） | [component-api.md](./component-api.md) |
| fandhe-frontend-headless-ui API | unstyled UI コンポーネント層の公開 API（anatomy/state/aria/date/color） | [headless-ui-api.md](./headless-ui-api.md) |
| hydrate() API | `fandhe-frontend-wasm-client` のハイドレーション・CSR マウント API | [hydration-api.md](./hydration-api.md) |
| ハイドレーション状態フォーマット | DOM 属性へ状態を注入するエンコード/デコードフォーマット仕様 | [hydration-state-format.md](./hydration-state-format.md) |
| 状態管理 API | `fandhe-frontend-interactive` の Component/Hydrate トレイトと dispatch/codec | [interactive-api.md](./interactive-api.md) |
| keyed_list API | リスト構造変更（挿入・削除・並び替え）を表現する API | [keyed-list-api.md](./keyed-list-api.md) |
| pre-styled-ui slot recipe API | slot を横断する variant を定義する型安全な recipe API（SlotRecipe） | [pre-styled-recipe-api.md](./pre-styled-recipe-api.md) |
| fandhe-frontend-pre-styled-ui API | headless-ui 上のテーマ・variant・静的 CSS を重ねた styled 部品 API | [pre-styled-ui-api.md](./pre-styled-ui-api.md) |
| ルーター パスマッチング | `fandhe_frontend_app::router::Router` の v1 パスマッチング仕様 | [router-path-matching.md](./router-path-matching.md) |
| fandhe-frontend-server API（ssg モジュール） | generate / generate_pages / generate_assets による静的サイト生成（SSG）API | [server-api.md](./server-api.md) |

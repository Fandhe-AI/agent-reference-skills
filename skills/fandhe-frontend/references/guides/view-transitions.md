# View Transitions

クロスドキュメント・SPA 内両方のビュー遷移を有効化する仕組み。遷移の種類によって異なる標準 API を使い、標準テンプレートには既定で同梱される。

## Signature / Usage

```css
/* クロスドキュメントナビゲーション（SSR/SSG のページ遷移）の有効化。JS 0 行 */
@view-transition {
  navigation: auto;
}
```

```js
// 同一文書内（SPA 的）更新（非 WASM 埋め込み用）
// static/view-transitions.js の withViewTransition()
withViewTransition(updateCallback);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `@view-transition { navigation: auto; }` | CSS at-rule | クロスドキュメントナビゲーション有効化。`fandhe_frontend_app::page_shell()` / `templates/embed/embed.html` に既定同梱 |
| `withViewTransition(updateCallback)` | JS function | `document.startViewTransition()` の機能検出 + graceful degradation を行う薄いユーティリティ（`static/view-transitions.js`）。呼び出し側が明示的に呼ぶ |
| `wiring::with_view_transition` | Rust (wasm-bindgen) | WASM（`wasm-full`）の SPA 内遷移。`nav::start_router` 起動後は自動的にラップされ、利用者コードからの明示的呼び出し不要（`crates/wasm-full/src/nav.rs`） |

## Notes

- `<meta name="view-transition" content="same-origin">` は View Transitions API の実験段階で提案された旧構文で廃止済み。標準化された CSS の `@view-transition` at-rule を採用している
- 標準テンプレートへの既定同梱: フルスタック標準（SSR/SSG）は `page_shell()` が `<head>` に at-rule を出力。最小埋め込み標準は `templates/embed/embed.html` の `<head>` に同一の at-rule を明示配置（利用者がコピー後に削除してもよい）
- `withViewTransition()`（JS）と `with_view_transition`（Rust/wasm-bindgen）は同一ページで共存する想定はない。選択は WASM を使うか（`wasm-full`）／使わないか（最小埋め込み・`wasm-client`）という既存のクレート選択に従う
- `@view-transition` at-rule は非対応ブラウザでは単に無視され、通常のナビゲーションにフォールバックする（JS 分岐・feature detection 不要）
- at-rule の内容はユーザー入力を一切含まない固定リテラルで、`page_shell()` は `el`/`text`（既定エスケープ経路）経由で `<style>` 子ノードとして出力する。`raw_html()` 等のエスケープ迂回 API は使用していない

## Related

- [コンポーネント記述ガイド](./component-authoring.md)
- [最小埋め込みガイド](./embedding-guide.md)

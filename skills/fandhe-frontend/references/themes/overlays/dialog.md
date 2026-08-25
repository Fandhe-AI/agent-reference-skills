# Dialog

画面全体を覆うモーダルダイアログ（styled）。`role="dialog"`/`role="alertdialog"` の切り替え、`size` variant（Sm/Md/Lg）を持つ。フォーカストラップ・Escape キー閉鎖・外側クリック閉鎖は headless 層と同じくスコープ外。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::dialog::{
    root, trigger, backdrop, positioner, content, title, description, close_trigger, stylesheet,
    ContentIds, DialogRole,
};
use fandhe_frontend_pre_styled_ui::dialog::OpenState;
use fandhe_frontend_pre_styled_ui::Size;

let css = stylesheet();
let ids = ContentIds { id: Some("dlg-1"), labelledby: Some("dlg-1-title"), describedby: Some("dlg-1-desc") };
let node = root(Size::Md, OpenState::Open, vec![], vec![
    trigger(OpenState::Closed, Some("dlg-1"), vec![], vec![]),
    backdrop(OpenState::Open, vec![], vec![]),
    positioner(OpenState::Open, vec![], vec![
        content(OpenState::Open, DialogRole::Dialog, true, ids, vec![], vec![
            title(Some("dlg-1-title"), vec![], vec![]),
            description(Some("dlg-1-desc"), vec![], vec![]),
            close_trigger(vec![], vec![]),
        ]),
    ]),
]);
```

`Dialog` 状態機械（headless）はあえて再エクスポートしない。`size` variant クラスを付与しない未スタイル描画を誘発するため、状態管理・hydration が必要な場合は `fandhe_frontend_headless_ui::dialog::Dialog` を直接 import する。

## Anatomy

```
root
  ├─ trigger
  └─ positioner（backdrop は root の兄弟）
      └─ content
          ├─ title
          ├─ description
          └─ close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(size, state, attrs, children)` | `Size`, `OpenState` | `Size::Md` | `size` に応じたクラスを付与する唯一のパーツ。実体は headless `root` へ委譲 |
| `trigger(state, controls, attrs, children)` | `OpenState`, `controls: Option<&str>` | `controls: None` | `type="button"`/`aria-haspopup="dialog"` 固定。`controls` が `Some` のとき `aria-controls` を `content` の `id` と対にする |
| `backdrop(state, attrs, children)` / `positioner(state, attrs, children)` | `OpenState` | — | closed 時に `hidden`/非表示化 |
| `content(state, role_kind, modal, ids, attrs, children)` | `OpenState`, `DialogRole`, `modal: bool`, `ids: ContentIds` | `role_kind: DialogRole::Dialog` | `role`/`aria-modal`/closed 時の hidden を付与。`ContentIds` が `Some` のフィールドから `id`/`aria-labelledby`/`aria-describedby` を出力 |
| `title(id, attrs, children)` / `description(id, attrs, children)` | `id: Option<&str>` | `id: None` | `id` が `Some` のとき `content` の `labelledby`/`describedby` と対にする |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `stylesheet()` | — | — | 既定 CSS 全量を返す。`size` variant は root スコープの CSS custom property（`--fandhe-dialog-content-padding` 等）で `content`/`title` へ伝播 |

`ContentIds<'a>`（`dialog::ContentIds`）: `{ id: Option<&'a str>, labelledby: Option<&'a str>, describedby: Option<&'a str> }`。`content` の引数が 8 個になる clippy 対策で `id`/`labelledby`/`describedby` を束ねた構造体（`id` は `trigger` の `controls` と対応、`labelledby`/`describedby` はそれぞれ `title`/`description` の `id` と対応）。

`DialogRole`（`dialog::DialogRole`）: `Dialog`（`role="dialog"`）\| `Alertdialog`（`role="alertdialog"`）。WAI-ARIA の固定語彙のみを受け付ける。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- headless 自由関数 `root` と headless `Dialog` 型は再エクスポートしない（`size` クラス非付与の事故防止）
- `backdrop`/`positioner` は `z-index: 1000`/`1001` で最前面固定。closed 時の `positioner[hidden]` は `display: none` を明示上書き
- `color-palette` 軸は持たない
- `trigger`/`backdrop`/`positioner`/`content`/`title`/`description`/`close_trigger` は headless `dialog` の同名関数をそのまま再エクスポートしたものではなく、`state`/`ids`/`role_kind`/`modal` 等の引数を取る styled 側固有の実装（`state` を明示的に受け取る点は headless 版と共通）

## Related

- [primitives/overlays/dialog](../../primitives/overlays/dialog.md)
- [drawer](./drawer.md)

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
let state = OpenState::Open; // 全 part で共有する単一の state（trigger の aria-expanded とも整合させる）
let ids = ContentIds { id: Some("dlg-1"), labelledby: Some("dlg-1-title"), describedby: Some("dlg-1-desc") };
let node = root(Size::Md, state, vec![], vec![
    trigger(state, Some("dlg-1"), vec![], vec![]),
    backdrop(state, vec![], vec![]),
    positioner(state, vec![], vec![
        content(state, DialogRole::Dialog, true, ids, vec![], vec![
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
| `root(size, state, attrs, children)` | `Size`, `OpenState` | `Size::Md` | 本モジュール（`pre-styled-ui::dialog`）で再定義される唯一のパーツ。`size` に応じたクラスを付与し、実体は headless `root` へ委譲 |
| `trigger(state, controls, attrs, children)` | `OpenState`, `controls: Option<&str>` | `controls: None` | headless `dialog::trigger` の選択的 `pub use` 再エクスポート（本モジュールでの再定義ではない）。`type="button"`/`aria-haspopup="dialog"` 固定。`controls` が `Some` のとき `aria-controls` を `content` の `id` と対にする |
| `backdrop(state, attrs, children)` / `positioner(state, attrs, children)` | `OpenState` | — | headless `dialog` の同名関数の選択的 `pub use` 再エクスポート。closed 時に `hidden`/非表示化 |
| `content(state, role_kind, modal, ids, attrs, children)` | `OpenState`, `DialogRole`, `modal: bool`, `ids: ContentIds` | `role_kind: DialogRole::Dialog` | headless `dialog::content` の選択的 `pub use` 再エクスポート。`role_kind`/`modal`/`ids` は headless 側がもともと取る引数（styled 側の追加ではない）。`role`/`aria-modal`/closed 時の hidden を付与。`ContentIds` が `Some` のフィールドから `id`/`aria-labelledby`/`aria-describedby` を出力 |
| `title(id, attrs, children)` / `description(id, attrs, children)` | `id: Option<&str>` | `id: None` | headless `dialog` の同名関数の選択的 `pub use` 再エクスポート。`id` が `Some` のとき `content` の `labelledby`/`describedby` と対にする |
| `close_trigger(attrs, children)` | — | — | headless `dialog::close_trigger` の選択的 `pub use` 再エクスポート。`type="button"` 固定 |
| `stylesheet()` | — | — | 既定 CSS 全量を返す。`size` variant は root スコープの CSS custom property（`--fandhe-dialog-content-padding` 等）で `content`/`title` へ伝播 |

`ContentIds<'a>`（`dialog::ContentIds`）: `{ id: Option<&'a str>, labelledby: Option<&'a str>, describedby: Option<&'a str> }`。`content` の引数が 8 個になる clippy 対策で `id`/`labelledby`/`describedby` を束ねた構造体（`id` は `trigger` の `controls` と対応、`labelledby`/`describedby` はそれぞれ `title`/`description` の `id` と対応）。

`DialogRole`（`dialog::DialogRole`）: `Dialog`（`role="dialog"`）\| `Alertdialog`（`role="alertdialog"`）。WAI-ARIA の固定語彙のみを受け付ける。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- headless 自由関数 `root` と headless `Dialog` 型は再エクスポートしない（`size` クラス非付与の事故防止）
- `backdrop`/`positioner` は `z-index: 1000`/`1001` で最前面固定。closed 時の `positioner[hidden]` は `display: none` を明示上書き
- `color-palette` 軸は持たない
- 本モジュール（`pre-styled-ui::dialog`）で再定義される styled 固有パーツは `root`（`size` クラス付与のため）のみ。`trigger`/`backdrop`/`positioner`/`content`/`title`/`description`/`close_trigger` は選択的 `pub use fandhe_frontend_headless_ui::dialog::{...}` による headless の同名関数のそのままの再エクスポートで、`state`/`ids`/`role_kind`/`modal`/`id` はいずれも headless 側の元々のシグネチャが持つ引数（styled 側が追加したものではない）

## Related

- [primitives/overlays/dialog](../../primitives/overlays/dialog.md)
- [drawer](./drawer.md)

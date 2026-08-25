# Drawer

画面端からスライドインするパネル（styled）。`dialog` と同じ状態機械パターンを再利用し、`size` variant（Sm/Md/Lg）と `placement`（Start/End/Top/Bottom）の 2 軸を持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::drawer::{
    root, trigger, backdrop, positioner, content, title, description, close_trigger, stylesheet,
    DrawerPlacement, ContentIds,
};
use fandhe_frontend_pre_styled_ui::drawer::OpenState;
use fandhe_frontend_pre_styled_ui::Size;

let css = stylesheet();
let ids = ContentIds { id: Some("drw-1"), labelledby: Some("drw-1-title"), describedby: Some("drw-1-desc") };
let node = root(Size::Md, OpenState::Open, DrawerPlacement::End, vec![], vec![
    trigger(OpenState::Closed, Some("drw-1"), vec![], vec![]),
    positioner(OpenState::Open, vec![], vec![
        content(OpenState::Open, DrawerPlacement::End, true, ids, vec![], vec![
            title(Some("drw-1-title"), vec![], vec![]),
            description(Some("drw-1-desc"), vec![], vec![]),
            close_trigger(vec![], vec![]),
        ]),
    ]),
]);
```

`Drawer` 状態機械（headless）はあえて再エクスポートしない（`dialog` と同じ理由）。

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
| `root(size, state, placement, attrs, children)` | `Size`, `OpenState`, `DrawerPlacement` | `size: Size::Md`, `placement: DrawerPlacement::End`（ドキュメント既定値） | `size` に応じたクラスを付与する唯一のパーツ。実体は headless `root` へ委譲 |
| `trigger(state, controls, attrs, children)` | `OpenState`, `controls: Option<&str>` | `controls: None` | dialog の `trigger` と同契約（`type="button"`/`aria-haspopup="dialog"`/`aria-expanded`、`controls` が `Some` のとき `aria-controls`） |
| `backdrop(state, attrs, children)` / `positioner(state, attrs, children)` | `OpenState` | — | `positioner` は `data-placement` で flex 方向を切り替え |
| `content(state, placement, modal, ids, attrs, children)` | `OpenState`, `DrawerPlacement`, `modal: bool`, `ids: ContentIds` | — | `role="dialog"` 固定（`DialogRole` は取らない）。`ContentIds` から `id`/`aria-labelledby`/`aria-describedby` を出力 |
| `title(id, attrs, children)` / `description(id, attrs, children)` | `id: Option<&str>` | `id: None` | `id` が `Some` のとき `content` の `labelledby`/`describedby` と対にする |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `stylesheet()` | — | — | 既定 CSS 全量。`data-placement`（start/end/top/bottom）で `positioner` の flex 方向・`content` の占有寸法軸を切り替え |

`ContentIds<'a>`（`drawer::ContentIds`）は dialog と同型: `{ id, labelledby, describedby }: Option<&'a str>`（`content` の引数削減用構造体）。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `size` variant は root スコープの `--fandhe-drawer-size` custom property で寸法を切り替え
- placement 別のスライドインアニメーションは表現できず、開閉は dialog と同じ非方向的な `opacity` 切り替えのみ
- `content` は `box-sizing: border-box` かつ `overflow-y: auto`
- `trigger`/`backdrop`/`positioner`/`content`/`title`/`description`/`close_trigger` は headless `drawer` の同名関数をそのまま再エクスポートしたものではなく、`state`/`ids`/`modal` 等を取る styled 側固有の実装（dialog と同じパターン。`content` は `DialogRole` の代わりに `placement: DrawerPlacement` を取る）

## Related

- [primitives/overlays/drawer](../../primitives/overlays/drawer.md)
- [dialog](./dialog.md)

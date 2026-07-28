# Drawer

画面端からスライドインするパネル（styled）。`dialog` と同じ状態機械パターンを再利用し、`size` variant（Sm/Md/Lg）と `placement`（Start/End/Top/Bottom）の 2 軸を持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::drawer::{
    root, trigger, backdrop, positioner, content, title, description, close_trigger, stylesheet,
    DrawerPlacement,
};
use fandhe_frontend_pre_styled_ui::drawer::OpenState;
use fandhe_frontend_pre_styled_ui::Size;

let css = stylesheet();
let node = root(Size::Md, OpenState::Open, DrawerPlacement::End, vec![], vec![
    positioner(OpenState::Open, vec![], vec![
        content(OpenState::Open, vec![], vec![
            title(vec![], vec![]),
            description(vec![], vec![]),
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
| `trigger`/`backdrop`/`positioner`/`content`/`title`/`description`/`close_trigger` | — | — | headless `drawer` の同名関数をそのまま再エクスポート |
| `stylesheet()` | — | — | 既定 CSS 全量。`data-placement`（start/end/top/bottom）で `positioner` の flex 方向・`content` の占有寸法軸を切り替え |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `size` variant は root スコープの `--fandhe-drawer-size` custom property で寸法を切り替え
- placement 別のスライドインアニメーションは表現できず、開閉は dialog と同じ非方向的な `opacity` 切り替えのみ
- `content` は `box-sizing: border-box` かつ `overflow-y: auto`

## Related

- [primitives/overlays/drawer](../../primitives/overlays/drawer.md)
- [dialog](./dialog.md)

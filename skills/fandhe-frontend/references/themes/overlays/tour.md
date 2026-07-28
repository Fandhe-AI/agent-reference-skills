# Tour

複数ステップのオンボーディングガイド（styled）。他の overlays と異なり headless 層が自由関数を持たず、すべて `Tour` 状態機械の inherent メソッドとして提供されるため、styled パーツ関数はすべて `state: &Tour` を受け取る。`palette` variant（`root` スロット）を持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tour::{
    root, backdrop, spotlight, positioner, arrow, arrow_tip, content, title, description,
    progress_text, close_trigger, action_trigger, stylesheet, ContentIds,
};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_headless_ui::tour::{Tour, TourStep};

let css = stylesheet();
let tour = Tour::new(vec![/* TourStep { .. } */]);
let node = root(ColorPalette::Accent, &tour, vec![], vec![
    backdrop(&tour, vec![], vec![]),
    spotlight(&tour, vec![], vec![]),
    positioner(&tour, vec![], vec![
        content(&tour, ContentIds::default(), vec![], vec![
            title(&tour, None, vec![], vec![]),
            description(&tour, None, vec![], vec![]),
            progress_text(&tour, vec![], vec![]),
            close_trigger(&tour, vec![], vec![]),
            action_trigger(&tour, vec![], vec![]),
        ]),
    ]),
]);
```

`Tour` 状態機械（headless）はあえて再エクスポートしない。`state.root(...)` を直接呼ぶと `palette` variant クラスが付与されない未スタイル描画になるため、状態管理・hydration が必要な場合は `fandhe_frontend_headless_ui::tour::Tour` を直接 import する。

## Anatomy

```
root
  ├─ backdrop
  ├─ spotlight
  └─ positioner
      ├─ arrow
      │   └─ arrow-tip
      └─ content
          ├─ title
          ├─ description
          ├─ progress-text
          ├─ close-trigger
          └─ action-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(palette, state, attrs, children)` | `ColorPalette`, `&Tour` | — | `palette` に応じたクラスを付与する唯一のパーツ。実体は `Tour::root` へ委譲 |
| `backdrop`/`spotlight`/`positioner`/`arrow`/`arrow_tip`/`content`/`title`/`description`/`progress_text`/`close_trigger`/`action_trigger` | `&Tour` を第1引数に取る | — | いずれも `Tour::<part>` へそのまま委譲する styled パーツ関数 |
| `stylesheet()` | — | — | 既定 CSS 全量。`backdrop`(z-index 1100)/`spotlight`(1101)/`positioner`(1102) は dialog より前面。`positioner` は `data-side`+`data-align` 組み合わせで静的フォールバック配置 |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `palette` variant は `ColorPalette`（Accent/Info/Success/Warning/Danger）、`size` variant は初版スコープ外
- 対象要素の実座標追従・スポットライトへの実測値注入・`target` セレクタの実解決はスコープ外（`--fandhe-tour-spotlight-*` の静的フォールバック矩形のみ提供）

## Related

- [primitives/overlays/tour](../../primitives/overlays/tour.md)
- [dialog](./dialog.md)

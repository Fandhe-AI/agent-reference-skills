# Tour

複数ステップのオンボーディングガイド（styled）。他の overlays と異なり headless 層が自由関数を持たず、すべて `Tour` 状態機械の inherent メソッドとして提供されるため、styled パーツ関数はすべて `state: &Tour` を受け取る。`palette` variant（`root` スロット）を持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tour::{
    root, backdrop, spotlight, positioner, arrow, arrow_tip, content, title, description,
    progress_text, close_trigger, action_trigger, stylesheet, ContentIds, TourAction, TourStatus,
    TourStep, TourTriggerKind,
};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_headless_ui::tour::Tour;

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
            action_trigger(&tour, TourTriggerKind::Next, vec![], vec![]),
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
| `backdrop`/`spotlight`/`positioner`/`arrow`/`arrow_tip`/`content`/`title`/`description`/`progress_text`/`close_trigger` | `&Tour` を第1引数に取る | — | いずれも `Tour::<part>` へそのまま委譲する styled パーツ関数。`content` は `(state, ids: ContentIds, attrs, children)`、`title` / `description` は `(state, id: Option<&str>, attrs, children)` |
| `action_trigger(state, kind, attrs, children)` | `&Tour`, `TourTriggerKind` (`Next` \| `Prev` \| `Skip` \| `Complete` \| `Custom`) | — | `Tour::action_trigger` へ委譲。`kind` は headless 側が `data-type` を出力するために必須。`Prev` かつ dispatch が no-op になる境界（先頭ステップ・非 `Active`）では headless 層が `disabled` を自動付与する。呼び出し側が `attrs` に `("disabled", "")` を渡しても `[data-part="action-trigger"][disabled]` 規則（不透明度低下・`cursor: not-allowed`・hover 抑止）が効く |
| `stylesheet()` | — | — | 既定 CSS 全量。`backdrop`(`var(--fandhe-z-index-overlay, 1100)`)/`spotlight`(`calc(var(--fandhe-z-index-overlay, 1100) + 1)`)/`positioner`(`var(--fandhe-z-index-modal, 1102)`) は dialog より前面。`positioner` は `data-side`+`data-align` 組み合わせで静的フォールバック配置 |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `palette` variant は `ColorPalette`（Accent/Info/Success/Warning/Danger）、`size` variant は初版スコープ外
- `close_trigger` は固定正方（`--fandhe-space-8`）+ `overflow: hidden` の絶対配置ゴーストボタン（アイコン専用契約）。1 グリフ + `aria-label` を渡す（例: `close_trigger(&tour, vec![("aria-label", "Close")], vec![text("×")])`）
- headless 側に新設された `control`（複数の `action_trigger` を並べるパート）の styled ラッパと専用 CSS は未提供。各 `action_trigger` が持つ `margin-inline-end` で当面の間隔を確保する
- 対象要素の実座標追従・スポットライトへの実測値注入・`target` セレクタの実解決はスコープ外（`--fandhe-tour-spotlight-*` の静的フォールバック矩形のみ提供）

## Related

- [primitives/overlays/tour](../../primitives/overlays/tour.md)
- [dialog](./dialog.md)

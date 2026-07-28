# Tour

オンボーディング用のステップガイド。`Tour` 構造体自体が全パーツ関数を `&self` メソッドとして提供し、他モジュールのような自由関数 + 状態機械の分離は取らない。状態は `Idle` → `Active { step }` → `Skipped` / `Completed` の決定的な状態機械（`Completed`/`Skipped` からの遷移は no-op）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::tour::{Tour, TourStep, ContentIds};
use fandhe_frontend_headless_ui::positioning::{Placement, Side, Align};

let tour = Tour::new(vec![TourStep {
    id: "step-1".to_string(),
    target: Some("#docs-toc-heading".to_string()),
    title: "Welcome".to_string(),
    description: "This is the table of contents.".to_string(),
    placement: Placement::new(Side::Bottom, Align::Center),
}]);

let node = tour.root(
    vec![],
    vec![
        tour.backdrop(vec![], vec![]),
        tour.spotlight(vec![], vec![]),
        tour.positioner(vec![], vec![tour.content(ContentIds::default(), vec![], vec![])]),
    ],
);
```

`TourAction::{Start, Next, Prev, Skip, Complete}` を dispatch する。

## Anatomy

```
root
  backdrop
  spotlight
  positioner
    arrow
      arrow-tip
    content
      title
      description
      progress-text
      action-trigger
      close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `Tour::new(steps: Vec<TourStep>)` | — | 初期状態は常に `Idle` | ツアーの状態機械を構築 |
| `tour.root(attrs, children)` | — | — | `data-state`・`data-status` へ反映 |
| `tour.backdrop(attrs, children)` | — | — | 非 `Active` 時に `hidden` |
| `tour.spotlight(attrs, children)` | — | — | 現在ステップの `target` が `Some` のとき `data-target` を付与。`target` が `None` のステップでは `Active` でも `hidden` |
| `tour.positioner(attrs, children)` | — | — | 現在ステップの `placement` から `data-side`/`data-align` を静的出力 |
| `tour.arrow(attrs, children)` / `tour.arrow_tip(attrs, children)` | — | — | 矢印パーツ |
| `tour.content(ids, attrs, children)` | `ContentIds` | `default()` | `role="dialog"` 固定。`ids` の各フィールドが `Some` のとき `aria-labelledby`/`aria-describedby` |
| `tour.title(id, attrs, children)` / `tour.description(id, attrs, children)` | `Option<&str>` | — | `content` の `labelledby`/`describedby` と対 |
| `tour.progress_text(attrs, children)` | — | — | `aria-live="polite"` 固定 |
| `tour.close_trigger(attrs, children)` / `tour.action_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `TourStep` | `struct` | — | `id: String` / `target: Option<String>` / `title: String` / `description: String` / `placement: Placement` |
| `TourStatus` | `enum` | `Idle` | `Idle` / `Active { step: usize }` / `Skipped` / `Completed` |
| `ContentIds<'a>` | `struct` | `default()` | `id` / `labelledby` / `describedby`（すべて `Option<&str>`） |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- 対象要素の実解決（CSS セレクタ → DOM）・スポットライトの実座標計算は `fandhe-frontend-wasm-full` 側の責務でスコープ外
- 他モジュールと異なり自由関数を提供せず、`Tour` 構造体のメソッドのみで全パーツを組み立てる

## Related

- [dialog](./dialog.md)

# Toast

一時的な通知のキュー表示。`Toaster` 状態機械が複数通知を有界キューとして管理する。`aria-live` は `ToastStatus` から決定的に導出され、`Error` のみ `assertive`、他は `polite`。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::toast::{group, root, title, description, action_trigger, close_trigger, ToastStatus, ToastPlacement, ToastEntry, Toaster, DEFAULT_MAX};

let node = group(
    ToastPlacement::BottomEnd,
    "Notifications",
    vec![],
    vec![root(
        ToastStatus::Success,
        vec![],
        vec![title(vec![], vec![]), description(vec![], vec![]), close_trigger(vec![], vec![])],
    )],
);

let toaster = Toaster::new(DEFAULT_MAX, ToastPlacement::default());
```

`Toaster` は `ToastAction::{Push(ToastEntry), Dismiss { id }, Clear}` を受け取る（`Push` は文字列 dispatch からは到達しない）。

## Anatomy

```
group (live region)
  root (通知1件)
    title
    description
    action-trigger
    close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `group(placement, label, attrs, children)` | `ToastPlacement`, `&str` | placement: `BottomEnd` | `role="region"` + `aria-label(label)` 必須引数 + `data-placement` |
| `root(status, attrs, children)` | `ToastStatus` | `Info` | `role="status"` + `aria-atomic="true"` + `aria-live`（status 由来）+ `data-type` |
| `title(attrs, children)` / `description(attrs, children)` | — | — | 装飾用コンテナ |
| `action_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定 |
| `ToastStatus` | `enum` | `Info` | `Info` / `Success` / `Warning` / `Error`（`Error` のみ `aria-live="assertive"`） |
| `ToastPlacement` | `enum` | `BottomEnd` | `TopStart` / `Top` / `TopEnd` / `BottomStart` / `Bottom` / `BottomEnd` の6語彙 |
| `ToastEntry` | `struct` | — | `id: String` / `status: ToastStatus` / `title: String` / `description: String` |
| `Toaster::new(max, placement)` | `usize`, `ToastPlacement` | `max: DEFAULT_MAX`（24） | 通知キューの状態機械 |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- 自動消去のタイマー駆動はスコープ外
- `ToastPlacement` はビューポート角への固定配置（`position: fixed` 前提）であり、Popover/Tooltip 等が使う `positioning::Placement`（アンカー相対）とは別の語彙

## Related

- [popover](./popover.md)

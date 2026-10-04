# Toast

一時的な通知をキューとして管理する状態機械 `Toaster` を持つ通知コンポーネント（styled）。`placement`（`group` スロット、6 種）と `status`（`root` スロット、Info/Success/Warning/Error）の 2 軸 variant を持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::toast::{
    group, root, content, actions, title, description, action_trigger, close_trigger, stylesheet,
    ToastAction, ToastEntry, ToastPlacement, ToastStatus, ACTIONS_COLUMN_ATTR,
};

let css = stylesheet();
let node = group(ToastPlacement::BottomEnd, "Notifications", vec![], vec![
    root(ToastStatus::Success, vec![], vec![
        content(vec![], vec![
            title(vec![], vec![]),
            description(vec![], vec![]),
        ]),
        actions(vec![], vec![
            action_trigger(vec![], vec![]),
        ]),
        close_trigger(vec![], vec![]),
    ]),
]);
```

`Toaster` 状態機械（headless）はあえて再エクスポートしない。`toaster.group(...)`/`toaster.root(...)` を直接呼ぶと variant クラスが付与されない未スタイル描画になるため、状態管理・hydration が必要な場合は `fandhe_frontend_headless_ui::toast::Toaster` を直接 import する。

## Anatomy

```
group（live region、role="region"）
  └─ root（1 件の通知、role="status"）
      ├─ content（pre-styled 専用）
      │   ├─ title
      │   └─ description
      ├─ actions（pre-styled 専用、action-trigger を入れる）
      └─ close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `group(placement, label, attrs, children)` | `ToastPlacement`, `&str` | `placement: ToastPlacement::BottomEnd`（ドキュメント既定値） | `placement` に応じたクラスを付与する唯一のパーツ。実体は headless `group` へ委譲 |
| `root(status, attrs, children)` | `ToastStatus` | `status: ToastStatus::Info`（ドキュメント既定値） | `status` に応じたクラスを付与する唯一のパーツ。実体は headless `root` へ委譲 |
| `title`/`description`/`action_trigger`/`close_trigger` | — | — | headless `toast` の同名関数をそのまま再エクスポート |
| `content(attrs, children)` | — | — | pre-styled 専用の `<div>`（headless anatomy に存在しない）。title / description を包む本文側の領域 |
| `actions(attrs, children)` | — | — | pre-styled 専用の `<div>`（headless anatomy に存在しない）。右端（RTL では左端）のアクション列 |
| `ACTIONS_COLUMN_ATTR` | `&str` (`"data-actions-column"`) | — | 右端アクション列レイアウトの opt-in 属性名。`root` と `actions` 内の各 `action_trigger` の両方へ `(ACTIONS_COLUMN_ATTR, "")` として渡す。`root` へ付けると縦積みパネルから列レイアウトへ切り替わり、`action_trigger` へ付けるとセル化する |
| `stylesheet()` | — | — | 既定 CSS 全量。`placement`（top/bottom × start/center/end）は `group` の位置、`status` は `root` の配色（`--fandhe-palette`、alert と同じマッピング）を切り替え |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `placement`/`status` は別スロット（`group`/`root`）に付与される 2 軸独立 variant
- `placement` の `start`/`end` は `inset-inline-*` 論理プロパティで RTL 対応、`Top`/`Bottom` の中央寄せのみ物理プロパティ `left: 50%` を維持
- `group` の `z-index` は `var(--fandhe-z-index-toast, 9999)`
- タイマーによる自動 dismiss・`ActionTrigger` の実配線はスコープ外

## Related

- [primitives/overlays/toast](../../primitives/overlays/toast.md)

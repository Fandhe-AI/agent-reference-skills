# Action Bar

複数選択に対する一括操作を提示する、画面下端固定の操作バー。開閉状態は `Disclosure` 状態機械で管理するが、選択件数から開閉を導出する糖衣 API は持たず、「選択操作 → 開閉状態の決定」は呼び出し側の責務とする。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::action_bar::{root, positioner, content, selection_trigger, separator, close_trigger};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Open,
    vec![],
    vec![positioner(
        OpenState::Open,
        vec![],
        vec![content(
            OpenState::Open,
            "3 selected",
            vec![],
            vec![
                selection_trigger(vec![], vec![]),
                separator(vec![], vec![]),
                close_trigger(vec![], vec![]),
            ],
        )],
    )],
);
```

状態機械を使う場合は `ActionBar::new(OpenState)` を経由し、`bar.root(attrs, children)` のように現在状態を注入する利便メソッドを呼べる。`dispatch(&mut bar, "open"/"close"/"toggle", "")` で遷移する。

## Anatomy

```
root
  └─ positioner
      └─ content
          ├─ selection-trigger
          ├─ separator
          └─ close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(state, attrs, children)` | `OpenState` | — | 開閉状態。`data-state` へ反映 |
| `positioner(state, attrs, children)` | `OpenState` | — | closed のとき `hidden` を付与 |
| `content(state, label, attrs, children)` | `OpenState`, `&str` | — | `role="dialog"`（非モーダル、`aria-modal` は付与しない）+ `aria-label(label)` + `tabindex="-1"` 固定（呼び出し側 `attrs` に `tabindex` があれば出力しない）。開状態のみ `data-expanded`。closed のとき `hidden` |
| `selection_trigger(attrs, children)` | — | — | `type="button"` 固定。選択件数テキストは呼び出し側が children で渡す |
| `separator(attrs, children)` | — | — | `role="separator"` + `aria-orientation="vertical"` 固定 |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定。`children` が空かつ呼び出し側 `attrs` に `aria-label` が無いときのみ既定 `aria-label="close"`（`CLOSE_TRIGGER_ARIA_LABEL`）を付与 |
| `ActionBar::new(initial: OpenState)` | — | — | 状態機械。`root(attrs, children)` / `positioner(attrs, children)` / `content(label, attrs, children)` の利便メソッドを持つ（`state()` / `is_open()` / `data_state()` あり） |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- 属性仕様は chakra-ui ActionBar が再利用する zag.js popover の出力を基準にする（`content` は旧版の `role="toolbar"` から `role="dialog"` へ変更済み。roving tabindex 等の toolbar 要件を満たさないため）。`root` / `positioner` に `data-state`、`positioner` は closed で `hidden`
- chakra-ui の ActionBar と異なり `open={selection.size > 0}` のような選択件数からの導出は行わない
- Portal 描画・外側クリックでの閉鎖・アニメーションは JS ランタイム側の責務でスコープ外
- `placement` variant（`bottom-start`/`bottom-end` 等）は未実装、既定の bottom 中央固定のみ

## Related

- [dialog](./dialog.md)

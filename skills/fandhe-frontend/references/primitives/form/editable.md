# Editable

インライン編集（プレビュー/編集トグル）。専用の `preview`/`edit` モード状態機械（`Editable`）を持ち、モード語彙が `Disclosure`/`Checkable` に合わないため `Component`/`Hydrate` を直接実装する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::editable::{self, Editable, EditableInputFlags};

let e = Editable::new("Ada", Some(10));

e.root(false, false, Default::default(), Default::default(), vec![], vec![
    e.area(vec![
        e.preview(vec![], vec![]),
        e.input("name", None, None, EditableInputFlags::default(), vec![]),
    ]),
    e.control(vec![
        e.edit_trigger(false, vec![], vec![]),
        e.submit_trigger(false, vec![], vec![]),
        e.cancel_trigger(false, vec![], vec![]),
    ]),
]);
```

フリー関数: `editable::root(mode, disabled, readonly, activation_mode, submit_mode, attrs, children)`, `label`, `area`, `input`, `preview`, `control`, `edit_trigger`, `submit_trigger`, `cancel_trigger`。

## Anatomy

- `root`, `label`（`<label for="...">`）, `area`（`input`/`preview` をラップ）
- `input` — `<input type="text">`、`Preview` のとき非表示
- `preview` — `<span>`、`Edit` のとき非表示
- `control`, `edit-trigger`（`Preview` 時のみ表示）, `submit-trigger` / `cancel-trigger`（`Edit` 時のみ表示）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `EditableActivationMode` | `Focus`（既定） \| `DblClick` | SSR 専用の静的ヒント（`data-activation-mode`）。実際の DOM 配線は対象外 |
| `EditableSubmitMode` | `Enter` \| `Blur` \| `Both`（既定） | SSR 専用の静的ヒント（`data-submit-mode`） |
| `EditableInputFlags` | struct | `disabled`/`readonly`/`required` |
| `max_length` | `Option<usize>` | 構築時（`Editable::new` が truncate）と `"set"` ディスパッチ時に強制される |

## Notes

- 不変条件: `mode == Preview` の間は常に `draft == value`（ハイドレーション復元時にも保証される）
- ディスパッチアクション: `"edit"`, `"set"`（ペイロード = 新しい draft テキスト）, `"submit"`, `"cancel"`。状態依存の no-op（例: `Preview` 中の `"set"`）は `decode_action` ではなく `update()` に存在する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)

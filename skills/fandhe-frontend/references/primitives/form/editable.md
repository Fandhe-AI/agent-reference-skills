# Editable

インライン編集（プレビュー/編集トグル）。専用の `preview`/`edit` モード状態機械（`Editable`）を持ち、モード語彙が `Disclosure`/`Checkable` に合わないため `Component`/`Hydrate` を直接実装する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::editable::{self, Editable, EditableInputFlags};

let e = Editable::new("Ada", Some(10));
let flags = EditableInputFlags::default();

e.root(flags, Default::default(), Default::default(), vec![], vec![
    e.area(flags, vec![], vec![
        e.preview(flags, vec![], vec![]),
        e.input("name", None, None, flags, vec![]),
    ]),
    e.control(vec![], vec![
        e.edit_trigger(false, vec![], vec![]),
        e.submit_trigger(false, vec![], vec![]),
        e.cancel_trigger(false, vec![], vec![]),
    ]),
]);
```

フリー関数（先頭引数 `mode: EditMode` を取る。`Editable` のメソッドは現在の `mode` と空判定を自動注入する）: `editable::root(mode, flags: EditableInputFlags, activation_mode, submit_mode, attrs, children)`, `label(mode, flags, input_id: Option<&str>, attrs, children)`, `area(mode, flags, placeholder_shown: bool, attrs, children)`, `input(mode, name, value, props: EditableInputProps, flags, attrs)`, `preview(mode, flags, placeholder_shown, attrs, children)`, `control(mode, attrs, children)`, `edit_trigger(mode, disabled, attrs, children)`, `submit_trigger(mode, disabled, attrs, children)`, `cancel_trigger(mode, disabled, attrs, children)`。`Editable::input(name, id, placeholder, flags, attrs)` は `max_length` を `maxlength` へ自動注入する。

## Anatomy

- `root`（`<div>`）, `label`（`<label for="...">`）, `area`（`<div>`、`input`/`preview` をラップ）
- `input` — `<input type="text">`、`Preview` のとき非表示（`hidden`）
- `preview` — `<span>`、`Edit` のとき非表示（`hidden`）
- `control`（`<div>`）, `edit-trigger`（`Preview` 時のみ表示）, `submit-trigger` / `cancel-trigger`（`Edit` 時のみ表示）。トリガーは `<button type="button">`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `EditableActivationMode` | `Focus`（既定） \| `DblClick` \| `Click` \| `None` | SSR 専用の静的ヒント（`data-activation-mode` = `focus` / `dblclick` / `click` / `none`）。`None` は `edit_trigger` / `dispatch("edit")` からのみ編集開始。実際の DOM 配線は対象外 |
| `EditableSubmitMode` | `Enter` \| `Blur` \| `Both`（既定） \| `None` | SSR 専用の静的ヒント（`data-submit-mode` = `enter` / `blur` / `both` / `none`）。`None` は `submit_trigger` / `dispatch("submit")` からのみ確定 |
| `EditableInputProps` | struct | `input` の `id` / `placeholder` / `max_length`（整形済み文字列）の束（`Default`） |
| `EditableInputFlags` | struct | `disabled` / `readonly` / `required` / `invalid`（既定すべて `false`）。パーツごとに反映先が異なる（下表） |
| `max_length` | `Option<usize>` | 構築時（`Editable::new` が truncate）と `"set"` ディスパッチ時に強制される |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| 全パーツ | `data-state` | `preview` \| `edit` |
| root | `data-activation-mode` / `data-submit-mode` | 上記語彙 |
| root | `data-disabled` / `data-readonly` | 存在属性（`required` / `invalid` は root に反映しない） |
| label | `data-disabled` / `data-invalid` / `data-required` | 存在属性 |
| area | `data-disabled` | 存在属性 |
| area / preview | `data-placeholder-shown` | 存在属性（表示テキストが空のとき） |
| input | `data-disabled` / `data-readonly` / `data-required` / `data-invalid` | 存在属性（ネイティブ `disabled` / `readonly` / `required`、`invalid` 時 `aria-invalid="true"` も併せて出力） |
| preview | `data-disabled` / `data-readonly` / `data-invalid` | 存在属性 |
| edit-trigger / submit-trigger / cancel-trigger | `data-disabled` | 存在属性（ネイティブ `disabled` も併せて出力） |

## Notes

- `preview` は `!disabled && !readonly` のとき `tabindex="0"`、`disabled` のとき `aria-disabled="true"`、`invalid` のとき `aria-invalid="true"` を出力する（`aria-readonly` は role なし `span` に不正なため出力しない）

- 不変条件: `mode == Preview` の間は常に `draft == value`（ハイドレーション復元時にも保証される）
- ディスパッチアクション: `"edit"`, `"set"`（ペイロード = 新しい draft テキスト）, `"submit"`, `"cancel"`。状態依存の no-op（例: `Preview` 中の `"set"`）は `decode_action` ではなく `update()` に存在する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)

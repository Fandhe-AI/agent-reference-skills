# Pin Input

桁ごとのフィールドを持つ PIN/確認コード入力。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::pin_input::{self, PinInput, PinInputKind, PinInputProps};

let pin = PinInput::new(6, PinInputKind::Numeric);
let props = PinInputProps::default();

pin.root(&props, vec![], vec![
    pin.control(vec![], vec![
        pin.input(0, false, false, &props, vec![]),
        // ... one input() call per digit index
    ]),
    pin.hidden_input("otp", false, vec![]),
]);
```

フリー関数: `pin_input::root(complete: bool, props: &PinInputProps, attrs, children)`, `label(complete, props, attrs, children)`, `control(attrs, children)`, `input(index, count, value, kind, mask, otp, props, complete, attrs)`, `hidden_input(name, value, disabled, attrs)`。`PinInput` のメソッドは `complete` / 桁値 / 連結値を自動注入する（`input(index, mask, otp, props, attrs)`、`hidden_input(name, disabled, attrs)`）。

## Anatomy

- `root` — `<div>`、`label` — `<label>`、`control` — `<div>`
- `input` — 桁ごとに1つのネイティブ input（`maxlength="1"`、`placeholder="○"`、`aria-label="PIN digit N of M"`、`mask=true` で `type="password"`、`otp=true` で `autocomplete="one-time-code"`。出力は変わらず、0.73.0 から `AutocompleteToken` 由来）
- `hidden-input` — `<input type="hidden">`、集約された値（フォーム送信値はこのパーツのみが担う）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PinInput::new(count, kind)` | `usize, PinInputKind` | `count` 桁 |
| `PinInputKind` | `Numeric` \| `Alphanumeric` \| `Alphabetic` \| `AlphanumericUppercase` \| `AlphabeticUppercase` | `is_valid_char(c)` は種別ごとに ASCII のキー入力を検証する。`inputmode()` は `Numeric` のみ `"numeric"`。`PinInputKind::parse(value)` / `as_str()`。Uppercase 系の hydration 語彙は `alphanumeric-uppercase` / `alphabetic-uppercase`。`Input` / `Paste` で ASCII 英小文字を `to_ascii_uppercase` で大文字へそろえる。hydration で小文字の桁は `HydrateError::InvalidValue` |
| `PinInputKind::autocapitalize()` | `const fn -> Option<&'static str>` | Uppercase 系の kind のみ `Some("characters")`、それ以外は `None`。呼び出し側 `attrs` の `autocapitalize` は除外される |
| `PinInputKind::normalize_char(c)` | `const fn -> char` | 1 文字を kind の正規形へそろえる。Uppercase 系は ASCII 英小文字を大文字にし、それ以外は入力をそのまま返す |
| `PinInputProps.disabled` | `bool`（既定 `false`） | root / label / input に `data-disabled`。`input` / `hidden_input` にネイティブ `disabled` |
| `PinInputProps.readonly` | `bool`（既定 `false`） | root / label / input に `data-readonly`。`input` にネイティブ `readonly` |
| `PinInputProps.invalid` | `bool`（既定 `false`） | root / label / input に `data-invalid`。`input` に `aria-invalid="true"`（valid では属性ごと省略） |
| `PinInputProps.required` | `bool`（既定 `false`） | `label` のみに `data-required`（`type="hidden"` には `required` を付与しない） |
| `PinInput::is_complete()` | `bool` | 全桁が埋まっているか |
| `PinInput::value()` | `String` | 連結された桁の文字列 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / label / input | `data-complete` | 存在属性（全桁充足時） |
| input | `data-index` | 桁インデックス（0 始まり） |
| input | `data-filled` | 存在属性（当該桁の値が非空のとき） |

## Notes

- dispatch: `"input"` / `"backspace"`（現在桁を消去して前の桁へ移動）/ `"delete"`（現在桁のみ消去、フォーカス移動なし）/ `"prev"` / `"next"` / `"focus"` / `"paste"` / `"clear"`。種別不適合文字・部分適合の paste は no-op。`paste`（Control+V / Cmd+V）は区切り文字（ASCII ハイフン `-` と空白類）を先に取り除き、残りの全文字が `kind` に適合し桁数以内の場合のみ受理し、それ以外は部分適用せず一切拒否する（区切り除去は入力補助で、値の検証はアプリ側の責務。イシュー #3832、headless-ui の minor バンプを伴う挙動変更）
- `focused` は hydration では直列化されない（ephemeral な DOM 状態）
- `hidden_input` の連結値・各桁 `value` は HTML ソースに平文で現れる。実際の OTP を SSR で初期値としてプレフィルする用途には使わない
- 呼び出し側 `attrs` による固定属性（`data-disabled` / `data-invalid` / `data-readonly` / `data-complete`、`input` では `data-index` / `data-filled` / `aria-invalid`）の上書きは除去される

- 版: `PinInputKind` の Uppercase 系追加（イシュー #3833）は headless-ui 0.72.0、`AutocompleteToken` 由来の `otp` 出力（イシュー #3859）は 0.73.0（`Cargo.toml` のコメントによる）。公開 enum へのバリアント追加のため、網羅的に `match` しているコードにとっては 0.x の破壊的変更
- `PinInput::digit(index)` / `focused_index()` はレンダリング用にセル単位の状態を公開する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Tags Input](./tags-input.md)

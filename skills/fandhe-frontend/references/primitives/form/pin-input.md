# Pin Input

桁ごとのフィールドを持つ PIN/確認コード入力。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::pin_input::{self, PinInput, PinInputKind};

let pin = PinInput::new(6, PinInputKind::Numeric);

pin.root(vec![], vec![
    pin.control(vec![
        pin.input(0, vec![], vec![]),
        // ... one input() call per digit index
    ]),
    pin.hidden_input("otp", vec![]),
]);
```

フリー関数: `pin_input::root(complete, disabled, attrs, children)`, `label(complete, attrs, children)`, `control(attrs, children)`, `input(index, count, value, kind, mask, otp, ...)`, `hidden_input(name, value, disabled, attrs)`。

## Anatomy

- `root`, `label`, `control`
- `input` — 桁ごとに1つのネイティブ input
- `hidden-input` — `<input type="hidden">`、集約された値

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PinInput::new(count, kind)` | `usize, PinInputKind` | `count` 桁 |
| `PinInputKind` | `Numeric` \| ... | `is_valid_char(c)` は種別ごとにキー入力を検証する。`PinInputKind::parse(value)` |
| `PinInput::is_complete()` | `bool` | 全桁が埋まっているか |
| `PinInput::value()` | `String` | 連結された桁の文字列 |

## Notes

- `PinInput::digit(index)` / `focused_index()` はレンダリング用にセル単位の状態を公開する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Tags Input](./tags-input.md)

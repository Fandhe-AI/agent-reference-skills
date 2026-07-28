# Clipboard

値のコピー操作 UI を提供する styled コンポーネント。`fandhe-frontend-headless-ui::clipboard` の Root/Label/Control/Input/Trigger/Indicator/ValueText 7 パーツを薄くラップし、既定 CSS を追加する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::clipboard;

let node = clipboard::root("https://example.com", false, vec![], vec![]);
```

## Anatomy

```
root
  label
  control
    input
    trigger
  indicator
  value-text
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: value` | `&str` | 必須 | コピー対象の値（`data-value` として出力） |
| `root: copied` | `bool` | 必須 | コピー済み状態 |
| `label`/`control`/`input`/`trigger`/`indicator`/`value_text` | 再エクスポート | — | `fandhe_frontend_headless_ui::clipboard::{label, control, input, trigger, indicator, value_text}` をそのまま使う |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| trigger | `data-copied` | 存在時のみコピー済みを示す |
| indicator | `data-state` | `hidden` \| `visible` |

## Notes

- `size`/`color-palette` variant は提供しない。
- `Clipboard` 状態機械はこのモジュールから再エクスポートしない。hydration が必要な場合は `fandhe_frontend_headless_ui::clipboard::Clipboard` を直接 import する。
- コピー対象値（`value`）はパスワード等の機微情報を含みうるため、CSS・ログのいずれにも出力しない。
- `navigator.clipboard` の実配線は本モジュールのスコープ外（`fandhe-frontend-wasm-full` 側の責務）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [primitives/display/clipboard](../../primitives/display/clipboard.md)

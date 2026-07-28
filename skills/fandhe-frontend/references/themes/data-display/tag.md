# Tag

ラベル・分類・除去可能なチップ表示のための styled コンポーネント。root/label/close-trigger の 3 パーツで構成する。`Badge` と異なり削除操作（close trigger）を持てる。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tag::{self, TagProps};
use fandhe_frontend_core::text;

let node = tag::root(&TagProps::default(), vec![], vec![text("beta")]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `TagVariant` (`Solid`/`Subtle`/`Outline`) | `Subtle` | 塗り方 |
| `size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | サイズ |
| `palette` | `ColorPalette` (`Accent`/`Info`/`Success`/`Warning`/`Danger`) | `Accent` | セマンティック色 |
| `close_trigger: action` | `Option<&str>` | `None` | `Some` のとき `data-action` 属性を出力（クリック処理は呼び出し側の wire_events に委ねる） |

## Notes

- `close_trigger`（`<button type="button">`）は状態機械を持たない。`aria-label`・視覚内容（`×` 等）は呼び出し側が `attrs`/`children` で付与する必要がある。
- chakra-ui の StartElement/EndElement 相当の専用パーツは設けない。`children` に任意ノードを並べれば同等表現ができる。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Badge](./badge.md)

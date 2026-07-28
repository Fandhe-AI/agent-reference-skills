# Status

オンライン/オフライン等の状態をドット（indicator）+ ラベルで示す静的 styled コンポーネント。root/indicator の 2 パーツのみの最小構成。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::status::{self, StatusProps};
use fandhe_frontend_core::text;

let node = status::root(
    &StatusProps::default(),
    vec![],
    vec![status::indicator(vec![]), text("Online")],
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | ドット直径・フォントサイズ |
| `palette` | `ColorPalette` (`Accent`/`Info`/`Success`/`Warning`/`Danger`) | `Accent` | セマンティック色 |

## Notes

- `indicator` は `class` を持たず、`--fandhe-status-dot-size` の継承で直径が決まる。
- ラベルテキスト自体が状態を伝えるため `role="status"`（WAI-ARIA live region）は付与しない。非同期の状態更新をライブ告知する必要がある場合は呼び出し側が `attrs` へ `role`/`aria-live` を明示的に追加する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Badge](./badge.md)
- [Stat](./stat.md)

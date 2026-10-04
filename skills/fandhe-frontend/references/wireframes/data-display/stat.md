# Stat

`fandhe-frontend-wireframe-ui` の数値指標カードプレースホルダー。ラベル・大きな数値・任意の増減インジケータからなる非インタラクティブな表示専用部品。API は `stat(label, value, delta, size)` の 4 引数。

## Signature / Usage

```rust
pub fn stat(label: &str, value: &str, delta: Option<StatDelta<'_>>, size: Size) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::stat::{StatDelta, StatTrend};
use fandhe_frontend_wireframe_ui::{stat, Size};

stat(
    "売上",
    "¥1,234,567",
    Some(StatDelta::new("+12%", StatTrend::Up)),
    Size::Md,
);
```

補助型（`fandhe_frontend_wireframe_ui::stat` モジュール内）:

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum StatTrend {
    Up,
    Down,
    #[default]
    Flat,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct StatDelta<'a> {
    pub value: &'a str,
    pub trend: StatTrend,
}

impl<'a> StatDelta<'a> {
    pub const fn new(value: &'a str, trend: StatTrend) -> Self;
}
```

## Options / Props

`stat()` の引数:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `&str` | 必須 | 指標名の文言。 |
| value | `&str` | 必須 | 不透明な文字列として扱う数値表現。桁区切り・単位等の整形はしない。 |
| delta | `Option<StatDelta<'_>>` | `None` | 省略可能な増減インジケータ（value + trend）。`None` のときはパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

`StatTrend`:

| Variant | Description |
| --- | --- |
| `Up` | 上昇。 |
| `Down` | 下降。 |
| `Flat` | 変化なし（既定）。 |

`StatTrend` には `ALL: [StatTrend; 3]`（宣言順）、`as_str()`（`"up"` / `"down"` / `"flat"`）、`class()`（`fw-wire-stat-up` / `-down` / `-flat`）がある。

`StatDelta`:

| Field | Type | Description |
| --- | --- | --- |
| value | `&'a str` | 増減値の不透明な文字列表現（例: `"+12%"`）。整形はしない。 |
| trend | `StatTrend` | 増減の向き。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/stat/
- 低忠実度ワイヤーフレーム部品。Themes の `Stat` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。アクセシブルな統計表示が必要な場合は Themes の Stat を使う。
- blocks.pm に対応部品がない wireframe-ui 独自追加部品。
- 原案差分: 増減は `Option<&str>` ではなく `StatDelta { value, trend }`（`menu::MenuItem` と同型）。先頭の `+` / `-` から向きを推測する文字列解析は採らない。
- 上昇 / 下降のグリフは既存の `icon::caret_up` / `icon::caret_down` を再利用。`Flat` はグリフを出力しない。`size` は他部品に揃えて最後の引数。
- 桁区切り・単位・符号の付与は一切しない。非対話（`role` / `aria-*` / `tabindex` / `style` / `on*` / `<button>` / `<a>` を出力しない）。
- 配色はグレースケールのみ。向きは色ではなく、上昇のみ太字、下降・変化なしは `--fw-wire-ink-muted` で表す。

## Related

- [Data Display wireframes](./overview.md)
- [Stat (Themes)](../../themes/data-display/stat.md)
- [Icon (wireframe)](./icon.md)

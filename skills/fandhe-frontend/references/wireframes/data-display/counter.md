# Counter

数字を収めた小さな丸（ピル）バッジで、件数表示のプレースホルダー。`count`（件数文言）・`size`・`primary`（強調・反転色）を受け取る非インタラクティブな部品。

## Signature / Usage

```rust
pub fn counter(count: &str, size: Size, primary: Primary) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{counter, Primary, Size};

counter("3", Size::Md, Primary(false));   // 既定
counter("3", Size::Md, Primary(true));    // 強調（反転色）
counter("99+", Size::Md, Primary(false)); // 省略表記
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| count | `&str` | - | 件数文言。`"3"`・`"42"`・`"99+"` のような呼び出し側の任意表記をそのまま流し込める。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| primary | `Primary` | `Primary(false)` | true のとき強調（反転色）バリアントにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/counter/
- 低忠実度ワイヤーフレーム部品。Themes の `Badge` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。
- 件数を動的に更新したり、未読数の読み上げのような支援技術向けセマンティクスが必要な場合は Themes の Badge を使う。本部品は `data-*` / `role` / `aria-*` / `tabindex` を一切出力しない。
- 原案差分: 件数は `u32` ではなく `&str`（`"99+"` / `"1.2k"` 等を呼び出し側が選べる。数値整形は責務外）。空文字列は中身のない丸（ドット状バッジ）として描画される。
- 原案差分: 強調配色は新型を作らず共通型 `Primary` を再利用。既定は淡い塗り（`--fw-wire-fill-subtle`）と濃い文字（`--fw-wire-ink`）、黒塗り（反転）は `Primary` の opt-in。
- 1 桁の件数は真円、複数桁はピル形状に伸びる。フォントサイズは `--fw-wire-font-size` を `var()` 参照する。
- `nav_item` 内部のカウンターパート（`fw-wire-nav-item-counter`）とは独立で、置き換えは行っていない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Counter）。

## Related

- [Data Display wireframes](./overview.md)
- [Badge (Themes)](../../themes/data-display/badge.md)

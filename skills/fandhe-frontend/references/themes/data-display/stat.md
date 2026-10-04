# Stat

数値指標 1 件をラベル・値・補助テキスト・増減インジケーターの組で表示する静的 styled コンポーネント。root/label/value-text/value-unit/help-text/up-indicator/down-indicator/delta の 8 パーツで構成する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::recipe::Size;
use fandhe_frontend_pre_styled_ui::stat;
use fandhe_frontend_core::text;

let node = stat::root(
    Size::Md,
    vec![],
    vec![
        stat::label(vec![], vec![text("Revenue")]),
        stat::value_text(vec![], vec![text("1,234"), stat::value_unit(vec![], vec![text("USD")])]),
        stat::help_text(vec![], vec![stat::up_indicator(vec![]), text("12%")]),
    ],
);
```

## Anatomy

```
root (dl)
  label (dt)
  value-text (dd)
    value-unit
  help-text
    up-indicator
    down-indicator
  delta   （label / value-text の子に置くと行末へ寄る）
```

`root(size: Size, attrs, children)`、`label` / `value_text` / `value_unit` / `help_text`（`attrs, children`）、`up_indicator(attrs)` / `down_indicator(attrs)`（子なし）、`delta(tone: StatDeltaTone, attrs, children)`。`css() -> String` が静的 CSS 全量を返す。

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: size` | `Size` (`Xs`/`Sm`/`Md`/`Lg`/`Xl`) | `Md` | `value-text` のフォントサイズを切り替える。`root` のみへクラス付与 |
| `delta: tone` | `StatDeltaTone` (`Neutral`/`Success`/`Danger`) | 必須（既定 variant なし） | 増減率テキストの意味色。方向ではなく良し悪しの意味を表す |

## Notes

- `delta`（`<span>`）は矢印を伴わない増減率テキスト用。children には可視テキストを渡す契約で `aria-hidden` は付かない。色だけに意味を頼らないよう、`Danger`/`Success` では可視テキストまたは visually-hidden テキストで補う。

- `up-indicator`/`down-indicator` は SVG・icon font・画像 URL を使わない `clip-path` 三角形表現。装飾用途のため常に `aria-hidden="true"` を固定付与する。
- headless-ui 側に対応する anatomy は存在しない（pre-styled-ui 層のみで新規定義）。`colorPalette` 軸は持たない（indicator は固定でセマンティック成功色/危険色）。
- `StatGroup`・ロケール依存の数値整形（`FormatNumber` 相当）は未提供。複数指標の一覧表示には `DataList` を推奨。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Data List](./data-list.md)
- [Status](./status.md)

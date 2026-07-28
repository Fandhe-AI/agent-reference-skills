# Marquee

CSS のみ・`prefers-reduced-motion` 対応の決定的設計で自動流動テキストを実現する静的 styled 部品（`root`/`content`/`item` の 3 パーツ）。

## Anatomy

```
root
  content（内部で 2 回複製、シームレスループ用）
    item
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::marquee::{item, marquee, MarqueeProps};

let node = marquee(
    &MarqueeProps {
        decorative: true,
        ..MarqueeProps::default()
    },
    vec![],
    vec![item(vec![], vec![/* children */])],
);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| direction | `MarqueeDirection` | `Start` | スクロール方向。`Start`（通常） / `End`（逆方向） |
| decorative | `bool` | `false` | `true` なら `root` に `aria-hidden="true"` を付与し純装飾として扱う |
| label | `Option<&str>` | `None` | `decorative: false` のときのみ有効なアクセシブルネーム（`aria-label`） |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。
- `content` パーツは内部で常に 2 回複製されシームレスループを実現する。2 個目の `content` は常に `aria-hidden="true"` + `inert` を持つ（呼び出し側は外せない）。
- `root:hover`/`root:focus-within` でアニメーションを常時一時停止する CSS を出力する（無効化オプションなし、WCAG 2.2.2 配慮）。
- `prefers-reduced-motion: reduce` 環境ではアニメーションを停止し、複製した 2 個目の `content` を `display: none` にする。
- 速度・間隔は CSS custom property（`--fandhe-marquee-duration`（既定 `20s`）/ `--fandhe-marquee-gap`（既定 `1rem`））で呼び出し側が上書きする契約。
- ark-ui の `speed`/`spacing`/`autoFill`/`loopCount` 相当・縦方向スクロール・両端フェード（`Edge`）は本部品のスコープ外。

## Related

- [Text](./text.md)

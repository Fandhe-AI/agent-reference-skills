# Button

単一 recipe styled 部品。`<button type="button">` を組み立てる。headless-ui に対応する部品は存在しない pre-styled-only コンポーネント。`icon_button`/`close_button` は同じ `assemble` ロジックを共有する Button variant 拡張。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps};

let node = button(&ButtonProps::default(), vec![], vec![]);
```

`icon_button(props: &ButtonProps, label: &str, attrs, children) -> Node` はアイコンのみの正方形 Button。`close_button(props: &ButtonProps, label: &str, attrs) -> Node` は装飾用の × アイコンを内包する `icon_button` 特化版。`css() -> String` が静的 CSS 全量を返す。`icon_size_for(size: Size) -> Size` はボタンの `Size` から埋め込みアイコン／Spinner のサイズを決定的に写像する（`Xs`/`Sm` → `Sm`、`Md`/`Lg`/`Xl` → `Md`）。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ButtonProps.variant` | `ButtonVariant`（`Solid` \| `Outline` \| `Ghost` \| `Subtle` \| `Surface` \| `Plain` \| `Link`、既定 `Solid`） | 見た目。`Surface` は淡色背景 + 輪郭、`Plain` は背景・輪郭なしで hover 背景変化なし、`Link` は hover 時のみ下線のリンク風（`<button type="button">` のまま。ページ遷移を担う `link` 部品とは別） |
| `ButtonProps.size` | `Size`（`Xs` \| `Sm` \| `Md` \| `Lg` \| `Xl`、既定 `Md`） | サイズ |
| `ButtonProps.palette` | `ColorPalette`（`Accent` \| `Info` \| `Success` \| `Warning` \| `Danger` \| `Neutral`、既定 `Accent`） | 6 色 |
| `ButtonProps.shape` | `Option<Shape>`（`Shape::Pill` \| `Shape::Circle`、既定 `None`） | `None` は既定の角丸。`Pill` は両端を最大まで丸める。`Circle` は `icon_button`/`close_button` と組み合わせたときのみ真円（テキストボタンでは真円にならない） |
| `ButtonProps.disabled` | `bool` | `disabled`/`data-disabled`/`aria-disabled="true"` を付与 |
| `ButtonProps.loading` | `bool` | `aria-busy="true"`/`data-loading` を付与し、装飾用 Spinner を子ノード先頭へ埋め込む。`disabled` と同様の 3 点セットも付与 |

## Notes

- `type="button"` を既定固定し、フォーム内の暗黙 submit 事故を防ぐ。
- `icon_button` は `label` が空白のみの場合 `"unlabeled button"` へフォールバックし、空の `aria-label=""` を出さない（fail-closed）。
- `close_button` の既定ラベルは `"Close"`（chakra-ui `CloseButton` と同値）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Icon (primitives/display)](../../primitives/display/README.md)

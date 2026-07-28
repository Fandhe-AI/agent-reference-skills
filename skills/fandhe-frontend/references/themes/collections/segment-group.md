# SegmentGroup

headless `segment_group`（5 anatomy parts: indicator, item, item-control, item-text, item-hidden-input）を包む styled wrapper。ネイティブ `<input type="radio">`（`item-hidden-input`）を視覚的に隠し、CSS custom property で駆動するスライド式 `indicator` を描画する。`size` variant のみ。`color-palette` 軸は持たない（選択状態はカラーではなく indicator の移動 + テキスト強調で示すため）。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::segment_group;
use fandhe_frontend_pre_styled_ui::Size;
use fandhe_frontend_headless_ui::data_attrs::Orientation;

pub fn root<'a>(
    size: Size,
    disabled: bool,
    orientation: Option<Orientation>,
    labelled_by: Option<&'a str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

pub use fandhe_frontend_headless_ui::segment_group::{
    indicator, item, item_control, item_text, item_hidden_input, SegmentGroup,
    DATA_STATE_CHECKED, DATA_STATE_UNCHECKED,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | `root` に `--fandhe-segment-group-font-size`/`-padding-block`/`-padding-inline` を設定。既定値 `Md` |
| disabled | `bool` | true の場合 `root` を減光 |
| orientation | `Option<Orientation>` | `vertical` で `indicator` の transform が `translateX` から `translateY` に切り替わる |
| labelled_by | `Option<&str>` | `root` の `aria-labelledby` |

## Notes

- `indicator` は headless 層が書き込む `--fandhe-segment-group-index`/`-count` custom property を読む。`indicator[data-state="unchecked"]` は `display: none`
- `item` は `:focus-within` を受け取る（input は `<label>` 内で視覚的に隠されている）。`item-control` はさらに `data-focus-visible` にも反応する
- `SegmentGroup` 状態機械は再エクスポート**される**（固有の `root()` を持たない、[pagination](./pagination.md) と同じ理由）。headless の自由関数 `root` は再エクスポートされない（styled `root` が置き換える）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [segment-group (primitives)](../../primitives/form/segment-group.md)

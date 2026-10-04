# Steps

headless `steps`（10 anatomy parts: root, list, item, trigger, indicator, separator, content, completed-content, prev-trigger, next-trigger）を包む styled wrapper。ほとんどの theme モジュールと異なり、headless `steps` は自由関数を持たない — 全パーツが `Steps` の固有メソッドであるため、ここの styled part 関数もすべて `state: &Steps` を受け取る。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::steps::Steps;
use fandhe_frontend_pre_styled_ui::steps;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

pub fn root<'a>(
    size: Size,
    palette: ColorPalette,
    state: &Steps,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

// variant 付き版。variant が Circle（既定）のとき root / list / item / indicator / separator へ委譲しバイト一致
pub fn root_with<'a>(variant: StepsVariant, size: Size, palette: ColorPalette, state: &Steps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn list_with<'a>(variant: StepsVariant, state: &Steps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item_with<'a>(variant: StepsVariant, state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator_with<'a>(variant: StepsVariant, state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator_with<'a>(variant: StepsVariant, state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum StepsVariant {
    #[default]
    Circle,
    Bar,
    Panel,
    Dot,
}

// pre-styled-ui 専用のグルーピングパーツ（headless に対応物なし、state を取らない）
pub fn body<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

pub fn list<'a>(state: &Steps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn item<'a>(state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn trigger<'a>(state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn separator<'a>(state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(state: &Steps, index: usize, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn completed_content<'a>(state: &Steps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn prev_trigger<'a>(state: &Steps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn next_trigger<'a>(state: &Steps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node

pub use fandhe_frontend_headless_ui::steps::StepsAction;

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | `root` に `--fandhe-steps-indicator-size` を設定。既定値 `Md` |
| palette | `ColorPalette` (`Accent` \| `Info` \| `Success` \| `Warning` \| `Danger`) | 現在/完了状態の indicator + separator のカラー。既定値 `Accent` |
| state | `&Steps` | `body` を除く全パーツ関数で必須。`data-state` 導出に使う `count`/`step` を保持する |
| variant | `StepsVariant` (`Circle` \| `Bar` \| `Panel` \| `Dot`) | `*_with` 系のみ。`Circle`（既定）は円形 indicator + 区切り線の従来の見た目。`Bar` は indicator を持たず item 上端の太線で進捗を表す。`Panel` は枠付き等幅パネル + シェブロン区切り。`Dot` はドット列 + 「n/m」進捗テキスト |

## Notes

- `body` は縦向き（`Orientation::Vertical`）の `root` で `list` 以外（`content` / `prev-trigger` 等）をまとめる `<div>`（`data-part="body"`）
- `Steps` 状態機械はあえて再エクスポート**しない** — `state.root(...)` を直接呼ぶと variant クラスをバイパスしてしまうため、呼び出し側は `fandhe_frontend_headless_ui::steps::Steps` を import しこのモジュールの styled 関数を経由する必要がある
- `indicator` は `data-state`（`complete`/`current`/`incomplete`）を使う。`separator` は `data-complete`（存在マーカー）を使う
- `item` は `separator` が伸びられるよう `flex: 1` を持つ。`item:last-child` は後続 separator が無いため `flex`/`min-height` をリセットする。垂直方向では `item` が `flex-direction: column` に切り替わる
- `trigger`/`prev-trigger`/`next-trigger` はネイティブ `<button>` のため素の `:focus-visible` が適用される
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [steps (primitives)](../../primitives/collections/steps.md)

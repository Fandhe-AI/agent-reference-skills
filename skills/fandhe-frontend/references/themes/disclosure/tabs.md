# Tabs

`fandhe_frontend_headless_ui::tabs` にタブ切り替えの既定 CSS を追加する styled ラッパー。headless 層は Root / List / Trigger / Content / Indicator（opt-in）を単一の合成関数 `tabs` として組み立てる（他のコンポーネントと異なりパーツごとの自由関数を持たない）。`size`/`color-palette` variant クラスを root へ付与するため styled `tabs` を本クレートで新設する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::tabs::{self, ActivationMode, Orientation, TabItem, TabsProps, TabsVariant};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = tabs::tabs(
    TabsVariant::Line,
    Size::Md,
    ColorPalette::Accent,
    &TabsProps {
        id: "t",
        selected: "a",
        orientation: Orientation::Horizontal,
        activation_mode: ActivationMode::Automatic,
        loop_focus: true,
        indicator: false,
    },
    vec![TabItem { value: "a", trigger: vec![], content: vec![], disabled: false }],
);
```

```rust
pub fn tabs(variant: TabsVariant, size: Size, palette: ColorPalette, props: &TabsProps<'_>, items: Vec<TabItem<'_>>) -> Node;

pub enum TabsVariant { Line /* 既定 */, Enclosed }
```

`TabsProps`/`TabItem`/`ActivationMode`/`Orientation` は headless 層から選択的に再エクスポートされる。未スタイルの headless 自由関数 `tabs`/`tabs_with_root_attrs` が必要な場合は `fandhe_frontend_headless_ui::tabs` を直接 import する。

## Anatomy

```
root
  list
    trigger
  content
  indicator (opt-in)
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `TabsVariant` | `Line` | `Line`（下線スタイル。selected trigger の下側を `color-palette` の強調色で下線表示する従来の見た目）/ `Enclosed`（セグメント / ピル型。`list` を角丸の淡色コンテナにし、selected trigger を白背景 + 微小な影で浮き上がらせる）。第1引数 |
| `size` | `Size` | `Md` | root へのみクラスを付与し、`--fandhe-tabs-trigger-padding`/`-content-padding`（root スコープ custom property、CSS 継承で `trigger`/`content` へ伝播）を切り替える |
| `palette` | `ColorPalette` | `Accent` | 選択中 trigger の `border-bottom-color` を `--fandhe-palette` 経由で切り替える（tabs のみが対応する第2軸） |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `trigger` / `content` | `data-state` | `active` \| `inactive`（Tabs は `open`/`closed` ではなくこの語彙を使う） |

`content` は `data-state="inactive"` のとき `display: none`。`trigger` は選択中に `color`/`border-bottom-color` を強調し、キーボード操作時のみ `:focus-visible` のフォーカスリングを持つ。

## Notes

- headless 層に `attrs` を受け取る引数がないため（`TabsProps`/`items` のみ）、`root` の他 styled パーツと異なり `drop_class_attr` は不要
- Tabs は状態機械を持たない（選択状態は `TabsProps.selected` による SSR 静的決定のみ）
- Themes は Primitives（`fandhe_frontend_headless_ui::tabs`）への薄いラッパーであり、既定 CSS のみを追加する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Tabs (primitives)](../../primitives/disclosure/tabs.md)
- [Accordion](./accordion.md)

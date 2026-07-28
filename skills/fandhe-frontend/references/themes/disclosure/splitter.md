# Splitter

`fandhe_frontend_headless_ui::splitter` にリサイズ可能パネルの既定 CSS を追加する styled ラッパー。`size`/`palette` variant クラス付与のため styled `root`/`panel` を本クレートで再定義し、`resize_trigger_indicator`/`PanelSpec`/`SplitterAction` のみを選択的に再エクスポートする。状態機械 `Splitter` はあえて再エクスポートしない。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::splitter::{PanelSpec, Splitter};
use fandhe_frontend_headless_ui::Orientation;
use fandhe_frontend_pre_styled_ui::splitter;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let s = Splitter::new(
    &[PanelSpec::new(50.0, 0.0, 100.0), PanelSpec::new(50.0, 0.0, 100.0)],
    Orientation::Horizontal,
);
let root = splitter::root(Size::Md, ColorPalette::Accent, &s, false, vec![], vec![]);
let panel0 = splitter::panel(&s, 0, "panel-a", vec![], vec![]);
let trigger = splitter::resize_trigger(&s, 0, "panel-a", false, vec![], vec![]);
```

```rust
pub fn root<'a>(size: Size, palette: ColorPalette, state: &Splitter, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn panel<'a>(state: &Splitter, panel_index: usize, id: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn resize_trigger<'a>(state: &Splitter, trigger: usize, panel_id: &'a str, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

## Anatomy

```
root
  panel
  resize-trigger
    resize-trigger-indicator
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.size` | `Size` | `Md` | `root` へのみクラスを付与し、`--fandhe-splitter-trigger-size`（root スコープ custom property）でトリガーの厚みを切り替える |
| `root.palette` | `ColorPalette` | `Accent` | `resize-trigger` の強調色を `--fandhe-palette` 経由で切り替える |
| `panel.panel_index` | `usize` | — | `Splitter::size` の添字。範囲外は `flex-basis` 出力を省略し `auto` へフォールバック（fail-closed） |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| `root` / `resize-trigger` | `data-orientation` | `horizontal` \| `vertical` |
| `root` / `resize-trigger` | `data-disabled` | 存在属性 |

## Notes

- 動的な値は `panel` が組み立てる `style="--fandhe-splitter-size: <pct>%"` の1点のみ（`Splitter::size` から算出）
- `resize-trigger` は `role="separator"` + `aria-controls` を持ち、キーボード操作時のみ `:focus-visible` のフォーカスリングを持つ
- pointer ドラッグ・キーボード操作の DOM 配線、collapse/expand、`onResize`/`onCollapse` コールバックはスコープ外
- Themes は Primitives（`fandhe_frontend_headless_ui::splitter`）への薄いラッパーであり、既定 CSS のみを追加する。状態管理・hydration が必要な場合は Primitives の `Splitter` を直接 import する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Splitter (primitives)](../../primitives/disclosure/splitter.md)

# Progress

進捗表示の styled 部品。Primitives の `Progress` 値状態機械（headless-ui）の Root を薄くラップし、Linear（track / range）・Circular（SVG）パーツへ既定 CSS（indeterminate 時の回転・横 / 縦スライドアニメーション含む）を追加する。読み込みのみを示す用途には Spinner を使う。

## Anatomy

```
root（styled、size / variant / color-palette クラス付与）
  label
  value-text
  track
    range（styled、determinate 時に --fandhe-progress-percent を設定）
  circle（headless、SVG）
    circle-track
    circle-range
  marker-group（pre-styled 専用）
    marker（pre-styled 専用）
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::progress::Progress;
use fandhe_frontend_pre_styled_ui::progress::{self, Orientation, ProgressAction, ProgressProps};

let p = Progress::new(0.0, 100.0, Some(40.0), Orientation::Horizontal);
let node = progress::root(&p, &ProgressProps::default(), None, vec![], vec![]);

pub fn root<'a>(
    progress: &Progress,
    props: &ProgressProps,
    aria_valuetext: Option<&str>,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node
pub fn range<'a>(progress: &Progress, attrs: Vec<(&'a str, &'a str)>) -> Node
pub fn marker_group<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn marker<'a>(progress: &Progress, value: f64, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: progress` | `&Progress` | — | headless `Progress` 状態機械のインスタンス（min/max/value/orientation の単一情報源） |
| `ProgressProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg` |
| `ProgressProps.variant` | `ProgressVariant` | `Outline` | `Outline`（中立トラック + 淡い内側 1px 枠）/ `Subtle`（palette 淡色トラック）/ `Plain`（枠線なしの中立トラック、range は palette 色） |
| `ProgressProps.palette` | `ColorPalette` | `Accent` | `Accent` / `Info` / `Success` / `Warning` / `Danger` |
| `root: aria_valuetext` | `Option<&str>` | `None` | `Some` のときのみ `aria-valuetext` を出力 |
| `range: progress` | `&Progress` | — | determinate（`Progress::percent` が `Some`）のときのみ `--fandhe-progress-percent` を含む `style` を付与する。indeterminate では `style` を出力しない。呼び出し側 `attrs` の `style` は除去される |
| `marker: value` | `f64` | — | マイルストーンの位置。`min` / `max` へ clamp して現在値と比較し、`data-state` を `under-value` / `at-value` / `over-value` に固定する。配置には使わない（CSS Grid が等間隔に配置）。indeterminate・非有限値は `over-value`。呼び出し側 `attrs` の `data-state` は除去される |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / circle / circle-track / circle-range | `data-state` | `indeterminate` \| `loading` \| `complete` |
| root | `data-value` / `data-max` | 数値 |
| marker | `data-state` | `under-value` \| `at-value` \| `over-value` |

## Notes

- `Progress` 型自体は再エクスポートしない。状態管理・hydration が必要な呼び出し側は `fandhe_frontend_headless_ui::progress::Progress` を直接 import する。`Orientation` と `ProgressAction` は選択的に再エクスポートされる
- `circle`/`circle_track`/`circle_range` は headless の inherent メソッド（`p.circle(...)` 等）をそのまま呼ぶ。styled 層は `root` にのみ `size` / `variant` / `color-palette` クラスを付与する
- `marker-group` / `marker` は pre-styled 専用のレイアウトパート（headless anatomy に存在しない）。`wasm-full` の hydration による `marker` の `data-state` 動的更新は行わず SSR 静的出力のみ
- `stylesheet()` は indeterminate 時の `@keyframes`（円形の回転、linear range の横 / 縦スライド）と `prefers-reduced-motion: reduce` 時のアニメーション無効化を含む
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Spinner](./spinner.md)
- [Primitives: Progress](../../primitives/display/progress.md)

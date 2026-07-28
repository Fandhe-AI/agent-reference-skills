# Progress

進捗表示の styled 部品。Primitives の `Progress` 値状態機械（headless-ui）の Root を薄くラップし、Circular（SVG）パーツへ既定 CSS（indeterminate 時の回転アニメーション含む）を追加する。読み込みのみを示す用途には Spinner を使う。

## Anatomy

```
root（styled、size クラス付与）
  circle（headless、SVG）
    circle-track
    circle-range
```

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::progress::Progress;
use fandhe_frontend_headless_ui::Orientation;
use fandhe_frontend_pre_styled_ui::progress;
use fandhe_frontend_pre_styled_ui::Size;

let p = Progress::new(0.0, 100.0, Some(40.0), Orientation::Horizontal);
let node = progress::root(&p, Size::Md, None, vec![], vec![]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: progress` | `&Progress` | — | headless `Progress` 状態機械のインスタンス（min/max/value/orientation の単一情報源） |
| `root: size` | `Size` | `Md` | `Sm` / `Md` / `Lg`。circle の `--size`/`--thickness` を切り替える |
| `root: aria_valuetext` | `Option<&str>` | `None` | `Some` のときのみ `aria-valuetext` を出力 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / circle / circle-track / circle-range | `data-state` | `indeterminate` \| `loading` \| `complete` |
| root | `data-value` / `data-max` | 数値 |

## Notes

- `Progress` 型自体は再エクスポートしない。状態管理・hydration が必要な呼び出し側は `fandhe_frontend_headless_ui::progress::Progress` を直接 import する
- `circle`/`circle_track`/`circle_range` は headless の inherent メソッド（`p.circle(...)` 等）をそのまま呼ぶ。styled 層は `root` にのみ `size` クラスを付与する
- Linear（Track/Range）用の styled ラッパーは本イシューのスコープ外（circle 系のみ対応）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Spinner](./spinner.md)
- [Primitives: Progress](../../primitives/display/progress.md)

# Timeline

時系列に並ぶ出来事を connector（縦線）+ indicator（点）+ content で表示する静的 styled コンポーネント。root/item/connector/separator/indicator/content/title/description の 8 パーツで構成する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::recipe::{ColorPalette, Size};
use fandhe_frontend_pre_styled_ui::timeline::{self, TimelineVariant};
use fandhe_frontend_core::text;

let node = timeline::root(
    TimelineVariant::default(),
    Size::Md,
    ColorPalette::default(),
    vec![],
    vec![timeline::item(
        vec![],
        vec![
            timeline::connector(vec![], vec![timeline::indicator(vec![], vec![]), timeline::separator(vec![], vec![])]),
            timeline::content(vec![], vec![timeline::title(vec![], vec![text("First")])]),
        ],
    )],
);
```

## Anatomy

```
root (ol)
  item (li)
    connector
      indicator
      separator
    content
      title
      description
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: variant` | `TimelineVariant` (`Solid`/`Subtle`/`Outline`/`Plain`) | `Solid` | indicator の塗り方 |
| `root: size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | indicator の寸法・connector の太さ |
| `root: palette` | `ColorPalette` (`Accent`/`Info`/`Success`/`Warning`/`Danger`) | `Accent` | indicator/separator の色 |

## Notes

- `xl` size は採用しない（`Size` は Sm/Md/Lg の 3 段階に統一）。
- 最終 item は `separator` パーツを組み込まないことで非表示にする契約（chakra-ui の `showLastSeparator` 相当は recipe 側で自動制御しない、呼び出し側の責務）。
- headless-ui 側に対応する anatomy は存在しない（pre-styled-ui 層のみで新規定義）。`<ol>`/`<li>` の意味論のみで追加の `role` は付与しない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Stat](./stat.md)
- [Data List](./data-list.md)

# Rich text

`fandhe-frontend-wireframe-ui` のリッチテキスト行部品。アイコン + ラベル + 末尾アイコンを 1 行（または縦積み）で並べる非インタラクティブなローファイ・プレースホルダーで、「アイコン付き行」の配置イメージ提示を想定する。API は `rich_text(label, leading, trailing, size, bold, orientation)` の 6 引数。

## Signature / Usage

```rust
pub fn rich_text(
    label: &str,
    leading: Option<Node>,
    trailing: Option<Node>,
    size: Size,
    bold: Bold,
    orientation: Orientation,
) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{icon, rich_text, Bold, Orientation, Size};

rich_text(
    "設定",
    Some(icon::cog(Size::Md)),
    None,
    Size::Md,
    Bold(false),
    Orientation::Horizontal,
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| label | `&str` | - | 必須のラベル文言。 |
| leading | `Option<Node>` | `None` | 先頭スロット。`icon::<name>(size)` の戻り値を渡す。`None` のときは出力されない。 |
| trailing | `Option<Node>` | `None` | 末尾スロット。`leading` と同じ規約。`None` のときは出力されない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| bold | `Bold` | `Bold(false)` | true のときラベルを太字にする。 |
| orientation | `Orientation` | `Orientation::Horizontal` | Horizontal は横並び、Vertical はスロット・ラベルを縦積みにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/rich-text/
- 低忠実度ワイヤーフレーム部品。Primitives・Themes に同名の Rich text は無く、本部品は `fandhe-frontend-wireframe-ui` 固有。`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。操作可能なリンク行・ボタンが必要な場合は Themes の Link / Button を使う。
- 原案差分: `Size` + `Bold` + テキストの 3 点セットと `leading` / `trailing` の `Option<Node>` スロット規約（§11.4）を組み合わせて独立設計。`Orientation` は stack / divider / tabs と共用する既存の共通型（`Horizontal` / `Vertical`）。
- `Bold` / `Orientation` の CSS は本部品スコープで初めて宣言された（両 class は `props.rs` が class 名のみ定義していた）。
- 非インタラクティブ: `role` / `aria-*` / `tabindex` を付与せず、`button` / `a[href]` も出力しない。末尾アイコンは装飾であり遷移を意味しない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Rich text）。

## Related

- [Text wireframes](./overview.md)
- [Link (Themes)](../../themes/typography/link.md)
- [Button (Themes)](../../themes/forms/button.md)

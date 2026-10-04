# Annotation

`fandhe-frontend-wireframe-ui` の注釈ボックス部品。太字タイトル + 任意の説明文を持つ非インタラクティブなローファイ・プレースホルダーで、画面設計図の余白に設計意図を書き込む用途を想定する。API は `annotation(title, description, size, primary)` の 4 引数。

## Signature / Usage

```rust
pub fn annotation(title: &str, description: Option<&str>, size: Size, primary: Primary) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{annotation, Primary, Size};

annotation(
    "配置意図",
    Some("この余白はナビゲーションの折り返し確認用のプレースホルダーです。"),
    Size::Md,
    Primary(false),
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| title | `&str` | - | 太字で表示する必須のタイトル文言。 |
| description | `Option<&str>` | `None` | 省略可能な説明文。`None` のときはパート要素自体が出力されない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| primary | `Primary` | `Primary(false)` | true のとき強調（反転色）バリアントにする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/annotation/
- 低忠実度ワイヤーフレーム部品。Primitives・Themes に同名の Annotation は無く、本部品は `fandhe-frontend-wireframe-ui` 固有。`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。操作可能な注釈・ツールチップが必要な場合は Primitives の Tooltip を使う。
- 原案差分: API は blocks.pm の Figma プロパティ（`Type` / `Emphasis` 相当のトグル群）を転写せず、`Size` 軸 + 強調 bool + テキスト + 省略可能テキストから独立設計。
- 配色は黒塗り二値ではなく `Primary(true)` 時のみ背景・文字色を反転するグレースケール。反転時の説明文はコントラスト確保のため `--fw-wire-fill` を使う。
- 非インタラクティブ: `role` / `aria-*` / `tabindex` を付与せず、`button` / `a[href]` も出力しない。
- スクリーンショットは非掲載（視覚的参照元は blocks.pm の Annotation）。

## Related

- [Text wireframes](./overview.md)
- [Tooltip (Primitives)](../../primitives/overlays/tooltip.md)

# Card basic

`fandhe-frontend-wireframe-ui` のカード型データ表示プレースホルダー。先頭の視覚要素スロット・主テキストと補足テキストの 2 段・末尾の補助アイコンスロットを 1 枚の枠線カードにまとめる非インタラクティブな部品。

## Signature / Usage

```rust
pub fn card_basic(
    primary: &str,
    secondary: Option<&str>,
    leading: Option<Node>,
    trailing: Option<Node>,
    size: Size,
) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{avatar, card_basic, icon, Size};

card_basic(
    "山田太郎",
    Some("エンジニア"),
    Some(avatar(None, Size::Md, true)),
    Some(icon::ellipsis(Size::Md)),
    Size::Md,
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| primary | `&str` | - | 必須の主テキスト。1 行で ellipsis 省略される。 |
| secondary | `Option<&str>` | `None` | 省略可能な補足テキスト。`None` のときは要素自体を出力しない。 |
| leading | `Option<Node>` | `None` | 省略可能な先頭スロット。`None` のときはスロット要素自体を出力しない。 |
| trailing | `Option<Node>` | `None` | 省略可能な末尾スロット。`leading` と同じ規約。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。パディング・文字サイズに反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/card-basic/
- 低忠実度ワイヤーフレーム部品。Themes の `Card` とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。操作可能なカード部品が必要な場合は Themes の Card を使う。
- 原案差分: 右アイコンは `avatar` / `nav_item` / `tag` / `link` と同じ `Option<Node>` スロット規約（§11.4）へ統一。`menu: bool` 案は不採用。
- `avatar` は内蔵しない。部品の合成は呼び出し側の選択で、デモでは `Some(avatar(None, size, true))` を `leading` に、`icon::ellipsis` を `trailing` に渡している。
- `Active` / `Disabled` の表示状態軸は持たない（`progress` / `spinner` と同じ表示専用部品）。
- 配色はグレースケールのトークン（`--fw-wire-paper` / `--fw-wire-ink` / `--fw-wire-ink-muted` / `--fw-wire-line`）。
- スクリーンショットはライセンス上の理由で非掲載。

## Related

- [Data Display wireframes](./overview.md)
- [Avatar (wireframe)](./avatar.md)
- [Card (Themes)](../../themes/data-display/card.md)

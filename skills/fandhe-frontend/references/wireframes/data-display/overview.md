# Wireframes: Data Display

`fandhe-frontend-wireframe-ui` の Data Display カテゴリ（8 部品）。アバター・ロゴ・カード・件数・絵文字・アイコン・リスト・数値指標を、画面設計図上の配置イメージとして示す非インタラクティブな低忠実度部品群。

## Signature / Usage

| 名前 | 関数 | 説明 | 個別ページ |
|------|------|------|-----------|
| Avatar | `avatar` | 正方形 / 円形の枠に人物線画（既定）を置くアバター枠 | [avatar.md](./avatar.md) |
| Brand | `brand` | 正方形の枠に汎用抽象ブランドマーク（既定）を置くロゴ枠 | [brand.md](./brand.md) |
| Card basic | `card_basic` | 先頭・末尾スロット + 主 / 補足テキストの 1 枚カード | [card-basic.md](./card-basic.md) |
| Counter | `counter` | 件数を収めた小さな丸（ピル）バッジ | [counter.md](./counter.md) |
| Emoji | `emoji` | 絵文字 1 個（空文字列は破線の円） | [emoji.md](./emoji.md) |
| Icon | `icon` | SVG ラインアートのグリフ 1 つ（`icon::ALL` に 24 種） | [icon.md](./icon.md) |
| List | `list` | 箇条書き / 番号付きリストの配置イメージ | [list.md](./list.md) |
| Stat | `stat` | ラベル + 大きな数値 + 任意の増減インジケータ | [stat.md](./stat.md) |

カテゴリ共通の使い方（`Option<Node>` スロットへ別部品やアイコンを渡して合成する。`Size` は xs〜xl の 5 段）:

```rust
use fandhe_frontend_wireframe_ui::{avatar, card_basic, icon, Size};

card_basic(
    "山田太郎",
    Some("エンジニア"),
    Some(avatar(None, Size::Md, true)),
    Some(icon::ellipsis(Size::Md)),
    Size::Md,
)
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/
- Data Display 部品はすべて位置引数の関数で、props 構造体は無い。補助型は `stat::StatTrend` / `stat::StatDelta`、`icon` モジュールの 24 グリフ関数と `icon::ALL` / `icon::IconEntry`
- Avatar / Icon / List / Stat / Counter は Themes に同名または近い部品（Avatar / Icon / List / Stat / Badge）があるが別物の低忠実度部品。Card basic は Themes の Card に近い別物。`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- `role` / `aria-*` / `tabindex` は付与せず、`<img>` も出力しない（画像 URL を受け取る API は無い）
- `Option<Node>` スロット: Avatar / Brand は `None` で既定グリフにフォールバックする（§11.4 の「`None` なら出力しない」からの意図的な逸脱）。Card basic の `leading` / `trailing` は `None` なら出力しない
- Icon の glyph 引数は `Node` ではなく `fn(Size) -> Node`
- List は blocks.pm に対応部品がなく、Stat とともに wireframe-ui 独自追加部品

## Related

- [共通型 (Size / Orientation)](../foundations/common-types.md)
- [Text overview](../text/overview.md)
- [Media overview](../media/overview.md)

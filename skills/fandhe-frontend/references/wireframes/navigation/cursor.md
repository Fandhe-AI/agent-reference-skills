# Cursor (wireframe)

`fandhe-frontend-wireframe-ui` のマウスカーソル・プレースホルダー。矢印・手のひらの 2 種のグリフに任意の名前タグを添え、共同編集カーソル（他利用者の名前チップ付きポインタ）のような配置イメージを静的に示す。API は `cursor(kind, label, size)` の 3 引数で、props 構造体は導入していない。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/cursor.rs
#[must_use]
pub fn cursor(kind: CursorKind, label: Option<&str>, size: Size) -> Node

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Default)]
pub enum CursorKind {
    #[default]
    Arrow, // 矢印カーソル（既定）
    Hand,  // 手のひら（ポインタ）カーソル
}

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{cursor, CursorKind, Size};

cursor(CursorKind::Arrow, Some("にゃんこ"), Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| kind | `CursorKind` | `CursorKind::Arrow` | カーソルの見た目の種類（矢印/手のひら）。 |
| label | `Option<&str>` | `None` | 省略可能な名前タグ。`Some("にゃんこ")` のように渡す。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

### CursorKind

| Variant | Description |
|---------|-------------|
| `Arrow` | 矢印カーソル（既定）。 |
| `Hand` | 手のひら（ポインタ）カーソル。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/cursor/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。実際にポインタ追従するカーソルとしては出力しない（追従・hover でバリアントが変わるカスタムカーソルが必要な場合は Blocks の Cursor hover cards（wasm-full の `cursor` feature）を検討）
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 既存アイコンでは表現できないため `icon::cursor_arrow` / `icon::cursor_hand` の 2 種を新規追加（`icon::ALL` へ登録）。`cursor` は `CursorKind` に応じて内部でどちらか一方を呼ぶ
- `CursorKind` は部品ローカルの列挙型で `crate::props` へは昇格していない。クレートルートから再エクスポートする初めての部品ローカル列挙型
- `Active` / `Disabled` は持たない（hover 状態相当は `CursorKind::Hand` で表現できるため）
- 名前タグは `Node` スロットではなく `Option<&str>` の内部パート（`nav_item` の `counter: Option<&str>` と同型）
- グリフの塗りは `--fw-wire-paper`、輪郭は `currentColor`（`--fw-wire-ink`）。`ColorPalette` には依存しない
- 視覚的な参照元は blocks.pm の Cursor 部品。ライセンス上の理由によりスクリーンショットは掲載されない

## Related

- [Navigation overview](./overview.md)
- [共通型 (Size ほか)](../foundations/common-types.md)

# Media

動画やメディア埋め込み領域の配置イメージを示す、16:9 固定の非インタラクティブなプレースホルダー。`content`（省略可能なコンテンツスロット）と `size` の 2 引数だけを受け取る。`content` を省略すると既定の再生グリフが表示され、実際の動画再生は提供しない（`<video>` / `<iframe>` は出力しない）。

## Signature / Usage

```rust
pub fn media(content: Option<Node>, size: Size) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{icon, media, Size};

media(None, Size::Md);                         // 既定（再生グリフ）
media(Some(icon::image(Size::Md)), Size::Md);  // スロット差し替え（静止画アイコン）
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `Option<Node>` | `None` | 省略可能なコンテンツスロット。`None` のときは既定の再生グリフ（`icon::play`）にフォールバックする。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。中央のディスク・グリフの大きさに反映される（枠自体は 16:9 固定・親幅いっぱいに広がる）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/media/
- 低忠実度ワイヤーフレーム部品。Primitives / Themes のコンポーネントとは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。
- 原案差分: `content: None` は再生グリフへフォールバックする（§11.4 の `None` なら出力しない原則からの意図的な逸脱。`avatar` が先例）。中身の無い枠は `frame` と見分けがつかないため。
- 動画か静止画かは bool ではなくスロット差し替えで表す（`Some(icon::image(size))` で静止画のメディア枠）。画像プレースホルダー自体は Image 部品の担当。
- `size` は中央のディスク・グリフの大きさにのみ効き、寸法は `--fw-wire-control-size` を `var()` 参照する。
- `src` / `poster` のような外部リソース引数は持たず、`controls` も出力しない。
- 表示専用: `data-*` / `role` / `aria-*` / `tabindex` を出力せず、`Active` / `Disabled` の表示状態も持たない。配色は `--fw-wire-fill-subtle` / `--fw-wire-ink-muted` のグレースケール。
- 視覚的参照元は blocks.pm の Placeholder 部品（スクリーンショットは非掲載）。

## Related

- [Media wireframes](./overview.md)
- [Image (wireframe)](./image.md)
- [Icon (wireframe)](../data-display/icon.md)

# NavList

文書ナビゲーション（サイドバー用途）の縦方向リスト。Primitives の headless NavList（`nav`/`heading`/`ul`/`li`/`a` 構造）を薄くラップし、list-style 除去・現在位置ハイライトの既定 CSS を追加する。

## Anatomy

```
root（styled、caller class 除去のみ）
  heading
  list
    item
      link
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::nav_list;

let node = nav_list::root("Documentation", vec![], vec![]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: label` | `&str` | — | `aria-label` として必須付与するラベル文字列 |

## Notes

- `heading`/`list`/`item`/`link` は Primitives（headless-ui）の自由関数をそのまま再エクスポートする。styled 層は `root` のみ再定義する（呼び出し側 `class` を除去する処理のみ）
- 現在位置の強調は `link` の `aria-current="page"` に対する CSS 状態セレクタで表現する（`--fandhe-color-accent` の色・太字）
- 本コンポーネントの公式ドキュメントページは執筆時点で本文未充填（Demo・詳細は将来 Phase で追加予定）。本ページの内容はソース（`crates/pre-styled-ui/src/nav_list.rs`）に基づく
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Breadcrumb](./breadcrumb.md)
- [NavigationMenu](./navigation-menu.md)
- [Primitives: NavList](../../primitives/navigation/nav-list.md)

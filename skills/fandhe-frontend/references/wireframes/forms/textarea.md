# Textarea (wireframe)

`fandhe-frontend-wireframe-ui` の複数行テキスト入力欄部品。「ここに複数行の自由記述欄がある」という配置イメージを伝える非インタラクティブなローファイ・プレースホルダー。blocks.pm に対応部品はなく、wireframe-ui 独自の追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/textarea.rs
/// `rows` の上限。これを超える値は本値へ、`0` は `1` へ丸める（[`textarea`] 参照）。
pub const MAX_ROWS: u32 = 20;

#[must_use]
pub fn textarea(
    text_value: &str,
    rows: u32,
    size: Size,
    active: Active,
    disabled: Disabled,
) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{textarea, Active, Disabled, Size};

textarea("入力中の内容", 3, Size::Md, Active(true), Disabled(false))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| text | `&str` | - | 必須のテキスト。空文字列のときはテキストパート要素自体を出力しない。 |
| rows | `u32` | - | 行数。1〜20 へ丸める（0 は 1 へ、21 以上は 20 へ）。行プレースホルダー要素をこの個数だけ生成する。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。フォントサイズに反映される。 |
| active | `Active` | `Active(false)` | true のとき data-active="" を付与し、フォーカス中の見た目にする。 |
| disabled | `Disabled` | `Disabled(false)` | true のとき data-disabled="" を付与し、無効の見た目にする。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/textarea/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名 Textarea とは別物。操作可能な複数行入力欄が必要な場合は Themes の Textarea を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- ArgRow 表のテキスト引数名は `text` だが、`src/textarea.rs` の実シグネチャでは `text_value`
- `rows` はネイティブ `<textarea>` の属性でも `style` 属性でもなく、行プレースホルダー要素（`div.fw-wire-textarea-line`）を `rows` 個並べる構造表現。上限 `MAX_ROWS = 20` で飽和させ、利用者値 1 個から無制限にノードを増やせないようにする資源有界化
- 「State」軸は専用の共有型を新設せず、`Active`（フォーカス中の見た目）と `Disabled`（無効）に分解
- `role` / `aria-*` / `tabindex` は付与せず、ネイティブ `<textarea>` も出力しない。リサイズグリップは CSS の `::after` 擬似要素のみ
- 配色は `--fw-wire-*` モノクロトークンのみ

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active / Disabled)](../foundations/common-types.md)
- [Textarea (Themes)](../../themes/forms/textarea.md)

# Stepper (wireframe)

`fandhe-frontend-wireframe-ui` の複数ステップ進捗表示プレースホルダー。ステップ名のスライスと現在ステップの index から、番号付きステップの横並び進捗表示だけを示す非インタラクティブな部品。blocks.pm に対応部品はなく、wireframe-ui 独自の追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/stepper.rs
#[must_use]
pub fn stepper(steps: &[&str], active: usize, size: Size) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{stepper, Size};

let steps = ["アカウント作成", "プラン選択", "支払い", "完了"];
stepper(&steps, 1, Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| steps | `&[&str]` | - | ステップ名のスライス。空スライスのときはルート要素のみを出力する。 |
| active | `usize` | - | 現在ステップの index（0 始まり）。`steps.len()` 以上のときは全ステップ完了として扱う（パニックしない）。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/stepper/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の Steps とは別物。`<ol>` / `<li>` / `<button>` / `<a href>` は出力しない。操作可能なステップ表示が必要な場合は Themes / Primitives の Steps を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 状態写像は 3 分岐: `i < active` は完了（部品ローカルの `data-complete`）、`i == active` は現在（共通型 `Active` の再利用、`data-active`）、`i > active` は未着手（属性なし）。完了状態の専用型は無く、`fandhe_frontend_core::attr_if` を部品内で直接呼ぶ
- `active >= steps.len()`（空スライス含む）はエラーにせず「全ステップ完了・現在ステップなし」として扱い、`clamp` も `panic` もしない
- 番号は常に `i + 1` を表示し、完了ステップもチェックアイコンへ差し替えない
- 横並びのみ。`Orientation` は受け付けず縦並びは対象外
- ステップ間の連結線は CSS の `::before` 疑似要素のみで描き、余分なノードを出さない
- 配色は `--fw-wire-ink` / `--fw-wire-ink-muted` / `--fw-wire-fill` トークンのみ

## Related

- [Forms overview](./overview.md)
- [共通型 (Size / Active)](../foundations/common-types.md)
- [Steps (Themes)](../../themes/collections/steps.md)
- [Steps (Primitives)](../../primitives/collections/steps.md)

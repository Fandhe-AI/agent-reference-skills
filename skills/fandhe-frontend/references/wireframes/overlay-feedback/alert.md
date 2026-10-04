# Alert (wireframe)

`fandhe-frontend-wireframe-ui` の横長の警告・通知バナーのプレースホルダー。アイコン + タイトル + 任意の説明文からなり、画面設計図で「ここに警告・通知が出る」という配置を示す。API は `alert(severity, title, description, icon, size)` の 5 引数で、props 構造体はない。blocks.pm に対応部品を持たない wireframe-ui 独自追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/alert.rs
#[must_use]
pub fn alert(
    severity: Severity,
    title: &str,
    description: Option<&str>,
    icon: Option<Node>,
    size: Size,
) -> Node

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Severity {
    #[default]
    Info,    // 情報（既定）
    Warning, // 警告
    Error,   // エラー
}

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::alert::Severity;
use fandhe_frontend_wireframe_ui::{alert, icon, Size};

alert(
    Severity::Warning,
    "ストレージ容量が残りわずかです",
    Some("空き容量が 10% を下回りました。"),
    Some(icon::bell(Size::Md)),
    Size::Md,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| severity | `Severity` | `Severity::Info` | 重要度（info/warning/error）。修飾 class として表す。 |
| title | `&str` | - | 必須。常に出力するタイトル文言。 |
| description | `Option<&str>` | `None` | 省略可能な説明文。`None` のときはパート要素自体を出力しない。 |
| icon | `Option<Node>` | `None` | 省略可能なアイコンスロット。`icon::bell` 等の戻り値をそのまま渡す。`None` のときはアイコンのパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

### Severity

| Variant | Description |
|---------|-------------|
| `Info` | 情報（既定）。 |
| `Warning` | 警告。 |
| `Error` | エラー。 |

`Severity::ALL: [Severity; 3]` で宣言順（`Info`〜`Error`）に全重要度を列挙できる。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/alert/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`role="alert"` / `aria-live` は出力せず、閉じるボタンも持たない。アクセシブルな alert が必要な場合は Themes の Alert を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 重要度は色ではなくモノクロの 3 段差（地色・枠の太さ・反転配色）で区別する。Error は背景・枠・文字を反転、Warning は開始辺の枠を太くする
- `Severity` は部品ローカルの型で `crate::props` へは昇格していない（`tooltip::TooltipSide` と同じ判断）。docs-site では `fandhe_frontend_wireframe_ui::alert::Severity` から import している
- アイコンは重要度から自動選択せず、呼び出し側が任意の既存アイコン（例: `icon::bell`）を `Option<Node>` で渡す（`link` / `file_drop` と同じ規約）
- `size` 引数は、既存の全部品が `Size` 引数を受け取る規約に合わせて追加されたもの
- `role="alert"` / `aria-live` / `aria-*` / `tabindex` / `<button>` は出力しない
- 配色はグレースケールのトークンのみで `ColorPalette` には依存しない

## Related

- [Overlay & Feedback overview](./overview.md)
- [共通型 (Size ほか)](../foundations/common-types.md)
- [Alert (Themes)](../../themes/feedback/alert.md)

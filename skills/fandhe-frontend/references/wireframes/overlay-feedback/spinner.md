# Spinner (wireframe)

`fandhe-frontend-wireframe-ui` のローディングインジケータのプレースホルダー。円弧だけを描く円形の表示で、画面設計図上で「読み込み中」の状態を示す。API は `spinner(size)` の 1 引数のみで、props 構造体は持たない。blocks.pm に同名部品はなく wireframe-ui 独自追加。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/spinner.rs
#[must_use]
pub fn spinner(size: Size) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{spinner, Size};

spinner(Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。リング直径に反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/spinner/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。静的な表示専用で、実際に回転するローディングインジケータとしては動作しない。アクセシブルな読み込み中表示が必要な場合は Themes の Spinner を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 静的な円弧のみ。`@keyframes` / `animation` / 回転は一切実装しない
- CSS リングのみで描き SVG は使わない（`icon::ALL` は固定レジストリで件数テストを持つため、アイコン追加はその契約を壊す）。`border` の上辺だけを濃色にした円で円弧を表現する
- `role` / `aria-*` / `data-*` を持たない。`Active` / `Disabled` のいずれも消費しない
- `size: Size` 以外の引数を持たないため、XSS 対象となる利用者入力の経路がない
- 対話セマンティクス（`tabindex`・キーボードイベントハンドラ・フォーカス管理）は一切持たない

## Related

- [Overlay & Feedback overview](./overview.md)
- [Progress (wireframe)](./progress.md)
- [共通型 (Size ほか)](../foundations/common-types.md)
- [Spinner (Themes)](../../themes/feedback/spinner.md)

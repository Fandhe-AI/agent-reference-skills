# Wireframes: Overlay & Feedback

`fandhe-frontend-wireframe-ui` の Overlay & Feedback カテゴリ（6 部品）。警告バナー・モーダル・進捗・スピナー・トースト・吹き出しの配置イメージだけを示す、非インタラクティブ・SSR 専用の低忠実度プレースホルダー群。

## Signature / Usage

| 名前 | 関数 | 説明 | 個別ページ |
|------|------|------|-----------|
| Alert | `alert(severity, title, description, icon, size)` | アイコン + タイトル + 説明文の警告・通知バナー（`Severity`: Info / Warning / Error） | [alert.md](./alert.md) |
| Modal | `modal(title, body, actions, size)` | 中央のダイアログ枠（タイトル・本文・アクション行） | [modal.md](./modal.md) |
| Progress | `progress(value, shape, size)` | バー形・円形の進捗表示（`ProgressShape`: Bar / Circle） | [progress.md](./progress.md) |
| Spinner | `spinner(size)` | 円弧だけの静的なローディングインジケータ | [spinner.md](./spinner.md) |
| Toast | `toast(message, icon, dismissible, size)` | アイコン + 短い本文 + 見た目だけの閉じる「×」の通知カード | [toast.md](./toast.md) |
| Tooltip | `tooltip(label, side, size)` | 本文 + 三角形の指示子の吹き出し（`TooltipSide`: Top / Right / Bottom / Left） | [tooltip.md](./tooltip.md) |

カテゴリ共通の使い方（アイコンは `Option<Node>` スロットで渡す）:

```rust
use fandhe_frontend_wireframe_ui::{icon, toast, Size};

toast("保存しました", Some(icon::check(Size::Md)), true, Size::Md)
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/
- Overlay & Feedback 部品はすべて位置引数の関数で、props 構造体は無い。戻り値は `fandhe_frontend_core::Node`
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。開閉・フォーカス管理・live region 等が必要な場合は Themes / Primitives を使う。`role` / `aria-*` / `tabindex` / `on*` / `<button>` は出力しない（アイコンの装飾用 `aria-hidden` を除く）
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）
- `position: fixed` による固定配置はせず、docs のデモ枠に収まる in-flow の要素として描く
- `Severity` と `TooltipSide` は部品ローカルの型で、`fandhe_frontend_wireframe_ui::alert::Severity` / `fandhe_frontend_wireframe_ui::tooltip::TooltipSide` から import する。`ProgressShape` はクレートルートから import する
- アイコンは `icon::bell(size)` / `icon::check(size)` 等を `Option<Node>` で渡す（`alert` / `toast`）
- サイズは `Size`（xs〜xl、既定 `Size::Md`）

## Related

- [共通型 (Size ほか)](../foundations/common-types.md)
- [Navigation overview](../navigation/overview.md)

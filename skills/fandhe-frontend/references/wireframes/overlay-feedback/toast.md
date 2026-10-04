# Toast (wireframe)

`fandhe-frontend-wireframe-ui` の通知トースト風プレースホルダー。任意のアイコン + 短い本文 + 見た目だけの閉じる「×」で「一時的な通知カード」の配置イメージだけを示す非インタラクティブな部品。API は `toast(message, icon, dismissible, size)` の 4 引数で、props 構造体は導入していない。blocks.pm に対応部品を持たない wireframe-ui 独自追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/toast.rs
#[must_use]
pub fn toast(message: &str, icon: Option<Node>, dismissible: bool, size: Size) -> Node

// 呼び出し例（docs-site demo より）
use fandhe_frontend_wireframe_ui::{icon, toast, Size};

toast("保存しました", Some(icon::check(Size::Md)), true, Size::Md)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| message | `&str` | - | 必須。常に出力する短い本文。 |
| icon | `Option<Node>` | `None` | 省略可能なアイコンスロット。`icon::bell`・`icon::check` 等の戻り値をそのまま渡す。`None` のときはアイコンのパート要素自体を出力しない。 |
| dismissible | `bool` | `false` | `true` のときだけ末尾に閉じるパート（`icon::x` 固定）を出力する。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。閉じるグリフのサイズにも使う。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/toast/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`role="status"` / `aria-live` / `<button>` のいずれも実装せず、画面隅への固定配置（`position: fixed` / `absolute`）も行わない。操作可能な通知が必要な場合は Themes / Primitives の Toast を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 引数名は `text` ではなく `message`（`fandhe_frontend_core::text` と同じ値名前空間で衝突するため）
- アイコンは `Option<Node>` スロット（`link` / `file-drop` と同じ規約）。info/success 専用のグリフはなく、呼び出し側が任意の既存アイコンを渡す
- 閉じるグリフは `icon::x` 固定で、`dismissible: bool` の 1 引数で有無を切り替える（差し替え可能スロットではない）
- `Bold` / `Primary` / `Active` / `Disabled` は使わず、info/success/error 等の重要度表現も持たない。`data-*` は付与しない（アイコンスロット・閉じるグリフが持つ `data-icon` は透過）
- `<button>` / `role` / `aria-live` / `<output>` / `tabindex` / `style` / `on*` は出力しない
- 固定配置は利用者のレイアウトの責務。docs のデモ枠の中に収まる in-flow のカードで、「浮いている感じ」はハードシャドウ（`box-shadow: 0 0.25em 0 var(--fw-wire-line-subtle)`）で表現する
- 配色はグレースケール（`--fw-wire-ink` / `--fw-wire-ink-muted`）で `ColorPalette` には依存しない

## Related

- [Overlay & Feedback overview](./overview.md)
- [共通型 (Size ほか)](../foundations/common-types.md)
- [Toast (Themes)](../../themes/overlays/toast.md)
- [Toast (Primitives)](../../primitives/overlays/toast.md)

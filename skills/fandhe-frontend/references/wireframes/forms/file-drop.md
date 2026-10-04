# File drop (wireframe)

`fandhe-frontend-wireframe-ui` のファイルドロップ領域風プレースホルダー。点線枠 + 任意のアイコン + 説明文 + 任意のヒントで「ファイルをドラッグ＆ドロップする領域」の配置イメージだけを示す非インタラクティブな部品。blocks.pm に対応部品はなく、wireframe-ui 独自の追加部品。

## Signature / Usage

```rust
// fandhe-frontend-wireframe-ui 0.52.0 / src/file_drop.rs
#[must_use]
pub fn file_drop(label: &str, hint: Option<&str>, icon: Option<Node>, size: Size) -> Node

// 呼び出し例
use fandhe_frontend_wireframe_ui::{file_drop, icon, Size};

file_drop(
    "ここにファイルをドロップ",
    Some("PNG / JPG、最大 10MB"),
    Some(icon::image(Size::Md)),
    Size::Md,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | `&str` | - | 必須。常に出力する説明文。 |
| hint | `Option<&str>` | `None` | 省略可能な補助文言。`None` のときはパート要素自体を出力しない。 |
| icon | `Option<Node>` | `None` | 省略可能なアイコンスロット。`icon::image`・`icon::plus` 等の戻り値をそのまま渡す。`None` のときはアイコンのパート要素自体を出力しない。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/file-drop/
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の File Upload とは別物。操作可能なファイルアップロードが必要な場合は Themes / Primitives の File Upload を使う
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とは無関係（Rust 製）
- 専用のアップロードアイコンは持たず、`Option<Node>` アイコンスロット規約（`link` と同じ）で任意の既存アイコンを受ける
- `Bold` / `Primary` / `Active` / `Disabled` は使わず、`data-*` を付与しない（アイコンスロットに渡した `Node` 自身の `data-icon` は透過する）。「ドラッグ中」は対話状態であり非対話層の責務外
- `<input type="file">` / `<label>` / `<button>` / `<form>` / `<a href>`、`draggable` / `ondrop` / `ondragover` 等のイベント、`accept` / `multiple` 等の属性は出力しない
- 配色は `--fw-wire-ink` / `--fw-wire-ink-muted` トークンのみ

## Related

- [Forms overview](./overview.md)
- [共通型 (Size)](../foundations/common-types.md)
- [File Upload (Themes)](../../themes/forms/file-upload.md)
- [File Upload (Primitives)](../../primitives/form/file-upload.md)

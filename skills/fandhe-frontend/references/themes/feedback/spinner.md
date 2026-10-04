# Spinner

読み込み中を示すインジケータ。`role="status"` + `aria-label`（既定 `"Loading"`）でスクリーンリーダーへ状態を伝える単一 recipe styled 部品。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::spinner::{spinner, spinner_decorative, SpinnerProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = spinner(&SpinnerProps::default());

// 装飾用途（role / aria-label を持たず aria-hidden="true"）
let deco = spinner_decorative(Size::Sm, ColorPalette::Accent);

pub fn spinner(props: &SpinnerProps<'_>) -> Node
pub fn spinner_decorative(size: Size, palette: ColorPalette) -> Node
pub fn css() -> String
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `SpinnerProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg` |
| `SpinnerProps.palette` | `ColorPalette` | `Accent` | `Accent` / `Info` / `Success` / `Warning` / `Danger` |
| `SpinnerProps.label` | `&str` | `"Loading"` | `aria-label` に渡すラベル文字列 |

## Notes

- 単体利用の `spinner()` は `role="status"` + `aria-label` を常に付与する
- `spinner_decorative` は公開 API。`role` / `aria-label` を持たず `aria-hidden="true"` を付与する。`Button` の `loading: true` 時は子ノード先頭に自動で埋め込まれるが、周囲テキストが既に読み込み状態を伝えている文脈（ボタン末尾配置・Badge 内・Empty state 内など）では呼び出し側が直接組み込む。`spinner`（`role="status"`）をそうした文脈で使うと入れ子のライブリージョンや冗長なアクセシブルネームを生む
- `palette` は呼び出し元の `colorPalette` をそのまま伝播する引数（省略すると accent 固定になり親ボタンの palette を上書きするため）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Progress](./progress.md)

# DownloadTrigger

`fandhe_frontend_headless_ui::download_trigger` の唯一のパーツ `root`（`a[download]`）を再利用し、Button の recipe を scope 違いで流用する styled ラッパー。`variant`/`size`/`palette` の宣言・既定値は Button 側の1箇所にのみ存在し、DownloadTrigger 側は複製しない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::download_trigger::{root, DownloadTriggerProps};

let node = root(
    &DownloadTriggerProps::default(),
    "/assets/report.pdf",
    Some("report.pdf"),
    vec![],
    vec![/* text("Download report") */],
);
```

```rust
pub fn root<'a>(props: &DownloadTriggerProps, href: &'a str, file_name: Option<&'a str>, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
```

## Anatomy

- `root` — 唯一のパーツ、`<a href="..." download="...">`

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `ButtonVariant` | `Solid` | 見た目 variant（`crate::button::ButtonVariant` を再利用） |
| `size` | `Size` | `Md` | サイズ variant |
| `palette` | `ColorPalette` | `Accent` | colorPalette 軸 |
| `href` | `&str` | — | ダウンロード対象のリソース URL |
| `file_name` | `Option<&str>` | `None` | `download` 属性へ指定するファイル名 |

## Notes

- `disabled`/`loading` は `ButtonProps` と異なり提供しない。実体は `a` 要素であり `disabled` はネイティブに意味を持たないため、無効化が必要な場合は呼び出し側が `href` を出さない、または `aria-disabled`/`tabindex="-1"` を `attrs` で明示する
- 危険な URL スキーム（`javascript:` 等）は core の `render()` URL スキーム許可リストにより fail-closed に拒否され、`href` 属性ごと省略される
- `download` 属性はクロスオリジンの `href` に対しては仕様上ブラウザから無視される
- Themes は Primitives（`fandhe_frontend_headless_ui::download_trigger`）への薄いラッパーであり、Button recipe を流用した既定 CSS のみを追加する
- `@ark-ui/react`/chakra-ui の JS/TS API とは別物（Rust 製、Blob 生成は非対応）

## Related

- [DownloadTrigger (primitives)](../../primitives/form/download-trigger.md)

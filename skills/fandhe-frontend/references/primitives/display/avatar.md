# Avatar

プロフィール画像・フォールバック表示の headless コンポーネント。Root / Image / Fallback の 3 anatomy パーツと、画像読み込みステータス（`Loading`/`Loaded`/`Error`）を管理する状態機械 `Avatar` を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::avatar::{root, image, fallback, Avatar, ImageStatus};

// 自由関数（SSR、状態機械を経由しない構成）
let node = root(vec![], vec![
    image(ImageStatus::Loading, "https://example.com/a.png", "avatar", vec![]),
    fallback(ImageStatus::Loading, vec![], vec![]),
]);

// 状態機械経由（CSR/hydration）
let avatar = Avatar::new(ImageStatus::Loading);
let node = avatar.root(vec![], vec![
    avatar.image("https://example.com/a.png", "avatar", vec![]),
    avatar.fallback(vec![], vec![]),
]);
```

## Anatomy

```
root
  image
  fallback
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `image: status` | `ImageStatus` | `ImageStatus::Loading` | 画像読み込みステータス（`Loading`/`Loaded`/`Error`）。`Loaded` のときのみ画像を表示する |
| `image: src` | `&str` | 必須 | 画像 URL |
| `image: alt` | `&str` | 必須 | 代替テキスト（実質的なアクセシビリティ担保） |
| `fallback: status` | `ImageStatus` | `ImageStatus::Loading` | `image` と逆の可視性を持つ |
| `Avatar::new: initial` | `ImageStatus` | `ImageStatus::Loading` | 状態機械の初期値 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| image | `data-state` | `visible` \| `hidden` |
| fallback | `data-state` | `visible` \| `hidden` |

## Notes

- `root` には `data-state` を付与しない（表示切り替えは `image`/`fallback` 側の関心事）。
- WAI-ARIA の専用パターンを持たない表示系コンポーネントであり、追加の `role`/`aria-*` は付与しない。`alt` の必須化が唯一のアクセシビリティ担保。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。`onStatusChange`/`asChild`/`ids` オプションは提供しない。

## Related

- [Clipboard](./clipboard.md)
- [Progress](./progress.md)

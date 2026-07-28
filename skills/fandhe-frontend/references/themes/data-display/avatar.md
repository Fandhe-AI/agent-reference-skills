# Avatar

ユーザー・チームを画像またはフォールバック（イニシャル/アイコン）で表す styled コンポーネント。`fandhe-frontend-headless-ui::avatar` の Root/Image/Fallback 3 パーツを薄くラップし、既定 CSS（`size`/`shape` variant）を追加する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarShape};
use fandhe_frontend_pre_styled_ui::Size;

let node = avatar::root(Size::Md, AvatarShape::default(), vec![], vec![
    fandhe_frontend_headless_ui::avatar::image(ImageStatus::Loading, "https://example.com/a.png", "avatar", vec![]),
    fandhe_frontend_headless_ui::avatar::fallback(ImageStatus::Loading, vec![], vec![]),
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
| `root: size` | `Size` (`Sm`/`Md`/`Lg`) | `Md` | 寸法 variant。`root` のみへクラス付与 |
| `root: shape` | `AvatarShape` (`Circle`/`Rounded`/`Square`) | `Circle` | 外形 variant |
| `image`/`fallback` | 再エクスポート | — | `fandhe_frontend_headless_ui::avatar::{image, fallback}` をそのまま使う |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| image | `data-state` | `hidden` \| `visible` |
| fallback | `data-state` | `hidden` \| `visible` |

## Notes

- 状態機械 `Avatar`（画像読み込み状態管理）はこのモジュールから再エクスポートしない。hydration が必要な場合は `fandhe_frontend_headless_ui::avatar::Avatar` を直接 import する（`Avatar::root()` は size/shape クラスを付与しない別実体のため混同注意）。
- WAI-ARIA の専用ロールは持たない。`image` の `alt` が唯一のアクセシビリティ担保。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。`onStatusChange`/`asChild`/`ids` オプションは提供しない。
- Themes（pre-styled-ui）は Primitives（headless-ui）の薄いラッパー。

## Related

- [Clipboard](./clipboard.md)
- [Badge](./badge.md)
- [primitives/display/avatar](../../primitives/display/avatar.md)

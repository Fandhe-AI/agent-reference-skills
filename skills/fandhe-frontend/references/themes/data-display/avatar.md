# Avatar

ユーザー・チームを画像またはフォールバック（イニシャル/アイコン）で表す styled コンポーネント。`fandhe-frontend-headless-ui::avatar` の Root/Image/Fallback 3 パーツを薄くラップし、既定 CSS（`size`/`shape`/`variant`/`palette`）を追加する。pre-styled-only の `group`/`badge` パーツを持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::avatar::{self, AvatarProps, ImageStatus};

let node = avatar::root(&AvatarProps::default(), vec![], vec![
    fandhe_frontend_headless_ui::avatar::image(ImageStatus::Loading, "https://example.com/a.png", "avatar", vec![]),
    fandhe_frontend_headless_ui::avatar::fallback(ImageStatus::Loading, vec![], vec![]),
]);
```

`root(props: &AvatarProps, attrs, children) -> Node`、`group(attrs, children) -> Node`、`group_with(props: &AvatarGroupProps, attrs, children) -> Node`、`badge(props: &AvatarBadgeProps, attrs, children) -> Node`。`stylesheet() -> String` が静的 CSS 全量を返す。`image`/`fallback`/`AvatarAction`/`ImageStatus` は headless-ui からの再エクスポート。`GROUP_FIRST_ON_TOP_MAX_CHILDREN: usize`（= 12）は `group_with` の `FirstOnTop` が先頭ほど前面を保証できる子の上限件数。

## Anatomy

```
root
  image
  fallback
group   （pre-styled-only。root(stacked: true) を重ねるレイアウト専用）
badge   （pre-styled-only。root(with_badge: true) の子に置く状態ドット）
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `AvatarProps.size` | `Size` | `Md` | 寸法 variant。`root` のみへクラス付与 |
| `AvatarProps.shape` | `AvatarShape` (`Circle`/`Rounded`/`Square`) | `Circle` | 外形 variant |
| `AvatarProps.variant` | `AvatarVariant` (`Subtle`/`Solid`/`Outline`) | `Subtle` | 見た目。`Solid` は濃色背景 + コントラスト文字色、`Outline` は背景なし + 枠線 |
| `AvatarProps.palette` | `ColorPalette` | `Neutral` | colorPalette 軸 |
| `AvatarProps.stacked` | `bool` | `false` | `group` 内で重なり表示（負のマージンと `box-shadow` リング） |
| `AvatarProps.with_badge` | `bool` | `false` | `badge` を子に持つ場合に `true`（`overflow: visible` を解除し badge が欠けないようにする） |
| `AvatarGroupProps.stacking` | `AvatarGroupStacking` (`LastOnTop`/`FirstOnTop`) | `LastOnTop` | 重なり順。`LastOnTop` は DOM 順、`FirstOnTop` は先頭の子が最前面（固定 `z-index` クラスを付与） |
| `AvatarBadgeProps.size` | `Size` | `Md` | badge サイズ |
| `AvatarBadgeProps.palette` | `ColorPalette` | `Accent` | badge の色 |
| `AvatarBadgeProps.placement` | `AvatarBadgePlacement` (`BottomEnd`/`TopEnd`) | `BottomEnd` | badge の配置 |
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

# Marker

会話スレッド内のインライン注記行（システム注記・日付等の区切り・ラベル付きセパレータ）を表現する shadcn/ui Marker 相当の部品。`root` / `icon` / `content` の 3 anatomy パーツを持つ、状態機械を持たない静的部品。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::marker::{self, MarkerRootProps, MarkerTone, MarkerVariant};

let node = marker::root(
    MarkerRootProps { variant: MarkerVariant::Label, tone: MarkerTone::Info },
    vec![],
    vec![
        marker::icon(vec![], vec![text("i")]),
        marker::content(vec![], vec![text("Today")]),
    ],
);
```

```rust
marker::root(props: MarkerRootProps, attrs, children) -> Node
marker::icon(attrs, children) -> Node
marker::content(attrs, children) -> Node
```

## Anatomy

```
root
  icon
  content
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `MarkerRootProps.variant` | `MarkerVariant` | `Note` | `Note`（インライン注記）\| `Divider`（行の下に境界線）\| `Label`（中央ラベル + 左右の線）。`data-variant` |
| `MarkerRootProps.tone` | `MarkerTone` | `Neutral` | `Neutral` \| `Info` \| `Warning` \| `Danger`。`data-tone` |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-variant` | `note` \| `divider` \| `label` |
| root | `data-tone` | `neutral` \| `info` \| `warning` \| `danger` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/marker/
- 会話系部品（message / bubble / attachment / marker）が共有する `data-role` / `data-align` は意図的に持たない。
- `data-tone` の値語彙は pre-styled-ui の `ColorPalette`（`neutral` / `info` / `warning` / `danger`）の同名 4 値の部分集合で、新しい値語彙は作らない。
- `divider` / `label` variant の区切り線は本 mod では一切描画しない。描画は pre-styled-ui 側（`separator` パーツの再利用または CSS）が担う。
- `root` は `div`、`icon` / `content` は `span`。`icon` は装飾スロットで `aria-hidden="true"` を固定付与（呼び出し側の `aria-hidden="false"` は除去される）。
- `root` には `role` を付与しない（静的な注記に割り込み通知は不要という判断）。ストリーミング中の注記に `role="status"` が必要なら呼び出し側が `attrs` で渡す。
- 自前 CSS の最小例: `[data-scope="marker"][data-part="root"][data-tone="warning"] { color: #b45309; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Message](./message.md)
- [Bubble](./bubble.md)
- [Message Scroller](./message-scroller.md)
- [Marker（Themes 版）](../../themes/data-display/marker.md)

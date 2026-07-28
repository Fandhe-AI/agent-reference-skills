# Skeleton

データ読み込み中のコンテンツ形状を模したローディングプレースホルダー。常に `aria-hidden="true"` を固定付与する単一 recipe styled 部品。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::skeleton::{skeleton, SkeletonProps, SkeletonVariant};

let node = skeleton(&SkeletonProps { variant: SkeletonVariant::Circle }, vec![]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `SkeletonProps.variant` | `SkeletonVariant` | `Text` | `Text`（1行テキスト）/ `Circle`（円形）/ `Rect`（矩形ブロック） |

## Notes

- `root` は常に `aria-hidden="true"` を出力し、呼び出し側がこれを外すオプションはない（大小文字問わず偽装は除去）
- `aria-busy="true"` は skeleton 自身には付与しない。読み込み中であることを伝える責務は skeleton を内包するコンテナ側にある
- 子ノードを取らない（実コンテンツを持たない占位要素）
- パルスアニメーションは `prefers-reduced-motion: reduce` で停止する
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [EmptyState](./empty-state.md)

# Clipboard

値コピー・コピー済み表示の headless コンポーネント。Root / Label / Control / Input / Trigger / Indicator / ValueText の 7 anatomy パーツと、コピー済みかどうかの 2 値状態機械 `Clipboard` を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::clipboard::{root, control, input, trigger, indicator, Clipboard};

// 自由関数
let node = root("https://example.com", false, vec![], vec![
    control(false, vec![], vec![
        input("https://example.com", false, vec![]),
        trigger(false, vec![], vec![]),
    ]),
]);

// 状態機械経由
let clipboard = Clipboard::new(false);
let node = clipboard.root("https://example.com", vec![], vec![
    clipboard.trigger(vec![], vec![]),
]);
```

## Anatomy

```
root
  label
  control
    input
    trigger
      indicator
  value-text
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: value` | `&str` | 必須 | コピー対象値。`data-value` としてそのまま出力される |
| `root/control/input/trigger/indicator: copied` | `bool` | `false` | コピー済みかどうか。`data-copied` 存在属性と `indicator` の可視性に反映 |
| `indicator: is_copied_variant` | `bool` | — | `true` で「コピー済み」表示用変種、`false` で「未コピー」表示用変種を組み立てる |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / control / input / trigger | `data-copied` | 存在属性（`copied=true` のときのみ） |
| indicator | `data-state` | `visible` \| `hidden` |
| indicator | `data-variant` | `copied` \| `idle` |
| root | `data-value` | コピー対象値のテキスト |

## Notes

- `value`（コピー対象値）は状態機械のフィールドに含めない。各パーツ関数へ都度渡す描画パラメータ。
- `input` はコピー元テキストの表示専用（`type="text" readonly`）でフォーム送信を目的としない。
- dispatch アクション名は `"clipboard:copy"`/`"clipboard:reset"`（他コンポーネントの裸の `"copy"`/`"reset"` との衝突を避けるため名前空間修飾されている）。
- タイムアウト経過後の自動リセットは headless 層の責務外（クライアント配線層の責務）。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。`asChild`/`ids` オプションは提供しない。

## Related

- [Avatar](./avatar.md)

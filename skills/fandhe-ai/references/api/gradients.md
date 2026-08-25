---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/struct.Gradients.html
---

# Gradients

`Tape::backward()` が返す、`Var` ごとの勾配を格納するコンテナ。到達不能ノードとゼロ勾配ノードを区別するため `Option` を用いる。

## Signature / Usage

```rust
let grads = tape.backward(&loss)?;
let input_grad = grads
    .get(&input)?
    .ok_or("input has no gradient after backward")?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `get(&self, var: &Var<'_>) -> Result<Option<&Tensor<f32>>, AutodiffError>` | メソッド | 指定した変数に対応する勾配を取得する。`Ok(Some(&Tensor))` は勾配あり、`Ok(None)` は loss から到達不能または backward 実行後に追加された変数、`Err(TapeMismatch)` は別テープ由来の変数の場合 |

## Notes

- ノードごとに `Option` で勾配を保持し、「loss に寄与しない」変数と「寄与するがゼロ勾配」の変数を区別する
- 存在しないノードへのアクセスで panic しない設計
- `Debug`, `Send`, `Sync`, `Unpin`, `Freeze` を実装

## Related

- `Tape`
- `Var`
- `AutodiffError`

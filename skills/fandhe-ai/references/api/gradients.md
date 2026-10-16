---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Gradients.html
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
| `get(&self, var: &Var<'_>) -> Result<Option<&Tensor<f32>>, AutodiffError>` | メソッド | 指定した変数に対応する勾配を取得する。`Ok(Some(&Tensor))` は勾配あり、`Ok(None)` は loss から到達不能または backward 実行後に同一世代内で追加された変数、`Err(TapeMismatch)` は別テープ由来の変数、または本 `Gradients` の計算後に `Tape::reset` された場合（世代不一致）、`Err(GradientTrackingDisabled)` は `requires_grad == false` の変数（`var_no_grad` の葉・`detach` した葉・それらのみを祖先に持つノード） |

## Notes

- ノードごとに `Option` で勾配を保持し、「loss に寄与しない」変数と「寄与するがゼロ勾配」の変数を区別する。「構造的に勾配を持ちえない」変数は `Err(GradientTrackingDisabled)` で型として区別される
- `Gradients` は `Tape` を借用しないため `Tape::reset` をまたいで生存しうる。`Var<'t>` と異なり借用検査では防げないので、`get` が計算時点の世代番号と `Var` の世代番号を突き合わせ、reset 後の `Var` に対する古い勾配の誤参照を `Err(AutodiffError::TapeMismatch)` で fail-closed に拒否する（`site/examples/training-loop.md`）
- 存在しないノードへのアクセスで panic しない設計
- `Debug` を実装する。0.11.0 の `Gradients` は `Drop` 実装を持つ（host arena が有効な場合に勾配バッファを回収する）
- f64 専用グラフの `GradientsF64::get` は `Result<Option<&Tensor<f64>>, AutodiffError>` を返す別の型。詳細は `dtype.md` を参照

## Related

- [tape](./tape.md)
- [var](./var.md)
- [errors](./errors.md)
- [dtype](./dtype.md)

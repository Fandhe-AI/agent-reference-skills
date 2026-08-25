---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/struct.LinearVars.html
---

# LinearVars

`Linear::bind()` から返される、1 回の訓練ステップ分の線形層パラメータ（weight / bias）を表す構造体。

## Signature / Usage

```rust
let out = vars.forward(&input)?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `weight` | `Var<'t>` | 重み行列の変数 |
| `bias` | `Option<Var<'t>>` | バイアス変数（任意） |
| `forward(&self, input: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | `y = input.matmul(weight) + bias` を計算する。`input` は `[batch, in_features]` 形状の 2D 変数、戻り値は `[batch, out_features]` |

## Notes

- bias の加算は `[batch, out_features] + [out_features]` のブロードキャストで行われ、バッチ次元の勾配集約は既存機構が担う
- フィールドを意図的に公開しており、backward 後の勾配取得（`Gradients::get(&vars.weight)`）は呼び出し側の責務。組み込みの勾配更新 API は提供しない

## Related

- `Var`
- `Gradients`
- compat::Sequential

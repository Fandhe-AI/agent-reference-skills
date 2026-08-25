---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/struct.Var.html
---

# Var

テープ上の 1 ノードを表す型。値そのものではなく `NodeId` と共有された `Tape` への参照を保持し、演算のたびにテープへ新しいノードを追加する。`Clone`, `Copy`, `Debug` を実装するが `Send` / `Sync` は実装しない。

## Signature / Usage

```rust
let tape = fandhe_ai::tape();
let input_var = tape.var(&input_tensor);
let output = input_var.relu().matmul(&weight_var)?;
let loss = output.mse_loss(&target_var)?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `value(&self) -> Ref<'_, Tensor<f32>>` | メソッド | 現在値を非トラッキングのテンソル参照として返す。遅延評価中の elementwise グラフは必要に応じて materialize される。この参照を保持したままテープ操作を行うと `RefCell` の borrow 衝突で panic する |
| `to_tensor(&self) -> Tensor<f32>` | メソッド | `value()` の所有版。テンソルを clone するため borrow 問題を回避できる |
| `matmul(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | 2D 行列積。即座に materialize される |
| `add` / `mul` | メソッド | ブロードキャスト対応の elementwise 加算・乗算（遅延評価） |
| `relu()` | メソッド | ReLU（infallible、引数なし） |
| `exp()` / `tanh()` / `sigmoid()` | メソッド | elementwise の exp / tanh / sigmoid |
| `sum(dim: Option<usize>) -> Result<Var<'t>, AutodiffError>` | メソッド | 指定次元での総和。`None` は全軸 |
| `max(dim: Option<usize>) -> Result<Var<'t>, AutodiffError>` | メソッド | 指定次元での最大値 |
| `mse_loss(&self, target: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | 平均二乗誤差（`Reduction::Mean` で `mse_loss_with` に委譲） |
| `mse_loss_with(&self, target: &Var<'t>, reduction: Reduction) -> Result<Var<'t>, AutodiffError>` | メソッド | reduction 戦略を指定できる MSE |
| `cross_entropy_loss(&self, targets: &Tensor<i32>, class_dim: usize, reduction: Reduction) -> Result<Var<'t>, AutodiffError>` | メソッド | log-sum-exp で安定化されたクロスエントロピー損失 |

## Notes

- ライフタイム `'t` だけでは同一テープ由来であることを保証しない（1 スコープに複数テープが共存し得る）。二項演算は実行時に `tape.id` を検証し、不一致時は `AutodiffError::TapeMismatch` を返す
- elementwise 演算は materialize 境界まで計算を遅延する。fan-in の事前 materialize やチェイン長上限による自己 materialize が自動的に働く
- `unwrap()` / `panic!()` ではなく `Result` を明示的に使うのがライブラリの規約

## Related

- `Tape`
- `Gradients`
- `AutodiffError`

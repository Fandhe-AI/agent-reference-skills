---
source: https://docs.rs/fandhe-ai-autodiff/0.11.0/fandhe_ai_autodiff/
---

# autodiff

dynamic-tape 方式の自動微分を提供するクレート。`Tensor<f32>` の演算はテープを構築しないが、`Var` の演算はテープを構築するという型分離で微分対象を明示する設計。

- crate 名: `fandhe-ai-autodiff`（docs.rs `fandhe-ai-autodiff/0.11.0`）

## Signature / Usage

利用者は内部クレートの `Tape` を直接構築せず、facade の `fandhe_ai::tape()` を使う（`Var` / `Gradients` は facade から再エクスポートされる）。

```rust
let tape = fandhe_ai::tape();
let x = tape.var(&input_tensor);
let y = x.mul(&x)?; // テープに演算が記録される
let grads = tape.backward(&y.sum(None)?)?;
```

## Options / Props

モジュール構成（0.11.0 の `lib.rs` の `pub mod`。0.3.0 の `compat` / `nn` / `optim` の 3 モジュールから大幅に増えた）:

| Module | Description |
| --- | --- |
| `compat` | numpy/Keras 風 API を提供する非推奨の互換シム（移行期間中に旧実装を複製して残している。唯一のサポート対象実装は `fandhe_ai::compat`） |
| `nn` | 独自ニューラルネットワークプリミティブ（Linear 層、活性化関数、損失関数、RNN / attention / `Module` など） |
| `optim` | オプティマイザ実装（SGD, AdamW ほか）・勾配クリッピング・LR スケジューラ・`DeviceParamStore` |
| `*_ops`（`activation_ops` / `activation_scalar_ops` / `binning_ops` / `bool_ops` / `conv3d_ops` / `conv_transpose3d_ops` / `cumulative_ops` / `elementwise_loss_ops` / `extremum_ops` / `fft_ops` / `fold_ops` / `indexed_update_ops` / `indexing_ops` / `linalg_ops` / `loss_ops` / `low_precision_ops` / `lrn_ops` / `margin_focal_loss_ops` / `matrix_ops` / `max_unpool_ops` / `merge_ops` / `nonfinite_ops` / `pad_ops` / `pool3d_ops` / `rearrange_ops` / `reduce_ops` / `scalar_unary_ops` / `shape_view_ops` / `softmin_threshold_ops` / `stat_reduce_ops` / `tensor_product_ops` / `topk_unique_ops` / `trig_ops` / `weight_reparam_ops`） | `Var` の演算メソッドの実装を系統別に分けたモジュール。facade では `Var` のメソッドとして到達する（`api/var.md` とその系統別ページ） |
| `f64_autograd` | f64 専用の独立自動微分グラフ（`TapeF64` / `VarF64` / `GradientsF64`。facade が newtype で公開） |
| `functional_ops` / `jacobian_ops` / `gradcheck` / `anomaly` | `vjp` / `hvp` / `jvp` / `jacfwd` / `vmap`、`jacobian` / `hessian`、`gradcheck`、`backward_detect_anomaly`（facade では `Tape` のメソッド） |
| `einsum_batch` / `generate` / `determinism` | バッチ einsum、自己回帰生成、決定論モード（`set_deterministic`） |

主要な型:

| Name | Kind | Description |
| --- | --- | --- |
| `Tape` | struct | forward pass での演算を Wengert list として記録 |
| `Var` | struct | `NodeId` とテープ参照を持つ追跡対象値 |
| `TapeId` / `NodeId` | struct | テープインスタンス・個々のノードの識別子 |
| `Gradients` | struct | backward 計算の結果を保持するコンテナ |
| `AutodiffError` | enum | 公開 API のエラー型 |
| `Reduction` | enum | 損失関数の reduction 指定（mean / sum） |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- 依存の流れは `compat` → `nn`/`var`/`tape` の一方向。`compat` は非推奨のシムのためアプリケーションからの新規利用は非推奨
- `create_graph` / `custom` / `hooks` / `tape` / `var` / `grad` / `backward` などの非公開モジュールが実体を持ち、`Tape` の高階微分・カスタム VJP・backward hook は facade の `Tape` メソッド経由で公開される（`api/tape.md`）
- 0.3.0 のページが示した `Var::new(&t, 2.0)` / `&x * &x` / `y.backward()` の使用例は 0.11.0 の公開 API に存在しない（`Var` の構築は `Tape::var` 経由、演算は `Var` のメソッド）
- `fandhe-ai` 公開 API の `tape()` / `tape_for(Device)` はこのクレートの `Tape` を薄くラップしたもの

## Related

- [tensor-core](./tensor-core.md)

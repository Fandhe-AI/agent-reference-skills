---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/compat/struct.Sequential.html
---

# compat::Sequential / SequentialVars

Keras 風のレイヤー積み上げビルダー。`add_*` はメソッドチェーンで `Self` を返し、`predict` / `forward` で推論を実行する。レイヤーは `nn::Module` 実装のヘテロジニアスなコレクションとして保持される。

## Signature / Usage

```rust
use fandhe_ai::compat::{array, Sequential};

let model = Sequential::new()
    .add_linear(4, 8, 0)?
    .add_relu()
    .add_linear(8, 1, 1)?
    .add_sigmoid();

let input = array(vec![vec![0.1_f32, 0.2, 0.3, 0.4]])?;
let output = model.predict(&input)?;
```

```rust
// 訓練時: bind でパラメータをテープ登録
let tape = fandhe_ai::tape();
let vars = model.bind(&tape);
let out = vars.forward(&tape, &[input_var])?;
let loss = out.mse_loss(&target_var)?;
let grads = tape.backward(&loss)?;
let param_grads = vars.trainable_grads(&grads)?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Sequential::new() -> Self` | 関数 | 空のモデルを構築 |
| `add_linear(self, in_features: usize, out_features: usize, seed: u64) -> Result<Self, AutodiffError>` | メソッド | bias 付き全結合層を追加。`in_features == 0` は拒否 |
| `add_relu(self) -> Self` | メソッド | ReLU 活性化層を追加（形状不変） |
| `add_sigmoid(self) -> Self` | メソッド | Sigmoid 活性化層を追加（形状不変） |
| `add_tanh(self) -> Self` | メソッド | Tanh 活性化層を追加（形状不変） |
| `forward<'t>(&self, tape: &'t Tape, input: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | ユーザー指定の `Tape` で順伝播を実行 |
| `predict(&self, input: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | デフォルト CPU バックエンドで 1 回の順伝播を実行し、テンソルを返す |
| `bind<'m, 't>(&'m self, tape: &'t Tape) -> SequentialVars<'m, 't>` | メソッド | 全 `Linear` 層の weight/bias を leaf ノードとして登録し `SequentialVars` を返す |
| `trainable_parameters(&self) -> Vec<&Tensor<f32>>` | メソッド | レイヤー順（weight → bias）でパラメータ参照を返す |
| `apply_parameters(&mut self, updated: Vec<Tensor<f32>>) -> Result<(), AutodiffError>` | メソッド | 更新後のパラメータを反映する |
| `SequentialVars::forward(&self, tape: &'t Tape, input: &[Var<'t>]) -> Result<Var<'t>, AutodiffError>` | メソッド | 訓練モード順伝播。bind 済み `LinearVars` を使用し活性化層は各モジュールに委譲 |
| `SequentialVars::trainable_vars(&self) -> Vec<&Var<'t>>` | メソッド | `trainable_parameters` と同順序（weight → bias）で変数参照を返す |
| `SequentialVars::trainable_grads<'g>(&self, grads: &'g Gradients) -> Result<Vec<&'g Tensor<f32>>, AutodiffError>` | メソッド | `trainable_vars` と同順序で勾配参照を収集。いずれかのパラメータに勾配がない場合は `InvalidArgument`（fail-closed） |

## Notes

- `Sgd` / `AdamW` 等のオプティマイザとは position-based（配列順序）の契約で連携する
- `Sequential` は `Default` を実装するが `Send` / `Sync` は実装しない

## Related

- compat::array
- `LinearVars`
- `Gradients`

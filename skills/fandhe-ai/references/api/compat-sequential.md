---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/compat/struct.Sequential.html
---

# compat::Sequential / SequentialVars

Keras 風のレイヤー積み上げビルダー。`add_*` はメソッドチェーンで `Self` を返し、`predict` / `forward` で推論を、`compile` / `fit` / `evaluate` で学習を実行する。レイヤーは `nn::Module` 実装のヘテロジニアスなコレクションとして保持される。

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
let out = vars.forward(&tape, &input_var)?;
let loss = out.mse_loss(&target_var)?;
let grads = tape.backward(&loss)?;
let param_grads = vars.trainable_grads(&grads)?;
```

## Options / Props

### 構築・順伝播・パラメータ

| Name | Type | Description |
| --- | --- | --- |
| `Sequential::new() -> Self` | 関数 | 空のモデルを構築 |
| `forward<'t>(&self, tape: &'t Tape, input: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | ユーザー指定の `Tape` で順伝播を実行。積んだ層を先頭から順に `Module::forward` へ委譲する |
| `predict(&self, input: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | デフォルト CPU バックエンドで 1 回の順伝播を実行し、テンソルを返す |
| `predict_batches<D>(&self, loader: &DataLoader<D>) -> Result<Vec<Tensor<f32>>, AutodiffError>` | メソッド | `DataLoader` のバッチごとに推論する（`D: Dataset`、`D::Batch: PredictBatchInput`。ラベルは無視） |
| `bind<'m, 't>(&'m self, tape: &'t Tape) -> SequentialVars<'m, 't>` | メソッド | 全 `Linear` 層の weight/bias を leaf ノードとして登録し `SequentialVars` を返す |
| `trainable_parameters(&self) -> Vec<&Tensor<f32>>` | メソッド | レイヤー順（weight → bias）でパラメータ参照を返す |
| `apply_parameters(&mut self, updated: Vec<Tensor<f32>>) -> Result<(), AutodiffError>` | メソッド | 更新後のパラメータを反映する。shape を変えない更新専用 |
| `named_parameters(&self) -> Vec<(String, &Tensor<f32>)>` | メソッド | `"{index}.{name}"` 形式の名前付きパラメータ |
| `state_dict(&self) -> HashMap<String, Tensor<f32>>` | メソッド | PyTorch `Module.state_dict()` 相当 |
| `load_state_dict(&mut self, state: HashMap<String, Tensor<f32>>) -> Result<(), AutodiffError>` | メソッド | `state_dict` の逆（strict） |
| `set_training(&mut self, training: bool)` / `train(&mut self)` / `eval(&mut self)` / `training(&self) -> bool` | メソッド | 学習・評価モードの切り替えと取得（PyTorch `Module.train()` / `eval()` 相当） |
| `add_module<M: nn::Module + 'static>(self, m: M) -> Self` | メソッド | `nn::Module` 実装の任意の層を追加する |
| `SequentialVars::forward(&self, tape: &'t Tape, input: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | 訓練モード順伝播。bind 済み `LinearVars` を使用し活性化層は各モジュールに委譲 |
| `SequentialVars::linears(&self) -> &[LinearVars<'t>]` | メソッド | bind 済みの `LinearVars` 列 |
| `SequentialVars::trainable_vars(&self) -> Vec<&Var<'t>>` | メソッド | `trainable_parameters` と同順序（weight → bias）で変数参照を返す |
| `SequentialVars::trainable_grads<'g>(&self, grads: &'g Gradients) -> Result<Vec<&'g Tensor<f32>>, AutodiffError>` | メソッド | `trainable_vars` と同順序で勾配参照を収集。いずれかのパラメータに勾配がない場合は `InvalidArgument`（fail-closed） |

### 層の追加（`add_*`）

| 系統 | メソッド |
| --- | --- |
| 全結合 | `add_linear(in_features, out_features, seed) -> Result<Self, AutodiffError>`（`in_features == 0` は拒否） |
| 活性化（引数なし・infallible） | `add_relu` / `add_sigmoid` / `add_tanh` / `add_silu` / `add_hardswish` / `add_gelu` / `add_gelu_tanh` / `add_mish` / `add_relu6` / `add_selu` / `add_softsign` / `add_hardsigmoid` / `add_log_sigmoid` / `add_tanhshrink` / `add_identity` |
| 活性化（引数あり・infallible） | `add_leaky_relu(negative_slope)` / `add_elu(alpha)` / `add_softmax(dim)` / `add_log_softmax(dim)` / `add_glu(dim)` / `add_softmin(dim)` / `add_threshold(threshold, value)` |
| 活性化（引数あり・`Result`） | `add_softplus(beta, threshold)` / `add_hardtanh(min_val, max_val)` / `add_prelu(num_parameters, init)` / `add_celu(alpha)` / `add_rrelu(lower, upper)` |
| 形状 | `add_flatten(start_dim, end_dim)` / `add_unflatten` / `add_zero_pad2d(padding: [usize; 4])` / `add_pixel_shuffle(upscale_factor)` / `add_pixel_unshuffle(downscale_factor)` / `add_upsample` |
| dropout | `add_dropout(p)` / `add_dropout2d(p)` / `add_alpha_dropout(p)`（いずれも `Result<Self, AutodiffError>`） |
| 畳み込み | `add_conv1d` / `add_conv2d` / `add_conv3d` / `add_conv_transpose1d` / `add_conv_transpose2d` |
| 正規化 | `add_layer_norm` / `add_rms_norm(normalized_size, eps)` / `add_group_norm(groups, eps)` / `add_instance_norm(eps)` / `add_batch_norm1d` / `add_batch_norm2d` |
| embedding | `add_embedding` / `add_embedding_bag` |
| attention・Transformer | `add_multihead_attention` / `add_multihead_attention_with_config`（`MultiheadAttentionConfig`） / `add_transformer_encoder` / `add_transformer_decoder_layer` / `add_transformer` |
| pooling | `add_max_pool1d` / `add_max_pool2d` / `add_avg_pool1d` / `add_avg_pool2d` / `add_adaptive_avg_pool1d(output_size)` / `add_adaptive_avg_pool2d` / `add_adaptive_max_pool1d(output_size)` / `add_adaptive_max_pool2d` / `add_global_pool(mode: GlobalPoolMode, keepdims: bool)` |

### 学習（compile / fit / evaluate）

詳細は `compat-training.md`（Optimizer / Loss / FitConfig / History）、`compat-callbacks.md`、`compat-metrics.md` を参照。`compile` 前に `fit` / `evaluate` を呼ぶとエラーになる。

| Name | Type | Description |
| --- | --- | --- |
| `compile(&mut self, optimizer: Optimizer, loss: Loss) -> Result<(), AutodiffError>` | メソッド | optimizer と loss を設定する（Keras `model.compile`） |
| `compile_with_param_groups(&mut self, optimizer: Optimizer, loss: Loss, param_groups: &[ParamGroup]) -> Result<(), AutodiffError>` | メソッド | 層別の学習率・weight decay（PyTorch の `param_groups` 相当）。`Optimizer::Lbfgs` と空でない `param_groups` は併用不可 |
| `compile_with_amp(&mut self, optimizer: Optimizer, loss: Loss, amp: AmpConfig) -> Result<(), AutodiffError>` | メソッド | AMP（損失スケーリング・非有限検出）付き。`Optimizer::Lbfgs` とは併用不可 |
| `is_compiled(&self) -> bool` | メソッド | compile 済みか |
| `amp_loss_scale(&self) -> Option<f32>` | メソッド | 現在の AMP スケール値。AMP 未使用・未 compile は `None` |
| `fit<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, config: FitConfig) -> Result<History, AutodiffError>` | メソッド | `config.epochs` 回学習する（Keras `model.fit`） |
| `fit_with_callbacks<T>(&mut self, x, y, config, validation: Option<(&Tensor<f32>, &Tensor<T>)>, callbacks: &mut [Callback]) -> Result<History, AutodiffError>` | メソッド | 検証データと callback 付きの学習 |
| `fit_with_metrics<T>(…, callbacks: &mut [Callback], metrics: &[Metrics]) -> Result<History, AutodiffError>` | メソッド | `fit_with_callbacks` に metrics 引数を追加 |
| `fit_with_prefetch<T>(&mut self, x, y, config, prefetch: PrefetchConfig, validation, callbacks, metrics) -> Result<History, AutodiffError>` | メソッド | prefetch 付き |
| `fit_with_train_step<T>(…, metrics: &[Metrics], train_step: &mut TrainStepFn<'_, T>) -> Result<History, AutodiffError>` | メソッド | カスタム学習 step フック（Keras `Model.train_step()` 相当） |
| `fit_with_weights<T>(&mut self, x, y, config, weights: &FitWeights<'_>, validation, callbacks, metrics) -> Result<History, AutodiffError>` | メソッド | クラス別・サンプル別の損失重み付き（Keras `fit(class_weight=, sample_weight=)` 相当） |
| `evaluate<T: FitTarget>(&mut self, x: &Tensor<f32>, y: &Tensor<T>, batch_size: usize) -> Result<f32, AutodiffError>` | メソッド | compile 済みの loss でデータ全体を評価する |

### デバイス常駐パラメータ

詳細は `device-param-store.md` を参照。

| Name | Type | Description |
| --- | --- | --- |
| `init_device_param_store(&self, tape: &Tape) -> Result<DeviceParamStore, BackendError>` | メソッド | `DeviceParamStore` を初期化する。Conv 層など resident 未対応の層を含むモデルは拒否される |
| `forward_resident<'t>(&self, tape: &'t Tape, input: &Var<'t>, store: &mut DeviceParamStore) -> Result<Var<'t>, AutodiffError>` | メソッド | resident パラメータでの順伝播 |
| `predict_resident(&self, store: &DeviceParamStore, input: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | resident パラメータでの推論 |

## Notes

- `nn::Sequential`（PyTorch 風の `nn::Module` コンテナ）とは別物。`compat::Sequential` は Keras 風の `add_*` ビルダーで、内部の層列に `nn::Sequential` を持つ
- `fandhe_ai::optim::Sgd` / `fandhe_ai::optim::AdamW` 等（facade 公開面）とは `trainable_parameters` / `apply_parameters` の位置対応（配列順序）の契約で連携する。`site/api/compat.md` もこの参照先を `fandhe_ai::optim` と記す
- `Tape` 引数は `fandhe_ai::Tape`（facade の newtype）で、`fandhe_ai_autodiff::Tape` ではない
- `Sequential` は `Default` を実装するが `Send` / `Sync` は実装しない
- `site/api/compat.md` の表は `add_linear` / `add_relu` / `add_sigmoid` / `add_tanh` のみを挙げるが、0.11.0 の `Sequential` は上表の `add_*` と学習 API を持つ（docs.rs の method 一覧とソースを正とする）
- 層の引数が複数行にわたる `add_*`（`add_conv*` / `add_batch_norm*` / `add_embedding*` / `add_transformer*` / `add_max_pool*` / `add_avg_pool*` / `add_upsample` など）の完全なシグネチャは docs.rs の `Sequential` ページを参照

## Related

- [compat-array](./compat-array.md)
- [linear-vars](./linear-vars.md)
- [gradients](./gradients.md)
- [compat-training](./compat-training.md)
- [compat-callbacks](./compat-callbacks.md)
- [compat-metrics](./compat-metrics.md)
- [compat-model-io](./compat-model-io.md)
- [compat-functional](./compat-functional.md)

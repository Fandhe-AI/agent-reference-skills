---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/compat/struct.Sequential.html
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
| `parametrize_weight_norm(self, layer_index: usize, dim: Option<usize>) -> Result<Self, AutodiffError>` | メソッド | 作成済みの `Linear` / `Conv1d` / `Conv2d` / `Conv3d` / `ConvTranspose1d` / `ConvTranspose2d` / `ConvTranspose3d` 層（`layer_index` 番目。活性化層を含む全層の位置）の重みを weight_norm（`w = g · v / ‖v‖`）へ再パラメータ化する。`dim` は `None` / `Some(0)`（in 軸ごと）/ `Some(1)`（out 軸ごと。PyTorch の `dim=0` 相当）で、Conv 系 6 層では層種に依らず利用者指定（`None` / `Some(d)`、`d < weight の rank`。範囲外は型付きエラー）。ConvTranspose の weight は `[in, out/groups, k...]` のため出力チャネル単位にしたい場合は `Some(1)`。`named_parameters` / `trainable_parameters` の並びは `parametrizations.weight.original0`（g）→ `original1`（v）→ `bias` |
| `parametrize_spectral_norm(self, layer_index: usize, n_power_iterations: usize, eps: f32, seed: u64) -> Result<Self, AutodiffError>` | メソッド | 対象層の重みを spectral_norm（`w = W / σ`）へ再パラメータ化する。`u0` / `v0` は `seed` から決定的に導出し、予備反復 15 回。`n_power_iterations >= 1`・`eps` は有限かつ非負。train モード（既定）の forward 1 回ごとに power iteration で状態が進み、`eval()` では進まない。並びは `parametrizations.weight.original` → `bias`。Conv 系 6 層では行軸を層から導出する（Conv は 0、ConvTranspose は 1。`dim` の利用者指定は無い） |
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
| 活性化（引数あり・`Result`） | `add_softplus(beta, threshold)` / `add_hardtanh(min_val, max_val)` / `add_prelu(num_parameters, init)` / `add_celu(alpha)` / `add_rrelu(lower, upper)` / `add_hardshrink(lambd: f32)` / `add_softshrink(lambd: f32)`（`lambd` は有限かつ `>= 0`。違反は構築時に `InvalidArgument`。PyTorch の既定値 0.5 は設けず明示指定） |
| 形状 | `add_flatten(start_dim, end_dim)` / `add_unflatten` / `add_zero_pad2d(padding: [usize; 4])` / `add_pixel_shuffle(upscale_factor)` / `add_pixel_unshuffle(downscale_factor)` / `add_upsample`（出力サイズ指定）/ `add_upsample_scale_factor(scale_factor: Vec<f64>, mode: InterpolateMode)`（倍率指定。出力サイズは各空間軸で `floor(入力サイズ as f64 * s)`。`scale_factor` が空・0 以下・`-0.0`・非有限なら構築時に `InvalidArgument`）/ `add_channel_shuffle(groups: usize)`（`[N, C, *S]` rank 3 以上のチャネル軸を `groups` 個に分けて転置。`groups == 0` は即時 `Err`、C の非整除は forward 時の `Err`）/ `add_unfold(kernel_size, stride, padding, dilation: [usize; 2])` / `add_fold(output_size, kernel_size, stride, padding, dilation: [usize; 2])`（`add_unfold` の引数順は PyTorch の `dilation, padding, stride` ではなく `kernel_size, stride, padding, dilation`。入力 `[N, C, H, W]` → 出力 `[N, C·kH·kW, L]`、`add_fold` は逆演算） |
| dropout | `add_dropout(p)` / `add_dropout2d(p)` / `add_alpha_dropout(p)`（いずれも `Result<Self, AutodiffError>`） |
| 畳み込み | `add_conv1d` / `add_conv2d` / `add_conv3d` / `add_conv_transpose1d` / `add_conv_transpose2d` / `add_conv_transpose3d(in_channels, out_channels, kernel_size, stride, padding, output_padding, dilation: [usize; 3], groups, seed)`（bias あり固定。`output_padding >= stride` は拒否する PyTorch 非互換。常駐経路は非対応で `BackendError::Unsupported`） |
| 正規化 | `add_layer_norm` / `add_rms_norm(normalized_size, eps)` / `add_group_norm(groups, eps)` / `add_instance_norm(eps)` / `add_batch_norm1d` / `add_batch_norm2d` / `add_batch_norm3d(num_features, eps, momentum)`（affine あり既定。入力は rank 5 の `[N, C, D, H, W]` のみで、rank 4 / 6 以上は `RankMismatch { expected: 5 }`）/ `add_local_response_norm(size, alpha, beta, k)`（引数は全て明示。入力 `[N, C, *]` rank 3 以上） |
| embedding | `add_embedding` / `add_embedding_bag` |
| attention・Transformer | `add_multihead_attention` / `add_multihead_attention_with_config`（`MultiheadAttentionConfig`） / `add_transformer_encoder` / `add_transformer_decoder_layer` / `add_transformer` |
| pooling | `add_max_pool1d` / `add_max_pool2d` / `add_avg_pool1d` / `add_avg_pool2d` / `add_adaptive_avg_pool1d(output_size)` / `add_adaptive_avg_pool2d` / `add_adaptive_max_pool1d(output_size)` / `add_adaptive_max_pool2d` / `add_global_pool(mode: GlobalPoolMode, keepdims: bool)` |
| pooling（3D・Lp・fractional） | `add_max_pool3d(kernel_size: [usize; 3], stride: Option<[usize; 3]>, padding: [usize; 3], dilation: [usize; 3])`（`ceil_mode=false` 固定。値のみ返し索引は返さない）/ `add_avg_pool3d(kernel_size, stride, padding, count_include_pad: bool)`（`ceil_mode=false`・`dilation=[1,1,1]` 固定）/ `add_lp_pool1d(norm_type: f32, kernel_size: usize, stride: Option<usize>)` / `add_lp_pool2d(norm_type, kernel_size: [usize; 2], stride: Option<[usize; 2]>)` / `add_lp_pool3d(norm_type, kernel_size: [usize; 3], stride: Option<[usize; 3]>)`（`(Σ_window x^p)^(1/p)`。`norm_type` は有限かつ `> 0`、負の入力と非整数 `norm_type` は NaN、`create_graph` 非対応）/ `add_adaptive_avg_pool3d(output_size: [usize; 3])` / `add_adaptive_max_pool3d(output_size: [usize; 3])` / `add_fractional_max_pool2d(kernel_size: [usize; 2], output_size: [usize; 2])` / `add_fractional_max_pool3d(kernel_size: [usize; 3], output_size: [usize; 3])`（forward ごとにグローバル RNG から標本を引く（`eval()` でも引く）。結果が決定的になるのは `manual_seed` の下だけ。バッチなし入力・`output_ratio` は非対応） |

### 学習（compile / fit / evaluate）

詳細は `compat-training.md`（Optimizer / Loss / FitConfig / History）、`compat-callbacks.md`、`compat-metrics.md` を参照。`compile` 前に `fit` / `evaluate` を呼ぶとエラーになる。

| Name | Type | Description |
| --- | --- | --- |
| `compile(&mut self, optimizer: Optimizer, loss: Loss) -> Result<(), AutodiffError>` | メソッド | optimizer と loss を設定する（Keras `model.compile`） |
| `compile_with_param_groups(&mut self, optimizer: Optimizer, loss: Loss, param_groups: &[ParamGroup]) -> Result<(), AutodiffError>` | メソッド | 層別の学習率・weight decay（PyTorch の `param_groups` 相当）。`Optimizer::Lbfgs` と空でない `param_groups` は併用不可。`Callback::LrSchedule` は全 group 共通の倍率として受理され、groups 付きの compile 状態も `save_model` / `load_model` で往復する（`compat-training.md`）。AMP 併用は `compile_with_amp_and_param_groups` |
| `compile_with_amp(&mut self, optimizer: Optimizer, loss: Loss, amp: AmpConfig) -> Result<(), AutodiffError>` | メソッド | AMP（損失スケーリング・非有限検出）付き。`Optimizer::Lbfgs` とは併用不可 |
| `compile_with_amp_and_param_groups(&mut self, optimizer: Optimizer, loss: Loss, amp: AmpConfig, param_groups: &[ParamGroup]) -> Result<(), AutodiffError>` | メソッド | `compile_with_amp` と param groups の併用版。非有限勾配の検出は全パラメータに対して 1 回だけで、1 つでも非有限があれば全 group とグループ外スロットの更新を飛ばす。groups が空なら `compile_with_amp` と bit 一致。`Optimizer::Lbfgs` は groups の空・非空にかかわらず拒否。`Callback::LrSchedule` は拒否のまま |
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

詳細は `device-param-store.md` を参照（`init_device_param_store_with_param_groups` / `predict_resident_input` / `train_step_resident` を含む）。

| Name | Type | Description |
| --- | --- | --- |
| `init_device_param_store(&self, tape: &Tape) -> Result<DeviceParamStore, BackendError>` | メソッド | `DeviceParamStore` を初期化する。Conv 層など resident 未対応の層を含むモデルは拒否される |
| `init_device_param_store_with_param_groups(&self, tape: &Tape, groups: &[ParamGroup]) -> Result<DeviceParamStore, BackendError>` | メソッド | param groups 付きの `DeviceParamStore` を構築する |
| `forward_resident<'t>(&self, tape: &'t Tape, input: &Var<'t>, store: &mut DeviceParamStore) -> Result<Var<'t>, AutodiffError>` | メソッド | resident パラメータでの順伝播 |
| `predict_resident(&self, store: &DeviceParamStore, input: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | resident パラメータでの推論 |
| `predict_resident_input(&self, store: &DeviceParamStore, input: &ResidentTensor) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 常駐入力（`Tape::upload_resident`）での推論。入力の H2D なし |
| `train_step_resident(&self, store: &mut DeviceParamStore, x: &ResidentTensor, y: &ResidentTensor, config: &SgdConfig) -> Result<ResidentLoss, AutodiffError>` | メソッド | 常駐入力から同期なしで 1 step（MSE・SGD 固定）を積み、loss ハンドルを返す |

### `nn::Module` 実装

`compat::Sequential` は `fandhe_ai::nn::Module` を実装する（`forward(&self, tape: TapeRef<'t>, input: &Var<'t>)`・`named_parameters`・`set_parameter`・`state_dict`・`load_state_dict`・`set_training`・`training`。本体は inherent / `inner` への 1 行委譲）。独自 `nn::Module` の中から `add_*` で組んだ層列を呼ぶ、または `add_module` / `fandhe_ai::nn::Sequential::add` で入れ子にするために使う。

```rust
use fandhe_ai::compat::Sequential;
use fandhe_ai::nn::Module;
use fandhe_ai::{AutodiffError, Tensor, TapeRef, Var};

struct Residual {
    block: Sequential,
}

impl Module for Residual {
    fn forward<'t>(&self, tape: TapeRef<'t>, x: &Var<'t>) -> Result<Var<'t>, AutodiffError> {
        // inherent の forward(&Tape) ではなく UFCS で trait 版を呼ぶ
        let y = fandhe_ai::nn::Module::forward(&self.block, tape, x)?;
        y.add(x)
    }
    fn named_parameters(&self) -> Vec<(String, &Tensor<f32>)> {
        self.block
            .named_parameters()
            .into_iter()
            .map(|(n, t)| (format!("block.{n}"), t))
            .collect()
    }
    fn set_training(&mut self, training: bool) {
        self.block.set_training(training);
    }
    fn training(&self) -> bool {
        self.block.training()
    }
}
```

## Notes

- `nn::Sequential`（PyTorch 風の `nn::Module` コンテナ）とは別物。`compat::Sequential` は Keras 風の `add_*` ビルダーで、内部の層列に `nn::Sequential` を持つ
- `fandhe_ai::optim::Sgd` / `fandhe_ai::optim::AdamW` 等（facade 公開面）とは `trainable_parameters` / `apply_parameters` の位置対応（配列順序）の契約で連携する。`site/api/compat.md` もこの参照先を `fandhe_ai::optim` と記す
- `Tape` 引数は `fandhe_ai::Tape`（facade の newtype）で、`fandhe_ai_autodiff::Tape` ではない
- `Sequential` は `Default` を実装するが `Send` / `Sync` は実装しない
- `site/api/compat.md` の表は `add_linear` / `add_relu` / `add_sigmoid` / `add_tanh` のみを挙げるが、0.14.0 の `Sequential` は上表の `add_*` と学習 API を持つ（docs.rs の method 一覧とソースを正とする）
- `impl nn::Module for Sequential`（0.14.0 で追加された公開面。公開名の追加はない）: inherent の `forward(&Tape)` がメソッド解決で優先されるため、`TapeRef` を渡す呼び出しは UFCS（`fandhe_ai::nn::Module::forward(&seq, tape, x)`）で書くか、`fandhe_ai::nn::Sequential` で包む。`set_requires_grad` / `freeze` は既定のまま（パラメータを持てば `InvalidArgument`）で、`children` は空（葉扱い）。パラメータ付きの入れ子を外側で `fit` / `bind` すると型付き `Err`。`save_model` は `UnsupportedModel`、ONNX export は `UnsupportedLayer` のまま
- `parametrize_weight_norm` / `parametrize_spectral_norm` の拒否条件（いずれも `InvalidArgument`）: 添字が範囲外・対象が `Linear` / Conv 系でない・二重適用・`compile` 後（optimizer のパラメータ数が固定済みのため、compile 前に適用する）。非対応（型付きエラー）: デバイス常駐経路（`init_device_param_store` 等は `BackendError::Unsupported`）・低精度（AMP）forward・ONNX export。`predict` は tape 経路で有効重みを再構成して動作する。`save_model` / `load_model` は基底 7 種 × weight_norm / spectral_norm の 14 kind で往復する（`compat-model-io.md`）
- 新しい `add_*` の常駐経路・保存・ONNX の扱い: 3D 系（`add_conv_transpose3d` / `add_max_pool3d` / `add_avg_pool3d` / `add_adaptive_*_pool3d` / `add_fractional_max_pool*`）・`add_lp_pool*`・`add_unfold` / `add_fold`・`add_local_response_norm` の常駐経路は fail-closed（`Unsupported`。非常駐の tape 経路で動く）。保存は kind を持つ層（`conv_transpose3d` / `max_pool3d` / `avg_pool3d` / `lp_pool1d`〜`3d` / `adaptive_avg_pool3d` / `adaptive_max_pool3d` / `fractional_max_pool2d`・`3d`〈RNG 状態は保存しない〉/ `unfold` / `fold` / `local_response_norm` / `batch_norm3d` / `hardshrink` / `softshrink` / `upsample_scale_factor` / `channel_shuffle`）で往復し、ONNX export は `UnsupportedLayer`。AMP 低精度は無視して f32 で計算する層がある（`add_conv_transpose3d` / `add_unfold` / `add_fold` / `add_local_response_norm`）。`add_max_pool3d` / `add_adaptive_max_pool3d` / `add_fractional_max_pool*` の層は値だけを返す（索引が要る場合は `Var` のメソッドまたは `FunctionalBuilder::max_pool*_with_indices`）
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/compat/struct.Sequential.html（0.14.0, 取得日 2026-11-14）
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

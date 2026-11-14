---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/struct.DeviceParamStore.html
---

# DeviceParamStore（デバイス常駐パラメータ更新）

`Tape` の寿命とは独立に、全パラメータと optimizer 状態を単一の連結デバイスバッファへ常駐させ、学習ステップごとの再アップロードを開始時 1 回に縮退する状態機械。ルートから `DeviceParamStore` / `ResidentLeaf` / `ResidentTensor` / `ResidentLoss` / `SgdConfig` が公開され、facade の `Tape::step_device_param_store*` 系が更新入口になる。

## Signature / Usage

```rust
let mut store = model.init_device_param_store(&tape)?;  // compat::Sequential から構築（1 回だけアップロード）
// 学習ステップごとに新しい tape を使い、同じ store を使い回す
let out = model.forward_resident(&tape, &input_var, &mut store)?;
let loss = out.mse_loss(&target_var)?;
let grads = tape.backward_device_param_store(&loss, &store)?;
tape.step_device_param_store(&mut store, &grads, &sgd_config)?;
let host_params = tape.sync_device_param_store_to_host(&store)?;  // Sequential::apply_parameters へ渡せる並び
```

常駐入力・常駐 loss（`ResidentLoss` の rustdoc の例。fandhe-ai 0.14.0 以降）:

```rust
use fandhe_ai::{SgdConfig, Tensor, compat::Sequential};
let tape = fandhe_ai::tape();
let model = Sequential::new().add_linear(2, 4, 1)?.add_relu().add_linear(4, 1, 2)?;
let mut store = model.init_device_param_store(&tape)?;
let x = tape.upload_resident(&store, &Tensor::new(vec![0.5_f32; 6], &[3, 2])?)?;
let y = tape.upload_resident(&store, &Tensor::new(vec![1.0_f32; 3], &[3, 1])?)?;
let loss = model.train_step_resident(&mut store, &x, &y, &SgdConfig::new(0.05))?;
tape.wait_device_param_store(&store)?; // 読み出しなしの完了待ち（P7）
assert!(loss.read(&mut store)?.is_finite()); // 唯一の D2H・同期点（P6）
```

## Options / Props

`Tape`（facade）の委譲メソッド（`BackendOps` / `MemoryOps` を公開面へ露出しない薄い委譲）:

| Name | Type | Description |
| --- | --- | --- |
| `step_device_param_store(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &SgdConfig) -> Result<(), BackendError>` | メソッド | SGD の 1 step をデバイス上で in-place 適用。事前検証（勾配存在・shape・`SgdConfig` 検証）に 1 件でも失敗すればどのパラメータも更新せず `Err`（fail-closed） |
| `step_device_param_store_adam(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &AdamConfig) -> Result<(), BackendError>` | メソッド | Adam（coupled L2 weight decay）。CUDA Graph capture の対象外 |
| `step_device_param_store_adamw(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &AdamWConfig) -> Result<(), BackendError>` | メソッド | AdamW（decoupled weight decay） |
| `step_device_param_store_rmsprop(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &RmsPropConfig) -> Result<(), BackendError>` | メソッド | RMSprop |
| `step_device_param_store_adagrad(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &AdagradConfig) -> Result<(), BackendError>` | メソッド | Adagrad |
| `step_device_param_store_lamb(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &LambConfig) -> Result<(), BackendError>` | メソッド | LAMB |
| `step_device_param_store_amp(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &SgdConfig, scaler: &mut GradScaler) -> Result<bool, AutodiffError>` | メソッド | AMP 付き SGD。内部で unscale・非有限検出・`scaler.update` まで完結。戻り値 `true` は非有限勾配により step を skip したことを示す（どのパラメータも更新されず、forward 登録のみ消費） |
| `step_device_param_store_adam_amp(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &AdamConfig, scaler: &mut GradScaler) -> Result<bool, AutodiffError>` | メソッド | AMP 付き Adam。意味論は `step_device_param_store_amp` と同一 |
| `step_device_param_store_adamw_amp(&self, store: &mut DeviceParamStore, grads: &Gradients, config: &AdamWConfig, scaler: &mut GradScaler) -> Result<bool, AutodiffError>` | メソッド | AMP 付き AdamW |
| `backward_device_param_store(&self, loss: &Var<'_>, store: &DeviceParamStore) -> Result<Gradients, AutodiffError>` | メソッド | `Sequential::forward_resident` で forward したグラフ（`Op::LinearResident` を含む）は必ず本メソッドで backward する。素の `Tape::backward` は常駐 weight のバッファを解決できず `AutodiffError::InvalidArgument` で拒否する。入力が `var_no_grad` 等で勾配不要な層は d_input の GEMM を省き、その入力の `Gradients::get` は `Err(GradientTrackingDisabled)` |
| `sync_device_param_store_to_host(&self, store: &DeviceParamStore) -> Result<Vec<Tensor<f32>>, BackendError>` | メソッド | 現在のデバイス上パラメータをホストへダウンロード（明示同期点。`Sequential::apply_parameters` へそのまま渡せる並び順。download は 1 回） |
| `resident_grads_to_host(&self, store: &DeviceParamStore, grads: &Gradients) -> Result<Vec<Option<Tensor<f32>>>, BackendError>` | メソッド | resident 経路で新鮮に充填済みの勾配のみをホストへ。weight slot は CPU / CUDA / Metal とも `Some`。bias slot は Metal・CUDA が `Some`、CPU は `None`。resident 未対応バックエンドは `BackendError::Unsupported`（panic なし） |
| `param_grads_to_host(&self, store: &DeviceParamStore, grads: &Gradients) -> Result<Vec<Tensor<f32>>, BackendError>` | メソッド | 全パラメータ勾配を 3 バックエンド共通の読み出し窓として返す。未充填 slot は `grads` からのフォールバックで埋める。loss 未到達の slot は `BackendError::MissingGradient`、別テープは `TapeMismatch`、shape 不一致は `InvalidArgument` |

`compat::Sequential` 側の入口:

| Name | Type | Description |
| --- | --- | --- |
| `Sequential::init_device_param_store(&self, tape: &Tape) -> Result<DeviceParamStore, BackendError>` | メソッド | 全 `Linear` 層の weight / bias を `trainable_parameters()` と同一の順序契約（層順に weight → bias）で 1 回だけアップロードして構築。Conv / Norm / Embedding / Attention / Pooling / PReLU 層を含む `Sequential` は `BackendError::Unsupported` |
| `Sequential::init_device_param_store_with_param_groups(&self, tape: &Tape, groups: &[ParamGroup]) -> Result<DeviceParamStore, BackendError>` | メソッド | `init_device_param_store` の param groups 版。スロットごとの学習率・weight decay を持つ store を構築し、層別学習率をデバイス常駐更新（`Tape::step_device_param_store*`）で使う。`ParamGroup::params` の添字は `trainable_parameters()` の位置（層順に weight → bias）。group の lr / weight_decay は絶対値で config の lr には追従せず、group を変えるには store を作り直す。対応: CPU は SGD・Adam・AdamW・RmsProp・Adagrad・Lamb、CUDA・Metal は SGD・Adam・AdamW、group 付き更新の capability がない ROCm 等は `Unsupported`。groups ありの store では AMP（`step_*_amp`）と `distributed::step_*` が `InvalidArgument` で拒否され、CUDA Graph capture は使わず直接実行になる。検査順: ① Conv / Norm 等の非対応層・追跡外の学習可能層は `Unsupported`（group の検証より先）、② group の検証（空・範囲外・重複・非有限・負は `InvalidArgument`）、③ capability 不足は `Unsupported`。`groups` が空なら `init_device_param_store` と bit 同一 |
| `Sequential::forward_resident<'t>(&self, tape: &'t Tape, input: &Var<'t>, store: &mut DeviceParamStore) -> Result<Var<'t>, AutodiffError>` | メソッド | 常駐 weight のまま forward。失敗時は pending をロールバックして元のエラーを返す |

常駐入力・常駐 loss（同期を計測窓の外へ出す入口。`ResidentTensor` / `ResidentLoss` は不透明 struct で `Debug` を実装し、いずれも `!Send`）:

| Name | Type | Description |
| --- | --- | --- |
| `Tape::upload_resident(&self, store: &DeviceParamStore, x: &Tensor<f32>) -> Result<ResidentTensor, AutodiffError>` | メソッド | `x` を `store` のデバイスへ 1 回だけ upload して常駐入力ハンドルを返す（計測窓の外で呼ぶ想定）。`store` は `self` と同じデバイスでなければならず、違えば `BackendError::DeviceMismatch`。poison 済みは `StorePoisoned` |
| `ResidentTensor::shape(&self) -> &[usize]` / `device(&self) -> Device` | メソッド | 入力の shape と、入力が常駐するデバイス。推論では作成時の `DeviceParamStore` に束縛され、別 store・別デバイス・古い世代のハンドルは型付きエラー |
| `Tape::matmul_resident(&self, a: &ResidentTensor, b: &ResidentTensor) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 常駐した `a: [m, k]`・`b: [k, n]` の行列積を D2H 1 回でホストへ返す。ホスト入力の `Var::matmul` と bit 一致する（バックエンドが `gemm` と同じ核を持つ場合）。CUDA の TF32 系精度モードなど未対応は `BackendError::Unsupported`（ホスト経路へは落とさない）。同じハンドルを `a` と `b` の両方に渡してもよい |
| `Sequential::predict_resident_input(&self, store: &DeviceParamStore, input: &ResidentTensor) -> Result<Tensor<f32>, AutodiffError>` | メソッド | `predict_resident` の常駐入力版。入力の H2D なし・出力の D2H 1 回だけで推論し、出力は `predict_resident` と bit 一致する。`Sigmoid` / `Tanh` 混在・層の過不足・空 `Sequential`・バックエンドが常駐チェーンに非対応の場合は `BackendError::Unsupported` で止まる（ホスト経路へ落とさない）。チェーンは `store` を書き換えない。別 store・別デバイスのハンドルは `InvalidArgument` / `DeviceMismatch` |
| `Sequential::train_step_resident(&self, store: &mut DeviceParamStore, x: &ResidentTensor, y: &ResidentTensor, config: &SgdConfig) -> Result<ResidentLoss, AutodiffError>` | メソッド | 学習 1 step（forward・MSE（mean）・backward・SGD）を常駐入力から同期なしでデバイスへ積み、loss ハンドルを返す。対応範囲: 全層が `Linear`（中間は `ReLU` 融合・最終層は活性なし）、損失は MSE（mean）固定、最適化は SGD 固定（momentum・nesterov・weight decay 可）。範囲外（`Sigmoid` / `Tanh`・独立 `ReLU`・空 `Sequential`・最終層 `ReLU`・Conv 等・空バッチ・出力幅 0・weight tying・形状不一致・別 `store` / 別デバイスの入力・未消費の forward・poison 済み `store`）は `store` を変更する前に型付きエラー。バックエンドが部品を持たない場合（事前検証後、最初の書き込み前の `Unsupported`。例: CUDA の TF32 系精度モード）だけ step 全体を Tape 経路へフォールバックする（D2H を伴うが loss・更新後パラメータはチェーンと bit 一致）。`init_device_param_store_with_param_groups` の store ではチェーンが `Unsupported` を返すと Tape 経路へ全体フォールバックし group が効く |
| `ResidentLoss::read(&self, store: &mut DeviceParamStore) -> Result<f32, AutodiffError>` | メソッド | loss を `f32` で読む。1 step の唯一の D2H・同期点（読まなければ同期は起きない）。次の step を積むと世代が進み古いハンドルは `BackendError::InvalidArgument`、別 store のハンドルも `InvalidArgument`、poison 済み `store` は `StorePoisoned`。Tape 経路へフォールバックした step の loss は同期なしで返る |
| `Tape::wait_device_param_store(&self, store: &DeviceParamStore) -> Result<(), AutodiffError>` | メソッド | `store` のデバイスに積まれた仕事の完了を D2H なしで待つ。poison 済みは `StorePoisoned`、別デバイスは `DeviceMismatch`、D2H なしの待機を持たないバックエンドは `Unsupported`（`store` は変わらない） |

`DeviceParamStore` 本体（`fandhe_ai_autodiff::optim`。引数の `tape` は内部クレートの生の `Tape` で、facade 利用者からは上記の `Tape` 委譲メソッド経由で到達する）:

| Name | Type | Description |
| --- | --- | --- |
| `DeviceParamStore::new(tape: &Tape, params: &[&Tensor<f32>]) -> Result<DeviceParamStore, BackendError>` | 関数 | `params` を 1 本の連結バッファへまとめ、バックエンドへ 1 回だけアップロード。`MemoryOps` 未実装バックエンドは `BackendError::Unsupported`。momentum の velocity は初回 `step` で遅延確保 |
| `device(&self) -> Device` / `len(&self) -> usize` / `is_empty(&self) -> bool` | メソッド | 常駐デバイス（単一デバイス固定）、登録パラメータ件数（連結バッファの要素数ではない）、件数が 0 か |
| `register_resident_params<'t>(&mut self, tape: &'t Tape) -> Result<Vec<ResidentLeaf<'t>>, BackendError>` | メソッド | forward 用に各パラメータを `Op::ResidentLeaf` ノードとして毎回新規登録（ホストへの download なし）。`step` が消費するまで再登録は `BackendError::PendingForwardUnconsumed` |
| `snapshot_resident_params<'t>(&self, tape: &'t Tape) -> Result<Vec<ResidentLeaf<'t>>, BackendError>` | メソッド | 推論用の読み取り専用版（`pending` を変化させない） |
| `linear_forward<'t>(&self, tape: &'t Tape, input: &Var<'t>, weight: &ResidentLeaf<'t>, bias: Option<&ResidentLeaf<'t>>) -> Result<Var<'t>, BackendError>` | メソッド | `y = input.matmul(weight) (+ bias)` を常駐のまま計算し `Op::LinearResident` として記録。`weight` / `bias` は同一ストアが同じ `tape` に対して発行した `ResidentLeaf` であること（別ストアは `InvalidArgument`、別テープは `TapeMismatch`）。`bias` は `[n]` への厳密一致のみ |
| `linear_forward_with_activation<'t>(&self, tape: &'t Tape, input: &Var<'t>, weight: &ResidentLeaf<'t>, bias: Option<&ResidentLeaf<'t>>, act: Activation) -> Result<Var<'t>, BackendError>` | メソッド | gemm + bias + 活性化を 1 起動に融合 |
| `backward(&self, tape: &Tape, loss: &Var<'_>) -> Result<Gradients, AutodiffError>` | メソッド | `Tape::backward_device_param_store` の本体 |
| `abandon_pending_forward(&mut self) -> bool` | メソッド | 未消費の forward 登録を副作用なくクリアする冪等メソッド（戻り値はクリア前に存在したか）。`poisoned` は解除しない |
| `step(&mut self, tape: &Tape, grads: &Gradients, config: &SgdConfig) -> Result<(), BackendError>` / `step_adam` / `step_adamw` / `step_rmsprop` / `step_adagrad` / `step_lamb` | メソッド | 各 optimizer の 1 step（引数の `config` 型が異なる）。SGD と Adam 系は同一ストア上で混在できない（状態種別ガード） |
| `step_amp` / `step_adam_amp` / `step_adamw_amp` | メソッド | AMP 版（`scaler: &mut GradScaler` を追加し `Result<bool, AutodiffError>` を返す） |
| `sync_to_host(&self, tape: &Tape) -> Result<Vec<Tensor<f32>>, BackendError>` / `resident_grads_to_host` / `param_grads_to_host` | メソッド | 上記 `Tape` 委譲メソッドの本体 |
| `ResidentLeaf<'t>` | `#[derive(Debug, Clone)] pub struct` | 常駐パラメータの不透明ハンドル。公開メソッドは `shape(&self) -> &[usize]` のみ（値アクセサを持たない） |
| `register_resident_leaves` / `snapshot_resident_leaves` | メソッド（`#[deprecated(since = "0.5.0")]`） | 毎回 D2H（ホスト download）を伴う旧版。戻り値は `Vec<Var<'t>>`。`register_resident_params` / `snapshot_resident_params` を使うこと |

## Notes

- 状態機械: `new()` → `register_resident_params` → pending → `step` で pending 消費。`abandon_pending_forward` で pending を破棄できる。pending のまま 2 回目の `register_resident_params` は `PendingForwardUnconsumed` で拒否
- `poisoned`: GPU 起動失敗等の実行時エラー後に遷移し、以降 `step` / `sync_to_host` / `register_resident_params` / `snapshot_resident_params` の 4 経路を `BackendError::StorePoisoned` で拒否する（部分的に更新されたパラメータを使い続けさせない）。回復は新しい `DeviceParamStore` の再構築のみ
- Metal は遅延失敗トークンで、`step` 呼び出し時点では検出できない失敗を次の状態機械エントリで検知して poison へ遷移する。CUDA は ordinal 単位の poison 状態機械で、sticky エラーは次の driver 呼び出し時点で検出される
- 全パラメータを単一連結バッファ化しているため、更新フェーズの grad アップロード・カーネル起動はパラメータ数に依らず 1 回
- AMP 付き step は CUDA / Metal ではデバイス側 unscale カーネルを持たず、`param_grads_to_host` によるホスト計算フォールバック（D2H、ホスト unscale、必要なら H2D）を経由する（性能目標なし）。skip 時は `step_count` / velocity / Adam の `m`・`v` を進めない
- `resident_grads_to_host` / `param_grads_to_host` の呼び出し窓は `backward_device_param_store` の後、`step` の前に限る（`step` 消費後は `BackendError::InvalidArgument`）
- 常駐入力の例（`Tape::upload_resident` → `train_step_resident` → `ResidentLoss::read`）は `ResidentLoss` の rustdoc にあり、既定の CPU `tape()` で動く（0.14.0 の追加 API）
- `ResidentTensor` は `!Send`（`ResidentTensor` が `Send` を要求するとコンパイルが通らないことを `compile_fail` doctest が固定している）。`ResidentLoss` も `!Send`
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/struct.ResidentLoss.html（0.14.0, 取得日 2026-11-14）
- optimizer 設定型（`SgdConfig` / `AdamConfig` / `AdamWConfig` 等）と `GradScaler` は `optim` カテゴリを参照

## Related

- [tape](./tape.md)
- [compat-sequential](./compat-sequential.md)
- [gradients](./gradients.md)
- [device](./device.md)

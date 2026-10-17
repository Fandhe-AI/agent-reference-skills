---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Tape.html
---

# Tape / tape() / tape_for() / TapeRef

`Tape` は `fandhe_ai_autodiff::Tape` の newtype ラッパー。composition root 関数 `tape()` / `tape_for()` が構築する唯一の入口で、内部フィールドは `pub(crate)`。`new_with_ops` のような低レベルコンストラクタへは到達できず、任意の `BackendOps` 実装を公開 API 経由で注入できない構成になっている（REQ-12）。内部クレートの `Tape` メソッドのうち公開面に必要なものだけを薄く委譲する。

## Signature / Usage

```rust
pub fn tape() -> Tape
pub fn tape_for(device: Device) -> Result<Tape, BackendError>
pub fn available_devices() -> Vec<Device>
```

```rust
let tape = fandhe_ai::tape();
let input = tape.var(&tensor_data);
let loss = input.sum(None)?;
let grads = tape.backward(&loss)?;
```

```rust
// Device 未使用時のフォールバック例
let tape = match tape_for(Device::Cuda(0)) {
    Ok(tape) => tape,
    Err(_) => {
        println!("Device::Cuda(0) unavailable; falling back to Device::Cpu");
        tape_for(Device::Cpu)?
    }
};
```

## Options / Props

### 構築

| Name | Type | Description |
| --- | --- | --- |
| `tape()` | 関数 | デフォルトバックエンド（CPU）で `Tape` を構築する。CPU は常に利用可能なため infallible。fused elementwise 最適化が有効な状態で構築される |
| `tape_for(device: Device)` | 関数 | 指定した `Device` に接続した `Tape` を構築する。デバイス不在・ordinal 範囲外・ドライバ欠如時は `BackendError` を返す（fail-fast、panic しない） |
| `available_devices() -> Vec<Device>` | 関数 | 実行時に利用可能な `Device` を列挙する。順序は `Device::Cpu` → `Device::Cuda(0..n)`（ordinal 昇順、CUDA driver 不在なら 0 件）→ `Device::Metal`（`cfg(target_os = "macos")` 限定、検出 0 件なら含まれない）。個別バックエンドの列挙失敗は panic せず除外する |

### 葉ノード登録・逆伝播

| Name | Type | Description |
| --- | --- | --- |
| `var(&self, tensor: &Tensor<f32>) -> Var<'_>` | メソッド | 入力テンソルをテープ上の leaf ノードとして登録する |
| `var_from<T: CastElement>(&self, tensor: &Tensor<T>) -> Result<Var<'_>, AutodiffError>` | メソッド | 非 f32 dtype のテンソルを f32 へ変換して leaf として登録する（dtype は `dtype.md` 参照） |
| `var_no_grad(&self, tensor: &Tensor<f32>) -> Var<'_>` | メソッド | `requires_grad == false` の leaf として登録する（PyTorch の `requires_grad=False` 相当） |
| `backward(&self, loss: &Var<'_>) -> Result<Gradients, AutodiffError>` | メソッド | `loss` から逆伝播し、寄与した全入力に対する勾配を計算する |
| `backward_accumulate(&self, loss: &Var<'_>, into: &mut Gradients) -> Result<(), AutodiffError>` | メソッド | 逆伝播結果を既存の同一世代 `Gradients` へ加算する（PyTorch の複数回 `backward()` による `.grad` 蓄積相当の opt-in API） |
| `reset(&mut self)` | メソッド | ノード列を葉プレフィックスまで切り詰め、同一 `Tape` を次ステップで再利用可能にする |
| `leaf_count(&self) -> usize` | メソッド | `reset` 後も保持される葉の個数 |
| `leaf(&self, index: usize) -> Option<Var<'_>>` | メソッド | 保持される葉 `index` 番目（登録順）の `Var` を再取得する。範囲外・非 `Var` 表現の葉は `None` |
| `device(&self) -> Device` | メソッド | この `Tape` が結線されているデバイス |
| `transfer(&self, source: &Var<'_>) -> Result<Var<'_>, AutodiffError>` | メソッド | 別の `facade::Tape`（`self` でもよい）上の `source` を、この `Tape` 上の新しい葉ノードとして転送する。クロスデバイス転送の唯一の入口 |

### 高階微分・関数変換・検査

詳細は `autodiff-transforms.md` を参照。

| Name | Type | Description |
| --- | --- | --- |
| `backward_create_graph<'c>(&self, loss: &Var<'_>, child: &'c Tape) -> Result<CreateGraphResult<'c>, AutodiffError>` | メソッド | 子テープ方式の高階微分。`child` は `tape()` / `tape_for()` で作った空の別 `Tape` |
| `jacobian(&self, output: &Var<'_>, input: &Var<'_>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | ヤコビアン（reverse-mode）。戻り値の shape は `output.shape ++ input.shape` |
| `hessian(&self, loss: &Var<'_>, input: &Var<'_>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | ヘッセ行列。`loss` は要素数 1 |
| `vjp(&self, output: &Var<'_>, input: &Var<'_>, cotangent: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | ベクトル・ヤコビ積 |
| `hvp(&self, loss: &Var<'_>, input: &Var<'_>, vector: &Tensor<f32>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | ヘッセ・ベクトル積 |
| `jvp(&self, output: &Var<'_>, input: &Var<'_>, tangent: &Tensor<f32>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | ヤコビアン・ベクトル積（double-VJP 法） |
| `jacfwd(&self, output: &Var<'_>, input: &Var<'_>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 入力要素数に比例する前向きヤコビアン |
| `vmap<'t, F>(&'t self, input: &Var<'t>, in_dim: usize, f: F) -> Result<Var<'t>, AutodiffError>` | メソッド | バッチ軸 `in_dim` に沿って `f` を各スライスへ適用し dim 0 に積む（ループ版） |
| `backward_detect_anomaly(&self, loss: &Var<'_>) -> Result<Gradients, AutodiffError>` | メソッド | 非有限値（NaN / ±inf）を最初に生んだノードを検出する逆伝播 |
| `gradcheck<F>(device: Device, f: F, inputs: &[Tensor<f32>], options: &GradcheckOptions) -> Result<GradcheckReport, AutodiffError>` | 関連関数 | 解析勾配と中心差分の数値勾配を突合する。`&self` を取らず `tape_for(device)` を都度生成する |
| `custom<'t>(&'t self, func: Arc<dyn CustomFunction>, inputs: &[Var<'t>]) -> Result<Var<'t>, AutodiffError>` | メソッド | ユーザー定義 forward / backward（カスタム VJP）を 1 ノードとして記録する |
| `register_backward_hook<F>(&self, var: &Var<'_>, hook: F) -> Result<HookHandle, AutodiffError>` | メソッド | 勾配確定時に呼ばれる観察専用 hook を登録する。`F: Fn(&Tensor<f32>) -> Result<(), AutodiffError> + Send + Sync + 'static` |
| `remove_hook(&self, handle: HookHandle) -> Result<(), AutodiffError>` | メソッド | hook を解除する。`reset` 前に発行したハンドルは `TapeMismatch` |
| `bincount(&self, input: &Tensor<i32>, minlength: usize) -> Result<Tensor<i32>, AutodiffError>` | メソッド | 重みなしの度数カウント（1 次元・非負のみ） |
| `bincount_weighted(&self, input: &Tensor<i32>, weights: &Var<'_>, minlength: usize) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 重み付き度数カウント（出力は detached） |

### RNN / attention の入口

詳細は `nn/rnn.md` と `nn/kv-cache.md` を参照。生の autodiff `Tape` を取り出せないため、`Tape` 上の薄い委譲メソッドが入口になる。

| Name | Type | Description |
| --- | --- | --- |
| `rnn_forward_seq` / `lstm_forward_seq` / `gru_forward_seq` | メソッド | `nn::rnn::{Rnn, Lstm, Gru}` の Sequence レベル forward。`h0`（LSTM は `c0` も）省略時はゼロ初期化 |
| `stacked_rnn_forward_seq` / `stacked_lstm_forward_seq` / `stacked_gru_forward_seq` | メソッド | 多層・双方向・層間 dropout 付き版。`h0` / `c0` の長さは `num_layers * num_directions` |
| `stateful_attention_forward(&'t self, sa: &mut nn::kv_cache::StatefulAttention, x_new: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | KV キャッシュ付き self-attention の forward。`x_new` は `[B, L_new, E]` |

### デバイス常駐パラメータ更新

詳細は `device-param-store.md` を参照。

| Name | Type | Description |
| --- | --- | --- |
| `step_device_param_store` / `_adam` / `_adamw` / `_rmsprop` / `_adagrad` / `_lamb` | メソッド | `DeviceParamStore` を各 optimizer（SGD / Adam / AdamW / RMSprop / Adagrad / LAMB）で更新する。`Result<(), BackendError>` |
| `step_device_param_store_amp` / `_adam_amp` / `_adamw_amp` | メソッド | `GradScaler` 付き（AMP）の更新。`Result<bool, AutodiffError>`（`true` は非有限勾配により step を skip） |
| `backward_device_param_store(&self, loss, store) -> Result<Gradients, AutodiffError>` | メソッド | `Op::LinearResident` を含むグラフ用の backward |
| `sync_device_param_store_to_host(&self, store) -> Result<Vec<Tensor<f32>>, BackendError>` | メソッド | デバイス常駐パラメータをホストへ同期する |
| `resident_grads_to_host` / `param_grads_to_host` | メソッド | resident 経由で充填済みの勾配のみ / 全パラメータの勾配をホストへ読み出す |

### dtype capability

詳細は `dtype.md` を参照。

| Name | Type | Description |
| --- | --- | --- |
| `typed_ops_f64` / `typed_ops_f16` / `typed_ops_bf16` | メソッド | バックエンドの dtype 別演算（`gemm` / `add` / `mul` / `relu` / `exp` / `tanh` / `sum` / `max` の 8 演算限定）への `Option<&dyn TypedOps<T>>`。`Var` / autograd を経由せず勾配は付かない。非対応は `None` |

### TapeRef

`nn::Module::forward` の第 1 引数となる借用ハンドル（`#[derive(Clone, Copy)]`）。公開メソッドは `var` / `var_from` / `var_no_grad` の 3 件のみで、`backward` 等は持たない。crate 外からの構築は `From<&Tape>` のみ。

```rust
pub struct TapeRef<'t>(/* private */);

impl<'t> TapeRef<'t> {
    pub fn var(&self, tensor: &Tensor<f32>) -> Var<'t>
    pub fn var_from<T: CastElement>(&self, tensor: &Tensor<T>) -> Result<Var<'t>, AutodiffError>
    pub fn var_no_grad(&self, tensor: &Tensor<f32>) -> Var<'t>
}
```

## Notes

- `Tape` の構築は `tape()` または `tape_for(Device)` 経由のみ。フィールドへの直接アクセスは不可
- `Tape` は `Debug`, `Send` を実装するが `Sync` は実装しない
- `reset` 後に、`reset` 前に得た `Gradients` を読むと `Gradients::get` が `AutodiffError::TapeMismatch` を返す（世代番号による実行時検査。`site/examples/training-loop.md`）。`reset` は `&mut self` のため、reset 前の `Var` を持ち越すとコンパイルエラーになる
- `lib.rs` 冒頭の module doc は「`Tape` は `var` / `backward` の 2 メソッドのみを再委譲する」「デバイス列挙の集約入口はスコープ外」と書くが、0.11.0 では古い文面。item 側の doc とシグネチャ（本ページの表）が正しく、`available_devices()` も存在する
- 各イテレーションで新しい `Tape` を作るか、`reset` で再利用するかを選べる（`gemm_bench.rs` は前者の例）
- `model.predict()` は内部で `tape()` を呼ぶ。明示的にグラフのライフサイクルを制御したい場合は `Tape` を作って `model.forward()` を呼ぶ
- `gradcheck` の不一致は `Ok` の `GradcheckReport::passed()` が `false`（`Err` ではない）。テープ生成の失敗は `Err(AutodiffError::Backend(_))`

## Related

- [var](./var.md)
- [gradients](./gradients.md)
- [device](./device.md)
- [autodiff-transforms](./autodiff-transforms.md)
- [device-param-store](./device-param-store.md)
- [dtype](./dtype.md)

---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Var.html
---

# Var

テープ上の 1 ノードを表す型。値そのものではなく `NodeId` と共有された `Tape` への参照を保持し、演算のたびにテープへ新しいノードを追加する。`Clone`, `Copy`, `Debug` を実装するが `Send` / `Sync` は実装しない。0.11.0 の `Var` は inherent メソッドを 273 個持つため、本ページは値の取り出し・テープ間の移動・基本四則を扱う概要ページとし、系統別の演算は下表の 7 ページに分割している。

## Signature / Usage

```rust
let tape = fandhe_ai::tape();
let input_var = tape.var(&input_tensor);
let output = input_var.relu().matmul(&weight_var)?;
let loss = output.mse_loss(&target_var)?;
```

## Options / Props

### 値・デバイス・テープ間の移動

| Name | Type | Description |
| --- | --- | --- |
| `value(&self) -> Ref<'_, Tensor<f32>>` | メソッド | 現在値を非トラッキングのテンソル参照として返す。遅延評価中の elementwise グラフは必要に応じて materialize される。この参照を保持したままテープ操作を行うと `RefCell` の borrow 衝突で panic する |
| `to_tensor(&self) -> Tensor<f32>` | メソッド | `value()` の所有版。テンソルを clone するため borrow 問題を回避できる |
| `host_view(&self) -> VarHostView` | メソッド | ホスト可視の値を借用なしで読み出す。`Tape` の `RefCell` 借用を保持しないため、保持したまま同じ `Tape` へ演算を追加しても panic しない |
| `detach(&self) -> Result<Var<'t>, AutodiffError>` | メソッド | 追跡を切り離し、現在値を `requires_grad == false` の新しい葉として同じ `Tape` へ登録する（PyTorch の `Tensor.detach()` 相当）。値は `Arc` 共有でデータコピーなし。未実体化の遅延グラフはここで実体化される |
| `device(&self) -> Device` | メソッド | この `Var` が属する `Tape` のデバイス |
| `to(&self, device: Device) -> Result<Var<'t>, AutodiffError>` | メソッド | 要求先デバイスが現在のデバイスと一致するかを検査する fail-fast の入口。一致なら恒等、不一致なら `AutodiffError::DeviceMismatch { requested, actual }`。値の転送はしない |
| `to_tape<'u>(&self, target: &'u Tape) -> Result<Var<'u>, AutodiffError>` | メソッド | 別の `Tape` 上へ値を新しい葉ノードとして転送する（facade では `Tape::transfer` 経由）。同一 `Tape` なら恒等。転送は bit 完全一致で、勾配はテープをまたがない |
| `cast<T: CastElement>(&self) -> Result<Tensor<T>, AutodiffError>` | メソッド | 値を `Tensor<T>` へ変換する。非微分（detached）。`dtype.md` 参照 |
| `to_f32(&self) -> Var<'t>` | メソッド | 勾配を保つ f32 の恒等射（`*self` を返す） |
| `checkpoint_from(&self, inputs: &[&Var<'t>]) -> Result<Var<'t>, AutodiffError>` | メソッド | activation checkpointing。`self` を区間の出力、`inputs` を区間の外側入力として、`inputs` より後・`self` 以前に push された再計算可能ノードを解放する。`inputs` が空ならテープ先頭から。別 `Tape` の入力は `TapeMismatch` |

### 基本演算

| Name | Type | Description |
| --- | --- | --- |
| `matmul(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | 行列積。rank 2 同士は `gemm`、rank 3 以上を含む場合は NumPy 互換バッチブロードキャストの `gemm_batched`。即座に materialize される |
| `matmul_checksum(&self, other: &Var<'t>, readout: ChecksumReadout) -> Result<GemmChecksum, AutodiffError>` | メソッド | `C = self @ other` の全要素和（checksum）をバックエンドの f64 reduction で求める計測専用入口。rank 2 限定、テープへ記録せず backward の対象外 |
| `add` / `mul` | メソッド | ブロードキャスト対応の elementwise 加算・乗算（遅延評価） |
| `sub` / `div` | メソッド | ブロードキャスト対応の減算・除算（eager） |
| `relu()` | メソッド | ReLU（infallible、引数なし） |
| `exp()` / `tanh()` / `sigmoid()` | メソッド | elementwise の exp / tanh / sigmoid |
| `sum(dim: Option<usize>) -> Result<Var<'t>, AutodiffError>` | メソッド | 指定次元での総和。`None` は全軸 |
| `max(dim: Option<usize>) -> Result<Var<'t>, AutodiffError>` | メソッド | 指定次元での最大値 |
| `mse_loss(&self, target: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | 平均二乗誤差（`Reduction::Mean` で `mse_loss_with` に委譲） |
| `mse_loss_with(&self, target: &Var<'t>, reduction: Reduction) -> Result<Var<'t>, AutodiffError>` | メソッド | reduction 戦略を指定できる MSE。`Reduction` は `#[non_exhaustive]` で `Mean` / `Sum` |
| `cross_entropy_loss(&self, targets: &Tensor<i32>, class_dim: usize, reduction: Reduction) -> Result<Var<'t>, AutodiffError>` | メソッド | log-sum-exp で安定化されたクロスエントロピー損失 |

### 系統別ページ

| Page | 内容 |
| --- | --- |
| `var-elementwise.md` | 算術・数学関数・三角関数・活性化・比較・非有限値処理・低精度 forward（`activation_ops` / `activation_scalar_ops` / `scalar_unary_ops` / `trig_ops` / `bool_ops` / `nonfinite_ops` / `low_precision_ops` / `softmin_threshold_ops`） |
| `var-reduction.md` | 縮約・統計・累積・ソート・top-k・unique・ビニング（`reduce_ops` / `extremum_ops` / `stat_reduce_ops` / `cumulative_ops` / `topk_unique_ops` / `binning_ops`） |
| `var-shape-indexing.md` | reshape・転置・結合・分割・インデックス・scatter / gather・pad・fold・rearrange（`shape_view_ops` / `rearrange_ops` / `indexing_ops` / `indexed_update_ops` / `pad_ops` / `fold_ops`） |
| `var-linalg.md` | 行列・線形代数・テンソル積（`matrix_ops` / `linalg_ops` / `tensor_product_ops` / `einsum`、`qr` / `svd` / `solve` / `det` / `inv` など） |
| `var-nn-ops.md` | conv・pool・norm・dropout・embedding・attention・RNN セル・interpolate・pixel_shuffle（`conv3d_ops` / `conv_transpose3d_ops` / `pool3d_ops` / `max_unpool_ops` / `lrn_ops` / `weight_reparam_ops`） |
| `var-losses.md` | 損失関数（`loss_ops` / `elementwise_loss_ops` / `margin_focal_loss_ops`、`huber_loss` / `kl_div_loss` / `nll_loss` / `ctc_loss` など） |
| `var-signal.md` | FFT / STFT 系（`fft_ops`: `fft` / `ifft` / `rfft` / `irfft` / `stft` / `istft`） |

### VarHostView

`host_view()` が返す所有型のビュー。`Deref<Target = [f32]>` を実装し、contiguous 化済みの値をスライスとして読める。`Tape` の借用を一切保持しない。`fandhe_ai::VarHostView` として再エクスポートされる。

## Notes

- 0.11.0 では `Var::shape()` は `pub(crate)` で公開 API ではない。形状は `to_tensor().shape()` などで取得する
- ライフタイム `'t` だけでは同一テープ由来であることを保証しない（1 スコープに複数テープが共存し得る）。二項演算は実行時に `tape.id` を検証し、不一致時は `AutodiffError::TapeMismatch` を返す
- elementwise 演算は materialize 境界まで計算を遅延する。fan-in の事前 materialize やチェイン長上限による自己 materialize が自動的に働く
- `unwrap()` / `panic!()` ではなく `Result` を明示的に使うのがライブラリの規約
- 系統別の分類は `autodiff` クレートの `*_ops.rs` ファイル単位（`var.rs` 本体に 135 メソッド、残りは上記 ops モジュール）に対応する

## Related

- [tape](./tape.md)
- [gradients](./gradients.md)
- [errors](./errors.md)
- [dtype](./dtype.md)

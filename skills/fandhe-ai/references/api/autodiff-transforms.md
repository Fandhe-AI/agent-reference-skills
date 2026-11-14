---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/struct.Tape.html
---

# 高階微分・関数変換・gradcheck・hooks・custom function

`Tape` に生えた高階微分（`backward_create_graph` / `jacobian` / `hessian` / `vjp` / `hvp` / `jvp` / `jvp_multi` / `jvp_create_graph` / `jacfwd`）、関数変換 `vmap` / `vmap_grad`、診断（`backward_detect_anomaly` / `gradcheck`）、拡張点（`custom` / `register_backward_hook` / `remove_hook`）と、関連型（`CreateGraphResult` / `JvpCreateGraphResult` / `CustomFunction` / `HookHandle` / `GradcheckOptions` / `GradcheckReport`）、`Var::checkpoint_from`。戻り値は特記なき限り `Result<_, AutodiffError>`。基本の `backward` は `tape.md` を参照。

## Signature / Usage

```rust
use fandhe_ai::{tape, Tensor};

let t = tape();
let child = tape();                                   // 空の別 Tape
let x = t.var(&Tensor::new(vec![2.0_f32], &[1])?);
let loss = x.mul(&x)?.mul(&x)?.sum(None)?;            // x^3
let cg = t.backward_create_graph(&loss, &child)?;
let g = cg.grad(&x)?.unwrap();                        // 子テープ上の 1 階勾配 (3x^2)
let grads2 = child.backward(&g.sum(None)?)?;          // 2 階 (6x = 12)
```

## Options / Props

高階微分・ヤコビアン系（結果は特記なき限り非微分のホスト値 `Tensor<f32>`）:

| Name | Type | Description |
| --- | --- | --- |
| `Tape::backward_create_graph<'c>(&self, loss: &Var<'_>, child: &'c Tape) -> Result<CreateGraphResult<'c>, AutodiffError>` | メソッド | 子テープ方式の高階微分入口。1 階勾配の計算過程を `child` へ `Var` 演算として記録する。`child` は `tape()` / `tape_for()` で作った空の別 `Tape`。拒否時は `child` へ何も書き込まない。エラーは `Backward`（同一テープ・非空の子・checkpoint・未対応 Op）/ `TapeMismatch` / `DeviceMismatch` / `GradientTrackingDisabled` |
| `jacobian(&self, output: &Var<'_>, input: &Var<'_>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | reverse-mode のヤコビアン。shape は `output.shape ++ input.shape`。`input` が追跡なしなら `GradientTrackingDisabled`、別テープなら `TapeMismatch`。計算量は `output` の要素数に比例 |
| `hessian(&self, loss: &Var<'_>, input: &Var<'_>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | ヘッセ行列。`loss` は要素数 1。`create_graph` 対応 Op の範囲のみ |
| `vjp(&self, output: &Var<'_>, input: &Var<'_>, cotangent: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>` | メソッド | `cotangentᵀ · ∂output/∂input`。結果は `input` と同 shape。`cotangent` は `output` と shape 完全一致（ブロードキャストなし）。追跡なしの `output` は全ゼロを返す。親テープへ 2 ノード（余接の葉と `mul`）を足す |
| `hvp(&self, loss: &Var<'_>, input: &Var<'_>, vector: &Tensor<f32>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | ヘッセ・ベクトル積（reverse-over-reverse）。`loss` の要素数は 1（`[]` / `[1]` / `[1, 1]`、違反は `InvalidArgument`）。追跡なしの `loss` は `Err` を伝播（`vjp` と非対称）。親テープへノードを足さず、子テープにノードが残るため `child` は作り直す |
| `jvp(&self, output: &Var<'_>, input: &Var<'_>, tangent: &Tensor<f32>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | `J·v`（double-VJP 法）。結果は `output` と同 shape。`tangent` は `input` と shape 完全一致。追跡なしの `output` は全ゼロ。入口検査後は失敗しても親テープに 2 ノード残る。成功時は子テープにノードが残る |
| `jacfwd(&self, output: &Var<'_>, input: &Var<'_>, child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 前向きのヤコビアン全体（double-VJP 法）。shape は `output.shape ++ input.shape`。子 backward を入力要素数 `n` 回（`jacobian` は出力要素数 `m` 回）。契約は `jvp` と同じ |
| `jvp_multi(&self, output: &Var<'_>, inputs: &[&Var<'_>], tangents: &[&Tensor<f32>], child: &Tape) -> Result<Tensor<f32>, AutodiffError>` | メソッド | 複数入力のヤコビアン・ベクトル積 `J·v = Σ_i J_i·v_i`（`J_i = ∂output/∂inputs[i]`）。結果の shape は `output.shape()`。`inputs` と `tangents` は同じ長さで、`tangents[i]` は `inputs[i]` と同 shape（ブロードキャスト不可）。入口検査（ノードを足す前。失敗時は親・子テープとも無変更）: 長さ不一致・空の `inputs`・同一 `Var` の重複指定は `InvalidArgument`、別テープは `TapeMismatch`、追跡なしの入力は `GradientTrackingDisabled`、shape 不一致は `Shape(ShapeMismatch)`、要素数オーバーフローは `Shape(ElementCountOverflow)`。追跡なしの `output`・要素数 0 はテープに触れず全ゼロ。入口検査後の失敗でも親テープへちょうど 2 ノードが残る（入力数に依らない）。計算量は入力数に依らず親 backward 1 回＋子 backward 1 回 |
| `jvp_create_graph<'g>(&self, output: &Var<'_>, input: &Var<'_>, tangent: &Tensor<f32>, child: &Tape, grandchild: &'g Tape) -> Result<JvpCreateGraphResult<'g>, AutodiffError>` | メソッド | 微分可能な `J·v`（`torch.func.jvp` を `create_graph=True` で使う形）。`child`（中間）と `grandchild`（結果を置く）は呼び出し側が用意する空の別 `Tape` で、`self` とも互いとも別でなければならず、成功後も失敗後も再利用せず作り直す。入口検査は `jvp` と同じ 1〜4 に加え、同一テープ・空でないテープは `Backward`、デバイス不一致は `DeviceMismatch`。追跡なしの `output`・要素数 0・`J ≡ 0` は `grandchild` 上の全ゼロの追跡なし葉 1 個を返し、写しはすべて `None`。f32 の `Tape`・単一入力のみ。計算量は親 backward 1 回＋子 backward 1 回＋孫テープへの記録 1 回 |
| `Tape::vmap_grad<F>(input: &Tensor<f32>, in_dim: usize, child: &mut Tape, f: F) -> Result<Tensor<f32>, AutodiffError>` | 関連関数 | サンプルごとの勾配（`vmap(grad(f))` 相当のループ版）。`input` を `in_dim` 軸で `B` 個のスライスに分け、`f` が返す 1 要素の損失 `loss_i`（`[]` / `[1]` / `[1, 1]`）の `∂loss_i/∂slice_i` を dim 0 に積んだ非微分の `Tensor<f32>`（shape は `[B] ++ slice_shape`）を返す。`&self` は取らない。`F: for<'c> FnMut(TapeRef<'c>, &Var<'c>) -> Result<Var<'c>, AutodiffError>`（勾配は取らず損失を返す）。`child` は空の `Tape` を `&mut` で渡し（空でなければ `Backward`）、サンプルごとに内部で `reset` されるので成功時も失敗時も空で戻り、続けて再利用できる。軸範囲外は `Shape(AxisOutOfRange)`、空バッチは `InvalidArgument`、損失が 1 要素でなければ `InvalidArgument`、追跡なしの損失・勾配が届かないスライスは該当行が全ゼロ。共有パラメータについての勾配と微分可能な版は含まない |
| `vmap<'t, F>(&'t self, input: &Var<'t>, in_dim: usize, f: F) -> Result<Var<'t>, AutodiffError>` | メソッド | 軸 `in_dim` に沿って `f: FnMut(&Var<'t>) -> Result<Var<'t>, AutodiffError>` を各スライスへ適用し、結果を dim 0 に積む（ループ版）。単一入力、`out_dim` は無く出力のバッチ軸は dim 0 固定。空バッチは `InvalidArgument`、軸範囲外は `Shape(AxisOutOfRange)`。クロージャが `Err` なら、それまでに足したノードがテープに残る。クロージャ内で `grad` を取る合成（`vmap(grad)`）は `vmap` の契約外で、スライスごとの勾配は `Tape::vmap_grad` を使う |
| `Var::checkpoint_from(&self, inputs: &[&Var<'t>]) -> Result<Var<'t>, AutodiffError>` | メソッド | activation checkpointing。`self` を区間の出力、`inputs` を外側入力として、区間内の再計算可能ノードを解放する。`inputs` が空なら区間はテープ先頭から `self` まで。別テープは `TapeMismatch`。区間が空（`self` の node id が `inputs` のどれよりも小さい）なら no-op |

診断:

| Name | Type | Description |
| --- | --- | --- |
| `backward_detect_anomaly(&self, loss: &Var<'_>) -> Result<Gradients, AutodiffError>` | メソッド | 非有限値（NaN / ±inf）を最初に生んだノードを検出する逆伝播。正常時は `backward` と bit 一致。検出時は `AutodiffError::Backward`（メッセージはノード種別名のみ。テンソル値や利用者定義名を含まない）。テープを書き換えない |
| `Tape::gradcheck<F>(device: Device, f: F, inputs: &[Tensor<f32>], options: &GradcheckOptions) -> Result<GradcheckReport, AutodiffError>` | 関連関数 | 解析勾配と中心差分の数値勾配を全入力要素で突合する。`F: for<'a> Fn(TapeRef<'a>, &[Var<'a>]) -> Result<Var<'a>, AutodiffError>`（単一の出力を記録。定数は `TapeRef::var_no_grad`）。評価ごとに `tape_for(device)` で新しいテープを作る。評価回数は `1 + 2·Σn_k`。不一致は `Ok` の `passed() == false`。テープ生成失敗は `Err(AutodiffError::Backend(_))`。`relu` の 0 付近等のキンク近傍・低精度 forward は適用外（偽陽性になりうる） |
| `GradcheckOptions::new(eps: f64, atol: f64, rtol: f64, tau: f64) -> Result<Self, AutodiffError>` | 関数 | 4 引数すべて有限かつ正（違反は `InvalidArgument`）。`eps`: 中心差分の摂動幅、`atol` / `rtol`: 絶対・相対の合格閾値、`tau`: 相対誤差の分母の下限。`Default` は実装しない。アクセサ: `eps()` / `atol()` / `rtol()` / `tau()` |
| `GradcheckReport` | struct（アクセサのみ） | `passed() -> bool`、`max_abs_error() -> f64`（非有限があれば `inf`）、`max_rel_error() -> f64`（分母は `max(abs(解析), abs(数値), tau)`）、`worst_location() -> (usize, usize, usize)`（`(入力番号, 出力の平坦添字, 入力の平坦添字)`）、`checked_elements() -> usize`（`出力要素数 × Σ入力要素数`） |

拡張点（custom function / hooks）と戻り値型:

| Name | Type | Description |
| --- | --- | --- |
| `custom<'t>(&'t self, func: Arc<dyn CustomFunction>, inputs: &[Var<'t>]) -> Result<Var<'t>, AutodiffError>` | メソッド | 利用者実装の forward / backward 対を 1 ノードとして記録し、出力 `Var` を返す。facade 経由の唯一の入口（`Var::custom` は無い）。空の `inputs` は `InvalidArgument`、別テープは `TapeMismatch`、宣言 shape と実出力の不一致は `Shape` / `Backward` 系。二階微分（`create_graph`）は非対応で fail-closed の `Err` |
| `register_backward_hook<F>(&self, var: &Var<'_>, hook: F) -> Result<HookHandle, AutodiffError>` | メソッド | `F: Fn(&Tensor<f32>) -> Result<(), AutodiffError> + Send + Sync + 'static`。当該ノードの勾配確定時（VJP の直前）に呼ばれる観察専用 hook。勾配は書き換えられず、登録有無で勾配は bit 一致。同一ノードの複数 hook は登録順（FIFO）、ノード間は `NodeId` 降順。`backward` / `backward_accumulate` / `backward_create_graph` の 1 階が対象。hook が `Err` を返すとその時点で打ち切られ、同じ `Err` が `backward` の戻り値になる。エラー: 別テープの `var` は `TapeMismatch`、`requires_grad == false` は `GradientTrackingDisabled`、デバイス常駐葉は `InvalidArgument` |
| `remove_hook(&self, handle: HookHandle) -> Result<(), AutodiffError>` | メソッド | hook 解除。ハンドルは値で消費される（二重解除は型上起きない）。別テープのハンドル、または `Tape::reset` より前に発行されたハンドルは `TapeMismatch` |
| `CreateGraphResult<'c>` | `#[derive(Debug)] struct` | `first_order(&self) -> &Gradients`（通常の `backward` と bit 同一の 1 階勾配）、`grad(&self, parent_var: &Var<'_>) -> Result<Option<Var<'c>>, AutodiffError>`（子テープ上の 1 階勾配 `Var`。`loss` から未到達または対象 Op が `create_graph` 非対応なら `Ok(None)`）、`child_var(&self, parent_var: &Var<'_>) -> Result<Option<Var<'c>>, AutodiffError>`（`parent_var` の子テープ上の写し。2 階勾配を読み出す鍵）。親テープ・世代の不一致は `TapeMismatch`、`requires_grad == false` は `GradientTrackingDisabled` |
| `JvpCreateGraphResult<'g>` | 不透明 struct（`Debug`）。ルートから再エクスポート | `output(&self) -> Var<'g>`（`J·v`。shape は元の `output` と同じ。`grandchild` 上の追跡された値）、`child_var(&self, parent_var: &Var<'_>) -> Result<Option<Var<'g>>, AutodiffError>`（元テープ上の `parent_var` の孫テープ上の写し。`output()` を `grandchild.backward` で微分した勾配はこの写しをキーに読む。親テープの `Var` そのものとは微分で繋がらない）。`Ok(None)` は `J·v` がその入力に恒等的に依存しないこと。テープ・世代の不一致は `TapeMismatch`、追跡なしは `GradientTrackingDisabled`。出力が入力に依存しない場合は追跡なしになりうる |
| `CustomFunction` | `pub trait CustomFunction: Send + Sync + 'static` | `fn name(&self) -> &str`、`fn output_shape(&self, input_shapes: &[&[usize]]) -> Result<Vec<usize>, AutodiffError>`、`fn forward(&self, inputs: &[&Tensor<f32>]) -> Result<Tensor<f32>, AutodiffError>`、`fn backward(&self, inputs: &[&Tensor<f32>], out_value: &Tensor<f32>, upstream: &Tensor<f32>, requires_grad: &[bool]) -> Result<Vec<Option<Tensor<f32>>>, AutodiffError>`。`backward` の戻り値は `inputs` と同じ長さ・順序。`requires_grad[i] == true` の入力に `None` を返す、または `Some` の shape が入力と不一致だと fail-closed で `Err` |
| `HookHandle` | 不透明 struct（`Debug` のみ） | フィールド・アクセサなし。`Clone` / `Copy` なし |

## Notes

- `custom` の `forward` / `backward` は常に host 実行で `BackendOps` を経由せず、GPU 上に構築した `Tape` でも host 実行になる（性能は非保証）。バックエンド間数値一致（REQ-2）の判定対象外
- `CustomFunction::backward` は `backward_accumulate` 等で複数回呼ばれうるため、入力だけに依存する決定的・副作用なしの純関数・冪等にする。`'static` 境界により `Tape` / `Var` を捕捉できない（再入防止）
- hook は `Tape::reset` で全て消える
- 数値は REQ-2 の統一複合判定で、`vjp` / `hvp` / `jvp` / `jacfwd` は 1 階 VJP や `jacobian` との bit 同一は契約にしない。f32 の `Tape` のみ（`VarF64`・低精度 forward は対象外）
- `jvp` の `tangent` は `input` 側と、`vjp` の `cotangent` は `output` 側と照合する（向きが逆）
- `hvp` と `vjp` は追跡なしの扱いが非対称（`vjp` / `jvp` / `jacobian` は追跡なし `output` に全ゼロ、`hvp` は `Err`）
- `backward_create_graph`（と、それに乗る `hessian` / `hvp` / `jvp` / `jvp_multi` / `jvp_create_graph` / `jacfwd`）の対象 Op の正本は `fandhe_ai_autodiff` の `Op::supports_create_graph` の網羅 match。0.14.0 の rustdoc は、選択縮約（`kthvalue` / `median` / `quantile` / `max` / `min` / `amax` / `amin`）・統計縮約（`var` / `std` / `norm_l1` / `norm_l2` / `norm_p` / `logsumexp` / `nansum` / `nanmean`）・損失（`kl_div_loss` / `poisson_nll_loss` / `gaussian_nll_loss` / `bce_loss` / `bce_with_logits_loss` / `soft_margin_loss` / `sigmoid_focal_loss` / `margin_ranking_loss` / `hinge_embedding_loss` / `cross_entropy_loss_with` / `multi_margin_loss` / `multilabel_margin_loss` / `multilabel_soft_margin_loss` / `cosine_embedding_loss` / `triplet_margin_loss`）・構造変換（`dropout` 系 / `interpolate` / `max_unpool1d` / `max_unpool2d` / `max_unpool3d`）・正規化・再パラメータ（`local_response_norm` / `weight_norm` / `spectral_norm`）・RNN / GRU / LSTM の `*_forward_seq`・`conv3d` / `conv_transpose3d`・`scatter_reduce`・`stft` / `istft`・`cumprod` / `logcumsumexp`・`cholesky` / `pinv` / `lstsq` / `qr` / `svd` / `eigh` / `det` / `matrix_norm` / `slogdet` の `sign` / `matrix_rank` が対象になったと記す（各項目の条件と拒否される入力は rustdoc の `Tape::backward_create_graph` を参照）。`Tape::custom` のユーザー定義関数は恒久的に対象外
- `jvp_create_graph` の入口検査は 1〜4 が `jvp` と同じで、5 がテープの事前検査（同一テープ → `Backward`、デバイス不一致 → `DeviceMismatch`、空でないテープ → `Backward`）。5 までの失敗では 3 枚のテープとも無変更
- f64 版（`TapeF64::backward_create_graph` / `jvp` / `jacfwd` / `jvp_multi` / `jvp_create_graph` と `CreateGraphResultF64` / `JvpCreateGraphResultF64`）は `dtype.md` を参照
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/struct.Tape.html（0.14.0, 取得日 2026-11-14）
- `jvp` が `backward_create_graph` 側で拒否される条件: `supports_create_graph()` が偽の Op・rank 3 以上の `MatMul`・空でない子テープや同一の子テープ・デバイス不一致・checkpoint 登録済み（`AutodiffError::Backward` 等の既存 variant をそのまま伝播）

## Related

- [tape](./tape.md)
- [gradients](./gradients.md)
- [errors](./errors.md)
- [var](./var.md)

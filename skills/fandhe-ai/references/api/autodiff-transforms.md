---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Tape.html
---

# 高階微分・関数変換・gradcheck・hooks・custom function

`Tape` に生えた高階微分（`backward_create_graph` / `jacobian` / `hessian` / `vjp` / `hvp` / `jvp` / `jacfwd`）、関数変換 `vmap`、診断（`backward_detect_anomaly` / `gradcheck`）、拡張点（`custom` / `register_backward_hook` / `remove_hook`）と、関連型（`CreateGraphResult` / `CustomFunction` / `HookHandle` / `GradcheckOptions` / `GradcheckReport`）、`Var::checkpoint_from`。戻り値は特記なき限り `Result<_, AutodiffError>`。基本の `backward` は `tape.md` を参照。

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
| `vmap<'t, F>(&'t self, input: &Var<'t>, in_dim: usize, f: F) -> Result<Var<'t>, AutodiffError>` | メソッド | 軸 `in_dim` に沿って `f: FnMut(&Var<'t>) -> Result<Var<'t>, AutodiffError>` を各スライスへ適用し、結果を dim 0 に積む（ループ版）。単一入力、`out_dim` は無く出力のバッチ軸は dim 0 固定。空バッチは `InvalidArgument`、軸範囲外は `Shape(AxisOutOfRange)`。クロージャが `Err` なら、それまでに足したノードがテープに残る。`vmap(grad)` は契約外 |
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
| `CustomFunction` | `pub trait CustomFunction: Send + Sync + 'static` | `fn name(&self) -> &str`、`fn output_shape(&self, input_shapes: &[&[usize]]) -> Result<Vec<usize>, AutodiffError>`、`fn forward(&self, inputs: &[&Tensor<f32>]) -> Result<Tensor<f32>, AutodiffError>`、`fn backward(&self, inputs: &[&Tensor<f32>], out_value: &Tensor<f32>, upstream: &Tensor<f32>, requires_grad: &[bool]) -> Result<Vec<Option<Tensor<f32>>>, AutodiffError>`。`backward` の戻り値は `inputs` と同じ長さ・順序。`requires_grad[i] == true` の入力に `None` を返す、または `Some` の shape が入力と不一致だと fail-closed で `Err` |
| `HookHandle` | 不透明 struct（`Debug` のみ） | フィールド・アクセサなし。`Clone` / `Copy` なし |

## Notes

- `custom` の `forward` / `backward` は常に host 実行で `BackendOps` を経由せず、GPU 上に構築した `Tape` でも host 実行になる（性能は非保証）。バックエンド間数値一致（REQ-2）の判定対象外
- `CustomFunction::backward` は `backward_accumulate` 等で複数回呼ばれうるため、入力だけに依存する決定的・副作用なしの純関数・冪等にする。`'static` 境界により `Tape` / `Var` を捕捉できない（再入防止）
- hook は `Tape::reset` で全て消える
- 数値は REQ-2 の統一複合判定で、`vjp` / `hvp` / `jvp` / `jacfwd` は 1 階 VJP や `jacobian` との bit 同一は契約にしない。f32 の `Tape` のみ（`VarF64`・低精度 forward は対象外）
- `jvp` の `tangent` は `input` 側と、`vjp` の `cotangent` は `output` 側と照合する（向きが逆）
- `hvp` と `vjp` は追跡なしの扱いが非対称（`vjp` / `jvp` / `jacobian` は追跡なし `output` に全ゼロ、`hvp` は `Err`）
- `jvp` が `backward_create_graph` 側で拒否される条件: `supports_create_graph()` が偽の Op・rank 3 以上の `MatMul`・空でない子テープや同一の子テープ・デバイス不一致・checkpoint 登録済み（`AutodiffError::Backward` 等の既存 variant をそのまま伝播）

## Related

- [tape](./tape.md)
- [gradients](./gradients.md)
- [errors](./errors.md)
- [var](./var.md)

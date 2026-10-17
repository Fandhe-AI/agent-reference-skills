---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Var.html
---

# Var: elementwise / activation / comparison

`Var` の要素ごと演算（算術・数学関数・活性化・比較・非有限値処理・低精度 forward）のメソッド一覧。全て `&self` を取り `'t` ライフタイムの `Var` を返す（例外は下表の戻り値列を参照）。`Var` 本体・基本メソッドは `var.md`、縮約系は `var-reduction.md` を参照。

## Signature / Usage

```rust
let tape = fandhe_ai::tape();
let x = tape.var(&input_tensor);
let y = x.gelu()?.leaky_relu(0.01)?;
let mask = x.gt_bool(&threshold_var)?; // Tensor<bool>（tape 非記録）
let z = Var::where_cond(&mask, &y, &other)?; // where_cond は関連関数（cond, a, b）
```

## Options / Props

算術・遅延評価される elementwise 5 演算（`add` / `mul` / `relu` / `exp` / `tanh`）と即時評価の `sigmoid`:

| Name | Type | Description |
| --- | --- | --- |
| `add(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | ブロードキャスト付き加算。遅延評価（実体化境界まで計算を遅延） |
| `mul(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | ブロードキャスト付き乗算。遅延評価 |
| `relu(&self) -> Var<'t>` | メソッド | ReLU。構造的に失敗しない（`Result` を返さない） |
| `exp(&self) -> Var<'t>` | メソッド | 要素ごとの指数関数。`Result` を返さない |
| `tanh(&self) -> Var<'t>` | メソッド | 要素ごとの双曲線正接。`Result` を返さない |
| `sigmoid(&self) -> Var<'t>` | メソッド | `1 / (1 + exp(-x))`。融合対象外で常に実体化済み。`Result` を返さない |
| `sub(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | ブロードキャスト付き減算（eager） |
| `div(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | ブロードキャスト付き除算。IEEE 754 のまま（0 除算は `inf` / `NaN`、panic しない） |
| `pow(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | Var × Var の冪乗。`a < 0` かつ `b` 非整数の forward は `NaN` |
| `pow_scalar(&self, exponent: f32) -> Result<Var<'t>, AutodiffError>` | メソッド | スカラー指数の冪乗 |
| `neg(&self) -> Result<Var<'t>, AutodiffError>` | メソッド | 符号反転 |
| `abs(&self) -> Result<Var<'t>, AutodiffError>` | メソッド | 絶対値。`x == 0` の劣勾配は 0 |
| `sqrt(&self) -> Result<Var<'t>, AutodiffError>` | メソッド | 平方根。`x < 0` は `NaN`（panic しない） |
| `clamp(&self, min: f32, max: f32) -> Result<Var<'t>, AutodiffError>` | メソッド | 範囲制限。範囲内（境界含む）の勾配係数は 1、範囲外は 0。`min > max` は常に `max` を返す定数関数 |

対数・三角・双曲線関数:

| Name | Type | Description |
| --- | --- | --- |
| `log` / `log2` / `log10` | `(&self) -> Result<Var<'t>, AutodiffError>` | 自然対数・底 2・底 10。定義域外は IEEE のまま（`x == 0` は `-inf`、`x < 0` は `NaN`） |
| `sin` / `cos` / `tan` | `(&self) -> Result<Var<'t>, AutodiffError>` | 三角関数。`tan` は極でのマスクなし（`inf` / `NaN` が伝播しうる） |
| `atan` / `asin` / `acos` | `(&self) -> Result<Var<'t>, AutodiffError>` | 逆三角関数。`asin` / `acos` の定義域外は `NaN` |
| `sinh` / `cosh` / `asinh` / `acosh` / `atanh` | `(&self) -> Result<Var<'t>, AutodiffError>` | 双曲線関数・逆双曲線関数 |
| `atan2(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | `self` が y、`other` が x |

丸め・符号・特殊関数（`floor` / `ceil` / `round` / `sign` の勾配は恒等的に 0）:

| Name | Type | Description |
| --- | --- | --- |
| `floor` / `ceil` | `(&self) -> Result<Var<'t>, AutodiffError>` | 床・天井 |
| `round` | `(&self) -> Result<Var<'t>, AutodiffError>` | 偶数丸め（`2.5 -> 2`） |
| `sign` | `(&self) -> Result<Var<'t>, AutodiffError>` | 符号（`sign(±0) = 0`） |
| `reciprocal` | `(&self) -> Result<Var<'t>, AutodiffError>` | 逆数。`0` は `inf`（panic しない） |
| `rsqrt` | `(&self) -> Result<Var<'t>, AutodiffError>` | 逆平方根。負数は `NaN` |
| `erf` | `(&self) -> Result<Var<'t>, AutodiffError>` | 誤差関数 |

活性化関数:

| Name | Type | Description |
| --- | --- | --- |
| `gelu` / `gelu_tanh` | `(&self) -> Result<Var<'t>, AutodiffError>` | GELU（誤差関数版 / tanh 近似版） |
| `silu` / `hardswish` / `mish` / `selu` / `softsign` / `hardsigmoid` / `log_sigmoid` / `relu6` / `tanhshrink` | `(&self) -> Result<Var<'t>, AutodiffError>` | 引数なしの活性化 |
| `leaky_relu(&self, negative_slope: f32)` | `Result<Var<'t>, AutodiffError>` | `x >= 0` なら `x`、それ以外は `negative_slope * x`。`negative_slope` は検証せず伝播 |
| `elu(&self, alpha: f32)` | `Result<Var<'t>, AutodiffError>` | `x > 0` なら `x`、それ以外は `alpha * (exp(x) - 1)` |
| `celu(&self, alpha: f32)` | `Result<Var<'t>, AutodiffError>` | `alpha` はゼロでない有限値（負値も受理） |
| `softplus(&self, beta: f32, threshold: f32)` | `Result<Var<'t>, AutodiffError>` | `beta` は有限かつ `> 0`、`threshold` は有限。違反は `AutodiffError::InvalidArgument` |
| `hardtanh(&self, min: f32, max: f32)` | `Result<Var<'t>, AutodiffError>` | `[min, max]` クランプ。NaN または `min >= max` は `InvalidArgument` |
| `prelu(&self, weight: &Var<'t>)` | `Result<Var<'t>, AutodiffError>` | `weight` の rank・チャネル数不一致は `Shape`、要素数 0 は `InvalidArgument` |
| `glu(&self, dim: usize)` | `Result<Var<'t>, AutodiffError>` | 範囲外の軸は `Shape`、奇数長は `InvalidArgument`。負の軸番号は非対応 |
| `softmax(&self, dim: usize)` | `Result<Var<'t>, AutodiffError>` | `exp(x − max(x)) / Σexp(x − max(x))`。任意軸に対応し、`dim` 範囲外は `AxisOutOfRange`。`BackendOps::softmax`（最終軸専用の行カーネル）が `Unsupported` のときのみホスト参照実装へフォールバック |
| `log_softmax(&self, dim: usize)` | `Result<Var<'t>, AutodiffError>` | `x − m − ln(Σexp(x − m))`。`softmax` と同じ `dim` 検査・フォールバック規律 |
| `softmin(&self, dim: usize)` | `Result<Var<'t>, AutodiffError>` | Softmin |
| `threshold(&self, threshold: f32, value: f32)` | `Result<Var<'t>, AutodiffError>` | `torch.nn.functional.threshold` 相当 |
| `rrelu(&self, lower: f32, upper: f32, training: bool)` | `Result<Var<'t>, AutodiffError>` | RReLU |

比較（`f32` の `0.0` / `1.0` マスクを `Var` で返す版）と bool 出力版:

| Name | Type | Description |
| --- | --- | --- |
| `gt` / `ge` / `lt` / `le` / `eq` / `ne` | `(&self, other: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | ブロードキャスト付き比較。出力は f32 の `0.0` / `1.0`。VJP は両入力ともゼロ勾配。`NaN` を含む比較は `ne` のみ真 |
| `gt_bool` / `ge_bool` / `lt_bool` / `le_bool` / `eq_bool` / `ne_bool` | `(&self, other: &Var<'t>) -> Result<Tensor<bool>, AutodiffError>` | 厳密な `Tensor<bool>` を返す。非微分・tape 非記録。結果は `where_cond` / `masked_fill` の条件に渡せる |
| `Var::where_cond(cond: &Tensor<bool>, a: &Var<'t>, b: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | 関連関数 | 条件選択（`torch.where`、`#[doc(alias = "where")]`）。`a` / `b` / `cond` の 3 者をブロードキャスト。別 tape は `TapeMismatch`、ブロードキャスト不能は `Shape`。`a` / `b` の勾配は元の shape へ縮約される |
| `masked_select(&self, mask: &Tensor<bool>)` | `Result<Tensor<f32>, AutodiffError>` | row-major 順に選択し rank 1 の `Tensor<f32>` を返す。非微分（detached）。全て偽なら shape `[0]` |

非有限値:

| Name | Type | Description |
| --- | --- | --- |
| `isnan` / `isinf` / `isfinite` | `(&self) -> Result<Tensor<bool>, AutodiffError>` | 勾配を持たない bool テンソル |
| `nan_to_num(&self, nan: Option<f32>, posinf: Option<f32>, neginf: Option<f32>)` | `Result<Var<'t>, AutodiffError>` | NaN・±inf の置換 |

低精度 forward（opt-in。非対応バックエンドは型付きエラー `Unsupported` で拒否）:

| Name | Type | Description |
| --- | --- | --- |
| `add_low_precision(&self, other: &Var<'t>, dtype: ScalarDType)` | `Result<Var<'t>, AutodiffError>` | 加算の低精度 forward |
| `mul_low_precision(&self, other: &Var<'t>, dtype: ScalarDType)` | `Result<Var<'t>, AutodiffError>` | 乗算の低精度 forward |
| `matmul_low_precision(&self, other: &Var<'t>, dtype: ScalarDType)` | `Result<Var<'t>, AutodiffError>` | `matmul` の低精度 forward（`TypedOps<f16>` / `TypedOps<bf16>` 経由）。checkpoint / create_graph からは除外される（祖先に含まれると create_graph は無条件拒否、fail-closed） |
| `relu_low_precision` / `exp_low_precision` / `tanh_low_precision` | `(&self, dtype: ScalarDType) -> Result<Var<'t>, AutodiffError>` | 各演算の低精度 forward |

## Notes

- `scalar_unary` / `scalar_binary` 系（`sqrt` / `log` / `sub` / `gt` 等）は eager 実体化契約で `Result` を返す。`relu` / `exp` / `tanh` / `sigmoid` のみ構造的に失敗しないため `Var` を直接返す
- `add` / `mul` / `relu` / `exp` / `tanh` は連鎖長上限（fan-in 事前実体化・自己実体化）に達すると `Ok` が「バックエンド実行成功」まで意味を拡張する
- `hardtanh` / `relu6` の forward は `clamp` と bit 一致で境界勾配は 0。`mish` の softplus 閾値は 20、`glu` は負の軸番号非対応（PyTorch との差異）
- `rrelu_with_noise` は公開されない
- 他の線形代数・FFT・損失関数は `var-linalg.md` / `var-signal.md` / `var-losses.md` を参照

## Related

- [var](./var.md)
- [var-reduction](./var-reduction.md)
- [var-losses](./var-losses.md)
- [var-signal](./var-signal.md)

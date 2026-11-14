---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/struct.Var.html
---

# Var: conv / pool / norm / dropout / attention

`Var` のニューラルネット向け関数形メソッド（畳み込み・プーリング・正規化・dropout・embedding・attention・RNN セル・補間・重み再パラメータ化）と関連型（`GateParams` / `GlobalPoolMode` / `EmbeddingBagMode` / `InterpolateMode` / `SpectralNormState`）。層（`nn::Module`）のラッパーではなく、`Var` に直接生えた関数形 API。戻り値は特記なき限り `Result<Var<'t>, AutodiffError>`。

## Signature / Usage

```rust
let tape = fandhe_ai::tape();
let x = tape.var(&input);          // [N, Cin, H, W]
let w = tape.var(&weight);         // [Cout, Cin/groups, kH, kW]
let y = x.conv2d(&w, None, [1, 1], [1, 1], [1, 1], 1)?;
let (pooled, idx) = y.max_pool2d([2, 2], None, [0, 0], [1, 1], false)?;
let n = pooled.layer_norm(None, None, 1e-5)?;
```

## Options / Props

畳み込み（NCHW / NCDHW 固定。`stride` / `padding` / `dilation` / `groups` の 0 や `2·padding` オーバーフローは `InvalidArgument`）:

| Name | Type | Description |
| --- | --- | --- |
| `conv1d(&self, weight: &Var<'t>, bias: Option<&Var<'t>>, stride: usize, padding: usize, dilation: usize, groups: usize)` | メソッド | 入力 `[N, Cin, L]`。`conv2d` を reshape 併合で呼ぶ薄いラッパー |
| `conv2d(&self, weight: &Var<'t>, bias: Option<&Var<'t>>, stride: [usize; 2], padding: [usize; 2], dilation: [usize; 2], groups: usize)` | メソッド | `torch.nn.functional.conv2d`（cross-correlation）。入力 `[N, Cin, H, W]` |
| `conv3d(&self, weight: &Var<'t>, bias: Option<&Var<'t>>, stride: [usize; 3], padding: [usize; 3], dilation: [usize; 3], groups: usize)` | メソッド | 入力 `[N, Cin, D, H, W]`、`weight` は `[Cout, Cin/groups, kD, kH, kW]`、`bias` は `[Cout]` |
| `conv_transpose1d(&self, weight: &Var<'t>, bias: Option<&Var<'t>>, stride: usize, padding: usize, output_padding: usize, dilation: usize, groups: usize)` | メソッド | 入力 `[N, Cin, L]`、`weight` は `[Cin, Cout/groups, k]`、`bias` は `[Cout]` |
| `conv_transpose2d(&self, weight: &Var<'t>, bias: Option<&Var<'t>>, stride: [usize; 2], padding: [usize; 2], output_padding: [usize; 2], dilation: [usize; 2], groups: usize)` | メソッド | `output_padding[i] < stride[i]` を要求（違反は `InvalidArgument`） |
| `conv_transpose3d(&self, weight: &Var<'t>, bias: Option<&Var<'t>>, stride: [usize; 3], padding: [usize; 3], output_padding: [usize; 3], dilation: [usize; 3], groups: usize)` | メソッド | `output_padding >= stride` は拒否 |

プーリング（`max_pool*` は `(values, index)` を返す。`index` は `(n, c)` 平面内の flat 添字 `Tensor<i32>`）:

| Name | Type | Description |
| --- | --- | --- |
| `max_pool1d(&self, kernel_size: usize, stride: Option<usize>, padding: usize, dilation: usize, ceil_mode: bool) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | 入力 `[N, C, L]` |
| `max_pool2d(&self, kernel_size: [usize; 2], stride: Option<[usize; 2]>, padding: [usize; 2], dilation: [usize; 2], ceil_mode: bool) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | `ceil_mode = true` は v1 で未対応（`InvalidArgument`）。`padding <= kernel/2` 超過は拒否。`H·W <= i32::MAX` が必要 |
| `max_pool3d(&self, kernel_size: [usize; 3], stride: Option<[usize; 3]>, padding: [usize; 3], dilation: [usize; 3], ceil_mode: bool) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | `ceil_mode = true` は型付きエラー。索引は `max_unpool3d` にそのまま渡せる |
| `avg_pool1d(&self, kernel_size: usize, stride: Option<usize>, padding: usize, ceil_mode: bool, count_include_pad: bool)` | メソッド | 入力 `[N, C, L]` |
| `avg_pool2d(&self, kernel_size: [usize; 2], stride: Option<[usize; 2]>, padding: [usize; 2], ceil_mode: bool, count_include_pad: bool)` | メソッド | `ceil_mode = true` は未対応。`dilation` は `[1, 1]` 固定 |
| `avg_pool3d(&self, kernel_size: [usize; 3], stride: Option<[usize; 3]>, padding: [usize; 3], ceil_mode: bool, count_include_pad: bool)` | メソッド | `ceil_mode = true` は型付きエラー |
| `adaptive_avg_pool1d(&self, output_size: usize)` / `adaptive_avg_pool2d(&self, output_size: [usize; 2])` | メソッド | 入力 `[N, C, L]` / `[N, C, H, W]` |
| `adaptive_max_pool1d(&self, output_size: usize)` / `adaptive_max_pool2d(&self, output_size: [usize; 2])` | `Result<(Var<'t>, Tensor<i32>), AutodiffError>` | `(values, index)`。`output_size` の 0・空間軸ゼロ・`H·W > i32::MAX` は `Err` |
| `adaptive_avg_pool3d(&self, output_size: [usize; 3]) -> Result<Var<'t>, AutodiffError>` | メソッド | 3D 適応平均プーリング（NCDHW 固定）。入力 `[N, C, D, H, W]`、`output_size` は各軸 1 以上（入力より大きくてもよい）。軸ごとの窓は `start = floor(o·in/out)`・`end = ceil((o+1)·in/out)`（2D と同式）。rank 不一致・空間軸 0・`output_size` の 0 は `Err`（検査は tape 操作より前に完了） |
| `adaptive_max_pool3d(&self, output_size: [usize; 3]) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | 3D 適応最大プーリング。`(values, index)`。`index` は `(n, c)` 平面内 flat 添字 `d·H·W + h·W + w` で、`max_unpool3d` へそのまま渡せる。タイは先勝ち、NaN を含む窓は NaN を返し窓内で最初の NaN の索引を残す |
| `fractional_max_pool2d(&self, kernel_size: [usize; 2], output_size: [usize; 2]) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | 2D fractional max pooling（NCHW 固定）。`kernel_size`・`output_size` は `[H, W]` 順で各軸 1 以上。実行可能性は `output + kernel - 1 <= in`（各軸）。標本はグローバル RNG から検査通過後に `N·C·2` 個を一括で引く（`eval()` でも毎回引く）。決定的になるのは `manual_seed` の下だけで、PyTorch と同じシードでも同じ窓にはならない。`index` は `h·W + w`。タイは先勝ち、NaN を含む窓は最初の NaN の索引を残す（PyTorch は最後。索引型も int64 ではなく `i32`）。`output_ratio`・バッチなし入力は受け付けない |
| `fractional_max_pool3d(&self, kernel_size: [usize; 3], output_size: [usize; 3]) -> Result<(Var<'t>, Tensor<i32>), AutodiffError>` | メソッド | 3D 版（NCDHW 固定、`[D, H, W]` 順）。実行可能性は `output + kernel - 1 < input`（各軸。2D の `<=` と式が異なり PyTorch と同じ）。索引は `d·H·W + h·W + w`。乱数契約・NaN・エラー条件は 2D と同じ |
| `lp_pool1d(&self, norm_type: f32, kernel_size: usize, stride: Option<usize>, ceil_mode: bool) -> Result<Var<'t>, AutodiffError>` | メソッド | 1D LPPool（入力 `[N, C, L]`）。`(Σ_window x^p)^(1/p)`。負の入力と非整数 `norm_type` では NaN、全零窓の勾配は 0。`norm_type` は有限かつ `> 0`、`ceil_mode = true` は型付きエラー。`create_graph`（二階微分）には対応しない |
| `lp_pool2d(&self, norm_type: f32, kernel_size: [usize; 2], stride: Option<[usize; 2]>, ceil_mode: bool)` / `lp_pool3d(&self, norm_type: f32, kernel_size: [usize; 3], stride: Option<[usize; 3]>, ceil_mode: bool)` | メソッド | 2D（`[N, C, H, W]`）/ 3D（`[N, C, D, H, W]`）版。契約は `lp_pool1d` と同じ |
| `max_unpool1d(&self, indices: &Tensor<i32>, kernel_size: usize, stride: Option<usize>, padding: usize, output_size: Option<usize>)` | メソッド | 1D MaxUnpool |
| `max_unpool2d(&self, indices: &Tensor<i32>, kernel_size: [usize; 2], stride: Option<[usize; 2]>, padding: [usize; 2], output_size: Option<[usize; 2]>)` | メソッド | 2D MaxUnpool |
| `max_unpool3d(&self, indices: &Tensor<i32>, kernel_size: [usize; 3], stride: Option<[usize; 3]>, padding: [usize; 3], output_size: Option<[usize; 3]>)` | メソッド | 3D MaxUnpool |

正規化:

| Name | Type | Description |
| --- | --- | --- |
| `rms_norm(&self, weight: Option<&Var<'t>>, eps: f32)` | メソッド | 最終軸限定。`eps` は有限かつ非負（違反は `InvalidArgument`）。`weight` の shape は `[hidden]` と厳密一致 |
| `layer_norm(&self, weight: Option<&Var<'t>>, bias: Option<&Var<'t>>, eps: f32)` | メソッド | 最終軸限定の LayerNorm。分散は biased（÷N）。`weight` / `bias` は `[hidden]` |
| `batch_norm(&self, weight: Option<&Var<'t>>, bias: Option<&Var<'t>>, eps: f32)` | メソッド | BatchNorm1d / 2d / 3d 相当の train モード（rank 2〜5。rank 6 以上は `RankMismatch { expected: 5 }`。バッチ統計。チャネル軸は常に dim 1）。`batch_norm_with_batch_stats` の output のみを返す |
| `batch_norm_with_batch_stats(&self, weight: Option<&Var<'t>>, bias: Option<&Var<'t>>, eps: f32) -> Result<(Var<'t>, Tensor<f32>, Tensor<f32>), AutodiffError>` | メソッド | `(output, batch_mean, batch_var)`（biased ÷M）。`M = n*spatial` が 1 以下は `InvalidArgument` |
| `batch_norm_infer(&self, weight: Option<&Var<'t>>, bias: Option<&Var<'t>>, running_mean: &Tensor<f32>, running_var: &Tensor<f32>, eps: f32)` | メソッド | BatchNorm1d / 2d / 3d 相当の eval モード（rank 2〜5。固定統計）。`running_mean` / `running_var` は `[c]` |
| `local_response_norm(&self, size: usize, alpha: f32, beta: f32, k: f32)` | メソッド | 非有限パラメータは拒否 |
| `weight_norm(&self, g: &Var<'t>, dim: Option<usize>)` | メソッド | `w = g · v / ‖v‖`（`self` が `v`）。`g` の shape は `dim = Some(d)` なら `d` 軸以外が長さ 1 の keepdim 形、`dim = None` なら rank 0 の完全一致のみ受理。`norm_except_dim` は非公開のため初期 `g` は利用者が用意する |
| `spectral_norm(&self, state: &mut SpectralNormState, training: bool)` | メソッド | `self` が `weight`。`training = true` のときだけ `state` を更新（失敗時は状態不変）。勾配は `weight` のみ。乱数初期化なし、rank 1 は非対応 |

dropout / embedding / attention / 補間 / 並べ替え:

| Name | Type | Description |
| --- | --- | --- |
| `dropout(&self, p: f32, training: bool)` | メソッド | `p` は有限かつ `[0, 1]`（違反は `InvalidArgument`）。`training == false` または `p == 0.0` は `self` を返し RNG を消費しない。マスクはホスト側グローバル RNG で生成 |
| `dropout2d(&self, p: f32, training: bool)` | メソッド | `[N, C, H, W]`（rank 4 限定）のチャネル単位 dropout。残すチャネルは `1/(1-p)` 倍。rank 4 以外は `RankMismatch` |
| `alpha_dropout(&self, p: f32, training: bool)` | メソッド | SELU 系向け。drop 後も入力の平均・分散を保つアフィン補正。入力 rank は任意 |
| `embedding(&self, index: &Tensor<i32>, padding_idx: Option<usize>)` | メソッド | `self` が `[num_embeddings, embedding_dim]`。`index` は任意 rank（非追跡）。`padding_idx` 行の勾配はゼロで、`create_graph` の二階でも行 `p` は定数として扱われ Hessian の行と列 `p` は 0（PyTorch の double backward と同じ）。範囲外 id は `InvalidArgument` |
| `embedding_bag(&self, ids: &Tensor<i32>, mode: EmbeddingBagMode, padding_idx: Option<usize>)` | メソッド | `self` は `[num_embeddings, D]`、`ids` は `[B, L]`、戻り値は `[B, D]`。可変長 bag（offsets）は未公開 |
| `Var::scaled_dot_product_attention(query: &Var<'t>, key: &Var<'t>, value: &Var<'t>, attn_mask: Option<&Tensor<bool>>, is_causal: bool, scale: Option<f32>)` | 関連関数 | `query: [..., L, E]`、`key: [..., S, E]`、`value: [..., S, Ev]` から `[..., L, Ev]`。`attn_mask`（`true` = attend）と `is_causal` の同時指定は `InvalidArgument`。`scale` 既定は `1/sqrt(E)` |
| `interpolate(&self, size: &[usize], mode: InterpolateMode)` | メソッド | 末尾 `size.len()` 軸を `size` へリサンプリング。`scale_factor` 引数は持たない |
| `pixel_shuffle(&self, upscale_factor: usize)` | メソッド | `[*, C*r*r, H, W]` から `[*, C, H*r, W*r]`。rank 3 以上 |
| `pixel_unshuffle(&self, downscale_factor: usize)` | メソッド | `pixel_shuffle` の逆変換 |
| `channel_shuffle(&self, groups: usize)` | メソッド | `[N, C, *S]` のチャネル軸（dim 1 固定）を `groups` 個に分けて転置し、`out[:, j*g + i] = in[:, i*(C/g) + j]`（`g = groups`）を返す。出力 shape は入力と同じ。rank 3 以上・`groups >= 1`・C が `groups` で割り切れることが必要で、違反・オーバーフローは `Err`（tape を操作する前に検査）。`contiguous` / `reshape` / `permute` の合成で新規 `Op` は無い |
| `bilinear(&self, x2: &Var<'t>, weight: &Var<'t>, bias: Option<&Var<'t>>)` | メソッド | 双線形変換（`torch.nn.functional.bilinear(input1, input2, weight, bias)` 相当。`self` が `input1`）。`y[.., o] = Σ_{i,j} self[.., i] · weight[o, i, j] · x2[.., j] (+ bias[o])`。`self = [*, in1]`・`x2 = [*, in2]`（rank 2 以上・先頭の次元は完全一致）、`weight = [out, in1, in2]`、`bias = [out]`、出力 `[*, out]`。違反は `Err` |
| `cosine_similarity(&self, other: &Var<'t>, dim: usize, eps: f32)` | メソッド | コサイン類似度。`s = Σ_dim (x1 / max(‖x1‖, eps)) · (x2 / max(‖x2‖, eps))`。`eps` は各ノルムへ個別のクランプで、クランプは勾配に記録しない（straight-through。PyTorch と同じ）。NaN は伝播し、`eps = 0` のゼロベクトルは NaN。出力 shape は入力から `dim` を除いたもの。`self` と `other` は同 shape（broadcast しない）、`eps` は有限かつ 0 以上、`dim < rank`。PyTorch の既定値は `dim = 1`・`eps = 1e-8` で、Rust には既定引数が無いので明示する。`create_graph` は型付きエラー |
| `pairwise_distance(&self, other: &Var<'t>, p: f32, eps: f32, keepdim: bool)` | メソッド | ペアワイズ距離。`d = ‖self − x2 + eps‖_p`（最後の軸で縮約。`eps` は差へ先に足す。`triplet_margin_loss` と同じ規約）。`keepdim` が真なら最後の軸を長さ 1 で残す。同 shape（broadcast しない）、rank 1 以上、`p` は有限かつ 1 以上（`0`・`inf`・`(0, 1)` は拒否。PyTorch との差分）、`eps` は有限かつ 0 以上（PyTorch は無検査）。`±inf` 要素を含む行の距離は `inf`。PyTorch の既定値は `p = 2.0`・`eps = 1e-6`・`keepdim = false`。`create_graph` は型付きエラー |

RNN セル（`GateParams` は `PyTorch` のパラメータ順 `weight_ih, weight_hh, bias_ih, bias_hh`）:

| Name | Type | Description |
| --- | --- | --- |
| `rnn_cell(&self, h_prev: &Var<'t>, p: GateParams<'_, 't>)` | メソッド | `h_t = tanh(x·W_ih + b_ih + h_{t-1}·W_hh + b_hh)`。`x_t: [B, D]`、`h_prev: [B, H]`、`w_ih: [D, H]`、`w_hh: [H, H]`、bias は `[H]` |
| `lstm_cell(&self, h_prev: &Var<'t>, c_prev: &Var<'t>, p: GateParams<'_, 't>) -> Result<(Var<'t>, Var<'t>), AutodiffError>` | メソッド | ゲート順 `i, f, g, o`（`w_ih: [D, 4H]`、`w_hh: [H, 4H]`、bias `[4H]`）。戻り値は `(h_t, c_t)` |
| `gru_cell(&self, h_prev: &Var<'t>, p: GateParams<'_, 't>)` | メソッド | ゲート順 `r, z, n`（`w_ih: [D, 3H]`、`w_hh: [H, 3H]`、bias `[3H]`）。`reset_after=True` 規約 |

関連型:

| Name | Type | Description |
| --- | --- | --- |
| `GateParams<'a, 't>` | `struct { pub w_ih: &'a Var<'t>, pub w_hh: &'a Var<'t>, pub b_ih: Option<&'a Var<'t>>, pub b_hh: Option<&'a Var<'t>> }` | 3 種のセルに渡すゲートパラメータ。`b_ih` / `b_hh` は両方 `Some` か両方 `None`（片方のみは `InvalidArgument`）。`D == 0` / `H == 0` は拒否 |
| `GlobalPoolMode` | `#[non_exhaustive] enum { Avg, Max }` | 空間軸全体の平均 / 最大。`compat::Sequential::add_global_pool` の引数型。ルートから `fandhe_ai::GlobalPoolMode` で再エクスポート |
| `EmbeddingBagMode` | `#[non_exhaustive] enum { Sum, Mean, Max }` | bag 内の縮約。`Mean` は PyTorch 既定。`Max` の同値タイ勾配は先勝ちの決定的規約 |
| `InterpolateMode` | `#[non_exhaustive] enum { Nearest, NearestExact, Area, Bilinear { align_corners: bool }, Linear { align_corners: bool }, Trilinear { align_corners: bool }, Bicubic { align_corners: bool } }` | `Nearest` / `NearestExact` は算術を含まず 3 バックエンド間で bit 完全一致。`Bilinear` / `Bicubic` は空間軸ちょうど 2 軸、`Linear` は 1 軸、`Trilinear` は 3 軸、`Area` は任意軸（1..=rank）で `align_corners` を持たない |
| `SpectralNormState` | `#[non_exhaustive] struct`（フィールド非公開） | spectral_norm の非追跡状態（`u: [h]`、`v: [w]`）。`SpectralNormState::from_vectors(weight_shape: &[usize], dim: usize, u0: &[f32], v0: &[f32], n_power_iterations: usize, eps: f32) -> Result<Self, AutodiffError>` で構築。`n_power_iterations >= 1`、`eps` は有限かつ非負、`u0` / `v0` は有限で長さ一致 |

## Notes

- 検査は tape 操作より前に完了するため、`Err` のとき孤児ノードを残さない
- `max_pool2d` / `avg_pool2d` の `ceil_mode = true` は v1 では未対応
- `pixel_shuffle` / `dropout2d` / `alpha_dropout` / `embedding_bag` / `conv_transpose1d` / `conv3d` などは `nn` 側の層型と共有する forward への 1 行委譲。層型は `nn` カテゴリ（Module）を参照
- `max_pool*` / `adaptive_max_pool3d` / `fractional_max_pool*` が返す `index` は `max_unpool*` にそのまま渡せる。`compat::FunctionalBuilder` では `max_pool*_with_indices` / `max_unpool*`（`compat-functional.md`）が同じ役割を持つ
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/struct.Var.html（0.14.0, 取得日 2026-11-14。`adaptive_avg_pool3d` / `adaptive_max_pool3d` / `fractional_max_pool2d` / `fractional_max_pool3d` / `lp_pool1d` / `lp_pool2d` / `lp_pool3d` / `channel_shuffle` / `bilinear` / `cosine_similarity` / `pairwise_distance` の追加を確認）
- `scaled_dot_product_attention` の対象外: `dropout_p`、`enable_gqa`、attention weights の返却、f16 / bf16（既存カーネルの合成のみで実装され、新規 `Op` / `BackendOps` メソッドは追加されていない）

## Related

- [var](./var.md)
- [var-shape-indexing](./var-shape-indexing.md)
- [var-losses](./var-losses.md)

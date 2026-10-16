---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.QrVars.html
---

# Var: matmul / linear algebra

`Var` の行列積・einsum・テンソル積・行列操作・線形代数（逆行列 / solve / det / Cholesky / QR / SVD / eigh / slogdet / pinv / lstsq / 行列ノルム）のメソッド一覧と、多出力の戻り値型（`QrVars` / `SvdVars` / `EighVars` / `SlogdetVars`）、バックエンド側の `QrFactors` / `SvdFactors` / `MatrixNormOrd`。多出力はテープ上で出力ごとに別ノードとして記録される。

## Signature / Usage

```rust
let tape = fandhe_ai::tape();
let a = tape.var(&a_tensor);        // [m, n]
let b = tape.var(&b_tensor);        // [n, k]
let c = a.matmul(&b)?;              // 行列積
let qr = a.qr()?;                   // QrVars { q: [m, k], r: [k, n] }（k = min(m, n)）
let svd = a.svd()?;                 // SvdVars { u, s, vh }
let e = Var::einsum("ij,jk->ik", &[&a, &b])?;
```

## Options / Props

行列積・einsum・テンソル積（`Result<Var<'t>, AutodiffError>`）:

| Name | Type | Description |
| --- | --- | --- |
| `matmul(&self, other: &Var<'t>)` | メソッド | rank 2 以上。バッチ次元は NumPy 互換ブロードキャスト。rank 2 同士は `gemm`、rank 3 以上を含む場合は `gemm_batched`。常に実体化済みで返る |
| `Var::einsum(spec: &str, operands: &[&Var<'t>])` | 関連関数 | einsum 記法。添字は ASCII 英字のみ（空白は無視）、オペランドは 1〜2 個。ellipsis（`...`）・同一オペランド内の添字重複（対角 / trace）・出力添字の重複は `InvalidArgument`。`->` 省略時は入力に 1 回だけ現れる添字を ASCII 昇順で出力とみなす |
| `kron(&self, other: &Var<'t>)` | メソッド | クロネッカー積 |
| `tensordot(&self, other: &Var<'t>, n: usize)` | メソッド | 末尾 `n` 軸と先頭 `n` 軸を縮約 |
| `tensordot_axes(&self, other: &Var<'t>, dims_self: &[usize], dims_other: &[usize])` | メソッド | 軸指定の縮約 |
| `cdist(&self, other: &Var<'t>, p: f32)` | メソッド | p ノルムの総当たり距離 |
| `cross(&self, other: &Var<'t>, dim: usize)` | メソッド | 3 次元ベクトルの外積 |

行列操作:

| Name | Type | Description |
| --- | --- | --- |
| `tril(&self, diagonal: isize)` / `triu(&self, diagonal: isize)` | メソッド | 下三角 / 上三角以外を 0 にする。rank 2 以上のみ、不適合は `AutodiffError::Shape` |
| `diag(&self, diagonal: isize)` | メソッド | 2-D から対角を抽出、または 1-D から対角行列を構築。rank 3 以上は `InvalidArgument` |
| `trace(&self)` | メソッド | 2-D の対角和。rank 2 以外は `Shape` |
| `outer(&self, other: &Var<'t>)` | メソッド | 1-D 同士の外積。rank 1 以外は `Shape` |
| `dot(&self, other: &Var<'t>)` | メソッド | 1-D 同士の内積。rank 1 以外・長さ不一致は `Shape` |

線形代数:

| Name | Type | Description |
| --- | --- | --- |
| `inv(&self) -> Result<Var<'t>, AutodiffError>` | メソッド | `A^{-1}`（`[n, n]`）。正方でなければ拒否。バックエンドが `Unsupported` のときのみホスト参照実装へフォールバック |
| `solve(&self, b: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | メソッド | `A X = B`（`self: [n, n]`、`b: [n, k]` から `[n, k]`）。`b` の行数が `n` と不一致なら `InvalidArgument` |
| `det(&self) -> Result<Var<'t>, AutodiffError>` | メソッド | 行列式（スカラー `[]`）。特異行列は forward で `0.0`（エラーにしない） |
| `cholesky(&self) -> Result<Var<'t>, AutodiffError>` | メソッド | 下三角 `L`（`A = L Lᵀ`）。`A` は対称正定値（下三角のみ読む）。非正定値は `AutodiffError::InvalidArgument` |
| `qr(&self) -> Result<QrVars<'t>, AutodiffError>` | メソッド | reduced QR（`A: [m, n]`）。rank 2 以外は `RankMismatch` |
| `svd(&self) -> Result<SvdVars<'t>, AutodiffError>` | メソッド | reduced SVD。反復が収束しない場合は `InvalidArgument` |
| `eigh(&self) -> Result<EighVars<'t>, AutodiffError>` | メソッド | 対称行列の固有分解（`[n, n]`）。固有値は昇順。非正方・非有限入力は拒否 |
| `slogdet(&self) -> Result<SlogdetVars<'t>, AutodiffError>` | メソッド | 符号と対数絶対行列式。特異行列は `(0, -inf)` |
| `pinv(&self, rcond: Option<f32>) -> Result<Var<'t>, AutodiffError>` | メソッド | Moore-Penrose 擬似逆行列（`[m, n]` から `[n, m]`）。`rcond` が負・非有限なら拒否 |
| `matrix_rank(&self, rcond: Option<f32>) -> Result<Var<'t>, AutodiffError>` | メソッド | 階数を f32 のスカラー（形状 `[]`）で返す。勾配ゼロ |
| `lstsq(&self, b: &Var<'t>, rcond: Option<f32>) -> Result<Var<'t>, AutodiffError>` | メソッド | 最小二乗解のみを返す（`A: [m, n]`、`b: [m, k]` から `[n, k]`） |
| `matrix_norm(&self, ord: MatrixNormOrd) -> Result<Var<'t>, AutodiffError>` | メソッド | 行列ノルム（`A: [m, n]` からスカラー `[]`）。rank 2 以外は `RankMismatch` |

戻り値型・enum:

| Name | Type | Description |
| --- | --- | --- |
| `QrVars<'t>` | `struct { q: Var<'t>, r: Var<'t> }`（`Debug, Clone, Copy`） | `q`: `[m, k]`（列直交）、`r`: `[k, n]`（上三角・対角非負） |
| `SvdVars<'t>` | `struct { u: Var<'t>, s: Var<'t>, vh: Var<'t> }`（`Debug, Clone, Copy`） | `u`: `[m, k]`、`s`: `[k]`（降順・非負）、`vh`: `[k, n]`（行直交。`V^T`） |
| `EighVars<'t>` | `struct { eigenvalues: Var<'t>, eigenvectors: Var<'t> }`（`Debug, Clone`） | `eigenvalues`: `[n]`（昇順・同値は安定順）、`eigenvectors`: `[n, n]`（列が固有ベクトル） |
| `SlogdetVars<'t>` | `struct { sign: Var<'t>, logabsdet: Var<'t> }`（`Debug, Clone`） | `sign`: `[]`（`-1.0` / `0.0` / `1.0`）、`logabsdet`: `[]`（特異なら `-inf`） |
| `QrFactors` | `struct { q: Tensor<f32>, r: Tensor<f32> }` | バックエンド（`BackendOps::linalg_qr`）側の戻り値。形状は `QrVars` と同じ |
| `SvdFactors` | `struct { u: Tensor<f32>, s: Tensor<f32>, vh: Tensor<f32> }` | バックエンド（`BackendOps::linalg_svd`）側の戻り値。`s` は降順 |
| `MatrixNormOrd` | `#[non_exhaustive] enum { Fro, One, Inf, Nuc, Spectral }` | `Fro`: Frobenius ノルム、`One`: 最大絶対列和、`Inf`: 最大絶対行和、`Nuc`: 核ノルム（特異値の総和）、`Spectral`: スペクトルノルム（最大特異値） |

## Notes

- `inv` / `solve` / `det` / `cholesky` / `qr` / `svd` / `matrix_norm` は、バックエンドが `BackendError::Unsupported` を返したときのみホスト参照実装（`eval::linalg`）へフォールバックし、それ以外のエラーは伝播する
- `trace` / `diag` は rank 2 まで（rank 3 以上は PyTorch と異なり非対応）。`matrix_rank` は f32 出力で勾配ゼロ、`lstsq` は解のみを返す。`rcond` は tolerance ではなく特異値の打ち切り比
- `eigh` / `slogdet` / `pinv` / `matrix_rank` / `lstsq` の非有限入力は `InvalidArgument`（PyTorch と異なる）
- `einsum` の既知の制約: create_graph 下（高階微分）の rank 3 以上の `MatMul` は `AutodiffError::Backward` を返す。size-1 broadcast なし。縮約を伴う場合は `matmul` をそのまま呼ぶため CUDA TF32 opt-in の挙動は `matmul` と同一
- バックエンド固有の GEMM チェックサム付き実行 `matmul_checksum` は `backend-tuning.md` を参照

## Related

- [var](./var.md)
- [var-elementwise](./var-elementwise.md)
- [backend-tuning](./backend-tuning.md)

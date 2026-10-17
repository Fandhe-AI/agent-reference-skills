---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Var.html
---

# Var: shape / view / indexing

`Var` の形状変換・view・連結分割・パディング・インデックス読み出し／更新（gather / scatter / `index_*` / `masked_*`）のメソッド一覧と、関連 enum（`PadMode` / `ScatterReduceMode` / `MeshgridIndexing`）。全メソッドの戻り値は特記なき限り `Result<Var<'t>, AutodiffError>`。

## Signature / Usage

```rust
let tape = fandhe_ai::tape();
let x = tape.var(&input_tensor);                 // shape [2, 3, 4]
let y = x.permute(&[0, 2, 1])?;                  // zero-copy view
let z = Var::cat(&[x, x], 0)?;                   // 関連関数（self を取らない）
let parts = z.chunk(2, 0)?;                      // Vec<Var<'t>>
let picked = x.index_select(1, &index_tensor)?;  // index: &Tensor<i32>（rank 1）
```

## Options / Props

形状・view（`reshape` / `transpose` / `permute` / `squeeze` / `unsqueeze` / `flatten` は view 系ノードで forward のたびにバッファ確保しない）:

| Name | Type | Description |
| --- | --- | --- |
| `reshape(&self, shape: &[usize])` | メソッド | 形状変更。要素数オーバーフローは `ShapeError::ElementCountOverflow`。非 contiguous な入力（`permute` / `transpose` / `broadcast_to` 直後）は `ShapeError::NonContiguousReshape` |
| `transpose(&self, dim0: usize, dim1: usize)` | メソッド | 2 軸の入れ替え。軸範囲外は `ShapeError::AxisOutOfRange` |
| `permute(&self, perm: &[usize])` | メソッド | 軸の並べ替え。`perm.len() != rank` は `ShapeError::RankMismatch` |
| `swapaxes(&self, axis0: usize, axis1: usize)` | メソッド | 2 軸の入れ替え（`torch.swapaxes`） |
| `movedim(&self, source: &[usize], destination: &[usize])` | メソッド | 軸の移動 |
| `squeeze(&self, dim: Option<usize>)` | メソッド | `None` は長さ 1 の軸を全て除去、`Some(d)` は軸 `d` のみ |
| `unsqueeze(&self, dim: usize)` | メソッド | 長さ 1 の軸を挿入。`dim > rank` は `AxisOutOfRange` |
| `flatten(&self, start_dim: usize, end_dim: usize)` | メソッド | `start_dim..=end_dim` を 1 軸に平坦化 |
| `unflatten(&self, dim: usize, sizes: &[usize])` | メソッド | `sizes` が空、`dim >= rank`、`sizes` の積が `shape[dim]` と不一致は `Err` |
| `broadcast_to(&self, shape: &[usize])` | メソッド | ブロードキャスト。VJP は勾配バッファ確保を伴う |
| `expand(&self, shape: &[usize])` | メソッド | `broadcast_to` への委譲。負値（-1）は `&[usize]` で表現できず非対応 |
| `narrow(&self, dim: usize, start: usize, len: usize)` | メソッド | 部分範囲。`start + len > shape[dim]` は `ShapeError::NarrowOutOfBounds` |
| `rot90(&self, k: isize, dims: [usize; 2])` | メソッド | 90 度回転 |
| `flip(&self, dims: &[usize])` | メソッド | 軸反転。範囲外・重複は `AutodiffError::Shape`、`dims` が空なら恒等 |
| `roll(&self, shifts: &[isize], dims: &[usize])` | メソッド | 循環シフト。長さ不一致は `InvalidArgument`。`dims=None` 形は非対応 |
| `repeat(&self, repeats: &[usize])` | メソッド | `repeats.len()` が rank 未満なら `InvalidArgument`。巨大確保は確保前に拒否 |
| `tile(&self, reps: &[usize])` | メソッド | `reps` が rank 未満なら先頭を 1 で埋める |
| `Var::meshgrid(tensors: &[Var<'t>], indexing: MeshgridIndexing) -> Result<Vec<Var<'t>>, AutodiffError>` | 関連関数 | 1 次元テンソル列から座標格子を作る |

連結・分割:

| Name | Type | Description |
| --- | --- | --- |
| `Var::cat(vars: &[Var<'t>], dim: usize)` | 関連関数 | 連結。`vars` が空は `InvalidArgument` |
| `Var::stack(vars: &[Var<'t>], dim: usize)` | 関連関数 | 新しい軸で積む。`vars` が空は `InvalidArgument`。非 contiguous 要素は `NonContiguousReshape` |
| `split(&self, split_size: usize, dim: usize) -> Result<Vec<Var<'t>>, AutodiffError>` | メソッド | `split_size` ごとに分割。`split_size == 0` は拒否 |
| `split_with_sizes(&self, sizes: &[usize], dim: usize) -> Result<Vec<Var<'t>>, AutodiffError>` | メソッド | `sizes` の合計が `shape[dim]` と不一致なら `ShapeError::ShapeMismatch` |
| `chunk(&self, chunks: usize, dim: usize) -> Result<Vec<Var<'t>>, AutodiffError>` | メソッド | `chunks == 0` は `InvalidArgument` |
| `unbind(&self, dim: usize) -> Result<Vec<Var<'t>>, AutodiffError>` | メソッド | 指定軸で分解 |
| `tensor_split(&self, sections: usize, dim: usize) -> Result<Vec<Var<'t>>, AutodiffError>` | メソッド | `sections` 個へ分割 |
| `tensor_split_indices(&self, indices: &[usize], dim: usize) -> Result<Vec<Var<'t>>, AutodiffError>` | メソッド | 境界索引で分割 |

パディング・窓展開:

| Name | Type | Description |
| --- | --- | --- |
| `pad(&self, pads: &[(usize, usize)], value: f32)` | メソッド | 定数パディング（軸ごとの `(before, after)`）。常に実体化済み |
| `pad_with_mode(&self, pads: &[(usize, usize)], mode: PadMode)` | メソッド | モード指定パディング |
| `unfold(&self, kernel_size: [usize; 2], stride: [usize; 2], padding: [usize; 2], dilation: [usize; 2])` | メソッド | `[N, C, H, W]` を `[N, C·kH·kW, L]` へ展開。引数順は `kernel_size, stride, padding, dilation`（PyTorch の `dilation, padding, stride` 順ではない）。バッチなし入力は非対応 |
| `fold(&self, output_size: [usize; 2], kernel_size: [usize; 2], stride: [usize; 2], padding: [usize; 2], dilation: [usize; 2])` | メソッド | `[N, C·kH·kW, L]` を `[N, C, H, W]` に戻す。重なる窓は加算。`output_size` が先頭引数 |

インデックス読み出し（`index` は非追跡の `&Tensor<i32>`。勾配は `index` 側に流れない）:

| Name | Type | Description |
| --- | --- | --- |
| `gather(&self, dim: usize, index: &Tensor<i32>)` | メソッド | `torch.gather` 相当 |
| `index_select(&self, dim: usize, index: &Tensor<i32>)` | メソッド | `index` は rank 1 必須（違反は `ShapeError::RankMismatch`） |
| `advanced_indexing(&self, indices: &[Tensor<i32>])` | メソッド | 先頭 `indices.len()` 軸を整数配列で読み出す（`x[i0, i1, …]`）。範囲外・負の添字は `InvalidArgument` |
| `masked_fill(&self, mask: &Tensor<bool>, value: f32)` | メソッド | `mask` が真の位置を定数で置換。`self` を書き換えず新しい `Var` を返す。`mask` は `self` の shape へ broadcast 可能であること |
| `one_hot(&self, num_classes: usize)` | メソッド | `self` が f32 で保持するクラス id を展開。出力 shape は `self.shape() ++ [num_classes]`。非微分（ゼロ勾配）。`num_classes == 0` や非整数・範囲外値は `InvalidArgument` |

インデックス更新（非破壊。新しい `Var` を返す）:

| Name | Type | Description |
| --- | --- | --- |
| `scatter(&self, dim: usize, index: &Tensor<i32>, src: &Var<'t>)` | メソッド | 上書き（`torch.scatter`） |
| `scatter_add(&self, dim: usize, index: &Tensor<i32>, src: &Var<'t>)` | メソッド | `index` が指す位置へ `src` を加算 |
| `scatter_reduce(&self, dim: usize, index: &Tensor<i32>, src: &Var<'t>, reduce: ScatterReduceMode, include_self: bool)` | メソッド | 縮約付き scatter |
| `index_add(&self, dim: usize, index: &Tensor<i32>, source: &Var<'t>)` | メソッド | 索引加算（`alpha` は持たない） |
| `index_copy(&self, dim: usize, index: &Tensor<i32>, source: &Var<'t>)` | メソッド | 索引コピー |
| `masked_scatter(&self, mask: &Tensor<bool>, source: &Var<'t>)` | メソッド | マスク位置へ `source` を順に書き込む |
| `index_put(&self, indices: &[Tensor<i32>], values: &Var<'t>, accumulate: bool)` | メソッド | `accumulate = true` は重複添字を加算、`false` は最後の書き手が勝つ。別 tape の `values` は `TapeMismatch`、broadcast 不能は `Shape` |
| `index_put_(&mut self, indices: &[Tensor<i32>], values: &Var<'t>, accumulate: bool) -> Result<(), AutodiffError>` | メソッド | `index_put` の結果で `self` を再束縛する糖衣。`Var` は `Copy` なハンドルで tape ノードを書き換えないため、同じノードを指す他のコピーは古い値のまま残る |

関連 enum:

| Name | Type | Description |
| --- | --- | --- |
| `PadMode` | `#[non_exhaustive] enum { Reflect, Replicate, Circular }` | `Reflect`: 端要素を折り返す（`before < len` かつ `after < len` が必要）。`Replicate`: 端要素を繰り返す（軸長 1 以上）。`Circular`: 反対側から巻き込む（`before <= len` かつ `after <= len` が必要） |
| `ScatterReduceMode` | `#[non_exhaustive] enum { Sum, Prod, Mean, Amax, Amin }` | `scatter_reduce` の縮約種別 |
| `MeshgridIndexing` | `#[non_exhaustive] enum { Ij, Xy }` | `Ij`（既定。行列添字）/ `Xy`（直交座標。入力 2 本以上で先頭 2 軸を入れ替える） |

## Notes

- `Var` は `Copy` なハンドル。`reshape` 等は `self` を書き換えず新しい `Var` を返す
- 軸検査・shape 検査は tape 操作より前に完了するため、エラー時に孤児ノードを残さない
- 上記の多くは `Var` に対する inherent メソッドで、ルート `fandhe_ai` から `PadMode` / `ScatterReduceMode` / `MeshgridIndexing` が再エクスポートされている

## Related

- [var](./var.md)
- [var-reduction](./var-reduction.md)
- [var-nn-ops](./var-nn-ops.md)

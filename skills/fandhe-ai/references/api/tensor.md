---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/struct.Tensor.html
---

# Tensor

`fandhe-ai` の中核データ構造。多次元配列を表し、`Arc` による共有ストレージでゼロコピーの view 系操作（transpose / narrow / reshape の contiguous ケース）を実現する。row-major レイアウトで、ブロードキャスト用の stride 0 表現に対応するため stride は `isize`。`clone()` は `Arc` ポインタの複製のみでデータコピーは発生しない。`PartialEq` は意図的に derive していない（等価な view で偽陰性になるのを避けるため）。

## Signature / Usage

```rust
let tensor = Tensor::new(vec![1.0_f32, 2.0, 3.0, 4.0], &[2, 2])?;
let transposed = tensor.transpose(0, 1)?;
let sliced = transposed.narrow(0, 0, 1)?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `new(data: Vec<T>, shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | コンストラクタ | 実行時に shape を検証して構築 |
| `from_slice(data: &[T], shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | コンストラクタ | 構築時にデータをコピー |
| `zeros(shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | コンストラクタ | 全要素 `T::zero()` |
| `ones(shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | コンストラクタ | 全要素 `T::one()` |
| `full(shape: &[usize], value: T) -> Result<Tensor<T>, ShapeError>` | コンストラクタ | 指定値で埋める |
| `scalar(value: T) -> Tensor<T>` | コンストラクタ | rank-0 の infallible コンストラクタ |
| `shape(&self) -> &[usize]` | メソッド | 次元を返す |
| `strides(&self) -> &[isize]` | メソッド | 軸ごとの要素インデックス増分 |
| `offset(&self) -> usize` | メソッド | ストレージの開始オフセット |
| `rank(&self) -> usize` | メソッド | 次元数 |
| `numel(&self) -> usize` | メソッド | 総要素数 |
| `is_empty(&self) -> bool` | メソッド | 要素数 0 かどうか |
| `is_contiguous(&self) -> bool` | メソッド | row-major の連続性を検証 |
| `get(&self, index: &[usize]) -> Option<T>` | メソッド | 多次元インデックスアクセス |
| `as_slice(&self) -> Option<&[T]>` | メソッド | ストレージへのアクセス（contiguous な場合のみ） |
| `transpose(&self, dim0: usize, dim1: usize) -> Result<Tensor<T>, ShapeError>` | メソッド | 2 軸を入れ替える（ゼロコピー view） |
| `transpose_2d(&self) -> Result<Tensor<T>, ShapeError>` | メソッド | rank-2 特化版 |
| `permute(&self, perm: &[usize]) -> Result<Tensor<T>, ShapeError>` | メソッド | N 次元の軸並べ替え |
| `narrow(&self, dim: usize, start: usize, len: usize) -> Result<Tensor<T>, ShapeError>` | メソッド | 軸に沿ったスライス |
| `reshape(&self, shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | メソッド | 形状再解釈（contiguous のみ） |
| `broadcast_to(&self, shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | メソッド | NumPy 風のブロードキャスト拡張（stride 0 view） |
| `broadcast_with(&self, other: &Tensor<T>) -> Result<(Tensor<T>, Tensor<T>), ShapeError>` | メソッド | 二項演算のための形状整合 |
| `contiguous(&self) -> Tensor<T>` | メソッド | 非 contiguous ならコピーを返し、既に contiguous なら安価な clone |

## Notes

- `Send`, `Sync`, `Unpin`, `UnwindSafe` を自動実装
- `unwrap()` / `panic!()` を避け `Result` で明示的にエラーハンドリングする方針（fail-closed）

## Related

- `Var`
- `Device`

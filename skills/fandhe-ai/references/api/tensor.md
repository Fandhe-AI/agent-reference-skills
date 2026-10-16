---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/struct.Tensor.html
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
| `as_slice(&self) -> Option<&[T]>` | メソッド | ストレージへのアクセス（contiguous な場合のみ）。要素数 0 なら `Some(&[])` |
| `host_slice(&self) -> Cow<'_, [T]>` | メソッド | ホスト可視の値を借用で読み出す。contiguous なら `Cow::Borrowed`（コピーなし）、非 contiguous（`transpose` / `narrow` 後の view）なら `contiguous()` で 1 回だけ実体化して `Cow::Owned` を返す |
| `as_view_slice(&self) -> Option<&[T]>` | メソッド | 非 contiguous な view でも、全 strides が非負なら `[offset, offset + span)`（`span = 1 + Σ (shape_i − 1)·stride_i`）を借用で返す。返るスライス自体は論理形状を表さない（GPU バッファへの受け渡し用）。負の stride を含む、または span が storage 範囲を超える場合は `None` |
| `transpose(&self, dim0: usize, dim1: usize) -> Result<Tensor<T>, ShapeError>` | メソッド | 2 軸を入れ替える（ゼロコピー view） |
| `transpose_2d(&self) -> Result<Tensor<T>, ShapeError>` | メソッド | rank-2 特化版 |
| `permute(&self, perm: &[usize]) -> Result<Tensor<T>, ShapeError>` | メソッド | N 次元の軸並べ替え |
| `narrow(&self, dim: usize, start: usize, len: usize) -> Result<Tensor<T>, ShapeError>` | メソッド | 軸に沿ったスライス |
| `reshape(&self, shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | メソッド | 形状再解釈（contiguous のみ） |
| `broadcast_to(&self, shape: &[usize]) -> Result<Tensor<T>, ShapeError>` | メソッド | NumPy 風のブロードキャスト拡張（stride 0 view） |
| `broadcast_with(&self, other: &Tensor<T>) -> Result<(Tensor<T>, Tensor<T>), ShapeError>` | メソッド | 二項演算のための形状整合 |
| `contiguous(&self) -> Tensor<T>` | メソッド | 非 contiguous ならコピーを返し、既に contiguous なら安価な clone |
| `cast<T: CastElement>(&self) -> Result<Tensor<T>, ShapeError>` | メソッド（`Tensor<f32>` 限定） | `Tensor<T>` へ dtype 変換する。`T = f32` でも detached なコピーを返す。勾配を保つ恒等射が必要なら `Var::to_f32` を使う（`dtype.md` 参照） |
| `to_f32(&self) -> Result<Tensor<f32>, ShapeError>` | メソッド（`T: CastElement`） | `Tensor<f32>` へ変換する。`T = f32` の場合は恒等コピー |

### トレイト経由のメソッド

次のメソッドは inherent ではなくトレイト実装。dataset / inference の内部で使われ、通常は直接呼ばない。

| Name | Type | Description |
| --- | --- | --- |
| `concat_batches(parts: Vec<Self>) -> Result<Self, DataError>` | トレイト `ConcatBatch` | バッチ連結（DataLoader 系） |
| `stack_samples(samples: Vec<Self>) -> Result<Self::Batch, DataError>` | トレイト `StackSamples` | サンプルのスタック（DataLoader 系） |
| `inference_input(&self) -> &Tensor<f32>` | 封印トレイト `PredictBatchInput` | `Sequential::predict_batches` が `DataLoader` のバッチ型から推論入力（`Tensor<f32>`、ラベルは無視）を取り出す。利用者が実装・呼び出しする必要はない |

## Notes

- `Debug` は手書き実装（`tensor_fmt.rs`）で、構造情報に加え打ち切り付きの値プレビューを出力する（PyTorch の `print(t)` 相当）。`numel() > FMT_MAX_ELEMS` のとき長い軸を先頭・末尾のみに省略し、総出力要素数にも上限がある。`Display` も同モジュールで実装される

- `Send`, `Sync`, `Unpin`, `UnwindSafe` を自動実装
- `unwrap()` / `panic!()` を避け `Result` で明示的にエラーハンドリングする方針（fail-closed）

## Related

- [var](./var.md)
- [device](./device.md)

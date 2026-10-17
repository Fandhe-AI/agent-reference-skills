---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/data/trait.Dataset.html
---

# Dataset / TensorDataset / Subset / ConcatDataset / random_split / collate

map-style データセットの trait `Dataset`（`len()` と添字列 → バッチの `batch()`）と、その実装 `TensorDataset`・合成型 `Subset` / `ConcatDataset`・分割関数 `random_split` / `random_split_fractions`・collate 系（`default_collate` / `CollateFn` / `TransformFn`）・エラー型 `DataError`。PyTorch `torch.utils.data` 相当。`fandhe_ai::data` は `fandhe_ai_tensor_core::data` の純再エクスポートで、ホスト側だけで完結し `Op` / `BackendOps` / VJP を経由しない。

## Signature / Usage

```rust
pub trait Dataset {
    type Batch;
    fn len(&self) -> usize;
    fn is_empty(&self) -> bool { self.len() == 0 }
    fn validate(&self) -> Result<(), DataError> { Ok(()) }
    fn batch(&self, indices: &[usize]) -> Result<Self::Batch, DataError>;
}

pub struct TensorDataset<T: Element> { /* private */ }
impl<T: Element> TensorDataset<T> {
    pub fn new(tensor: Tensor<T>) -> Result<Self, DataError>;
    pub fn tensor(&self) -> &Tensor<T>;
    pub fn get(&self, index: usize) -> Result<Tensor<T>, DataError>;
}
```

```rust
use fandhe_ai::Tensor;
use fandhe_ai::data::{Dataset, TensorDataset, random_split};

let features = Tensor::new(vec![0.0f32, 1.0, 2.0, 3.0], &[4, 1]).unwrap();
let dataset = TensorDataset::new(features).unwrap();
let parts = random_split(dataset, &[3, 1]).unwrap();
assert_eq!((parts[0].len(), parts[1].len()), (3, 1));
```

## Options / Props

### Dataset 実装

| Name | Type | Description |
| --- | --- | --- |
| `TensorDataset<T>` | struct | 先頭軸をサンプル軸とみなす単一テンソルのデータセット。`Batch = Tensor<T>`。rank 0 は `DataError::ScalarTensor` |
| `TensorDataset::get(index)` | method | `index` 番目のサンプル 1 件を `shape[1..]` で返す（`__getitem__` 相当）。範囲外は `IndexOutOfRange` |
| `(A, B)` / `(A, B, C)` | tuple impl | 異種 dtype・複数列。同一の添字列を全成分に適用するためシャッフル順が成分間で一致する。`len()` は先頭成分。`validate()` が成分間の長さ不一致を `LengthMismatch` で拒否 |
| `Subset<D>` | struct | 元データセットの添字部分集合。`new(dataset, indices)` / `from_shared(Arc<D>, indices)` / `dataset()` / `indices()`。重複・空は許容、範囲外添字は構築時に拒否 |
| `ConcatDataset<D>` | struct | 同型データセットの先頭軸連結。`new(Vec<D>)` / `datasets()` / `cumulative_sizes()` / `into_datasets()`。`D::Batch: ConcatBatch` が必要 |
| `ConcatBatch` | trait | `fn concat_batches(parts: Vec<Self>) -> Result<Self, DataError>`。実装は `Tensor<T>` と 2 / 3 要素タプルのみ |

### 分割・collate

| Name | Type | Description |
| --- | --- | --- |
| `random_split(dataset, lengths: &[usize])` | `Result<Vec<Subset<D>>, DataError>` | 長さ列の合計が `dataset.len()` と一致する必要がある（不一致は `SplitLengthMismatch`） |
| `random_split_fractions(dataset, fractions: &[f64])` | `Result<Vec<Subset<D>>, DataError>` | 割合列（合計 1）で分割。各長さは `floor(n * frac)` に余りを先頭から round-robin で 1 ずつ配分。合計は Neumaier 補償和で `isclose(sum, 1)`（rel_tol=1e-9）かつ `sum <= 1` を要求 |
| `default_collate(samples: &[Tensor<T>])` | `Result<Tensor<T>, DataError>` | サンプル列を先頭軸へ積み `[k, sample_shape..]` にする。空は `EmptyBatch`、shape 不一致は `SampleShapeMismatch` |
| `TransformFn<T>` | type alias | `Box<dyn Fn(Tensor<T>) -> Result<Tensor<T>, DataError> + Send + Sync>` |
| `CollateFn<T>` | type alias | `Box<dyn Fn(&[Tensor<T>]) -> Result<Tensor<T>, DataError> + Send + Sync>` |
| `StackSamples` | trait | iterable 側の積み上げ trait（`iterable-prefetch.md` 参照） |

### DataError（`#[non_exhaustive]`、`Debug + Clone + PartialEq + Eq`、`From<ShapeError>` / `From<RngError>`）

| Variant | Description |
| --- | --- |
| `ZeroBatchSize` | `batch_size` がゼロ |
| `ScalarTensor` | `TensorDataset::new` に rank 0 のテンソル |
| `LengthMismatch { expected, found, component }` | タプルデータセットの成分長が不一致 |
| `IndexOutOfRange { index, len }` | 添字が `len()` 以上 |
| `Shape(ShapeError)` / `Rng(RngError)` | shape 起因・乱数抽選起因の失敗の委譲 |
| `SampleShapeMismatch { position, expected, found }` | collate 対象のサンプル shape が先頭と不一致 |
| `EmptyBatch` | collate / concat に空列 |
| `InvalidPrefetchConfig { reason }` / `WorkerSpawn { reason }` / `WorkerFailed { batch_index }` | prefetch 系（`iterable-prefetch.md`） |
| `EmptyConcat` | `ConcatDataset::new` に成分 0 件 |
| `SplitLengthMismatch { expected, found }` | 分割長の合計がデータセット長と不一致 |
| `InvalidSplitFraction { index, reason }` | 割合が非有限・負・1 超。合計違反は `index == fractions.len()` |
| `ConcatShapeMismatch { part, expected, found }` | 連結対象の shape が先頭軸以外で不一致 |
| `IterableStream { reason }` | `IterableDataset` 実装者が供給元の失敗を伝える variant（ライブラリ自身は生成しない） |

## Notes

- `Dataset` は PyTorch の単一サンプル `__getitem__` ではなく「添字列 → バッチ」を中心に置く
- `ConcatDataset` は連続する同一成分の run ごとに取り出して元の順序で連結する（成分ごとにまとめると行順が入れ替わるため）。長さ 0 の成分は自然に飛ばされる。異種成分の連結は対象外
- `Subset` は PyTorch の遅延失敗と異なり構築時に範囲外添字を拒否する（fail-closed、意図的差異）
- `random_split` の順列は 1 回の `with_global_rng` 内で生成し、同一 `manual_seed` の下で分割添字列の連結は `RandomSampler` / `DataLoader{shuffle=true}` の順列と bit 一致する。PyTorch の `randperm` とは数列が一致しない（意図的差異）。検査失敗時と `n == 0` は RNG を消費しない
- シャッフルは Fisher–Yates + rejection sampling（整数演算のみでプラットフォーム横断で bit 同一）。xorshift64* は暗号学的に安全ではなく、秘匿用途に使わない
- `DataError` は 0.11.0 時点で上記 variant を持つ。`#[non_exhaustive]` のため match には wildcard が必要
- 0.11.0 では `Subset` / `ConcatDataset` / `random_split*` / `ConcatBatch` は facade（`fandhe_ai::data`）から再エクスポートされている
- `TensorDataset::get` は内部で `reshape` を使うため非 contiguous なテンソルでは `NonContiguousReshape` になり得る

## Related

- [dataloader.md](./dataloader.md)
- [samplers.md](./samplers.md)
- [iterable-prefetch.md](./iterable-prefetch.md)

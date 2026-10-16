---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/fn.randn.html
---

# 乱数・決定性・テンソル生成関数

crate ルートの乱数生成（`manual_seed` / `randn` / `rand` / `randint` / `bernoulli` / `multinomial` / `normal`）、独立した乱数源 `Generator`、決定論モード（`set_deterministic` / `is_deterministic`）、テンソル生成（`arange` / `linspace` / `eye` / `zeros_like` / `ones_like`）、bool テンソルの論理演算（`logical_and` / `logical_or` / `logical_not`）と関連エラー型（`RngError` / `CreationError`）。いずれもホスト側のみで完結し `BackendOps` を経由せず、微分不能な葉値を返す（`Tape::var` でデバイスへ載せる）。

## Signature / Usage

```rust
fandhe_ai::manual_seed(42);
let x = fandhe_ai::randn(&[2, 3])?;                  // N(0, 1)
let idx = fandhe_ai::randint(0, 10, &[4])?;          // Tensor<i32>、[0, 10)
let mut g = fandhe_ai::Generator::new(7);            // グローバル RNG を汚さない
let mask = g.bernoulli(&fandhe_ai::Tensor::new(vec![0.0f32, 1.0, 0.5], &[3])?)?;
```

## Options / Props

乱数（グローバル RNG はプロセス全体で共有され `manual_seed` で再初期化される）:

| Name | Type | Description |
| --- | --- | --- |
| `manual_seed(seed: u64)` | 関数 | グローバル決定的 RNG を `seed` からやり直す。`nn::Linear::new(.., seed)` 等の個別シード API とは独立 |
| `randn(shape: &[usize]) -> Result<Tensor<f32>, ShapeError>` | 関数 | 標準正規分布 `N(0, 1)`。決定性は同一プロセス・同一プラットフォーム限定 |
| `rand(shape: &[usize]) -> Result<Tensor<f32>, ShapeError>` | 関数 | `[0, 1)` の一様分布。整数演算のみのためプラットフォーム横断で bit 同一 |
| `randint(low: i32, high: i32, shape: &[usize]) -> Result<Tensor<i32>, RngError>` | 関数 | `[low, high)` の整数乱数。dtype は `i32`。`low >= high` は `RngError::InvalidRange` |
| `bernoulli(probs: &Tensor<f32>) -> Result<Tensor<f32>, RngError>` | 関数 | 各要素を成功確率とするベルヌーイ試行で `0.0` / `1.0` を返す。各確率は有限かつ `[0, 1]`（違反は `InvalidProbability`）。検証を終えてから乱数を消費する |
| `multinomial(weights: &Tensor<f32>, num_samples: usize, replacement: bool) -> Result<Tensor<i32>, RngError>` | 関数 | 重み（rank 1 または 2）に比例するカテゴリ抽出。出力は `i32`。rank 1 は `[num_samples]`、rank 2 は `[行数, num_samples]`。非復元でカテゴリ数が `num_samples` に満たない等は `RngError`。非復元抽出の計算量は `O(num_samples * n)` |
| `normal(mean: f32, std: f32, shape: &[usize]) -> Result<Tensor<f32>, RngError>` | 関数 | 平均 `mean`・標準偏差 `std` の正規分布。`std == 0` でも乱数を消費。`nn::init::normal`（引数順 `shape, mean, std`）とは別機能 |

`Generator`（グローバル RNG とは完全に独立した状態を持つ乱数源。`torch.Generator` 相当）:

| Name | Type | Description |
| --- | --- | --- |
| `Generator::new(seed: u64) -> Self` | 関数 | `seed` から新規の独立した RNG 状態を作る |
| `manual_seed(&mut self, seed: u64)` | メソッド | 状態を `seed` からやり直す。グローバル状態には触れない |
| `initial_seed(&self) -> u64` | メソッド | `new` / `manual_seed` に渡された補正前のシード値 |
| `bernoulli(&mut self, probs: &Tensor<f32>) -> Result<Tensor<f32>, RngError>` | メソッド | `bernoulli` の Generator 版。グローバル RNG は消費しない |
| `normal(&mut self, mean: f32, std: f32, shape: &[usize]) -> Result<Tensor<f32>, RngError>` | メソッド | `normal` の Generator 版。`mean` は有限、`std` は有限かつ非負 |
| `multinomial(&mut self, weights: &Tensor<f32>, num_samples: usize, replacement: bool) -> Result<Tensor<i32>, RngError>` | メソッド | `multinomial` の Generator 版 |

決定論モード:

| Name | Type | Description |
| --- | --- | --- |
| `set_deterministic(enabled: bool)` | 関数 | `torch.use_deterministic_algorithms` 相当の決定論モードをプロセス全体で切り替える。既定 `false`（opt-in） |
| `is_deterministic() -> bool` | 関数 | 現在値を返す |

テンソル生成:

| Name | Type | Description |
| --- | --- | --- |
| `arange(start: f32, end: f32, step: f32) -> Result<Tensor<f32>, CreationError>` | 関数 | `[start, end)` を `step` 刻みで並べる。`step` がゼロ・非有限は `InvalidStep`、`start` / `end` が非有限は `NonFiniteBound` |
| `linspace(start: f32, end: f32, steps: usize) -> Result<Tensor<f32>, CreationError>` | 関数 | `[start, end]`（両端含む）を `steps` 個の等間隔値で埋める |
| `eye(n: usize) -> Result<Tensor<f32>, ShapeError>` | 関数 | `n x n` の単位行列（長方形版は対象外）。dtype は `f32` 固定 |
| `zeros_like(like: &Tensor<f32>) -> Result<Tensor<f32>, ShapeError>` | 関数 | `like` と同 shape の全 `0.0`。非 contiguous view でも strides は保存しない新規 contiguous バッファ |
| `ones_like(like: &Tensor<f32>) -> Result<Tensor<f32>, ShapeError>` | 関数 | `like` と同 shape の全 `1.0` |

bool テンソルの論理演算（NumPy 互換ブロードキャスト・非微分・tape 非記録）:

| Name | Type | Description |
| --- | --- | --- |
| `logical_and(a: &Tensor<bool>, b: &Tensor<bool>) -> Result<Tensor<bool>, AutodiffError>` | 関数 | 要素ごとの論理積。ブロードキャスト不能は `AutodiffError::Shape(..)` |
| `logical_or(a: &Tensor<bool>, b: &Tensor<bool>) -> Result<Tensor<bool>, AutodiffError>` | 関数 | 要素ごとの論理和 |
| `logical_not(a: &Tensor<bool>) -> Result<Tensor<bool>, AutodiffError>` | 関数 | 要素ごとの否定。巨大 broadcast view は確保前の要素数検査で `Shape` になる（panic しない） |

エラー型:

| Name | Type | Description |
| --- | --- | --- |
| `RngError` | `#[non_exhaustive] enum { Shape(ShapeError), InvalidRange { low: i32, high: i32 }, InvalidProbability { index: usize }, InvalidArgument { reason: &'static str } }` | `InvalidArgument` は `multinomial` / `normal` の引数不正（`n == 0`、`n > i32::MAX`、行和が 0 以下、非復元で `num_samples` が正の重みの個数を超える、`mean` / `std` が非有限、`std < 0` 等）。不正時は乱数を一切消費しない |
| `CreationError` | `enum { Shape(ShapeError), InvalidStep { step: f32 }, NonFiniteBound { start: f32, end: f32 } }` | `arange` / `linspace` のエラー |

## Notes

- 乱数源は xorshift64*。暗号論的に安全ではないため、鍵・トークン等の生成には使わない。版をまたぐ乱数列の安定性は保証しない
- `Generator::new(seed)` の直後の結果は、`manual_seed(seed)` 直後のグローバル関数（`bernoulli` / `multinomial` / `normal`）と bit 完全一致する。`rand` / `randint` の `Generator` 版は無い
- `set_deterministic` は現時点では状態を記録するだけの no-op 契約で、ON / OFF で forward / backward の結果は bit 一致する。保証範囲は CPU（同一バイナリ・同一マシン）に限り、CUDA / Metal の `Tape` には決定性は未検証
- 出力確保は `shape` / `probs` の要素数に比例するため、信頼できない入力をそのまま渡さない
- `Var`（f32）を `logical_*` に渡す場合は `Var::cast::<bool>()` か `Var::gt_bool` 等で bool 化してから渡す
- `fandhe_ai::*` と `fandhe_ai::nn::init::*` を両方 glob import して裸の `normal` を使うと曖昧になるため、修飾して呼ぶ

## Related

- [tensor](./tensor.md)
- [var-elementwise](./var-elementwise.md)
- [errors](./errors.md)

---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/init/index.html
---

# nn::init（重み初期化関数）

PyTorch `torch.nn.init.*` 相当の重み初期化関数群。初期化関数 9 個と補助 4 個（`FanMode` / `Nonlinearity` / `calculate_gain` / `calculate_fan_in_and_fan_out`）の純再エクスポート。

## Signature / Usage

```rust
use fandhe_ai::compat::Sequential;
use fandhe_ai::nn::init::{constant, uniform};

fandhe_ai::manual_seed(42);
let w = uniform(&[2, 3], -0.1, 0.1).unwrap();
let b = constant(&[3], 0.0).unwrap();
let mut seq = Sequential::new().add_linear(2, 3, 0).unwrap();
let mut sd = seq.state_dict();
sd.insert("0.weight".to_string(), w);
sd.insert("0.bias".to_string(), b);
seq.load_state_dict(sd).unwrap();
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `uniform` | `fn uniform(shape: &[usize], low: f32, high: f32) -> Result<Tensor<f32>, AutodiffError>` | `U(low, high)`。`low > high` または非有限値は `InvalidArgument`（RNG 未消費） |
| `normal` | `fn normal(shape: &[usize], mean: f32, std: f32) -> Result<Tensor<f32>, AutodiffError>` | `N(mean, std²)`。`std = 0` は定数にフォールバックし RNG を消費しない。`std < 0` / 非有限は `InvalidArgument` |
| `constant` | `fn constant(shape: &[usize], value: f32) -> Result<Tensor<f32>, AutodiffError>` | 全要素を `value` で埋める（RNG 非消費） |
| `xavier_uniform` | `fn xavier_uniform(shape: &[usize], gain: f32) -> Result<Tensor<f32>, AutodiffError>` | 負の `gain` は拒否 |
| `xavier_normal` | `fn xavier_normal(shape: &[usize], gain: f32) -> Result<Tensor<f32>, AutodiffError>` | 負の `gain` は拒否 |
| `kaiming_uniform` | `fn kaiming_uniform(shape: &[usize], a: f32, mode: FanMode, nonlinearity: Nonlinearity) -> Result<Tensor<f32>, AutodiffError>` | `bound = gain / √fan * √3` の一様分布。`a` が非有限なら `InvalidArgument` |
| `kaiming_normal` | `fn kaiming_normal(shape: &[usize], a: f32, mode: FanMode, nonlinearity: Nonlinearity) -> Result<Tensor<f32>, AutodiffError>` | `std = gain / √fan` の `N(0, std²)`。`a` の扱いは `kaiming_uniform` と同じ |
| `orthogonal` | `fn orthogonal(shape: &[usize], gain: f32) -> Result<Tensor<f32>, AutodiffError>` | 負の `gain` は単なるスケールとして受理 |
| `trunc_normal` | `fn trunc_normal(shape: &[usize], mean: f32, std: f32, a: f32, b: f32) -> Result<Tensor<f32>, AutodiffError>` | `N(mean, std²)` を `[a, b]` へ切断（rejection sampling）。`a >= b`・非有限値・`std < 0` は `InvalidArgument`。受理確率が極端に低い窓も打ち切る |
| `calculate_gain` | `fn calculate_gain(nonlinearity: Nonlinearity) -> f32` | 非線形性ごとの推奨 gain |
| `calculate_fan_in_and_fan_out` | `fn calculate_fan_in_and_fan_out(shape: &[usize]) -> Result<(usize, usize), AutodiffError>` | `(fan_in, fan_out)` |
| `FanMode` | `enum FanMode { FanIn, FanOut }` | `kaiming_*` がどちらの fan を初期化スケールに使うか（PyTorch の `mode` 相当） |
| `Nonlinearity` | `#[non_exhaustive] enum Nonlinearity { Linear, Conv1d, Conv2d, Sigmoid, Tanh, Relu, LeakyRelu(f32), Selu }` | `kaiming_*` / `calculate_gain` の非線形性指定 |

## Notes

- 本モジュールの `normal`（`nn.init.normal_` 相当、引数順 `shape, mean, std`）は crate ルートの `fandhe_ai::normal`（`torch.normal` 相当、引数順 `mean, std, shape`）とは別機能。両方を glob import して裸の `normal` を使うと曖昧になるため修飾して呼ぶ
- 乱数はプロセスグローバル RNG（`fandhe_ai::manual_seed`）に従い、`compat::Sequential::add_linear(.., seed)` 等の個別シード API とは独立。同一シード・同一プロセス・同一プラットフォーム内で再現可能（Box–Muller 経由の関数は超越関数の実装差でプラットフォーム間の bit 同一を保証しない）。乱数源は xorshift64* で暗号論的に安全ではないため、鍵・トークン生成に使わない
- 重みレイアウト: `compat::Sequential::add_linear` の `weight` は `[in_features, out_features]` で PyTorch（`[out, in]`）と転置の関係にある。`kaiming_*` / `xavier_*` / `calculate_fan_in_and_fan_out` に `[in, out]` の形状を渡すと fan_in と fan_out の意味が入れ替わる。Conv 系は PyTorch と同じレイアウト
- `kaiming_*` の `a` は `Nonlinearity::LeakyRelu(_)` のときのみ gain 計算に使われる

## Related

- [module.md](./module.md)
- [compat-sequential.md](../api/compat-sequential.md)

---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/models/struct.Mlp.html
---

# Mlp / LeNet

`fandhe_ai::models` の参照モデル（PyTorch の定番モデル）のうち、`compat::Sequential::add_*` だけを組み合わせた薄いラッパー。新しいカーネルや保存経路は持たず、`sequential()` が返す `compat::Sequential` で学習・保存を行う。クレートルートへは再エクスポートされない。

## Signature / Usage

評価モードにして推論する（`Mlp` と `LeNet`）:

```rust
use fandhe_ai::models::{LeNet, Mlp};
use fandhe_ai::Tensor;

let mut mlp = Mlp::new(8, &[16, 4], 3, 0.1).unwrap();
mlp.sequential_mut().eval();
let x = Tensor::<f32>::new(vec![0.5; 2 * 8], &[2, 8]).unwrap();
let y = mlp.predict(&x).unwrap();
assert_eq!(y.shape(), &[2, 3]);

// LeNet の入力は `[N, 1, 28, 28]`。
let mut lenet = LeNet::new(10, 1).unwrap();
lenet.sequential_mut().eval();
assert_eq!(lenet.num_classes(), 10);
let x = Tensor::<f32>::new(vec![0.1; 28 * 28], &[1, 1, 28, 28]).unwrap();
let y = lenet.predict(&x).unwrap();
assert_eq!(y.shape(), &[1, 10]);
```

```rust
impl Mlp {
    pub fn new(input_dim: usize, hidden_dims: &[usize], output_dim: usize, dropout: f32)
        -> Result<Self, AutodiffError>;
    pub fn with_seed(input_dim: usize, hidden_dims: &[usize], output_dim: usize, dropout: f32, seed: u64)
        -> Result<Self, AutodiffError>;
    pub fn forward<'t>(&self, tape: &'t Tape, x: &Var<'t>) -> Result<Var<'t>, AutodiffError>;
    pub fn predict(&self, x: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>;
    pub fn sequential(&self) -> &Sequential;
    pub fn sequential_mut(&mut self) -> &mut Sequential;
    pub fn dropout(&self) -> f32;
}

impl LeNet {
    pub fn new(num_classes: usize, seed: u64) -> Result<Self, AutodiffError>;
    pub fn forward<'t>(&self, tape: &'t Tape, x: &Var<'t>) -> Result<Var<'t>, AutodiffError>;
    pub fn predict(&self, x: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>;
    pub fn sequential(&self) -> &Sequential;
    pub fn sequential_mut(&mut self) -> &mut Sequential;
    pub fn num_classes(&self) -> usize;
}
```

## Options / Props

| 項目 | 内容 |
|------|------|
| `Mlp::new` | `input_dim` → `hidden_dims`（各層の後に ReLU・Dropout(`dropout`)）→ `output_dim`。既定シードで `with_seed` へ委譲する |
| `Mlp::with_seed` | シード指定版。各 `Linear` 層には `seed.wrapping_add(層番号)` を渡す |
| `LeNet::new` | `num_classes` 分類。入力は `[N, 1, 28, 28]` 前提。`Mlp` と異なり既定シードは持たず、常に呼び出し元が指定する |
| `forward` | 外部 `Tape` 上で forward を計算する（`Sequential::forward` への委譲） |
| `predict` | `Tensor` 入出力の推論（`Sequential::predict` への委譲） |
| `sequential` / `sequential_mut` | 内部 `Sequential` への参照。`compile` / `fit` / `evaluate` / `named_parameters` / `save_model` 等の呼び出し元向け |

## Notes

- `Mlp::new` / `with_seed` は次元に 0 を含む場合、または `dropout` が非有限・`[0, 1]` 範囲外の場合に `AutodiffError::InvalidArgument` を返す。`LeNet::new` は `num_classes == 0` で同じ
- `Mlp` の `Sequential` 上の index は、隠れ層ごとに Linear / ReLU / Dropout の 3 層を消費する
- `LeNet` の構成は古典 LeNet-5 の fc 3 層版とは異なる（conv1 `Conv2d(1, 6, 5)` → ReLU → max_pool2d(2) → conv2 `Conv2d(6, 16, 5)` → ReLU → max_pool2d(2) → flatten → fc1 `Linear(256, 120)` → ReLU → fc2 `Linear(120, num_classes)`）
- 重みレイアウト: `Conv2d.weight` は PyTorch と同一 shape、`Linear.weight` は `[in, out]` で PyTorch の `[out, in]` と転置の関係（bias は同一）。PyTorch との層対応表は facade の公開面に含まれず、examples 側（`examples/models/mlp.rs` / `lenet.rs`）にある
- `sequential_mut` は層構成そのものの差し替えを想定しない。モード切替・学習系 API の呼び出しに限定して使う
- 保存・読み込みは `sequential()` が返す `compat::Sequential` を既存の `compat::save_model` / `compat::load_model` に渡す
- `fandhe_ai::models` の公開型は `Mlp` / `LeNet` / `ResNet` / `ResNetBlock` / `TransformerClassifier` / `TransformerClassifierConfig` の 6 つだけ。`ReferenceModule` / `Trainable` のような共通 trait や `fit_epochs` / `accuracy` 等の学習ユーティリティは公開されない（examples に残る）
- 実行する example は samples の `reference-models` を参照
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/models/ （0.14.0, 取得日 2026-11-14。シグネチャは `src/models/mlp.rs` / `lenet.rs` を一次ソースとして確認）

## Related

- [resnet.md](./resnet.md)
- [transformer-classifier.md](./transformer-classifier.md)

---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/models/struct.TransformerClassifier.html
---

# TransformerClassifier / TransformerClassifierConfig

エンコーダだけの Transformer 分類器（行トークン入力）と、その構成値 `TransformerClassifierConfig`。`fandhe_ai::nn::Transformer`（エンコーダ・デコーダ）とは別の型で、`use fandhe_ai::nn::*; use fandhe_ai::models::*;` を併用しても衝突しない。

## Signature / Usage

推論と 1 学習ステップ:

```rust
use fandhe_ai::models::{TransformerClassifier, TransformerClassifierConfig};
use fandhe_ai::optim::{Adam, AdamConfig};
use fandhe_ai::Tensor;

// TransformerClassifier（pub フィールドの構成値から構築）。
let cfg = TransformerClassifierConfig {
    seq_len: 4,
    in_features: 6,
    embed_dim: 8,
    num_heads: 2,
    num_layers: 1,
    dim_feedforward: 16,
    mlp_hidden: 16,
    num_classes: 3,
};
let mut tc = TransformerClassifier::new(cfg, 0).unwrap();
let x = Tensor::<f32>::new(vec![0.1; 2 * 4 * 6], &[2, 4, 6]).unwrap();
assert_eq!(tc.predict(&x).unwrap().shape(), &[2, 3]);
let preset = TransformerClassifierConfig::cifar10(16, 2, 1, 10).unwrap();
assert_eq!((preset.seq_len, preset.in_features), (32, 96));

// 1 学習ステップ（損失は有限値）。
let y = Tensor::<i32>::new(vec![0, 2], &[2]).unwrap();
let mut opt = Adam::new(AdamConfig::default()).unwrap();
let loss = tc.train_step(&x, &y, &mut opt).unwrap();
assert!(loss.is_finite());
```

```rust
#[derive(Debug, Clone, Copy)]
pub struct TransformerClassifierConfig {
    pub seq_len: usize,
    pub in_features: usize,
    pub embed_dim: usize,
    pub num_heads: usize,
    pub num_layers: usize,
    pub dim_feedforward: usize,
    pub mlp_hidden: usize,
    pub num_classes: usize,
}

impl TransformerClassifierConfig {
    pub fn cifar10(embed_dim: usize, num_heads: usize, num_layers: usize, num_classes: usize)
        -> Result<Self, AutodiffError>;
}

impl TransformerClassifier {
    pub fn new(config: TransformerClassifierConfig, seed: u64) -> Result<Self, AutodiffError>;
    pub fn forward<'t>(&self, tape: &'t Tape, x: &Var<'t>) -> Result<Var<'t>, AutodiffError>;
    pub fn predict(&self, x: &Tensor<f32>) -> Result<Tensor<f32>, AutodiffError>;
    pub fn named_parameters(&self) -> Vec<(String, &Tensor<f32>)>;
    pub fn set_training(&mut self, training: bool);
    pub fn training(&self) -> bool;
    pub fn train_step(&mut self, x: &Tensor<f32>, y: &Tensor<i32>, opt: &mut Adam)
        -> Result<f32, AutodiffError>;
    pub fn config(&self) -> TransformerClassifierConfig;
}
```

## Options / Props

| フィールド | 意味 |
|------------|------|
| `seq_len` | 系列長（トークン数） |
| `in_features` | 入力特徴次元（embed 前） |
| `embed_dim` | 埋め込み次元（`d_model`）。`num_heads` で割り切れる必要がある |
| `num_heads` | self-attention のヘッド数 |
| `num_layers` | `TransformerEncoderLayer` の積層数 |
| `dim_feedforward` | 各層 FFN の中間次元 |
| `mlp_hidden` | 分類 head（MLP）の中間次元 |
| `num_classes` | 分類クラス数 |

## Notes

- 構成: `embed = Linear(in_features, embed_dim)`（`[N, L, in]` → `[N, L, E]`）→ 固定 sinusoidal 位置符号を加算（学習しない）→ `TransformerEncoderLayer` x `num_layers` → 系列方向の平均（`[N, L, E]` → `[N, E]`）→ head（`Linear(E, mlp_hidden)` → ReLU → `Linear(mlp_hidden, num_classes)`）
- ViT ではない（patch embedding・cls token・学習可能な位置埋め込みを持たない）。エンコーダ層は `compat::Sequential::add_transformer_encoder` の契約（post-norm・`activation="relu"`・dropout 結線なし）に従う
- `TransformerClassifierConfig::cifar10` は画像の行をトークンとして扱う CIFAR-10 相当入力（`[N, 32, 96]`。`seq_len = 32`・`in_features = 96 = 3 * 32`）向けプリセットで、`dim_feedforward` / `mlp_hidden` は `embed_dim * 2` に固定される。`embed_dim * 2` が `usize` を超える場合は `AutodiffError::InvalidArgument`
- `TransformerClassifierConfig` のフィールドは 0.11 系の非破壊契約として固定されている（追加・削除は破壊的変更。ソースの doc）
- `new` は config のいずれかのフィールドが 0、`embed_dim` が `num_heads` で割り切れない、`seq_len * embed_dim` が `usize` を超える、または確保する要素数の見積もりが上限（`1 << 30` 要素）を超える場合に `AutodiffError::InvalidArgument` を返す
- 入力は `[N, seq_len, in_features]` のみ。`train_step` の `y` は `[N]` のクラス index。`train_step` は冒頭で train モードへ切り替え、`Adam` を使う
- `set_training` はエンコーダ層が mode 依存の層を持たないため数値挙動を変えない。`named_parameters` の接頭辞は `embed.` / `encoder.` / `head.`
- 保存・読み込み経路を持たず、`nn::Module` も実装しない
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/models/struct.TransformerClassifier.html （0.14.0, 取得日 2026-11-14。シグネチャは `src/models/transformer_classifier.rs` を一次ソースとして確認）

## Related

- [mlp-lenet.md](./mlp-lenet.md)
- [resnet.md](./resnet.md)

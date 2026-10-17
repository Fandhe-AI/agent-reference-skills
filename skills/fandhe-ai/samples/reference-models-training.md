---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/examples/main.rs
---

# Reference Models Training

合成 CIFAR-10 相当データで ResNet / Transformer 参照実装を `Adam` で 10 epoch 学習する example の冒頭部分（取り込み・定数・局所 PRNG）。

```rust
#[path = "models/reference_module.rs"]
mod reference_module;
#[path = "models/resnet.rs"]
mod resnet;
#[path = "models/synthetic_cifar.rs"]
mod synthetic_cifar;
#[path = "models/transformer.rs"]
mod transformer;

use fandhe_ai::Tensor;
use fandhe_ai::optim::{Adam, AdamConfig};
use reference_module::{ReferenceModule, accuracy, fit_epochs, predict_in_eval, sub_tensor_f32};
use resnet::ResNet;
use synthetic_cifar::{IMG_C, IMG_H, IMG_W, NUM_CLASSES, synthetic_cifar10, to_row_tokens};
use transformer::{Transformer, TransformerConfig};

const EPOCHS: usize = 10;
const BATCH_SIZE: usize = 16;
const N_TRAIN: usize = 64;
const N_TEST: usize = 32;
const LR: f32 = 5e-3;

/// 依存追加なしの局所 PRNG（SplitMix64）。
struct SplitMix64(u64);

impl SplitMix64 {
    fn next_u64(&mut self) -> u64 {
        self.0 = self.0.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.0;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }
}
```

実行（リポジトリ内、`--release` 推奨）: `cargo run --release -p fandhe-ai --example main -- resnet`（引数は `resnet` / `transformer` / `all`。省略時は `all`）

## Notes

- 上のコードは原本 `examples/main.rs`（338 行）の L15-L51 のみの抜粋で、単体ではコンパイルできない（`models/*.rs` の参照実装 MLP / LeNet / ResNet / Transformer が必要）。学習本体は原本の `run_resnet` / `run_transformer`（`Adam::new(AdamConfig { lr: LR, ..AdamConfig::default() })` → `fit_epochs` → `accuracy`）を参照
- 引数は `resnet` / `transformer` / `all`（完全一致 allowlist、引数なしは `all`）。それ以外・余分な引数は usage を出して終了コード 1
- 合格判定は全 epoch の loss が有限・最終 epoch の loss が初回より小さい・held-out 精度 0.50 以上。debug ビルドでは学習に数分かかる（原本ドキュメント）
- `models/` 配下の参照実装（`reference_models.rs` 経由の集約）は本ページでは未収録

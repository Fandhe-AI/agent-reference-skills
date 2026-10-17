---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/src/inference/mod.rs
---

# Autoregressive Generate

`AutoregressiveModel` を実装した表引きモデルに対し、`generate` で greedy 生成する。

```rust
use fandhe_ai::Tensor;
use fandhe_ai::nn::kv_cache::KvCache;
use fandhe_ai::inference::{AutoregressiveModel, GenerateConfig, SamplingStrategy, generate};
use fandhe_ai::AutodiffError;

/// 直前トークンだけで logits が決まる表引きモデル（状態なし）。
struct Table;

impl AutoregressiveModel for Table {
    fn num_kv_layers(&self) -> usize {
        0
    }
    fn forward_step(
        &self,
        new_ids: &Tensor<i32>,
        _caches: &mut [KvCache],
    ) -> Result<Tensor<f32>, AutodiffError> {
        let (b, l) = (new_ids.shape()[0], new_ids.shape()[1]);
        let ids = new_ids.as_slice().unwrap();
        let mut out = vec![0.0f32; b * l * 4];
        for (i, &id) in ids.iter().enumerate() {
            // 次トークンは (id + 1) % 4 が最大。
            out[i * 4 + ((id as usize + 1) % 4)] = 1.0;
        }
        Ok(Tensor::new(out, &[b, l, 4]).unwrap())
    }
}

fn main() {
    let prompt = Tensor::<i32>::new(vec![0], &[1]).unwrap();
    let cfg = GenerateConfig::new(5, SamplingStrategy::Greedy);
    let out = generate(&Table, &prompt, &cfg).unwrap();
    assert_eq!(out.shape(), &[5]);
    assert_eq!(out.as_slice().unwrap(), &[0, 1, 2, 3, 0]);
}
```

## Notes

- コードは `src/inference/mod.rs`（0.11.0）のモジュール doc 例（上流では doctest）。上流の doc 例は `main` を持たない文の列で、本ページでは `fn main` で包んだ
- 入出力は token id 列（`Tensor<i32>`）のみでトークナイザは対象外。EOS による早期停止はなく、常に `max_length` まで生成する。`top_k > vocab` は拒否される
- 乱数は独立した `Generator`（xorshift64*）のみで非暗号。生成 token をセキュリティ用途に使わない
- facade のみでは `KvCache` へ書き込む手段がなく、KV キャッシュを使うモデルを組む経路は公開面にない（原文の「既知の制限」）。`BatchScheduler` / `generate_speculative` の例は `generate-scheduler.md` を参照

---
source: https://docs.rs/crate/fandhe-ai/0.11.0/source/src/inference/mod.rs
---

# Batch Scheduler and Speculative Decoding

`BatchScheduler` で複数要求を step 実行し、`generate_speculative` の fail-closed 契約を確認する。

Adapted (not in the official docs): doctest 2 件を 1 つの `main` に統合し、後者の `Table` を前者に統合。

```rust
use fandhe_ai::inference::{
    AutoregressiveModel, BatchScheduler, GenerateConfig, SamplingStrategy, SchedulerLimits,
    SpeculativeConfig, generate, generate_speculative,
};
use fandhe_ai::nn::kv_cache::KvCache;
use fandhe_ai::{AutodiffError, Tensor};

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
            out[i * 4 + ((id as usize + 1) % 4)] = 1.0;
        }
        Ok(Tensor::new(out, &[b, l, 4]).unwrap())
    }
}

fn main() {
    let limits = SchedulerLimits::new(2, 4, 8).unwrap();
    let mut scheduler = BatchScheduler::new(limits);
    let cfg = GenerateConfig::new(5, SamplingStrategy::Greedy);
    let p0 = Tensor::<i32>::new(vec![0], &[1]).unwrap();
    let p1 = Tensor::<i32>::new(vec![2], &[1]).unwrap();
    let id0 = scheduler.submit(&p0, &cfg).unwrap();
    let id1 = scheduler.submit(&p1, &cfg).unwrap();
    assert_ne!(id0, id1);

    let mut finished = Vec::new();
    for _ in 0..16 {
        scheduler.step(&Table).unwrap();
        finished.extend(scheduler.take_finished());
        if scheduler.queued_len() + scheduler.active_len() == 0 {
            break;
        }
    }
    assert!(scheduler.take_failed().is_empty());
    assert_eq!(finished.len(), 2);
    // 各要求の出力は単独の `generate` と token 列が一致する。
    for (id, out) in &finished {
        let prompt = if *id == id0 { &p0 } else { &p1 };
        let alone = generate(&Table, prompt, &cfg).unwrap();
        assert_eq!(out.as_slice().unwrap(), alone.as_slice().unwrap());
    }

    // KV を使わない（`num_kv_layers() == 0` の）モデルは speculative で fail-closed に拒否される。
    let spec = SpeculativeConfig::new(2);
    let r = generate_speculative(&Table, &Table, &p0, &cfg, &spec);
    assert!(matches!(r, Err(AutodiffError::InvalidArgument(_))));
}
```

## Notes

- コードは `src/inference/mod.rs`（0.11.0）の doctest 2 件（`BatchScheduler` 例と `generate_speculative` 例）を 1 つの `main` にまとめ、後者の `Table` 定義は前者のものに統合した。後者の元の `Table` は logits が常に 0 の状態なしモデルで、拒否される結果は同じ
- `generate_speculative` は Greedy・B = 1 に限る（Greedy 以外は `Err`）。上流 doctest は `SamplingStrategy::TopK(2)` が `Err` になることも確認しているが、本ページでは省略した
- `SchedulerLimits` の 3 上限（同時実行数・待ち行列長・`max_length`）は必須で 0 は拒否される。完了条件は `max_length` 到達のみ（EOS 停止なし）
- 成功経路の speculative decoding は facade の公開面だけでは組めない（`KvCache` にセッターがない）。原文は成功経路を `crates/facade/tests/speculative_batching_facade.rs` の結合テストが担うと記す

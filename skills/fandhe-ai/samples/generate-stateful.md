---
source: https://docs.rs/crate/fandhe-ai/0.14.0/source/src/inference/mod.rs
---

# Stateful Autoregressive Model

隠れ状態（RNN 相当）を持つモデルに `StatefulAutoregressiveModel` を実装し、`generate_speculative_stateful` と `BatchScheduler::step_stateful` で扱う。

```rust
use fandhe_ai::inference::{
    BatchScheduler, GenerateConfig, SamplingStrategy, SchedulerLimits, SpeculativeConfig,
    StatefulAutoregressiveModel, generate_speculative_stateful,
};
use fandhe_ai::{AutodiffError, Tensor};

const V: usize = 7;

/// 状態が「処理済みトークン数」だけの純 RNN 相当モデル。次 token は (直前 token, 位置) で決まる。
struct Rnn;

impl StatefulAutoregressiveModel for Rnn {
    type State = usize;

    fn init_state(&self) -> Result<usize, AutodiffError> {
        Ok(0)
    }
    fn forward_step_stateful(
        &self,
        new_ids: &Tensor<i32>,
        state: &mut usize,
    ) -> Result<Tensor<f32>, AutodiffError> {
        let ids = new_ids.as_slice().unwrap();
        let mut out = vec![0.0f32; ids.len() * V];
        for (i, &tok) in ids.iter().enumerate() {
            out[i * V + (3 * tok as usize + *state + i + 1) % V] = 1.0;
        }
        *state += ids.len();
        Ok(Tensor::new(out, &[1, ids.len(), V]).unwrap())
    }
    fn save_state(&self, state: &usize) -> Result<usize, AutodiffError> {
        Ok(*state)
    }
    fn restore_state(&self, state: &mut usize, saved: usize) -> Result<(), AutodiffError> {
        *state = saved;
        Ok(())
    }
}

fn main() {
    // 参照値: 同じ規則を素朴に回した token 列（Greedy）。
    let expected = |first: i32, len: usize| -> Vec<i32> {
        let mut v = vec![first];
        while v.len() < len {
            let pos = v.len() - 1;
            v.push(((3 * *v.last().unwrap() as usize + pos + 1) % V) as i32);
        }
        v
    };
    let cfg = GenerateConfig::new(6, SamplingStrategy::Greedy);

    // speculative decoding（target == draft なので全受理）。
    let prompt = Tensor::<i32>::new(vec![0], &[1]).unwrap();
    let out = generate_speculative_stateful(&Rnn, &Rnn, &prompt, &cfg, &SpeculativeConfig::new(2))
        .unwrap();
    assert_eq!(out.as_slice().unwrap(), expected(0, 6).as_slice());

    // 連続バッチング（2 要求）。各要求の出力は単独の参照と token 列が一致する。
    let mut scheduler = BatchScheduler::new(SchedulerLimits::new(2, 4, 8).unwrap());
    let p0 = Tensor::<i32>::new(vec![0], &[1]).unwrap();
    let p1 = Tensor::<i32>::new(vec![2], &[1]).unwrap();
    let id0 = scheduler.submit(&p0, &cfg).unwrap();
    let _id1 = scheduler.submit(&p1, &cfg).unwrap();
    let mut finished = Vec::new();
    for _ in 0..16 {
        scheduler.step_stateful(&Rnn).unwrap();
        finished.extend(scheduler.take_finished());
        if scheduler.queued_len() + scheduler.active_len() == 0 {
            break;
        }
    }
    assert!(scheduler.take_failed().is_empty());
    assert_eq!(finished.len(), 2);
    for (id, out) in &finished {
        let first = if *id == id0 { 0 } else { 2 };
        assert_eq!(out.as_slice().unwrap(), expected(first, 6).as_slice());
    }
}
```

## Notes

- コードは `src/inference/mod.rs`（0.14.0）の「内部状態を持つモデル」節の doctest を `fn main` に包んだもの。`generate_speculative` と違い `num_kv_layers() == 0` の拒否は無い（状態が `caches` の外にあるため）
- `step_stateful` は `M::State: Send + Sync + 'static` を要求する。要求の種類（KV 形か内部状態形か）は参加時に決まり、`step` / `step_batched` と混ぜて進めるとその要求だけが `take_failed` に積まれる。`State` のサイズは利用者の責任
- 乱数は独立した `Generator`（xorshift64*）のみで非暗号。生成 token をセキュリティ用途に使わない
- `references/inference/stateful.md` が trait・入口検査の順序・契約を記す
- `fandhe-ai =0.14.0` に対し、本ページのコードを `cargo check` で確認し、実行して `assert` が通ることも確認済み（2026-11-14）

## Related

- [generate-scheduler.md](./generate-scheduler.md)
- [generate-autoregressive.md](./generate-autoregressive.md)

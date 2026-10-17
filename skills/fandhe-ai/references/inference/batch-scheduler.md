---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/inference/struct.BatchScheduler.html
---

# inference::BatchScheduler / SchedulerLimits / RequestId

連続バッチング第 1 段階のスケジューラ。複数の生成要求を待ち行列に積み、`step` ごとに進行中の各要求を 1 トークンずつ進める。`fandhe_ai_autodiff::generate::scheduler` の 3 名を純再エクスポートしたもの。

## Signature / Usage

```rust
use fandhe_ai::inference::{
    AutoregressiveModel, BatchScheduler, GenerateConfig, SamplingStrategy, SchedulerLimits,
    generate,
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
```

## Options / Props

`SchedulerLimits`（`#[non_exhaustive]`、`Debug, Clone, Copy, PartialEq, Eq`。フィールド非公開）:

| Name | Type | Description |
|------|------|-------------|
| `SchedulerLimits::new(max_active: usize, max_queued: usize, max_length: usize) -> Result<SchedulerLimits, AutodiffError>` | 関数 | 同時実行数・待ち行列長・要求ごとの `max_length` の上限。いずれかが 0、または `max_length` 分の `i32` バッファが `isize::MAX` バイトを超える場合は `Err(InvalidArgument)` |
| `max_active(&self) -> usize` | メソッド | 同時に進行できる要求数の上限 |
| `max_queued(&self) -> usize` | メソッド | 待ち行列に積める要求数の上限 |
| `max_length(&self) -> usize` | メソッド | 要求ごとの `GenerateConfig::max_length` の上限 |

`BatchScheduler`:

| Name | Type | Description |
|------|------|-------------|
| `BatchScheduler::new(limits: SchedulerLimits) -> BatchScheduler` | 関数 | 空のスケジューラを作る |
| `queued_len(&self) -> usize` | メソッド | 待ち行列にいる要求数 |
| `active_len(&self) -> usize` | メソッド | 進行中の要求数 |
| `submit(&mut self, input_ids: &Tensor<i32>, config: &GenerateConfig) -> Result<RequestId, AutodiffError>` | メソッド | 要求を待ち行列へ積む（forward は呼ばない）。`input_ids` は `[T]` または `[1, T]`。いずれの `Err` でも状態は変わらない |
| `step<M: AutoregressiveModel + ?Sized>(&mut self, model: &M) -> Result<usize, AutodiffError>` | メソッド | 待ち行列から空きの分だけ参加させ、進行中の各要求を 1 トークン進める。戻り値はこの呼び出しで成功完了した要求数 |
| `take_finished(&mut self) -> Vec<(RequestId, Tensor<i32>)>` | メソッド | 完了した要求を完了順に取り出す（drain） |
| `take_failed(&mut self) -> Vec<(RequestId, AutodiffError)>` | メソッド | 失敗として切り離された要求を取り出す（drain） |

`RequestId`: 不透明な要求識別子（`Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash`。`submit` ごとに単調増加）。

## Notes

- `SchedulerLimits` の 3 上限は必須で 0 は拒否する。`submit` は上限超過（`max_length` が上限超、待ち行列が満杯）、`B != 1`、prompt 空、`max_length < prompt 長` を `Err` にする。
- 要求単位の失敗は `step` の `Err` にせず `take_failed` に積まれ、他の要求から切り離される。`step` の `Err` はスケジューラ全体の不変条件破れに予約されている（第 1 段階では返す経路はない）。
- 完了条件は `max_length` 到達のみ（EOS 停止なし）。呼び出しスレッド上で同期実行し、スレッドも I/O も持たない。`model` は保持せず `step` ごとに借用する。
- 対象モデルの契約: 生成状態を渡された `caches` だけに持つモデルと、状態を持たないモデルが対象。内部状態保持型（`RefCell<StatefulAttention>` 等）は要求間で状態が混ざるため対象外で、出力を保証しない。
- `Debug` 出力は token 列を出さず件数のみ。
- AutoregressiveModel を実装したローカルモデル上のスケジューラであり、LLM API（openai-api-core / anthropic-api-core / hermes-agent）とは無関係。

## Related

- [generate.md](./generate.md)
- [speculative.md](./speculative.md)

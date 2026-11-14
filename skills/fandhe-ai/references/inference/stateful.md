---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/inference/trait.StatefulAutoregressiveModel.html
---

# inference::StatefulAutoregressiveModel / generate_speculative_stateful

`caches`（`KvCache`）で表せない状態（RNN の隠れ状態・SSM の再帰状態）を持つ自己回帰モデル用の trait と、その speculative decoding 入口。`fandhe_ai_autodiff::generate::stateful` の `StatefulAutoregressiveModel` / `generate_speculative_stateful` を再エクスポートする。連続バッチングの入口は `BatchScheduler::step_stateful`（batch-scheduler.md）。

## Signature / Usage

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
```

```rust
pub trait StatefulAutoregressiveModel {
    type State;
    fn init_state(&self) -> Result<Self::State, AutodiffError>;
    fn forward_step_stateful(
        &self,
        new_ids: &Tensor<i32>,
        state: &mut Self::State,
    ) -> Result<Tensor<f32>, AutodiffError>;
    fn save_state(&self, state: &Self::State) -> Result<Self::State, AutodiffError>;
    fn restore_state(
        &self,
        state: &mut Self::State,
        saved: Self::State,
    ) -> Result<(), AutodiffError>;
}

pub fn generate_speculative_stateful<T, D>(
    target: &T,
    draft: &D,
    input_ids: &Tensor<i32>,
    config: &GenerateConfig,
    spec: &SpeculativeConfig,
) -> Result<Tensor<i32>, AutodiffError>
where
    T: StatefulAutoregressiveModel + ?Sized,
    D: StatefulAutoregressiveModel + ?Sized,
```

## Options / Props

| Name | Description |
| --- | --- |
| `type State` | 呼び出し側が持つ状態の型。trait 自体に境界はなく、`BatchScheduler::step_stateful` が `M::State: Send + Sync + 'static` を要求する。KV を持つモデルは `State = Vec<KvCache>` などで実装できる |
| `init_state` | 空の状態（トークン 0 個分）を作る |
| `forward_step_stateful` | `new_ids: [1, L_new]` を forward して `state` を `L_new` トークン分進め、logits `[1, L_new, V]` を返す（`AutoregressiveModel::forward_step` と同じ形状契約） |
| `save_state` | `state` の独立した snapshot を返す（棄却時の巻き戻し用）。以後の `state` の更新に影響されないこと |
| `restore_state` | `state` を `saved`（`save_state` の戻り値）の時点へ戻す |
| `generate_speculative_stateful` | `generate_speculative` の内部状態モデル版（B = 1。Greedy / TopK / Temperature）。target と draft のどちらも `StatefulAutoregressiveModel` を実装する。入力は `[T]` / `[1, T]`、出力は `[max_length]` / `[1, max_length]` |

## Notes

- 公開形の正は `docs/facade-speculative-decoding-batching-design.md` §29・§31。facade 独自の newtype・`generate_stateful` は作らない
- `generate_speculative` と違い `num_kv_layers() == 0` の拒否は無い（状態が `caches` の外にあるため。純 RNN は KV 層 0 が正当）
- 入口検査の順序（最初に該当した条件で `Err`）: config 矛盾、`spec.k == 0`、rank が 1/2 以外、`T == 0`、`B != 1`、`max_length < T`、出力バッファのオーバーフロー、`target.init_state()` の失敗（`max_length == T` でも呼ばれる）、`draft.init_state()` の失敗。以降は forward の shape 不整合、語彙サイズの target / draft 間・ステップ間不一致、`top_k > vocab`、logits の非有限値、サンプリング時の確率計算・`RngError`、モデルが返すエラー（`save_state` / `restore_state` を含めそのまま伝播）で `Err`
- 契約: token 列が `generate` と一致するのは形状に依存しない logits を返すモデルに限る。サンプリング版の契約（受理棄却・残差再抽出・RNG 消費順・グローバル RNG 非消費）は `generate_speculative` と同じ。状態が保持するトークン数をフレームワークの数える長さと一致させるのは利用者の保証事項
- 巻き戻し（`restore_state`）や再 forward が失敗したら直ちに `Err` を返す。状態はこの関数が `init_state` で作ったローカル値で `Err` と共に drop されるため呼び出し側から観測できない。ただし `State` が `Arc` などで外部と共有されている場合、失敗後の中身は利用者の責任
- 乱数は独立した `Generator`（xorshift64*）のみで非暗号。生成 token をセキュリティ用途に使わない
- AutoregressiveModel / StatefulAutoregressiveModel を実装したローカルモデル上の処理であり、LLM API（openai-api-core / anthropic-api-core / hermes-agent）とは無関係
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/inference/trait.StatefulAutoregressiveModel.html（0.14.0, 取得日 2026-11-14）。契約文・例はタグ v0.14.0 の `src/inference/mod.rs` rustdoc と `fandhe-ai-autodiff` 0.14.0 の `generate/stateful.rs`

## Related

- [speculative.md](./speculative.md)
- [batch-scheduler.md](./batch-scheduler.md)
- [generate.md](./generate.md)

---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/inference/fn.generate_speculative.html
---

# inference::generate_speculative / SpeculativeConfig

target と draft の 2 モデルによる speculative decoding（Greedy / TopK / Temperature）。`fandhe_ai_autodiff::generate::speculative` の `SpeculativeConfig` / `generate_speculative` を純再エクスポートしたもの。隠れ状態を `caches` の外に持つモデル用の `generate_speculative_stateful` は stateful.md を参照。

## Signature / Usage

```rust
use fandhe_ai::inference::{
    AutoregressiveModel, GenerateConfig, SamplingStrategy, SpeculativeConfig,
    generate_speculative,
};
use fandhe_ai::nn::kv_cache::KvCache;
use fandhe_ai::{AutodiffError, Tensor};

/// 状態なしのモデル（`num_kv_layers() == 0`）。
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
        Ok(Tensor::new(vec![0.0f32; b * l * 4], &[b, l, 4]).unwrap())
    }
}

let prompt = Tensor::<i32>::new(vec![0], &[1]).unwrap();
let spec = SpeculativeConfig::new(2);

// KV を使わない（`num_kv_layers() == 0` の）モデルは fail-closed で拒否される。
let greedy = GenerateConfig::new(5, SamplingStrategy::Greedy);
let r = generate_speculative(&Table, &Table, &prompt, &greedy, &spec);
assert!(matches!(r, Err(AutodiffError::InvalidArgument(_))));

// サンプリング戦略でも `num_kv_layers() == 0` は拒否される。
let topk = GenerateConfig::new(5, SamplingStrategy::TopK(2));
let r = generate_speculative(&Table, &Table, &prompt, &topk, &spec);
assert!(matches!(r, Err(AutodiffError::InvalidArgument(_))));
```

KV 付きモデルの成功例（rustdoc の例。`stateful_attention_forward_with_cache` で `caches[0]` を進め、出力は target 単独の `generate` と token 列が一致する）。

```rust
use fandhe_ai::inference::{
    AutoregressiveModel, GenerateConfig, SamplingStrategy, SpeculativeConfig, generate,
    generate_speculative,
};
use fandhe_ai::nn::kv_cache::{KvCache, MultiheadAttentionConfig, StatefulAttention};
use fandhe_ai::{AutodiffError, Tensor};

const V: usize = 7;

/// `caches[0]` だけを進める表引き KV モデル。logits は (直前 token, 位置) だけで決まる one-hot。
/// 位置は `caches[0].seq_len()` から取るため、棄却後の巻き戻しが誤れば出力がずれる。
struct Lm {
    sa: StatefulAttention,
    mul: usize,
}

impl AutoregressiveModel for Lm {
    fn num_kv_layers(&self) -> usize {
        1
    }
    fn forward_step(
        &self,
        new_ids: &Tensor<i32>,
        caches: &mut [KvCache],
    ) -> Result<Tensor<f32>, AutodiffError> {
        let pos0 = caches[0].seq_len();
        let tape = fandhe_ai::tape();
        let table: Vec<f32> = (0..V * 4).map(|i| (i % 5) as f32 * 0.1).collect();
        let emb = tape.var(&Tensor::new(table, &[V, 4]).unwrap());
        let x = emb.embedding(new_ids, None)?;
        tape.stateful_attention_forward_with_cache(&self.sa, &x, &mut caches[0])?;
        let l = new_ids.shape()[new_ids.shape().len() - 1];
        let mut out = vec![0.0f32; l * V];
        for (i, &tok) in new_ids.as_slice().unwrap().iter().enumerate() {
            out[i * V + (self.mul * tok as usize + pos0 + i + 1) % V] = 1.0;
        }
        Ok(Tensor::new(out, &[1, l, V]).unwrap())
    }
}

let make = |mul, seed| Lm {
    sa: StatefulAttention::from_config(&MultiheadAttentionConfig::new(4, 2), seed).unwrap(),
    mul,
};
let target = make(3, 1);
// 規則の違う draft（棄却が起きる）。
let draft = make(2, 2);

let prompt = Tensor::<i32>::new(vec![0], &[1]).unwrap();
let cfg = GenerateConfig::new(6, SamplingStrategy::Greedy);
let out = generate_speculative(&target, &draft, &prompt, &cfg, &SpeculativeConfig::new(2)).unwrap();
// 出力は target 単独の `generate` と token 列が一致する。
let alone = generate(&target, &prompt, &cfg).unwrap();
assert_eq!(out.as_slice().unwrap(), alone.as_slice().unwrap());
assert_eq!(out.as_slice().unwrap().len(), 6);
```

```rust
pub fn generate_speculative<T, D>(
    target: &T,
    draft: &D,
    input_ids: &Tensor<i32>,
    config: &GenerateConfig,
    spec: &SpeculativeConfig,
) -> Result<Tensor<i32>, AutodiffError>
where
    T: AutoregressiveModel + ?Sized,
    D: AutoregressiveModel + ?Sized,
```

## Options / Props

`SpeculativeConfig`（`#[non_exhaustive]`、`Debug, Clone, PartialEq`）:

| Name | Type | Description |
|------|------|-------------|
| `k` | `usize` | draft が 1 ラウンドで先読みするトークン数（1 以上）。残り長が短いときは `R - 1` に丸められる |

| Method | Description |
|--------|-------------|
| `SpeculativeConfig::new(k: usize) -> SpeculativeConfig` | 先読み長 `k` で構築（`k == 0` の拒否は `generate_speculative` の入口検査） |

## Notes

- B = 1 に限る。Greedy は token 列一致、TopK / Temperature は speculative sampling（同一シードでも `generate` と token 列は一致しない。保証は受理棄却と残差再抽出による target 分布の保存という構成上のもので、統計検定は契約外）。再現性は同一実行環境に限る（プラットフォーム間の bit 一致は保証しない）。入力は `[T]` / `[1, T]`。受理統計は返さない。`draft == target`（同一インスタンス可）でも動作する。RNG は `Generator::new(config.seed)` の独立インスタンスのみでグローバル RNG は消費しない。
- 先読み長 `k` は残り長 `R` に応じて丸められる（`R >= 2` は `min(k, R - 1)`、`R == 1` は 1 step decode）。
- `target` または `draft` の `num_kv_layers() == 0` は `Err` で拒否する（fail-closed）。
- 対象モデルの契約: `num_kv_layers() > 0` で、生成状態を渡された `caches` だけに持つモデルが対象（`stateful_attention_forward_with_cache` で `caches[i]` を進める形を含み、棄却時の巻き戻し〈clone 保存・復元・受理分の再 forward〉は内部で行われる）。内部状態保持型（`RefCell<StatefulAttention>` 等）は `num_kv_layers()` の値によらず対象外で出力を保証しない。型でも実行時でも検出できないため、利用者が保証する。`RefCell<StatefulAttention>` 形は `num_kv_layers() == 0` となり入口で拒否される。
- 入口検査の順序（最初に該当した条件で `Err`）: config 矛盾、`spec.k == 0`、rank が 1/2 以外、`T == 0`、`B != 1`、`max_length < T`、出力バッファのオーバーフロー、`target` または `draft` の `num_kv_layers() == 0`。以降は forward の shape 不整合・語彙サイズ不一致・KV キャッシュ長不整合・logits の非有限値・モデルのエラー伝播で `Err`。サンプリング時は加えて `q(x) <= 0`・確率重みの総和 0 / 非有限・残差和 0 / 非有限・`RngError` を `InvalidArgument` で返す。
- 隠れ状態を `caches` の外に持つモデル（RNN・SSM 等）は `StatefulAutoregressiveModel` を実装して `generate_speculative_stateful` を使う（stateful.md）。
- Migration (v0.11 → v0.14): 0.11.0 の本ページは Greedy 限定（Greedy 以外は `Err`）で、facade の公開面だけでは `caches` を進めるモデルを組めず fail-closed 契約のみを示していた。0.14.0 は TopK / Temperature を受け付け、`Tape::stateful_attention_forward_with_cache` で KV 付きモデルを組める
- 乱数は独立した `Generator`（xorshift64*）のみで非暗号。生成 token をセキュリティ用途に使わないこと。
- AutoregressiveModel を実装したローカルモデル上の処理であり、LLM API（openai-api-core / anthropic-api-core / hermes-agent）とは無関係。
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/inference/fn.generate_speculative.html（0.14.0, 取得日 2026-11-14）。成功例と契約文はタグ v0.14.0 の `src/inference/mod.rs` rustdoc と `fandhe-ai-autodiff` 0.14.0 の `generate/speculative.rs`

## Related

- [generate.md](./generate.md)
- [batch-scheduler.md](./batch-scheduler.md)
- [stateful.md](./stateful.md)

---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/inference/fn.generate.html
---

# inference::generate（自己回帰生成ループ）

`AutoregressiveModel` を実装したモデルに対し、token id 列を `max_length` まで自己回帰的に生成する。`fandhe_ai_autodiff::generate` の `AutoregressiveModel` / `GenerateConfig` / `SamplingStrategy` / `generate` を純再エクスポートした 4 名（facade 独自の newtype・`Tape::generate`・`Sequential::generate` は無い）。

## Signature / Usage

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

let prompt = Tensor::<i32>::new(vec![0], &[1]).unwrap();
let cfg = GenerateConfig::new(5, SamplingStrategy::Greedy);
let out = generate(&Table, &prompt, &cfg).unwrap();
assert_eq!(out.shape(), &[5]);
assert_eq!(out.as_slice().unwrap(), &[0, 1, 2, 3, 0]);
```

```rust
pub fn generate<M: AutoregressiveModel + ?Sized>(
    model: &M,
    input_ids: &Tensor<i32>,
    config: &GenerateConfig,
) -> Result<Tensor<i32>, AutodiffError>

pub trait AutoregressiveModel {
    fn num_kv_layers(&self) -> usize;
    fn forward_step(
        &self,
        new_ids: &Tensor<i32>,
        caches: &mut [KvCache],
    ) -> Result<Tensor<f32>, AutodiffError>;
}
```

## Options / Props

`GenerateConfig`（`#[non_exhaustive]`、フィールドは pub）:

| Name | Type | Description |
|------|------|-------------|
| `max_length` | `usize` | prompt を含む生成後の全長 |
| `temperature` | `f32` | 温度。`Greedy` では常に `1.0`（未使用） |
| `top_k` | `Option<usize>` | top-k（上位 k 件）サンプリングの `k`。`Greedy` / `Temperature` では常に `None` |
| `strategy` | `SamplingStrategy` | サンプリング戦略 |
| `seed` | `u64` | 乱数シード（既定 `0`） |

| Method | Description |
|--------|-------------|
| `GenerateConfig::new(max_length: usize, strategy: SamplingStrategy) -> GenerateConfig` | `strategy` から `temperature` / `top_k` を導出して構築（`seed` は `0`） |
| `with_temperature(self, temperature: f32) -> GenerateConfig` | 温度を上書き（`TopK` + 温度の組み合わせ用。`Greedy` / `Temperature` に使うと検証で `Err`） |
| `with_seed(self, seed: u64) -> GenerateConfig` | シードを上書き |

`SamplingStrategy`（`#[non_exhaustive]`）:

| Variant | Description |
|---------|-------------|
| `Greedy` | 各ステップで最大 logit の token を決定的に選ぶ。RNG を消費しない |
| `TopK(usize)` | 上位 `k` 個のみ残し温度付き softmax で抽選。`k == 0` または `k > vocab_size` は拒否 |
| `Temperature(f32)` | 全 vocab に対する温度付き softmax で抽選。非有限・非正は拒否 |

## Notes

- AutoregressiveModel を実装したローカルモデル上の生成ループであり、LLM API（openai-api-core / anthropic-api-core / hermes-agent）とは無関係。
- 入出力は token id 列（`Tensor<i32>`）のみ。トークナイザは対象外。入力は rank 1（`[T]`）または rank 2（`[B, T]`）。
- EOS による早期停止はなく、常に `max_length` まで生成する。`top_k > vocab` は拒否する。
- `GenerateConfig` の検証（`validate`）は非公開だが `generate` の入口で必ず呼ばれる。pub フィールドを書き換えて矛盾させた設定は `Err`。
- 乱数は独立した `Generator`（xorshift64*）のみを使い、グローバル RNG は消費しない。暗号学的に安全ではないため、生成 token をセキュリティ用途に使わないこと。
- エラー型は既存の `AutodiffError` を流用する。`model.forward_step` が返すエラーはそのまま伝播する。
- 既知の制限（未決事項）: `forward_step` へ渡される `caches: &mut [KvCache]` へ facade のみで書き込む手段はない（`KvCache` に外部からテンソルを入れるセッターは無く、`MultiheadAttention::forward_with_cache` は非公開）。KV キャッシュを使うモデルは `RefCell<nn::kv_cache::StatefulAttention>` を内部に持ち、`tape()` で作った `Tape` の `stateful_attention_forward` を呼ぶ形になる（渡された `caches` は使わず `num_kv_layers()` は 0 を返す）。prefill 前のキャッシュ reset は利用者の責務。
- 実体は fandhe-ai-autodiff 0.11.0 の `generate` モジュール。

## Related

- [speculative.md](./speculative.md)
- [batch-scheduler.md](./batch-scheduler.md)

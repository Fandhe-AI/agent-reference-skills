---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/inference/fn.generate_speculative.html
---

# inference::generate_speculative / SpeculativeConfig

target と draft の 2 モデルによる greedy 版 speculative decoding。`fandhe_ai_autodiff::generate::speculative` の `SpeculativeConfig` / `generate_speculative` を純再エクスポートしたもの（`fandhe-ai =0.10.0` に対しては追加のみ）。

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

// サンプリング版は公開しない（Greedy 以外は `Err`）。
let topk = GenerateConfig::new(5, SamplingStrategy::TopK(2));
let r = generate_speculative(&Table, &Table, &prompt, &topk, &spec);
assert!(matches!(r, Err(AutodiffError::InvalidArgument(_))));
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

- Greedy・B = 1 に限る。Greedy 以外は `Err`（サンプリング版は公開しない）。入力は `[T]` / `[1, T]`。受理統計は返さない。`draft == target`（同一インスタンス可）でも動作する。
- 先読み長 `k` は残り長 `R` に応じて丸められる（`R >= 2` は `min(k, R - 1)`、`R == 1` は 1 step decode）。
- `target` または `draft` の `num_kv_layers() == 0` は `Err` で拒否する（fail-closed）。
- 対象モデルの契約: 生成状態を渡された `caches` だけに持つモデルが対象。内部状態保持型（`RefCell<StatefulAttention>` 等）は `num_kv_layers()` の値によらず対象外で出力を保証しない。型でも実行時でも検出できないため、利用者が保証する。
- 入口検査の順序（最初に該当した条件で `Err`）: config 矛盾、strategy が Greedy 以外、`spec.k == 0`、rank が 1/2 以外、`T == 0`、`B != 1`、`max_length < T`、出力バッファのオーバーフロー、`num_kv_layers() == 0`。以降は forward の shape 不整合・語彙サイズ不一致・KV キャッシュ長不整合・logits の非有限値・モデルのエラー伝播で `Err`。
- 既知の制限（保留論点 3）: facade だけの利用者は `forward_with_cache` を使えず `KvCache` にもセッターが無い。そのため `caches` を正しく進めるモデルを facade の公開面だけで組む経路はなく、上の doctest は fail-closed 契約のみを示す（成功経路は上流リポジトリの結合テストが担う）。
- 乱数は独立した `Generator`（xorshift64*）のみで非暗号。生成 token をセキュリティ用途に使わないこと。
- AutoregressiveModel を実装したローカルモデル上の処理であり、LLM API（openai-api-core / anthropic-api-core / hermes-agent）とは無関係。

## Related

- [generate.md](./generate.md)
- [batch-scheduler.md](./batch-scheduler.md)

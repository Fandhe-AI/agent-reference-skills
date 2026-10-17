---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/kv_cache/index.html
---

# nn::kv_cache（KvCache / StatefulAttention / MultiheadAttentionConfig）

KV キャッシュ付き self-attention。`KvCache`・`StatefulAttention`・`MultiheadAttentionConfig` の 3 名を `fandhe_ai_autodiff::nn` から純再エクスポートする。forward の入口は `Tape::stateful_attention_forward`。

## Signature / Usage

```rust
use fandhe_ai::nn::kv_cache::{MultiheadAttentionConfig, StatefulAttention};
use fandhe_ai::Tensor;

let tape = fandhe_ai::tape();
let mut sa = StatefulAttention::from_config(&MultiheadAttentionConfig::new(4, 2), 0).unwrap();

// prefill: x は [B=1, L=3, E=4]
let x = Tensor::new((0..12).map(|i| i as f32 * 0.1).collect::<Vec<f32>>(), &[1, 3, 4]).unwrap();
let y = tape.stateful_attention_forward(&mut sa, &tape.var(&x)).unwrap();
assert_eq!(y.to_tensor().shape(), &[1usize, 3, 4]);
assert_eq!(sa.seq_len(), 3);

// decode: 1 トークン
let t = Tensor::new(vec![0.1f32, 0.2, 0.3, 0.4], &[1, 1, 4]).unwrap();
let y = tape.stateful_attention_forward(&mut sa, &tape.var(&t)).unwrap();
assert_eq!(y.to_tensor().shape(), &[1usize, 1, 4]);
assert_eq!(sa.seq_len(), 4);
```

## Options / Props

`Tape` 入口:

| Name | Signature | Description |
| --- | --- | --- |
| `stateful_attention_forward` | `fn stateful_attention_forward<'t>(&'t self, sa: &mut StatefulAttention, x_new: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | `x_new: [B, L_new, E]`。rank・`E`・`B` の不一致、別 `Tape` の `Var`（`TapeMismatch`）等で `AutodiffError` |

`MultiheadAttentionConfig`（ビルダー。`Default` は無く `new` が唯一のコンストラクタ）:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `fn new(embed_dim: usize, num_heads: usize) -> MultiheadAttentionConfig` | 既定: `bias = true`・`batch_first = true`（PyTorch 既定 `False` とは異なる）・`kdim` / `vdim = None`（= `embed_dim`） |
| `with_bias` | `fn with_bias(self, bias: bool) -> Self` | q/k/v/out projection の bias 有無 |
| `with_batch_first` | `fn with_batch_first(self, batch_first: bool) -> Self` | `true`: `[B, Len, *]` / `false`: `[Len, B, *]` |
| `with_kdim` / `with_vdim` | `fn with_kdim(self, kdim: usize) -> Self` | `k_proj` / `v_proj` の in_features |
| getter | `embed_dim()` / `num_heads()` / `bias()` / `batch_first()` / `kdim()` / `vdim()` | 設定値（`kdim` / `vdim` は未設定なら `embed_dim` へ解決） |

`StatefulAttention`:

| Name | Signature | Description |
| --- | --- | --- |
| `from_config` | `fn from_config(config: &MultiheadAttentionConfig, seed: u64) -> Result<StatefulAttention, AutodiffError>` | 空キャッシュで構築（facade の構築入口）。`batch_first=false`・`kdim` / `vdim != embed_dim` は `InvalidArgument` |
| `forward` | `fn forward<'t>(&mut self, tape: &'t Tape, x_new: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | `q = k = v = x_new` の self-attention（facade では `Tape::stateful_attention_forward` 経由） |
| `reset_cache` | `fn reset_cache(&mut self)` | キャッシュを空に戻す |
| `cache` | `fn cache(&self) -> &KvCache` | 保持キャッシュへの参照 |
| `seq_len` | `fn seq_len(&self) -> usize` | キャッシュ済み系列長 |

`KvCache`（`Default` / `Clone`。射影済み K/V `[B, S_cached, E]` をホスト `Tensor<f32>` で保持）:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `fn new() -> KvCache` | 空キャッシュ |
| `is_empty` | `fn is_empty(&self) -> bool` | 空か |
| `seq_len` | `fn seq_len(&self) -> usize` | `S_cached`（空なら 0） |
| `batch` / `embed_dim` | `fn batch(&self) -> Option<usize>` | 空なら `None` |
| `clear` | `fn clear(&mut self)` | 空に戻す |
| `k` / `v` | `fn k(&self) -> Option<&Tensor<f32>>` | キャッシュ済み K / V への参照 |

## Notes

- mask 規則（キャッシュ状態から内部で決定）: (a) キャッシュ空かつ `L_new > 1` は causal、(b) `L_new == 1` は全キャッシュを参照、(c) キャッシュ非空かつ `L_new > 1` は offset 付き causal。`is_causal` / `attn_mask` 引数は持たない
- 更新は原子的で、`Err` のときキャッシュは呼び出し前から変化しない
- `StatefulAttention` は `Module` を実装しない（`Module::forward` は `&self` で状態を持たない前提のため）。`compat::Sequential` の `Var → Var` 平坦鎖とは合わず、`Sequential::add_*` は設けない
- 公開しないもの: `MultiheadAttention`・`MultiheadAttentionVars`・`forward_with_cache`。MHA 本体は引き続き `Sequential::add_*` 経由のみ
- 既知の制限: `StatefulAttention::new(mha)` / `mha()` は facade から名指しできない型を扱うメソッドとして残る。self-attention 限定で `batch_first=true`・`kdim = vdim = embed_dim` のみ対応。padding 用の追加 mask は非対応。デバイス常駐キャッシュは対象外
- 過去ステップへ勾配は流れない（キャッシュは勾配なしの葉。現ステップの射影パラメータへは流れる）。decode ループでは `Tape` の再作成か reset を推奨する（ステップごとに `Op::Concat` ノードが積まれるため）
- `clone()` は `Arc` 共有のため実データをコピーしない

## Related

- [transformer.md](./transformer.md)
- [tape.md](../api/tape.md)

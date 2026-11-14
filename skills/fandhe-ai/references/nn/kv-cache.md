---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/nn/kv_cache/index.html
---

# nn::kv_cache（KvCache / StatefulAttention / MultiheadAttentionConfig / PagedKvCache / PagedKvCacheConfig）

KV キャッシュ付き self-attention。`KvCache`・`StatefulAttention`・`MultiheadAttentionConfig`・`PagedKvCache`・`PagedKvCacheConfig` の 5 名を `fandhe_ai_autodiff::nn` から純再エクスポートする。forward の入口は `Tape::stateful_attention_forward`（内部キャッシュ）・`Tape::stateful_attention_forward_with_cache`（外部 `KvCache`）・`Tape::paged_attention_forward`（デバイス常駐ページ化キャッシュ）。

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

外部キャッシュ版（rustdoc の例。`sa` 自身のキャッシュは進まない）。

```rust
use fandhe_ai::nn::kv_cache::{KvCache, MultiheadAttentionConfig, StatefulAttention};
use fandhe_ai::Tensor;

let tape = fandhe_ai::tape();
let sa = StatefulAttention::from_config(&MultiheadAttentionConfig::new(4, 2), 0).unwrap();
let mut cache = KvCache::new();
let other = KvCache::new();

// prefill: x は [B=1, L=3, E=4]
let x = Tensor::new((0..12).map(|i| i as f32 * 0.1).collect::<Vec<f32>>(), &[1, 3, 4]).unwrap();
tape.stateful_attention_forward_with_cache(&sa, &tape.var(&x), &mut cache).unwrap();
assert_eq!(cache.seq_len(), 3);

// decode: 1 トークン
let t = Tensor::new(vec![0.1f32, 0.2, 0.3, 0.4], &[1, 1, 4]).unwrap();
tape.stateful_attention_forward_with_cache(&sa, &tape.var(&t), &mut cache).unwrap();
assert_eq!(cache.seq_len(), 4);

// sa 自身と別のキャッシュは進まない
assert_eq!(sa.seq_len(), 0);
assert_eq!(other.seq_len(), 0);
```

デバイス常駐ページ化キャッシュ（K-3。rustdoc の例）。

```rust
use fandhe_ai::nn::kv_cache::{MultiheadAttentionConfig, PagedKvCacheConfig, StatefulAttention};
use fandhe_ai::Tensor;

let tape = fandhe_ai::tape();
let sa = StatefulAttention::from_config(&MultiheadAttentionConfig::new(4, 2), 0).unwrap();
let mut cache = tape.new_paged_kv_cache(PagedKvCacheConfig::new(2, 8, 4).unwrap()).unwrap();

// prefill: x は [B=1, L=3, E=4]
let x = Tensor::new((0..12).map(|i| i as f32 * 0.1).collect::<Vec<f32>>(), &[1, 3, 4]).unwrap();
let y = tape.paged_attention_forward(&sa, &x, &mut cache).unwrap();
assert_eq!(y.shape(), &[1usize, 3, 4]);
assert_eq!(cache.seq_len(), 3);

// decode: 1 トークン
let t = Tensor::new(vec![0.1f32, 0.2, 0.3, 0.4], &[1, 1, 4]).unwrap();
let y = tape.paged_attention_forward(&sa, &t, &mut cache).unwrap();
assert_eq!(y.shape(), &[1usize, 1, 4]);
assert_eq!(cache.seq_len(), 4);
assert_eq!(sa.seq_len(), 0);
```

## Options / Props

`Tape` 入口:

| Name | Signature | Description |
| --- | --- | --- |
| `stateful_attention_forward` | `fn stateful_attention_forward<'t>(&'t self, sa: &mut StatefulAttention, x_new: &Var<'t>) -> Result<Var<'t>, AutodiffError>` | `x_new: [B, L_new, E]`。rank・`E`・`B` の不一致、別 `Tape` の `Var`（`TapeMismatch`）等で `AutodiffError` |
| `stateful_attention_forward_with_cache` | `fn stateful_attention_forward_with_cache<'t>(&'t self, sa: &StatefulAttention, x_new: &Var<'t>, cache: &mut KvCache) -> Result<Var<'t>, AutodiffError>` | 外部キャッシュ版。`sa` の内部キャッシュは変えず、渡された `cache` を進める。`AutoregressiveModel::forward_step` の中で `caches[i]` を進める用途向け。`Err` のとき `cache` は不変 |
| `new_paged_kv_cache` | `fn new_paged_kv_cache(&self, config: PagedKvCacheConfig) -> Result<PagedKvCache, AutodiffError>` | デバイス常駐ページ化 KV キャッシュ（K-3）をこの `Tape` のバックエンドへ構築。プールは `max_blocks · block_size · embed_dim` ぶん K / V 各 1 本を確保。バックエンドが `MemoryOps` を持たないと `Unsupported` |
| `paged_attention_forward` | `fn paged_attention_forward(&self, sa: &StatefulAttention, x_new: &Tensor<f32>, cache: &mut PagedKvCache) -> Result<Tensor<f32>, AutodiffError>` | `x_new`（`[B, L_new, E]`）を射影して `cache` へ追記し、キャッシュ全体への attention と `out_proj` を適用した `[B, L_new, E]` を返す。推論専用（入出力は非追跡の `Tensor`）。`sa` の内部キャッシュは変えない。`Err` のとき `cache` の論理状態は不変（poison は戻らない） |

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
| `valid_len` | `fn valid_len(&self, row: usize) -> Option<usize>` | 行 `row` の有効長（padding を除いた系列長）。空キャッシュ・`row >= B` なら `None`。padding なしなら全行 `seq_len` と等しい |

`PagedKvCacheConfig`（`Debug, Clone, Copy, PartialEq, Eq`。`new` が唯一の構築経路で検査を通った値のみ保持。確保はしない）:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `fn new(block_size: usize, max_blocks: usize, embed_dim: usize) -> Result<PagedKvCacheConfig, AutodiffError>` | `block_size` は 2 のべき乗で 1〜256、`max_blocks` は 1 以上 `u32::MAX` 以下、`embed_dim` は 1 以上、K / V 2 本ぶんのプールのバイト数が `isize::MAX` 以下 |
| `block_size` / `max_blocks` / `embed_dim` | `fn block_size(&self) -> usize` | 設定値のゲッター |

`PagedKvCache`（1 層ぶんの値型。多層は `Vec<PagedKvCache>`。`Clone` は実装しない）:

| Name | Signature | Description |
| --- | --- | --- |
| `config` | `fn config(&self) -> &PagedKvCacheConfig` | 設定 |
| `device` | `fn device(&self) -> Device` | 常駐するデバイス |
| `seq_len` | `fn seq_len(&self) -> usize` | 有効系列長（空なら 0） |
| `batch` | `fn batch(&self) -> Option<usize>` | バッチサイズ `B`（最初の追記で確定。空なら `None`） |
| `num_used_blocks` / `num_free_blocks` | `fn num_used_blocks(&self) -> usize` | 使用中（全行合計）/ 空きのブロック数 |
| `is_poisoned` | `fn is_poisoned(&self) -> bool` | 以前の失敗でプールの内容が信頼できない状態か。回復は新しい `PagedKvCache` の構築のみ |
| `rewind_to` | `fn rewind_to(&mut self, new_len: usize) -> Result<(), AutodiffError>` | 有効長を `new_len` へ縮め、余る末尾ブロックを空きへ返す。`new_len > seq_len` は `Err`（状態不変） |
| `clear` | `fn clear(&mut self)` | すべてのブロックを空きへ戻し `B` を未確定に戻す |

## Notes

- mask 規則（キャッシュ状態から内部で決定）: (a) キャッシュ空かつ `L_new > 1` は causal、(b) `L_new == 1` は全キャッシュを参照、(c) キャッシュ非空かつ `L_new > 1` は offset 付き causal。`is_causal` / `attn_mask` 引数は持たない
- 更新は原子的で、`Err` のときキャッシュは呼び出し前から変化しない
- `StatefulAttention` は `Module` を実装しない（`Module::forward` は `&self` で状態を持たない前提のため）。`compat::Sequential` の `Var → Var` 平坦鎖とは合わず、`Sequential::add_*` は設けない
- 公開しないもの: `MultiheadAttention`・`MultiheadAttentionVars`・`forward_with_cache`。MHA 本体は引き続き `Sequential::add_*` 経由のみ
- 既知の制限: `StatefulAttention::new(mha)` / `mha()` は facade から名指しできない型を扱うメソッドとして残る。self-attention 限定で `batch_first=true`・`kdim = vdim = embed_dim` のみ対応。padding 付き（可変長）キャッシュは crate 内部（`BatchScheduler::step_batched` の束ねる経路）だけが作り、公開面で使えるのは `valid_len` の参照だけで任意の mask・`Tensor` を入れる経路はない
- `KvCache` の公開メソッド追加は `valid_len` の 1 件のみで、巻き戻しフックは公開しない。外部キャッシュ版（`stateful_attention_forward_with_cache`）は `sa` を `&` で受け、`sa` の内部キャッシュに触れない。facade だけで KV 付きモデルを組むときは `RefCell<StatefulAttention>` 形より外部キャッシュ版を推奨する
- `PagedKvCache`（K-3）: 入口は `Tape::new_paged_kv_cache`（構築）と `Tape::paged_attention_forward`（追記 + attention + `out_proj`）で、どちらも `&self.0` を渡すだけの薄い委譲。`PagedKvCache::new` / `append` / `attention` は生の `Tape` を取るため facade から名指しできない。mask は `j <= s_prev + i`（K-1 の prefill causal・decode mask なし・offset causal と同値）。同期 1 回はキャッシュ操作（追記 + attention）に限る不変条件で、q/k/v と `out_proj` の射影は `Tape` 上の通常の演算（CUDA / Metal では演算ごとの実行・転送を伴う）。K-1 と同じく呼び出しごとに葉とノードを積むので decode ループでは `Tape::reset` か再作成を推奨。`Unsupported` のとき K-1 へフォールバックしない。`seq_lens` は全行同長（可変長は未対応）。`generate` / `BatchScheduler` には結線しない。公開しないもの: `PagedKvCacheReference`・`paged_attention_reference`・`DEFAULT_BLOCK_SIZE`
- Migration (v0.11 → v0.14): 0.11.0 の本ページは `KvCache` / `StatefulAttention` / `MultiheadAttentionConfig` の 3 名で、デバイス常駐キャッシュは対象外としていた。0.14.0 は `PagedKvCache` / `PagedKvCacheConfig`・`Tape::stateful_attention_forward_with_cache` / `new_paged_kv_cache` / `paged_attention_forward`・`KvCache::valid_len` を追加
- 過去ステップへ勾配は流れない（キャッシュは勾配なしの葉。現ステップの射影パラメータへは流れる）。decode ループでは `Tape` の再作成か reset を推奨する（ステップごとに `Op::Concat` ノードが積まれるため）
- `clone()` は `Arc` 共有のため実データをコピーしない
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/nn/kv_cache/index.html（0.14.0, 取得日 2026-11-14）。Tape 入口と PagedKvCache の挙動はタグ v0.14.0 の `src/lib.rs`・`src/nn/kv_cache.rs` rustdoc と `fandhe-ai-autodiff` 0.14.0 の `nn/paged_kv*.rs`

## Related

- [transformer.md](./transformer.md)
- [tape.md](../api/tape.md)

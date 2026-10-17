---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/struct.Transformer.html
---

# nn::Transformer / TransformerConfig / TransformerDecoderLayer

PyTorch `nn.Transformer`（encoder-decoder 全体）と `nn.TransformerDecoderLayer` 相当の型。3 型は `fandhe_ai_autodiff::nn` から型として再エクスポートされ、構築と学習は `compat::Sequential::add_transformer` / `add_transformer_decoder_layer` 経由で行う。

## Signature / Usage

```rust
use fandhe_ai::compat::Sequential;
use fandhe_ai::nn::TransformerConfig;

// 構築は compat::Sequential 経由（活性化は relu のみ）
let cfg = TransformerConfig::new(/* d_model */ 8, /* num_heads */ 2)
    .with_num_encoder_layers(2)
    .with_num_decoder_layers(2)
    .with_dim_feedforward(16);
let model = Sequential::new().add_transformer(cfg, /* seed */ 0)?;

// decoder 1 層
let dec = Sequential::new().add_transformer_decoder_layer(8, 2, 16, 0)?;
```

`compat::Sequential` 側のシグネチャ（原本 `compat/sequential.rs`）:

```rust
pub fn add_transformer(
    mut self,
    config: TransformerConfig,
    seed: u64,
) -> Result<Self, AutodiffError>

pub fn add_transformer_decoder_layer(
    mut self,
    d_model: usize,
    num_heads: usize,
    dim_feedforward: usize,
    seed: u64,
) -> Result<Self, AutodiffError>
```

## Options / Props

`TransformerConfig`（`#[non_exhaustive]`、ビルダー）:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `fn new(d_model: usize, num_heads: usize) -> TransformerConfig` | 既定: `num_encoder_layers=6`・`num_decoder_layers=6`・`dim_feedforward=2048`・`activation=Relu`・`eps=1e-5`（LayerNorm 既定） |
| `with_num_encoder_layers` | `fn with_num_encoder_layers(self, n: usize) -> TransformerConfig` | encoder 層数 |
| `with_num_decoder_layers` | `fn with_num_decoder_layers(self, n: usize) -> TransformerConfig` | decoder 層数 |
| `with_dim_feedforward` | `fn with_dim_feedforward(self, n: usize) -> TransformerConfig` | FFN 中間次元 |
| `with_activation` | `fn with_activation(self, activation: FeedForwardActivation) -> TransformerConfig` | FFN 活性化（`FeedForwardActivation` は facade 未公開） |
| `with_eps` | `fn with_eps(self, eps: f32) -> TransformerConfig` | LayerNorm の `eps` |
| getter | `d_model()` / `num_heads()` / `num_encoder_layers()` / `num_decoder_layers()` / `dim_feedforward()` / `activation()` / `eps()` | 設定値 |

`Transformer`:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `fn new(config: &TransformerConfig, seed: u64) -> Result<Self, AutodiffError>` | 決定的シードで構築。層数 0 は `InvalidArgument` |
| accessor | `d_model()` / `num_encoder_layers()` / `num_decoder_layers()` / `encoder_layers()` / `encoder_norm()` / `decoder_layers()` / `decoder_norm()` | 構成要素への参照 |
| `bind` | `fn bind<'t>(&self, tape: &'t Tape) -> TransformerVars<'t>` | 全層のパラメータを葉ノードとして登録（毎ステップ作り直す） |

`TransformerVars::forward`（`src: [B, S, E]`、`tgt: [B, T, E]` → `[B, T, E]`）:

```rust
pub fn forward(
    &self,
    src: &Var<'t>,
    tgt: &Var<'t>,
    src_mask: Option<&Tensor<bool>>,
    tgt_mask: Option<&Tensor<bool>>,
    memory_mask: Option<&Tensor<bool>>,
    tgt_is_causal: bool,
) -> Result<Var<'t>, AutodiffError>
```

`TransformerDecoderLayer`（子層: `self_attn` / `multihead_attn` / `linear1` / `linear2` / `norm1` / `norm2` / `norm3`）:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `fn new(d_model: usize, num_heads: usize, dim_feedforward: usize, activation: FeedForwardActivation, eps: f32, seed: u64) -> Result<Self, AutodiffError>` | `bias=true` 固定。`d_model == 0` / `dim_feedforward == 0` は `InvalidArgument` |
| `bind` | `fn bind<'t>(&self, tape: &'t Tape) -> TransformerDecoderLayerVars<'t>` | パラメータを葉ノード登録 |

`TransformerDecoderLayerVars::forward`: `fn forward(&self, tgt: &Var<'t>, memory: &Var<'t>, tgt_mask: Option<&Tensor<bool>>, memory_mask: Option<&Tensor<bool>>, tgt_is_causal: bool, memory_is_causal: bool) -> Result<Var<'t>, AutodiffError>`（`tgt: [B, L, E]`、`memory: [B, S, E]` → `[B, L, E]`）。

## Notes

- `TransformerDecoderLayer::new` は `FeedForwardActivation`（facade 未公開）を引数に取るため facade からは構築できない。`Transformer::new(&TransformerConfig, seed)` は facade 公開の `TransformerConfig`（既定 `Relu`）で呼べるが、`bind` は内部クレートの `fandhe_ai_autodiff::Tape` を要求し、facade の `Tape` は `pub(crate)` の newtype で委譲メソッドも無いため、facade 単体では forward・学習を実行できない。構築と学習は `compat::Sequential::add_transformer` / `add_transformer_decoder_layer` 経由で行う
- `add_transformer` は活性化が relu 以外だと `InvalidArgument`（保存 manifest に活性化を持たせないため）。`add_transformer_decoder_layer` は `FeedForwardActivation::Relu` と `LAYER_NORM_DEFAULT_EPS` で構築する
- `Transformer` の構成は PyTorch `nn.Transformer` と同じ: encoder 層群 → `encoder_norm` → `memory` → decoder 層群（`tgt_mask` / `memory_mask` / `tgt_is_causal`、`memory_is_causal = false` 固定）→ `decoder_norm`
- `Module::forward`（autodiff 側）は `src = tgt = input`・mask なし・非 causal を表す。`forward_host` は非対応（`supports_forward_host` は `false`）
- パラメータ命名: `encoder.layers.{i}.*` → `encoder.norm.*` → `decoder.layers.{i}.*` → `decoder.norm.*`
- decoder 層は post-norm 固定（PyTorch 既定 `norm_first=False` と同じ）: `x1 = norm1(tgt + self_attn(tgt, tgt, tgt))` → `x2 = norm2(x1 + multihead_attn(x1, memory, memory))` → `y = norm3(x2 + ffn(x2))`
- mask 極性の注意: `tgt_mask` / `memory_mask` は `true` = attend。PyTorch `nn.TransformerDecoderLayer` の bool mask（`True` = blocked）とは極性が逆
- 対象外: pre-norm・Dropout 結線・`batch_first=False`・`*_key_padding_mask`・`src_is_causal` / `memory_is_causal` 引数（`Transformer`）・カスタム encoder / decoder の注入・KV キャッシュ（decoder 層。KV キャッシュは `kv-cache.md` の `StatefulAttention`）・中間コンテナ型（`TransformerEncoder` / `TransformerDecoder`）
- `Transformer` の `forward` は `src` / `tgt` が rank 3 かつ最終軸 `== d_model` でない場合、および層配列が空の場合にエラー（fail-closed）

## Related

- [kv-cache.md](./kv-cache.md)
- [module.md](./module.md)
- [compat-sequential.md](../api/compat-sequential.md)

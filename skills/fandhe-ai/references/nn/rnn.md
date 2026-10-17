---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/rnn/index.html
---

# nn::rnn（Rnn / Lstm / Gru / Stacked* / RnnConfig / PackedSequence）

RNN / LSTM / GRU の Sequence レベル API（`fandhe_ai_autodiff::nn` からの純再エクスポート）。単層の `Rnn` / `Lstm` / `Gru`、多層・双方向・層間 dropout 版の `StackedRnn` / `StackedLstm` / `StackedGru`（`RnnConfig`）、可変長系列の `PackedSequence` と `pack_padded_sequence` 系を提供する。

## Signature / Usage

`forward_seq` の入口は `Tape` の委譲メソッド（`Rnn::forward_seq` は生の autodiff `Tape` を取るため facade からは直接呼べない）。

```rust
use fandhe_ai::nn::rnn::Rnn;
use fandhe_ai::Tensor;

let tape = fandhe_ai::tape();
let rnn = Rnn::new(/* input_size */ 3, /* hidden_size */ 4, /* bias */ true, /* seed */ 0)
    .unwrap();
// x: [T=2, B=1, D=3]
let x = Tensor::new(vec![0.1f32, 0.2, 0.3, 0.4, 0.5, 0.6], &[2, 1, 3]).unwrap();
let out = tape.rnn_forward_seq(&rnn, &x, None).unwrap();

let loss = out.outputs.last().unwrap().sum(None).unwrap();
let grads = tape.backward(&loss).unwrap();
// 学習に使ったパラメータの勾配は `out.params` 経由で取得する。
assert!(grads.get(&out.params.weight_ih).unwrap().is_some());
```

2 層・双方向の `StackedLstm`:

```rust
use fandhe_ai::nn::rnn::{RnnConfig, StackedLstm};

let cfg = RnnConfig::new().with_num_layers(2).with_bidirectional(true);
let lstm = StackedLstm::new(3, 4, true, 0, cfg).unwrap();
let out = tape.stacked_lstm_forward_seq(&lstm, &x, None, None).unwrap();
// h_n は num_layers * num_directions = 4 本。出力は [B, 2H]。
assert_eq!(out.h_n.len(), 4);
assert_eq!(out.outputs[0].to_tensor().shape(), &[1usize, 8]);
```

可変長系列（packed）:

```rust
use fandhe_ai::nn::rnn::{Rnn, pack_padded_sequence, pad_packed_sequence, rnn_forward_packed};

let rnn = Rnn::new(2, 3, true, 0).unwrap();
// padded 入力 [T=3, B=2, D=2]。系列長は [3, 2]（非増加）。
let x = Tensor::new((0..12).map(|v| v as f32 * 0.1).collect(), &[3, 2, 2]).unwrap();
let packed = pack_padded_sequence(&tape.var(&x), &[3, 2], false, true).unwrap();
let out = rnn_forward_packed(&rnn, &packed, None).unwrap();
let (padded, lengths) = pad_packed_sequence(&out.output, false, 0.0, None).unwrap();
assert_eq!(lengths, vec![3, 2]);
assert_eq!(padded.to_tensor().shape(), &[3usize, 2, 3]);
```

## Options / Props

`Tape` の委譲メソッド（`x: [T, B, D]`、`h0` / `c0` 省略時はゼロ初期化）:

| Name | Signature |
| --- | --- |
| `rnn_forward_seq` | `fn rnn_forward_seq<'t>(&'t self, rnn: &Rnn, x: &Tensor<f32>, h0: Option<&Var<'t>>) -> Result<RnnSeqOutput<'t, RnnCellVars<'t>>, AutodiffError>` |
| `lstm_forward_seq` | `fn lstm_forward_seq<'t>(&'t self, lstm: &Lstm, x: &Tensor<f32>, h0: Option<&Var<'t>>, c0: Option<&Var<'t>>) -> Result<LstmSeqOutput<'t>, AutodiffError>` |
| `gru_forward_seq` | `fn gru_forward_seq<'t>(&'t self, gru: &Gru, x: &Tensor<f32>, h0: Option<&Var<'t>>) -> Result<RnnSeqOutput<'t, GruCellVars<'t>>, AutodiffError>` |
| `stacked_rnn_forward_seq` | `fn stacked_rnn_forward_seq<'t>(&'t self, rnn: &StackedRnn, x: &Tensor<f32>, h0: Option<&[Var<'t>]>) -> Result<StackedRnnSeqOutput<'t, RnnCellVars<'t>>, AutodiffError>` |
| `stacked_lstm_forward_seq` | `fn stacked_lstm_forward_seq<'t>(&'t self, lstm: &StackedLstm, x: &Tensor<f32>, h0: Option<&[Var<'t>]>, c0: Option<&[Var<'t>]>) -> Result<StackedLstmSeqOutput<'t>, AutodiffError>` |
| `stacked_gru_forward_seq` | `fn stacked_gru_forward_seq<'t>(&'t self, gru: &StackedGru, x: &Tensor<f32>, h0: Option<&[Var<'t>]>) -> Result<StackedRnnSeqOutput<'t, GruCellVars<'t>>, AutodiffError>` |

多層版の `h0` / `c0` は `Some` の場合、長さ `num_layers * num_directions`（index = `layer * num_directions + direction`）。双方向時の各 step 出力は `[B, 2H]`。

単層モデル:

| Name | Constructor | Description |
| --- | --- | --- |
| `Rnn` | `new(input_size: usize, hidden_size: usize, bias: bool, seed: u64) -> Result<Self, AutodiffError>` | tanh RNN。`input_size == 0` / `hidden_size == 0` は `InvalidArgument` |
| `Lstm` | `new(input_size, hidden_size, bias, seed)` | LSTM |
| `Gru` | `new(input_size, hidden_size, bias, seed)` | GRU |

戻り値型（pub フィールド）:

| Name | Fields |
| --- | --- |
| `RnnSeqOutput<'t, P>` | `outputs: Vec<Var<'t>>`, `h_n: Var<'t>`, `params: P`（`P` は `RnnCellVars` / `GruCellVars`） |
| `LstmSeqOutput<'t>` | `outputs`, `h_n`, `c_n: Var<'t>`, `params: LstmCellVars<'t>` |
| `StackedRnnSeqOutput<'t, P>` | `outputs: Vec<Var<'t>>`, `h_n: Vec<Var<'t>>`, `params: Vec<P>` |
| `StackedLstmSeqOutput<'t>` | `outputs`, `h_n: Vec<Var<'t>>`, `c_n: Vec<Var<'t>>`, `params: Vec<LstmCellVars<'t>>` |
| `RnnCellVars<'t>` / `GruCellVars<'t>` / `LstmCellVars<'t>` | `weight_ih: Var`, `weight_hh: Var`, `bias_ih: Option<Var>`, `bias_hh: Option<Var>` |

多層・双方向:

| Name | Signature | Description |
| --- | --- | --- |
| `RnnConfig` | `#[non_exhaustive]`。`new()` / `Default`（`num_layers=1`・`bidirectional=false`・`dropout=0.0`） | ビルダー: `with_num_layers(usize)` / `with_bidirectional(bool)` / `with_dropout(f32)`。getter: `num_layers` / `bidirectional` / `dropout` / `num_directions`。`validate()` は `num_layers >= 1` かつ `dropout` が有限で `[0, 1]` を検査 |
| `StackedRnn` / `StackedGru` / `StackedLstm` | `new(input_size: usize, hidden_size: usize, bias: bool, seed: u64, config: RnnConfig) -> Result<Self, AutodiffError>` | `config()` / `input_size()` / `hidden_size()` / `cell(layer, direction)` を持つ |

可変長系列（`torch.nn.utils.rnn` 相当）:

| Name | Signature | Description |
| --- | --- | --- |
| `PackedSequence<'t>` | `new(data: Var<'t>, batch_sizes: Vec<usize>, sorted_indices: Option<Vec<usize>>) -> Result<Self, AutodiffError>` | getter: `data()` / `batch_sizes()` / `sorted_indices()` / `unsorted_indices()`。フィールドは非公開 |
| `pack_padded_sequence` | `fn pack_padded_sequence<'t>(input: &Var<'t>, lengths: &[usize], batch_first: bool, enforce_sorted: bool) -> Result<PackedSequence<'t>, AutodiffError>` | `lengths[i]` は `1..=T`。`enforce_sorted = true` は非増加が必須 |
| `pad_packed_sequence` | `fn pad_packed_sequence<'t>(sequence: &PackedSequence<'t>, batch_first: bool, padding_value: f32, total_length: Option<usize>) -> Result<(Var<'t>, Vec<usize>), AutodiffError>` | padded 形式と各系列長を返す |
| `rnn_forward_packed` / `gru_forward_packed` | `fn rnn_forward_packed<'t>(rnn: &Rnn, input: &PackedSequence<'t>, h0: Option<&Var<'t>>) -> Result<PackedRnnSeqOutput<'t, RnnCellVars<'t>>, AutodiffError>` | 単層。`gru_forward_packed` の戻りは `PackedRnnSeqOutput<'t, GruCellVars<'t>>` |
| `lstm_forward_packed` | `fn lstm_forward_packed<'t>(lstm: &Lstm, input: &PackedSequence<'t>, h0: Option<&Var<'t>>, c0: Option<&Var<'t>>) -> Result<PackedLstmSeqOutput<'t>, AutodiffError>` | 単層 LSTM |
| `stacked_rnn_forward_packed` / `stacked_gru_forward_packed` | `fn stacked_rnn_forward_packed<'t>(rnn: &StackedRnn, input: &PackedSequence<'t>, h0: Option<&[Var<'t>]>) -> Result<StackedPackedRnnSeqOutput<'t, RnnCellVars<'t>>, AutodiffError>` | 多層・双方向。GRU 版は `StackedGru` と `GruCellVars` |
| `stacked_lstm_forward_packed` | `fn stacked_lstm_forward_packed<'t>(lstm: &StackedLstm, input: &PackedSequence<'t>, h0: Option<&[Var<'t>]>, c0: Option<&[Var<'t>]>) -> Result<StackedPackedLstmSeqOutput<'t>, AutodiffError>` | 多層・双方向 LSTM |

packed 出力型: `PackedRnnSeqOutput<'t, P>`（`output: PackedSequence`, `h_n: Var`, `params: P`）、`PackedLstmSeqOutput<'t>`（`output`, `h_n`, `c_n`, `params`）、`StackedPackedRnnSeqOutput<'t, P>`（`output`, `h_n: Vec<Var>`, `params: Vec<P>`）、`StackedPackedLstmSeqOutput<'t>`（`output`, `h_n`, `c_n`, `params: Vec<LstmCellVars>`）。

## Notes

- `compat::Sequential` は `Var → Var` の平坦鎖前提のため、RNN 系には `add_rnn` / `add_lstm` / `add_gru` を設けない（入力が `&Tensor<f32>`、隠れ状態を明示的に引き回す、戻り値が複数 `Var` を持つ構造体、のため）
- 再エクスポート対象外: `RnnCell` / `LstmCell` / `GruCell`（`forward_seq` の入出力に現れない。`from_cell` / `from_parameters` による外部重み持ち込みは facade から行えない）、`Module` trait、`Rnn` / `Lstm` / `Gru` の `with_config`（多層は `Stacked*` を使う）
- 既知の制限（eval モード不可）: `Stacked*::new` は training=true で構築され、`set_training` は facade から到達できない。`dropout > 0` の場合 facade 経由の forward は常に学習モードで、層間 dropout がグローバル RNG（`manual_seed` で再現可能、消費順は layer 昇順 → t 昇順）を消費する。推論用途では `dropout = 0.0` で構築する
- 層間 dropout は最終層の出力には適用されない。`num_layers == 1` かつ `dropout > 0` は受理される（no-op）
- packed 版の層間 dropout は packed の `data` へ層ごとに 1 回適用する（padded 版 `forward_seq` は step ごと）ため、RNG 消費順が異なる
- packed 系の `lengths`・添字は `usize`。長さ 0 の系列・負の添字は非対応。`h0` / `c0` / `h_n` / `c_n` は元のバッチ順の `[B, H]`
- `Var` / `Tape` への packed 委譲メソッド、`Rnn::forward_packed`、`Sequential::add_*` は提供されない（packed 系は自由関数のみで、tape は入力 `Var` から得る）
- `PackedSequence` のフィールドは非公開で、`new` か pack 関数でしか構築できない

## Related

- [module.md](./module.md)
- [tape.md](../api/tape.md)
- [var.md](../api/var.md)

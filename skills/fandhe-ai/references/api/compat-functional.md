---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/compat/struct.FunctionalBuilder.html
---

# compat: Functional API（FunctionalBuilder / FunctionalModel）

Keras Functional API 相当の多入力・多出力グラフ。層ノード（`compat::Sequential` ブロック）からなる DAG を `FunctionalBuilder` で組み立て、`build` で検証して `FunctionalModel` に確定する。ノードは自分より前の添字しか参照できず、挿入順がそのままトポロジカル順の forward 順になる。`compat::MultiheadAttentionConfig` は `Sequential::add_multihead_attention_with_config` の引数型。

## Signature / Usage

```rust
use fandhe_ai::Tensor;
use fandhe_ai::compat::{FunctionalBuilder, Sequential};

// 2 入力を各ブロックで変換し、加算で合流して 1 出力にする。
let mut b = FunctionalBuilder::new();
let a = b.input()?;
let c = b.input()?;
let ha = b.apply(Sequential::new().add_linear(3, 4, 1)?.add_relu(), a)?;
let hc = b.apply(Sequential::new().add_linear(2, 4, 2)?.add_relu(), c)?;
let merged = b.add(&[ha, hc])?;
let out = b.apply(Sequential::new().add_linear(4, 1, 3)?, merged)?;
let mut model = b.build(&[a, c], &[out])?;
model.eval();
let outputs = model.predict(&[&xa, &xc])?; // Vec<Tensor<f32>>
```

## Options / Props

`FunctionalBuilder`（構築。ビルダー ID はプロセス内で一意で、他ビルダーが発行した `Node` は `apply` / `build` が拒否する）:

| Name | Type | Description |
| --- | --- | --- |
| `FunctionalBuilder::new() -> Self` | 関数 | 空のビルダーを作る（`Default` も実装） |
| `input(&mut self) -> Result<Node, AutodiffError>` | メソッド | 入力ノードを追加（Keras `Input`）。shape は宣言せず、forward 時の値で決まる |
| `apply(&mut self, block: Sequential, input: Node) -> Result<Node, AutodiffError>` | メソッド | `block` を `input` へ適用するノードを追加（Keras の層呼び出し）。拒否: 他ビルダーのハンドル・範囲外添字・`compile()` 済みブロック（compile は Functional モデル側で行う）・層 0 個のブロック。fan-out（1 ノードを複数ブロックが消費）は可 |
| `concatenate(&mut self, inputs: &[Node], dim: usize) -> Result<Node, AutodiffError>` | メソッド | 軸 `dim` で連結する結合ノード（Keras `Concatenate`） |
| `add(&mut self, inputs: &[Node])` / `multiply(&mut self, inputs: &[Node])` / `average(&mut self, inputs: &[Node])` | メソッド | 要素ごとの加算 / 乗算 / 平均の結合ノード（Keras `Add` / `Multiply` / `Average`）。戻り値は `Result<Node, AutodiffError>`。結合ノードは `concatenate` を含め、入力 2 件未満・他ビルダー / 範囲外ハンドル・同一ノードの重複指定を拒否する。shape の検査（rank・`dim` 範囲・非連結軸の一致）は構築時には行わず forward 時に型付きエラーで検出する。結合ノードは層を持たないため通し番号キーに影響しない |
| `build(self, inputs: &[Node], outputs: &[Node]) -> Result<FunctionalModel, AutodiffError>` | メソッド | グラフを検証して確定する（Keras `Model(inputs, outputs)`）。拒否: `inputs` / `outputs` が空・他ビルダーのハンドル・範囲外・重複・`inputs` に入力ノード以外・`inputs` に載らない入力ノード（未束縛）・どの出力にも寄与しないノード。入力ノードを出力へそのまま指定すること（素通し）は許可 |
| `Node` | `#[derive(Debug, Clone, Copy, PartialEq, Eq)] pub struct` | ノードハンドル（Keras のシンボリックテンソル相当）。発行元ビルダー ID と添字だけを持つ `Copy` 値 |

`FunctionalModel`（実行・学習・保存。公開メソッドは下表の 14 種。学習用の束縛結果型 `FunctionalVars` と `bind` は非公開）:

| Name | Type | Description |
| --- | --- | --- |
| `forward<'t>(&self, tape: &'t Tape, inputs: &[Var<'t>]) -> Result<Vec<Var<'t>>, AutodiffError>` | メソッド | `inputs`（`build` に渡した順）を入力ノードへ束ね、ノードを挿入順に 1 回ずつ評価して `outputs`（`build` に渡した順）の値を返す。入力件数の不一致は `InvalidArgument`。shape の不整合は既存 `Var` 演算の型付きエラー |
| `predict(&self, inputs: &[&Tensor<f32>]) -> Result<Vec<Tensor<f32>>, AutodiffError>` | メソッド | `crate::tape()`（既定 CPU）を 1 回構築して `forward` し、各出力を `Tensor` で返す。モードを暗黙に切り替えない（決定的な推論は先に `eval()` を呼ぶ） |
| `set_training(&mut self, training: bool)` / `train(&mut self)` / `eval(&mut self)` / `training(&self) -> bool` | メソッド | 全ブロックへモードを伝播する。`train()` は `set_training(true)`、`eval()` は `set_training(false)` の別名。`training()` は全ブロックが train のとき `true`（ブロック 0 個なら `true`）の導出値 |
| `named_parameters(&self) -> Result<Vec<(String, &Tensor<f32>)>, AutodiffError>` / `state_dict(&self) -> Result<HashMap<String, Tensor<f32>>, AutodiffError>` | メソッド | 通し番号キー付きのパラメータ列 / 辞書。順序はブロックの挿入順、各ブロック内は `Sequential::named_parameters` と同じ |
| `load_state_dict(&mut self, state: HashMap<String, Tensor<f32>>) -> Result<(), AutodiffError>` | メソッド | `state_dict` の逆（strict）。第 1 パスでキー集合の完全一致と各 shape を何も変更せず検査、第 2 パスでブロックごとに適用し、失敗時は適用前のスナップショットへ巻き戻して元のエラーを返す（巻き戻しにも失敗した場合は部分適用の可能性を示す `InvalidArgument`） |
| `trainable_parameters(&self) -> Vec<&Tensor<f32>>` / `apply_parameters(&mut self, updated: Vec<Tensor<f32>>) -> Result<(), AutodiffError>` | メソッド | 訓練対象パラメータ（ブロック挿入順、各ブロック内は `Sequential::trainable_parameters` と同順）と、同じ並びの更新後パラメータの書き戻し。総数・各 shape の不一致は何も変更せず `InvalidArgument` |
| `compile(&mut self, optimizer: Optimizer, loss: Loss) -> Result<(), AutodiffError>` | メソッド | optimizer / loss を設定（Keras `compile`）。再 compile は optimizer 状態を破棄して置換。`Optimizer::Lbfgs` は `InvalidArgument`（第 1 段の対象外）。失敗時は `compiled` を変更しない |
| `fit<T: FitTarget>(&mut self, xs: &[&Tensor<f32>], ys: &[&Tensor<T>], config: FitConfig) -> Result<History, AutodiffError>` | メソッド | 学習（Keras `fit`）。`xs` / `ys` は `build` に渡した `inputs` / `outputs` の順。多出力の損失は各出力の損失の和。`History` は `loss` と `lr` のみ埋める（`val_loss` / `val_metrics` は空）。モード変更・データ構築より前に拒否: 未 compile・入力 / 目標件数の不一致・`epochs == 0`・`accumulate_steps != 1`・パラメータ持ちの `add_module` 層・`batch_first=false` の MHA。サンプル数不一致・`batch_size == 0`・loss と目標 dtype の不整合はデータ構築時 / 最初のバッチで `InvalidArgument`。`drop_last` で全バッチが落ちた epoch も `InvalidArgument` |
| `evaluate<T: FitTarget>(&mut self, xs: &[&Tensor<f32>], ys: &[&Tensor<T>], batch_size: usize) -> Result<f32, AutodiffError>` | メソッド | 評価（Keras `evaluate`）。eval モードで `forward` し、`fit` と同じ損失合計・同じ集計でサンプル数重み付き平均を返す。モードは呼び出し前へ復元 |
| `MultiheadAttentionConfig` | `pub struct`（`Debug, Clone, Copy, PartialEq, Eq`。フィールドは非公開） | `MultiheadAttentionConfig::new(embed_dim: usize, num_heads: usize) -> MultiheadAttentionConfig`（`Default` なし。既定: `bias = true`、`batch_first = true`〈PyTorch 既定 `False` とは異なる〉、`kdim` / `vdim = None`〈= `embed_dim`〉）。ビルダー: `with_bias(bool)` / `with_batch_first(bool)` / `with_kdim(usize)` / `with_vdim(usize)`。アクセサ: `embed_dim()` / `num_heads()` / `bias()` / `batch_first()` / `kdim() -> usize` / `vdim() -> usize`（未設定なら `embed_dim` へ解決した値） |
| `Sequential::add_multihead_attention_with_config(self, config: MultiheadAttentionConfig, seed: u64) -> Result<Self, AutodiffError>` | メソッド | 構成指定の MHA 層を追加。`Sequential` の self-attention では `kdim` / `vdim` = `embed_dim` 必須（指定は `InvalidArgument`）。`batch_first = false` の層を含むモデルは `fit*` / `evaluate` が DataLoader の第 0 軸をサンプル軸として分割し系列を切断するため `InvalidArgument`（`predict` / forward は利用可能） |

## Notes

- `compat::MultiheadAttentionConfig` は `fandhe_ai::compat` ルートからの再エクスポート（`fandhe_ai_autodiff::nn::MultiheadAttentionConfig`）で、`Sequential::add_multihead_attention_with_config` の引数型。`fandhe_ai::nn::kv_cache::MultiheadAttentionConfig`（`StatefulAttention::from_config` の引数型）も同じ `fandhe_ai_autodiff::nn` の型を再エクスポートしたもので、ソース上は別型ではなく同一型の 2 経路（呼び出し側が `compat::` と `nn::kv_cache::` のどちらの import でも同じ型になる）。ただしどちらの入口でも `kdim` / `vdim` は `embed_dim` と一致する必要がある（`StatefulAttention::from_config` は `batch_first=false`・`kdim` / `vdim != embed_dim` を `InvalidArgument` で拒否）
- 数値は既存 `Var` 演算（`Sequential::forward`）の合成のみで、新規 `Op` / `BackendOps` メソッド / VJP を追加しない。GPU は `tape_for` で構築した tape 上でそのまま到達できる
- shape の構築時推論は行わない（層側に推論 API が無い）。不整合は forward 時に型付きエラーで検出する。`build` / `forward` は反復のみで再帰しない
- `FunctionalModel::fit` / `evaluate` は `Sequential` 版にある `validation` / callbacks / metrics を持たない
- 保存・復元は `save_functional_model` / `load_functional_model`（`compat-model-io.md`）。`add_module` の利用者定義層・ブロック間でモードが食い違うモデルは `UnsupportedModel`
- `Callback` / `FitWeights` / `compile_with_amp` 等 `Sequential` 側の学習 API は `compat-training.md` を参照

## Related

- [compat-sequential](./compat-sequential.md)
- [compat-training](./compat-training.md)
- [compat-model-io](./compat-model-io.md)
- [nn/kv-cache](../nn/kv-cache.md)

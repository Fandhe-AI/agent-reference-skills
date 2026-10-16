---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/compat/fn.save_model.html
---

# compat: save_model / load_model

`compat::Sequential`（および Functional モデル）を層構成ごとディレクトリへ保存・復元する入口 4 本と `ModelIoError`。`dir/manifest.json`（層構成・キー・shape・参照する safetensors 名を持つ手書き JSON）と `dir/model.<gen>.safetensors`（F32 の重み）の 2 ファイル構成。

## Signature / Usage

```rust
use fandhe_ai::compat::{load_model, save_model};

save_model(&model, "ckpt/run1")?;            // ckpt/run1/manifest.json + model.<gen>.safetensors
let restored = load_model("ckpt/run1")?;     // 重みは bit のまま復元
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `save_model(model: &Sequential, dir: impl AsRef<Path>) -> Result<(), ModelIoError>` | 関数 | `Sequential` を `dir` へ保存。検証（未対応の層・層モードの不一致・上限超過等）は `dir` を作る前にすべて終えるため、`UnsupportedModel` / `TooLarge` で失敗しても `dir` には何も残らない。保存前に manifest を描画し、load と同じ厳格パーサで読み戻して確認する |
| `load_model(dir: impl AsRef<Path>) -> Result<Sequential, ModelIoError>` | 関数 | `save_model` が書いたディレクトリから復元。重みと BatchNorm の running stats は safetensors の値を bit のまま設定し、`training` フラグも復元する。途中で失敗しても部分的に構築したモデルは返さない |
| `save_functional_model(model: &FunctionalModel, dir: impl AsRef<Path>) -> Result<(), ModelIoError>` | 関数 | Functional モデル（多入力・多出力グラフ）を同じ 2 ファイル構成で保存。manifest の `format` は `fandhe-ai.compat.functional`（`format_version = 1`）で、`Sequential` 形式とは相互排他（互いに相手の形式を `Manifest` で拒否する） |
| `load_functional_model(dir: impl AsRef<Path>) -> Result<FunctionalModel, ModelIoError>` | 関数 | Functional モデルを復元。`training` と compile 状態も復元。グラフの構造検証は safetensors を開く前に完了する |
| `ModelIoError` | `#[non_exhaustive] enum` | 下表の variant |

`ModelIoError` の variant（`Debug` / `Display` / `std::error::Error` を実装。`source()` は `Io` / `Autodiff` のみ）:

| Name | Type | Description |
| --- | --- | --- |
| `Io(std::io::Error)` | variant | ファイル I/O の失敗、no-follow 手順の拒否（シンボリックリンク・非通常ファイルは `ErrorKind::InvalidInput`）、非対応プラットフォーム（`ErrorKind::Unsupported`） |
| `Manifest { message: String }` | variant | manifest の構文・スキーマ違反（未知キー・重複キー・不正な `safetensors_file` 等） |
| `Safetensors(String)` | variant | safetensors のエンコード・デコード失敗 |
| `UnsupportedModel { reason: String }` | variant | 本バージョンで保存・復元できないモデル（`add_module` の利用者定義層・層モードの不一致・状態を記録できない `compile` 構成〈AMP を伴う `Lbfgs` 等〉・内部の整合性違反） |
| `Mismatch { message: String }` | variant | manifest と safetensors の内容の不一致（バイト数・キー集合・shape） |
| `Autodiff(AutodiffError)` | variant | 層の構築・`load_state_dict` の失敗 |
| `TooLarge { what: &'static str, limit: u64 }` | variant | 固定上限の超過 |

## Notes

- 対応範囲: 層が `add_*` 53 種（`add_linear`・活性化・`add_softmax` 系・`add_flatten`・`add_dropout`・conv・正規化・embedding・MHA・TE・pooling 等）だけのモデル。`kind` は文字列 allowlist で、`add_*` の引数（`seed` を除く）を記録し、load が同じ `add_*` を呼んで再構築する
- `compile` / `compile_with_amp` 済みのモデルは、loss 種別・optimizer 種別と現在の config・optimizer 内部状態（safetensors の `optimizer.` 接頭辞）・AMP の GradScaler 状態を manifest の `compiled` 節へ記録し、bit 一致で復元する（対象は `Sgd` / `AdamW` / `Adam` / `RmsProp` / `Adagrad` / `Lamb`、および AMP を伴わない `Lbfgs`）。groups が空でない param groups の compile 状態は保存できない
- 保存を拒否する（`UnsupportedModel` / `TooLarge`）もの: `add_module` の利用者定義層、dropout・BatchNorm の層モードがモデル全体と食い違うモデル、f32 引数が非有限の層、manifest が固定上限（配列長・サイズ等）を超えるモデル（パラメータ数の多いモデルは `optimizer_state_keys` も配列長上限に数えられる）
- BatchNorm1d / 2d の running stats は `{i}.running_mean` / `{i}.running_var` として保存（manifest の `buffer_keys`）。`num_batches_tracked` は保存も復元もしない（load 後は 0 から再開。forward の数値には影響しない）。現行の `format_version` は 2。旧形式（`format_version` 1）に限り `buffer_keys` の欠落を初期 running stats で補って読み込む。現行版で期待 buffer が欠落した manifest は `Mismatch`
- 書き込みの契約（世代コミット）: `model.<gen>.safetensors`（`<gen>` は 32 桁 16 進）は `create_new` で最終名へ直接書き、`manifest.json` は `create_new` の一時ファイルへ書いて `rename` する。この `rename` が唯一のコミット点で、途中で失敗しても既存の manifest は無傷
- 既存ファイルは読まず削除もしない。再保存すると旧世代の `model.*.safetensors` が孤立ファイルとして残る。manifest の `safetensors_file` が指していないものは、その `dir` に対する save / load が実行中でないことを確認した上で手動で削除してよい。異常終了で残った `.manifest.json.tmp-*` も削除してよい
- 並行する save / load は非サポート。耐久性（fsync）は保証しない（`Ok` 後でも電源断・OS クラッシュで内容が失われうる。保証するのはコミット順序のみ）
- 非信頼入力: `dir` の中身は非信頼として読む。`manifest.json` / `model.<gen>.safetensors` とも no-follow 手順（シンボリックリンク・非通常ファイル・`(dev, ino)` 差し替えの拒否）で開き、実ファイル長を固定上限（manifest 1 MiB、モデルファイル 1 GiB）と比べてから読む。manifest の記載値は一致確認にだけ使い、確保量の根拠にしない。JSON は serde を使わない手書きの厳格パーサ（未知キー・重複キー・過深ネスト・エスケープ・先頭ゼロ等を拒否）。層数上限は 4096
- プラットフォーム: Windows（非 unix）では `save_model` / `load_model` とも `ErrorKind::Unsupported` で fail-closed（`save_model` は `dir` への副作用より前に判定）。`load_model` の対応範囲は Linux x86_64 / aarch64 と macOS で unix 全体より狭く、それ以外の unix では `save_model` が成功しても `load_model` は拒否される
- `ModelCheckpoint::to_file` による safetensors 保存（重みのみ）とは別物で、本機能は層構成と compile 状態も保存する

## Related

- [compat-sequential](./compat-sequential.md)
- [compat-functional](./compat-functional.md)
- [compat-callbacks](./compat-callbacks.md)
- [compat-training](./compat-training.md)

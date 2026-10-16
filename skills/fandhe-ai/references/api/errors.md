---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/enum.AutodiffError.html
---

# AutodiffError / BackendError / ShapeError / CreationError / RngError

autodiff 公開 API・バックエンド抽象層・テンソル生成が返すエラー型。いずれも `#[non_exhaustive]` で、将来の演算追加時に破壊的変更なくバリアントを増やせる。トップレベル（`fandhe_ai::`）に再エクスポートされるのは `AutodiffError` / `BackendError` / `ShapeError` / `CreationError` / `RngError` の 5 型。

## Signature / Usage

```rust
match tape.backward(&loss) {
    Ok(grads) => { /* ... */ }
    Err(AutodiffError::TapeMismatch) => { /* 別テープの変数を混在させた、または reset 前の Gradients を読んだ */ }
    Err(e) => return Err(e.into()),
}
```

## Options / Props

### AutodiffError

| Name | Type | Description |
| --- | --- | --- |
| `Shape(ShapeError)` | バリアント | `matmul` / `add` / `mul` のブロードキャスト不正、`sum` / `max` / `mse_loss` の形状不整合など、順伝播時の shape mismatch |
| `Backward(String)` | バリアント | `Tape::backward` 中のグラフ不整合。`materialize_fallible` 内で `OnceCell` の理論上の不変条件違反を検出した場合などに使用 |
| `TapeMismatch` | バリアント | 二項演算に異なる `Tape` 由来の変数が渡された場合。付随データなし。`Tape::reset` をまたいだ `Gradients::get` でも返る |
| `InvalidArgument(String)` | バリアント | shape チェック以前にコンストラクタ引数がテンソル生成を不可能にする場合（例: `nn::Linear::new` で `in_features == 0`） |
| `Backend(BackendError)` | バリアント | fused 実行・materialize 由来の型付きバックエンドエラー。`Unsupported` 以外はフォールバックせず伝播する |
| `GradientTrackingDisabled` | バリアント | `Gradients::get` の対象が `requires_grad == false`（`Tape::var_no_grad` の葉、`Var::detach` で切り離した葉、およびそれらのみを祖先に持つノード）だった。「loss から未到達」（`Ok(None)`）とは型で区別される |
| `DeviceMismatch { requested: Device, actual: Device }` | バリアント | `Var::to` が要求先デバイスと実際のデバイスの不一致を検出した。別デバイスへ実際に転送するには `Var::to_tape`（facade では `Tape::transfer`）を使う |

### BackendError

| Name | Type | Description |
| --- | --- | --- |
| `CudaUnavailable(String)` | バリアント | `cudarc` の動的ロード失敗（CUDA ドライバ/ツールキット不在） |
| `ShapeMismatch(ShapeError)` | バリアント | 入力テンソルの次元が演算要件と不一致 |
| `DeviceMismatch` | バリアント | 異なるデバイス由来のテンソルが不適切に混在 |
| `DeviceAllocationFailed(String)` | バリアント | デバイスメモリ確保失敗（VRAM 枯渇等） |
| `KernelLaunchFailed(String)` | バリアント | GPU カーネル実行失敗（CUDA NVRTC コンパイルエラーや Metal dispatch 失敗） |
| `DeviceUnavailable(String)` | バリアント | 選択時点でリクエストされたデバイスが利用不可（不正な ordinal・未登録プロバイダ） |
| `TransferFailed(String)` | バリアント | ホスト-デバイス間のデータ転送失敗（確保済みバッファへのコピー失敗） |
| `Unsupported(String)` | バリアント | バックエンドが該当演算のカーネル実装を持たない |
| `StorePoisoned` | バリアント | `DeviceParamStore` が以前の `step()` 実行時エラー後の状態で呼ばれた。以降の `step` / `sync_to_host` 等はすべてこの variant で拒否される。回復は新しい `DeviceParamStore` の再構築のみ |
| `TapeMismatch` | バリアント | `DeviceParamStore::step` / `sync_to_host` 等に、構築時・直近の `register_resident_params` と異なる `Tape` を渡した |
| `PendingForwardUnconsumed` | バリアント | `register_resident_params` を、直前の登録が `step()` で消費（または `abandon_pending_forward()` で破棄）される前に再度呼んだ |
| `MissingGradient(String)` | バリアント | `DeviceParamStore::step` が対象パラメータの勾配を取得できなかった（`Ok(None)`、loss へ未到達） |
| `InvalidArgument(String)` | バリアント | `DeviceParamStore` の構築・`step` 引数が構造的に不正（パラメータ件数と勾配件数の不一致、momentum 構成の変化など） |
| `DeviceContextPoisoned(String)` | バリアント | デバイス ordinal が回復可能な poison 状態（非同期実行下で遅延発覚した sticky な driver エラー）。既存ハンドル・バッファを破棄し `tape_for` 等で取り直す |
| `StaleDeviceGeneration { ordinal, resource_generation, current_generation }` | バリアント | ハンドルが再生成前の旧世代に属する。現行世代のキャッシュから取り直す（`invalidate` は不要） |
| `DeviceContextRetiring { ordinal }` | バリアント | ordinal が `invalidate` の drain 中で一時的に演算入口を拒否した。短時間で解消する |
| `DeviceContextUnrecoverable { ordinal, probe_error }` | バリアント | 復旧処理自体が失敗し恒久的な poison 状態へ確定した。プロセスの再起動が必要 |
| `DeviceContextCaptureInProgress { ordinal }` | バリアント | 別スレッドが CUDA Graph capture 中のため一時的に演算入口を拒否した。一過性の競合で、恒久的な失敗として扱ってはならない（次回 `step()` で再試行するか、今回分だけ直接実行経路へフォールバックする） |

### ShapeError

`#[derive(Debug, Clone, PartialEq, Eq)]`。

| Name | Type | Description |
| --- | --- | --- |
| `RankMismatch { expected, actual }` | バリアント | 要求される次元数と実際の次元数が不一致 |
| `ElementCountMismatch { expected, actual }` | バリアント | shape の要素数積とデータ長が不一致 |
| `AxisOutOfRange { axis, rank }` | バリアント | 軸番号が rank 範囲外 |
| `DuplicateAxis { axis }` | バリアント | `permute` の `perm` に同一軸が複数回指定された |
| `NarrowOutOfBounds { dim, start, len, dim_size }` | バリアント | `narrow` の範囲が対象軸のサイズを超える |
| `ElementCountOverflow` | バリアント | 要素数積が `usize` を超える、またはバイトサイズが allocation 上限（`isize::MAX` バイト）を超える |
| `NonContiguousReshape` | バリアント | 非 contiguous なテンソルに対して `reshape` が呼ばれた |
| `BroadcastIncompatible { lhs, rhs }` | バリアント | 2 つの shape が NumPy 互換のブロードキャスト規則で両立しない |
| `MatmulDimMismatch { lhs, rhs }` | バリアント | matmul の内部次元が不一致 |
| `ShapeMismatch { lhs, rhs }` | バリアント | 厳密一致を要求する演算（`mse_loss` の予測値と target 等）で shape が不一致 |
| `IndexOutOfRange { dim, index, dim_size }` | バリアント | `gather` / `scatter` / `scatter_add` の添字が `[0, dim_size)` の範囲外 |
| `IndexRangeOverflow { index }` | バリアント | `sort` / `topk` / `unique` が出力添字（`Tensor<i32>`）へ書き戻す `usize` 添字が `i32::MAX` を超える |

### CreationError

`arange` / `linspace` 専用。`#[derive(Debug, Clone, PartialEq)]`、`From<ShapeError>` を実装。

| Name | Type | Description |
| --- | --- | --- |
| `Shape(ShapeError)` | バリアント | shape 起因の不整合 |
| `InvalidStep { step: f32 }` | バリアント | `arange` の `step` がゼロまたは非有限 |
| `NonFiniteBound { start: f32, end: f32 }` | バリアント | `arange` / `linspace` の `start` / `end` が非有限 |

### RngError

`randint` / `bernoulli` / `multinomial` / `normal` と `Generator` 共通。`#[derive(Debug, Clone, PartialEq, Eq)]`、`From<ShapeError>` を実装。

| Name | Type | Description |
| --- | --- | --- |
| `Shape(ShapeError)` | バリアント | shape 起因の不整合 |
| `InvalidRange { low: i32, high: i32 }` | バリアント | `randint(low, high, ..)` の `low >= high` |
| `InvalidProbability { index: usize }` | バリアント | `bernoulli` / `multinomial` の確率・重みの論理 index が非有限、または `bernoulli` で `[0, 1]` の範囲外。乱数は消費しない |
| `InvalidArgument { reason: &'static str }` | バリアント | `multinomial` / `normal` の引数不正（`n == 0`、行和が 0 以下、非復元抽出で `num_samples` が正の重みの個数を超える、`mean` / `std` が非有限、`std < 0` 等）。乱数は消費しない |

### モジュール別のエラー型

各モジュールのエラー型は `fandhe_ai` のサブモジュール配下にあり、トップレベルには再エクスポートされない。詳細は各カテゴリのページを参照。

| Type | Path | Description |
| --- | --- | --- |
| `ModelIoError` | `fandhe_ai::compat::ModelIoError` | `compat::Sequential` のモデル保存・読み込み（`compat-model-io.md`） |
| `DataError` | `fandhe_ai::data::DataError` | Dataset / DataLoader |
| `OnnxError` | `fandhe_ai::interop::onnx::OnnxError` | ONNX import / export（`guides/interop.md`） |
| `NpyError` | `fandhe_ai::interop::npy::NpyError` | npy / npz の読み書き |
| `LoadError` / `SaveError` | `fandhe_ai::interop::safetensors::{LoadError, SaveError}` | safetensors の読み込み / 保存 |
| `ModelError` | `fandhe_ai::model::ModelError` | ローカルモデルレジストリ `ModelRegistry` |
| `TextError` | `fandhe_ai::text::TextError` | `TextVectorization` |

## Notes

- `AutodiffError` は `Debug`, `Display`, `Error`、および `ShapeError` / `BackendError` からの `From` 変換を実装する。内部クレートでは `FftError` / `StatReduceError` / `PadModeError` / `BinningError` からの `From` 変換もあり、`Shape` と `InvalidArgument` に写像される
- `DeviceAllocationFailed` と `TransferFailed` を分離しているため、呼び出し側は確保をリトライすべきか転送のみリトライすべきか判断できる
- `AutodiffError::TapeMismatch`（autodiff の `Var` / `Gradients`）と `BackendError::TapeMismatch`（`DeviceParamStore` の Tape 不一致）は別の型の同名バリアント
- `Tape::reset` 後に reset 前の `Gradients` を `Gradients::get` で読むと `AutodiffError::TapeMismatch` が返る（`gradients.md`）

## Related

- [tape](./tape.md)
- [gradients](./gradients.md)
- [device](./device.md)
- [device-param-store](./device-param-store.md)

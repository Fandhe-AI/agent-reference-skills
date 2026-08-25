---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/enum.AutodiffError.html
---

# AutodiffError / BackendError

autodiff 公開 API とバックエンド抽象層が返すエラー型。いずれも `#[non_exhaustive]` で、将来の演算追加時に破壊的変更なくバリアントを増やせる。

## Signature / Usage

```rust
match tape.backward(&loss) {
    Ok(grads) => { /* ... */ }
    Err(AutodiffError::TapeMismatch) => { /* 別テープの変数を混在させた */ }
    Err(e) => return Err(e.into()),
}
```

## Options / Props

### AutodiffError

| Name | Type | Description |
| --- | --- | --- |
| `Shape(ShapeError)` | バリアント | `matmul` / `add` / `mul` のブロードキャスト不正、`sum` / `max` / `mse_loss` の形状不整合など、順伝播時の shape mismatch |
| `Backward(String)` | バリアント | `Tape::backward` 中のグラフ不整合。`materialize_fallible` 内で `OnceCell` の理論上の不変条件違反を検出した場合に使用 |
| `TapeMismatch` | バリアント | 二項演算に異なる `Tape` 由来の変数が渡された場合。付随データなし |
| `InvalidArgument(String)` | バリアント | shape チェック以前にコンストラクタ引数がテンソル生成を不可能にする場合（例: `nn::Linear::new` で `in_features == 0`） |
| `Backend(BackendError)` | バリアント | fused 実行・materialize 由来の型付きバックエンドエラー。`Unsupported` 以外はフォールバックせず伝播する |

### BackendError

| Name | Type | Description |
| --- | --- | --- |
| `CudaUnavailable(String)` | バリアント | `cudarc` の動的ロード失敗（CUDA ドライバ/ツールキット不在） |
| `ShapeMismatch(ShapeError)` | バリアント | 入力テンソルの次元が演算要件と不一致 |
| `DeviceMismatch` | バリアント | 異なるデバイス由来のテンソルが不適切に混在 |
| `DeviceAllocationFailed(String)` | バリアント | デバイスメモリ確保失敗（VRAM 枯渇等） |
| `KernelLaunchFailed(String)` | バリアント | GPU カーネル実行失敗（CUDA NVRTC コンパイルエラーや Metal dispatch 失敗） |
| `DeviceUnavailable(String)` | バリアント | 選択時点でリクエストされたデバイスが利用不可（不正な ordinal・未登録プロバイダ） |
| `TransferFailed(String)` | バリアント | ホスト-デバイス間のデータ転送失敗 |
| `Unsupported(String)` | バリアント | バックエンドが該当演算のカーネル実装を持たない |

## Notes

- `AutodiffError` は `Debug`, `Display`, `Error`、および `ShapeError` / `BackendError` からの `From` 変換を実装
- `DeviceAllocationFailed` と `TransferFailed` を分離しているため、呼び出し側は確保をリトライすべきか転送のみリトライすべきか判断できる

## Related

- `Tape`
- `Device`

---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/enum.Device.html
---

# Device

テンソル演算の実行先デバイスを指定する enum。`Copy` を実装し値渡しが安価。

## Signature / Usage

```rust
let tape = fandhe_ai::tape_for(Device::Cuda(0))?;
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Cpu` | バリアント | CPU バックエンド。常に利用可能（`backend-cpu`） |
| `Cuda(usize)` | バリアント | CUDA GPU バックエンド。`usize` は `cudarc` のデバイス ordinal（`CudaContext::new(ordinal)` と対応）。CUDA ドライバ不在時は実行時に `BackendError::CudaUnavailable` を返す。全 OS でバリアント自体は存在するが、CUDA インストール済みの環境でのみ機能する |
| `Metal` | バリアント | macOS 限定の Metal バックエンド。feature flag ではなく条件付きコンパイルで制御される |

## Notes

- CUDA は `cudarc` による動的ロードで、ドライバ欠如時は panic せず `BackendError` を返す fail-fast 設計
- `Clone`, `Copy`, `Debug`, `Eq`, `Hash`, `PartialEq` を実装し、`Send`, `Sync`, `Unpin` にも対応
- `Device::Cuda` / `Device::Metal` は本ライブラリ独自の enum バリアントで、nvidia-cuda の CUDA C++/PTX API や apple-silicon の Metal Shading Language（MSL）とは別物。fandhe-ai はこれらの上に実装された高レベルな Rust ラッパーであり、CUDA/PTX/MSL のカーネル記述そのものは扱わない

## Related

- `tape_for()`
- `BackendError`

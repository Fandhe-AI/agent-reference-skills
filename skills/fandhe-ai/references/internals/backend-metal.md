# backend-metal

`tensor-core` の計算グラフノードを Metal カーネルとして実行する macOS 専用バックエンド。`wgpu` のような抽象層を経由せず `objc2-metal` を直接バインドする。

- crate 名: `fandhe-ai-backend-metal`（docs.rs `fandhe-ai-backend-metal/0.3.0`）
- 依存: `fandhe-ai-tensor-core`, `half`, `objc2`, `objc2-foundation`, `objc2-metal`

## Signature / Usage

```rust
use fandhe_ai_backend_metal::MetalContext;
use fandhe_ai_tensor_core::BackendOps;

// cfg(target_os = "macos") を要求。objc2 FFI バインディングのため
let ctx = MetalContext::new();
```

## Options / Props

モジュール構成:

| Module | Description |
| --- | --- |
| `pad` | 行列を 8 の倍数へパディングするユーティリティ（`simdgroup_matrix` の 8x8 ハードウェア行列命令向け）。FFI 非依存の純粋関数のため Linux CI でもコンパイル可 |
| `tile` | GEMM カーネルの動的タイル選択（BM/BN/BK/WM/WN、occupancy を考慮）。同じく FFI 非依存 |

主要な型:

| Name | Kind | Description |
| --- | --- | --- |
| `MetalContext` | struct | デバイス・コマンドキュー・バッファのライフサイクル管理 |
| GEMM 系（naive / tiled / simdgroup） | struct | f32/f16 対応の複数カーネル実装 |
| デバイスプロバイダ | trait 実装 | 実行時 GPU 選択 |
| メモリ操作 | — | `StorageModeShared`（UMA）を用いたバッファ管理 |
| 融合カーネル | — | RMSNorm・online softmax の融合実装 |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- MSL 言語仕様 / MPSGraph / MLX などの Apple Silicon GPU コンピュートスタック自体は apple-silicon スキルが担当。本ページは fandhe-ai の Rust バックエンド実装（`objc2` 経由の呼び出し構造）のみを扱う
- `cfg(target_os = "macos")` を要求するのは `objc2` FFI バインディングを使うモジュールのみ。`pad` / `tile` は純粋関数のため macOS 以外の CI でもビルド・テスト可能

## Related

- [tensor-core](./tensor-core.md)
- [backend-cpu](./backend-cpu.md)
- [backend-cuda](./backend-cuda.md)

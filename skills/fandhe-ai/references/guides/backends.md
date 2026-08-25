---
source: https://fandhe-ai.github.io/rust-ai-library/guides/backends/
---

# バックエンド構成

CPU・CUDA・Metal の 3 バックエンドを Cargo feature ではなく `cfg`（`target_os` 等の条件付きコンパイル）で切り替える構成。CPU（rayon）は無条件依存の既定で、CUDA（cudarc）は動的ロード対応のため非搭載環境でもビルド可能、Metal（objc2 系）は macOS 環境のみ依存が分離される。

## Options / Props

| API | 挙動 |
| --- | --- |
| `fandhe_ai::tape()` | CPU バックエンドを既定で使う。`Result` を返さない |
| `fandhe_ai::tape_for(Device)` | バックエンドを明示指定する。構築時検証を行うため `Result` を返す |

## Notes

- fail-fast 設計を採用しており、自動フォールバックは行わない。CUDA・Metal は構築時に検証し、失敗した場合は `BackendError` を返す。どのバックエンドにフォールバックするかは呼び出し側の責任
- バックエンド間の丸め方針（FMA 契約）を揃えるため、CPU 参照実装は `f32::mul_add` を使用する。詳細な許容誤差の定義は本カテゴリの numerical-parity ページを参照

## Related

- [numerical-parity](./numerical-parity.md)
- [performance](./performance.md)

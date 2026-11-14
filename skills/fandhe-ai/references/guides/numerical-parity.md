---
source: https://fandhe-ai.github.io/fandhe-ai/guides/numerical-parity/
---

# 数値一致契約

CPU・CUDA・Metal の各バックエンド間で計算結果が一致することを保証するための契約。GPU 実装は精度低下を前提とするため、全バックエンドペアに複合判定を適用する。

## Signature / Usage

ライブラリ提供の関数ではなく、統一複合判定（相対誤差 1e-3 未満 **または** 絶対誤差 1e-5 未満）を素の Rust でそのまま表現した例。ゼロ近傍では `rel_err` が `inf`/`NaN` になり `< 1e-3` を満たさなくなるが、その場合は `abs_err < 1e-5` 側の条件が補完する。

```rust
fn is_parity_ok(actual: f32, reference: f32) -> bool {
    let abs_err = (actual - reference).abs();
    let rel_err = abs_err / reference.abs();
    rel_err < 1e-3 || abs_err < 1e-5
}
```

## Options / Props

| 項目 | 内容 |
| --- | --- |
| 統一複合判定 | 相対誤差 1e-3 未満 **または** 絶対誤差 1e-5 未満。ゼロ近傍では相対誤差が不安定になるため絶対誤差条件で補完する |
| 丸め方針（FMA 契約） | CPU 参照実装は `f32::mul_add`、CUDA は NVRTC の既定 FMA 契約、Metal は `simdgroup_multiply_accumulate` の既定契約を用いて揃える |
| 同一実装間の比較 | ビット一致で判定する（許容誤差は異なる実装間比較にのみ適用される概念） |

## Notes

- 許容誤差は人間（ユーザー）の承認を要する運用とされており、自動修復ループが基準を恣意的に緩める経路は遮断されている。許容誤差を単独で緩和してはならない
- 統一複合判定の許容誤差定数（`RELATIVE_TOLERANCE` = 1e-3、`ABSOLUTE_RESCUE_THRESHOLD` = 1e-5）と判定関数 `composite_close_f32` は、0.11.0 → 0.14.0 で `tensor-core` の `tolerance` モジュールに単一定義として置かれた（`backend-cpu::parity` と `autodiff::create_graph` が共有する。`internals/tensor-core.md` 参照）
- ROCm バックエンド（0.14.0。条件付き・実験的）の HIPRTC カーネルは、ソース先頭の `#pragma clang fp contract(off)` で FMA への暗黙縮約を止め、CPU 参照実装が `mul_add` を使う箇所だけ `__builtin_fmaf` で明示する。実機（AMD GPU）での wave64 parity は未実施（`internals/backend-rocm.md` 参照）
- Source: https://docs.rs/fandhe-ai-backend-rocm/0.14.0/fandhe_ai_backend_rocm/、https://docs.rs/fandhe-ai-tensor-core/0.14.0/fandhe_ai_tensor_core/tolerance/index.html（0.14.0, 取得日 2026-11-14）
- Metal の `simdgroup_multiply_accumulate` は Metal Shading Language (MSL) の演算契約であり、MSL 言語仕様や MPSGraph のチューニングは apple-silicon スキルが担当する。本ページは fandhe-ai の数値一致契約としての言及にとどまる

## Related

- [backends](./backends.md)
- [tensor-core](../internals/tensor-core.md)
- [performance](./performance.md)

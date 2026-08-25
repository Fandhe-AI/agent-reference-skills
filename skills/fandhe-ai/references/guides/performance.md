---
source: https://fandhe-ai.github.io/rust-ai-library/guides/performance/
---

# 性能の考え方

「一発で理想的な性能を出す」ことを目標にせず、段階的な下限を確定させながら積み上げる方針（REQ-8 段階的下限）を採る。パフォーマンス目標は `docs/performance-targets.md`、最適化の測定記録は `docs/perf/` に蓄積される。

## Signature / Usage

`Var::matmul`（GEMM）の簡易計測例（`std::time::Instant` ベース）。性能下限判定に使う本格計測（`criterion` を使う `bench-harness` クレート）とは別物。

```sh
cargo run --release -p fandhe-ai --example gemm_bench
```

## Notes

- カーネル境界検査を省略しない: 性能下限・最適化の達成を理由に、シェーダ・カーネル側の手動境界チェックを省略しない。CPU・CUDA・Metal 全バックエンドに適用され、メモリ安全性の欠陥を構造的に排除する狙いがある
- 計測規約: ベンチマークは 5 回計測の中央値を採用し、外れ値の影響を軽減する。学習系の回帰テストでは決定的シード設定ユーティリティ（`bench_harness::rng::Xorshift64Star` 等）を使い結果の揺らぎを防ぐ
- 簡易計測（`std::time::Instant`）と本格計測（`criterion`）を明確に区別し、性能判定には本格計測（`bench-harness`）を使う
- CUDA C++ / PTX / CUTLASS のチューニングは nvidia-cuda スキル、MSL / MPSGraph は apple-silicon スキルが担当する。本ページは fandhe-ai の Rust API レベルの性能方針を扱う

## Related

- [backends](./backends.md)
- [numerical-parity](./numerical-parity.md)

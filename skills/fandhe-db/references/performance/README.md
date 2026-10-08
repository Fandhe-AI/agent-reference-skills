# performance

| Name | Description | Path |
|------|-------------|------|
| kernel | 検索カーネル境界 `SearchProvider` trait と CPU 参照実装 `CpuScalarProvider` | [kernel.md](./kernel.md) |
| isa | CPU 命令セット実行時検出（sealed トークン方式の SIMD カーネルディスパッチ） | [isa.md](./isa.md) |
| dispatch | CPU-SIMD / GPU 実行経路選択の決定表 | [dispatch.md](./dispatch.md) |
| gpu-batch | `wgpu` によるバッチ検索の実 GPU バックエンド（f16 算術・部分 Top-k・i8 パック常駐） | [gpu-batch.md](./gpu-batch.md) |
| batch-search | バッチクエリ・一括インデクシング専用検索エンジン（f16 パック常駐行列） | [batch-search.md](./batch-search.md) |
| batch-fallback | GPU 実行時エラーから CPU-SIMD 縮退経路へ切り替える `BatchBackend` / `FallbackBatchEngine` | [batch-fallback.md](./batch-fallback.md) |
| batch-limits | 一括投入の上限値・検証関数 | [batch-limits.md](./batch-limits.md) |
| parallel-search | マルチスレッド並列の総当たり Top-k `SearchProvider` 実装 | [parallel-search.md](./parallel-search.md) |
| f16 | f32 ↔ f16 ビット表現の相互変換・行エンコード | [f16.md](./f16.md) |
| sq8 | 次元ごとの対称スカラー量子化（i8）と内積計算 | [sq8.md](./sq8.md) |

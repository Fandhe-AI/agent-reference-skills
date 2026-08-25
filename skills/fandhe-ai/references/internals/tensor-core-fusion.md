---
source: https://docs.rs/fandhe-ai-tensor-core/0.3.0/fandhe_ai_tensor_core/
---

# tensor-core-fusion

`tensor-core` 内の kernel fusion（複数演算を 1 カーネルに融合する）ためのグラフ表現。`BackendOps` を非破壊拡張する `run_fused` に渡すオペークハンドル。

- crate 名: `fandhe-ai-tensor-core`（docs.rs `fandhe-ai-tensor-core/0.3.0`、`FusionPlan` は `struct.FusionPlan.html`）

## Signature / Usage

```rust
use fandhe_ai_tensor_core::{FusionPlan, FusedOpKind};

// FusionPlan はモジュール内でのみ構築され、外部コードは分解できない
for op in plan.ops() {
    // op: FusedOpKind（トポロジカル順）
}
let shape = plan.output_shape();
```

## Options / Props

`FusionPlan` の公開メソッド:

| Name | Returns | Description |
| --- | --- | --- |
| `ops()` | `impl Iterator<Item = FusedOpKind>` | トポロジカル順で融合演算を列挙 |
| `output_shape()` | `&[usize]` | 出力テンソルの形状 |
| `dtype()` | `DType` | データ型（現状常に F32） |
| `leaf_count()` | `usize` | 外部入力として必要なリーフノード数 |
| `use_count(node)` | `usize` | プラン内のみの参照カウント |
| `row_fusion()` | `Option<&RowFusionMeta>` | 行方向 reduction+broadcast 融合のメタデータ |

関連する型・定数:

| Name | Kind | Description |
| --- | --- | --- |
| `FusedOpKind` | enum | 融合プラン内の個々の演算種別 |
| `FusionPlanError` | enum | グラフ構築時のバリデーションエラー |
| `Activation` | enum | 融合対象の活性化関数種別 |
| `RowFusionMeta` | struct | 行融合のメタデータ |
| `MAX_FUSED_CHAIN_LEN` | const | elementwise 融合チェーンの最大長 |
| `MAX_FUSED_SEGMENT_NODES` | const | 融合セグメントのノード数上限 |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- `FusionPlan` はプライベートフィールドのみを持つオパークハンドルで、`Clone` / `Debug` を実装するが分解不可
- 性能上の考え方（kernel fusion の目的・設計）は guides カテゴリの performance ページを参照（本ページは型定義のみを扱う）

## Related

- [tensor-core](./tensor-core.md)
- [backend-cpu](./backend-cpu.md)
- [backend-cuda](./backend-cuda.md)
- [backend-metal](./backend-metal.md)

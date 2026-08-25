---
source: https://docs.rs/fandhe-ai-autodiff/0.3.0/fandhe_ai_autodiff/
---

# autodiff

dynamic-tape 方式の自動微分を提供するクレート。`Tensor<f32>` の演算はテープを構築しないが、`Var` の演算はテープを構築するという型分離で微分対象を明示する設計。

- crate 名: `fandhe-ai-autodiff`（docs.rs `fandhe-ai-autodiff/0.3.0`）

## Signature / Usage

```rust
use fandhe_ai_autodiff::{tape, Var};

let t = tape();
let x = Var::new(&t, 2.0);
let y = &x * &x; // テープに演算が記録される
let grads = y.backward();
```

## Options / Props

モジュール構成:

| Module | Description |
| --- | --- |
| `compat` | numpy/Keras 風 API を提供する非推奨の互換層 |
| `nn` | 独自ニューラルネットワークプリミティブ（Linear 層、活性化関数、損失関数） |
| `optim` | オプティマイザ実装（SGD, AdamW）と勾配クリッピング |

主要な型:

| Name | Kind | Description |
| --- | --- | --- |
| `Tape` | struct | forward pass での演算を Wengert list として記録 |
| `Var` | struct | `NodeId` とテープ参照を持つ追跡対象値 |
| `TapeId` / `NodeId` | struct | テープインスタンス・個々のノードの識別子 |
| `Gradients` | struct | backward 計算の結果を保持するコンテナ |
| `AutodiffError` | enum | 公開 API のエラー型 |
| `Reduction` | enum | 損失関数の reduction 指定（mean / sum） |

## Notes

- 公式が非サポートと明言する内部 crate。アプリケーションからは `fandhe-ai` 公開 API を使う
- 依存の流れは `compat` → `nn`/`var`/`tape` の一方向。`compat` は非推奨のためアプリケーションからの新規利用は非推奨
- `fandhe-ai` 公開 API の `tape()` / `tape_for(Device)` はこのクレートの `Tape` を薄くラップしたもの

## Related

- [tensor-core](./tensor-core.md)

---
source: https://docs.rs/fandhe-ai/0.3.0/fandhe_ai/struct.Tape.html
---

# Tape / tape() / tape_for()

`Tape` は `fandhe_ai_autodiff::Tape` の newtype ラッパー。composition root 関数 `tape()` / `tape_for()` が構築する唯一の入口で、`var` / `backward` のみを公開し、`new_with_ops` のような低レベルコンストラクタへの直接アクセスを防いでいる。これにより任意の `BackendOps` 実装を公開 API 経由で注入できない構成になっている。

## Signature / Usage

```rust
pub fn tape() -> Tape
pub fn tape_for(device: Device) -> Result<Tape, BackendError>
```

```rust
let tape = fandhe_ai::tape();
let input = tape.var(&tensor_data);
let loss = input.sum(None)?;
let grads = tape.backward(&loss)?;
```

```rust
// Device 未使用時のフォールバック例
let tape = match tape_for(Device::Cuda(0)) {
    Ok(tape) => tape,
    Err(_) => {
        println!("Device::Cuda(0) unavailable; falling back to Device::Cpu");
        tape_for(Device::Cpu)?
    }
};
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `tape()` | 関数 | デフォルトバックエンド（CPU）で `Tape` を構築する。CPU は常に利用可能なため infallible。fused elementwise 最適化が有効な状態で構築される |
| `tape_for(device: Device)` | 関数 | 指定した `Device` に接続した `Tape` を構築する。デバイス不在・ordinal 範囲外・ドライバ欠如時は `BackendError` を返す（fail-fast、panic しない） |
| `Tape::var(&self, tensor: &Tensor<f32>) -> Var<'_>` | メソッド | 入力テンソルをテープ上の leaf ノードとして登録する |
| `Tape::backward(&self, loss: &Var<'_>) -> Result<Gradients, AutodiffError>` | メソッド | `loss` から逆伝播し、寄与した全入力に対する勾配を計算する |

## Notes

- `Tape` の構築は `tape()` または `tape_for(Device)` 経由のみ。フィールドへの直接アクセスは不可
- `Tape` は `Debug`, `Send` を実装するが `Sync` は実装しない
- 各イテレーションで新しい `Tape` を作ることで、計算グラフの蓄積によるオーバーヘッドから GEMM ベンチマーク等を分離できる（`gemm_bench.rs` の例）
- `model.predict()` は内部で `tape()` を呼ぶ。明示的にグラフのライフサイクルを制御したい場合は `Tape` を作って `model.forward()` を呼ぶ

## Related

- `tape()` / `tape_for()`
- `Var`
- `Gradients`

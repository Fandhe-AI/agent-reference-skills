---
source: https://docs.rs/fandhe-ai/0.11.0/fandhe_ai/nn/struct.ForwardHooked.html
---

# Forward hooks（ForwardHooked / ForwardHookCtx）

facade の `nn::Module` 実装を包み、`forward` 完了直後に観察専用 hook を 1 回呼ぶラッパー `ForwardHooked<M>` と、hook に渡す ctx 型 `ForwardHookCtx`（PyTorch `register_forward_hook` 相当）。

## Signature / Usage

```rust
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use fandhe_ai::nn::{ForwardHooked, Module};
use fandhe_ai::{AutodiffError, Tensor, TapeRef, Var};

struct Double;
impl Module for Double {
    fn forward<'t>(
        &self,
        _tape: TapeRef<'t>,
        input: &Var<'t>,
    ) -> Result<Var<'t>, AutodiffError> {
        input.add(input)
    }
}

let calls = Arc::new(AtomicUsize::new(0));
let seen = Arc::clone(&calls);
let hooked = ForwardHooked::new(Double, move |ctx| {
    assert_eq!(ctx.input_shape(), ctx.output_shape());
    seen.fetch_add(1, Ordering::SeqCst);
    Ok(())
});
let tape = fandhe_ai::tape();
let x = tape.var(&Tensor::new(vec![1.0, 2.0], &[2]).unwrap());
let y = hooked.forward(TapeRef::from(&tape), &x).unwrap();
assert_eq!(y.to_tensor().host_slice().as_ref(), &[2.0, 4.0]);
assert_eq!(calls.load(Ordering::SeqCst), 1);
```

## Options / Props

`ForwardHooked<M: Module>`:

| Name | Signature | Description |
| --- | --- | --- |
| `new` | `pub fn new<F>(inner: M, hook: F) -> Self where F: Fn(&ForwardHookCtx<'_>) -> Result<(), AutodiffError> + Send + Sync + 'static` | `inner` を包み、`forward` 完了直後に `hook` を 1 回呼ぶ |
| `inner` | `pub fn inner(&self) -> &M` | 内側の層への参照 |
| `inner_mut` | `pub fn inner_mut(&mut self) -> &mut M` | 内側の層への可変参照 |
| `into_inner` | `pub fn into_inner(self) -> M` | 包みを外して取り出す（hook は破棄される） |

`ForwardHookCtx<'a>`（autodiff 側の型の純再エクスポート）:

| Name | Signature | Description |
| --- | --- | --- |
| `input_shape` | `pub fn input_shape(&self) -> &[usize]` | 入力の shape（構築時保持値。実体化しない） |
| `output_shape` | `pub fn output_shape(&self) -> &[usize]` | 出力の shape（同上） |
| `output_value` | `pub fn output_value(&self) -> Result<Tensor<f32>, AutodiffError>` | 出力値の複製。lazy 出力はここで fallible に実体化する。出力がデバイス常駐葉でホスト値を持たない場合は `InvalidArgument` |

## Notes

- hook は観察専用（戻り値は `Result<(), AutodiffError>`）。出力を書き換えられず、`Err` は `forward` の `Err` として伝播する。inner の `forward` が `Err` なら hook は不発
- hook は構築時に 1 つだけ指定する（登録・解除 API は持たない。`pub mod hooks` も無い）
- `Module` としては inner と同じ振る舞いを透過する（`named_parameters` / `state_dict` 等は名前の接頭辞なしで inner へ委譲）。`forward` にだけ hook が加わる
- facade `Module` はホスト推論経路を持たないため、`compat::Sequential::predict` 等でも tape 経路で 1 forward につき 1 回発火する
- `output_value` は出力ノードを実体化するため、遅延融合の分割が変わりうる（observer effect）。値を読まない hook では出力は bit 一致
- 包めるのは facade `nn::Module` 実装（利用者定義層・`nn::{ModuleList, Sequential, ModuleDict}`）。autodiff 組み込み層の直接ラップは対象外
- backward 側の hook は `Tape::register_backward_hook`（`tape.md` 側）が担い、本ページは forward 側のみ

## Related

- [module.md](./module.md)
- [containers.md](./containers.md)
- [tape.md](../api/tape.md)

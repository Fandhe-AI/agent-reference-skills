---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/fn.step_sgd.html
---

# step_sgd / step_adam / step_adamw

勾配を全ランクで平均してから optimizer を更新する分散ステップのフリー関数。`DeviceParamStore` の inherent method に `&mut Communicator` を取らせると内部型が公開面へ漏れるため、フリー関数として提供される（`src/distributed/step.rs` のモジュール doc）。

## Signature / Usage

```rust
pub fn step_sgd(
    tape: &Tape,
    store: &mut DeviceParamStore,
    grads: &Gradients,
    config: &SgdConfig,
    comm: &mut Communicator,
) -> Result<(), DistributedError>;

pub fn step_adam(
    tape: &Tape,
    store: &mut DeviceParamStore,
    grads: &Gradients,
    config: &AdamConfig,
    comm: &mut Communicator,
) -> Result<(), DistributedError>;

pub fn step_adamw(
    tape: &Tape,
    store: &mut DeviceParamStore,
    grads: &Gradients,
    config: &AdamWConfig,
    comm: &mut Communicator,
) -> Result<(), DistributedError>;
```

Adapted (not in the official docs): 完全な実行例は rustdoc に無いため、モジュール doc の `no_run` 例の末尾行を抜き出した。

```rust
let _ = &mut comm; // `step_sgd(&tape, &mut store, &grads, &cfg, &mut comm)` に渡す
```

## Notes

- 呼び出し窓は「backward の後・pending 消費前」（`Tape::step_device_param_store*` と同じ）。全ランクが同じ config・同じパラメータ並び・同じ総要素数で呼ぶこと
- 損失は平均縮約（`mse_loss` 等）を前提にする。各ランクのバッチサイズが等しいとき、平均勾配は全バッチの勾配と一致する
- world_size 1 は無通信の素通しで、既存の `Tape::step_device_param_store*` と bit 一致する
- all-reduce が失敗したらどのパラメータも optimizer 状態も更新せず（fail-closed）、`pending` は残り、`Communicator` は poisoned になる
- `step_adam` / `step_adamw` の意味論・エラーは `step_sgd` と同じ
- 認証も暗号化も無い。信頼できるネットワーク内でだけ使う
- 失敗時のエラーは all-reduce の失敗・バックエンドエラー・勾配長の不一致（`GradientLengthMismatch`）を `DistributedError` で返す
- Adapted (not in the official docs): the rustdoc of these three functions has no runnable example, so the call line is the last comment line of the module-level `no_run` example
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/fn.step_sgd.html （0.14.0, 取得日 2026-11-14。シグネチャは `src/distributed/step.rs` を一次ソースとして確認）

## Related

- [communicator.md](./communicator.md)
- [error.md](./error.md)

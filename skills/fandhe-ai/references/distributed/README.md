# distributed

| Name | Description | Path |
|------|-------------|------|
| DistributedConfig / DistributedConfigBuilder | 分散学習の設定（world_size・rank・集合点アドレス・opt-in・タイムアウト）。`build()` がソケットを開く前にすべて検証する。 | [config.md](./config.md) |
| Rendezvous / Communicator | 集合の確立（`bind` → `local_addr` → `establish`）と、確立済みのホスト側 ring 集合通信ハンドル。 | [communicator.md](./communicator.md) |
| step_sgd / step_adam / step_adamw | 勾配を全ランクで平均してから optimizer を更新する分散ステップのフリー関数。 | [steps.md](./steps.md) |
| DistributedError | 設定・集合の確立・集合通信・分散ステップが返す型付きエラー（`#[non_exhaustive]`）。 | [error.md](./error.md) |

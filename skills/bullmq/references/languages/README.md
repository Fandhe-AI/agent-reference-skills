# languages

| Name | Description | Path |
|------|-------------|------|
| .NET | BullMQ の .NET パッケージ（NuGet `BullMQ`）。Redis / PostgreSQL 両対応、Queue / Worker / QueueEvents / FlowProducer / job scheduler を提供。 | [dotnet.md](./dotnet.md) |
| Elixir | BullMQ の Elixir バインディング（Redis / PostgreSQL 対応）。Erlang/OTP の並行処理モデルと BullMQ のジョブキューを組み合わせ、GenServer / Supervisor ベースで動作する。 | [elixir.md](./elixir.md) |
| PHP | BullMQ の PHP バインディング。Queue クラス（プロデューサー側）のみを実装しており、ワーカーには Node.js / Python / Elixir / .NET / Rust が必要。 | [php.md](./php.md) |
| Python | BullMQ の Python バインディング（Redis / PostgreSQL 対応）。Node.js 版と同じ Redis データ構造を共有するため、言語間で相互運用が可能。 | [python.md](./python.md) |
| BullMQ — Rust | BullMQ は Rust クレートとして提供されており、フル async/await サポートを持つ。 | [rust.md](./rust.md) |

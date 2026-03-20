# Elixir

BullMQ の Elixir バインディング。Erlang/OTP の並行処理モデルと BullMQ のジョブキューを組み合わせ、GenServer / Supervisor ベースで動作する。

## インストール

```elixir
# mix.exs
defp deps do
  [
    {:bullmq, "~> 1.0"}
  ]
end
```

## 要件

- Elixir 1.15 以上
- Erlang/OTP 26 以上
- Redis 6.0 以上

## 基本的な使い方

### キューへのジョブ追加

```elixir
{:ok, queue} = BullMQ.Queue.new("myQueue", connection: connection)
BullMQ.Queue.add(queue, "myJob", %{foo: "bar"})
```

### ワーカーでの処理

```elixir
defmodule MyWorker do
  use BullMQ.Worker

  def process(job) do
    IO.inspect(job.data)
    :ok
  end
end
```

### Supervision ツリーへの統合

```elixir
children = [
  {MyWorker, connection: connection, queue: "myQueue"}
]

Supervisor.start_link(children, strategy: :one_for_one)
```

## サポートされる機能

- リトライロジック（指数バックオフ対応）
- 遅延ジョブ、cron ベースのスケジューリング
- 優先度付きジョブ処理
- レート制限
- 親子ジョブ（フロー）
- リアルタイムイベントストリーミング
- 停滞ジョブの自動検出とリカバリ
- OTP 統合（GenServer / Supervisor）
- テレメトリ統合

## 注意点

- API リファレンスは HexDocs (hexdocs.pm/bullmq) で公開
- Node.js / Python と同じ Redis データ構造を共有し、言語間でジョブの相互運用が可能

## 関連

- [Quick Start](../start/quick-start.md)
- [Guide](../guide/README.md)

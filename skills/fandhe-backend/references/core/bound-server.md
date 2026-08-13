# BoundServer

`Server::bind` が返す、リスニングソケットを保持した状態のサーバ。accept ループを回し、コネクションごとに接続処理タスクを spawn する。

## Signature / Usage

```rust
let bound = server.bind("127.0.0.1:3000").await?;
bound.run().await
```

graceful shutdown 付き:

```rust
use std::time::Duration;

let bound = server.bind("127.0.0.1:3000").await?;
bound.run_until(async {
    tokio::signal::ctrl_c().await.ok();
}).await
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `local_addr()` | `-> io::Result<SocketAddr>` | バインドしたローカルアドレスを返す（`0` ポート指定時の実ポート確認用） |
| `run()` | `async fn(self) -> io::Result<()>` | shutdown 手段を持たない `run_until(std::future::pending())` の薄いラッパー |
| `run_until(shutdown)` | `async fn(self, F: Future<Output = ()>) -> io::Result<()>` | `shutdown` 完了まで accept ループを回し、その後 graceful shutdown シーケンスを実行する |
| `rebind_handle()` | `-> RebindHandle`（v0.3.0 で新設、issue #485） | 稼働中の listener を無停止で差し替えるためのハンドルを返す |

## Notes

- 同時接続数は `Server::max_connections` の `Semaphore` で強制する。上限中は新規 `accept` 自体を保留し、あふれた接続は listen backlog に滞留させる（あふれた分は OS 側で拒否）
- accept エラー（`EMFILE`/`ENFILE` 等の一過性エラー）ではループを終了させず、`ACCEPT_ERROR_BACKOFF`（10ms）待って次の accept を再試行する
- `run_until` の graceful shutdown シーケンス: 1) accept 停止（shutdown フラグを立てリスナーを drop）、2) in-flight 完了待ち（`shutdown_grace_period` を上限に全 permit の解放を待つ）、3) 上限超過時は残存タスクを強制 abort
- shutdown_flag 受信後は `UpgradeHandler` がマッチする新規リクエストも 503 で拒否する
- `run_until` の Future 自体が外部キャンセルされても in-flight 接続は abort されず、独立タスクとして完走する（`CancelSafeJoinSet` による）
- v0.3.0（#491/#493）で解消: Upgrade 委譲済みの WebSocket タスクも、コアが配線した世代キャンセルシグナルにより shutdown 時に close code 1001 の正常 Close ハンドシェイクと有界ドレインで終端する。grace 超過時の強制 abort 対象外という既知の限界は撤廃された
- v0.4.0（issue #518）で drain 中の idle keep-alive 接続（次リクエスト待ちで読み取りブロック中の接続）の扱いが公開契約化された: (a) drain 開始を理由に idle 接続を強制クローズしない（shutdown フラグを立てるのみで read 待ち自体は中断しない）。(b) grace 期限内に到着した後続リクエストは拒否せず受理・完走し、応答には `Connection: close` を付与する。(c) `UpgradeHandler` がマッチする Upgrade リクエストは例外として 503 で拒否する。(d) 上記いずれの経路でも接続は `shutdown_grace_period` + ε 以内に必ず閉じる（有界クローズのフェイルセーフ）

## Related

- [Server](./server.md)
- [Handler](./handler.md)
- [RebindHandle](./rebind-handle.md)

# graceful shutdown

fandhe-backend は `BoundServer::run_until(shutdown)` により graceful shutdown を提供する。シャットダウンシグナルを受けると新規接続の受理を止め、処理中（in-flight）のリクエスト・接続の完了を上限時間まで待ってから終了する。

## Signature / Usage

```rust,ignore
use fandhe_backend_core::Server;

let server = Server::new()
    .handler(router)
    .shutdown_grace_period(std::time::Duration::from_secs(10));
let bound = server.bind("127.0.0.1:3001").await?;

bound
    .run_until(async {
        tokio::signal::ctrl_c()
            .await
            .expect("Ctrl-C シグナルハンドラの登録に失敗しました");
        println!("シャットダウンシグナルを受信しました");
    })
    .await
```

```bash
cargo run --example graceful_shutdown -p fandhe-backend-core
curl -v http://127.0.0.1:3001/    # 200 応答
# Ctrl-C を送ると新規接続の受理を止め、in-flight 完了を待って終了する
```

## Options / Props

| API | 役割 |
|-----|------|
| `BoundServer::run_until(shutdown)` | `shutdown` Future が完了するまで accept ループを回し、完了後に graceful shutdown シーケンスを実行する |
| `Server::shutdown_grace_period(grace)` | in-flight 完了待ちの上限時間を設定する（既定 30 秒） |
| `BoundServer::run()` | 従来 API。`run_until(std::future::pending::<()>())` への薄い委譲（後方互換） |

## Notes

- shutdown シーケンス: (1) accept 停止（shutdown フラグを立てリスニングソケットを drop、以降の新規接続は OS レベルで拒否） → (2) in-flight 完了待ち（`shutdown_grace_period` 既定 30 秒を上限に全 in-flight 接続の完了を待ち、処理中のリクエストは完走させつつ以後の応答には `Connection: close` を付ける） → (3) 上限超過時は警告ログを 1 行出した上で強制クローズ（フェイルクローズ）
- どちらの経路でも `run_until` は `shutdown_grace_period` + ε 以内に必ず `Ok(())` で戻る
- `shutdown` は `Future<Output = ()>` であれば何でもよい。シグナル源（Ctrl-C・SIGTERM・管理エンドポイント等）はコアで扱わず利用者が任意の Future として渡す設計（`tokio` の `signal` feature をコアの依存に持ち込まないための pay-for-what-you-use）
- shutdown フラグ受信後に到着した WebSocket 等の Upgrade リクエストは委譲せず 503 で拒否する（grace 強制クローズの管理外となる detached セッションを増やさないため）
- v0.3.0（#491/#493）で、shutdown 前に委譲済みの WebSocket セッションが grace 超過時の強制 abort 対象外だった既知の限界は解消済み。コアが世代キャンセルシグナル（最終 shutdown・rebind 世代 drain）を Upgrade 委譲済みの WS タスクへ配線し、close code 1001 の正常 Close ハンドシェイクと有界ドレイン（`WebSocketConfig::with_close_grace`、既定 10 秒）で終端する
- v0.4.0（issue #518）で drain 中の idle keep-alive 接続（次リクエスト待ちで読み取りブロック中の接続）の扱いが公開契約化された: (a) drain 開始を理由に強制クローズしない（shutdown フラグを立てるのみで read 待ちは中断しない） (b) grace 期限内に到着した後続リクエストは拒否せず受理・完走し `Connection: close` を付与する (c) Upgrade リクエストは例外として 503 で拒否する（(b) の対象外） (d) いずれの経路でも `shutdown_grace_period` + ε 以内に必ず閉じる（有界クローズのフェイルセーフ）
- 稼働中の listener をダウンタイムなしで差し替える `BoundServer::rebind_handle()` / `RebindHandle::rebind(addr)`（#485）も同じ世代キャンセルシグナルの仕組みに乗る。rebind 時は旧世代の in-flight 接続・WS タスクが上記の有界ドレインで片付けられてから新 listener に切り替わる
- accept エラー（`ECONNABORTED`・fd 枯渇等）は一過性として扱い、`run_until` を終了させず短い待機の後に accept を再試行する（1 件のエラーでリスナー全体が停止しない可用性設計）
- `run()` は `run_until` への薄い委譲として残っており既存の `run()` 利用箇所は無変更のまま動作する。新規コードでは `run_until` の利用を推奨する
- `run_until` が返す Future 自体を呼び出し側の `tokio::select!` 等で外部キャンセルした場合、in-flight 接続は abort されず独立タスクとして完走する（従来の detached spawn 時代の挙動を維持）。ただしこの経路では grace 上限による強制クローズも働かないため、確実に片付けたい場合はキャンセルではなく `shutdown` Future の完了で止めること
- 利用側アプリで `tokio::signal` を使う場合は自分の `Cargo.toml` で tokio の `signal` feature を有効にする（fandhe-backend 側では dev-dependencies 限定でコアの依存グラフには現れない）

## Related

- [streaming](./streaming.md)
- [extension-points](./extension-points.md)
- [RebindHandle](../core/rebind-handle.md)
